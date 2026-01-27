'use client';

import Link from 'next/link';
import { Bed, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 8.5v5.5a4 4 0 1 1-4-4V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5Z"/>
        <path d="M11.5 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
        <path d="M13 5v12"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
);

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-white/5">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          <div className="sm:col-span-2 lg:col-span-1">
             <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="p-2.5 bg-primary rounded-xl transition-transform group-hover:scale-110">
                  <Bed className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-headline font-extrabold tracking-tight text-white">
                    Skycity<span className="text-primary">Hotel</span>
                </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              {t.footer.aboutDescription}
            </p>
            <div className="flex space-x-5">
              <Link href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" aria-label="TikTok" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all"><TikTokIcon /></Link>
              <Link href="#" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all"><WhatsAppIcon /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-headline font-bold text-white mb-6 uppercase tracking-wider">{t.footer.navigation}</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span>&rsaquo;</span> {t.footer.home}</Link></li>
              <li><Link href="/#menu" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span>&rsaquo;</span> {t.footer.diningMenu}</Link></li>
              <li><Link href="/rooms" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span>&rsaquo;</span> {t.footer.luxuryRooms}</Link></li>
              <li><Link href="/bookings" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span>&rsaquo;</span> {t.footer.reservation}</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span>&rsaquo;</span> {t.footer.ourStory}</Link></li>
            </ul>
          </div>

           <div>
            <h3 className="text-lg font-headline font-bold text-white mb-6 uppercase tracking-wider">{t.footer.getInTouch}</h3>
             <div className="space-y-5 text-base">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400">{t.footer.address}</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400">(+251) 911 223 344</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400">hello@skycityhotel.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-headline font-bold text-white mb-6 uppercase tracking-wider">{t.footer.experience}</h3>
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="font-bold text-white mb-1">{t.footer.restaurantLounge}</p>
                <p className="text-slate-400 text-sm italic">{t.footer.daily}: 7:00 AM - 11:00 PM</p>
              </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="font-bold text-white mb-1">{t.footer.concierge}</p>
                <p className="text-slate-400 text-sm italic">{t.footer.support247}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-8">
                <p className="text-center md:text-left">&copy; {currentYear} Skycity Hotel Global. {t.footer.rights}</p>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link href="#" className="hover:text-primary transition-colors">{t.footer.privacy}</Link>
                    <Link href="#" className="hover:text-primary transition-colors">{t.footer.terms}</Link>
                    <Link href="#" className="hover:text-primary transition-colors">{t.footer.legal}</Link>
                </div>
                 <p className="text-center md:text-right font-medium">{t.footer.craftedBy} <a href="#" className="text-slate-300 hover:text-primary transition-colors">EvaDevStudio</a></p>
            </div>
        </div>
      </div>
    </footer>
  );
}
