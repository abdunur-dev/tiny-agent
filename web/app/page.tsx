import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { TechStack } from "@/components/tech-stack";
import { TerminalDemo } from "@/components/terminal-demo";
import { Workflow } from "@/components/workflow";
import { Comparison } from "@/components/comparison";
import { InstallSection } from "@/components/install-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white/15 selection:text-white">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Features />
        <TechStack />
        <TerminalDemo />
        <Comparison />
        <Workflow />
        <InstallSection />
      </main>
      <Footer />
    </div>
  );
}
