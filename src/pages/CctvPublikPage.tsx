import React, { useState, useEffect } from 'react';
import {
  Video,
  Search,
  Key,
  ExternalLink,
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  Radio,
  CheckCircle,
  Clock,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { CCTV_PORTALS } from '../data/mockData';

export const CctvPublikPage: React.FC = () => {
  const [streamQuery, setStreamQuery] = useState('Surabaya');
  const [apiKey, setApiKey] = useState('');
  const [portalFilter, setPortalFilter] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCam, setActiveCam] = useState('Surabaya - Simpang Darmo');
  const [activePortalAlert, setActivePortalAlert] = useState<string | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Live time ticker for camera overlay
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.getFullYear() +
          '-' +
          String(now.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(now.getDate()).padStart(2, '0') +
          ' ' +
          String(now.getHours()).padStart(2, '0') +
          ':' +
          String(now.getMinutes()).padStart(2, '0') +
          ':' +
          String(now.getSeconds()).padStart(2, '0') +
          ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePortalClick = (portalName: string, city: string) => {
    setActivePortalAlert(portalName);
    setActiveCam(`${city} - ${portalName}`);
    setTimeout(() => {
      setActivePortalAlert(null);
    }, 3500);
  };

  const filteredPortals = CCTV_PORTALS.map((group) => {
    const items = group.items.filter(
      (it) =>
        it.name.toLowerCase().includes(portalFilter.toLowerCase()) ||
        it.city.toLowerCase().includes(portalFilter.toLowerCase()) ||
        group.province.toLowerCase().includes(portalFilter.toLowerCase())
    );
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6">
      {/* Alert toast when selecting stream */}
      {activePortalAlert && (
        <div className="fixed top-4 right-4 z-50 bg-[#161616] border border-[#7C3AED] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <div className="text-xs text-[#AAAAAA]">Koneksi Stream Berhasil:</div>
            <div className="text-sm font-bold text-white">Membuka stream: {activePortalAlert}</div>
          </div>
        </div>
      )}

      {/* Header (Sama persis seperti di video) */}
      <div className="border-b border-[#262626] pb-4">
        <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">
          PUBLIC SOURCES
        </span>
        <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">
          CCTV publik Indonesia
        </h1>
        <p className="text-xs text-[#888888] mt-1 max-w-2xl leading-relaxed">
          Portal ATCS resmi plus live YouTube. Pencarian live tanpa API key. Key Google hanya untuk kuota lebih.
        </p>
      </div>

      {/* Form Fields: Cari live stream + YouTube API key */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search input 1 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#CCCCCC]">Cari live stream</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              value={streamQuery}
              onChange={(e) => setStreamQuery(e.target.value)}
              placeholder="Surabaya, Jakarta, Malioboro..."
              className="w-full bg-[#121212] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#555555]"
            />
          </div>
        </div>

        {/* Input 2: YouTube API key */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#CCCCCC]">
              YouTube API key <span className="text-[#777777] font-normal">(opsional)</span>
            </label>
            <span className="text-[10px] text-[#777777]">Publik tetap aktif</span>
          </div>
          <div className="relative">
            <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Kosongkan - pencarian publik tetap jalan"
              className="w-full bg-[#121212] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#555555]"
            />
          </div>
          <p className="text-[11px] text-[#666666] leading-tight">
            Tidak ada key bawaan dari Google. Buat sendiri di Google Cloud (YouTube Data API v3) kalau mau kuota pribadi, lalu memasukkannya di sini.
          </p>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-xs text-[#777777] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
        <span>Sumber: pencarian publik, tanpa API key</span>
      </div>

      {/* Main Video Stream Container (Sesuai video) */}
      <div className="bg-[#161616] border border-[#262626] rounded-lg overflow-hidden">
        {/* Stream Banner Info */}
        <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  INDONESIA LIVE 24/7 | Jakarta, Bali, Surabaya | CCTV Indonesia Live 24 Cam
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#888888]">YouTube - Live</span>
                <span className="text-[#444444]">•</span>
                <span className="text-xs text-emerald-400 font-mono">Stream Aktif: {activeCam}</span>
              </div>
            </div>
          </div>

          <a
            href="https://www.youtube.com/results?search_query=cctv+indonesia+live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#7C3AED] hover:text-[#9F67FF] font-medium transition-colors"
          >
            <span>Buka hasil di YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Player Canvas (Night City Traffic Simulation with camera switcher) */}
        <div className="relative aspect-video max-h-[460px] w-full bg-black flex items-center justify-center overflow-hidden">
          {/* Animated realistic night road simulation */}
          <div className="absolute inset-0">
            {/* Dark night sky and highway backdrop */}
            <div className="w-full h-full bg-gradient-to-b from-[#090b10] via-[#10141a] to-[#050608]" />

            {/* City silhouette buildings in background */}
            <div className="absolute bottom-36 left-0 right-0 h-32 flex items-end justify-around opacity-30">
              <div className="w-12 h-28 bg-[#18202b]" />
              <div className="w-8 h-20 bg-[#141a24]" />
              <div className="w-16 h-36 bg-[#1f2937]" />
              <div className="w-10 h-24 bg-[#18202b]" />
              <div className="w-20 h-40 bg-[#222e3d]" />
              <div className="w-14 h-26 bg-[#161d27]" />
            </div>

            {/* Highway Road Perspective */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-48 bg-[#111317] border-x-4 border-dashed border-[#292e3b] overflow-hidden">
              {/* Road markings */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 border-r-2 border-dashed border-amber-400/70" />

              {/* Moving Headlights & Taillights simulation */}
              <div className="absolute top-12 left-1/4 w-3 h-2 rounded-full bg-red-500 shadow-[0_0_12px_red] animate-pulse" />
              <div className="absolute top-24 left-1/3 w-4 h-2 rounded-full bg-red-600 shadow-[0_0_15px_red]" />
              <div className="absolute top-8 right-1/4 w-3 h-2 rounded-full bg-amber-100 shadow-[0_0_15px_white]" />
              <div className="absolute top-20 right-1/3 w-4 h-2.5 rounded-full bg-amber-200 shadow-[0_0_18px_yellow]" />
              <div className="absolute top-36 right-2/5 w-5 h-3 rounded-full bg-amber-100 shadow-[0_0_20px_white]" />
            </div>

            {/* Rain or sensor noise effect */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>

          {/* OSD (On Screen Display) typical of Indonesian ATCS systems */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-[11px] font-mono text-emerald-400 bg-black/75 px-3 py-1.5 rounded border border-emerald-950">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wider">CAM-ID: {activeCam.toUpperCase()}</span>
            </div>
            <div className="text-[#AAAAAA]">{currentTimeStr}</div>
            <div className="text-[10px] text-amber-400">RESOLUTION: 1080P • BITRATE: 4.2 MBPS</div>
          </div>

          {/* Live badge in player */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-red-950/80 border border-red-800 text-red-300 px-2.5 py-1 rounded text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>LIVE STREAM</span>
          </div>

          {/* Center Play/Pause button overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="z-10 w-16 h-16 rounded-full bg-black/60 hover:bg-[#7C3AED]/80 border border-white/20 text-white flex items-center justify-center transition-all transform hover:scale-110"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
          </button>

          {/* Bottom Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-white text-xs z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#7C3AED] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#7C3AED] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[11px] font-mono text-[#AAAAAA]">24/7 LIVE STREAM SINKRON</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#AAAAAA]">
                <span>Switch:</span>
                {['Jakarta', 'Bali', 'Surabaya', 'Jogja'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveCam(`${city} - Utama`)}
                    className="px-2 py-0.5 rounded bg-[#1C1C1C] hover:bg-[#7C3AED] hover:text-white transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
              <button className="hover:text-[#7C3AED]">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal ATCS / DISHUB Resmi (60 portal) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Portal ATCS / DISHUB resmi (60 portal)
            </h2>
            <p className="text-xs text-[#888888]">
              Direktori kamera lalu lintas pemerintah daerah dan dinas perhubungan
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              value={portalFilter}
              onChange={(e) => setPortalFilter(e.target.value)}
              placeholder="Filter kota / provinsi..."
              className="w-full bg-[#161616] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#555555]"
            />
          </div>
        </div>

        {/* Portal Cards Grouped by Province (2 Kolom Grid sesuai video 00:26 - 00:32) */}
        <div className="space-y-5">
          {filteredPortals.map((group) => (
            <div key={group.province} className="space-y-2">
              <div className="text-xs font-bold text-[#AAAAAA] tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>{group.province}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handlePortalClick(item.name, item.city)}
                    className="group bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#383838] p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#121212] border border-[#262626] flex items-center justify-center text-[#7C3AED] group-hover:border-[#7C3AED]/50">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#777777] flex items-center gap-1.5 mt-0.5">
                          <span>{item.city}</span>
                          <span className="w-1 h-1 rounded-full bg-[#444444]" />
                          <span className="text-emerald-400 font-mono text-[10px]">Online</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#777777] group-hover:text-white transition-colors">
                        Buka
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#666666] group-hover:text-[#7C3AED] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
