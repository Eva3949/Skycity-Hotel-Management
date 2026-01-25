import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/lib/types";
import { Button } from "../ui/button";
import { BedDouble, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-white/20 dark:border-slate-800/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={room.imageUrl || 'https://picsum.photos/seed/room/600/400'}
            alt={room.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            data-ai-hint={room.imageHint}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge 
            variant="secondary" 
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-none shadow-lg font-bold text-xs flex items-center gap-1.5 px-3 py-1"
          >
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>{room.capacity} Guests</span>
          </Badge>
          <Badge 
            variant="secondary" 
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-none shadow-lg font-bold text-xs flex items-center gap-1.5 px-3 py-1"
          >
            <BedDouble className="h-3.5 w-3.5 text-primary" />
            <span>{room.bedType}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 space-y-3">
        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors duration-300">
          {room.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-slate-600 dark:text-slate-400 leading-relaxed">
          {room.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-black font-headline text-primary tracking-tight">
            {formatCurrency(room.pricePerNight)} <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-1">BIRR</span>
          </p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">per night</p>
        </div>
        <div className="h-px flex-1 mx-6 bg-gradient-to-r from-primary/20 to-transparent" />
        <Button size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
