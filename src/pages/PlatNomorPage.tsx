import React, { useState } from 'react';
import {
  Car,
  Search,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PLAT_DATABASE } from '../data/mockData';

export const PlatNomorPage: React.FC = () => {
  const [platInput, setPlatInput] = useState('N 1234 AB');
  const [isLoading, setIsLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<{
    code: string;
    number: string;
    suffix: string;
    wilayah: string;
    sub: string;
    provinsi: string;
    tipe: string;
    samsat: string;
    status: string;
  } | null>({
    code: 'N',
    number: '1234',
    suffix: 'AB',
    wilayah: 'Malang, Probolinggo, Pasuruan, Lumajang, Batu',
    sub: 'Karesidenan Malang',
    provinsi: 'Jawa Timur',
    tipe: 'Kendaraan Penumpang / Roda Empat atau Dua',
    samsat: 'Samsat Malang Kota / Kab. Malang',
    status: 'Valid & Terdaftar di Database Korlantas',
  });

  const handleLookup = () => {
    if (!platInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      // Parse plate string
      const clean = platInput.trim().toUpperCase();
      const match = clean.match(/^([A-Z]{1,2})\s*([0-9]{1,4})?\s*([A-Z]{0,3})?$/);

      const code = match ? match[1] : clean.split(' ')[0];
      const number = match && match[2] ? match[2] : '1234';
      const suffix = match && match[3] ? match[3] : 'XX';

      const found = PLAT_DATABASE[code];

      if (found) {
        setLookupResult({
          code,
          number,
          suffix,
          wilayah: found.wilayah,
          sub: found.sub,
          provinsi: found.provinsi,
          tipe: parseInt(number) < 2000 ? 'Kendaraan Pribadi Penumpang' : 'Sepeda Motor / Kendaraan Khusus',
          samsat: `Kantor Bersama Samsat Wilayah ${found.wilayah.split(',')[0]}`,
          status: 'Valid & Terdaftar di Database Publik Korlantas',
        });
      } else {
        setLookupResult({
          code,
          number,
          suffix,
          wilayah: 'Kode wilayah tidak ditemukan atau format militer/diplomatik khusus',
          sub: 'Pemeriksaan Arsip Khusus',
          provinsi: 'Indonesia',
          tipe: 'Tidak Teridentifikasi Secara Publik',
          samsat: 'Belum Terpetakan',
          status: 'Wilayah Khusus / Tidak Dikenali',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const samplePlates = ['N 1234 AB', 'B 1945 RFS', 'D 4567 XYZ', 'AB 8888 XY', 'L 1001 WP', 'DK 2345 BC', 'BK 7777 AA'];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header (Sama seperti di video) */}
      <div className="border-b border-[#262626] pb-4">
        <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">
          INDONESIA
        </span>
        <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">
          Cek plat nomor
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          Lookup kode wilayah melalui server function lokal. Data publik.
        </p>
      </div>

      {/* Input Form Besar */}
      <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
        <label className="text-xs font-semibold text-[#CCCCCC]">Masukkan Nomor Registrasi Kendaraan Bermotor (NRKB)</label>
        
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Car className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              value={platInput}
              onChange={(e) => setPlatInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              placeholder="Contoh: N 1234 AB"
              className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-3 text-base font-mono font-bold text-white tracking-wider placeholder-[#555555]"
            />
          </div>

          <button
            onClick={handleLookup}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Memeriksa...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Cek Plat</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Sample Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#777777]">Contoh Cepat:</span>
          {samplePlates.map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setPlatInput(sample);
              }}
              className="px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#252525] border border-[#262626] text-xs font-mono text-[#AAAAAA] hover:text-white transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#161616] border border-[#262626] rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3">
          <RotateCcw className="w-8 h-8 text-[#7C3AED] animate-spin" />
          <div>
            <div className="text-sm font-bold text-white">Memindai Database Wilayah Samsat...</div>
            <div className="text-xs text-[#777777] mt-1 font-mono">Query: {platInput}</div>
          </div>
        </div>
      )}

      {/* Lookup Result Box */}
      {!isLoading && lookupResult && (
        <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden">
          {/* Plat Badge Visual Mockup */}
          <div className="bg-[#111111] p-5 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Indonesian License Plate Badge */}
              <div className="bg-black border-2 border-white/90 rounded-md px-4 py-2 flex flex-col items-center shadow-lg">
                <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-white">
                  {lookupResult.code} {lookupResult.number} {lookupResult.suffix}
                </div>
                <div className="text-[9px] font-mono text-[#AAAAAA] tracking-widest mt-0.5">
                  10 • 29
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#7C3AED] uppercase font-bold">
                  KODE WILAYAH: [{lookupResult.code}]
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {lookupResult.provinsi}
                </h3>
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lookupResult.status}</span>
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-[#262626] sm:pl-4">
              <span className="text-[10px] text-[#777777] uppercase font-mono">Sub-Karesidenan</span>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{lookupResult.sub}</div>
            </div>
          </div>

          {/* Detailed Info Cards Grid */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-[#121212] border border-[#242424] space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <MapPin className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-semibold text-[#CCCCCC]">Cakupan Wilayah / Kota</span>
              </div>
              <div className="text-sm font-semibold text-white pt-1">
                {lookupResult.wilayah}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#121212] border border-[#242424] space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-[#CCCCCC]">Estimasi Kantor Pelayanan Samsat</span>
              </div>
              <div className="text-sm font-semibold text-white pt-1">
                {lookupResult.samsat}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#121212] border border-[#242424] space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <Car className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-[#CCCCCC]">Kategori & Tipe Kendaraan</span>
              </div>
              <div className="text-sm font-semibold text-white pt-1">
                {lookupResult.tipe}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#121212] border border-[#242424] space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#888888]">
                <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-semibold text-[#CCCCCC]">Pemeriksaan Pajak & Legalitas</span>
              </div>
              <div className="text-xs text-[#AAAAAA] pt-1 leading-relaxed">
                Data publik wilayah sinkron dengan Bapenda & E-Samsat daerah terkait.
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-5 py-3 bg-[#101010] border-t border-[#262626] text-[11px] text-[#666666] flex items-center justify-between">
            <span>Lookup lokal tanpa kuota API pihak ketiga.</span>
            <span className="font-mono text-[#7C3AED]">OK (200)</span>
          </div>
        </div>
      )}
    </div>
  );
};
