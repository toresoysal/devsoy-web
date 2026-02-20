# Dev/Soy Danışmanlık — Proje Hafıza Dosyası

> Bu dosya Claude Code oturumları arasında bağlam kaybını önlemek için oluşturulmuştur.
> Son güncelleme: 2026-02-20

---

## 1. PROJE GENEL BİLGİ

- **Firma:** Dev/Soy Danışmanlık (KKTC merkezli danışmanlık firması)
- **Domain:** devsoy.online
- **Hosting:** Vercel (GitHub push ile otomatik deploy)
- **GitHub Repo:** `toresoysal/devsoy-web` — branch: `master`
- **Vercel Root Directory:** `site` (Vercel ayarlarında Root = site klasörü)
- **Teknoloji:** Statik HTML / CSS / JS (framework yok)
- **Dil:** Türkçe (Turkish characters — `&subset=latin-ext` gerekli)

---

## 2. DOSYA YAPISI

```
devsoy web/
├── CLAUDE.md                          ← Bu dosya (proje hafızası)
├── site/                              ← Vercel root directory
│   ├── index.html                     ← Ana sayfa
│   ├── css/
│   │   └── style.css                  ← Tek CSS dosyası (~1700+ satır)
│   ├── js/
│   │   └── script.js                  ← Tek JS dosyası (~400+ satır)
│   ├── images/
│   │   ├── devsoy-logo.png            ← Site logosu
│   │   ├── facebook-gold.png          ← Premium gold/black Facebook ikonu
│   │   ├── instagram-gold.png         ← Premium gold/black Instagram ikonu
│   │   ├── whatsapp-gold.png          ← Premium gold/black WhatsApp ikonu
│   │   ├── casino-hero.jpg            ← Casino sayfası hero
│   │   ├── otel-*.jpg                 ← Otel/casino görselleri
│   │   └── ...
│   └── pages/
│       ├── pages_hakkimizda.html      ← Hakkımızda sayfası
│       ├── pages_kktc-yasam.html      ← KKTC'de Yaşam sayfası
│       ├── casino_turizmi_page.html   ← Casino Eğlence Turizmi
│       ├── kurumsal_danismanlik_page.html ← Kurumsal Danışmanlık
│       ├── evrak_takip_page.html      ← Evrak Takip & Muhaceret
│       ├── personel_tedarik_page.html ← Personel Tedarik
│       └── egitim_danismanligi_page.html  ← Eğitim Danışmanlığı
```

---

## 3. TASARIM SİSTEMİ

### Renkler (CSS Variables)
```css
--gold: #C9A84C;          /* Ana marka rengi — altın */
--dark: #0A0A0A;          /* Koyu arka plan */
--white: #FFFFFF;
--off-white: #F8F7F4;     /* Açık bölüm arka planı */
--text-primary: #1A1A1A;
--text-secondary: #666666;
```

### Fontlar (Google Fonts)
```css
--font-display: 'Playfair Display', serif;   /* Başlıklar */
--font-body: 'Inter', sans-serif;            /* Gövde metni */
```
- Google Fonts URL'lerinde `&subset=latin-ext` Türkçe karakter desteği için zorunlu

### İkon Kütüphanesi
- **Font Awesome 6.5.1** (CDN ile yükleniyor)
- Sosyal medya ikonları: Custom PNG (gold/black premium tasarım)

### CSS Naming Convention
- BEM-benzeri `.ds-` prefix: `.ds-navbar`, `.ds-hero`, `.ds-stats`, vb.
- Modifier: `--active`, `--transparent`, `--solid`, `--featured`
- Element: `__link`, `__icon`, `__text`, `__content`

### Responsive Breakpoints
- Tablet: `max-width: 968px`
- Mobile: `max-width: 768px`
- Small: `max-width: 480px`

---

## 4. NAVBAR YAPISI (TÜM SAYFALARDA AYNI)

```
Ana Sayfa | Hakkımızda | Hizmetlerimiz ▾ | KKTC'de Yaşam | İletişim
                          ├── Casino Eğlence Turizmi
                          ├── Kurumsal Danışmanlık
                          ├── Evrak Takip & Muhaceret
                          ├── Personel Tedarik
                          └── Eğitim Danışmanlığı
```

- **index.html:** `ds-navbar--transparent` (scroll'da solid'e dönüşür)
- **pages/*.html:** `ds-navbar--solid` (her zaman koyu)
- **Dropdown:** Desktop'ta CSS hover, mobile'da JS toggle (`.open` class)
- **Active state:** Aktif sayfa linkine `ds-navbar__link--active` class'ı eklenir
- **Hizmet sayfalarında:** "Hizmetlerimiz" linki active olur
- **Path farkı:** index.html → `pages/xxx.html`, pages → `xxx.html` (aynı klasör), parent → `../index.html`

---

## 5. SAYFA BÖLÜMLERİ (index.html sırası)

1. **Navbar** — Transparan, scroll'da solid
2. **Hero** — Video arka plan + overlay + başlık
3. **Hizmetler** (`#hizmetler`) — 5 bordered service card (grid)
4. **Trust Marquee Band** — Sonsuz dönen güven bandı (CSS-only animasyon)
   - 6 öğe: 15+ Yıl, KKTC Merkezli (dönen dünya), Profesyonel Destek, %100 Gizlilik, Şeffaf Fiyatlandırma, 5 Hizmet Alanı
   - Custom SVG ikonlar, altın ◆ ayraçlar
   - `translateX(-50%)` loop, hover'da durur
5. **Neden Biz** (`#neden-biz`) — 2 sütun: açıklama + 4 özellik kutusu
6. **Sosyal Medya** — Facebook + Instagram + WhatsApp linkleri
7. **İletişim** (`#iletisim`) — Form + bilgi kartları (e-posta, telefon, WhatsApp)
8. **Footer** — Copyright + sayfa linkleri + sosyal medya ikonları

---

## 6. YÖNETİM KADROSU (pages_hakkimizda.html)

```
┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ E. Töre Soysal│  │   Naz Deveci     │  │ Ali Can Deveci   │
│ Kurucu Ortak  │  │  GENEL MÜDÜR     │  │  Kurucu Ortak    │
│               │  │ (featured card)  │  │                  │
└──────────────┘  └──────────────────┘  └──────────────────┘
```

- 3 kişilik grid (`grid-template-columns: 1fr 1.15fr 1fr`)
- Ortadaki kart (Naz Deveci): gold border, glow efekti, büyük avatar
- Kart altı açıklamaları kaldırıldı (ileride eklenecek)
- Mobile'da tek sütun, featured kart üste gelir (order: -1)

---

## 7. SOSYAL MEDYA & İLETİŞİM

| Platform   | URL                                                              | İkon Dosyası         |
|------------|------------------------------------------------------------------|----------------------|
| Instagram  | https://www.instagram.com/devsoy.consultancy/                    | instagram-gold.png   |
| Facebook   | https://www.facebook.com/profile.php?id=61577918402689           | facebook-gold.png    |
| WhatsApp   | https://wa.me/905391084979                                       | whatsapp-gold.png    |
| Telefon    | +90 539 108 49 79                                                | Font Awesome fa-phone|
| E-posta    | devsoyconsultancy@gmail.com                                      | Font Awesome fa-envelope|

---

## 8. KRİTİK KURALLAR & KISITLAMALAR

1. **"kumar vurgusu olmasın"** — Casino/turizm sayfalarında eğlence turizmi vurgusu, kumar kelimesi minimal
2. **"bunlar dışında onaysız değişiklik yapma formatları koru"** — Sadece istenen değişiklikleri yap
3. **15+ yıl deneyim** — Tüm sayfalarda tutarlı (eskiden 20 idi, 15'e güncellendi)
4. **Kurumsal ton** — Premium, profesyonel, McKinsey-level UI
5. **Türkçe karakter** — ç, ğ, ı, ö, ş, ü her zaman doğru
6. **Footer & Navbar tutarlılığı** — Her güncelleme 8 dosyada yapılmalı
7. **Mobile responsive** — Her güncelleme mobile uyumluluğu kontrol edilmeli

---

## 9. GIT COMMIT GEÇMİŞİ (önemli noktalar)

| Commit   | Açıklama |
|----------|----------|
| `23036dc`| Tam site yeniden yazımı: Profesyonel CSS, HTML ve JS |
| `2fb4991`| Premium site redesign: Video hero, McKinsey-level UI |
| `4fa572a`| Fix: ds-reveal animasyon class ismi uyumsuzluğu düzeltildi |
| `c65d4ec`| Casino turizmi sayfası, otel/casino resimleri |
| `8822c33`| 5 hizmet alanı: Kurumsal Danışmanlık ve Eğitim Danışmanlığı sayfaları |
| `1143929`| Navbar tutarlılığı: Hizmetlerimiz dropdown, sosyal medya ikon ve URL güncellemesi |
| `7a01a8b`| Trust marquee band: Sayaç bölümü kaldırıldı, premium güven bandı eklendi |
| `f600c17`| Yönetim kadrosu: Naz Deveci Genel Müdür olarak eklendi, 3 kişilik grid |

---

## 10. DEPLOY SÜRECİ

1. Kod değişiklikleri yapılır
2. `git add <dosyalar>` ile staging
3. `git commit -m "açıklama"` ile commit
4. `git push origin master` ile push
5. Vercel otomatik deploy tetiklenir (Root Directory: `site`)
6. ~1-2 dakika içinde devsoy.online'da canlı

---

## 11. BİLİNEN SORUNLAR & NOTLAR

- İletişim formu sadece client-side validation var, backend yok (form submit çalışmaz)
- `nul` dosyası root'ta var (Windows artifact, git'e eklenmemeli)
- `.playwright-mcp/` klasörü var (test tool artifact, git'e eklenmemeli)
- CSS'te `.ds-navbar__links.active` ve `.ds-navbar__links.open` ikisi de mobile menü için kullanılıyor
- WhatsApp linki `https://wa.me/905391084979` formatında (uluslararası format, + işareti olmadan)

---

## 12. GELECEKTEKİ İŞLER (tartışılacak)

- [ ] Yönetim kadrosu kart açıklamaları (3 kişi tartışıp belirleyecek)
- [ ] İletişim formu backend entegrasyonu
- [ ] SEO optimizasyonu (sitemap.xml, robots.txt)
- [ ] Performans optimizasyonu (image compression, lazy loading audit)
- [ ] Google Analytics entegrasyonu
