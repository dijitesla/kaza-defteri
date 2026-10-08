# Kaza Defteri

Türkçe, Android öncelikli bir mobil uygulama. Ana işlev kaza namazı borcunu hesaplamak ve takip etmek. Yan işlev namaz vakti hatırlatıcısı ve her vakit için "Kıldın mı?" bildirimi.

## Değişmez kurallar
- Sunucu yok, üyelik yok, analitik yok. Kullanıcının kaza ve namaz verisi telefonda kalır. Uygulama internet olmadan tam çalışmalı.
- Gelir modeli: Google AdMob banner reklam (`react-native-google-mobile-ads`), yalnızca sekme ekranlarının altında. Kurulumda ve Kaza kıl ekranında reklam yok. Reklam yüklenemezse (internet yok, onay yok) yer kaplamaz.
- Uygulama dini hüküm vermez. Hesap yalnızca kullanıcının girdiği bilgiye dayanır ve formül ekranda açıkça gösterilir.
- Kullanıcının açık cevabı olmadan kaza borcuna asla ekleme yapma. Cevapsız vakit "cevapsız" olarak kalır.
- Borcu değiştiren her işlem kayıt defterine (log) yazılır ve geri alınabilir.
- Tüm arayüz metinleri `docs/METINLER.md` dosyasından alınır. Yeni metin uydurma; eksik metin gerekirse sor.

## Teknoloji
- Expo (güncel SDK) + React Native + TypeScript, Expo Router ile gezinme.
- Depolama: AsyncStorage (JSON). Veri küçük olduğu için SQLite kullanma.
- Vakit hesabı: `adhan` kütüphanesi, `CalculationMethod.Turkey()`, kullanıcı başına vakit bazlı dakika düzeltmesi.
- Reklam: `react-native-google-mobile-ads` (AdMob, AB için UMP onayı). Reklam birimi kimlikleri `src/reklam.ts`, uygulama kimlikleri `app.json` (eklenti ayarı ve kökteki `react-native-google-mobile-ads` anahtarı; ikisi aynı olmalı).
- Bildirim: `expo-notifications`. Konum: `expo-location` (yalnızca ön planda, tek seferlik). Yedekleme: `expo-file-system`, `expo-sharing`, `expo-document-picker`.
- Yazı tipleri: Lora (başlık ve büyük sayılar), Poppins (arayüz), `@expo-google-fonts` ile.
- Grafik ve animasyon: `react-native-svg` (simgeler, güneş/ay, yay, halkalar), `react-native-reanimated` (animasyonlar), `expo-haptics` (zikirmatik titreşimi).
- Kod hem Android hem iOS'ta çalışacak şekilde yazılır; yayın önce Android.

## Belgeler
- `docs/SPEC.md`: özellikler, veri modeli, hesaplama ve bildirim kuralları. İlgili aşamada oku.
- `docs/METINLER.md`: tüm arayüz ve bildirim metinleri.
- `docs/tasarim.html`: ekran tasarımları (tarayıcıda açılabilir; renk, ölçü ve yerleşim CSS içinde). Renk ve ölçüler ayrıca SPEC.md içindeki "Tasarım" bölümünde.

## Çalışma kuralları (kredi tasarrufu için)
- Her oturumda yalnızca kullanıcının belirttiği aşamayı yap. Sonraki aşamaya geçme.
- Kod yazmadan önce o aşama için kısa bir plan yaz (en fazla 10 madde).
- Kullanıcının istemediği özellik, ekran veya kütüphane ekleme. Yeni bir bağımlılık gerekiyorsa önce sor.
- Tüm projeyi tarama; yalnızca aşamanın ilgilendiği dosyaları aç.
- Hesaplama ve veri fonksiyonları (`src/logic/`) saf fonksiyon olsun ve Jest testleri yazılsın. Arayüz için test yazma.
- Aşama bitince: ne yapıldığını 5 maddede özetle, kullanıcının telefonda neyi test etmesi gerektiğini listele.

## Aşamalar
1. Kurulum: Expo projesi, TypeScript, Expo Router, tema (renk ve yazı tipleri), boş ekranlar, depolama katmanı.
2. Kurulum sihirbazı: konum (GPS veya il listesi), kaza hesaplama, hatırlatma tercihleri. Hesap fonksiyonları + testler.
3. Ana ekran ve kaza kılma: vakit hesabı, geri sayım, gün yayı, cevapsız vakitler, vakit bazlı kaza sayaçları, geri al, işlem geçmişi.
4. Bildirimler: iki aşamalı vakit bildirimi, bildirim düğmeleri, planlama ve yenileme.
5. Ayarlar ve yedekleme: tüm tercihler, dakika düzeltmesi, kaza sayılarını elle düzeltme, yedek al ve geri yükle.
6. Cilalama ve yayın hazırlığı: hata kontrolü, boş ve hata durumları, Android derleme ayarları (EAS).
