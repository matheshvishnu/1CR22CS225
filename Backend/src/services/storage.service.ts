export interface UrlData {
  longUrl: string;
  createdAt: string;
  expiresAt: string;
  clicks: { timestamp: string; source: string | undefined }[];
}

export const urlStore = new Map<string, UrlData>();

// This line explicitly tells TypeScript this is a module.
export {};
