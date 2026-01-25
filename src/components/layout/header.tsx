'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bed, Utensils, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { logoutAction } from '@/app/actions';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Use sessionStorage to persist login state only for the session
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
    setUserRole(sessionStorage.getItem('userRole'));
  }, [pathname]);


  const handleLogout = async () => {
    await logoutAction();
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    router.push('/login');
    router.refresh();
  };
  
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full py-3 md:py-4 px-3 md:px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex h-16 md:h-20 items-center justify-between rounded-xl md:rounded-2xl border border-white/20 bg-white/70 px-4 md:px-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
            <Link href="/" className="flex items-center gap-2 md:gap-3 transition-transform hover:scale-105">
            <div className="p-1.5 md:p-2 bg-primary rounded-lg md:rounded-xl shadow-lg shadow-primary/20">
              <Bed className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-headline font-extrabold tracking-tight text-foreground">
                Skycity<span className="text-primary">Hotel</span>
            </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" className="font-semibold text-base px-6 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                <Link href="/">
                <Utensils className="mr-2 h-4 w-4" />
                Menu
                </Link>
            </Button>
            <Button asChild variant="ghost" className="font-semibold text-base px-6 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                <Link href="/rooms">
                <Bed className="mr-2 h-4 w-4" />
                Rooms
                </Link>
            </Button>
            {isAdminPage && isAuthenticated && (
                <Button onClick={handleLogout} variant="ghost" className="font-semibold text-base px-6 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all ml-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            )}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              {isClient && (
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open navigation menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>
                            Access different sections of the Skycity Hotel website.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary rounded-xl">
                              <Bed className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-headline font-extrabold tracking-tight text-foreground">
                                Skycity<span className="text-primary">Hotel</span>
                            </span>
                        </Link>
                        <nav className="flex flex-col gap-2">
                            <Button asChild variant="ghost" className="font-bold justify-start">
                                <Link href="/">
                                <Utensils className="mr-2 h-4 w-4" />
                                Menu
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" className="font-bold justify-start">
                                <Link href="/rooms">
                                <Bed className="mr-2 h-4 w-4" />
                                Rooms
                                </Link>
                            </Button>
                            {isAdminPage && isAuthenticated && (
                                <Button onClick={handleLogout} variant="ghost" className="font-bold justify-start text-destructive hover:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            )}
                        </nav>
                    </div>
                    </SheetContent>
                </Sheet>
              )}
            </div>
        </div>
      </div>
    </header>
  );
}
