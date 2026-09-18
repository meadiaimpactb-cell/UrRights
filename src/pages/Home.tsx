import { useState } from "react";
import { LanguageProvider } from "@/i18n";
import { trpc } from "@/providers/trpc";
import { Header } from "@/site/Header";
import { Hero } from "@/site/Hero";
import { Topics } from "@/site/Topics";
import { Steps, Services, WhyUs, About, Partners, CtaBand } from "@/site/Sections";
import { Footer } from "@/site/Footer";
import { LanguageSheet } from "@/site/LanguageSheet";
import { RequestDialog } from "@/site/RequestDialog";
import { ChatWidget } from "@/site/ChatWidget";
import { FloatingActions } from "@/site/FloatingActions";

function SiteInner() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [topic, setTopic] = useState("other");
  const [chatOpen, setChatOpen] = useState(false);

  const settingsQuery = trpc.settings.publicGet.useQuery(undefined, { staleTime: 60_000 });
  const whatsapp = settingsQuery.data?.whatsapp_number || "966500000000";

  const openHelp = (t = "other") => {
    setTopic(t);
    setRequestOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onHelp={() => openHelp()} />
      <main>
        <Hero whatsapp={whatsapp} onChat={() => setChatOpen(true)} onHelp={() => openHelp()} />
        <Topics onPick={openHelp} />
        <Steps />
        <Services />
        <WhyUs />
        <About />
        <Partners />
        <CtaBand whatsapp={whatsapp} onChat={() => setChatOpen(true)} />
      </main>
      <Footer whatsapp={whatsapp} />

      <LanguageSheet />
      <RequestDialog open={requestOpen} topic={topic} whatsapp={whatsapp} onClose={() => setRequestOpen(false)} />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} whatsapp={whatsapp} />
      <FloatingActions whatsapp={whatsapp} chatOpen={chatOpen} onToggleChat={() => setChatOpen((v) => !v)} />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <SiteInner />
    </LanguageProvider>
  );
}
