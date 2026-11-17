import React from 'react';
import {
  Shield,
  Flame,
  ShieldAlert,
  Home,
  LayoutGrid,
  Search,
  Mail,
  Globe,
  MapPin,
  Phone,
  Database,
  Car,
  Gamepad2,
  Zap,
  Activity,
  Video,
  Crosshair,
  Hash,
  FlaskConical,
  Wrench,
  FileText,
  Clock,
  Settings,
  Bug,
  LogOut,
  X,
  Radio,
} from 'lucide-react';
import { MenuId, MenuCategory } from '../types';

interface SidebarProps {
  activeMenu: MenuId;
  onSelectMenu: (id: MenuId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    category: 'UTAMA',
    items: [
      { id: 'cyber-patrol', label: 'Cyber Patrol', iconName: 'Shield' },
      { id: 'karhutla', label: 'Karhutla', iconName: 'Flame' },
      { id: 'cyber', label: 'Cyber', iconName: 'ShieldAlert' },
      { id: 'beranda', label: 'Beranda', iconName: 'Home' },
      { id: 'osint-hub', label: 'OSINT Hub', iconName: 'LayoutGrid' },
    ],
  },
  {
    category: 'RECON',
    items: [
      { id: 'username', label: 'Username', iconName: 'Search' },
      { id: 'email', label: 'Email', iconName: 'Mail' },
      { id: 'domain', label: 'Domain', iconName: 'Globe' },
      { id: 'ip-lookup', label: 'IP lookup', iconName: 'MapPin' },
    ],
  },
  {
    category: 'INDONESIA',
    items: [
      { id: 'nomor-wa', label: 'Nomor WA', iconName: 'Phone' },
    ],
  },
  {
    category: 'RECON',
    items: [
      { id: 'sumber-publik', label: 'Sumber publik', iconName: 'Database' },
    ],
  },
  {
    category: 'INDONESIA',
    items: [
      { id: 'plat-nomor', label: 'Plat nomor', iconName: 'Car' },
      { id: 'id-game', label: 'ID game', iconName: 'Gamepad2' },
      { id: 'pln', label: 'PLN', iconName: 'Zap' },
      { id: 'gempa', label: 'Gempa', iconName: 'Activity' },
      { id: 'cctv-publik', label: 'CCTV publik', iconName: 'Video' },
    ],
  },
  {
    category: 'RECON',
    items: [
      { id: 'intel-center', label: 'Intel Center', iconName: 'Crosshair' },
    ],
  },
  {
    category: 'LAINNYA',
    items: [
      { id: 'utilities', label: 'Utilities', iconName: 'Hash' },
    ],
  },
  {
    category: 'RECON',
    items: [
      { id: 'security-lab', label: 'Security Lab', iconName: 'FlaskConical' },
    ],
  },
  {
    category: 'LAINNYA',
    items: [
      { id: 'toolkit', label: 'Toolkit', iconName: 'Wrench' },
      { id: 'catatan', label: 'Catatan', iconName: 'FileText' },
      { id: 'riwayat', label: 'Riwayat', iconName: 'Clock' },
      { id: 'pengaturan', label: 'Pengaturan', iconName: 'Settings' },
      { id: 'lapor-bug', label: 'Lapor bug', iconName: 'Bug' },
      { id: 'keluar', label: 'Keluar', iconName: 'LogOut', isDanger: true },
    ],
  },
];

const renderIcon = (name: string, isActive: boolean, isDanger?: boolean) => {
  const iconColor = isDanger
    ? 'text-red-500'
    : isActive
    ? 'text-[#7C3AED]'
    : 'text-[#888888] group-hover:text-[#cccccc]';

  const props = { className: `w-[18px] h-[18px] shrink-0 ${iconColor}` };

  switch (name) {
    case 'Shield': return <Shield {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'Home': return <Home {...props} />;
    case 'LayoutGrid': return <LayoutGrid {...props} />;
    case 'Search': return <Search {...props} />;
    case 'Mail': return <Mail {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'MapPin': return <MapPin {...props} />;
    case 'Phone': return <Phone {...props} />;
    case 'Database': return <Database {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Gamepad2': return <Gamepad2 {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Video': return <Video {...props} />;
    case 'Crosshair': return <Crosshair {...props} />;
    case 'Hash': return <Hash {...props} />;
    case 'FlaskConical': return <FlaskConical {...props} />;
    case 'Wrench': return <Wrench {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'Settings': return <Settings {...props} />;
    case 'Bug': return <Bug {...props} />;
    case 'LogOut': return <LogOut {...props} />;
    default: return <Radio {...props} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  onSelectMenu,
  mobileOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Fixed 280px sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[280px] bg-[#0F0F0F] border-r border-[#262626] z-50 flex flex-col transition-transform duration-200 select-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#262626] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#161616] border border-[#262626] flex items-center justify-center text-[#7C3AED]">
                <Shield className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base tracking-tight">BARAOSINT</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161616] text-[#7C3AED] border border-[#262626]">PRO</span>
                </div>
                <p className="text-[11px] text-[#777777] font-medium leading-tight">Public Data Intel</p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden text-[#888888] hover:text-white p-1 rounded hover:bg-[#1A1A1A]"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Box - Sesuai video VALZOSINT */}
          <div className="mt-3.5 p-2 rounded-lg bg-[#161616] border border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1F1F1F] border border-[#333333] flex items-center justify-center font-bold text-xs text-white">
                V
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-tight leading-snug">VALZOSINT</span>
                <span className="text-[10px] font-mono text-[#888888]">@123456</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0F0F0F] px-2 py-0.5 rounded border border-[#262626]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {MENU_CATEGORIES.map((cat, catIdx) => (
            <div key={`${cat.category}-${catIdx}`} className="mb-2">
              <div className="px-4 py-1 text-[11px] font-semibold tracking-wider text-[#555555] uppercase">
                {cat.category}
              </div>
              <div className="space-y-0.5">
                {cat.items.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectMenu(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full group flex items-center gap-3 px-4 py-2 text-[13px] font-medium transition-colors text-left ${
                        item.isDanger
                          ? 'text-red-400 hover:bg-[#1A1A1A]'
                          : isActive
                          ? 'bg-[#1A1A1A] text-white border-l-[3px] border-[#7C3AED]'
                          : 'text-[#888888] hover:bg-[#1A1A1A] hover:text-[#E0E0E0] border-l-[3px] border-transparent'
                      }`}
                    >
                      {renderIcon(item.iconName, isActive, item.isDanger)}
                      <span className="truncate">{item.label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-[#262626] text-[11px] text-[#555555] shrink-0 flex items-center justify-between">
          <span>v2.4.0-stable</span>
          <span className="font-mono text-[10px] text-[#7C3AED]">SEC-OK</span>
        </div>
      </aside>
    </>
  );
};
