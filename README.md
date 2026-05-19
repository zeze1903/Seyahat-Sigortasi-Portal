# Multi-Stage Travel Insurance Portal (.NET Core & React Stack)

Anadolu Sigorta'nın yurt dışı seyahat sigortası tedarik ekranı referans alınarak, Vizyoneks Bilgi Teknolojileri bünyesinde geliştirilmiş; çok aşamalı (multi-stage), full-stack bir web uygulamasıdır.

## Teknoloji Yığını (Technology Stack)
* **Frontend:** React.js, Material-UI (MUI), Axios
* **Backend:** ASP.NET Core Web API, Entity Framework Core
* **Veritabanı:** MS SQL Server
* **Güvenlik/Protokol:** CORS (Cross-Origin Resource Sharing) Policy Integration

## Mimari ve Teknik Kabiliyetler
* **Asenkron Form Yönetimi (Stepper):** Kullanıcı deneyimini optimize etmek amacıyla form mimarisi; Genel Bilgiler, Seyahat Bilgileri ve Poliçe Seçimi olmak üzere çok aşamalı state yönetimli `Stepper` bileşeniyle kurgulanmıştır.
* **Gelişmiş Validasyon:** Her adımda `isFormValid` ve `handleFormChange` dinamik kontrol mekanizmaları kullanılarak veri tutarlılığı frontend seviyesinde doğrulanır.
* **REST API Entegrasyonu:** Doğrulanan veriler Axios istemcisi vasıtasıyla asenkron olarak arka plan servislerine aktarılır. `MusteriController` üzerinden alınan veriler, Entity Framework Core (DbContext) vasıtasıyla MS SQL Server üzerindeki ilişkisel tablolara güvenli şekilde kaydedilir.
