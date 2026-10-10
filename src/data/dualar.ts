// Namazda okunan, Kur'an dışındaki dualar: okunuş ve anlam, kaynak hadisin Türkçe çevirisinden.
// Kaynak: github.com/fawazahmed0/hadith-api (Unlicense), Türkçe çeviriler. Metinler olduğu gibi alındı; yalnızca
// sayısallaştırma hataları düzeltildi (Ettehiyyatü: "salihln" → "salihin", "en ne" → "enne", "Allah\n" → "Allah'ın").
// Kunut duaları bu kaynakta bulunamadığı için eklenmedi.

export interface Dua {
  id: string;
  ad: string;
  aciklama: string; // namazda nerede okunduğu
  okunus: string;
  anlam: string;
  kaynak: string;
}

export const DUALAR: readonly Dua[] = [
  {
    id: 'subhaneke',
    ad: 'Sübhâneke',
    aciklama: "İftitah tekbirinden sonra, Fâtiha'dan önce",
    okunus: 'Sübhaneke Allahumme ve bi hamdike ve tebareke ismuke ve teala cedduke ve la ilahe ğayruke.',
    anlam:
      "Allahım! Senin hamdine bürünerek, Seni bütün eksikliklerden tenzih ederim. İsmin çok büyüktür. Azametin de çok yücedir. Senden başka ibadete layık hiç bir ma'bud yoktur.",
    kaynak: 'İbn Mâce, 804',
  },
  {
    id: 'ettehiyyatu',
    ad: 'Ettehiyyâtü',
    aciklama: 'Oturuşlarda (teşehhüd)',
    okunus:
      'et-Tahiyyatu lillahi vessalavatu vettayyibat; esselamu aleyke eyyuhennebiyyu ve rahmetullahi ve berekatuh; esselamu aleyna ve ala ibadillahissalihin. Eşhedu en la ilahe illallah ve eşhedu enne Muhammeden abduhu ve rasuluh',
    anlam:
      "Bütün esenlik dilekleri, güzel dualar ve övgüler yalnız Allah'ındır. Ey Nebi! Selam sana, Allah'ın rahmetleri ve bereketleri de üzerine olsun. Selam bizim ve Allah'ın salih kullarının üzerine. Şehadet ederim ki Allah'tan başka hiçbir ilah yoktur ve yine şehadet ederim ki Muhammed onun kulu ve Rasulüdür.",
    kaynak: 'Buhârî, 6265',
  },
  {
    id: 'salli',
    ad: 'Allâhümme Salli',
    aciklama: "Son oturuşta Ettehiyyâtü'den sonra",
    okunus: 'Allahumme salli ala Muhammedin ve ala ali Muhammed; kema salleyte ala İbrahime ve ala ali İbrahim; inneke Hamidun Mecid.',
    anlam:
      "Allah'ım, İbrahim'e ve İbrahim'in aline salat getirdiğin gibi, Muhammed'e ve Muhammed'in aline de salat getir. Çünkü sen Hamidsin, Mecidsin.",
    kaynak: 'Buhârî, 3370',
  },
  {
    id: 'barik',
    ad: 'Allâhümme Bârik',
    aciklama: "Allâhümme Salli'den sonra",
    okunus: 'Allahumme barik ala Muhammedin ve ala ali Muhammed; kema barekte ala İbrahime ve ala ali İbrahim, inneke Hamidun Mecid.',
    anlam:
      "Allah'ım, İbrahim'e ve İbrahim'in aline bereketler ihsan ettiğin gibi, Muhammed'e ve Muhammed'in aline de bereketler ihsan eyle. Çünkü sen Hamidsin Mecidsin.",
    kaynak: 'Buhârî, 3370',
  },
];
