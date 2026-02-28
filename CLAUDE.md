# DEVSOY DANIŞMANLIK — MASTER HAFIZA DOSYASI
> Bu dosya Claude'un her yeni session'da Devsoy hakkında eksiksiz bilgiye sahip olması için oluşturulmuştur.
> Her session başında bu dosyayı oku. Son güncelleme: 2026-02-28

---

## 1. FİRMA GENEL BİLGİLER

| Alan | Bilgi |
|------|-------|
| **Resmi Ad** | Dev/Soy Danışmanlık (Devsoy Danışmanlık) |
| **Merkez** | KKTC (Kuzey Kıbrıs Türk Cumhuriyeti) |
| **Deneyim** | 15+ yıl |
| **Web** | devsoy.online |
| **E-posta** | devsoyconsultancy@gmail.com |
| **Telefon / WhatsApp** | +90 539 108 49 79 |
| **WhatsApp Linki** | https://wa.me/905391084979 |
| **Instagram** | https://www.instagram.com/devsoy.consultancy/ |
| **Facebook** | https://www.facebook.com/profile.php?id=61577918402689 |
| **Ton** | Premium, kurumsal, McKinsey-level profesyonellik |
| **Dil** | Türkçe (Türkçe karakterler her zaman doğru: ç, ğ, ı, ö, ş, ü) |

---

## 2. YÖNETİM KADROSU

| İsim | Ünvan | Not |
|------|-------|-----|
| **E. Töre Soysal** | Kurucu Ortak | Kullanıcı (bu sohbetleri yürüten kişi) |
| **Naz Deveci** | Genel Müdür | Featured card, gold border |
| **Ali Can Deveci** | Kurucu Ortak | |

---

## 3. HİZMET ALANLARI (devsoy.online)

1. **Casino Eğlence Turizmi** — `casino_turizmi_page.html`
   - ⚠️ KURAL: "kumar" kelimesi minimal — eğlence turizmi vurgusu
2. **Kurumsal Danışmanlık** — `kurumsal_danismanlik_page.html`
3. **Evrak Takip & Muhaceret** — `evrak_takip_page.html`
4. **Personel Tedarik** — `personel_tedarik_page.html`
5. **Eğitim Danışmanlığı** — `egitim_danismanligi_page.html`

---

## 4. TASARIM SİSTEMİ

### Renkler
```css
--gold:          #C9A84C;   /* Ana marka rengi — altın */
--dark:          #0A0A0A;   /* Koyu arka plan */
--white:         #FFFFFF;
--off-white:     #F8F7F4;   /* Açık bölüm arka planı */
--text-primary:  #1A1A1A;
--text-secondary:#666666;
```

### Fontlar (Google Fonts — `&subset=latin-ext` zorunlu)
- **Başlıklar:** `'Playfair Display', serif`
- **Gövde:** `'Inter', sans-serif`

### CSS Yapısı
- Prefix: `.ds-` (ör: `.ds-navbar`, `.ds-hero`, `.ds-stats`)
- Modifier: `--active`, `--transparent`, `--solid`, `--featured`
- İkon kütüphanesi: Font Awesome 6.5.1 (CDN)
- Sosyal medya: Custom PNG (gold/black) — `facebook-gold.png`, `instagram-gold.png`, `whatsapp-gold.png`

### Responsive Breakpoints
- Tablet: `max-width: 968px`
- Mobile: `max-width: 768px`
- Small: `max-width: 480px`

---

## 5. AKTİF PROJELER

### 5.1 devsoy-web ✅ CANLI
- **URL:** https://devsoy.online
- **GitHub:** `toresoysal/devsoy-web` → branch: `master`
- **Vercel:** Auto-deploy, Root Directory = `site`
- **Tech:** Statik HTML / CSS / JS (framework yok)
- **Deploy:** `git push origin master` → Vercel ~1-2 dk içinde canlıya alır
- **Dosya yapısı:**
  ```
  devsoy-web/
  └── site/                    ← Vercel root directory
      ├── index.html
      ├── css/style.css        (~1700+ satır)
      ├── js/script.js         (~400+ satır)
      ├── images/              (logo, sosyal medya ikonları, görseller)
      └── pages/               (8 alt sayfa)
  ```
- **Navbar durumu:** index.html = transparan (scroll'da solid), pages/*.html = solid
- **⚠️ KURAL:** Navbar + Footer her güncellemede 8 dosyada da eşitlenmeli

---

### 5.2 Kümes Takip ⏳ DEPLOY BEKLİYOR
- **Amaç:** Kümes hijyen & dezenfeksiyon takip sistemi
- **Domain:** torework.online (Namecheap, hesap: toresoysal)
- **Supabase:**
  - URL: `https://qanyulraxkrvqnesldku.supabase.co`
  - Org: DevSoy | Proje: kumes-takip | Region: Frankfurt
  - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` *(tam key: TORE_SAHA_PROJESI.md)*
- **Tech:** Next.js, Supabase, Tailwind CSS
- **Durum:** Kod hazır (kumes-takip.zip) — GitHub + Vercel deployment bekliyor
- **Sonraki adım:** Repo oluştur → push → Vercel import → env vars → domain bağla
- **9 çiftlik, 61 kümes, 11 personel, 11 araç** veritabanında hazır

---

### 5.3 DS Finans Paneli 🔧 GELİŞTİRMEDE
- **Klasör:** `02-YAZILIM-PROJELERI/ds-finans-panel/`
- **Amaç:** Finansal dashboard uygulaması

---

### 5.4 Muhasebe Uygulaması 🔧 GELİŞTİRMEDE
- **Klasör:** `02-YAZILIM-PROJELERI/muhasebe-app/`
- **Amaç:** Firma muhasebe uygulaması

---

### 5.5 Azar Hazar Motors 🆕 YENİ PROJE (Mart 2026)
- **Müşteri:** Azar Hazar Bey
- **Proje:** Motosiklet satış & showroom web sitesi
- **Teklif Ref:** DDN-2026-003 | **Fiyat:** 32.000 TL (KDV Hariç)
- **Ödeme:** %40 peşin (12.800 TL) / %60 teslimde (19.200 TL)
- **Yıllık Destek:** 4.800 TL/yıl (1. yıl ücretsiz)
- **Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Supabase, Vercel, Resend.com, GitHub
- **Referans Siteler:** motorace.com.cy, autotrader.com.cy, bazaraki.com
- **5 Faz (Tahmini):**

  | Faz | İçerik | Tarih |
  |-----|--------|-------|
  | 0 | Altyapı (GitHub, Vercel, Supabase, domain) | 2–5 Mar |
  | 1 | Tasarım (UI/UX mockup, renk paleti) | 5–12 Mar |
  | 2 | Frontend (tüm sayfalar) | 12–22 Mar |
  | 3 | Backend + Admin Panel | 22–30 Mar |
  | 4 | Test + Lansman | 30 Mar – 10 Apr |

---

## 6. TEKLİF / FATURA SİSTEMİ

- **Referans Formatı:** `DDN-YYYY-NNN` (ör: DDN-2026-003)
- **Geçerlilik:** 30 gün
- **Hariç tutulan:** Domain + e-posta maliyetleri (müşteri sorumluluğunda)
- **Devsoy iletişim:** devsoyconsultancy@gmail.com | +90 539 108 49 79

---

## 7. GITHUB & VERCEL YAPISI

| Proje | GitHub Hesabı | Repo | Vercel |
|-------|--------------|------|--------|
| devsoy-web | toresoysal | toresoysal/devsoy-web | devsoy.online |
| kumes-takip | toresoysal | toresoysal/kumes-takip (oluşturulacak) | torework.online |
| Azar Hazar Motors | toresoysal | toresoysal/azarhazar-motors (önerilir) | TBD |

---

## 8. KLASÖR YAPISI (C:\Users\MONSTER\Desktop\DEVSOY)

```
DEVSOY/
├── CLAUDE.md                          ← Bu dosya (MASTER HAFIZA)
├── 01-WEB/
│   ├── devsoy-web/                    ← AKTİF GIT REPO (devsoy.online)
│   │   └── site/                      ← Vercel root
│   └── devsoy-web-v11/                ← Eski versiyon (arşiv)
├── 02-YAZILIM-PROJELERI/
│   ├── ds-finans-panel/
│   ├── muhasebe-app/
│   ├── ds-mutabakat/
│   ├── kumes-takip (zip)              ← Deploy bekliyor
│   └── TORE_SAHA_PROJESI.md           ← Kümes takip detayları + Supabase keys
├── 03-KURUMSAL/
│   ├── DEVSOY_EGITIM_EL_KITABI.md
│   ├── logo-tasarim/                  ← Logo (PDF, CDR, EPS)
│   └── kartvizit/
├── 04-PAZARLAMA/
├── 07-GORSEL-MEDYA/                   ← Banner, profil, ofis görselleri
└── 08-Satışlar/                       ← Teklifler
    ├── AzarHazar_Motors_Yol_Haritasi.html
    └── AzarHazar_Web_Teklif_DDN-2026-003.pdf
```

---

## 9. KRİTİK KURALLAR

1. **"kumar vurgusu olmasın"** — Casino sayfalarında eğlence turizmi vurgusu, kumar minimal
2. **"onaysız değişiklik yapma"** — Sadece istenen değişiklikleri yap, formatı koru
3. **15+ yıl deneyim** — Tüm sayfalarda tutarlı
4. **Navbar + Footer tutarlılığı** — Her güncelleme 8 HTML dosyasında yapılmalı
5. **Türkçe karakter** — ç, ğ, ı, ö, ş, ü her zaman doğru
6. **Mobile responsive** — Her güncelleme sonrası mobile uyumluluk kontrol edilmeli
7. **Deploy süreci:** `git add → git commit → git push origin master` → Vercel otomatik deploy

---

## 10. LOGO & GÖRSELLER

- **Ana logo:** `site/images/devsoy-logo.png`
- **Logo vektörler:** `03-KURUMSAL/logo-tasarim/` (PDF, CDR, EPS)
- **Sosyal medya banner:** `07-GORSEL-MEDYA/Banner.png`, `Banner 2.png`
- **Profil resmi:** `07-GORSEL-MEDYA/Profil Resmi_2.png`

---

## 11. NAVBAR YAPISI (TÜM SAYFALARDA AYNI)

```
Ana Sayfa | Hakkımızda | Hizmetlerimiz ▾ | KKTC'de Yaşam | İletişim
                          ├── Casino Eğlence Turizmi
                          ├── Kurumsal Danışmanlık
                          ├── Evrak Takip & Muhaceret
                          ├── Personel Tedarik
                          └── Eğitim Danışmanlığı
```
- index.html = `ds-navbar--transparent` (scroll'da solid)
- pages/*.html = `ds-navbar--solid` (her zaman koyu)

---

## 12. BİLİNEN AÇIK KONULAR

- [ ] İletişim formu backend entegrasyonu (devsoy.online)
- [ ] Kümes Takip deployment (kumes-takip.zip → GitHub → Vercel)
- [ ] Yönetim kadrosu kart açıklamaları (3 kişi tartışıp belirleyecek)
- [ ] Azar Hazar Motors projesi başlangıcı (Mart 2026)
- [ ] SEO (sitemap.xml, robots.txt) — devsoy.online
- [ ] Google Analytics — devsoy.online

---

*Bu dosya her önemli değişiklik veya yeni proje başlangıcında güncellenmeli.*
