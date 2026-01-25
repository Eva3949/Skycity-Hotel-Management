import { Header } from '@/components/layout/header';
import { getBookings, getCustomers } from '@/lib/data';
import { getRooms } from '@/lib/rooms-data';
import { Footer } from '@/components/layout/footer';
import { BookingsClient } from './bookings-client';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const roomId = typeof resolvedSearchParams.roomId === 'string' ? resolvedSearchParams.roomId : null;

  const [bookings, rooms, customers] = await Promise.all([
    getBookings(),
    getRooms(),
    getCustomers(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <BookingsClient 
          bookings={bookings} 
          rooms={rooms} 
          customers={customers} 
          initialRoomId={roomId}
        />
      </main>
      <Footer />
    </div>
  );
}
