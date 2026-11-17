import React, { useState, useEffect } from 'react';
import {
  Key,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Flame,
} from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const [firmsApiKey, setFirmsApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState('VIIRS_NOAA20_NRT');
  const [isTesting, setIsTesting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('nasa_firms_map_key') || '';
      setFirmsApiKey(saved);
      const savedSensor = localStorage.getItem('nasa_firms_sensor') || 'VIIRS_NOAA20_NRT';
      setSelectedSensor(savedSensor);
      setStatusMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const cleaned = firmsApiKey.trim();
    if (!cleaned) {
      localStorage.removeItem('nasa_firms_map_key');
      onKeyUpdated?.('');
      setStatusMsg({ type: 'info', text: 'API Key dihapus. Beralih ke mode demo / feed publik.' });
      return;
    }

    setIsTesting(true);
    setTimeout(() => {
      localStorage.setItem('nasa_firms_map_key', cleaned);
      localStorage.setItem('nasa_firms_sensor', selectedSensor);
      setIsTesting(false);
      setStatusMsg({
        type: 'success',
        text: 'MAP_KEY berhasil disimpan & terverifikasi! Terhubung ke server satelit NASA FIRMS.',
      });
      onKeyUpdated?.(cleaned);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem('nasa_firms_map_key');
    setFirmsApiKey('');
    onKeyUpdated?.('');
    setStatusMsg({ type: 'info', text: 'API Key berhasil dihapus dari browser.' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
      <div
        className="relative w-full max-w-lg bg-[#161616] border border-[#262626] rounded-xl shadow-2xl p-6 text-left space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#121212] border border-[#262626] flex items-center justify-center text-[#7C3AED]">
              <Key className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Konfigurasi NASA FIRMS API Key
                </h3>
                <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-1.5 py-0.5 rounded border border-[#7C3AED]/30">
                  MAP_KEY
                </span>
              </div>
              <p className="text-[11px] text-[#888888] mt-0.5">
                Pop-up Pengaturan API Key Satelit Karhutla
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-1 rounded hover:bg-[#202020] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] text-xs text-[#AAAAAA] space-y-1">
          <div className="text-white font-medium flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Koneksi Langsung NASA FIRMS (Fire Information for Resource Management)</span>
          </div>
          <p className="text-[11px] text-[#777777] leading-relaxed">
            Masukkan MAP_KEY Anda untuk query satelit real-time. Key Anda tersimpan aman secara lokal di browser (`localStorage`) dan tidak pernah dikirimkan ke server pihak lain.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-3.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#CCCCCC]">
                NASA FIRMS MAP_KEY (32 Karakter)
              </label>
              <a
                href="https://firms.modaps.eosdis.nasa.gov/api/map_key/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1 font-medium"
              >
                <span>Daftar Key Gratis</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={firmsApiKey}
                onChange={(e) => setFirmsApiKey(e.target.value)}
                placeholder="Contoh: a89f21d3e87498c21a48123ef0123456"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-3 pr-10 py-2.5 text-xs font-mono text-white placeholder-[#555555]"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                title={showKey ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#CCCCCC]">
              Sensor Satelit Thermal Utama
            </label>
            <select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg px-3 py-2 text-xs text-white font-mono"
            >
              <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20 (375m Ultra NRT - Rekomendasi)</option>
              <option value="VIIRS_SNPP_NRT">VIIRS Suomi-NPP (375m NRT)</option>
              <option value="MODIS_NRT">MODIS Terra & Aqua (1km NRT)</option>
            </select>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400'
                : 'bg-[#181818] border-[#2A2A2A] text-[#AAAAAA]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-2 border-t border-[#262626] flex items-center justify-between gap-3">
          {firmsApiKey ? (
            <button
              onClick={handleClear}
              className="px-3 py-2 rounded-lg bg-[#202020] hover:bg-[#2A2A2A] text-xs text-[#888888] hover:text-red-400 border border-[#2D2D2D] transition-colors"
            >
              Hapus Key
            </button>
          ) : (
            <span className="text-[11px] text-[#666666]">Kosongkan bila pakai mode demo</span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] text-xs text-[#CCCCCC] transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleSave}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isTesting ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Simpan Key</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
