/**
 * Zero-dependency Supabase Auth Client
 * Uses only native fetch() + localStorage for session persistence.
 * No @supabase/supabase-js required.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const SESSION_KEY = 'java_jones_supabase_session';

// ── Types ──────────────────────────────────────────────────

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at: number; // unix seconds
  user: SupabaseUser;
}

export interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthResult {
  ok: boolean;
  session: SupabaseSession | null;
  error: string | null;
}

// ── Helpers ────────────────────────────────────────────────

function headers(accessToken?: string): Record<string, string> {
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
  };
  if (accessToken) {
    h['Authorization'] = `Bearer ${accessToken}`;
  }
  return h;
}

function saveSession(session: SupabaseSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // storage full or disabled — silently ignore
  }
}

function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function getStoredSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SupabaseSession;
  } catch {
    return null;
  }
}

function parseAuthResponse(data: any): SupabaseSession {
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
    user: {
      id: data.user.id,
      email: data.user.email ?? '',
      created_at: data.user.created_at,
    },
  };
}

// ── Auth Methods ───────────────────────────────────────────

/**
 * Sign up with email + password.
 */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, session: null, error: data.error_description || data.msg || data.message || 'Signup failed' };
    }

    // Supabase may require email confirmation — if so, access_token may be absent
    if (!data.access_token) {
      return {
        ok: true,
        session: null,
        error: null, // no error, but session is null until confirmed
      };
    }

    const session = parseAuthResponse(data);
    saveSession(session);
    return { ok: true, session, error: null };
  } catch (err: any) {
    return { ok: false, session: null, error: err.message || 'Network error' };
  }
}

/**
 * Sign in with email + password.
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, session: null, error: data.error_description || data.msg || data.message || 'Login failed' };
    }

    const session = parseAuthResponse(data);
    saveSession(session);
    return { ok: true, session, error: null };
  } catch (err: any) {
    return { ok: false, session: null, error: err.message || 'Network error' };
  }
}

/**
 * Sign out — invalidate server session and clear local storage.
 */
export async function signOut(): Promise<void> {
  const session = getStoredSession();
  if (session) {
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: headers(session.access_token),
      });
    } catch {
      // best-effort — clear local session regardless
    }
  }
  clearSession();
}

/**
 * Refresh the session using the stored refresh_token.
 * Returns a fresh session or null if refresh fails.
 */
export async function refreshSession(): Promise<SupabaseSession | null> {
  const current = getStoredSession();
  if (!current?.refresh_token) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ refresh_token: current.refresh_token }),
    });

    if (!res.ok) {
      clearSession();
      return null;
    }

    const data = await res.json();
    const session = parseAuthResponse(data);
    saveSession(session);
    return session;
  } catch {
    return null;
  }
}

/**
 * Get a valid session — refreshes if expired.
 * Returns null if no session exists or refresh fails.
 */
export async function getValidSession(): Promise<SupabaseSession | null> {
  const session = getStoredSession();
  if (!session) return null;

  const now = Math.floor(Date.now() / 1000);
  // Refresh if within 60 seconds of expiry
  if (session.expires_at - now < 60) {
    return await refreshSession();
  }

  return session;
}

/**
 * Fetch current user from the server using the access token.
 */
export async function getUser(accessToken: string): Promise<SupabaseUser | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: 'GET',
      headers: headers(accessToken),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return {
      id: data.id,
      email: data.email ?? '',
      created_at: data.created_at,
    };
  } catch {
    return null;
  }
}

// ── Supabase REST (PostgREST) helpers for data operations ──

/**
 * Make an authenticated GET request to a Supabase table via PostgREST.
 */
export async function supabaseGet<T = any>(
  table: string,
  query: string,
  accessToken: string
): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      method: 'GET',
      headers: {
        ...headers(accessToken),
        Prefer: 'return=representation',
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Upsert (insert or update) a row in a Supabase table via PostgREST.
 */
export async function supabaseUpsert(
  table: string,
  data: Record<string, any>,
  accessToken: string
): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        ...headers(accessToken),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
