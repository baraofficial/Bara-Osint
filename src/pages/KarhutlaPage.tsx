import React, { useState, useEffect } from 'react';
import {
  Flame,
  AlertCircle,
  MapPin,
  Calendar,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { KARHUTLA_STATS, KARHUTLA_REGIONS } from '../data/mockData';

interface KarhutlaPageProps {
  onOpenApiKeyModal?: () => void;
}

export const KarhutlaPage: React.FC<KarhutlaPageProps> = ({ onOpenApiKeyModal }) => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [timeFilter, setTimeFilter] = useState('7 Hari');
  const [selectedRegion, setSelectedRegion] = useState('Semua');
  const [zoomLevel, setZoomLevel] = useState(1);

  const hasKey = !!localStorage.getItem('nasa_firms_map_key');

  const filters = ['Semua', 'Intensitas tinggi', 'Siang', 'Malam', 'Indonesia', 'Asia Tenggara'];
  const timeRanges = ['24 Jam', '3 Hari', '7 Hari', 'Minggu Ini', 'Bulan Ini'];

  // Hotspots mockup points across Indonesia
  const hotspots = [
    // Kalimantan (highest density)
    { id: 1, top: '48%', left: '50%', conf: 'Tinggi', fwp: '84 MW', loc: 'Ketapang, Kalbar' },
    { id: 2, top: '44%', left: '54%', conf: 'Tinggi', fwp: '120 MW', loc: 'Kotawaringin, Kalteng' },
    { id: 3, top: '46%', left: '58%', conf: 'Sedang', fwp: '62 MW', loc: 'Kutai, Kaltim' },
    { id: 4, top: '50%', left: '53%', conf: 'Tinggi', fwp: '95 MW', loc: 'Banjar, Kalsel' },
    { id: 5, top: '42%', left: '52%', conf: 'Tinggi', fwp: '140 MW', loc: 'Pontianak Barat' },

    // Sumatera
    { id: 6, top: '42%', left: '26%', conf: 'Tinggi', fwp: '110 MW', loc: 'Rokan Hilir, Riau' },
    { id: 7, top: '48%', left: '29%', conf: 'Sedang', fwp: '45 MW', loc: 'Muaro Jambi, Jambi' },
    { id: 8, top: '53%', left: '33%', conf: 'Tinggi', fwp: '88 MW', loc: 'Ogan Komering Ilir, Sumsel' },
    { id: 9, top: '38%', left: '22%', conf: 'Sedang', fwp: '35 MW', loc: 'Aceh Barat' },

    // Papua
    { id: 10, top: '58%', left: '88%', conf: 'Tinggi', fwp: '105 MW', loc: 'Merauke, Papua Selatan' },
    { id: 11, top: '52%', left: '83%', conf: 'Sedang', fwp: '40 MW', loc: 'Mimika, Papua Tengah' },

    // Sulawesi & NTT
    { id: 12, top: '52%', left: '68%', conf: 'Sedang', fwp: '50 MW', loc: 'Maros, Sulsel' },
    { id: 13, top: '68%', left: '64%', conf: 'Sedang', fwp: '38 MW', loc: 'Sumba Timur, NTT' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-bold text-white tracking-tight">Karhutla Live</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#161616] text-[#7C3AED] border border-[#262626]">
              NASA FIRMS VIIRS / MODIS
            </span>
          </div>
          <p className="text-xs text-[#888888] mt-0.5">
            Titik panas real-time & satelit thermal pemantauan kebakaran hutan Asia Tenggara
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenApiKeyModal && (
            <button
              onClick={onOpenApiKeyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161616] hover:bg-[#1F1F1F] border border-[#262626] hover:border-[#7C3AED]/50 text-xs text-[#CCCCCC] transition-colors cursor-pointer"
              title="Buka pop up konfigurasi NASA FIRMS API Key"
            >
              <Key className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{hasKey ? 'NASA Key: Aktif' : 'Input NASA Key'}</span>
              {hasKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161616] border border-[#262626] text-xs text-[#CCCCCC]">
            <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Update Tiap 15 Menit</span>
          </div>
        </div>
      </div>

      {/* 3 Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <span className="text-xs text-[#888888] font-medium">Titik Panas 7 Hari / Total Tahun Ini</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">{KARHUTLA_STATS.totalTahunIni}</span>
            <span className="text-[11px] text-amber-400 font-mono">10-11 s/d 10-14</span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">Total akumulasi deteksi thermal FIRMS</p>
        </div>

        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <span className="text-xs text-[#888888] font-medium">Titik Panas Hari Ini</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-400 font-mono">{KARHUTLA_STATS.hariIni}</span>
            <span className="text-[11px] text-red-400 font-semibold px-1.5 py-0.5 rounded bg-red-950/40 border border-red-900/40">
              AKTIF
            </span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">Konsentrasi di Riau & Kalimantan</p>
        </div>

        <div className="bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] p-4 rounded-lg transition-colors">
          <span className="text-xs text-[#888888] font-medium">Kepercayaan Tinggi (High Conf)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-red-500 font-mono">{KARHUTLA_STATS.resikoTinggi}</span>
            <span className="text-[11px] text-[#888888]">dari 92.141</span>
          </div>
          <p className="text-[11px] text-[#666666] mt-1">{KARHUTLA_STATS.nominalTinggi} - {KARHUTLA_STATS.rendah}</p>
        </div>
      </div>

      {/* Filter Bar (Semua tombol bergaya ungu flat) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121212] p-2.5 rounded-lg border border-[#262626]">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#7C3AED] text-white shadow-none'
                    : 'bg-[#181818] text-[#888888] hover:text-white hover:bg-[#202020] border border-[#262626]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded border border-[#262626]">
          {timeRanges.map((tr) => (
            <button
              key={tr}
              onClick={() => setTimeFilter(tr)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                timeFilter === tr
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {tr}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Bar Chart "Deteksi per hari" & "Sebaran Wilayah" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart Deteksi Per Hari (Oranye sesuai video) */}
        <div className="lg:col-span-7 bg-[#161616] border border-[#262626] rounded-lg p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div>
              <h3 className="text-sm font-semibold text-white">Deteksi Per Hari</h3>
              <p className="text-[11px] text-[#777777]">Siklus kenaikan titik api harian</p>
            </div>
            <span className="text-[11px] font-mono text-amber-400">SUMBER: VIIRS/MODIS</span>
          </div>

          <div className="mt-4 h-48 flex items-end justify-between gap-3 px-2 pt-4">
            {[
              { day: '10-09', count: 18400, height: '45%' },
              { day: '10-10', count: 24200, height: '60%' },
              { day: '10-11', count: 38900, height: '88%' },
              { day: '10-12', count: 28500, height: '70%' },
              { day: '10-13', count: 32100, height: '80%' },
              { day: '10-14', count: 14200, height: '35%' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-mono text-[#888888] opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.count.toLocaleString()}
                </div>
                <div
                  style={{ height: bar.height }}
                  className="w-full bg-[#EA580C] hover:bg-[#F97316] rounded-t transition-all cursor-pointer"
                />
                <span className="text-[10px] font-mono text-[#888888]">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-[#888888]">
            <span>Puncak Deteksi: 10-11 (38.900 titik)</span>
            <span className="text-amber-400 font-mono">FRP Rata-rata: 92.4 MW</span>
          </div>
        </div>

        {/* Sebaran Wilayah (Sesuai video di menit 00:14) */}
        <div className="lg:col-span-5 bg-[#161616] border border-[#262626] rounded-lg p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <h3 className="text-sm font-semibold text-white">Sebaran Wilayah</h3>
            <span className="text-[11px] font-mono text-[#888888]">92.241 DETEKSI</span>
          </div>

          <div className="mt-3 space-y-2.5 overflow-y-auto max-h-[220px]">
            {KARHUTLA_REGIONS.map((reg, idx) => {
              const isSelected = selectedRegion === reg.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedRegion(reg.name)}
                  className={`p-2 rounded cursor-pointer transition-colors border ${
                    isSelected
                      ? 'bg-[#1C1C1C] border-[#7C3AED]'
                      : 'bg-[#121212] border-[#222222] hover:bg-[#181818]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{reg.name}</span>
                    <span className="font-mono text-amber-400 font-bold">{reg.count}</span>
                  </div>

                  <div className="mt-1.5 w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${reg.pct}%` }}
                    />
                  </div>

                  {reg.sub && (
                    <div className="mt-1 text-[10px] text-[#777777] font-mono">
                      {reg.sub}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Peta Sebaran Satelit Indonesia Besar */}
      <div className="bg-[#161616] border border-[#262626] rounded-lg p-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="text-sm font-semibold text-white">Peta Sebaran Hotspot Satelit - Indonesia & Sekitar</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
              className="p-1 rounded bg-[#202020] hover:bg-[#2A2A2A] text-white border border-[#2D2D2D]"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-1 rounded bg-[#202020] hover:bg-[#2A2A2A] text-white border border-[#2D2D2D]"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-[#888888] ml-2">ZOOM: {Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="mt-3 relative h-[360px] bg-[#0A1118] border border-[#262626] rounded-lg overflow-hidden flex items-center justify-center">
          {/* Indonesia Topographic / Satellite Simulation */}
          <div
            className="absolute inset-0 transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Dark Ocean Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#091522] via-[#0b1c2e] to-[#08121d]" />

            {/* Geographical landmass contours of Nusantara */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Malay Peninsula */}
              <path d="M220 180 Q240 220 260 260 L240 290 Q220 260 210 200 Z" fill="#1b3826" stroke="#2b593d" strokeWidth="1" />
              {/* Sumatera */}
              <path d="M190 220 Q240 280 320 380 Q300 400 280 380 Q210 300 170 240 Z" fill="#20422c" stroke="#326644" strokeWidth="1.5" />
              {/* Jawa */}
              <path d="M330 400 Q430 420 540 430 Q530 445 420 435 Q340 420 325 405 Z" fill="#1e3d29" stroke="#326644" strokeWidth="1.5" />
              {/* Kalimantan (Borneo) */}
              <path d="M460 240 Q540 220 580 280 Q590 350 510 370 Q450 360 440 300 Z" fill="#224830" stroke="#37724d" strokeWidth="1.5" />
              {/* Sulawesi */}
              <path d="M620 280 Q660 270 650 320 Q690 310 680 370 Q640 370 630 330 Q600 320 620 280 Z" fill="#1c3a27" stroke="#2e5e3f" strokeWidth="1.5" />
              {/* Nusa Tenggara / Bali */}
              <path d="M550 435 Q650 445 740 440 Q730 455 640 450 Q560 445 550 435 Z" fill="#1b3624" stroke="#2d573b" strokeWidth="1" />
              {/* Maluku */}
              <path d="M720 300 Q750 320 730 360 Q710 340 720 300 Z" fill="#183121" stroke="#274e35" strokeWidth="1" />
              {/* Papua */}
              <path d="M780 290 Q860 280 940 340 Q950 420 860 410 Q820 380 770 330 Z" fill="#20432c" stroke="#336846" strokeWidth="1.5" />
            </svg>

            {/* Hotspots Rendered on Map */}
            {hotspots.map((hs) => (
              <div
                key={hs.id}
                style={{ top: hs.top, left: hs.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-amber-500 opacity-60 animate-ping absolute" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 border border-red-600 shadow-sm" />
                </div>

                {/* Tooltip on Hover */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 whitespace-nowrap bg-black/90 border border-[#262626] rounded px-2 py-1 text-[10px] text-white font-mono shadow-xl">
                  <div className="font-bold text-amber-400">{hs.loc}</div>
                  <div className="text-[#AAAAAA]">Confidence: {hs.conf} | FRP: {hs.fwp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#111111]/90 backdrop-blur-sm border border-[#262626] rounded p-2.5 text-[11px] font-mono text-[#CCCCCC] space-y-1.5">
            <div className="font-bold text-white text-xs mb-1">LEGENDA SEBARAN</div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-red-500" />
              <span>Titik Api Aktif (Thermal Hotspot)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-emerald-600" />
              <span>Kawasan Hutan Lindung</span>
            </div>
            <div className="text-[10px] text-[#777777] pt-1 border-t border-[#222222]">
              Satelit: NOAA-20 / SNPP VIIRS 375m
            </div>
          </div>

          {/* Coordinate indicator */}
          <div className="absolute top-3 right-3 bg-black/80 border border-[#262626] rounded px-2.5 py-1 text-[10px] font-mono text-[#888888]">
            0.7893° S, 113.9213° E (Pusat Nusantara)
          </div>
        </div>
      </div>
    </div>
  );
};
