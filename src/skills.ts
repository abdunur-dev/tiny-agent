import * as fs from 'node:fs';
import * as path from 'node:path';

export interface SkillMetadata {
  name: string;
  description: string;
  filePath: string;
}

/**
 * Parses only the YAML frontmatter (name + description) from a SKILL.md file.
 * Avoids loading or parsing the full markdown body to keep startup cheap.
 */
export function parseSkillFrontmatter(content: string, filePath: string): SkillMetadata | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yamlBlock = match[1];
  let name = '';
  let description = '';

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('name:')) {
      name = trimmed.slice(5).trim();
    } else if (trimmed.startsWith('description:')) {
      description = trimmed.slice(12).trim();
    } else if (description && !trimmed.includes(':') && trimmed.length > 0) {
      description += ' ' + trimmed;
    }
  }

  if (!name) {
    name = path.basename(path.dirname(filePath));
  }

  return {
    name,
    description: description || 'No description provided.',
    filePath,
  };
}

/**
 * Scans .tiny-agent/skills/ in rootDir and parses frontmatter for each SKILL.md.
 * If the folder does not exist, silently returns an empty array.
 */
export function loadSkills(rootDir: string = process.cwd()): SkillMetadata[] {
  const skillsDir = path.join(rootDir, '.tiny-agent', 'skills');
  if (!fs.existsSync(skillsDir)) {
    return [];
  }

  const skills: SkillMetadata[] = [];

  try {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillFilePath = path.join(skillsDir, entry.name, 'SKILL.md');
        if (fs.existsSync(skillFilePath)) {
          try {
            const content = fs.readFileSync(skillFilePath, 'utf-8');
            const meta = parseSkillFrontmatter(content, skillFilePath);
            if (meta) {
              skills.push(meta);
            }
          } catch {
            // Silently skip unreadable files
          }
        }
      }
    }
  } catch {
    return [];
  }

  return skills;
}

/**
 * Formats a short summary of available skills to inject into the system prompt.
 */
export function formatSkillsPrompt(skills: SkillMetadata[], baseDir: string = process.cwd()): string {
  if (skills.length === 0) return '';

  const list = skills
    .map((s) => {
      const relPath = path.relative(baseDir, s.filePath).replace(/\\/g, '/');
      return `- ${s.name} (${relPath}): ${s.description}`;
    })
    .join('\n');

  return (
    `\n\nAvailable skills (read the full file with read_file if one seems relevant to the current task):\n` +
    list +
    `\n\nIf a task matches one of the available skills, use read_file to inspect its SKILL.md before proceeding.`
  );
}
