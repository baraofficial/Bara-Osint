export type MenuId =
  // UTAMA
  | 'cyber-patrol'
  | 'karhutla'
  | 'cyber'
  | 'beranda'
  | 'osint-hub'
  // RECON
  | 'username'
  | 'email'
  | 'domain'
  | 'ip-lookup'
  // INDONESIA
  | 'nomor-wa'
  // RECON
  | 'sumber-publik'
  // INDONESIA
  | 'plat-nomor'
  | 'id-game'
  | 'pln'
  | 'gempa'
  | 'cctv-publik'
  // RECON
  | 'intel-center'
  // LAINNYA
  | 'utilities'
  // RECON
  | 'security-lab'
  // LAINNYA
  | 'toolkit'
  | 'catatan'
  | 'riwayat'
  | 'pengaturan'
  | 'lapor-bug'
  | 'keluar';

export interface MenuItem {
  id: MenuId;
  label: string;
  iconName: string;
  isDanger?: boolean;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}
