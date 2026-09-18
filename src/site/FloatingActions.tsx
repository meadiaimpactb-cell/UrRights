import { IconChat, IconWhatsapp, IconX } from "./icons";

export function FloatingActions({
  whatsapp,
  chatOpen,
  onToggleChat,
}: {
  whatsapp: string;
  chatOpen: boolean;
  onToggleChat: () => void;
}) {
  return (
    <>
      {/* WhatsApp — bottom-start */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="pulse-wa fixed z-[55] bottom-5 start-4 sm:start-6 w-16 h-16 rounded-full bg-[#22b358] text-white grid place-items-center shadow-lift hover:bg-[#1da34e] active:scale-95 transition"
      >
        <IconWhatsapp size={32} />
      </a>

      {/* Chat launcher — bottom-end */}
      <button
        onClick={onToggleChat}
        aria-label="chat"
        className="fixed z-[55] bottom-5 end-4 sm:end-6 w-16 h-16 rounded-full bg-grad-brand-deep text-white grid place-items-center shadow-lift hover:opacity-95 active:scale-95 transition"
      >
        {chatOpen ? <IconX size={28} /> : <IconChat size={30} />}
      </button>
    </>
  );
}
