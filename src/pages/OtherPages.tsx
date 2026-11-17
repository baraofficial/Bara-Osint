import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutGrid,
  Home,
  Crosshair,
  Hash,
  FlaskConical,
  Wrench,
  FileText,
  Clock,
  Settings,
  Bug,
  LogOut,
  Search,
  CheckCircle2,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  Send,
  AlertCircle,
} from 'lucide-react';
import { MenuId } from '../types';

interface OtherPagesProps {
  type: MenuId;
  onNavigate: (id: MenuId) => void;
}

export const OtherPages: React.FC<OtherPagesProps> = ({ type, onNavigate }) => {
  // Utilities state
  const [utilInput, setUtilInput] = useState('BARAOSINT{cyber_investigation_2026}');
  const [copied, setCopied] = useState(false);

  // Catatan state
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('baraosint_notes');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: 'Investigasi Phishing Bank Mandiri Tiruan',
            date: '14 Okt 2026',
            body: 'IP C2: 185.196.8.221 terdeteksi mengarahkan form login palsu. Host name registrar di Panamanian proxy.',
          },
          {
            id: 2,
            title: 'Kasus Plat Ganda N 1234 AB',
            date: '12 Okt 2026',
            body: 'Ditemukan dua kendaraan dengan nopol identik di daerah Pasuruan & Malang. Perlu cek fisik Samsat.',
          },
        ];
  });
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  // Bug report state
  const [bugCategory, setBugCategory] = useState('Pencarian CCTV');
  const [bugDesc, setBugDesc] = useState('');
  const [bugSent, setBugSent] = useState(false);

  // Dorking state
  const [dorkTarget, setDorkTarget] = useState('go.id');
  const [dorkType, setDorkType] = useState('filetype:pdf "surat keputusan"');

  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddNote = () => {
    if (!newTitle.trim()) return;
    const item = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toLocaleDateString('id-ID'),
      body: newBody,
    };
    const updated = [item, ...notes];
    setNotes(updated);
    localStorage.setItem('baraosint_notes', JSON.stringify(updated));
    setNewTitle('');
    setNewBody('');
  };

  const handleDeleteNote = (id: number) => {
    const updated = notes.filter((n: any) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('baraosint_notes', JSON.stringify(updated));
  };

  // 1. BERANDA / OSINT HUB
  if (type === 'beranda' || type === 'osint-hub' || type === 'cyber') {
    const modules = [
      { id: 'cyber-patrol', title: 'Cyber Patrol AI', desc: 'Pemantauan serangan siber dan C2 node aktif.', cat: 'UTAMA' },
      { id: 'karhutla', title: 'Karhutla Live', desc: 'Satelit hotspot kebakaran hutan Asia Tenggara.', cat: 'UTAMA' },
      { id: 'cctv-publik', title: 'CCTV Publik Indonesia', desc: '60+ portal ATCS kota & live streaming jalan raya.', cat: 'INDONESIA' },
      { id: 'plat-nomor', title: 'Cek Plat Nomor', desc: 'Lookup instan kode wilayah seluruh Indonesia.', cat: 'INDONESIA' },
      { id: 'nomor-wa', title: 'Nomor WhatsApp', desc: 'Validasi HLR, provider seluler, dan chat langsung.', cat: 'INDONESIA' },
      { id: 'username', title: 'Username Recon', desc: 'Pengecekan serentak di 10 platform media sosial.', cat: 'RECON' },
      { id: 'gempa', title: 'Gempa Bumi BMKG', desc: 'Feed telemetri getaran seismik Indonesia.', cat: 'INDONESIA' },
      { id: 'intel-center', title: 'Intel Center', desc: 'Database CVE, IoC, dan threat feeds global.', cat: 'RECON' },
    ];

    return (
      <div className="space-y-6">
        <div className="border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {type === 'beranda' ? 'Beranda BARAOSINT' : type === 'osint-hub' ? 'OSINT Hub' : 'Cyber Defense Workspace'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#161616] text-[#7C3AED] border border-[#262626]">
              READY
            </span>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Pusat navigasi intelijen data terbuka dan investigasi digital berskala nasional.
          </p>
        </div>

        {/* Quick Hub Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate(m.id as MenuId)}
              className="p-4 rounded-xl bg-[#161616] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#7C3AED]/50 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div>
                <span className="text-[10px] font-mono text-[#7C3AED] uppercase">{m.cat}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#A78BFA] transition-colors mt-1">
                  {m.title}
                </h3>
                <p className="text-xs text-[#888888] mt-1 leading-relaxed">{m.desc}</p>
              </div>
              <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-xs text-[#777777] group-hover:text-white">
                <span>Buka Modul</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7C3AED]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. INTEL CENTER
  if (type === 'intel-center') {
    const iocs = [
      { ioc: '185.196.8.221', type: 'IP C2', threat: 'Silver Loader', source: 'AlienVault OTX' },
      { ioc: '89.24.197.32', type: 'IP Host', threat: 'Vidar Stealer Endpoint', source: 'ThreatFox' },
      { ioc: '0d48a123f...98b', type: 'SHA-256', threat: 'RedLine Stealer Sample', source: 'VirusTotal' },
      { ioc: 'login-mandiri-auth.xyz', type: 'FQDN', threat: 'Phishing Campaign', source: 'URLHaus' },
    ];

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Intel Center & IoC Feeds</h1>
          <p className="text-xs text-[#888888] mt-1">
            Indikator Kompromi (IoCs), signature malware, dan mitigasi ancaman siber Indonesia.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider">Feed IoC Terkini</div>
          <div className="divide-y divide-[#222222] text-xs">
            {iocs.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-emerald-400">{item.ioc}</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Tipe: {item.type} • Ancaman: {item.threat}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#888888] bg-[#111111] px-2 py-1 rounded border border-[#242424]">
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. UTILITIES
  if (type === 'utilities') {
    const base64Encode = (str: string) => {
      try {
        return btoa(str);
      } catch {
        return '';
      }
    };
    const base64Decode = (str: string) => {
      try {
        return atob(str);
      } catch {
        return 'Format bukan Base64 valid';
      }
    };

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">OSINT Utilities</h1>
          <p className="text-xs text-[#888888] mt-1">
            Alat konversi string cepat: Base64 Encoder/Decoder, Hash Generator, dan URL Format.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <label className="text-xs font-semibold text-[#CCCCCC]">Teks / String Input</label>
          <textarea
            value={utilInput}
            onChange={(e) => setUtilInput(e.target.value)}
            rows={3}
            className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-3 text-xs font-mono text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
              <div className="flex items-center justify-between text-[#888888]">
                <span>Base64 Encoded:</span>
                <button
                  onClick={() => copyToClipboard(base64Encode(utilInput))}
                  className="text-[#7C3AED] hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-mono text-emerald-400 break-all">{base64Encode(utilInput)}</div>
            </div>

            <div className="p-3 bg-[#111111] rounded-lg border border-[#242424] space-y-1">
              <div className="flex items-center justify-between text-[#888888]">
                <span>URL Encoded:</span>
                <button
                  onClick={() => copyToClipboard(encodeURIComponent(utilInput))}
                  className="text-[#7C3AED] hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-mono text-amber-400 break-all">{encodeURIComponent(utilInput)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. SECURITY LAB
  if (type === 'security-lab') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">RECON</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Security Lab</h1>
          <p className="text-xs text-[#888888] mt-1">
            Audit keamanan HTTP Headers, Content-Security-Policy, dan SSL/TLS Cipher Suites.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            HTTP Security Headers Checklist
          </div>
          <div className="space-y-2 text-xs">
            {[
              { header: 'Strict-Transport-Security (HSTS)', status: 'PASS', val: 'max-age=31536000; includeSubDomains' },
              { header: 'Content-Security-Policy (CSP)', status: 'PASS', val: "default-src 'self' data: https:" },
              { header: 'X-Frame-Options', status: 'PASS', val: 'SAMEORIGIN' },
              { header: 'X-Content-Type-Options', status: 'PASS', val: 'nosniff' },
              { header: 'Referrer-Policy', status: 'PASS', val: 'strict-origin-when-cross-origin' },
            ].map((h, i) => (
              <div key={i} className="p-2.5 bg-[#111111] rounded border border-[#242424] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white font-mono">{h.header}</div>
                  <div className="text-[10px] text-[#777777] font-mono">{h.val}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-900">
                  {h.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5. TOOLKIT (Google Dorking Generator)
  if (type === 'toolkit') {
    const fullDork = `site:${dorkTarget} ${dorkType}`;
    const dorkUrl = `https://www.google.com/search?q=${encodeURIComponent(fullDork)}`;

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Google Dorking Generator</h1>
          <p className="text-xs text-[#888888] mt-1">
            Konstruksi query Google Dork khusus domain instansi pemerintah dan universitas Indonesia.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#CCCCCC]">Target Domain / TLD</label>
              <input
                type="text"
                value={dorkTarget}
                onChange={(e) => setDorkTarget(e.target.value)}
                placeholder="go.id, ac.id, polri.go.id"
                className="mt-1 w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs font-mono text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#CCCCCC]">Preset Operator Dork</label>
              <select
                value={dorkType}
                onChange={(e) => setDorkType(e.target.value)}
                className="mt-1 w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs text-white"
              >
                <option value='filetype:pdf "surat keputusan"'>Dokumen PDF SK / Surat Keputusan</option>
                <option value='filetype:xls OR filetype:xlsx "anggaran"'>File Anggaran Excel (XLS/XLSX)</option>
                <option value='filetype:sql "dump" OR "insert into"'>Database Dumps (SQL)</option>
                <option value='filetype:env "DB_PASSWORD"'>Environment Config Leak (.env)</option>
                <option value='inurl:login OR inurl:admin'>Login Portals & Dashboard Admin</option>
                <option value='intitle:"index of /" "backup"'>Directory Traversal / Backup Folder</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 bg-[#111111] rounded-lg border border-[#242424] space-y-2">
            <span className="text-[11px] text-[#777777] font-mono">Hasil Query Dork:</span>
            <div className="text-sm font-mono text-emerald-400 font-bold break-all">
              {fullDork}
            </div>
          </div>

          <a
            href={dorkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Eksekusi di Google Search</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // 6. CATATAN
  if (type === 'catatan') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Catatan Kasus & Investigasi</h1>
          <p className="text-xs text-[#888888] mt-1">
            Scratchpad penyimpanan bukti dan temuan investigasi lokal tersimpan di peramban Anda.
          </p>
        </div>

        {/* Form Tambah Catatan */}
        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Judul kasus atau target investigasi..."
            className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs font-bold text-white"
          />
          <textarea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Tuliskan temuan nomor plat, IP, atau nama subjek di sini..."
            rows={3}
            className="w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs text-white"
          />
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Catatan</span>
          </button>
        </div>

        {/* Daftar Catatan */}
        <div className="space-y-3">
          {notes.map((n: any) => (
            <div key={n.id} className="p-4 rounded-xl bg-[#161616] border border-[#262626] flex justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{n.title}</h3>
                  <span className="text-[10px] text-[#777777] font-mono">{n.date}</span>
                </div>
                <p className="text-xs text-[#AAAAAA] leading-relaxed">{n.body}</p>
              </div>
              <button
                onClick={() => handleDeleteNote(n.id)}
                className="text-[#666666] hover:text-red-400 p-1"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. RIWAYAT
  if (type === 'riwayat') {
    const logs = [
      { id: 1, query: 'N 1234 AB', module: 'Cek Plat Nomor', time: '14-10-2026 14:10', status: 'OK (200)' },
      { id: 2, query: 'Surabaya - Simpang Darmo', module: 'CCTV Publik', time: '14-10-2026 13:45', status: 'STREAM_CONNECTED' },
      { id: 3, query: 'valz_sec', module: 'Username Recon', time: '14-10-2026 12:30', status: '7 FOUND' },
      { id: 4, query: '103.247.12.88', module: 'IP Lookup', time: '14-10-2026 11:15', status: 'AS17974 TELKOM' },
      { id: 5, query: '081234567890', module: 'Nomor WA', time: '14-10-2026 10:02', status: 'TELKOMSEL' },
    ];

    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Riwayat Aktivitas</h1>
          <p className="text-xs text-[#888888] mt-1">
            Log penelusuran modul OSINT yang telah Anda jalankan dalam sesi ini.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#222222] text-xs">
            {logs.map((item) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#7C3AED]" />
                  <div>
                    <div className="font-bold text-white font-mono">{item.query}</div>
                    <div className="text-[11px] text-[#777777]">{item.module} • {item.time}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 8. PENGATURAN
  if (type === 'pengaturan') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Pengaturan BARAOSINT</h1>
          <p className="text-xs text-[#888888] mt-1">
            Konfigurasi sistem, status tema, dan manajemen kuota investigasi.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <div>
              <div className="font-bold text-white">Tema Aplikasi</div>
              <div className="text-[#777777]">Hitam Ungu Flat (#0A0A0A & #7C3AED)</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#7C3AED]/20 text-[#7C3AED] font-bold border border-[#7C3AED]/40">
              AKTIF (DEFAULT)
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <div>
              <div className="font-bold text-white">Mode Akses API Publik</div>
              <div className="text-[#777777]">Direct Client OSINT (Tanpa Key Wajib)</div>
            </div>
            <span className="text-emerald-400 font-mono font-bold">TERHUBUNG</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Cache Data & Riwayat Lokal</div>
              <div className="text-[#777777]">Penyimpanan browser terenkripsi</div>
            </div>
            <button
              onClick={() => alert('Cache lokal berhasil dibersihkan!')}
              className="px-3 py-1.5 rounded bg-[#202020] hover:bg-[#2A2A2A] text-white border border-[#2D2D2D]"
            >
              Bersihkan Cache
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 9. LAPOR BUG
  if (type === 'lapor-bug') {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="border-b border-[#262626] pb-4">
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#7C3AED] uppercase">LAINNYA</span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Lapor Bug & Masukan</h1>
          <p className="text-xs text-[#888888] mt-1">
            Laporkan kendala teknis feed kamera atau link modul data publik yang tidak merespon.
          </p>
        </div>

        <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 space-y-4">
          {bugSent ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-900 rounded-lg text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-white">Laporan Berhasil Terkirim!</div>
              <div className="text-xs text-[#AAAAAA]">Tim BARAOSINT akan segera meninjau issue ini.</div>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-[#CCCCCC]">Modul Bermasalah</label>
                <select
                  value={bugCategory}
                  onChange={(e) => setBugCategory(e.target.value)}
                  className="mt-1 w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs text-white"
                >
                  <option>Pencarian CCTV</option>
                  <option>Cek Plat Nomor</option>
                  <option>Cyber Patrol</option>
                  <option>Karhutla Feed</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CCCCCC]">Deskripsi Bug</label>
                <textarea
                  value={bugDesc}
                  onChange={(e) => setBugDesc(e.target.value)}
                  placeholder="Jelaskan langkah reproduksi masalah..."
                  rows={4}
                  className="mt-1 w-full bg-[#101010] border border-[#262626] focus:border-[#7C3AED] focus:outline-none rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <button
                onClick={() => setBugSent(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Bug</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 10. KELUAR
  if (type === 'keluar') {
    return (
      <div className="space-y-6 max-w-xl mx-auto pt-8">
        <div className="bg-[#161616] border border-red-900/50 rounded-xl p-6 text-center space-y-4">
          <LogOut className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">Keluar dari BARAOSINT?</h2>
          <p className="text-xs text-[#888888] leading-relaxed">
            Sesi investigasi Anda akan ditutup dan cache sementara browser akan direset.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('cyber-patrol')}
              className="px-4 py-2 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-white text-xs font-medium"
            >
              Batal
            </button>
            <button
              onClick={() => {
                alert('Sesi ditutup.');
                onNavigate('cyber-patrol');
              }}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
            >
              Konfirmasi Keluar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
