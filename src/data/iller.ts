// 81 il merkezinin koordinatları.
//
// Kaynak: GeoNames (https://www.geonames.org), CC BY 4.0 lisansı.
// "cities1000" veri setindeki Türkiye kayıtlarından featureCode = PPLA (il merkezi)
// ve PPLC (başkent) olanlar alındı; tam 81 kayıt. Veriye all-the-cities@3.1.0 npm paketi
// üzerinden erişildi (bu paket uygulamaya dahil değildir). Her satırdaki numara GeoNames kimliğidir,
// https://www.geonames.org/<kimlik> adresinden doğrulanabilir.
//
// Çapraz kontrol: Natural Earth 10m "populated places" (kamu malı) ile karşılaştırıldı.
// Natural Earth'te bulunan 72 ilin 71'inde fark 5 km'nin altında; İstanbul'da 11,5 km
// (GeoNames noktası tarihi yarımada, Natural Earth noktası daha kuzeyde).
//
// Koordinatlar 4 ondalığa yuvarlandı (yaklaşık 10 m).

export interface Il {
  ad: string;
  enlem: number;
  boylam: number;
}

export const ILLER: readonly Il[] = [
  { ad: "Adana", enlem: 36.9862, boylam: 35.3253 }, // GeoNames 325363
  { ad: "Adıyaman", enlem: 37.7644, boylam: 38.2763 }, // GeoNames 325330
  { ad: "Afyonkarahisar", enlem: 38.7567, boylam: 30.5433 }, // GeoNames 325303
  { ad: "Ağrı", enlem: 39.7194, boylam: 43.0514 }, // GeoNames 309647
  { ad: "Aksaray", enlem: 38.3725, boylam: 34.0254 }, // GeoNames 324496
  { ad: "Amasya", enlem: 40.6533, boylam: 35.8331 }, // GeoNames 752015
  { ad: "Ankara", enlem: 39.9199, boylam: 32.8543 }, // GeoNames 323786
  { ad: "Antalya", enlem: 36.9081, boylam: 30.6956 }, // GeoNames 323777
  { ad: "Ardahan", enlem: 41.1087, boylam: 42.7022 }, // GeoNames 751952
  { ad: "Artvin", enlem: 41.1816, boylam: 41.8217 }, // GeoNames 751817
  { ad: "Aydın", enlem: 37.845, boylam: 27.8396 }, // GeoNames 322830
  { ad: "Balıkesir", enlem: 39.6492, boylam: 27.8861 }, // GeoNames 322165
  { ad: "Bartın", enlem: 41.6358, boylam: 32.3375 }, // GeoNames 751057
  { ad: "Batman", enlem: 37.8874, boylam: 41.1322 }, // GeoNames 321836
  { ad: "Bayburt", enlem: 40.2563, boylam: 40.2229 }, // GeoNames 750938
  { ad: "Bilecik", enlem: 40.1419, boylam: 29.9793 }, // GeoNames 750598
  { ad: "Bingöl", enlem: 38.8847, boylam: 40.4939 }, // GeoNames 321082
  { ad: "Bitlis", enlem: 38.4012, boylam: 42.1078 }, // GeoNames 321025
  { ad: "Bolu", enlem: 40.7358, boylam: 31.6061 }, // GeoNames 750516
  { ad: "Burdur", enlem: 37.7203, boylam: 30.2908 }, // GeoNames 320392
  { ad: "Bursa", enlem: 40.1956, boylam: 29.0601 }, // GeoNames 750269
  { ad: "Çanakkale", enlem: 40.1555, boylam: 26.4127 }, // GeoNames 749780
  { ad: "Çankırı", enlem: 40.5999, boylam: 33.6153 }, // GeoNames 749748
  { ad: "Çorum", enlem: 40.5489, boylam: 34.9533 }, // GeoNames 748879
  { ad: "Denizli", enlem: 37.7742, boylam: 29.0875 }, // GeoNames 317109
  { ad: "Diyarbakır", enlem: 37.9136, boylam: 40.2172 }, // GeoNames 316541
  { ad: "Düzce", enlem: 40.8389, boylam: 31.1639 }, // GeoNames 747764
  { ad: "Edirne", enlem: 41.6772, boylam: 26.556 }, // GeoNames 747712
  { ad: "Elazığ", enlem: 38.6743, boylam: 39.2232 }, // GeoNames 315808
  { ad: "Erzincan", enlem: 39.7392, boylam: 39.4901 }, // GeoNames 315373
  { ad: "Erzurum", enlem: 39.9086, boylam: 41.2769 }, // GeoNames 315368
  { ad: "Eskişehir", enlem: 39.7767, boylam: 30.5206 }, // GeoNames 315202
  { ad: "Gaziantep", enlem: 37.0594, boylam: 37.3825 }, // GeoNames 314830
  { ad: "Giresun", enlem: 40.917, boylam: 38.3874 }, // GeoNames 746881
  { ad: "Gümüşhane", enlem: 40.46, boylam: 39.4718 }, // GeoNames 746425
  { ad: "Hakkari", enlem: 37.5744, boylam: 43.7408 }, // GeoNames 318137
  { ad: "Hatay", enlem: 36.2066, boylam: 36.1572 }, // GeoNames 323779
  { ad: "Iğdır", enlem: 39.9237, boylam: 44.045 }, // GeoNames 311665
  { ad: "Isparta", enlem: 37.7644, boylam: 30.5522 }, // GeoNames 311073
  { ad: "İstanbul", enlem: 41.0138, boylam: 28.9497 }, // GeoNames 745044
  { ad: "İzmir", enlem: 38.4127, boylam: 27.1384 }, // GeoNames 311046
  { ad: "Kahramanmaraş", enlem: 37.5847, boylam: 36.9264 }, // GeoNames 310859
  { ad: "Karabük", enlem: 41.2049, boylam: 32.6277 }, // GeoNames 744562
  { ad: "Karaman", enlem: 37.1811, boylam: 33.215 }, // GeoNames 309527
  { ad: "Kars", enlem: 40.5983, boylam: 43.0855 }, // GeoNames 743952
  { ad: "Kastamonu", enlem: 41.3781, boylam: 33.7753 }, // GeoNames 743882
  { ad: "Kayseri", enlem: 38.7322, boylam: 35.4853 }, // GeoNames 308464
  { ad: "Kırıkkale", enlem: 39.8453, boylam: 33.5064 }, // GeoNames 307654
  { ad: "Kırklareli", enlem: 41.7351, boylam: 27.2252 }, // GeoNames 743166
  { ad: "Kırşehir", enlem: 39.1458, boylam: 34.1639 }, // GeoNames 307515
  { ad: "Kilis", enlem: 36.7161, boylam: 37.115 }, // GeoNames 307864
  { ad: "Kocaeli", enlem: 40.765, boylam: 29.9293 }, // GeoNames 745028
  { ad: "Konya", enlem: 37.8713, boylam: 32.4846 }, // GeoNames 306571
  { ad: "Kütahya", enlem: 39.4242, boylam: 29.9833 }, // GeoNames 305268
  { ad: "Malatya", enlem: 38.3502, boylam: 38.3167 }, // GeoNames 304922
  { ad: "Manisa", enlem: 38.612, boylam: 27.4265 }, // GeoNames 304827
  { ad: "Mardin", enlem: 37.3131, boylam: 40.7436 }, // GeoNames 304797
  { ad: "Mersin", enlem: 36.812, boylam: 34.6389 }, // GeoNames 304531
  { ad: "Muğla", enlem: 37.2181, boylam: 28.3665 }, // GeoNames 304184
  { ad: "Muş", enlem: 38.7316, boylam: 41.4848 }, // GeoNames 304081
  { ad: "Nevşehir", enlem: 38.625, boylam: 34.7122 }, // GeoNames 303831
  { ad: "Niğde", enlem: 37.9658, boylam: 34.6793 }, // GeoNames 303827
  { ad: "Ordu", enlem: 40.9778, boylam: 37.8905 }, // GeoNames 741100
  { ad: "Osmaniye", enlem: 37.0742, boylam: 36.2478 }, // GeoNames 303195
  { ad: "Rize", enlem: 41.0208, boylam: 40.5219 }, // GeoNames 740483
  { ad: "Sakarya", enlem: 40.7806, boylam: 30.4033 }, // GeoNames 752850
  { ad: "Samsun", enlem: 41.2798, boylam: 36.3361 }, // GeoNames 740264
  { ad: "Siirt", enlem: 37.9293, boylam: 41.9413 }, // GeoNames 300822
  { ad: "Sinop", enlem: 42.0268, boylam: 35.1625 }, // GeoNames 739600
  { ad: "Sivas", enlem: 39.7483, boylam: 37.0161 }, // GeoNames 300619
  { ad: "Şanlıurfa", enlem: 37.1671, boylam: 38.7939 }, // GeoNames 298333
  { ad: "Şırnak", enlem: 37.5139, boylam: 42.4543 }, // GeoNames 300640
  { ad: "Tekirdağ", enlem: 40.9781, boylam: 27.511 }, // GeoNames 738927
  { ad: "Tokat", enlem: 40.3139, boylam: 36.5544 }, // GeoNames 738743
  { ad: "Trabzon", enlem: 41.005, boylam: 39.7269 }, // GeoNames 738648
  { ad: "Tunceli", enlem: 39.0992, boylam: 39.5435 }, // GeoNames 298846
  { ad: "Uşak", enlem: 38.6735, boylam: 29.4058 }, // GeoNames 298299
  { ad: "Van", enlem: 38.4946, boylam: 43.3832 }, // GeoNames 298117
  { ad: "Yalova", enlem: 40.655, boylam: 29.2769 }, // GeoNames 738025
  { ad: "Yozgat", enlem: 39.82, boylam: 34.8044 }, // GeoNames 296562
  { ad: "Zonguldak", enlem: 41.4514, boylam: 31.7931 }, // GeoNames 737022
];
