"use client";

import { useState, useMemo } from "react";
import type { Category, MenuItem } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "./menu-item-card";
import { CakeSlice, Coffee, Soup, Utensils, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";

interface MenuDisplayProps {
  categories: Category[];
  items: MenuItem[];
}

const getCategoryIcon = (categoryName: string) => {
  const lowerCaseName = categoryName.toLowerCase();
  if (lowerCaseName.includes("drink")) return <Coffee className="mr-2 h-5 w-5" />;
  if (lowerCaseName.includes("dessert")) return <CakeSlice className="mr-2 h-5 w-5" />;
  if (lowerCaseName.includes("appetizer")) return <Soup className="mr-2 h-5 w-5" />;
  return <Utensils className="mr-2 h-5 w-5" />;
};

export function MenuDisplay({ categories, items }: MenuDisplayProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const defaultTab = categories.length > 0 ? categories[0].id : "";

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return (
    <div className="space-y-12">
      <div id="menu" className="text-center mb-12 scroll-mt-24">
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-foreground mt-2">
          {t.menu.title}
        </h2>
      </div>
      <div className="relative max-w-xl mx-auto px-4 md:px-0">
        <div className="absolute inset-y-0 left-8 md:left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          placeholder={t.menu.searchPlaceholder}
          className="pl-12 h-12 md:h-14 text-base md:text-lg rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-white/20 dark:border-slate-800/50 shadow-xl focus:ring-primary/20 transition-all placeholder:text-slate-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent -z-10 blur-xl opacity-50 mx-4 md:mx-0" />
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex justify-center mb-6 md:mb-10 px-4">
          <TabsList className="flex flex-wrap h-auto p-1 md:p-1.5 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-lg border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-inner">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="px-3 py-2 md:px-6 md:py-3 rounded-xl flex items-center gap-1.5 md:gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all duration-300"
              >
                <span className="hidden xs:inline-flex">{getCategoryIcon(category.name)}</span>
                <span className="font-bold tracking-tight text-sm md:text-base">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => {
          const itemsInCategory = filteredItems.filter(
            (item) => item.categoryId === category.id
          );
          return (
            <TabsContent 
              key={category.id} 
              value={category.id} 
              className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
            >
              {itemsInCategory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {itemsInCategory.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-100/30 dark:bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Utensils className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">{t.menu.noItems}</h3>
                  <p className="text-slate-500 dark:text-slate-500 mt-2 max-w-xs mx-auto">
                    {searchQuery 
                      ? t.menu.noMatches 
                      : t.menu.updating}
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
