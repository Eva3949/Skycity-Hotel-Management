"use client";

import { useState, useMemo } from "react";
import type { Room } from "@/lib/types";
import { RoomCard } from "./room-card";
import { Search, BedDouble, Users, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";

interface RoomsDisplayProps {
  rooms: Room[];
}

export function RoomsDisplay({ rooms }: RoomsDisplayProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [bedType, setBedType] = useState('all');
  const [capacity, setCapacity] = useState('all');

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBed = bedType === 'all' || room.bedType.toLowerCase() === bedType.toLowerCase();
      const matchesCapacity = capacity === 'all' || room.capacity >= parseInt(capacity);
      
      return matchesSearch && matchesBed && matchesCapacity;
    });
  }, [rooms, searchQuery, bedType, capacity]);

  const bedTypes = Array.from(new Set(rooms.map(r => r.bedType)));

  return (
    <div className="space-y-12">
      <div id="rooms" className="text-center mb-12 scroll-mt-24">
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
          {t.rooms.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.rooms.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-2 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800/50 shadow-2xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder={t.rooms.searchPlaceholder}
            className="pl-11 h-12 bg-transparent border-none focus-visible:ring-0 text-slate-700 dark:text-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={bedType} onValueChange={setBedType}>
          <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-none shadow-sm rounded-xl focus:ring-1 focus:ring-primary/20">
            <div className="flex items-center">
              <BedDouble className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder={t.rooms.bedType} />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-white/20 dark:border-slate-800/50 backdrop-blur-xl">
            <SelectItem value="all">{t.rooms.allBedTypes}</SelectItem>
            {bedTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={capacity} onValueChange={setCapacity}>
          <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-none shadow-sm rounded-xl focus:ring-1 focus:ring-primary/20">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              <SelectValue placeholder={t.rooms.minCapacity} />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-white/20 dark:border-slate-800/50 backdrop-blur-xl">
            <SelectItem value="all">{t.rooms.anyCapacity}</SelectItem>
            <SelectItem value="1">1+ {t.rooms.guest}</SelectItem>
            <SelectItem value="2">2+ {t.rooms.guests}</SelectItem>
            <SelectItem value="3">3+ {t.rooms.guests}</SelectItem>
            <SelectItem value="4">4+ {t.rooms.guests}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-100/30 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-700 dark:text-slate-200">{t.rooms.noMatchingRooms}</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">{t.rooms.noMatchingRoomsDesc}</p>
          <button 
            onClick={() => {setSearchQuery(''); setBedType('all'); setCapacity('all');}}
            className="mt-8 px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          >
            {t.rooms.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}