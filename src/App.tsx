/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, Shield, Key } from 'lucide-react';
import { MenuId } from './types';
import { Sidebar } from './components/Sidebar';
import { CyberPatrolPage } from './pages/CyberPatrolPage';
import { KarhutlaPage } from './pages/KarhutlaPage';
import { CctvPublikPage } from './pages/CctvPublikPage';
import { PlatNomorPage } from './pages/PlatNomorPage';
import { ReconPage } from './pages/ReconPages';
import { OtherPages } from './pages/OtherPages';
import { ApiKeyModal } from './components/ApiKeyModal';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuId>('cyber-patrol');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [keyUpdateTick, setKeyUpdateTick] = useState(0);

  const hasFirmsKey = typeof window !== 'undefined' && !!localStorage.getItem('nasa_firms_map_key');

  const renderContent = () => {
    switch (activeMenu) {
      case 'cyber-patrol':
        return <CyberPatrolPage />;
      case 'karhutla':
        return <KarhutlaPage onOpenApiKeyModal={() => setApiKeyModalOpen(true)} />;
      case 'cctv-publik':
        return <CctvPublikPage />;
      case 'plat-nomor':
        return <PlatNomorPage />;
      case 'username':
      case 'email':
      case 'domain':
      case 'ip-lookup':
      case 'nomor-wa':
      case 'sumber-publik':
      case 'id-game':
      case 'pln':
      case 'gempa':
        return <ReconPage type={activeMenu} />;
      default:
        return <OtherPages type={activeMenu} onNavigate={setActiveMenu} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] flex flex-col">
      {/* Mobile Top App Bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#0F0F0F] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg bg-[#161616] text-[#888888] hover:text-white border border-[#262626]"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#7C3AED]" />
            <span className="font-extrabold text-sm text-white tracking-tight">BARAOSINT</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-xs text-white"
          >
            <Key className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>API Key</span>
            {hasFirmsKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1">
        {/* Fixed 280px Left Sidebar */}
        <Sidebar
          activeMenu={activeMenu}
          onSelectMenu={(id) => setActiveMenu(id)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Right Flexible Content Area (padding 24px) */}
        <main className="flex-1 lg:pl-[280px] w-full min-w-0 flex flex-col">
          {/* Top Bar with API Key Button & System Status */}
          <div className="bg-[#0F0F0F] border-b border-[#262626] px-6 py-2.5 hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#888888] font-mono">BARAOSINT // INTEL</span>
              <span className="text-[#444444]">/</span>
              <span className="font-semibold text-white capitalize">{activeMenu.replace('-', ' ')}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setApiKeyModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#7C3AED]/60 text-xs text-white transition-all cursor-pointer group"
                title="Buka pop up konfigurasi NASA FIRMS API Key"
              >
                <Key className="w-3.5 h-3.5 text-[#7C3AED] group-hover:scale-110 transition-transform" />
                <span className="font-medium">NASA FIRMS API Key</span>
                {hasFirmsKey ? (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AKTIF
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#888888] bg-[#202020] px-1.5 py-0.2 rounded border border-[#2B2B2B]">
                    Atur Key
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 max-w-7xl mx-auto w-full flex-1">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Pop Up Kolom Input API Key NASA FIRMS */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onKeyUpdated={() => setKeyUpdateTick((t) => t + 1)}
      />
    </div>
  );
}
