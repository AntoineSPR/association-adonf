import { getApiUrl } from './api';

// Allow internal fetch to self-signed localhost API during development only.
try {
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env) {
    if (import.meta.env.DEV) {
      // @ts-ignore
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
  }
} catch (e) {
  // Ignore
}

/**
 * Fetches JSONB content for a specific page slug from the backoffice API.
 */
export async function getPageContent<T>(slug: string): Promise<T | null> {
  try {
    const url = `${getApiUrl()}/api/pagecontent/${slug}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(
        `Failed to fetch content for /${slug}: ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();

    if (!data.content || Object.keys(data.content).length === 0) {
      return null;
    }

    return data.content as T;
  } catch (error) {
    console.warn(`Error fetching content for /${slug}.`, error);
    return null;
  }
}
