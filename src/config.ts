import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export interface ProviderSettings {
  baseURL: string;
  model: string;
  apiKey?: string;
}

export interface McpServerConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
}

export interface AgentConfig {
  defaultProvider: 'ollama' | 'groq';
  ollama: ProviderSettings;
  groq: ProviderSettings;
  mcpServers?: Record<string, McpServerConfig>;
}

const CONFIG_DIR = path.join(os.homedir(), '.tiny-agent');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');

const DEFAULT_CONFIG: AgentConfig = {
  defaultProvider: 'ollama',
  ollama: {
    baseURL: 'http://localhost:11434/v1',
    model: 'qwen2.5-coder:latest',
  },
  groq: {
    baseURL: 'https://api.groq.com/openai/v1',
    model: 'openai/gpt-oss-120b',
    apiKey: '',
  },
};

export function loadExistingConfig(): AgentConfig | null {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    } catch {
      return null;
    }
  }
  return null;
}

export function saveConfig(cfg: AgentConfig): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
}

export async function promptConfigWizard(): Promise<AgentConfig> {
  const rl = readline.createInterface({ input, output });

  process.stdout.write('\n\x1b[1m=== tiny-agent configuration ===\x1b[0m\n');
  process.stdout.write('Choose your default provider:\n');
  process.stdout.write('  1. Local model (Ollama - offline, private)\n');
  process.stdout.write('  2. Cloud model (Groq - fast, powerful)\n');

  const answer = (await rl.question('\nUse local model (Ollama) or cloud model (Groq)? [1/2, default: 1]: ')).trim();
  const isCloud = answer === '2' || answer.toLowerCase().startsWith('g') || answer.toLowerCase().startsWith('c');

  const cfg: AgentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

  if (isCloud) {
    cfg.defaultProvider = 'groq';
    const envKey = process.env.GROQ_API_KEY || '';
    let apiKey = envKey;
    if (!apiKey) {
      apiKey = (await rl.question('Enter your Groq API Key: ')).trim();
    } else {
      process.stdout.write(`Found GROQ_API_KEY in environment.\n`);
    }
    cfg.groq.apiKey = apiKey;

    const modelInput = (await rl.question(`Groq model [default: ${DEFAULT_CONFIG.groq.model}]: `)).trim();
    if (modelInput) cfg.groq.model = modelInput;
  } else {
    cfg.defaultProvider = 'ollama';
    const baseInput = (await rl.question(`Ollama base URL [default: ${DEFAULT_CONFIG.ollama.baseURL}]: `)).trim();
    if (baseInput) cfg.ollama.baseURL = baseInput;

    const modelInput = (await rl.question(`Ollama model [default: ${DEFAULT_CONFIG.ollama.model}]: `)).trim();
    if (modelInput) cfg.ollama.model = modelInput;
  }

  rl.close();
  saveConfig(cfg);
  process.stdout.write(`\x1b[32mConfig saved to ${CONFIG_PATH}\x1b[0m\n\n`);
  return cfg;
}

export async function resolveRuntimeConfig(cliArgs: string[]): Promise<{
  provider: 'ollama' | 'groq';
  baseURL: string;
  model: string;
  apiKey?: string;
  mcpServers?: Record<string, McpServerConfig>;
}> {
  const forceLocal = cliArgs.includes('--local');
  const forceCloud = cliArgs.includes('--cloud');

  let modelOverride: string | undefined;
  const modelIdx = cliArgs.indexOf('--model');
  if (modelIdx !== -1 && cliArgs[modelIdx + 1]) {
    modelOverride = cliArgs[modelIdx + 1];
  }

  let config = loadExistingConfig();
  if (!config) {
    // If env vars specify GROQ_API_KEY and user specified --cloud, we can auto-configure
    if (forceCloud && process.env.GROQ_API_KEY) {
      config = { ...DEFAULT_CONFIG, defaultProvider: 'groq' };
      config.groq.apiKey = process.env.GROQ_API_KEY;
    } else if (forceLocal) {
      config = { ...DEFAULT_CONFIG, defaultProvider: 'ollama' };
    } else {
      config = await promptConfigWizard();
    }
  }

  let activeProvider: 'ollama' | 'groq' = config.defaultProvider;
  if (forceLocal) activeProvider = 'ollama';
  if (forceCloud) activeProvider = 'groq';

  const providerSettings = activeProvider === 'groq' ? config.groq : config.ollama;

  // Prefer GROQ_API_KEY env var if set
  let apiKey = providerSettings.apiKey;
  if (activeProvider === 'groq' && process.env.GROQ_API_KEY) {
    apiKey = process.env.GROQ_API_KEY;
  }

  if (activeProvider === 'groq' && (!apiKey || apiKey.trim().length === 0)) {
    const rl = readline.createInterface({ input, output });
    apiKey = (await rl.question('Enter your Groq API Key: ')).trim();
    rl.close();
    config.groq.apiKey = apiKey;
    saveConfig(config);
  }

  return {
    provider: activeProvider,
    baseURL: providerSettings.baseURL,
    model: modelOverride || providerSettings.model,
    apiKey,
    mcpServers: config.mcpServers,
  };
}
