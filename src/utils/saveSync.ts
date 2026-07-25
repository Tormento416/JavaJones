/**
 * Cloud Save Sync — syncs save slots to Supabase `profiles` table.
 * Uses zero-dependency native fetch via the supabase.ts helpers.
 *
 * Strategy: last-write-wins using `updated_at` timestamps.
 * localStorage remains the fast cache; Supabase is the cloud backup.
 */

import type { SupabaseSession } from './supabase';
import { supabaseGet, supabaseUpsert } from './supabase';
import type { SaveSlotData } from '../components/SaveSlotModal';

// ── Upload save slots to Supabase ──────────────────────────

let _uploadTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced upload — waits 2 seconds after last save change before pushing.
 * Prevents hammering Supabase on every keystroke or rapid state update.
 */
export function debouncedUpload(session: SupabaseSession, slots: SaveSlotData[]): void {
  if (_uploadTimer) clearTimeout(_uploadTimer);
  _uploadTimer = setTimeout(() => {
    uploadSaveSlots(session, slots);
  }, 2000);
}

/**
 * Immediately upload save slots to Supabase profiles table.
 */
export async function uploadSaveSlots(
  session: SupabaseSession,
  slots: SaveSlotData[]
): Promise<boolean> {
  return supabaseUpsert(
    'profiles',
    {
      id: session.user.id,
      email: session.user.email,
      save_slots: JSON.stringify(slots),
      updated_at: new Date().toISOString(),
    },
    session.access_token
  );
}

// ── Download save slots from Supabase ──────────────────────

/**
 * Download save slots from Supabase for the current user.
 * Returns the cloud save slots, or null if not found / error.
 */
export async function downloadSaveSlots(
  session: SupabaseSession
): Promise<SaveSlotData[] | null> {
  const rows = await supabaseGet<any[]>(
    'profiles',
    `id=eq.${session.user.id}&select=save_slots,updated_at`,
    session.access_token
  );

  if (!rows || rows.length === 0) return null;

  const profile = rows[0];
  if (!profile.save_slots) return null;

  try {
    // save_slots is stored as JSONB — may be string or already parsed
    const slots =
      typeof profile.save_slots === 'string'
        ? JSON.parse(profile.save_slots)
        : profile.save_slots;

    if (!Array.isArray(slots)) return null;
    return slots as SaveSlotData[];
  } catch {
    return null;
  }
}

/**
 * Merge local and cloud save slots using last-write-wins per slot.
 * Picks the more recently saved version of each slot.
 */
export function mergeSaveSlots(
  local: SaveSlotData[],
  cloud: SaveSlotData[]
): SaveSlotData[] {
  return local.map((localSlot) => {
    const cloudSlot = cloud.find((c) => c.id === localSlot.id);
    if (!cloudSlot) return localSlot;

    // If one is empty and the other has data, take the one with data
    if (!localSlot.gameState && cloudSlot.gameState) return cloudSlot;
    if (localSlot.gameState && !cloudSlot.gameState) return localSlot;
    if (!localSlot.gameState && !cloudSlot.gameState) return localSlot;

    // Both have data — compare timestamps (last-write-wins)
    const localTime = localSlot.lastSavedAt ? new Date(localSlot.lastSavedAt).getTime() : 0;
    const cloudTime = cloudSlot.lastSavedAt ? new Date(cloudSlot.lastSavedAt).getTime() : 0;

    return cloudTime > localTime ? cloudSlot : localSlot;
  });
}
