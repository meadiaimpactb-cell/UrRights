export function runSeed(opts?: {
  url?: string;
  force?: boolean;
  translate?: boolean;
}): Promise<void>;

export const CONTENT_REVISION: number;

export function syncContent(opts?: {
  url?: string;
  revisionFrom?: number;
}): Promise<{ added: number; revised: number; revision: number }>;

export const DEFAULT_SETTINGS: Record<string, string>;
