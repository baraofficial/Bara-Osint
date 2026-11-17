import React, { useState } from 'react';
import {
  Search,
  Mail,
  Globe,
  MapPin,
  Phone,
  Database,
  Gamepad2,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Server,
  Share2,
  ArrowRight,
  User,
  AlertTriangle,
} from 'lucide-react';
import { MenuId } from '../types';

interface ReconPageProps {
  type: MenuId;
}

export const ReconPage: React.FC<ReconPageProps> = ({ type }) => {
  const [query, setQuery] = useState(() => {
    switch (type) {
      case 'username': return 'valz_sec';
      case 'email': return 'target.investigasi@gmail.com';
      case 'domain': return 'target-domain.id';
      case 'ip-lookup': return '103.247.12.88';
      case 'nomor-wa': return '081234567890';
      case 'id-game': return '12345678 (2026)';
      case 'pln': return '521034891234';
      default: return '';
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(true);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearched(true);
    }, 1000);
  };

  // 1. USERNAME RECON
  if (type === 'username') {
    const platforms = [
      { name: 'Instagram', url: `https://instagram.com/${query}`, found: true, details: 'Akun Publik • 1.420 Followers' },
      { name: 'TikTok', url: `https://tiktok.com/@${query}`, found: true, details: 'Bio Terdeteksi • ID Aktif' },
      { name: 'GitHub', url: `https://github.com/${query}`, found: true, details: '24 Repositori Publik' },
      { name: 'Twitter / X', url: `https://x.com/${query}`, found: false, details: 'Akun Tidak Ditemukan (404)' },
      { name: 'Telegram', url: `https://t.me/${query}`, found: true, details: 'Username Terdaftar @' + query },
      { name: 'Reddit', url: `https://reddit.com/user/${query}`, found: false, details: 'Tidak Ditemukan' },
      { name: 'Pinterest', url: `https://pinterest.com/${query}`, found: true, details: 'Profil Ditemukan' },
      { name: 'YouTube', url: `https://youtube.com/@${query}`, found: true, details: 'Channel Terverifikasi' },
      { name: 'Steam Community', url: `https://steamcommunity.com/id/${query}`, found: false, details: 'Profil Privat / 404' },
      { name: 'LinkedIn', url: `https://linkedin.com/in/${query}`, found: true, details: 'Koneksi Profil Publik' },
    ];

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Username Recon</h1>
          <p className="text-xs text-[#888888] mt-1">
            Pengecekan username multi-platform sosial media publik secara serentak (10 platform).
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Masukkan username target..."
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-8 text-center space-y-3">
            <RotateCcw className="w-8 h-8 text-[#7C3AED] animate-spin mx-auto" />
            <div className="text-sm font-bold text-white">Memindai 10 Platform Media Sosial...</div>
          </div>
        ) : searched ? (
          <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-sm font-bold text-white">Hasil Pencarian: @{query}</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">7 Ditemukan • 3 Tidak Ditemukan</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platforms.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#111111] border border-[#242424] hover:border-[#333333] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {p.found ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#555555] shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{p.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                            p.found ? 'bg-emerald-950 text-emerald-300' : 'bg-[#1F1F1F] text-[#777777]'
                          }`}
                        >
                          {p.found ? 'FOUND' : 'NOT FOUND'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#777777] mt-0.5">{p.details}</div>
                    </div>
                  </div>

                  {p.found && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C3AED] hover:text-[#9F67FF] p-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // 2. EMAIL RECON
  if (type === 'email') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Email Reconnaissance</h1>
          <p className="text-xs text-[#888888] mt-1">
            Analisis reputasi email, DNS MX records, Gravatar, dan riwayat kebocoran data (Breach Detection).
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="nama.target@domain.com"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[11px] text-[#777777]">Status Sintaks & Format</div>
                <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valid & RFC Compliant</span>
                </div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[11px] text-[#777777]">Disposable / Email Sementara</div>
                <div className="text-sm font-bold text-white mt-1">TIDAK (Mailbox Resmi)</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[11px] text-[#777777]">Status Riwayat Kebocoran</div>
                <div className="text-sm font-bold text-amber-400 mt-1">2 Breach Teridentifikasi</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-[#242424] space-y-2 text-xs">
              <div className="font-bold text-white">Detail MX Record & Penyedia Layanan:</div>
              <div className="font-mono text-[#AAAAAA] space-y-1">
                <div>• MX Server: aspmx.l.google.com (Priority: 1)</div>
                <div>• SPF Record: v=spf1 include:_spf.google.com ~all (PASS)</div>
                <div>• DMARC Policy: reject / p=none terdeteksi</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. DOMAIN OSINT
  if (type === 'domain') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Domain Intelligence</h1>
          <p className="text-xs text-[#888888] mt-1">
            WHOIS lookup, DNS Zone records, SSL Certificate Issuer, dan subdomains mapper.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Globe className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="domain-target.com / .id"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <span className="text-sm font-bold text-white font-mono">{query}</span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                STATUS: ACTIVE (200 OK)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
                <span className="text-[#777777]">Registrar & Registrar IANA:</span>
                <div className="font-semibold text-white">PANDI / Cloudflare, Inc. (ID: 1910)</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
                <span className="text-[#777777]">Name Servers (NS):</span>
                <div className="font-mono text-[#CCCCCC]">ns1.cloudflare.com, ns2.cloudflare.com</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
                <span className="text-[#777777]">IP Address (A Record):</span>
                <div className="font-mono text-emerald-400">104.21.48.112 (Cloudflare CDN)</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
                <span className="text-[#777777]">Sertifikat SSL:</span>
                <div className="text-white">Let's Encrypt / Google Trust Services (Valid s/d 2027)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. IP LOOKUP
  if (type === 'ip-lookup') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">IP Lookup & Geolocation</h1>
          <p className="text-xs text-[#888888] mt-1">
            Penelusuran detail IP, ASN, Internet Service Provider (ISP), koordinat geografis, serta deteksi proxy/VPN.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Contoh: 103.247.12.88"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Negara / Wilayah</div>
                <div className="text-sm font-bold text-white mt-1">Indonesia (ID) 🇮🇩</div>
                <div className="text-[10px] text-[#888888] mt-0.5">Jakarta, DKI Jakarta</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">ISP / Provider</div>
                <div className="text-sm font-bold text-white mt-1">PT Telkom Indonesia</div>
                <div className="text-[10px] text-[#888888] mt-0.5">IndiHome Backbone</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Autonomous System</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-1">AS17974</div>
                <div className="text-[10px] text-[#888888] mt-0.5">TELKOMNET-AS-AP</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Proxy / VPN Score</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">0% (Residential)</div>
                <div className="text-[10px] text-[#888888] mt-0.5">Clean IP</div>
              </div>
            </div>

            <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] text-xs font-mono text-[#AAAAAA] flex items-center justify-between">
              <span>Koordinat: -6.2088, 106.8456 (Jakarta Pusat)</span>
              <span className="text-[#7C3AED]">Zona Waktu: Asia/Jakarta (WIB UTC+7)</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 5. NOMOR WA
  if (type === 'nomor-wa') {
    const cleanNumber = query.replace(/^0/, '62').replace(/[^0-9]/g, '');
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">INDONESIA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Nomor WhatsApp Intelligence</h1>
          <p className="text-xs text-[#888888] mt-1">
            Validasi nomor telepon seluler Indonesia, deteksi provider seluler, HLR (Home Location Register), dan tautan chat langsung.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="081234567890 / +6281234567890"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Provider Seluler</div>
                <div className="text-sm font-bold text-red-400 mt-1">Telkomsel (simPATI / Halo)</div>
                <div className="text-[10px] text-[#888888] mt-0.5">Prefix 0812 / 0813</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Format Internasional (E.164)</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-1">+{cleanNumber}</div>
                <div className="text-[10px] text-[#888888] mt-0.5">Valid ID Country Code</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Estimasi Lokasi HLR Registrasi</div>
                <div className="text-sm font-bold text-white mt-1">Jawa Timur / Surabaya</div>
                <div className="text-[10px] text-[#888888] mt-0.5">Area 3 Regional Telkomsel</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#888888]">
                Buka ruang percakapan tanpa menyimpan nomor ke kontak:
              </div>
              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Buka di WhatsApp Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 6. SUMBER PUBLIK
  if (type === 'sumber-publik') {
    const sources = [
      { name: 'Kemenkumham AHU', cat: 'Hukum & Korporasi', desc: 'Pengecekan profil legalitas PT, CV, Yayasan, dan Notaris resmi di Indonesia.', url: 'https://ahu.go.id' },
      { name: 'LPSE Pengadaan Barang/Jasa', cat: 'Tender Nasional', desc: 'Pemantauan pengadaan barang pemerintah, pemenang tender daerah, dan HPS proyek.', url: 'https://inaproc.id' },
      { name: 'PDDikti Kemdikbud', cat: 'Akademik & Pendidikan', desc: 'Verifikasi ijazah, status keaktifan mahasiswa, data dosen, dan akreditasi prodi.', url: 'https://pddikti.kemdiktisaintek.go.id' },
      { name: 'Putusan Mahkamah Agung (MA)', cat: 'Yurisprudensi & Kasus', desc: 'Direktori berkas perkara pengadilan pidana, perdata, tipikor, dan peradilan agama.', url: 'https://putusan3.mahkamahagung.go.id' },
      { name: 'BPOM Cek Produk', cat: 'Kesehatan & Konsumen', desc: 'Pemeriksaan nomor registrasi izin edar obat, kosmetik, pangan, dan suplemen.', url: 'https://cekbpom.pom.go.id' },
      { name: 'PSE Kominfo RI', cat: 'Sistem Elektronik', desc: 'Daftar Penyelenggara Sistem Elektronik (PSE) domestik dan asing yang resmi terdaftar.', url: 'https://pse.kominfo.go.id' },
      { name: 'SIPP Pengadilan Negeri', cat: 'Peradilan Daerah', desc: 'Sistem Informasi Penelusuran Perkara Pengadilan Negeri di seluruh Indonesia.', url: 'https://pn-jakarta-selatan.go.id' },
      { name: 'Data Kependudukan Kemendagri', cat: 'Statistik Demografi', desc: 'Data agregat kependudukan publik dan kode wilayah administrasi nasional.', url: 'https://dukcapil.kemendagri.go.id' },
    ];

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Sumber Publik (Public Repositories)</h1>
          <p className="text-xs text-[#888888] mt-1">
            Katalog portal data publik resmi kementerian, lembaga, dan peradilan Republik Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {sources.map((src, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded border border-[#7C3AED]/30">
                    {src.cat}
                  </span>
                  <Database className="w-4 h-4 text-[#666666]" />
                </div>
                <h3 className="text-sm font-bold text-white mt-2">{src.name}</h3>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">{src.desc}</p>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 border-t border-[#222222] text-xs text-[#7C3AED] hover:text-[#A78BFA] flex items-center justify-between font-medium"
              >
                <span>Akses Portal Resmi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. ID GAME
  if (type === 'id-game') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">INDONESIA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">ID Game Intelligence</h1>
          <p className="text-xs text-[#888888] mt-1">
            Pengecekan username, server ID, dan status nickname game online populer (MLBB, Free Fire, Genshin, PUBG).
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Gamepad2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="User ID (Zone ID)"
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
              <span className="text-xs text-[#888888]">Mobile Legends: Bang Bang</span>
              <span className="text-xs text-emerald-400 font-mono">SERVER VALID (2026)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[#777777]">Nickname Akun</div>
                <div className="text-sm font-bold text-white mt-1">Valz_CyberGhost</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[#777777]">Wilayah Server</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">Indonesia (ID)</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[#777777]">Status Akun</div>
                <div className="text-sm font-bold text-white mt-1">Aktif / Unbanned</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 8. PLN
  if (type === 'pln') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">INDONESIA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">PLN Customer Lookup</h1>
          <p className="text-xs text-[#888888] mt-1">
            Pemeriksaan ID Pelanggan PLN, nama pemilik meteran, daya terpasang, dan status tagihan listrik publik.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Zap className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="ID Pelanggan (11-12 digit)..."
                className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg pl-11 pr-4 py-2.5 text-sm font-mono text-white placeholder-[#555555]"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
            >
              {isLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Mulai OSINT (1 Kredit)</span>
            </button>
          </div>
        </div>

        {!isLoading && searched && (
          <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Nama Pelanggan</div>
                <div className="text-sm font-bold text-white mt-1">AHMAD B***** R*****</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Tarif / Daya Listrik</div>
                <div className="text-sm font-bold text-amber-400 mt-1">R1 / 1300 VA</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Tipe Layanan</div>
                <div className="text-sm font-bold text-white mt-1">Prabayar (Token)</div>
              </div>
              <div className="p-3 bg-[#111111] rounded-lg border border-[#242424]">
                <div className="text-[10px] text-[#777777]">Unit Pelaksana Pelayanan</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">UP3 Malang Kota</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 9. GEMPA BMKG
  if (type === 'gempa') {
    const quakes = [
      { mag: '5.4', loc: '124 km BaratDaya KAWALU-JABAR', depth: '10 km', time: '14-10-2026 14:22:15 WIB', coords: '8.12 LS - 107.89 BT', tsunami: 'Tidak Berpotensi Tsunami' },
      { mag: '4.8', loc: '45 km BaratLaut TUBAN-JATIM', depth: '12 km', time: '14-10-2026 11:05:40 WIB', coords: '6.55 LS - 111.90 BT', tsunami: 'Tidak Berpotensi Tsunami' },
      { mag: '6.1', loc: '180 km TimurLaut MELONGUANE-SULUT', depth: '64 km', time: '13-10-2026 23:40:12 WIB', coords: '4.88 LU - 127.12 BT', tsunami: 'Tidak Berpotensi Tsunami' },
      { mag: '4.2', loc: '18 km Tenggara BANTUL-DIY', depth: '15 km', time: '13-10-2026 18:14:00 WIB', coords: '8.02 LS - 110.42 BT', tsunami: 'Dirasakan Skala II MMI Bantul' },
    ];

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">INDONESIA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Gempa Bumi BMKG Live</h1>
          <p className="text-xs text-[#888888] mt-1">
            Feed telemetri kegempaan seismik real-time dari Badan Meteorologi, Klimatologi, dan Geofisika.
          </p>
        </div>

        {/* Featured Latest Earthquake */}
        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-red-400">GEMPA TERKINI (M ≥ 5.0)</span>
            </div>
            <span className="text-xs font-mono text-[#777777]">{quakes[0].time}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 rounded-xl bg-red-950/60 border border-red-800 flex flex-col items-center justify-center shrink-0">
              <div className="text-3xl font-black text-red-400 font-mono">{quakes[0].mag}</div>
              <div className="text-[10px] text-red-300 font-bold uppercase mt-0.5">Magnitudo</div>
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 className="text-base font-bold text-white">{quakes[0].loc}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#AAAAAA] font-mono">
                <span>Kedalaman: <strong className="text-white">{quakes[0].depth}</strong></span>
                <span>•</span>
                <span>Koordinat: <strong className="text-white">{quakes[0].coords}</strong></span>
              </div>
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                  {quakes[0].tsunami}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* List of Recent Earthquakes */}
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
            Riwayat Gempa Terakhir
          </div>
          <div className="space-y-2">
            {quakes.slice(1).map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#262626] flex items-center justify-center font-mono font-bold text-amber-400 text-sm">
                    {q.mag}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{q.loc}</div>
                    <div className="text-[10px] text-[#777777] font-mono mt-0.5">
                      Kedalaman: {q.depth} • {q.time}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">
                  {q.tsunami}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
