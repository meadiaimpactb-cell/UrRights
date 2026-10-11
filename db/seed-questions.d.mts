export declare const QUESTIONS: Record<string, Array<[string, string, Array<[string, string]>]>>;
export declare const FORM_TEXTS: Record<string, [string, string]>;
export declare function seedQuestions(opts?: { url?: string }): Promise<{ questions: number; options: number }>;
