import { unstable_noStore as noStore } from 'next/cache';
import type { Room } from './types';
import { db } from './db';
import { rooms, bookings } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getRooms(): Promise<Room[]> {
  noStore();
  let retries = 3;
  while (retries > 0) {
    try {
      const result = await db.select().from(rooms);
      return result.map(r => ({
        ...r,
        imageUrl: r.imageUrl || undefined
      }));
    } catch (error: any) {
      console.error(`Error fetching rooms (retries left: ${retries - 1}):`, error.message);
      retries--;
      if (retries === 0) {
        // Fallback to empty array instead of crashing if possible, or rethrow
        console.error("All retries failed for getRooms.");
        return [];
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return [];
}

export async function getRoomById(id: string): Promise<Room | null> {
    noStore();
    const result = await db.select().from(rooms).where(eq(rooms.id, id));
    const room = result[0];
    if (!room) return null;
    return {
      ...room,
      imageUrl: room.imageUrl || undefined
    };
}

export async function addRoom(roomData: Omit<Room, 'id' | 'imageHint'>): Promise<Room> {
  const id = crypto.randomUUID();
  const newRoom = {
    id,
    ...roomData,
    imageHint: 'hotel room',
  };
  await db.insert(rooms).values(newRoom);
  return {
    ...newRoom,
    imageUrl: newRoom.imageUrl || undefined
  };
}

export async function updateRoom(id: string, roomData: Partial<Omit<Room, 'id' | 'imageHint'>>): Promise<Room | null> {
  await db.update(rooms).set(roomData).where(eq(rooms.id, id));
  return await getRoomById(id);
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    // Delete associated bookings first
    await db.delete(bookings).where(eq(bookings.roomId, id));
    await db.delete(rooms).where(eq(rooms.id, id));
    return true;
  } catch (error) {
    return false;
  }
}

// For compatibility with existing imports
export const roomsData: Room[] = []; 
