import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Fish,
  AlertTriangle,
  Globe,
  Radio,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { CYBER_STATS, RECENT_THREATS, ATTACK_LOGS } from '../data/mockData';

export const CyberPatrolPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('Beranda');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const subTabs = ['Beranda', 'Ancaman', 'Target', 'Server', 'Laporan', 'Log', 'Pengaturan'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header section with sub-tabs as seen in video */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Cyber Patrol AI</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#161616] text-[#7C3AED] border border-[#262626]">
              LIVE MONITOR
            </span>
          </div>
          <p className="text-xs text-[#888888] mt-0.5">
            Public-data investigation monitoring & threat detection workspace
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161616] hover:bg-[#1E1E1E] text-xs text-[#CCCCCC] border border-[#262626] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#7C3AED]' : ''}`} />
            <span>Segarkan</span>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161616] border border-[#262626] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#A0A0A0]">Sinkronisasi Otomatis</span>
          </div>
        </div>
      </div>

      {/* Sub-nav horizontal tabs (exact layout from video) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#262626]">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#1A1A1A] text-white border border-[#262626] text-[#7C3AED]'
                  : 'text-[#888888] hover:text-[#DDDDDD] hover:bg-[#161616]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 4 Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1 */}
        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#888888] font-medium">Total Ancaman</span>
            <ShieldAlert className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{CYBER_STATS.totalAncaman}</span>
            <span className="text-[11px] text-red-400 font-medium">+14.2%</span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">Deteksi malware & exploit aktif</p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#888888] font-medium">Server Dipetakan</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{CYBER_STATS.serverDipetakan}</span>
            <span className="text-[11px] text-[#888888]">dari 3.780 IP unik</span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">C2 Node & honeypot terdaftar</p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#888888] font-medium">Phishing Aktif</span>
            <Fish className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{CYBER_STATS.phishing}</span>
            <span className="text-[11px] text-amber-400 font-medium">Feed open/public</span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">Domain tiruan instansi & bank</p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#888888] font-medium">Skor Risiko</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{CYBER_STATS.skorRisiko}</span>
            <span className="text-[11px] text-red-400 font-semibold px-1.5 py-0.5 rounded bg-red-950/40 border border-red-900/40">
              KRITIS
            </span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">Indeks kerentanan publik</p>
        </div>
      </div>

      {/* 2 Kolom: Kiri Aktivitas Terbaru, Kanan Peta Serangan Siber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Kolom Kiri: Ancaman Terbaru */}
        <div className="lg:col-span-5 bg-[#161616] border border-[#262626] rounded-lg p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <h3 className="text-sm font-semibold text-white">Aktivitas Terbaru</h3>
            </div>
            <span className="text-[11px] text-[#777777] font-mono">LIVE FEED</span>
          </div>

          <div className="divide-y divide-[#222222] overflow-y-auto max-h-[380px]">
            {RECENT_THREATS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedThreat(item.name)}
                className={`py-3 px-1 cursor-pointer transition-colors rounded ${
                  selectedThreat === item.name ? 'bg-[#1F1F1F]' : 'hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.status === 'high'
                          ? 'bg-red-500'
                          : item.status === 'medium'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#202020] text-[#999999] border border-[#2B2B2B]">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#777777]">{item.timestamp}</span>
                </div>

                <div className="mt-1.5 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-[#888888] truncate max-w-[220px]">
                    {item.url}
                  </div>
                  <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-1.5 py-0.5 rounded border border-[#7C3AED]/30">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-auto border-t border-[#262626] flex items-center justify-between text-[11px] text-[#777777]">
            <span>Menampilkan 6 dari 350 sampel</span>
            <button className="text-[#7C3AED] hover:underline flex items-center gap-1">
              <span>Lihat semua feed</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Peta Serangan Siber (World map visual with live nodes) */}
        <div className="lg:col-span-7 bg-[#161616] border border-[#262626] rounded-lg p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-semibold text-white">Peta Serangan Siber</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] text-red-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                LIVE ATTACKS
              </span>
            </div>
          </div>

          {/* Interactive World Map Canvas / Graphic */}
          <div className="mt-3 relative h-[250px] sm:h-[280px] bg-[#0F0F0F] border border-[#262626] rounded-lg overflow-hidden flex items-center justify-center">
            {/* World grid lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Stylized SVG Map silhouette */}
            <svg
              className="w-full h-full object-contain opacity-35"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* North America */}
              <path d="M120 120 Q180 80 240 110 T300 200 T220 280 T140 220 Z" fill="#333333" />
              {/* South America */}
              <path d="M260 290 Q300 320 310 400 T270 470 T240 370 Z" fill="#333333" />
              {/* Europe */}
              <path d="M480 110 Q540 100 560 160 T510 200 T460 160 Z" fill="#333333" />
              {/* Africa */}
              <path d="M470 210 Q560 220 570 320 T520 430 T460 300 Z" fill="#333333" />
              {/* Asia */}
              <path d="M570 110 Q700 80 820 140 T840 260 T680 250 T580 180 Z" fill="#333333" />
              {/* Indonesia & SE Asia archipelago */}
              <ellipse cx="760" cy="310" rx="45" ry="15" fill="#7C3AED" opacity="0.6" />
              <ellipse cx="800" cy="330" rx="35" ry="12" fill="#7C3AED" opacity="0.6" />
              <ellipse cx="730" cy="290" rx="25" ry="10" fill="#7C3AED" opacity="0.6" />
              {/* Australia */}
              <path d="M780 370 Q860 360 880 430 T800 460 T760 410 Z" fill="#333333" />

              {/* Attack Vector Curves */}
              <path d="M250 180 Q500 150 760 310" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
              <path d="M520 150 Q640 200 780 320" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />
              <path d="M680 160 Q720 220 750 300" stroke="#F59E0B" strokeWidth="1.5" opacity="0.7" />
              <path d="M820 180 Q800 240 760 310" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.7" />
            </svg>

            {/* Glowing Target Nodes */}
            <div className="absolute top-[38%] left-[24%] flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="ml-2 text-[9px] font-mono text-red-300 bg-black/80 px-1 rounded border border-red-900/50">US-EAST</span>
            </div>

            <div className="absolute top-[28%] left-[51%] flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="ml-2 text-[9px] font-mono text-amber-300 bg-black/80 px-1 rounded border border-amber-900/50">EU-CENTRAL</span>
            </div>

            <div className="absolute top-[25%] left-[67%] flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="ml-2 text-[9px] font-mono text-red-300 bg-black/80 px-1 rounded border border-red-900/50">RU-MOSCOW</span>
            </div>

            {/* Central Target - Indonesia (Highlighted with Purple badge) */}
            <div className="absolute top-[61%] left-[75%] flex flex-col items-center">
              <span className="w-5 h-5 rounded-full bg-[#7C3AED] opacity-40 animate-ping absolute" />
              <span className="w-3 h-3 rounded-full bg-[#7C3AED] border-2 border-white" />
              <div className="mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-[#7C3AED] text-[10px] font-mono text-white flex items-center gap-1 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>INDONESIA (TARGET)</span>
              </div>
            </div>

            {/* Live Stats Overlay in Map */}
            <div className="absolute bottom-2 left-2 bg-[#121212]/90 border border-[#262626] rounded px-2.5 py-1.5 text-[10px] font-mono text-[#AAAAAA] flex items-center gap-3">
              <span>Traffic: 4.8 Gbps</span>
              <span className="text-red-400">Atk Rate: 1.240 req/s</span>
              <span className="text-[#7C3AED]">Prot: HTTPS/TCP</span>
            </div>
          </div>

          {/* Quick Attack Status Counters */}
          <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-[#262626] text-center">
            <div className="p-2 rounded bg-[#0F0F0F] border border-[#262626]">
              <div className="text-[10px] text-[#777777]">Serangan Terblokir</div>
              <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">99.4%</div>
            </div>
            <div className="p-2 rounded bg-[#0F0F0F] border border-[#262626]">
              <div className="text-[10px] text-[#777777]">Rata-rata Respon</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">18 ms</div>
            </div>
            <div className="p-2 rounded bg-[#0F0F0F] border border-[#262626]">
              <div className="text-[10px] text-[#777777]">C2 Aktif Terpantau</div>
              <div className="text-sm font-bold font-mono text-amber-400 mt-0.5">42 Node</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Tabel Log Ancaman + Grafik Garis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tabel Log Ancaman */}
        <div className="lg:col-span-8 bg-[#161616] border border-[#262626] rounded-lg p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-semibold text-white">Log Ancaman Siber (Real-time Stream)</h3>
            </div>
            <span className="text-[11px] font-mono text-[#666666]">PORT SCAN & EXPLOIT</span>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#262626] text-[#777777] font-mono text-[11px]">
                  <th className="py-2 px-2">WAKTU</th>
                  <th className="py-2 px-2">IP SUMBER</th>
                  <th className="py-2 px-2">IP TUJUAN</th>
                  <th className="py-2 px-2">ALIRAN</th>
                  <th className="py-2 px-2">JENIS ANCAMAN</th>
                  <th className="py-2 px-2 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020] font-mono text-[11px]">
                {ATTACK_LOGS.map((log, idx) => (
                  <tr key={idx} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-2 px-2 text-[#888888]">{log.time}</td>
                    <td className="py-2 px-2 text-red-400 font-semibold">{log.sourceIp}:{log.port}</td>
                    <td className="py-2 px-2 text-emerald-400">{log.destIp}</td>
                    <td className="py-2 px-2 text-[#AAAAAA]">{log.country}</td>
                    <td className="py-2 px-2 text-white font-sans">{log.attack}</td>
                    <td className="py-2 px-2 text-right">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.action === 'BLOCKED'
                            ? 'bg-red-950/60 text-red-400 border border-red-900/40'
                            : log.action === 'FILTERED'
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-900/40'
                            : 'bg-blue-950/60 text-blue-400 border border-blue-900/40'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik Garis Kecil Hijau/Orange Dummy */}
        <div className="lg:col-span-4 bg-[#161616] border border-[#262626] rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <h3 className="text-sm font-semibold text-white">Statistik Ancaman (30 Hari)</h3>
              <span className="text-[10px] font-mono text-emerald-400">TREND 2026</span>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#888888]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-full bg-emerald-400" />
                <span>Malware (Hijau)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 rounded-full bg-amber-400" />
                <span>Phishing (Oranye)</span>
              </div>
            </div>

            {/* Simulated Line Chart with SVG */}
            <div className="mt-4 h-32 w-full relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80" fill="none">
                {/* Horizontal reference lines */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="#262626" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#262626" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="200" y2="75" stroke="#262626" />

                {/* Orange Line (Phishing) */}
                <polyline
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  points="0,60 25,50 50,55 75,35 100,45 125,20 150,30 175,15 200,25"
                />

                {/* Green Line (Malware) */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  points="0,70 25,65 50,40 75,50 100,30 125,35 150,15 175,25 200,10"
                />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#666666] mt-2">
              <span>01 Okt</span>
              <span>10 Okt</span>
              <span>20 Okt</span>
              <span>30 Okt</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#262626] mt-4 flex items-center justify-between text-xs">
            <span className="text-[#888888]">Efektivitas Filter:</span>
            <span className="font-mono font-bold text-white">99.82%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
