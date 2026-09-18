import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: P, children: React.ReactNode, viewBox = "0 0 24 24") {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconMoney = (p: P) =>
  base(p, <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.2 9.4c.5-1 1.6-1.6 2.8-1.6 1.8 0 3 1 3 2.3 0 3-5.6 2-5.6 4.7 0 1.3 1.3 2.3 3 2.3 1.3 0 2.4-.6 2.9-1.6" />
    <path d="M12 6.2v1.6M12 16.2v1.6" />
  </>);

export const IconContract = (p: P) =>
  base(p, <>
    <path d="M7 3.5h7l4 4v13H7z" />
    <path d="M14 3.5v4h4" />
    <path d="M9.8 12.5h4.7M9.8 15.8h3.4" />
  </>);

export const IconShieldHeart = (p: P) =>
  base(p, <>
    <path d="M12 3.5 5 6v5.5c0 4.4 2.9 7.4 7 9 4.1-1.6 7-4.6 7-9V6z" />
    <path d="M12 15.2s-3.3-2-3.3-4.3c0-1.2.9-2 2-2 .6 0 1.1.3 1.3.8.2-.5.7-.8 1.3-.8 1.1 0 2 .8 2 2 0 2.3-3.3 4.3-3.3 4.3z" fill="currentColor" stroke="none" />
  </>);

export const IconFlag = (p: P) =>
  base(p, <>
    <path d="M6 21V4" />
    <path d="M6 5c4-2.2 7 2.2 12 0v8.5c-5 2.2-8-2.2-12 0" />
  </>);

export const IconBook = (p: P) =>
  base(p, <>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z" />
    <path d="M4 18.5V5.5" />
    <path d="M9 8h7M9 11.5h4.5" />
  </>);

export const IconDots = (p: P) =>
  base(p, <>
    <circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </>);

export const IconWhatsapp = ({ size = 24, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.14 15.06l-.3-.18-3.06.9.9-2.98-.2-.31a8.1 8.1 0 0 1 6.8-12.49zm-3.6 4.08c-.2 0-.5.07-.77.36-.27.3-1 .98-1 2.4s1.03 2.78 1.17 2.97c.15.2 2 3.2 4.96 4.36 2.46.97 2.96.78 3.5.73.53-.05 1.7-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.2-.57-.34-.3-.15-1.7-.84-1.97-.94-.27-.1-.46-.14-.66.15-.2.3-.76.94-.93 1.13-.17.2-.34.22-.64.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.6-.92-2.2-.24-.56-.48-.49-.66-.5z" />
  </svg>
);

export const IconChat = (p: P) =>
  base(p, <>
    <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.8-.34-4-.95L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z" />
    <path d="M8.5 10.5h7M8.5 13.8h4.5" />
  </>);

export const IconGlobe = (p: P) =>
  base(p, <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c-4.7 5.3-4.7 11.7 0 17 4.7-5.3 4.7-11.7 0-17z" />
  </>);

export const IconCheck = (p: P) => base(p, <path d="m5 12.5 4.5 4.5L19 7.5" />);

export const IconSend = (p: P) =>
  base(p, <>
    <path d="M21 3 10.5 13.5" />
    <path d="M21 3 14 21l-3.5-7.5L3 10z" />
  </>);

export const IconX = (p: P) => base(p, <path d="M6 6l12 12M18 6 6 18" />);

export const IconLock = (p: P) =>
  base(p, <>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" />
    <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
  </>);

export const IconHeart = (p: P) =>
  base(p, <path d="M12 20s-8-4.9-8-10.4C4 6.9 6 5 8.5 5c1.5 0 2.9.8 3.5 2 .6-1.2 2-2 3.5-2C18 5 20 6.9 20 9.6 20 15.1 12 20 12 20z" />);

export const IconUsers = (p: P) =>
  base(p, <>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M15.5 5.2a3.4 3.4 0 0 1 0 5.7M17.8 15.5c1.6.7 2.6 2.2 2.9 4.5" />
  </>);

export const IconHandshake = (p: P) =>
  base(p, <>
    <path d="m8.5 12.5 3.5 3.5 4.5-4.5" />
    <path d="M3 8.5 7.5 5l4.5 2.5L16.5 5 21 8.5v6l-4.5 4-4.5-2.5L7.5 18.5 3 14.5z" opacity=".45" />
  </>);

export const IconScale = (p: P) =>
  base(p, <>
    <path d="M12 4v16M8 20h8" />
    <path d="M12 6 5 8l-2 5c1.2 1.4 5.8 1.4 7 0L8 8M12 6l7 2 2 5c-1.2 1.4-5.8 1.4-7 0l2-5" />
  </>);

export const IconMegaphone = (p: P) =>
  base(p, <>
    <path d="M18 5v12.5L7 14H4V8.5h3z" />
    <path d="M7.5 14.5 9 19a1.8 1.8 0 0 0 3.4-.9" />
  </>);

export const IconPhone = (p: P) =>
  base(p, <path d="M5 4h4l1.8 4.5-2.3 1.7a12 12 0 0 0 5.3 5.3l1.7-2.3L20 15v4a1.8 1.8 0 0 1-2 2A15.5 15.5 0 0 1 3 6a1.8 1.8 0 0 1 2-2z" />);

export const IconArrow = ({ size = 24, style, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={style} {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconXTwitter = ({ size = 24, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.7 3H21l-7.2 8.2L22.2 21h-6.6l-5.2-6.2L4.4 21H1l7.7-8.8L1.8 3h6.8l4.7 5.6L17.7 3zm-1.2 16h1.8L7.1 4.9H5.2L16.5 19z" />
  </svg>
);

export const IconFacebook = ({ size = 24, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
  </svg>
);

export const IconInstagram = (p: P) =>
  base(p, <>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
  </>);

export const IconTiktok = ({ size = 24, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M16.6 3c.4 2 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1a3 3 0 1 0 2 2.8V3h3z" />
  </svg>
);
