import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-white/20 dark:border-slate-800/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <Image
            src={item.imageUrl || 'https://picsum.photos/seed/food/600/400'}
            alt={item.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            data-ai-hint={item.imageHint}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-none shadow-lg font-bold text-xs uppercase tracking-wider px-3 py-1"
        >
          {item.itemType}
        </Badge>
      </CardHeader>
      <CardContent className="p-6 flex-1 space-y-3">
        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors duration-300">
          {item.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-slate-600 dark:text-slate-400 leading-relaxed">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <p className="text-2xl font-black font-headline text-primary tracking-tight">
          {formatCurrency(item.price)} <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-1">BIRR</span>
        </p>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-primary/20 to-transparent" />
      </CardFooter>
    </Card>
  );
}
