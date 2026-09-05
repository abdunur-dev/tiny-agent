"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DesignHero } from "@/components/design/design-hero";
import { ResourcesSection } from "@/components/design/resources-section";
import { FutureSection } from "@/components/design/future-section";
import { TokensSection } from "@/components/design/tokens-section";
import { TeamSection } from "@/components/design/team-section";
import { CareersCta } from "@/components/design/careers-cta";

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white/15 selection:text-white">
      <Nav />
      <main className="flex-1">
        <DesignHero activeTab={activeTab} onTabChange={handleTabChange} />
        <ResourcesSection />
        <FutureSection />
        <TokensSection />
        <TeamSection />
        <CareersCta />
      </main>
      <Footer />
    </div>
  );
}
