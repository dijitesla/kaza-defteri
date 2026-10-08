// 81 ilin 973 ilçesi ve ilçe merkezlerinin koordinatları. Otomatik üretildi, elle düzenleme.
//
// İlçe adları: turkey-neighbourhoods@4.0.3 npm paketi (MIT lisansı, PTT adres verisinden),
// https://github.com/muratgozel/turkey-neighbourhoods
// Koordinatlar: GeoNames "cities500" (https://www.geonames.org), CC BY 4.0; veriye
// cities-500-structured@1.0.1 npm paketi üzerinden erişildi. İlçe adıyla (alternatif yazımlar dahil)
// eşleşen ve il merkezine 220 km'den yakın yerleşim seçildi (öncelik: ilçe merkezi PPLA2).
// "Merkez" ilçeler il merkezinin koordinatını kullanır.
// 918 ilçenin koordinatı bulundu; 55 ilçe GeoNames'te bulunamadı ve il merkezinin
// koordinatı kullanıldı.
// Bu paketler uygulamaya dahil değildir.

export interface Ilce {
  ad: string;
  enlem: number;
  boylam: number;
}

export const ILCELER: Record<string, readonly Ilce[]> = {
  "Adana": [
    { ad: "Aladağ", enlem: 37.5485, boylam: 35.396 }, // GeoNames 308998
    { ad: "Ceyhan", enlem: 37.0247, boylam: 35.8175 }, // GeoNames 318675
    { ad: "Çukurova", enlem: 36.9862, boylam: 35.3253 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Feke", enlem: 37.8145, boylam: 35.9123 }, // GeoNames 315000
    { ad: "İmamoğlu", enlem: 37.2651, boylam: 35.6572 }, // GeoNames 311453
    { ad: "Karaisalı", enlem: 37.2567, boylam: 35.0589 }, // GeoNames 309758
    { ad: "Karataş", enlem: 36.582, boylam: 35.3701 }, // GeoNames 309312
    { ad: "Kozan", enlem: 37.4552, boylam: 35.8157 }, // GeoNames 306112
    { ad: "Pozantı", enlem: 37.4278, boylam: 34.8717 }, // GeoNames 302482
    { ad: "Saimbeyli", enlem: 37.9863, boylam: 36.0906 }, // GeoNames 302150
    { ad: "Sarıçam", enlem: 37.1517, boylam: 35.5077 }, // GeoNames 301770
    { ad: "Seyhan", enlem: 36.9875, boylam: 35.3059 }, // GeoNames 300997
    { ad: "Tufanbeyli", enlem: 38.2633, boylam: 36.2206 }, // GeoNames 298882
    { ad: "Yumurtalık", enlem: 36.7686, boylam: 35.7894 }, // GeoNames 296137
    { ad: "Yüreğir", enlem: 36.9744, boylam: 35.3592 }, // GeoNames 323716
  ],
  "Adıyaman": [
    { ad: "Besni", enlem: 37.6928, boylam: 37.8611 }, // GeoNames 321337
    { ad: "Çelikhan", enlem: 38.0256, boylam: 38.2366 }, // GeoNames 318904
    { ad: "Gerger", enlem: 38.0281, boylam: 39.0342 }, // GeoNames 324126
    { ad: "Gölbaşı", enlem: 37.7836, boylam: 37.6367 }, // GeoNames 314136
    { ad: "Kahta", enlem: 37.7855, boylam: 38.6237 }, // GeoNames 310855
    { ad: "Merkez", enlem: 37.7644, boylam: 38.2763 }, // il merkezi (Merkez ilçe)
    { ad: "Samsat", enlem: 37.5819, boylam: 38.4742 }, // GeoNames 301943
    { ad: "Sincik", enlem: 38.0365, boylam: 38.6126 }, // GeoNames 300743
    { ad: "Tut", enlem: 37.7953, boylam: 37.9161 }, // GeoNames 298728
  ],
  "Afyonkarahisar": [
    { ad: "Başmakçı", enlem: 37.8972, boylam: 30.0117 }, // GeoNames 321887
    { ad: "Bayat", enlem: 38.9831, boylam: 30.9247 }, // GeoNames 321814
    { ad: "Bolvadin", enlem: 38.7111, boylam: 31.0486 }, // GeoNames 320879
    { ad: "Çay", enlem: 38.5917, boylam: 31.0286 }, // GeoNames 319104
    { ad: "Çobanlar", enlem: 38.7014, boylam: 30.7828 }, // GeoNames 318227
    { ad: "Dazkırı", enlem: 37.9186, boylam: 29.8606 }, // GeoNames 317496
    { ad: "Dinar", enlem: 38.065, boylam: 30.1656 }, // GeoNames 316634
    { ad: "Emirdağ", enlem: 39.0197, boylam: 31.15 }, // GeoNames 315621
    { ad: "Evciler", enlem: 38.0414, boylam: 29.8867 }, // GeoNames 315132
    { ad: "Hocalar", enlem: 38.5782, boylam: 29.9677 }, // GeoNames 311994
    { ad: "İhsaniye", enlem: 39.0292, boylam: 30.4164 }, // GeoNames 311645
    { ad: "İscehisar", enlem: 38.8619, boylam: 30.7503 }, // GeoNames 311193
    { ad: "Kızılören", enlem: 38.2581, boylam: 30.1517 }, // GeoNames 307129
    { ad: "Merkez", enlem: 38.7567, boylam: 30.5433 }, // il merkezi (Merkez ilçe)
    { ad: "Sandıklı", enlem: 38.4647, boylam: 30.2695 }, // GeoNames 301911
    { ad: "Sinanpaşa", enlem: 38.7444, boylam: 30.2428 }, // GeoNames 300754
    { ad: "Sultandağı", enlem: 38.5311, boylam: 31.2281 }, // GeoNames 300201
    { ad: "Şuhut", enlem: 38.5311, boylam: 30.5458 }, // GeoNames 300273
  ],
  "Ağrı": [
    { ad: "Diyadin", enlem: 39.5406, boylam: 43.6713 }, // GeoNames 316542
    { ad: "Doğubayazıt", enlem: 39.5469, boylam: 44.0842 }, // GeoNames 316411
    { ad: "Eleşkirt", enlem: 39.798, boylam: 42.6757 }, // GeoNames 315758
    { ad: "Hamur", enlem: 39.6056, boylam: 42.985 }, // GeoNames 312731
    { ad: "Merkez", enlem: 39.7194, boylam: 43.0514 }, // il merkezi (Merkez ilçe)
    { ad: "Patnos", enlem: 39.2249, boylam: 42.8569 }, // GeoNames 302819
    { ad: "Taşlıçay", enlem: 39.6297, boylam: 43.3688 }, // GeoNames 299701
    { ad: "Tutak", enlem: 39.5385, boylam: 42.7659 }, // GeoNames 298727
  ],
  "Aksaray": [
    { ad: "Ağaçören", enlem: 38.8748, boylam: 33.9167 }, // GeoNames 325269
    { ad: "Eskil", enlem: 38.4017, boylam: 33.4131 }, // GeoNames 315218
    { ad: "Gülağaç", enlem: 38.3958, boylam: 34.3458 }, // GeoNames 325278
    { ad: "Güzelyurt", enlem: 38.2772, boylam: 34.3719 }, // GeoNames 313199
    { ad: "Merkez", enlem: 38.3725, boylam: 34.0254 }, // il merkezi (Merkez ilçe)
    { ad: "Ortaköy", enlem: 38.7373, boylam: 34.0387 }, // GeoNames 303290
    { ad: "Sarıyahşi", enlem: 38.9835, boylam: 33.8414 }, // GeoNames 301566
    { ad: "Sultanhanı", enlem: 38.2471, boylam: 33.5496 }, // GeoNames 300197
  ],
  "Amasya": [
    { ad: "Göynücek", enlem: 40.3992, boylam: 35.525 }, // GeoNames 746547
    { ad: "Gümüşhacıköy", enlem: 40.8731, boylam: 35.2147 }, // GeoNames 746426
    { ad: "Hamamözü", enlem: 40.7848, boylam: 35.0258 }, // GeoNames 745955
    { ad: "Merkez", enlem: 40.6533, boylam: 35.8331 }, // il merkezi (Merkez ilçe)
    { ad: "Merzifon", enlem: 40.8733, boylam: 35.4631 }, // GeoNames 741609
    { ad: "Suluova", enlem: 40.8313, boylam: 35.6479 }, // GeoNames 739251
    { ad: "Taşova", enlem: 40.7597, boylam: 36.3225 }, // GeoNames 739015
  ],
  "Ankara": [
    { ad: "Akyurt", enlem: 40.1351, boylam: 33.0861 }, // GeoNames 752284
    { ad: "Altındağ", enlem: 39.9199, boylam: 32.8543 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ayaş", enlem: 40.0193, boylam: 32.3322 }, // GeoNames 751511
    { ad: "Bala", enlem: 39.5542, boylam: 33.1234 }, // GeoNames 322240
    { ad: "Beypazarı", enlem: 40.1675, boylam: 31.9211 }, // GeoNames 750637
    { ad: "Çamlıdere", enlem: 40.4896, boylam: 32.475 }, // GeoNames 749843
    { ad: "Çankaya", enlem: 39.9179, boylam: 32.8627 }, // GeoNames 6955677
    { ad: "Çubuk", enlem: 40.2386, boylam: 33.0322 }, // GeoNames 748870
    { ad: "Elmadağ", enlem: 39.9208, boylam: 33.2308 }, // GeoNames 315720
    { ad: "Etimesgut", enlem: 39.9533, boylam: 32.6328 }, // GeoNames 315155
    { ad: "Evren", enlem: 39.024, boylam: 33.8063 }, // GeoNames 318496
    { ad: "Gölbaşı", enlem: 39.7904, boylam: 32.809 }, // GeoNames 314133
    { ad: "Güdül", enlem: 40.2105, boylam: 32.2455 }, // GeoNames 746497
    { ad: "Haymana", enlem: 39.4321, boylam: 32.4973 }, // GeoNames 312289
    { ad: "Kahramankazan", enlem: 39.9199, boylam: 32.8543 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kalecik", enlem: 40.0972, boylam: 33.4083 }, // GeoNames 744814
    { ad: "Keçiören", enlem: 39.9199, boylam: 32.8543 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kızılcahamam", enlem: 40.4697, boylam: 32.6506 }, // GeoNames 743051
    { ad: "Mamak", enlem: 39.9404, boylam: 32.9101 }, // GeoNames 304885
    { ad: "Nallıhan", enlem: 40.1859, boylam: 31.3518 }, // GeoNames 741347
    { ad: "Polatlı", enlem: 39.5772, boylam: 32.1413 }, // GeoNames 302525
    { ad: "Pursaklar", enlem: 40.032, boylam: 32.8953 }, // GeoNames 740511
    { ad: "Sincan", enlem: 39.9199, boylam: 32.8543 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Şereflikoçhisar", enlem: 38.9393, boylam: 33.5386 }, // GeoNames 301116
    { ad: "Yenimahalle", enlem: 39.9199, boylam: 32.8543 }, // il merkezi (GeoNames'te bulunamadı)
  ],
  "Antalya": [
    { ad: "Akseki", enlem: 37.0486, boylam: 31.79 }, // GeoNames 324486
    { ad: "Aksu", enlem: 37.7989, boylam: 31.0711 }, // GeoNames 324470
    { ad: "Alanya", enlem: 36.5438, boylam: 31.9998 }, // GeoNames 324190
    { ad: "Demre", enlem: 36.2444, boylam: 29.985 }, // GeoNames 295781
    { ad: "Döşemealtı", enlem: 37.0233, boylam: 30.6025 }, // GeoNames 316262
    { ad: "Elmalı", enlem: 36.7358, boylam: 29.9178 }, // GeoNames 315697
    { ad: "Finike", enlem: 36.295, boylam: 30.1406 }, // GeoNames 314923
    { ad: "Gazipaşa", enlem: 36.2694, boylam: 32.3179 }, // GeoNames 314812
    { ad: "Gündoğmuş", enlem: 36.8134, boylam: 31.9997 }, // GeoNames 313526
    { ad: "İbradı", enlem: 37.0969, boylam: 31.5992 }, // GeoNames 322817
    { ad: "Kaş", enlem: 36.2018, boylam: 29.6377 }, // GeoNames 308948
    { ad: "Kemer", enlem: 37.3522, boylam: 30.0631 }, // GeoNames 308217
    { ad: "Kepez", enlem: 36.9158, boylam: 30.7078 }, // GeoNames 10377367
    { ad: "Konyaaltı", enlem: 36.8664, boylam: 30.6303 }, // GeoNames 306570
    { ad: "Korkuteli", enlem: 37.065, boylam: 30.1957 }, // GeoNames 306474
    { ad: "Kumluca", enlem: 36.3703, boylam: 30.2869 }, // GeoNames 305681
    { ad: "Manavgat", enlem: 36.7867, boylam: 31.4431 }, // GeoNames 304854
    { ad: "Muratpaşa", enlem: 36.8916, boylam: 30.765 }, // GeoNames 8074174
    { ad: "Serik", enlem: 36.9169, boylam: 31.0989 }, // GeoNames 301101
  ],
  "Ardahan": [
    { ad: "Çıldır", enlem: 41.1253, boylam: 43.1365 }, // GeoNames 749109
    { ad: "Damal", enlem: 41.3415, boylam: 42.8368 }, // GeoNames 748688
    { ad: "Göle", enlem: 40.7875, boylam: 42.606 }, // GeoNames 746643
    { ad: "Hanak", enlem: 41.2334, boylam: 42.8404 }, // GeoNames 745903
    { ad: "Merkez", enlem: 41.1087, boylam: 42.7022 }, // il merkezi (Merkez ilçe)
    { ad: "Posof", enlem: 41.5111, boylam: 42.7292 }, // GeoNames 740531
  ],
  "Artvin": [
    { ad: "Ardanuç", enlem: 41.1195, boylam: 42.0688 }, // GeoNames 751950
    { ad: "Arhavi", enlem: 41.3512, boylam: 41.3046 }, // GeoNames 751931
    { ad: "Borçka", enlem: 41.3579, boylam: 41.6658 }, // GeoNames 750496
    { ad: "Hopa", enlem: 41.3905, boylam: 41.4197 }, // GeoNames 745530
    { ad: "Kemalpaşa", enlem: 41.4834, boylam: 41.5275 }, // GeoNames 743510
    { ad: "Merkez", enlem: 41.1816, boylam: 41.8217 }, // il merkezi (Merkez ilçe)
    { ad: "Murgul", enlem: 41.2805, boylam: 41.5644 }, // GeoNames 746712
    { ad: "Şavşat", enlem: 41.2534, boylam: 42.3553 }, // GeoNames 739950
    { ad: "Yusufeli", enlem: 40.8204, boylam: 41.5374 }, // GeoNames 737140
  ],
  "Aydın": [
    { ad: "Bozdoğan", enlem: 37.6713, boylam: 28.3139 }, // GeoNames 320647
    { ad: "Buharkent", enlem: 37.964, boylam: 28.7427 }, // GeoNames 320374
    { ad: "Çine", enlem: 37.6127, boylam: 28.0591 }, // GeoNames 318372
    { ad: "Didim", enlem: 37.385, boylam: 27.2564 }, // GeoNames 297090
    { ad: "Efeler", enlem: 37.845, boylam: 27.8396 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Germencik", enlem: 37.8706, boylam: 27.6028 }, // GeoNames 314573
    { ad: "İncirliova", enlem: 37.8522, boylam: 27.7236 }, // GeoNames 311314
    { ad: "Karacasu", enlem: 37.7282, boylam: 28.6057 }, // GeoNames 310044
    { ad: "Karpuzlu", enlem: 37.5586, boylam: 27.8353 }, // GeoNames 309008
    { ad: "Koçarlı", enlem: 37.7611, boylam: 27.7058 }, // GeoNames 306908
    { ad: "Köşk", enlem: 37.8533, boylam: 28.0517 }, // GeoNames 306285
    { ad: "Kuşadası", enlem: 37.8601, boylam: 27.2571 }, // GeoNames 305359
    { ad: "Kuyucak", enlem: 37.9133, boylam: 28.4592 }, // GeoNames 305210
    { ad: "Nazilli", enlem: 37.9163, boylam: 28.3223 }, // GeoNames 303873
    { ad: "Söke", enlem: 37.7482, boylam: 27.4061 }, // GeoNames 300399
    { ad: "Sultanhisar", enlem: 37.8899, boylam: 28.1544 }, // GeoNames 300195
    { ad: "Yenipazar", enlem: 37.8233, boylam: 28.1957 }, // GeoNames 296950
  ],
  "Balıkesir": [
    { ad: "Altıeylül", enlem: 39.6492, boylam: 27.8861 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ayvalık", enlem: 39.3193, boylam: 26.6934 }, // GeoNames 322673
    { ad: "Balya", enlem: 39.7486, boylam: 27.5789 }, // GeoNames 322060
    { ad: "Bandırma", enlem: 40.3522, boylam: 27.9767 }, // GeoNames 751077
    { ad: "Bigadiç", enlem: 39.3925, boylam: 28.1311 }, // GeoNames 321136
    { ad: "Burhaniye", enlem: 39.5004, boylam: 26.9727 }, // GeoNames 320369
    { ad: "Dursunbey", enlem: 39.586, boylam: 28.6257 }, // GeoNames 316102
    { ad: "Edremit", enlem: 39.5961, boylam: 27.0244 }, // GeoNames 315985
    { ad: "Erdek", enlem: 40.3996, boylam: 27.7935 }, // GeoNames 747482
    { ad: "Gömeç", enlem: 39.3902, boylam: 26.8413 }, // GeoNames 313995
    { ad: "Gönen", enlem: 40.1049, boylam: 27.654 }, // GeoNames 746574
    { ad: "Havran", enlem: 39.5583, boylam: 27.0983 }, // GeoNames 312355
    { ad: "İvrindi", enlem: 39.5839, boylam: 27.4864 }, // GeoNames 311054
    { ad: "Karesi", enlem: 39.6492, boylam: 27.8861 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kepsut", enlem: 39.6889, boylam: 28.1522 }, // GeoNames 308133
    { ad: "Manyas", enlem: 40.0464, boylam: 27.97 }, // GeoNames 741737
    { ad: "Marmara", enlem: 38.7139, boylam: 27.9142 }, // GeoNames 314038
    { ad: "Savaştepe", enlem: 39.3832, boylam: 27.6561 }, // GeoNames 301453
    { ad: "Sındırgı", enlem: 39.2413, boylam: 28.1784 }, // GeoNames 300732
    { ad: "Susurluk", enlem: 39.9136, boylam: 28.1578 }, // GeoNames 300058
  ],
  "Bartın": [
    { ad: "Amasra", enlem: 41.7463, boylam: 32.3863 }, // GeoNames 752016
    { ad: "Kurucaşile", enlem: 41.8378, boylam: 32.7162 }, // GeoNames 742095
    { ad: "Merkez", enlem: 41.6358, boylam: 32.3375 }, // il merkezi (Merkez ilçe)
    { ad: "Ulus", enlem: 41.5842, boylam: 32.6414 }, // GeoNames 738390
  ],
  "Batman": [
    { ad: "Beşiri", enlem: 37.9157, boylam: 41.2865 }, // GeoNames 321360
    { ad: "Gercüş", enlem: 37.5625, boylam: 41.3775 }, // GeoNames 314608
    { ad: "Hasankeyf", enlem: 37.7061, boylam: 41.4048 }, // GeoNames 312479
    { ad: "Kozluk", enlem: 38.1912, boylam: 41.4778 }, // GeoNames 306041
    { ad: "Merkez", enlem: 37.8874, boylam: 41.1322 }, // il merkezi (Merkez ilçe)
    { ad: "Sason", enlem: 38.3277, boylam: 41.4138 }, // GeoNames 301483
  ],
  "Bayburt": [
    { ad: "Aydıntepe", enlem: 40.3832, boylam: 40.1427 }, // GeoNames 751475
    { ad: "Demirözü", enlem: 40.1602, boylam: 39.8924 }, // GeoNames 748383
    { ad: "Merkez", enlem: 40.2563, boylam: 40.2229 }, // il merkezi (Merkez ilçe)
  ],
  "Bilecik": [
    { ad: "Bozüyük", enlem: 39.9078, boylam: 30.0367 }, // GeoNames 320557
    { ad: "Gölpazarı", enlem: 40.2847, boylam: 30.3172 }, // GeoNames 746602
    { ad: "İnhisar", enlem: 40.0493, boylam: 30.3852 }, // GeoNames 745164
    { ad: "Merkez", enlem: 40.1419, boylam: 29.9793 }, // il merkezi (Merkez ilçe)
    { ad: "Osmaneli", enlem: 40.3572, boylam: 30.0142 }, // GeoNames 740881
    { ad: "Pazaryeri", enlem: 39.9939, boylam: 29.9042 }, // GeoNames 302781
    { ad: "Söğüt", enlem: 40.0143, boylam: 30.1849 }, // GeoNames 300468
    { ad: "Yenipazar", enlem: 40.1783, boylam: 30.52 }, // GeoNames 737614
  ],
  "Bingöl": [
    { ad: "Adaklı", enlem: 39.2262, boylam: 40.4828 }, // GeoNames 325380
    { ad: "Genç", enlem: 38.7477, boylam: 40.5534 }, // GeoNames 314648
    { ad: "Karlıova", enlem: 39.2904, boylam: 41.0059 }, // GeoNames 309032
    { ad: "Kiğı", enlem: 39.3136, boylam: 40.3503 }, // GeoNames 307948
    { ad: "Merkez", enlem: 38.8847, boylam: 40.4939 }, // il merkezi (Merkez ilçe)
    { ad: "Solhan", enlem: 38.9652, boylam: 41.0544 }, // GeoNames 300377
    { ad: "Yayladere", enlem: 39.2261, boylam: 40.0695 }, // GeoNames 297461
    { ad: "Yedisu", enlem: 39.4328, boylam: 40.5337 }, // GeoNames 297286
  ],
  "Bitlis": [
    { ad: "Adilcevaz", enlem: 38.7991, boylam: 42.7316 }, // GeoNames 325336
    { ad: "Ahlat", enlem: 38.7489, boylam: 42.4801 }, // GeoNames 325103
    { ad: "Güroymak", enlem: 38.5758, boylam: 42.0156 }, // GeoNames 313331
    { ad: "Hizan", enlem: 38.225, boylam: 42.4183 }, // GeoNames 312024
    { ad: "Merkez", enlem: 38.4012, boylam: 42.1078 }, // il merkezi (Merkez ilçe)
    { ad: "Mutki", enlem: 38.4062, boylam: 41.9202 }, // GeoNames 304009
    { ad: "Tatvan", enlem: 38.4922, boylam: 42.2827 }, // GeoNames 299582
  ],
  "Bolu": [
    { ad: "Dörtdivan", enlem: 40.7205, boylam: 32.0631 }, // GeoNames 747899
    { ad: "Gerede", enlem: 40.8008, boylam: 32.1969 }, // GeoNames 746940
    { ad: "Göynük", enlem: 40.4003, boylam: 30.7883 }, // GeoNames 746546
    { ad: "Kıbrıscık", enlem: 40.4078, boylam: 31.8519 }, // GeoNames 743382
    { ad: "Mengen", enlem: 40.9388, boylam: 32.0764 }, // GeoNames 741644
    { ad: "Merkez", enlem: 40.7358, boylam: 31.6061 }, // il merkezi (Merkez ilçe)
    { ad: "Mudurnu", enlem: 40.473, boylam: 31.2076 }, // GeoNames 741484
    { ad: "Seben", enlem: 40.4113, boylam: 31.5736 }, // GeoNames 739917
    { ad: "Yeniçağa", enlem: 40.7711, boylam: 32.0337 }, // GeoNames 737756
  ],
  "Burdur": [
    { ad: "Ağlasun", enlem: 37.6494, boylam: 30.5342 }, // GeoNames 325171
    { ad: "Altınyayla", enlem: 36.9972, boylam: 29.5458 }, // GeoNames 323887
    { ad: "Bucak", enlem: 37.4592, boylam: 30.595 }, // GeoNames 320533
    { ad: "Çavdır", enlem: 37.155, boylam: 29.6939 }, // GeoNames 319163
    { ad: "Çeltikçi", enlem: 37.5295, boylam: 30.4803 }, // GeoNames 318879
    { ad: "Gölhisar", enlem: 37.1459, boylam: 29.5088 }, // GeoNames 314072
    { ad: "Karamanlı", enlem: 37.373, boylam: 29.8231 }, // GeoNames 309512
    { ad: "Kemer", enlem: 37.3522, boylam: 30.0631 }, // GeoNames 308217
    { ad: "Merkez", enlem: 37.7203, boylam: 30.2908 }, // il merkezi (Merkez ilçe)
    { ad: "Tefenni", enlem: 37.3097, boylam: 29.7754 }, // GeoNames 299499
    { ad: "Yeşilova", enlem: 37.5081, boylam: 29.7547 }, // GeoNames 296823
  ],
  "Bursa": [
    { ad: "Büyükorhan", enlem: 39.771, boylam: 28.8861 }, // GeoNames 8543049
    { ad: "Gemlik", enlem: 40.4309, boylam: 29.1597 }, // GeoNames 746958
    { ad: "Gürsu", enlem: 40.2188, boylam: 29.1949 }, // GeoNames 746232
    { ad: "Harmancık", enlem: 39.6761, boylam: 29.1553 }, // GeoNames 312558
    { ad: "İnegöl", enlem: 40.0781, boylam: 29.5133 }, // GeoNames 745169
    { ad: "İznik", enlem: 40.4286, boylam: 29.7211 }, // GeoNames 745026
    { ad: "Karacabey", enlem: 40.2132, boylam: 28.3612 }, // GeoNames 744537
    { ad: "Keles", enlem: 39.9136, boylam: 29.2294 }, // GeoNames 308261
    { ad: "Kestel", enlem: 40.1983, boylam: 29.2124 }, // GeoNames 743404
    { ad: "Mudanya", enlem: 40.3753, boylam: 28.8822 }, // GeoNames 741487
    { ad: "Mustafakemalpaşa", enlem: 40.0382, boylam: 28.4087 }, // GeoNames 741385
    { ad: "Nilüfer", enlem: 40.214, boylam: 28.9157 }, // GeoNames 10346824
    { ad: "Orhaneli", enlem: 39.9033, boylam: 28.9906 }, // GeoNames 303409
    { ad: "Orhangazi", enlem: 40.4892, boylam: 29.3089 }, // GeoNames 741045
    { ad: "Osmangazi", enlem: 40.1967, boylam: 29.0593 }, // GeoNames 8542938
    { ad: "Yenişehir", enlem: 40.2644, boylam: 29.6531 }, // GeoNames 737611
    { ad: "Yıldırım", enlem: 40.1885, boylam: 29.1097 }, // GeoNames 8521963
  ],
  "Çanakkale": [
    { ad: "Ayvacık", enlem: 39.6011, boylam: 26.4047 }, // GeoNames 322692
    { ad: "Bayramiç", enlem: 39.8086, boylam: 26.6098 }, // GeoNames 321733
    { ad: "Biga", enlem: 40.2281, boylam: 27.2422 }, // GeoNames 750605
    { ad: "Bozcaada", enlem: 39.835, boylam: 26.0697 }, // GeoNames 320700
    { ad: "Çan", enlem: 40.0333, boylam: 27.0524 }, // GeoNames 749795
    { ad: "Eceabat", enlem: 40.1842, boylam: 26.3574 }, // GeoNames 747728
    { ad: "Ezine", enlem: 39.7856, boylam: 26.3408 }, // GeoNames 315061
    { ad: "Gelibolu", enlem: 40.4103, boylam: 26.6708 }, // GeoNames 746983
    { ad: "Gökçeada", enlem: 40.2011, boylam: 25.909 }, // GeoNames 745260
    { ad: "Lapseki", enlem: 40.3442, boylam: 26.6856 }, // GeoNames 741878
    { ad: "Merkez", enlem: 40.1555, boylam: 26.4127 }, // il merkezi (Merkez ilçe)
    { ad: "Yenice", enlem: 39.9308, boylam: 27.2581 }, // GeoNames 297144
  ],
  "Çankırı": [
    { ad: "Atkaracalar", enlem: 40.8159, boylam: 33.0756 }, // GeoNames 751575
    { ad: "Bayramören", enlem: 40.9433, boylam: 33.203 }, // GeoNames 750874
    { ad: "Çerkeş", enlem: 40.8116, boylam: 32.8936 }, // GeoNames 749279
    { ad: "Eldivan", enlem: 40.5297, boylam: 33.499 }, // GeoNames 747618
    { ad: "Ilgaz", enlem: 40.9251, boylam: 33.6259 }, // GeoNames 745344
    { ad: "Kızılırmak", enlem: 40.3456, boylam: 33.9864 }, // GeoNames 742987
    { ad: "Korgun", enlem: 40.7348, boylam: 33.5184 }, // GeoNames 742657
    { ad: "Kurşunlu", enlem: 40.841, boylam: 33.2603 }, // GeoNames 742164
    { ad: "Merkez", enlem: 40.5999, boylam: 33.6153 }, // il merkezi (Merkez ilçe)
    { ad: "Orta", enlem: 40.6242, boylam: 33.1093 }, // GeoNames 741002
    { ad: "Şabanözü", enlem: 40.4825, boylam: 33.2835 }, // GeoNames 740462
    { ad: "Yapraklı", enlem: 40.7578, boylam: 33.7782 }, // GeoNames 737980
  ],
  "Çorum": [
    { ad: "Alaca", enlem: 40.1683, boylam: 34.8425 }, // GeoNames 752278
    { ad: "Bayat", enlem: 40.6458, boylam: 34.2614 }, // GeoNames 750948
    { ad: "Boğazkale", enlem: 40.0219, boylam: 34.6095 }, // GeoNames 750539
    { ad: "Dodurga", enlem: 40.8549, boylam: 34.807 }, // GeoNames 748048
    { ad: "İskilip", enlem: 40.7353, boylam: 34.4739 }, // GeoNames 745076
    { ad: "Kargı", enlem: 41.1337, boylam: 34.4874 }, // GeoNames 744006
    { ad: "Laçin", enlem: 40.7749, boylam: 34.8807 }, // GeoNames 750165
    { ad: "Mecitözü", enlem: 40.52, boylam: 35.2953 }, // GeoNames 741692
    { ad: "Merkez", enlem: 40.5489, boylam: 34.9533 }, // il merkezi (Merkez ilçe)
    { ad: "Oğuzlar", enlem: 40.7535, boylam: 34.7028 }, // GeoNames 744138
    { ad: "Ortaköy", enlem: 40.2735, boylam: 35.2518 }, // GeoNames 740964
    { ad: "Osmancık", enlem: 40.9782, boylam: 34.8047 }, // GeoNames 740883
    { ad: "Sungurlu", enlem: 40.1675, boylam: 34.3739 }, // GeoNames 739236
    { ad: "Uğurludağ", enlem: 40.4463, boylam: 34.4526 }, // GeoNames 738468
  ],
  "Denizli": [
    { ad: "Acıpayam", enlem: 37.4239, boylam: 29.3494 }, // GeoNames 325426
    { ad: "Babadağ", enlem: 37.8076, boylam: 28.8566 }, // GeoNames 322618
    { ad: "Baklan", enlem: 37.9769, boylam: 29.6086 }, // GeoNames 322250
    { ad: "Bekilli", enlem: 38.2311, boylam: 29.4197 }, // GeoNames 321637
    { ad: "Beyağaç", enlem: 37.2353, boylam: 28.8961 }, // GeoNames 321308
    { ad: "Bozkurt", enlem: 37.8242, boylam: 29.6097 }, // GeoNames 320606
    { ad: "Buldan", enlem: 38.045, boylam: 28.8306 }, // GeoNames 320437
    { ad: "Çal", enlem: 38.0836, boylam: 29.3989 }, // GeoNames 319857
    { ad: "Çameli", enlem: 37.0761, boylam: 29.3447 }, // GeoNames 319689
    { ad: "Çardak", enlem: 37.8269, boylam: 29.6683 }, // GeoNames 319415
    { ad: "Çivril", enlem: 38.3014, boylam: 29.7386 }, // GeoNames 318264
    { ad: "Güney", enlem: 38.1544, boylam: 29.0678 }, // GeoNames 313481
    { ad: "Honaz", enlem: 37.7573, boylam: 29.27 }, // GeoNames 311962
    { ad: "Kale", enlem: 37.4392, boylam: 28.8453 }, // GeoNames 310789
    { ad: "Merkezefendi", enlem: 37.8054, boylam: 29.0424 }, // GeoNames 11238838
    { ad: "Pamukkale", enlem: 37.7912, boylam: 29.1014 }, // GeoNames 10345315
    { ad: "Sarayköy", enlem: 37.9245, boylam: 28.9252 }, // GeoNames 301827
    { ad: "Serinhisar", enlem: 37.581, boylam: 29.2664 }, // GeoNames 307211
    { ad: "Tavas", enlem: 37.5735, boylam: 29.0706 }, // GeoNames 299575
  ],
  "Diyarbakır": [
    { ad: "Bağlar", enlem: 37.9138, boylam: 40.2058 }, // GeoNames 10048770
    { ad: "Bismil", enlem: 37.8451, boylam: 40.6593 }, // GeoNames 321031
    { ad: "Çermik", enlem: 38.1354, boylam: 39.445 }, // GeoNames 318766
    { ad: "Çınar", enlem: 37.7223, boylam: 40.407 }, // GeoNames 318404
    { ad: "Çüngüş", enlem: 38.208, boylam: 39.2855 }, // GeoNames 317837
    { ad: "Dicle", enlem: 38.3657, boylam: 40.0645 }, // GeoNames 316746
    { ad: "Eğil", enlem: 38.2575, boylam: 40.0744 }, // GeoNames 315953
    { ad: "Ergani", enlem: 38.269, boylam: 39.7545 }, // GeoNames 315468
    { ad: "Hani", enlem: 38.4074, boylam: 40.3858 }, // GeoNames 312663
    { ad: "Hazro", enlem: 38.249, boylam: 40.7713 }, // GeoNames 312253
    { ad: "Kayapınar", enlem: 37.9373, boylam: 40.1776 }, // GeoNames 308569
    { ad: "Kocaköy", enlem: 38.2889, boylam: 40.4979 }, // GeoNames 306935
    { ad: "Kulp", enlem: 38.4975, boylam: 41.0067 }, // GeoNames 305750
    { ad: "Lice", enlem: 38.4582, boylam: 40.6389 }, // GeoNames 305089
    { ad: "Silvan", enlem: 38.1371, boylam: 41.0082 }, // GeoNames 300796
    { ad: "Sur", enlem: 37.9135, boylam: 40.2286 }, // GeoNames 10048774
    { ad: "Yenişehir", enlem: 37.9415, boylam: 40.138 }, // GeoNames 10048815
  ],
  "Düzce": [
    { ad: "Akçakoca", enlem: 41.0866, boylam: 31.1162 }, // GeoNames 752584
    { ad: "Cumayeri", enlem: 40.8739, boylam: 30.9509 }, // GeoNames 8140653
    { ad: "Çilimli", enlem: 40.8936, boylam: 31.0492 }, // GeoNames 749100
    { ad: "Gölyaka", enlem: 40.7769, boylam: 30.9959 }, // GeoNames 746590
    { ad: "Gümüşova", enlem: 40.8469, boylam: 30.9411 }, // GeoNames 746413
    { ad: "Kaynaşlı", enlem: 40.7692, boylam: 31.3221 }, // GeoNames 743624
    { ad: "Merkez", enlem: 40.8389, boylam: 31.1639 }, // il merkezi (Merkez ilçe)
    { ad: "Yığılca", enlem: 40.9598, boylam: 31.4435 }, // GeoNames 737521
  ],
  "Edirne": [
    { ad: "Enez", enlem: 40.7247, boylam: 26.0825 }, // GeoNames 747503
    { ad: "Havsa", enlem: 41.549, boylam: 26.8221 }, // GeoNames 745719
    { ad: "İpsala", enlem: 40.9211, boylam: 26.3827 }, // GeoNames 745148
    { ad: "Keşan", enlem: 40.8558, boylam: 26.6303 }, // GeoNames 743439
    { ad: "Lalapaşa", enlem: 41.8395, boylam: 26.7356 }, // GeoNames 741884
    { ad: "Meriç", enlem: 41.1918, boylam: 26.421 }, // GeoNames 741628
    { ad: "Merkez", enlem: 41.6772, boylam: 26.556 }, // il merkezi (Merkez ilçe)
    { ad: "Süloğlu", enlem: 41.769, boylam: 26.91 }, // GeoNames 739289
    { ad: "Uzunköprü", enlem: 41.266, boylam: 26.6885 }, // GeoNames 738251
  ],
  "Elazığ": [
    { ad: "Ağın", enlem: 38.9379, boylam: 38.7116 }, // GeoNames 325183
    { ad: "Alacakaya", enlem: 38.462, boylam: 39.8623 }, // GeoNames 312406
    { ad: "Arıcak", enlem: 38.5634, boylam: 40.1248 }, // GeoNames 323653
    { ad: "Baskil", enlem: 38.5687, boylam: 38.8163 }, // GeoNames 321929
    { ad: "Karakoçan", enlem: 38.9518, boylam: 40.0271 }, // GeoNames 309663
    { ad: "Keban", enlem: 38.7938, boylam: 38.7352 }, // GeoNames 308389
    { ad: "Kovancılar", enlem: 38.7188, boylam: 39.8627 }, // GeoNames 306207
    { ad: "Maden", enlem: 38.3867, boylam: 39.6641 }, // GeoNames 305041
    { ad: "Merkez", enlem: 38.6743, boylam: 39.2232 }, // il merkezi (Merkez ilçe)
    { ad: "Palu", enlem: 38.6913, boylam: 39.9198 }, // GeoNames 302912
    { ad: "Sivrice", enlem: 38.4422, boylam: 39.3094 }, // GeoNames 300601
  ],
  "Erzincan": [
    { ad: "Çayırlı", enlem: 39.8077, boylam: 40.028 }, // GeoNames 319047
    { ad: "İliç", enlem: 39.4511, boylam: 38.5584 }, // GeoNames 311547
    { ad: "Kemah", enlem: 39.5961, boylam: 39.0233 }, // GeoNames 308233
    { ad: "Kemaliye", enlem: 39.2629, boylam: 38.4967 }, // GeoNames 308230
    { ad: "Merkez", enlem: 39.7392, boylam: 39.4901 }, // il merkezi (Merkez ilçe)
    { ad: "Otlukbeli", enlem: 39.97, boylam: 40.0187 }, // GeoNames 303147
    { ad: "Refahiye", enlem: 39.8931, boylam: 38.7661 }, // GeoNames 302401
    { ad: "Tercan", enlem: 39.7771, boylam: 40.3778 }, // GeoNames 299268
    { ad: "Üzümlü", enlem: 39.7095, boylam: 39.7002 }, // GeoNames 298230
  ],
  "Erzurum": [
    { ad: "Aşkale", enlem: 39.9208, boylam: 40.695 }, // GeoNames 323094
    { ad: "Aziziye", enlem: 39.9086, boylam: 41.2769 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Çat", enlem: 39.6064, boylam: 40.9684 }, // GeoNames 319357
    { ad: "Hınıs", enlem: 39.3577, boylam: 41.6925 }, // GeoNames 312114
    { ad: "Horasan", enlem: 40.0388, boylam: 42.1637 }, // GeoNames 745527
    { ad: "İspir", enlem: 40.4798, boylam: 40.9937 }, // GeoNames 745047
    { ad: "Karaçoban", enlem: 39.3436, boylam: 42.0992 }, // GeoNames 310004
    { ad: "Karayazı", enlem: 39.696, boylam: 42.1428 }, // GeoNames 309199
    { ad: "Köprüköy", enlem: 39.966, boylam: 41.8684 }, // GeoNames 306525
    { ad: "Narman", enlem: 40.3445, boylam: 41.8609 }, // GeoNames 741330
    { ad: "Oltu", enlem: 40.5395, boylam: 41.9872 }, // GeoNames 741160
    { ad: "Olur", enlem: 40.8216, boylam: 42.1305 }, // GeoNames 741136
    { ad: "Palandöken", enlem: 39.889, boylam: 41.2805 }, // GeoNames 10331001
    { ad: "Pasinler", enlem: 39.9798, boylam: 41.67 }, // GeoNames 302824
    { ad: "Pazaryolu", enlem: 40.4114, boylam: 40.7678 }, // GeoNames 740659
    { ad: "Şenkaya", enlem: 40.5565, boylam: 42.3427 }, // GeoNames 739816
    { ad: "Tekman", enlem: 39.6411, boylam: 41.5054 }, // GeoNames 299413
    { ad: "Tortum", enlem: 40.2889, boylam: 41.541 }, // GeoNames 738674
    { ad: "Uzundere", enlem: 40.5322, boylam: 41.5383 }, // GeoNames 738276
    { ad: "Yakutiye", enlem: 39.8982, boylam: 41.2692 }, // GeoNames 10332081
  ],
  "Eskişehir": [
    { ad: "Alpu", enlem: 39.769, boylam: 30.9606 }, // GeoNames 323963
    { ad: "Beylikova", enlem: 39.6869, boylam: 31.2056 }, // GeoNames 321219
    { ad: "Çifteler", enlem: 39.3831, boylam: 31.0392 }, // GeoNames 318603
    { ad: "Günyüzü", enlem: 39.3835, boylam: 31.81 }, // GeoNames 313393
    { ad: "Han", enlem: 39.1592, boylam: 30.8614 }, // GeoNames 312649
    { ad: "İnönü", enlem: 39.8153, boylam: 30.1455 }, // GeoNames 311261
    { ad: "Mahmudiye", enlem: 39.4978, boylam: 30.9872 }, // GeoNames 304983
    { ad: "Mihalgazi", enlem: 40.0262, boylam: 30.5771 }, // GeoNames 741538
    { ad: "Mihalıççık", enlem: 39.8659, boylam: 31.4957 }, // GeoNames 304372
    { ad: "Odunpazarı", enlem: 39.7682, boylam: 30.5354 }, // GeoNames 10345207
    { ad: "Sarıcakaya", enlem: 40.0369, boylam: 30.6268 }, // GeoNames 750296
    { ad: "Seyitgazi", enlem: 39.4447, boylam: 30.6947 }, // GeoNames 300920
    { ad: "Sivrihisar", enlem: 39.4504, boylam: 31.5341 }, // GeoNames 300593
    { ad: "Tepebaşı", enlem: 39.8109, boylam: 30.5255 }, // GeoNames 10345206
  ],
  "Gaziantep": [
    { ad: "Araban", enlem: 37.4267, boylam: 37.689 }, // GeoNames 323750
    { ad: "İslahiye", enlem: 37.025, boylam: 36.6306 }, // GeoNames 311104
    { ad: "Karkamış", enlem: 36.8345, boylam: 37.9983 }, // GeoNames 309134
    { ad: "Nizip", enlem: 37.0097, boylam: 37.7942 }, // GeoNames 303798
    { ad: "Nurdağı", enlem: 37.1682, boylam: 36.7362 }, // GeoNames 415534
    { ad: "Oğuzeli", enlem: 36.9657, boylam: 37.5134 }, // GeoNames 303642
    { ad: "Şahinbey", enlem: 37.0484, boylam: 37.3437 }, // GeoNames 7619146
    { ad: "Şehitkamil", enlem: 37.0796, boylam: 37.38 }, // GeoNames 7619145
    { ad: "Yavuzeli", enlem: 37.3177, boylam: 37.5682 }, // GeoNames 297532
  ],
  "Giresun": [
    { ad: "Alucra", enlem: 40.3166, boylam: 38.7529 }, // GeoNames 752020
    { ad: "Bulancak", enlem: 40.938, boylam: 38.2315 }, // GeoNames 750317
    { ad: "Çamoluk", enlem: 40.1273, boylam: 38.7301 }, // GeoNames 749819
    { ad: "Çanakçı", enlem: 40.9114, boylam: 38.9881 }, // GeoNames 749789
    { ad: "Dereli", enlem: 40.7389, boylam: 38.4434 }, // GeoNames 748240
    { ad: "Doğankent", enlem: 40.8075, boylam: 38.9172 }, // GeoNames 748008
    { ad: "Espiye", enlem: 40.947, boylam: 38.703 }, // GeoNames 831432
    { ad: "Eynesil", enlem: 41.0644, boylam: 39.1427 }, // GeoNames 747191
    { ad: "Görele", enlem: 41.0308, boylam: 39.0031 }, // GeoNames 746565
    { ad: "Güce", enlem: 40.8932, boylam: 38.7982 }, // GeoNames 7569266
    { ad: "Keşap", enlem: 40.9103, boylam: 38.5013 }, // GeoNames 743438
    { ad: "Merkez", enlem: 40.917, boylam: 38.3874 }, // il merkezi (Merkez ilçe)
    { ad: "Piraziz", enlem: 40.953, boylam: 38.1089 }, // GeoNames 740560
    { ad: "Şebinkarahisar", enlem: 40.2883, boylam: 38.4236 }, // GeoNames 739914
    { ad: "Tirebolu", enlem: 41.0069, boylam: 38.8139 }, // GeoNames 738753
    { ad: "Yağlıdere", enlem: 40.8567, boylam: 38.6204 }, // GeoNames 738123
  ],
  "Gümüşhane": [
    { ad: "Kelkit", enlem: 40.1268, boylam: 39.4342 }, // GeoNames 743537
    { ad: "Köse", enlem: 40.2069, boylam: 39.6463 }, // GeoNames 742606
    { ad: "Kürtün", enlem: 40.6952, boylam: 39.0947 }, // GeoNames 749421
    { ad: "Merkez", enlem: 40.46, boylam: 39.4718 }, // il merkezi (Merkez ilçe)
    { ad: "Şiran", enlem: 40.1906, boylam: 39.1175 }, // GeoNames 739574
    { ad: "Torul", enlem: 40.5507, boylam: 39.2834 }, // GeoNames 738668
  ],
  "Hakkari": [
    { ad: "Çukurca", enlem: 37.2481, boylam: 43.6136 }, // GeoNames 317953
    { ad: "Derecik", enlem: 37.5744, boylam: 43.7408 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Merkez", enlem: 37.5744, boylam: 43.7408 }, // il merkezi (Merkez ilçe)
    { ad: "Şemdinli", enlem: 37.3051, boylam: 44.5742 }, // GeoNames 301209
    { ad: "Yüksekova", enlem: 37.5736, boylam: 44.2872 }, // GeoNames 296173
  ],
  "Hatay": [
    { ad: "Altınözü", enlem: 36.1155, boylam: 36.2483 }, // GeoNames 323906
    { ad: "Antakya", enlem: 36.2066, boylam: 36.1572 }, // GeoNames 323779
    { ad: "Arsuz", enlem: 36.413, boylam: 35.8903 }, // GeoNames 298435
    { ad: "Belen", enlem: 36.4887, boylam: 36.1949 }, // GeoNames 321572
    { ad: "Defne", enlem: 36.2066, boylam: 36.1572 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Dörtyol", enlem: 36.8392, boylam: 36.2302 }, // GeoNames 316284
    { ad: "Erzin", enlem: 36.9535, boylam: 36.1984 }, // GeoNames 296852
    { ad: "Hassa", enlem: 36.7994, boylam: 36.5178 }, // GeoNames 312405
    { ad: "İskenderun", enlem: 36.5872, boylam: 36.1735 }, // GeoNames 311111
    { ad: "Kırıkhan", enlem: 36.4994, boylam: 36.3576 }, // GeoNames 307657
    { ad: "Kumlu", enlem: 36.3635, boylam: 36.455 }, // GeoNames 305686
    { ad: "Payas", enlem: 36.756, boylam: 36.2143 }, // GeoNames 297899
    { ad: "Reyhanlı", enlem: 36.2679, boylam: 36.5675 }, // GeoNames 302355
    { ad: "Samandağ", enlem: 36.0801, boylam: 35.976 }, // GeoNames 301975
    { ad: "Yayladağı", enlem: 35.9025, boylam: 36.0627 }, // GeoNames 297466
  ],
  "Iğdır": [
    { ad: "Aralık", enlem: 39.8728, boylam: 44.5192 }, // GeoNames 323735
    { ad: "Karakoyunlu", enlem: 39.8704, boylam: 43.6301 }, // GeoNames 309610
    { ad: "Merkez", enlem: 39.9237, boylam: 44.045 }, // il merkezi (Merkez ilçe)
    { ad: "Tuzluca", enlem: 40.0387, boylam: 43.6521 }, // GeoNames 738541
  ],
  "Isparta": [
    { ad: "Aksu", enlem: 37.7989, boylam: 31.0711 }, // GeoNames 324470
    { ad: "Atabey", enlem: 37.9508, boylam: 30.6386 }, // GeoNames 323039
    { ad: "Eğirdir", enlem: 37.8746, boylam: 30.8504 }, // GeoNames 315905
    { ad: "Gelendost", enlem: 38.1208, boylam: 31.0153 }, // GeoNames 314698
    { ad: "Gönen", enlem: 37.9564, boylam: 30.5114 }, // GeoNames 313973
    { ad: "Keçiborlu", enlem: 37.9425, boylam: 30.3022 }, // GeoNames 308365
    { ad: "Merkez", enlem: 37.7644, boylam: 30.5522 }, // il merkezi (Merkez ilçe)
    { ad: "Senirkent", enlem: 38.1044, boylam: 30.5486 }, // GeoNames 301172
    { ad: "Sütçüler", enlem: 37.4974, boylam: 30.9773 }, // GeoNames 300030
    { ad: "Şarkikaraağaç", enlem: 38.0794, boylam: 31.3664 }, // GeoNames 301539
    { ad: "Uluborlu", enlem: 38.0782, boylam: 30.4502 }, // GeoNames 298451
    { ad: "Yalvaç", enlem: 38.2956, boylam: 31.1778 }, // GeoNames 297789
    { ad: "Yenişarbademli", enlem: 37.7078, boylam: 31.3864 }, // GeoNames 296942
  ],
  "İstanbul": [
    { ad: "Adalar", enlem: 40.8678, boylam: 29.1331 }, // GeoNames 750249
    { ad: "Arnavutköy", enlem: 41.1528, boylam: 29.1897 }, // GeoNames 741793
    { ad: "Ataşehir", enlem: 40.9833, boylam: 29.1167 }, // GeoNames 6947637
    { ad: "Avcılar", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Bağcılar", enlem: 41.039, boylam: 28.8567 }, // GeoNames 751324
    { ad: "Bahçelievler", enlem: 41.0023, boylam: 28.8598 }, // GeoNames 7627067
    { ad: "Bakırköy", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Başakşehir", enlem: 41.0931, boylam: 28.802 }, // GeoNames 6947639
    { ad: "Bayrampaşa", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Beşiktaş", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Beykoz", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Beylikdüzü", enlem: 40.982, boylam: 28.6399 }, // GeoNames 6947640
    { ad: "Beyoğlu", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Büyükçekmece", enlem: 41.0207, boylam: 28.585 }, // GeoNames 6947641
    { ad: "Çatalca", enlem: 41.1432, boylam: 28.4615 }, // GeoNames 749644
    { ad: "Çekmeköy", enlem: 41.0412, boylam: 29.1784 }, // GeoNames 749387
    { ad: "Esenler", enlem: 41.0435, boylam: 28.8762 }, // GeoNames 747340
    { ad: "Esenyurt", enlem: 41.027, boylam: 28.6773 }, // GeoNames 747323
    { ad: "Eyüpsultan", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Fatih", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Gaziosmanpaşa", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Güngören", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kadıköy", enlem: 40.6667, boylam: 26.8833 }, // GeoNames 744925
    { ad: "Kağıthane", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kartal", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Küçükçekmece", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Maltepe", enlem: 40.0464, boylam: 27.97 }, // GeoNames 741737
    { ad: "Pendik", enlem: 40.8775, boylam: 29.2725 }, // GeoNames 740616
    { ad: "Sancaktepe", enlem: 41.0024, boylam: 29.2319 }, // GeoNames 7628420
    { ad: "Sarıyer", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Silivri", enlem: 41.0739, boylam: 28.2464 }, // GeoNames 739634
    { ad: "Sultanbeyli", enlem: 40.9607, boylam: 29.2707 }, // GeoNames 7628419
    { ad: "Sultangazi", enlem: 41.1065, boylam: 28.8685 }, // GeoNames 7628416
    { ad: "Şile", enlem: 41.1754, boylam: 29.6133 }, // GeoNames 739636
    { ad: "Şişli", enlem: 41.0605, boylam: 28.9872 }, // GeoNames 739549
    { ad: "Tuzla", enlem: 41.0138, boylam: 28.9497 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ümraniye", enlem: 41.0329, boylam: 29.1014 }, // GeoNames 10400338
    { ad: "Üsküdar", enlem: 41.0227, boylam: 29.0137 }, // GeoNames 738329
    { ad: "Zeytinburnu", enlem: 40.9944, boylam: 28.9042 }, // GeoNames 737071
  ],
  "İzmir": [
    { ad: "Aliağa", enlem: 38.7998, boylam: 26.972 }, // GeoNames 324106
    { ad: "Balçova", enlem: 38.4127, boylam: 27.1384 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Bayındır", enlem: 38.2174, boylam: 27.6474 }, // GeoNames 321786
    { ad: "Bayraklı", enlem: 38.4672, boylam: 27.1638 }, // GeoNames 321743
    { ad: "Bergama", enlem: 39.1207, boylam: 27.1805 }, // GeoNames 321426
    { ad: "Beydağ", enlem: 38.4127, boylam: 27.1384 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Bornova", enlem: 38.4792, boylam: 27.2399 }, // GeoNames 320857
    { ad: "Buca", enlem: 38.3983, boylam: 27.1666 }, // GeoNames 320528
    { ad: "Çeşme", enlem: 38.3261, boylam: 26.3057 }, // GeoNames 318755
    { ad: "Çiğli", enlem: 38.4127, boylam: 27.1384 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Dikili", enlem: 39.071, boylam: 26.8902 }, // GeoNames 316726
    { ad: "Foça", enlem: 38.6703, boylam: 26.7566 }, // GeoNames 314903
    { ad: "Gaziemir", enlem: 38.3239, boylam: 27.1292 }, // GeoNames 314826
    { ad: "Güzelbahçe", enlem: 38.4127, boylam: 27.1384 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Karabağlar", enlem: 38.374, boylam: 27.1352 }, // GeoNames 7701384
    { ad: "Karaburun", enlem: 38.6364, boylam: 26.5109 }, // GeoNames 310200
    { ad: "Karşıyaka", enlem: 38.4577, boylam: 27.1142 }, // GeoNames 308988
    { ad: "Kemalpaşa", enlem: 38.4262, boylam: 27.4173 }, // GeoNames 308224
    { ad: "Kınık", enlem: 39.0872, boylam: 27.3833 }, // GeoNames 307786
    { ad: "Kiraz", enlem: 38.2306, boylam: 28.2044 }, // GeoNames 307727
    { ad: "Konak", enlem: 37.4054, boylam: 29.1373 }, // GeoNames 320177
    { ad: "Menderes", enlem: 38.2496, boylam: 27.1343 }, // GeoNames 317851
    { ad: "Menemen", enlem: 38.6075, boylam: 27.0694 }, // GeoNames 304612
    { ad: "Narlıdere", enlem: 38.4127, boylam: 27.1384 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ödemiş", enlem: 38.2278, boylam: 27.9696 }, // GeoNames 303700
    { ad: "Seferihisar", enlem: 38.1975, boylam: 26.8388 }, // GeoNames 301350
    { ad: "Selçuk", enlem: 37.9514, boylam: 27.3685 }, // GeoNames 301256
    { ad: "Tire", enlem: 38.0888, boylam: 27.7351 }, // GeoNames 299137
    { ad: "Torbalı", enlem: 38.1519, boylam: 27.3622 }, // GeoNames 298935
    { ad: "Urla", enlem: 38.3229, boylam: 26.764 }, // GeoNames 298316
  ],
  "Kahramanmaraş": [
    { ad: "Afşin", enlem: 38.2477, boylam: 36.914 }, // GeoNames 325304
    { ad: "Andırın", enlem: 37.5776, boylam: 36.3549 }, // GeoNames 323797
    { ad: "Çağlayancerit", enlem: 37.7452, boylam: 37.2862 }, // GeoNames 320004
    { ad: "Dulkadiroğlu", enlem: 37.5847, boylam: 36.9264 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ekinözü", enlem: 38.0597, boylam: 37.1879 }, // GeoNames 315835
    { ad: "Elbistan", enlem: 38.2059, boylam: 37.1983 }, // GeoNames 315795
    { ad: "Göksun", enlem: 38.021, boylam: 36.4973 }, // GeoNames 314188
    { ad: "Nurhak", enlem: 37.9637, boylam: 37.4405 }, // GeoNames 303763
    { ad: "Onikişubat", enlem: 37.5847, boylam: 36.9264 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Pazarcık", enlem: 37.4868, boylam: 37.2996 }, // GeoNames 302800
    { ad: "Türkoğlu", enlem: 37.3865, boylam: 36.8426 }, // GeoNames 298770
  ],
  "Karabük": [
    { ad: "Eflani", enlem: 41.4229, boylam: 32.9576 }, // GeoNames 747705
    { ad: "Eskipazar", enlem: 40.943, boylam: 32.5309 }, // GeoNames 747262
    { ad: "Merkez", enlem: 41.2049, boylam: 32.6277 }, // il merkezi (Merkez ilçe)
    { ad: "Ovacık", enlem: 41.0766, boylam: 32.9199 }, // GeoNames 740828
    { ad: "Safranbolu", enlem: 41.2508, boylam: 32.6942 }, // GeoNames 740430
    { ad: "Yenice", enlem: 41.1996, boylam: 32.3313 }, // GeoNames 737723
  ],
  "Karaman": [
    { ad: "Ayrancı", enlem: 37.3613, boylam: 33.6883 }, // GeoNames 322729
    { ad: "Başyayla", enlem: 36.7534, boylam: 32.6802 }, // GeoNames 447049
    { ad: "Ermenek", enlem: 36.6404, boylam: 32.8918 }, // GeoNames 315401
    { ad: "Kazımkarabekir", enlem: 37.2303, boylam: 32.9589 }, // GeoNames 308400
    { ad: "Merkez", enlem: 37.1811, boylam: 33.215 }, // il merkezi (Merkez ilçe)
    { ad: "Sarıveliler", enlem: 36.697, boylam: 32.612 }, // GeoNames 301567
  ],
  "Kars": [
    { ad: "Akyaka", enlem: 40.7409, boylam: 43.6143 }, // GeoNames 752297
    { ad: "Arpaçay", enlem: 40.8452, boylam: 43.3275 }, // GeoNames 751864
    { ad: "Digor", enlem: 40.369, boylam: 43.41 }, // GeoNames 748148
    { ad: "Kağızman", enlem: 40.1567, boylam: 43.1342 }, // GeoNames 744873
    { ad: "Merkez", enlem: 40.5983, boylam: 43.0855 }, // il merkezi (Merkez ilçe)
    { ad: "Sarıkamış", enlem: 40.3277, boylam: 42.587 }, // GeoNames 740088
    { ad: "Selim", enlem: 40.4577, boylam: 42.7829 }, // GeoNames 739847
    { ad: "Susuz", enlem: 40.7791, boylam: 43.1277 }, // GeoNames 739201
  ],
  "Kastamonu": [
    { ad: "Abana", enlem: 41.9786, boylam: 34.011 }, // GeoNames 752926
    { ad: "Ağlı", enlem: 41.686, boylam: 33.5538 }, // GeoNames 752770
    { ad: "Araç", enlem: 41.2422, boylam: 33.3277 }, // GeoNames 751976
    { ad: "Azdavay", enlem: 41.6427, boylam: 33.3 }, // GeoNames 751388
    { ad: "Bozkurt", enlem: 41.9577, boylam: 34.0109 }, // GeoNames 750392
    { ad: "Cide", enlem: 41.8921, boylam: 33.0044 }, // GeoNames 749183
    { ad: "Çatalzeytin", enlem: 41.9531, boylam: 34.2163 }, // GeoNames 749609
    { ad: "Daday", enlem: 41.4787, boylam: 33.4667 }, // GeoNames 748761
    { ad: "Devrekani", enlem: 41.603, boylam: 33.8392 }, // GeoNames 748166
    { ad: "Doğanyurt", enlem: 42.0046, boylam: 33.4603 }, // GeoNames 747978
    { ad: "Hanönü", enlem: 41.627, boylam: 34.4667 }, // GeoNames 745884
    { ad: "İhsangazi", enlem: 41.2043, boylam: 33.5545 }, // GeoNames 745387
    { ad: "İnebolu", enlem: 41.9747, boylam: 33.7608 }, // GeoNames 745175
    { ad: "Küre", enlem: 41.8058, boylam: 33.7116 }, // GeoNames 742189
    { ad: "Merkez", enlem: 41.3781, boylam: 33.7753 }, // il merkezi (Merkez ilçe)
    { ad: "Pınarbaşı", enlem: 41.6039, boylam: 33.111 }, // GeoNames 740581
    { ad: "Seydiler", enlem: 41.62, boylam: 33.7182 }, // GeoNames 739742
    { ad: "Şenpazar", enlem: 41.8089, boylam: 33.2313 }, // GeoNames 739808
    { ad: "Taşköprü", enlem: 41.5098, boylam: 34.2141 }, // GeoNames 739061
    { ad: "Tosya", enlem: 41.0155, boylam: 34.0401 }, // GeoNames 738662
  ],
  "Kayseri": [
    { ad: "Akkışla", enlem: 39.0022, boylam: 36.1738 }, // GeoNames 324643
    { ad: "Bünyan", enlem: 38.8463, boylam: 35.8603 }, // GeoNames 320406
    { ad: "Develi", enlem: 38.3906, boylam: 35.4922 }, // GeoNames 316795
    { ad: "Felahiye", enlem: 39.0906, boylam: 35.5672 }, // GeoNames 314996
    { ad: "Hacılar", enlem: 38.6463, boylam: 35.4494 }, // GeoNames 313013
    { ad: "İncesu", enlem: 38.6224, boylam: 35.1826 }, // GeoNames 311358
    { ad: "Kocasinan", enlem: 38.7715, boylam: 35.5725 }, // GeoNames 315972
    { ad: "Melikgazi", enlem: 38.75, boylam: 35.45 }, // GeoNames 318580
    { ad: "Özvatan", enlem: 39.1069, boylam: 35.6999 }, // GeoNames 317970
    { ad: "Pınarbaşı", enlem: 38.7229, boylam: 36.3931 }, // GeoNames 302667
    { ad: "Sarıoğlan", enlem: 39.0769, boylam: 35.9667 }, // GeoNames 301609
    { ad: "Sarız", enlem: 38.4792, boylam: 36.499 }, // GeoNames 301546
    { ad: "Talas", enlem: 38.6908, boylam: 35.5538 }, // GeoNames 299900
    { ad: "Tomarza", enlem: 38.4472, boylam: 35.7992 }, // GeoNames 299054
    { ad: "Yahyalı", enlem: 38.1023, boylam: 35.357 }, // GeoNames 297917
    { ad: "Yeşilhisar", enlem: 38.3523, boylam: 35.0887 }, // GeoNames 296860
  ],
  "Kırıkkale": [
    { ad: "Bahşılı", enlem: 39.8002, boylam: 33.437 }, // GeoNames 322312
    { ad: "Balışeyh", enlem: 39.9141, boylam: 33.7233 }, // GeoNames 322137
    { ad: "Çelebi", enlem: 39.4642, boylam: 33.5241 }, // GeoNames 318925
    { ad: "Delice", enlem: 39.9537, boylam: 34.0259 }, // GeoNames 317332
    { ad: "Karakeçili", enlem: 39.5942, boylam: 33.3778 }, // GeoNames 309705
    { ad: "Keskin", enlem: 39.6731, boylam: 33.6136 }, // GeoNames 308024
    { ad: "Merkez", enlem: 39.8453, boylam: 33.5064 }, // il merkezi (Merkez ilçe)
    { ad: "Sulakyurt", enlem: 40.1573, boylam: 33.716 }, // GeoNames 739318
    { ad: "Yahşihan", enlem: 39.8503, boylam: 33.4529 }, // GeoNames 297925
  ],
  "Kırklareli": [
    { ad: "Babaeski", enlem: 41.4325, boylam: 27.0931 }, // GeoNames 751371
    { ad: "Demirköy", enlem: 41.7351, boylam: 27.2252 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Kofçaz", enlem: 41.9448, boylam: 27.1583 }, // GeoNames 742794
    { ad: "Lüleburgaz", enlem: 41.4038, boylam: 27.3592 }, // GeoNames 741855
    { ad: "Merkez", enlem: 41.7351, boylam: 27.2252 }, // il merkezi (Merkez ilçe)
    { ad: "Pehlivanköy", enlem: 41.3481, boylam: 26.9252 }, // GeoNames 740650
    { ad: "Pınarhisar", enlem: 41.6242, boylam: 27.52 }, // GeoNames 740570
    { ad: "Vize", enlem: 41.5725, boylam: 27.7658 }, // GeoNames 738154
  ],
  "Kırşehir": [
    { ad: "Akçakent", enlem: 39.6228, boylam: 34.0958 }, // GeoNames 324927
    { ad: "Akpınar", enlem: 39.45, boylam: 33.9648 }, // GeoNames 324531
    { ad: "Boztepe", enlem: 39.2697, boylam: 34.2611 }, // GeoNames 320562
    { ad: "Çiçekdağı", enlem: 39.6069, boylam: 34.4086 }, // GeoNames 318651
    { ad: "Kaman", enlem: 39.3575, boylam: 33.7239 }, // GeoNames 310641
    { ad: "Merkez", enlem: 39.1458, boylam: 34.1639 }, // il merkezi (Merkez ilçe)
    { ad: "Mucur", enlem: 39.0615, boylam: 34.3829 }, // GeoNames 304196
  ],
  "Kilis": [
    { ad: "Elbeyli", enlem: 36.6742, boylam: 37.4667 }, // GeoNames 315800
    { ad: "Merkez", enlem: 36.7161, boylam: 37.115 }, // il merkezi (Merkez ilçe)
    { ad: "Musabeyli", enlem: 36.8864, boylam: 36.9186 }, // GeoNames 304078
    { ad: "Polateli", enlem: 36.8414, boylam: 37.1441 }, // GeoNames 8306185
  ],
  "Kocaeli": [
    { ad: "Başiskele", enlem: 40.765, boylam: 29.9293 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Çayırova", enlem: 40.8344, boylam: 29.4 }, // GeoNames 746180
    { ad: "Darıca", enlem: 40.7797, boylam: 29.3945 }, // GeoNames 748636
    { ad: "Derince", enlem: 40.7569, boylam: 29.8147 }, // GeoNames 748208
    { ad: "Dilovası", enlem: 40.765, boylam: 29.9293 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Gebze", enlem: 40.8028, boylam: 29.4307 }, // GeoNames 747014
    { ad: "Gölcük", enlem: 40.715, boylam: 29.8182 }, // GeoNames 746666
    { ad: "İzmit", enlem: 40.765, boylam: 29.9293 }, // GeoNames 745028
    { ad: "Kandıra", enlem: 41.07, boylam: 30.1526 }, // GeoNames 744716
    { ad: "Karamürsel", enlem: 40.6913, boylam: 29.6165 }, // GeoNames 744168
    { ad: "Kartepe", enlem: 40.765, boylam: 29.9293 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Körfez", enlem: 40.767, boylam: 29.7828 }, // GeoNames 737961
  ],
  "Konya": [
    { ad: "Ahırlı", enlem: 37.2387, boylam: 32.1188 }, // GeoNames 325109
    { ad: "Akören", enlem: 37.4534, boylam: 32.3707 }, // GeoNames 324577
    { ad: "Akşehir", enlem: 38.3575, boylam: 31.4164 }, // GeoNames 324490
    { ad: "Altınekin", enlem: 38.3078, boylam: 32.8686 }, // GeoNames 323930
    { ad: "Beyşehir", enlem: 37.6773, boylam: 31.7246 }, // GeoNames 321191
    { ad: "Bozkır", enlem: 37.1896, boylam: 32.2474 }, // GeoNames 320621
    { ad: "Cihanbeyli", enlem: 38.6607, boylam: 32.9244 }, // GeoNames 318506
    { ad: "Çeltik", enlem: 39.0244, boylam: 31.7906 }, // GeoNames 318885
    { ad: "Çumra", enlem: 37.5732, boylam: 32.7745 }, // GeoNames 317844
    { ad: "Derbent", enlem: 38.0142, boylam: 32.0164 }, // GeoNames 317095
    { ad: "Derebucak", enlem: 37.3918, boylam: 31.5092 }, // GeoNames 317049
    { ad: "Doğanhisar", enlem: 38.1463, boylam: 31.6765 }, // GeoNames 316475
    { ad: "Emirgazi", enlem: 37.9022, boylam: 33.8372 }, // GeoNames 315617
    { ad: "Ereğli", enlem: 37.5133, boylam: 34.0467 }, // GeoNames 315498
    { ad: "Güneysınır", enlem: 37.2694, boylam: 32.729 }, // GeoNames 315665
    { ad: "Hadim", enlem: 36.9878, boylam: 32.4567 }, // GeoNames 312899
    { ad: "Halkapınar", enlem: 37.4339, boylam: 34.1874 }, // GeoNames 312817
    { ad: "Hüyük", enlem: 37.9539, boylam: 31.5964 }, // GeoNames 311777
    { ad: "Ilgın", enlem: 38.2792, boylam: 31.9139 }, // GeoNames 311553
    { ad: "Kadınhanı", enlem: 38.2397, boylam: 32.2114 }, // GeoNames 310907
    { ad: "Karapınar", enlem: 37.716, boylam: 33.5506 }, // GeoNames 309415
    { ad: "Karatay", enlem: 37.8673, boylam: 32.5286 }, // GeoNames 6692058
    { ad: "Kulu", enlem: 39.0951, boylam: 33.0799 }, // GeoNames 305742
    { ad: "Meram", enlem: 37.8299, boylam: 32.4678 }, // GeoNames 304582
    { ad: "Sarayönü", enlem: 38.262, boylam: 32.4046 }, // GeoNames 301824
    { ad: "Selçuklu", enlem: 37.8842, boylam: 32.4922 }, // GeoNames 312001
    { ad: "Seydişehir", enlem: 37.4193, boylam: 31.8453 }, // GeoNames 301010
    { ad: "Taşkent", enlem: 36.9243, boylam: 32.4913 }, // GeoNames 299755
    { ad: "Tuzlukçu", enlem: 38.4778, boylam: 31.6264 }, // GeoNames 298647
    { ad: "Yalıhüyük", enlem: 37.3008, boylam: 32.0855 }, // GeoNames 297839
    { ad: "Yunak", enlem: 38.8142, boylam: 31.7322 }, // GeoNames 296134
  ],
  "Kütahya": [
    { ad: "Altıntaş", enlem: 39.0597, boylam: 30.1092 }, // GeoNames 323897
    { ad: "Aslanapa", enlem: 39.2158, boylam: 29.8699 }, // GeoNames 323082
    { ad: "Çavdarhisar", enlem: 39.1934, boylam: 29.6192 }, // GeoNames 319171
    { ad: "Domaniç", enlem: 39.8019, boylam: 29.6092 }, // GeoNames 316330
    { ad: "Dumlupınar", enlem: 38.8541, boylam: 29.9772 }, // GeoNames 316165
    { ad: "Emet", enlem: 39.343, boylam: 29.2585 }, // GeoNames 315639
    { ad: "Gediz", enlem: 38.9939, boylam: 29.3913 }, // GeoNames 314716
    { ad: "Hisarcık", enlem: 39.2506, boylam: 29.2312 }, // GeoNames 312051
    { ad: "Merkez", enlem: 39.4242, boylam: 29.9833 }, // il merkezi (Merkez ilçe)
    { ad: "Pazarlar", enlem: 38.995, boylam: 29.1258 }, // GeoNames 302787
    { ad: "Simav", enlem: 39.0882, boylam: 28.9777 }, // GeoNames 300791
    { ad: "Şaphane", enlem: 39.0273, boylam: 29.2222 }, // GeoNames 301884
    { ad: "Tavşanlı", enlem: 39.5424, boylam: 29.4987 }, // GeoNames 299545
  ],
  "Malatya": [
    { ad: "Akçadağ", enlem: 38.339, boylam: 37.9702 }, // GeoNames 324953
    { ad: "Arapgir", enlem: 39.0412, boylam: 38.4952 }, // GeoNames 323721
    { ad: "Arguvan", enlem: 38.7737, boylam: 38.2633 }, // GeoNames 323660
    { ad: "Battalgazi", enlem: 38.4229, boylam: 38.3585 }, // GeoNames 7457829
    { ad: "Darende", enlem: 38.5458, boylam: 37.5058 }, // GeoNames 317588
    { ad: "Doğanşehir", enlem: 38.0857, boylam: 37.8712 }, // GeoNames 316440
    { ad: "Doğanyol", enlem: 38.3075, boylam: 39.0343 }, // GeoNames 316431
    { ad: "Hekimhan", enlem: 38.8162, boylam: 37.9288 }, // GeoNames 312245
    { ad: "Kale", enlem: 38.4154, boylam: 38.7709 }, // GeoNames 323251
    { ad: "Kuluncak", enlem: 38.8766, boylam: 37.6628 }, // GeoNames 305737
    { ad: "Pütürge", enlem: 38.1992, boylam: 38.863 }, // GeoNames 302442
    { ad: "Yazıhan", enlem: 38.5929, boylam: 38.1733 }, // GeoNames 297371
    { ad: "Yeşilyurt", enlem: 38.296, boylam: 38.2453 }, // GeoNames 296791
  ],
  "Manisa": [
    { ad: "Ahmetli", enlem: 38.5196, boylam: 27.9386 }, // GeoNames 325066
    { ad: "Akhisar", enlem: 38.9185, boylam: 27.8401 }, // GeoNames 324698
    { ad: "Alaşehir", enlem: 38.3508, boylam: 28.5172 }, // GeoNames 324172
    { ad: "Demirci", enlem: 39.0461, boylam: 28.6589 }, // GeoNames 317241
    { ad: "Gölmarmara", enlem: 38.7139, boylam: 27.9142 }, // GeoNames 314038
    { ad: "Gördes", enlem: 38.9328, boylam: 28.2894 }, // GeoNames 313960
    { ad: "Kırkağaç", enlem: 39.1064, boylam: 27.6693 }, // GeoNames 307623
    { ad: "Köprübaşı", enlem: 38.7497, boylam: 28.4047 }, // GeoNames 306537
    { ad: "Kula", enlem: 38.5473, boylam: 28.6498 }, // GeoNames 305810
    { ad: "Salihli", enlem: 38.4826, boylam: 28.1477 }, // GeoNames 302043
    { ad: "Sarıgöl", enlem: 38.2395, boylam: 28.6966 }, // GeoNames 301731
    { ad: "Saruhanlı", enlem: 38.7345, boylam: 27.5681 }, // GeoNames 301492
    { ad: "Selendi", enlem: 38.7444, boylam: 28.8678 }, // GeoNames 301251
    { ad: "Soma", enlem: 39.1855, boylam: 27.6094 }, // GeoNames 300371
    { ad: "Şehzadeler", enlem: 38.612, boylam: 27.4265 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Turgutlu", enlem: 38.4953, boylam: 27.6997 }, // GeoNames 298806
    { ad: "Yunusemre", enlem: 38.612, boylam: 27.4265 }, // il merkezi (GeoNames'te bulunamadı)
  ],
  "Mardin": [
    { ad: "Artuklu", enlem: 37.3131, boylam: 40.7436 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Dargeçit", enlem: 37.5462, boylam: 41.7165 }, // GeoNames 317587
    { ad: "Derik", enlem: 37.3634, boylam: 40.2647 }, // GeoNames 316899
    { ad: "Kızıltepe", enlem: 37.1884, boylam: 40.5772 }, // GeoNames 307084
    { ad: "Mazıdağı", enlem: 37.478, boylam: 40.4815 }, // GeoNames 304734
    { ad: "Midyat", enlem: 37.4191, boylam: 41.3391 }, // GeoNames 304382
    { ad: "Nusaybin", enlem: 37.0703, boylam: 41.2146 }, // GeoNames 303750
    { ad: "Ömerli", enlem: 37.399, boylam: 40.9544 }, // GeoNames 303532
    { ad: "Savur", enlem: 37.5354, boylam: 40.8788 }, // GeoNames 301431
    { ad: "Yeşilli", enlem: 37.3381, boylam: 40.8174 }, // GeoNames 296832
  ],
  "Mersin": [
    { ad: "Akdeniz", enlem: 36.812, boylam: 34.6389 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Anamur", enlem: 36.0751, boylam: 32.8369 }, // GeoNames 323828
    { ad: "Aydıncık", enlem: 36.1437, boylam: 33.3202 }, // GeoNames 322826
    { ad: "Bozyazı", enlem: 36.1082, boylam: 32.9611 }, // GeoNames 320552
    { ad: "Çamlıyayla", enlem: 37.1665, boylam: 34.593 }, // GeoNames 319591
    { ad: "Erdemli", enlem: 36.605, boylam: 34.3084 }, // GeoNames 315515
    { ad: "Gülnar", enlem: 36.3415, boylam: 33.3992 }, // GeoNames 313669
    { ad: "Mezitli", enlem: 36.7454, boylam: 34.5226 }, // GeoNames 304418
    { ad: "Mut", enlem: 36.6439, boylam: 33.4389 }, // GeoNames 304013
    { ad: "Silifke", enlem: 36.3778, boylam: 33.9344 }, // GeoNames 300808
    { ad: "Tarsus", enlem: 36.9177, boylam: 34.8928 }, // GeoNames 299817
    { ad: "Toroslar", enlem: 36.812, boylam: 34.6389 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Yenişehir", enlem: 36.812, boylam: 34.6389 }, // il merkezi (GeoNames'te bulunamadı)
  ],
  "Muğla": [
    { ad: "Bodrum", enlem: 37.0383, boylam: 27.4292 }, // GeoNames 320995
    { ad: "Dalaman", enlem: 36.7659, boylam: 28.8028 }, // GeoNames 447273
    { ad: "Datça", enlem: 36.7378, boylam: 27.6842 }, // GeoNames 317543
    { ad: "Fethiye", enlem: 36.6404, boylam: 29.1276 }, // GeoNames 314967
    { ad: "Kavaklıdere", enlem: 37.4446, boylam: 28.3628 }, // GeoNames 308776
    { ad: "Köyceğiz", enlem: 37.2181, boylam: 28.3665 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Marmaris", enlem: 36.855, boylam: 28.2742 }, // GeoNames 304782
    { ad: "Menteşe", enlem: 37.2181, boylam: 28.3665 }, // GeoNames 304184
    { ad: "Milas", enlem: 37.3164, boylam: 27.7839 }, // GeoNames 304355
    { ad: "Ortaca", enlem: 36.8391, boylam: 28.7646 }, // GeoNames 303354
    { ad: "Seydikemer", enlem: 37.2181, boylam: 28.3665 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ula", enlem: 37.1049, boylam: 28.4167 }, // GeoNames 298485
    { ad: "Yatağan", enlem: 37.3402, boylam: 28.1428 }, // GeoNames 297564
  ],
  "Muş": [
    { ad: "Bulanık", enlem: 39.0866, boylam: 42.2716 }, // GeoNames 320448
    { ad: "Hasköy", enlem: 38.6823, boylam: 41.6785 }, // GeoNames 312416
    { ad: "Korkut", enlem: 38.7339, boylam: 41.784 }, // GeoNames 306476
    { ad: "Malazgirt", enlem: 39.1465, boylam: 42.5354 }, // GeoNames 304916
    { ad: "Merkez", enlem: 38.7316, boylam: 41.4848 }, // il merkezi (Merkez ilçe)
    { ad: "Varto", enlem: 39.1737, boylam: 41.454 }, // GeoNames 298088
  ],
  "Nevşehir": [
    { ad: "Acıgöl", enlem: 38.5503, boylam: 34.5092 }, // GeoNames 325449
    { ad: "Avanos", enlem: 38.715, boylam: 34.8467 }, // GeoNames 322965
    { ad: "Derinkuyu", enlem: 38.3751, boylam: 34.7342 }, // GeoNames 316877
    { ad: "Gülşehir", enlem: 38.7459, boylam: 34.6252 }, // GeoNames 313658
    { ad: "Hacıbektaş", enlem: 38.9408, boylam: 34.5577 }, // GeoNames 313110
    { ad: "Kozaklı", enlem: 39.2214, boylam: 34.8506 }, // GeoNames 306115
    { ad: "Merkez", enlem: 38.625, boylam: 34.7122 }, // il merkezi (Merkez ilçe)
    { ad: "Ürgüp", enlem: 38.6296, boylam: 34.912 }, // GeoNames 298326
  ],
  "Niğde": [
    { ad: "Altunhisar", enlem: 37.9916, boylam: 34.3733 }, // GeoNames 323927
    { ad: "Bor", enlem: 37.8906, boylam: 34.5589 }, // GeoNames 320871
    { ad: "Çamardı", enlem: 37.8322, boylam: 34.9814 }, // GeoNames 319707
    { ad: "Çiftlik", enlem: 38.1758, boylam: 34.4853 }, // GeoNames 318581
    { ad: "Merkez", enlem: 37.9658, boylam: 34.6793 }, // il merkezi (Merkez ilçe)
    { ad: "Ulukışla", enlem: 37.5478, boylam: 34.4853 }, // GeoNames 298414
  ],
  "Ordu": [
    { ad: "Akkuş", enlem: 40.7931, boylam: 37.0164 }, // GeoNames 752437
    { ad: "Altınordu", enlem: 40.984, boylam: 37.8735 }, // GeoNames 10402306
    { ad: "Aybastı", enlem: 40.6867, boylam: 37.3992 }, // GeoNames 751503
    { ad: "Çamaş", enlem: 40.902, boylam: 37.5279 }, // GeoNames 749916
    { ad: "Çatalpınar", enlem: 40.879, boylam: 37.4535 }, // GeoNames 7581514
    { ad: "Çaybaşı", enlem: 41.0171, boylam: 37.098 }, // GeoNames 749518
    { ad: "Fatsa", enlem: 41.0278, boylam: 37.5014 }, // GeoNames 747155
    { ad: "Gölköy", enlem: 40.6869, boylam: 37.6154 }, // GeoNames 746628
    { ad: "Gülyalı", enlem: 40.9615, boylam: 38.0494 }, // GeoNames 738583
    { ad: "Gürgentepe", enlem: 40.7857, boylam: 37.5897 }, // GeoNames 746252
    { ad: "İkizce", enlem: 41.0583, boylam: 37.0803 }, // GeoNames 745364
    { ad: "Kabadüz", enlem: 40.861, boylam: 37.8847 }, // GeoNames 745007
    { ad: "Kabataş", enlem: 40.75, boylam: 37.45 }, // GeoNames 744958
    { ad: "Korgan", enlem: 40.8247, boylam: 37.3467 }, // GeoNames 742658
    { ad: "Kumru", enlem: 40.8744, boylam: 37.2639 }, // GeoNames 742238
    { ad: "Mesudiye", enlem: 40.4545, boylam: 37.7735 }, // GeoNames 741570
    { ad: "Perşembe", enlem: 41.0656, boylam: 37.7714 }, // GeoNames 740605
    { ad: "Ulubey", enlem: 40.8686, boylam: 37.754 }, // GeoNames 738444
    { ad: "Ünye", enlem: 41.1314, boylam: 37.2825 }, // GeoNames 738349
  ],
  "Osmaniye": [
    { ad: "Bahçe", enlem: 37.1972, boylam: 36.5766 }, // GeoNames 322391
    { ad: "Düziçi", enlem: 37.2422, boylam: 36.4548 }, // GeoNames 312523
    { ad: "Hasanbeyli", enlem: 37.1284, boylam: 36.5461 }, // GeoNames 312504
    { ad: "Kadirli", enlem: 37.3739, boylam: 36.0961 }, // GeoNames 310892
    { ad: "Merkez", enlem: 37.0742, boylam: 36.2478 }, // il merkezi (Merkez ilçe)
    { ad: "Sumbas", enlem: 37.4513, boylam: 36.0235 }, // GeoNames 316223
    { ad: "Toprakkale", enlem: 37.0686, boylam: 36.1466 }, // GeoNames 298977
  ],
  "Rize": [
    { ad: "Ardeşen", enlem: 41.1906, boylam: 40.9793 }, // GeoNames 751949
    { ad: "Çamlıhemşin", enlem: 41.0476, boylam: 41 }, // GeoNames 749841
    { ad: "Çayeli", enlem: 41.0861, boylam: 40.7221 }, // GeoNames 749502
    { ad: "Derepazarı", enlem: 41.024, boylam: 40.4233 }, // GeoNames 748230
    { ad: "Fındıklı", enlem: 41.269, boylam: 41.14 }, // GeoNames 747090
    { ad: "Güneysu", enlem: 40.9813, boylam: 40.6046 }, // GeoNames 746308
    { ad: "Hemşin", enlem: 41.0478, boylam: 40.8984 }, // GeoNames 740941
    { ad: "İkizdere", enlem: 40.7748, boylam: 40.5523 }, // GeoNames 745362
    { ad: "İyidere", enlem: 41.0119, boylam: 40.3618 }, // GeoNames 745030
    { ad: "Kalkandere", enlem: 40.9205, boylam: 40.4369 }, // GeoNames 744767
    { ad: "Merkez", enlem: 41.0208, boylam: 40.5219 }, // il merkezi (Merkez ilçe)
    { ad: "Pazar", enlem: 41.1802, boylam: 40.8866 }, // GeoNames 740675
  ],
  "Sakarya": [
    { ad: "Adapazarı", enlem: 40.7806, boylam: 30.4033 }, // GeoNames 752850
    { ad: "Akyazı", enlem: 40.685, boylam: 30.6222 }, // GeoNames 752288
    { ad: "Arifiye", enlem: 40.7004, boylam: 30.3508 }, // GeoNames 751922
    { ad: "Erenler", enlem: 40.755, boylam: 30.3934 }, // GeoNames 747459
    { ad: "Ferizli", enlem: 40.9408, boylam: 30.4858 }, // GeoNames 747135
    { ad: "Geyve", enlem: 40.5075, boylam: 30.2925 }, // GeoNames 746898
    { ad: "Hendek", enlem: 40.7994, boylam: 30.7481 }, // GeoNames 745664
    { ad: "Karapürçek", enlem: 40.6419, boylam: 30.5394 }, // GeoNames 744110
    { ad: "Karasu", enlem: 41.1044, boylam: 30.6966 }, // GeoNames 744092
    { ad: "Kaynarca", enlem: 41.0308, boylam: 30.3075 }, // GeoNames 743633
    { ad: "Kocaali", enlem: 41.0534, boylam: 30.8528 }, // GeoNames 742902
    { ad: "Pamukova", enlem: 40.5081, boylam: 30.1673 }, // GeoNames 740729
    { ad: "Sapanca", enlem: 40.6914, boylam: 30.2674 }, // GeoNames 740230
    { ad: "Serdivan", enlem: 40.7738, boylam: 30.3801 }, // GeoNames 739788
    { ad: "Söğütlü", enlem: 40.9059, boylam: 30.4745 }, // GeoNames 739425
    { ad: "Taraklı", enlem: 40.3969, boylam: 30.4928 }, // GeoNames 739107
  ],
  "Samsun": [
    { ad: "19 Mayıs", enlem: 41.5011, boylam: 36.0689 }, // GeoNames 751103
    { ad: "Alaçam", enlem: 41.6056, boylam: 35.5981 }, // GeoNames 752259
    { ad: "Asarcık", enlem: 41.0356, boylam: 36.2356 }, // GeoNames 750615
    { ad: "Atakum", enlem: 41.2798, boylam: 36.3361 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Ayvacık", enlem: 40.9911, boylam: 36.6314 }, // GeoNames 751427
    { ad: "Bafra", enlem: 41.5678, boylam: 35.9069 }, // GeoNames 751335
    { ad: "Canik", enlem: 41.2798, boylam: 36.3361 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Çarşamba", enlem: 41.1989, boylam: 36.7219 }, // GeoNames 749704
    { ad: "Havza", enlem: 40.9706, boylam: 35.6622 }, // GeoNames 745714
    { ad: "İlkadım", enlem: 41.2873, boylam: 36.2905 }, // GeoNames 10376352
    { ad: "Kavak", enlem: 41.0783, boylam: 36.0425 }, // GeoNames 743851
    { ad: "Ladik", enlem: 40.9106, boylam: 35.8919 }, // GeoNames 741892
    { ad: "Salıpazarı", enlem: 41.084, boylam: 36.8304 }, // GeoNames 7700531
    { ad: "Tekkeköy", enlem: 41.2117, boylam: 36.46 }, // GeoNames 738907
    { ad: "Terme", enlem: 41.2092, boylam: 36.9739 }, // GeoNames 738803
    { ad: "Vezirköprü", enlem: 41.1436, boylam: 35.4547 }, // GeoNames 738167
    { ad: "Yakakent", enlem: 41.6325, boylam: 35.5289 }, // GeoNames 738085
  ],
  "Siirt": [
    { ad: "Baykan", enlem: 38.1575, boylam: 41.7733 }, // GeoNames 321750
    { ad: "Eruh", enlem: 37.7418, boylam: 42.1742 }, // GeoNames 315378
    { ad: "Kurtalan", enlem: 37.9253, boylam: 41.6849 }, // GeoNames 305532
    { ad: "Merkez", enlem: 37.9293, boylam: 41.9413 }, // il merkezi (Merkez ilçe)
    { ad: "Pervari", enlem: 37.9357, boylam: 42.5493 }, // GeoNames 302720
    { ad: "Şirvan", enlem: 38.0625, boylam: 42.0252 }, // GeoNames 300632
    { ad: "Tillo", enlem: 37.9491, boylam: 42.0121 }, // GeoNames 322810
  ],
  "Sinop": [
    { ad: "Ayancık", enlem: 41.9447, boylam: 34.5861 }, // GeoNames 751516
    { ad: "Boyabat", enlem: 41.4689, boylam: 34.7667 }, // GeoNames 750468
    { ad: "Dikmen", enlem: 41.65, boylam: 35.2667 }, // GeoNames 743230
    { ad: "Durağan", enlem: 41.4158, boylam: 35.0544 }, // GeoNames 747826
    { ad: "Erfelek", enlem: 41.8793, boylam: 34.9184 }, // GeoNames 747449
    { ad: "Gerze", enlem: 41.8036, boylam: 35.2011 }, // GeoNames 746913
    { ad: "Merkez", enlem: 42.0268, boylam: 35.1625 }, // il merkezi (Merkez ilçe)
    { ad: "Saraydüzü", enlem: 41.3287, boylam: 34.8469 }, // GeoNames 740177
    { ad: "Türkeli", enlem: 41.9476, boylam: 34.3386 }, // GeoNames 738614
  ],
  "Sivas": [
    { ad: "Akıncılar", enlem: 40.0717, boylam: 38.3433 }, // GeoNames 752476
    { ad: "Altınyayla", enlem: 39.2725, boylam: 36.751 }, // GeoNames 323886
    { ad: "Divriği", enlem: 39.371, boylam: 38.1137 }, // GeoNames 316544
    { ad: "Doğanşar", enlem: 40.2084, boylam: 37.5312 }, // GeoNames 747986
    { ad: "Gemerek", enlem: 39.1834, boylam: 36.0719 }, // GeoNames 314665
    { ad: "Gölova", enlem: 40.0619, boylam: 38.6067 }, // GeoNames 746603
    { ad: "Gürün", enlem: 38.7223, boylam: 37.271 }, // GeoNames 313314
    { ad: "Hafik", enlem: 39.8564, boylam: 37.3864 }, // GeoNames 312894
    { ad: "İmranlı", enlem: 39.8754, boylam: 38.1136 }, // GeoNames 311433
    { ad: "Kangal", enlem: 39.2335, boylam: 37.3911 }, // GeoNames 310554
    { ad: "Koyulhisar", enlem: 40.3018, boylam: 37.8234 }, // GeoNames 742499
    { ad: "Merkez", enlem: 39.7483, boylam: 37.0161 }, // il merkezi (Merkez ilçe)
    { ad: "Suşehri", enlem: 40.16, boylam: 38.0841 }, // GeoNames 739209
    { ad: "Şarkışla", enlem: 39.3519, boylam: 36.4098 }, // GeoNames 301537
    { ad: "Ulaş", enlem: 39.4449, boylam: 37.039 }, // GeoNames 298471
    { ad: "Yıldızeli", enlem: 39.8664, boylam: 36.5989 }, // GeoNames 296708
    { ad: "Zara", enlem: 39.8978, boylam: 37.7583 }, // GeoNames 295982
  ],
  "Şanlıurfa": [
    { ad: "Akçakale", enlem: 36.7111, boylam: 38.9475 }, // GeoNames 324944
    { ad: "Birecik", enlem: 37.0258, boylam: 37.9784 }, // GeoNames 321062
    { ad: "Bozova", enlem: 37.3625, boylam: 38.5267 }, // GeoNames 320581
    { ad: "Ceylanpınar", enlem: 36.8472, boylam: 40.05 }, // GeoNames 318668
    { ad: "Eyyübiye", enlem: 37.1671, boylam: 38.7939 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Halfeti", enlem: 37.2453, boylam: 37.8687 }, // GeoNames 312862
    { ad: "Haliliye", enlem: 37.1671, boylam: 38.7939 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Harran", enlem: 36.86, boylam: 39.0314 }, // GeoNames 312531
    { ad: "Hilvan", enlem: 37.5869, boylam: 38.955 }, // GeoNames 312134
    { ad: "Karaköprü", enlem: 37.2036, boylam: 38.7994 }, // GeoNames 309653
    { ad: "Siverek", enlem: 37.755, boylam: 39.3167 }, // GeoNames 300614
    { ad: "Suruç", enlem: 36.9761, boylam: 38.4253 }, // GeoNames 300075
    { ad: "Viranşehir", enlem: 37.2235, boylam: 39.7552 }, // GeoNames 298033
  ],
  "Şırnak": [
    { ad: "Beytüşşebap", enlem: 37.5632, boylam: 43.1658 }, // GeoNames 321184
    { ad: "Cizre", enlem: 37.3302, boylam: 42.1848 }, // GeoNames 318253
    { ad: "Güçlükonak", enlem: 37.4696, boylam: 41.9059 }, // GeoNames 313794
    { ad: "İdil", enlem: 37.3348, boylam: 41.8894 }, // GeoNames 311704
    { ad: "Merkez", enlem: 37.5139, boylam: 42.4543 }, // il merkezi (Merkez ilçe)
    { ad: "Silopi", enlem: 37.2438, boylam: 42.4635 }, // GeoNames 300797
    { ad: "Uludere", enlem: 37.4407, boylam: 42.8524 }, // GeoNames 298433
  ],
  "Tekirdağ": [
    { ad: "Çerkezköy", enlem: 41.2863, boylam: 27.9994 }, // GeoNames 749274
    { ad: "Çorlu", enlem: 41.1592, boylam: 27.8 }, // GeoNames 748893
    { ad: "Ergene", enlem: 40.9781, boylam: 27.511 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Hayrabolu", enlem: 41.2131, boylam: 27.1069 }, // GeoNames 745697
    { ad: "Kapaklı", enlem: 41.3291, boylam: 27.9806 }, // GeoNames 744687
    { ad: "Malkara", enlem: 40.89, boylam: 26.9011 }, // GeoNames 741771
    { ad: "Marmaraereğlisi", enlem: 40.9691, boylam: 27.955 }, // GeoNames 741725
    { ad: "Muratlı", enlem: 41.1722, boylam: 27.4992 }, // GeoNames 741438
    { ad: "Saray", enlem: 41.4443, boylam: 27.9219 }, // GeoNames 740205
    { ad: "Süleymanpaşa", enlem: 40.9781, boylam: 27.511 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Şarköy", enlem: 40.614, boylam: 27.1156 }, // GeoNames 740000
  ],
  "Tokat": [
    { ad: "Almus", enlem: 40.3758, boylam: 36.9044 }, // GeoNames 752083
    { ad: "Artova", enlem: 40.1158, boylam: 36.3001 }, // GeoNames 751818
    { ad: "Başçiftlik", enlem: 40.5469, boylam: 37.1692 }, // GeoNames 751036
    { ad: "Erbaa", enlem: 40.6689, boylam: 36.5675 }, // GeoNames 747489
    { ad: "Merkez", enlem: 40.3139, boylam: 36.5544 }, // il merkezi (Merkez ilçe)
    { ad: "Niksar", enlem: 40.5917, boylam: 36.9517 }, // GeoNames 741304
    { ad: "Pazar", enlem: 40.2765, boylam: 36.2835 }, // GeoNames 740677
    { ad: "Reşadiye", enlem: 40.3919, boylam: 37.3375 }, // GeoNames 740490
    { ad: "Sulusaray", enlem: 39.9939, boylam: 36.084 }, // GeoNames 300141
    { ad: "Turhal", enlem: 40.3875, boylam: 36.0811 }, // GeoNames 738618
    { ad: "Yeşilyurt", enlem: 40.0064, boylam: 36.2207 }, // GeoNames 323751
    { ad: "Zile", enlem: 40.3031, boylam: 35.8864 }, // GeoNames 737054
  ],
  "Trabzon": [
    { ad: "Akçaabat", enlem: 41.0212, boylam: 39.5715 }, // GeoNames 752627
    { ad: "Araklı", enlem: 40.9385, boylam: 40.0584 }, // GeoNames 751971
    { ad: "Arsin", enlem: 40.9527, boylam: 39.9267 }, // GeoNames 751838
    { ad: "Beşikdüzü", enlem: 41.052, boylam: 39.2329 }, // GeoNames 750735
    { ad: "Çarşıbaşı", enlem: 41.0828, boylam: 39.3828 }, // GeoNames 749701
    { ad: "Çaykara", enlem: 40.7427, boylam: 40.2317 }, // GeoNames 749456
    { ad: "Dernekpazarı", enlem: 40.7966, boylam: 40.2446 }, // GeoNames 748200
    { ad: "Düzköy", enlem: 40.8746, boylam: 39.4154 }, // GeoNames 747751
    { ad: "Hayrat", enlem: 40.8853, boylam: 40.365 }, // GeoNames 745693
    { ad: "Köprübaşı", enlem: 40.8069, boylam: 40.1144 }, // GeoNames 742686
    { ad: "Maçka", enlem: 40.8107, boylam: 39.6046 }, // GeoNames 741850
    { ad: "Of", enlem: 40.9406, boylam: 40.2592 }, // GeoNames 741240
    { ad: "Ortahisar", enlem: 41.005, boylam: 39.7269 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Sürmene", enlem: 40.9385, boylam: 40.0584 }, // GeoNames 751971
    { ad: "Şalpazarı", enlem: 40.9383, boylam: 39.1901 }, // GeoNames 740303
    { ad: "Tonya", enlem: 40.884, boylam: 39.2849 }, // GeoNames 738715
    { ad: "Vakfıkebir", enlem: 41.0458, boylam: 39.2764 }, // GeoNames 738228
    { ad: "Yomra", enlem: 40.9533, boylam: 39.8555 }, // GeoNames 737421
  ],
  "Tunceli": [
    { ad: "Çemişgezek", enlem: 39.0554, boylam: 38.9075 }, // GeoNames 318849
    { ad: "Hozat", enlem: 39.1003, boylam: 39.2082 }, // GeoNames 311869
    { ad: "Mazgirt", enlem: 39.0178, boylam: 39.6006 }, // GeoNames 304738
    { ad: "Merkez", enlem: 39.0992, boylam: 39.5435 }, // il merkezi (Merkez ilçe)
    { ad: "Nazımiye", enlem: 39.1799, boylam: 39.8284 }, // GeoNames 303872
    { ad: "Ovacık", enlem: 39.3526, boylam: 39.2089 }, // GeoNames 303107
    { ad: "Pertek", enlem: 38.8657, boylam: 39.3227 }, // GeoNames 302724
    { ad: "Pülümür", enlem: 39.4845, boylam: 39.8953 }, // GeoNames 302469
  ],
  "Uşak": [
    { ad: "Banaz", enlem: 38.7371, boylam: 29.7519 }, // GeoNames 322051
    { ad: "Eşme", enlem: 38.3998, boylam: 28.969 }, // GeoNames 315183
    { ad: "Karahallı", enlem: 38.3208, boylam: 29.5303 }, // GeoNames 309821
    { ad: "Merkez", enlem: 38.6735, boylam: 29.4058 }, // il merkezi (Merkez ilçe)
    { ad: "Sivaslı", enlem: 38.4994, boylam: 29.6836 }, // GeoNames 300616
    { ad: "Ulubey", enlem: 38.4199, boylam: 29.2913 }, // GeoNames 298454
  ],
  "Van": [
    { ad: "Bahçesaray", enlem: 38.1246, boylam: 42.7983 }, // GeoNames 322324
    { ad: "Başkale", enlem: 38.0453, boylam: 44.0172 }, // GeoNames 321940
    { ad: "Çaldıran", enlem: 39.1432, boylam: 43.9107 }, // GeoNames 319823
    { ad: "Çatak", enlem: 38.0029, boylam: 43.0524 }, // GeoNames 319345
    { ad: "Edremit", enlem: 38.4207, boylam: 43.2589 }, // GeoNames 301529
    { ad: "Erciş", enlem: 39.0259, boylam: 43.3596 }, // GeoNames 315530
    { ad: "Gevaş", enlem: 38.2921, boylam: 43.1019 }, // GeoNames 314557
    { ad: "Gürpınar", enlem: 38.3237, boylam: 43.4099 }, // GeoNames 313328
    { ad: "İpekyolu", enlem: 38.4946, boylam: 43.3832 }, // il merkezi (GeoNames'te bulunamadı)
    { ad: "Muradiye", enlem: 38.9857, boylam: 43.7531 }, // GeoNames 304138
    { ad: "Özalp", enlem: 38.6546, boylam: 43.9887 }, // GeoNames 303022
    { ad: "Saray", enlem: 38.6469, boylam: 44.1612 }, // GeoNames 301855
    { ad: "Tuşba", enlem: 38.4946, boylam: 43.3832 }, // il merkezi (GeoNames'te bulunamadı)
  ],
  "Yalova": [
    { ad: "Altınova", enlem: 40.6949, boylam: 29.5099 }, // GeoNames 752042
    { ad: "Armutlu", enlem: 40.5194, boylam: 28.8281 }, // GeoNames 751881
    { ad: "Çınarcık", enlem: 40.6454, boylam: 29.1245 }, // GeoNames 749075
    { ad: "Çiftlikköy", enlem: 40.6603, boylam: 29.3236 }, // GeoNames 749163
    { ad: "Merkez", enlem: 40.655, boylam: 29.2769 }, // il merkezi (Merkez ilçe)
    { ad: "Termal", enlem: 40.6078, boylam: 29.1736 }, // GeoNames 8384779
  ],
  "Yozgat": [
    { ad: "Akdağmadeni", enlem: 39.6603, boylam: 35.8836 }, // GeoNames 324768
    { ad: "Aydıncık", enlem: 40.1273, boylam: 35.2876 }, // GeoNames 751491
    { ad: "Boğazlıyan", enlem: 39.1888, boylam: 35.2454 }, // GeoNames 320946
    { ad: "Çandır", enlem: 39.2445, boylam: 35.514 }, // GeoNames 319472
    { ad: "Çayıralan", enlem: 39.3028, boylam: 35.6439 }, // GeoNames 319069
    { ad: "Çekerek", enlem: 40.0731, boylam: 35.4947 }, // GeoNames 749392
    { ad: "Kadışehri", enlem: 39.9957, boylam: 35.7919 }, // GeoNames 310888
    { ad: "Merkez", enlem: 39.82, boylam: 34.8044 }, // il merkezi (Merkez ilçe)
    { ad: "Saraykent", enlem: 39.6936, boylam: 35.5111 }, // GeoNames 301829
    { ad: "Sarıkaya", enlem: 39.4936, boylam: 35.3769 }, // GeoNames 301680
    { ad: "Sorgun", enlem: 39.8101, boylam: 35.186 }, // GeoNames 300352
    { ad: "Şefaatli", enlem: 39.5043, boylam: 34.7563 }, // GeoNames 301353
    { ad: "Yenifakılı", enlem: 39.2114, boylam: 35.0004 }, // GeoNames 297099
    { ad: "Yerköy", enlem: 39.6381, boylam: 34.4672 }, // GeoNames 296895
  ],
  "Zonguldak": [
    { ad: "Alaplı", enlem: 41.1814, boylam: 31.3851 }, // GeoNames 752184
    { ad: "Çaycuma", enlem: 41.4264, boylam: 32.0756 }, // GeoNames 749508
    { ad: "Devrek", enlem: 41.2192, boylam: 31.9558 }, // GeoNames 748167
    { ad: "Ereğli", enlem: 41.2826, boylam: 31.4181 }, // GeoNames 747471
    { ad: "Gökçebey", enlem: 41.3058, boylam: 32.1423 }, // GeoNames 746821
    { ad: "Kilimli", enlem: 41.4911, boylam: 31.8386 }, // GeoNames 743337
    { ad: "Kozlu", enlem: 41.4319, boylam: 31.7458 }, // GeoNames 742437
    { ad: "Merkez", enlem: 41.4514, boylam: 31.7931 }, // il merkezi (Merkez ilçe)
  ],
};
