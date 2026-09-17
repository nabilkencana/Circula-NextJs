/**
 * Centralized API Client — UKK RPL Paket A
 * Implements the full apiRequest<T> pattern with:
 * - Automatic x-app-key injection (env → localStorage → default)
 * - Automatic Authorization Bearer injection
 * - Structured error throwing with backend message
 * - Offline-safe fallback helpers
 */

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

export const DEFAULT_APP_KEY =
  process.env.NEXT_PUBLIC_DEFAULT_APP_KEY ||
  "97945213-34a7-48cf-baac-8740c1d18765";

// Storage keys (single source of truth)
export const APP_KEY_STORAGE_KEY = "circula_app_key";
export const TOKEN_STORAGE_KEY = "circula_token";
export const USER_STORAGE_KEY = "circula_user";
export const ROLE_STORAGE_KEY = "circula_role";

// ─── Typed API response envelope ─────────────────────────────────────────────

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

// ─── Key helpers ──────────────────────────────────────────────────────────────

export function getAppKey(): string {
  if (process.env.NEXT_PUBLIC_DEFAULT_APP_KEY) {
    return process.env.NEXT_PUBLIC_DEFAULT_APP_KEY;
  }
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(APP_KEY_STORAGE_KEY);
    if (stored) return stored;
  }
  return DEFAULT_APP_KEY;
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
  return null;
}

export function saveAppKey(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(APP_KEY_STORAGE_KEY, key);
  }
}

export function hasAppKey(): boolean {
  return !!getAppKey();
}

// ─── Core request function ────────────────────────────────────────────────────

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const { timeoutMs = 5000, ...fetchOptions } = options;

  const token = getToken();
  const appKey = getAppKey();

  const headers = new Headers(fetchOptions.headers || {});

  if (appKey) {
    headers.set("x-app-key", appKey);
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(fetchOptions.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const resJson: ApiResponse<T> = await response.json();

    if (!response.ok || !resJson.success) {
      throw new Error(resJson.message || `HTTP Error ${response.status}`);
    }

    return resJson.data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const msg =
      error instanceof Error
        ? error.name === "AbortError"
          ? "Request timeout — server tidak merespons."
          : error.message
        : "Network error";

    console.error(
      `[API] ${fetchOptions.method ?? "GET"} ${endpoint}: ${msg}`
    );
    throw new Error(msg);
  }
}

// ─── Auth header builder (for services that still need raw headers) ───────────

export function buildAuthHeaders(
  extra: Record<string, string> = {}
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extra,
  };
  const appKey = getAppKey();
  if (appKey) headers["x-app-key"] = appKey;
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// Legacy alias for backward compatibility
export const fetchWithAuth = async <T>(
  url: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<{ data: T | null; error: string | null; status: number | null; ok: boolean }> => {
  // Strip BASE_URL prefix if present to get the endpoint
  const endpoint = url.startsWith(BASE_URL)
    ? url.slice(BASE_URL.length)
    : url.startsWith("http")
    ? url // full external URL — call directly
    : url;

  try {
    if (endpoint.startsWith("http")) {
      // External absolute URL: call directly without BASE_URL prefix
      const { timeoutMs = 5000, ...fetchOptions } = options;
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(endpoint, {
        ...fetchOptions,
        headers: buildAuthHeaders(fetchOptions.headers as Record<string, string>),
        signal: controller.signal,
      });
      clearTimeout(t);
      let data: T | null = null;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        try {
          const json = await res.json();
          data = (json?.data ?? json) as T;
        } catch { data = null; }
      }
      return { data, error: res.ok ? null : `HTTP ${res.status}`, status: res.status, ok: res.ok };
    }

    const data = await apiRequest<T>(endpoint, options);
    return { data, error: null, status: 200, ok: true };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Error", status: null, ok: false };
  }
};
