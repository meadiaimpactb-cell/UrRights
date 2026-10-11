export declare const PAGE_SECTIONS: string[];
export declare const BLOCKS: Record<string, Array<[string, string, string | null, string, string]>>;
export declare function seedBlocks(opts?: { url?: string }): Promise<{ sections: number; items: number }>;
