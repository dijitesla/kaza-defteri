# Kaza Defteri: Şartname (sürüm 1)

## 1. Kapsam

### İlk sürümde olanlar
1. Üç adımlık kurulum: konum, kaza borcu hesabı, hatırlatma tercihleri.
2. Ana ekran: sıradaki vakte geri sayım, günün vakitleri, cevapsız vakitler, kalan kaza toplamı.
3. Vakit bazlı kaza takibi (sabah, öğle, ikindi, akşam, yatsı, vitir).
4. İki aşamalı vakit bildirimi ve bildirim düğmeleri.
5. Geri al ve işlem geçmişi.
6. Ayarlar: konum, mezhep, bildirim tercihleri, vakit bazlı dakika düzeltmesi, kaza sayılarını elle düzeltme.
7. Yedek alma (JSON dosyası) ve geri yükleme.

### İlk sürümde olmayanlar (ekleme)
Ana ekran widget'ı, kıble pusulası, ezan sesi (standart bildirim sesi kullanılır), kaza oruç takibi, dua/ayet içerikleri, çoklu profil, ilçe bazlı konum listesi, Diyanet API entegrasyonu, karanlık tema, İngilizce dil.

## 2. Ekranlar

Gezinme: alt sekmeler **Bugün**, **Vakitler**, **Geçmiş**, **Ayarlar** (simgeli, yüzen sekme çubuğu; seçili sekme koyu hap içinde adıyla görünür). Kurulum tamamlanmadıysa uygulama kurulum akışıyla açılır.

### 2.1 Kurulum 1/3: Konum
- "Konumumu bul" düğmesi: `expo-location` ile ön planda tek seferlik konum. İzin reddedilirse sessizce il listesine dön.
- İl listesi: 81 il, aranabilir. Her il için il merkezinin enlem ve boylamı `src/data/iller.ts` içinde tutulur.
- **Koordinat doğruluğu kritik.** İl merkezi koordinatlarını uydurma; güvenilir bir açık kaynaktan al ve kaynağını dosyanın başına yorum olarak yaz. Kaynak bulamazsan kullanıcıya sor.
- Kaydedilen: konum adı (GPS seçilirse "Bulunduğun konum"), enlem, boylam.

### 2.2 Kurulum 2/3: Kaza hesabı
Girişler:
- Yükümlülük başlangıcı (ay + yıl seçici)
- Düzenli kılmaya başlama (ay + yıl seçici). Hiç düzenli kılmadıysa "Henüz düzenli başlamadım" seçeneği: bu durumda bitiş bugünün tarihi.
- Mezhep: Hanefi (varsayılan) veya Şafii
- Özel günleri düş: anahtar. Açılırsa "ayda kaç gün" sayı girişi (1 ile 15 arası, varsayılan 7).

Doğrulama: başlangıç bitişten sonra olamaz; ikisi de gelecekte olamaz. Hatalı girişte "Devam et" pasif kalır ve hata metni gösterilir.

Formül ekranda canlı güncellenir (bkz. Bölüm 4).

### 2.3 Kurulum 3/3: Hatırlatmalar
- Beş vakit için ayrı anahtar (varsayılan hepsi açık).
- "Kıldın mı?" zamanı: 15 / 30 / 60 dakika (varsayılan 30). Vakit çıkmadan bu kadar önce sorulur.
- Yatsı sorusu sabit saatte: varsayılan 23:00 (Ayarlar'dan değiştirilebilir).
- "Bildirimlere izin ver" düğmesi izni ister, sonra kurulumu bitirir. Reddedilirse kurulum yine biter; Ayarlar'da uyarı gösterilir.

### 2.4 Bugün (ana ekran)
- Üstte konum adı ve tarih.
- Geri sayım kartı: sıradaki vakit adı, saati ve kalan süre (dakika bazında, her dakika güncellenir; 60 dk üstünde "1 sa 12 dk" biçimi).
- Gün yayı: beş vakit, saatleriyle. Kılındı: yeşil onay. Sıradaki: altın halka. Gelecek: gri. Kılınamadı: kırmızımsı çarpı (#B5523B).
- Cevapsız vakitler bandı: son 3 gün içindeki cevapsız vakitlerin en eskisi gösterilir ("Dün yatsı cevapsız kaldı. Kıldın mı?"), "Kıldım" ve "Kılamadım" düğmeleriyle. Cevap verildikçe bir sonrakine geçer. 3 günden eski cevapsızlar gösterilmez, durumları değişmez.
- Kalan kaza kartı: toplam kalan sayı ve "Kaza kıl" düğmesi.

### 2.5 Kaza kıl
- 6 kutucuk (Şafii'de vitir yok, 5 kutucuk). Her kutucukta vakit adı, kalan sayı ve "+1" düğmesi.
- Dokununca o vaktin kalanı 1 azalır, kutucuk kısa süre yeşil çerçeve alır, altta "X kazası kaydedildi | Geri al" çubuğu 6 saniye görünür.
- Kalan 0 ise düğme pasif olur.
- Alt satır: toplam kalan ve "İşlem geçmişi" bağlantısı.

### 2.6 Geçmiş
- İşlem kayıtları, en yeniden eskiye, güne göre gruplu. Her satırda saat, açıklama ve etki (ör. "Sabah kazası, -1").
- En üstteki (en son) işlemin yanında "Geri al".
- Üstte özet: kurulumdaki toplam borç, kılınan kaza, kalan.

### 2.7 Ayarlar
- Konum (değiştir), mezhep, özel gün düşümü, kaza başlangıç bilgileri (değişince yeniden hesap; mevcut ilerleme korunur, bkz. Bölüm 4.3).
- Kaza sayılarını elle düzeltme: her vakit için sayı girişi. Kayıt defterine "manuel düzeltme" olarak yazılır.
- Bildirimler: vakit bazlı anahtarlar, "Kıldın mı?" zamanı, yatsı soru saati, "Vakit girdi bildirimi" anahtarı (kapatılırsa yalnızca soru gelir).
- Vakit düzeltmeleri: her vakit için -10 ile +10 dakika arası.
- Yedekleme: "Yedek al", "Yedekten geri yükle".
- Hakkında: uyarı metni, sürüm, iletişim.

## 3. Veri modeli (AsyncStorage)

```ts
type Vakit = 'sabah' | 'ogle' | 'ikindi' | 'aksam' | 'yatsi';
type KazaVakit = Vakit | 'vitir';
type Mezhep = 'hanefi' | 'safii';

interface Ayarlar {
  kurulumTamam: boolean;
  konum: { ad: string; enlem: number; boylam: number };
  mezhep: Mezhep;
  ozelGun: { acik: boolean; aydaGun: number };
  baslangic: { yukumlulukAy: string; duzenliAy: string | null }; // 'YYYY-MM', null = henüz başlamadı
  bildirim: {
    vakitler: Record<Vakit, boolean>;
    girisBildirimi: boolean;
    soruDakika: 15 | 30 | 60;
    yatsiSoruSaati: string; // 'HH:mm'
  };
  dakikaDuzeltme: Record<Vakit, number>; // -10..+10
}

interface KazaDurumu {
  ilkBorc: Record<KazaVakit, number>; // kurulumda hesaplanan
  kalan: Record<KazaVakit, number>;
}

// Günlük vakit durumu, anahtar 'YYYY-MM-DD'
type VakitDurumu = 'kilindi' | 'kilinamadi' | 'cevapsiz';
type GunlukDurum = Record<string, Partial<Record<Vakit, VakitDurumu>>>;

interface Islem {
  id: string;
  zaman: string; // ISO
  tur: 'kaza_kilindi' | 'kilinamadi' | 'manuel_duzeltme' | 'yeniden_hesap' | 'geri_alindi';
  vakit?: KazaVakit;
  degisim: Partial<Record<KazaVakit, number>>; // kalan üzerindeki etki, ör. { sabah: -1 }
  geriAlinanId?: string;
}
```

Kurallar:
- Vakit geçtiğinde durumu yoksa `cevapsiz` sayılır (kaydetmeye gerek yok, okurken türet).
- "Kılamadım": ilgili vaktin `kalan` değerine +1 ve `kilinamadi` durumu. Vitir için ayrıca işlem yapılmaz (yatsı kılınamadıysa vitir de eklenmeli mi? **Hayır, ilk sürümde yalnızca seçilen vakit eklenir.** Bu konu imam kontrolünden sonra netleşecek; kodu tek yerden değiştirilebilir yaz.)
- Geri al: son geri alınmamış işlemin `degisim` değerinin tersini uygular, `geri_alindi` işlemi yazar, ilgili günlük durumu da geri alır.
- İşlem geçmişinde en fazla 2000 kayıt tutulur; eskiler silinir.

## 4. Kaza hesabı

### 4.1 Formül
- `gunSayisi` = yükümlülük ayının 1. gününden düzenli başlama ayının 1. gününe kadar geçen gün (bitiş hariç). Düzenli başlamadıysa bitiş bugündür.
- Özel gün açıksa: `dusulecek = aydaGun × ay farkı`, `vakitBasiBorc = max(0, gunSayisi - dusulecek)`. Kapalıysa `vakitBasiBorc = gunSayisi`.
- Hanefi: sabah, öğle, ikindi, akşam, yatsı, vitir; her biri `vakitBasiBorc`. Toplam = `vakitBasiBorc × 6`.
- Şafii: vitir yok. Toplam = `vakitBasiBorc × 5`.

Test örneği: 2016-09 ile 2019-01, Hanefi, özel gün kapalı → gunSayisi 852, vakit başı 852, toplam 5.112.

### 4.2 Ekranda gösterim
"852 gün × 6 vakit = 5.112" biçiminde. Özel gün açıksa: "(852 gün - 196 gün) × 6 vakit = 3.936". Sayılarda Türkçe binlik ayırıcı (nokta) kullanılır.

### 4.3 Yeniden hesap
Başlangıç bilgileri değişirse yeni `ilkBorc` hesaplanır; her vakit için `yeniKalan = max(0, yeniIlkBorc - (eskiIlkBorc - eskiKalan))`. Yani kılınan kaza sayısı korunur. Değişiklik `yeniden_hesap` işlemi olarak yazılır.

## 5. Namaz vakitleri
- `adhan` kütüphanesi, `CalculationMethod.Turkey()`, `Madhab.Shafi` ikindi hesabı (Diyanet ikindiyi asr-ı evvel ile verir; bu varsayımı kod içinde açıkça yorumla).
- Gösterilen vakitler: İmsak (sabah vakti başlangıcı), Güneş, Öğle, İkindi, Akşam, Yatsı. Gün yayında beş namaz vakti gösterilir.
- Her vakte kullanıcının dakika düzeltmesi eklenir.
- **Doğrulama zorunlu:** `CalculationMethod.Turkey()` yönteminin kütüphanenin güncel sürümünde var olduğunu kontrol et. Yoksa kullanıcıya bildir, kendi parametre uydurma. Ayrıca İstanbul ve Ankara için 3 farklı tarihte hesaplanan vakitleri `src/logic/__tests__` içinde bir test dosyasına yaz ki kullanıcı Diyanet takvimiyle karşılaştırabilsin.
- Vakit "çıkış" zamanları: sabah → güneş doğuşu; öğle → ikindi; ikindi → akşam; akşam → yatsı; yatsı → ertesi imsak (soru için sabit saat kullanılır).

## 6. Bildirimler

### 6.1 Akış (her vakit için)
1. **Giriş bildirimi** (vakit başında, `girisBildirimi` açıksa): başlık "{Vakit} vakti girdi", düğme: "Kıldım".
2. **Soru bildirimi**: vakit çıkışından `soruDakika` önce (yatsıda `yatsiSoruSaati`). Başlık "{Vakit} namazını kıldın mı?", gövde "{Vakit} vakti {saat}'te çıkıyor.", düğmeler: "Kıldım", "Kılamadım", "Sonra".
3. Kullanıcı herhangi bir yerden (giriş bildirimi, ana ekran, cevapsız bandı) cevap verirse o vaktin soru bildirimi iptal edilir.
4. Sabah sorusu güneş doğuşundan `soruDakika` önce gelir. Bu süre sabah vaktinin yarısından uzunsa, vaktin ortasında gelir.

### 6.2 Tanımlayıcılar
`{YYYY-MM-DD}_{vakit}_giris` ve `{YYYY-MM-DD}_{vakit}_soru`. İptal ve yeniden planlama bu kimliklerle yapılır.

### 6.3 Planlama
- Platform sınırları nedeniyle bildirimler 6 gün ileriye planlanır (iOS'ta bekleyen bildirim sınırı 64).
- Uygulama her açıldığında, her cevapta ve her ayar değişikliğinde: tüm planlanmış bildirimleri iptal et, 6 günü yeniden planla.
- 6. günün son soru bildiriminin gövdesine ek: "Hatırlatmaların devam etmesi için uygulamayı bir kez aç."
- Android: "Alarmlar ve hatırlatıcılar" (kesin alarm) izni yoksa bildirimler gecikebilir. Ayarlar'da bu durumu algıla ve kullanıcıyı sistem ayarına yönlendiren bir satır göster.

### 6.4 Bildirim düğmeleri
- `expo-notifications` bildirim kategorileri: `GIRIS` (Kıldım) ve `SORU` (Kıldım, Kılamadım, Sonra).
- Hedef: düğmeler uygulamayı açmadan çalışsın. Uygulama tamamen kapalıyken cevabın kaydedildiğini doğrula. **Güvenilir çalışmıyorsa** düğmeleri uygulamayı açacak şekilde ayarla (`opensAppToForeground: true`) ve cevabı açılışta işle. Hangisinin seçildiğini aşama özetinde belirt.

## 7. Yedekleme
- "Yedek al": tüm veriyi `{ surum: 1, tarih, ayarlar, kaza, gunluk, islemler }` biçiminde JSON dosyasına yaz (`kaza-defteri-yedek-YYYY-MM-DD.json`), paylaşma ekranını aç.
- "Geri yükle": dosya seçtir, yapıyı doğrula, özet göster ("Bu yedekte kalan kaza: 4.812. Mevcut verilerin yerine geçecek.") ve onay al. Geçersiz dosyada hata metni göster, mevcut veriye dokunma.

## 8. Tasarım

### Renkler
| Ad | Hex | Kullanım |
|---|---|---|
| gece | #1C2541 | Ana renk, koyu kartlar, birincil metin |
| altin | #D4A853 | Birincil düğme, vurgu |
| zemin | #EEF1F4 | Ekran arka planı |
| kart | #FFFFFF | Kartlar |
| onay | #2E7D5B | Kılındı, açık anahtar |
| kilinamadi | #B5523B | Kılınamadı |
| uyari-zemin | #FBF1DC | Cevapsız bandı |
| uyari-metin | #6E4A12 | Cevapsız bandı metni |
| ikincil-metin | #6B7286 | Açıklamalar |

### Yazı tipleri
- Lora SemiBold: ekran başlıkları, büyük sayılar (kalan kaza, geri sayım).
- Poppins Regular / SemiBold: geri kalan her şey.

### Ölçüler
- Kart köşe yarıçapı 12-16, düğme 10-12. Ekran yatay boşluğu 16.
- Dokunma alanı en az 44×44.
- Büyük sayılar için `fontVariant: ['tabular-nums']`.
- Yazı boyutu sistem ayarına uyumlu olmalı (yaşlı kullanıcılar için önemli).

Ekran düzeni için `docs/tasarim.html` dosyasına bak.

## 9. Boş ve hata durumları
- Konum alınamadı: il listesine dön, METINLER'deki hata metnini göster.
- Bildirim izni yok: Ayarlar'ın üstünde uyarı satırı ve "İzin ver" düğmesi.
- Kaza borcu 0: kaza kıl ekranında tebrik metni, kutucuklar pasif.
- Yedek dosyası geçersiz: hata metni, veri değişmez.

## 10. Reklam
- Google AdMob banner (uyarlanabilir, sabit) Bugün, Geçmiş ve Ayarlar ekranlarının en altında. Kurulum, Kaza kıl ve alt ekranlarda reklam yok.
- Reklamdan önce Google UMP ile onay toplanır (AB'de onay penceresi). Onay seçeneğini değiştirme satırı Ayarlar'da yalnızca gerekli olduğunda görünür.
- Reklam yüklenemezse (internet yok, onay yok, dolum yok) banner hiç yer kaplamaz; uygulamanın hiçbir işlevi reklama bağlı değildir.
- Gerçek reklam birimi kimlikleri girilene kadar Google test reklamları gösterilir.

## 11. Sürüm 1.1 eklemeleri
- **Konum:** 81 ilin 973 ilçesi (`src/data/ilceler.ts`, kaynaklar dosya başında). İl seçilince ilçeleri açılır; aramada ilçeler de çıkar. Kayıtlı ad "İlçe, İl" ya da "İl Merkez".
- **Gökyüzü kartı (Bugün ve Vakitler):** sıradaki vakte saniyeli geri sayım (`MM:SS` / `S:MM:SS`). Arka plan günün evresine göre: gece (yatsı–imsak), şafak (imsak–güneş), gündüz (güneş–ikindi), ikindi (ikindi–akşam), akşam (akşam–yatsı). Güneş doğuştan akşama kadar, diğer zamanlarda ay; ay gerçek evresiyle çizilir (yaklaşık, ±1 gün). Gerçek hava durumu gösterilmez (internet gerektirir).
- **Gün yayı:** beş vakit eşit aralıklı noktalarda; güneş/ay iki vakit arasında geçen süreyle orantılı yerde, animasyonla kayar. Gündüz geçilen kısım altın renkle dolar, gece çizilmez.
- **Vakitler sekmesi:** İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı; içinde bulunulan vakit vurgulu ("Şimdi"), sıradaki işaretli. (Namaz hadisi alanı, metinler gelince eklenecek.)
- **Zikirmatik:** Bugün'de kart, dokununca tam ekran sayaç. Hedef 33 / 99 / serbest; hedefe ulaşınca tur tamamlanır, sayı sıfırdan başlar. Her dokunuşta hafif, tur sonunda başarı titreşimi. Telefonda saklanır (`kd:zikir`), yedeğe dahil değildir.
- **Geçmiş:** ilerleme halkası (kılınan / başlangıç borcu), bu hafta (Pazartesiden) ve bu ay kılınan kaza sayısı, işlem türüne göre simge ve renk.
