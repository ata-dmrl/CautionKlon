# Caution Clone: Verifiable Compute Platform

[caution.co](https://caution.co/) web sitesinin HTML, CSS ve JavaScript ile yapılmış çok sayfalı bir klonu.

> **Not:** Bu proje bir ders ödevi kapsamında, eğitim amacıyla hazırlanmıştır. Caution SEZC ile herhangi bir bağlantısı yoktur. "Caution" adı, metinler ve marka öğeleri sahiplerine aittir.

## Ödev

> Hacker News, Y Combinator ve RFS'yi inceleyerek (2026 ve sonrası) teknolojik "deprem" etkisi yaratabilecek bir ürün belirleyin ve en azından bir `clone` uygulaması üretin.

## Neden Caution?

Caution, Y Combinator destekli bir **verifiable compute** (doğrulanabilir hesaplama) platformu. Bugün bulutta çalışan yazılımın gerçekten incelenen kaynak koddan derlenip derlenmediğini bilmenin pratik bir yolu yok. Operatöre güvenmek zorundayız. Caution bu güveni kriptografik kanıtla değiştiriyor:

- Uygulamayı güvenli enclave'lere (AWS Nitro) birkaç dakikada deploy ediyor.
- Tekrarlanabilir derleme (reproducible build) sayesinde çalışan imajın hangi kaynak koddan çıktığını kanıtlıyor.
- `caution verify` komutuyla herkesin, yani müşterilerin ve denetçilerin, production'da neyin çalıştığını kendisinin doğrulamasına imkân veriyor.

Bu ürün özellikle yapay zekâ çıkarımı, finans, sağlık ve kripto varlık saklama gibi alanlar için önemli. Bu alanlarda "bize güvenin" demek artık yetmiyor. Bu yüzden 2026 ve sonrası için güçlü bir aday olduğunu düşündüm.

## Özellikler

- 11 sayfa: Ana sayfa, Platform tour, AWS Nitro, FAQ, Blog, Security evidence, About, Customers, Pricing, Contact, Legal
- Koyu ve açık tema (tercih tarayıcıda hatırlanıyor)
- Mobil uyumlu tasarım ve hamburger menü
- Animasyonlar:
  - kayan logo ve sektör bantları
  - kelime kelime beliren başlıklar
  - piksel ikonlar
  - komutları canlı yazan terminal kartları
- Etkileşimli bileşenler:
  - sekmeler
  - sürüklenebilir kart kaydırıcı
  - açılır kapanır SSS
  - blog etiket filtresi
  - kaydırırken aktif bölümü gösteren içindekiler menüsü
- Ortak header ve footer (`layout.js`) tüm sayfalara tek yerden ekleniyor.
- Harici bir framework veya derleme adımı yok. Saf HTML, CSS ve JS.

## Proje yapısı

```
├── index.html               Ana sayfa
├── platform-tour.html
├── cloud/aws.html
├── faq.html
├── blog.html
├── security-controls.html
├── about.html
├── customers.html
├── pricing.html
├── contact.html
├── legal.html
├── styles.css               Tema, ana sayfa bileşenleri
├── pages.css                Alt sayfa bileşenleri
├── layout.js                Ortak header ve footer
└── main.js                  Etkileşimler ve animasyonlar
```

## Çalıştırma

Proje klasöründe:

```bash
python -m http.server 5174
```

Ardından tarayıcıda http://localhost:5174 adresini açın.

## Kullanılan teknolojiler

HTML5 · CSS3 (custom properties, grid, `color-mix`, keyframes) · Vanilla JavaScript (IntersectionObserver) · Google Fonts (Plus Jakarta Sans, IBM Plex Mono)
