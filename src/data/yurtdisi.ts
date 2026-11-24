// Yurt dışında, Türk nüfusunun yoğun olduğu şehirler ve koordinatları (Türkçe kullanılan adlarıyla).
//
// Kaynak: GeoNames (https://www.geonames.org), CC BY 4.0; veriye all-the-cities@3.1.0 npm paketi
// (cities1000) üzerinden erişildi, bu paket uygulamaya dahil değildir. Aynı adlı yerleşimlerden nüfusu en büyük
// olan seçildi. Her satırdaki numara GeoNames kimliğidir. Koordinatlar 4 ondalığa yuvarlandı.

import type { Il } from './iller';

export const YURT_DISI: Record<string, readonly Il[]> = {
  "Almanya": [
    { ad: "Berlin", enlem: 52.5244, boylam: 13.4105 }, // GeoNames 2950159
    { ad: "Hamburg", enlem: 53.5507, boylam: 9.993 }, // GeoNames 2911298
    { ad: "Münih", enlem: 48.1374, boylam: 11.5755 }, // GeoNames 2867714
    { ad: "Köln", enlem: 50.9333, boylam: 6.95 }, // GeoNames 2886242
    { ad: "Frankfurt", enlem: 50.1155, boylam: 8.6842 }, // GeoNames 2925533
    { ad: "Stuttgart", enlem: 48.7823, boylam: 9.177 }, // GeoNames 2825297
    { ad: "Düsseldorf", enlem: 51.2217, boylam: 6.7762 }, // GeoNames 2934246
    { ad: "Dortmund", enlem: 51.5149, boylam: 7.466 }, // GeoNames 2935517
    { ad: "Essen", enlem: 51.4566, boylam: 7.0123 }, // GeoNames 2928810
    { ad: "Duisburg", enlem: 51.4325, boylam: 6.7652 }, // GeoNames 2934691
    { ad: "Bochum", enlem: 51.4817, boylam: 7.2165 }, // GeoNames 2947416
    { ad: "Wuppertal", enlem: 51.2563, boylam: 7.1482 }, // GeoNames 2805753
    { ad: "Bielefeld", enlem: 52.0333, boylam: 8.5333 }, // GeoNames 2949186
    { ad: "Bonn", enlem: 50.7344, boylam: 7.0955 }, // GeoNames 2946447
    { ad: "Mannheim", enlem: 49.4891, boylam: 8.4669 }, // GeoNames 2873891
    { ad: "Nürnberg", enlem: 49.4542, boylam: 11.0775 }, // GeoNames 2861650
    { ad: "Hannover", enlem: 52.3705, boylam: 9.7332 }, // GeoNames 2910831
    { ad: "Bremen", enlem: 53.0758, boylam: 8.8072 }, // GeoNames 2944388
    { ad: "Gelsenkirchen", enlem: 51.5051, boylam: 7.0965 }, // GeoNames 2921466
    { ad: "Mönchengladbach", enlem: 51.1854, boylam: 6.4417 }, // GeoNames 2869894
    { ad: "Aachen", enlem: 50.7766, boylam: 6.0834 }, // GeoNames 3247449
    { ad: "Augsburg", enlem: 48.3715, boylam: 10.8985 }, // GeoNames 2954172
    { ad: "Karlsruhe", enlem: 49.0094, boylam: 8.4044 }, // GeoNames 2892794
    { ad: "Wiesbaden", enlem: 50.0826, boylam: 8.2493 }, // GeoNames 2809346
    { ad: "Mainz", enlem: 49.9842, boylam: 8.2791 }, // GeoNames 2874225
    { ad: "Kassel", enlem: 51.3167, boylam: 9.5 }, // GeoNames 2892518
    { ad: "Heilbronn", enlem: 49.1399, boylam: 9.2205 }, // GeoNames 2907669
    { ad: "Offenbach", enlem: 50.1006, boylam: 8.7665 }, // GeoNames 2857807
    { ad: "Leverkusen", enlem: 51.0303, boylam: 6.9843 }, // GeoNames 2878234
    { ad: "Hagen", enlem: 51.3608, boylam: 7.4717 }, // GeoNames 2912621
    { ad: "Krefeld", enlem: 51.3364, boylam: 6.5538 }, // GeoNames 2884509
    { ad: "Ulm", enlem: 48.3984, boylam: 9.9916 }, // GeoNames 2820256
    { ad: "Kiel", enlem: 54.3213, boylam: 10.1349 }, // GeoNames 2891122
    { ad: "Leipzig", enlem: 51.3396, boylam: 12.3713 }, // GeoNames 2879139
    { ad: "Dresden", enlem: 51.0509, boylam: 13.7383 }, // GeoNames 2935022
  ],
  "Hollanda": [
    { ad: "Amsterdam", enlem: 52.374, boylam: 4.8897 }, // GeoNames 2759794
    { ad: "Rotterdam", enlem: 51.9225, boylam: 4.4792 }, // GeoNames 2747891
    { ad: "Lahey", enlem: 52.0767, boylam: 4.2986 }, // GeoNames 2747373
    { ad: "Utrecht", enlem: 52.0908, boylam: 5.1222 }, // GeoNames 2745912
    { ad: "Eindhoven", enlem: 51.4408, boylam: 5.4778 }, // GeoNames 2756253
    { ad: "Zaandam", enlem: 52.4385, boylam: 4.8264 }, // GeoNames 2744118
    { ad: "Arnhem", enlem: 51.98, boylam: 5.9111 }, // GeoNames 2759661
    { ad: "Enschede", enlem: 52.2183, boylam: 6.8958 }, // GeoNames 2756071
    { ad: "Deventer", enlem: 52.255, boylam: 6.1639 }, // GeoNames 2756987
    { ad: "Schiedam", enlem: 51.9192, boylam: 4.3889 }, // GeoNames 2747596
    { ad: "Tilburg", enlem: 51.5555, boylam: 5.0913 }, // GeoNames 2746301
    { ad: "Groningen", enlem: 53.2192, boylam: 6.5667 }, // GeoNames 2755251
  ],
  "Belçika": [
    { ad: "Brüksel", enlem: 50.8505, boylam: 4.3488 }, // GeoNames 2800866
    { ad: "Anvers", enlem: 51.2205, boylam: 4.4003 }, // GeoNames 2803138
    { ad: "Gent", enlem: 51.05, boylam: 3.7167 }, // GeoNames 2797656
    { ad: "Liège", enlem: 50.6337, boylam: 5.5675 }, // GeoNames 2792413
    { ad: "Charleroi", enlem: 50.4114, boylam: 4.4445 }, // GeoNames 2800481
    { ad: "Genk", enlem: 50.965, boylam: 5.5008 }, // GeoNames 2797670
    { ad: "Beringen", enlem: 51.0495, boylam: 5.2261 }, // GeoNames 2802170
  ],
  "Fransa": [
    { ad: "Paris", enlem: 48.8534, boylam: 2.3488 }, // GeoNames 2988507
    { ad: "Strazburg", enlem: 48.5839, boylam: 7.7455 }, // GeoNames 2973783
    { ad: "Lyon", enlem: 45.7485, boylam: 4.8467 }, // GeoNames 2996944
    { ad: "Marsilya", enlem: 43.297, boylam: 5.3811 }, // GeoNames 2995469
    { ad: "Bordo", enlem: 44.8404, boylam: -0.5805 }, // GeoNames 3031582
    { ad: "Metz", enlem: 49.1191, boylam: 6.1727 }, // GeoNames 2994160
    { ad: "Mulhouse", enlem: 47.752, boylam: 7.3287 }, // GeoNames 2991214
    { ad: "Nantes", enlem: 47.2172, boylam: -1.5534 }, // GeoNames 2990969
    { ad: "Grenoble", enlem: 45.1787, boylam: 5.7148 }, // GeoNames 3014728
    { ad: "Lille", enlem: 50.633, boylam: 3.0586 }, // GeoNames 2998324
    { ad: "Nancy", enlem: 48.6844, boylam: 6.185 }, // GeoNames 2990999
  ],
  "Avusturya": [
    { ad: "Viyana", enlem: 48.2085, boylam: 16.3721 }, // GeoNames 2761369
    { ad: "Linz", enlem: 48.3064, boylam: 14.2861 }, // GeoNames 2772400
    { ad: "Graz", enlem: 47.0667, boylam: 15.45 }, // GeoNames 2778067
    { ad: "Salzburg", enlem: 47.7994, boylam: 13.044 }, // GeoNames 2766824
    { ad: "Innsbruck", enlem: 47.2627, boylam: 11.3945 }, // GeoNames 2775220
    { ad: "Bregenz", enlem: 47.5031, boylam: 9.7471 }, // GeoNames 2781503
  ],
  "İsviçre": [
    { ad: "Zürih", enlem: 47.3667, boylam: 8.55 }, // GeoNames 2657896
    { ad: "Basel", enlem: 47.5584, boylam: 7.5733 }, // GeoNames 2661604
    { ad: "Bern", enlem: 46.9481, boylam: 7.4474 }, // GeoNames 2661552
    { ad: "Cenevre", enlem: 46.2022, boylam: 6.1457 }, // GeoNames 2660646
    { ad: "Lozan", enlem: 46.516, boylam: 6.6328 }, // GeoNames 2659994
  ],
  "Birleşik Krallık": [
    { ad: "Londra", enlem: 51.5085, boylam: -0.1257 }, // GeoNames 2643743
    { ad: "Manchester", enlem: 53.4809, boylam: -2.2374 }, // GeoNames 2643123
    { ad: "Birmingham", enlem: 52.4814, boylam: -1.8998 }, // GeoNames 2655603
  ],
  "Danimarka": [
    { ad: "Kopenhag", enlem: 55.6759, boylam: 12.5655 }, // GeoNames 2618425
    { ad: "Aarhus", enlem: 56.1567, boylam: 10.2108 }, // GeoNames 2624652
    { ad: "Odense", enlem: 55.3959, boylam: 10.3883 }, // GeoNames 2615876
  ],
  "İsveç": [
    { ad: "Stockholm", enlem: 59.3294, boylam: 18.0687 }, // GeoNames 2673730
    { ad: "Göteborg", enlem: 57.7072, boylam: 11.9668 }, // GeoNames 2711537
    { ad: "Malmö", enlem: 55.6059, boylam: 13.0007 }, // GeoNames 2692969
  ],
  "Norveç": [
    { ad: "Oslo", enlem: 59.9127, boylam: 10.7461 }, // GeoNames 3143244
  ],
  "KKTC": [
    { ad: "Lefkoşa", enlem: 35.1753, boylam: 33.3642 }, // GeoNames 146268
    { ad: "Girne", enlem: 35.3363, boylam: 33.3173 }, // GeoNames 146412
    { ad: "Gazimağusa", enlem: 35.1249, boylam: 33.9413 }, // GeoNames 146617
  ],
};
