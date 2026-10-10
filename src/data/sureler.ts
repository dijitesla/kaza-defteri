// Namaz sureleri ve namazda okunan Kur'an duaları.
// Kaynak: github.com/fawazahmed0/quran-api (Unlicense). Arapça: Tanzil (quran-simple); okunuş: Türkçe Latin
// harfli (tur-latinalphabet); meal: Diyanet İşleri meali (tur-diyanetisleri). Yayından önce meal izni netleştirilmeli.
export interface Ayet {
  no: number;
  arapca: string;
  okunus: string;
  meal: string;
}

export interface Sure {
  id: string;
  ad: string;
  sure: number; // sure numarası
  besmele: boolean; // başında besmele gösterilir
  ayetler: Ayet[];
}

export const SURELER: readonly Sure[] = [
  {
    id: "fatiha",
    ad: "Fâtiha Suresi",
    sure: 1,
    besmele: false,
    ayetler: [{"no": 1, "arapca": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "okunus": "Bismillahirrahmanirrahim", "meal": "Rahman ve Rahim olan Allah'ın adıyla"}, {"no": 2, "arapca": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "okunus": "El hamdü lillahi rabbil alemin", "meal": "Hamd, Alemlerin Rabbi Allah'a mahsustur"}, {"no": 3, "arapca": "الرَّحْمَٰنِ الرَّحِيمِ", "okunus": "Er rahmanir rahıym", "meal": "O Rahman ve Rahim'dir"}, {"no": 4, "arapca": "مَالِكِ يَوْمِ الدِّينِ", "okunus": "Maliki yevmid din", "meal": "Din Gününün sahibidir"}, {"no": 5, "arapca": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "okunus": "İyyake na'büdü ve iyyake nesteıyn", "meal": "Ancak Sana kulluk eder ve yalnız Senden yardım dileriz"}, {"no": 6, "arapca": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "okunus": "İhdinas sıratal müstekıym", "meal": "Bizi doğru yola eriştir"}, {"no": 7, "arapca": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "okunus": "Sıratallezine en'amte aleyhim ğayril mağdubi aleyhim ve lad dallin", "meal": "Nimete erdirdiğin kimselerin yoluna; gazaba uğrayanların, ya da sapıtanların yoluna değil"}],
  },
  {
    id: "ayetelkursi",
    ad: "Âyetü'l-Kürsî",
    sure: 2,
    besmele: false,
    ayetler: [{"no": 255, "arapca": "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", "okunus": "Allahü la ilahe illa hüvel hayyül kayyum* la te'huzühu sinetüv vela nevm* lehu ma fis semavati ve ma fil ard* men zellezı yeşfeu ındehu illa bi iznih* ya'lemü ma beyne eydıhim ve ma halfehüm* ve la yühıytune bi şey'im min ılmihı illa bi ma şa'* vesia kürsiyyühüs semavati vel ard* ve la yeudühu hıfzuhüma* ve hüvel alıyyül azıym", "meal": "Allah, O'ndan başka tanrı olmayan, kendisini uyuklama ve uyku tutmayan, diri, her an yaratıklarını gözetip durandır. Göklerde olan ve yerde olan ancak O'nundur. O'nun izni olmadan katında şefaat edecek kimdir? Onların işlediklerini ve işleyeceklerini bilir, dilediğinden başka ilminden hiçbir şeyi kavrayamazlar. Hükümranlığı gökleri ve yeri kaplamıştır, onların gözetilmesi O'na ağır gelmez. O yücedir, büyüktür"}],
  },
  {
    id: "amenerrasulu",
    ad: "Âmenerrasûlü",
    sure: 2,
    besmele: false,
    ayetler: [{"no": 285, "arapca": "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ", "okunus": "Amener rasulü bi ma ünzile ileyhi mir rabbihı vel mü'minun* küllün amene billahi ve melaiketihı ve kütübihı ve rusülih* la nüferriku beyne ehadim mir rusülih* ve kalu semı'na ve eta'na ğufraneke rabbena ve ileykel masıyr", "meal": "Peygamber ve inananlar, ona Rabb'inden indirilene inandı. Hepsi Allah'a, meleklerine, kitaplarına, peygamberlerine inandı. \"Peygamberleri arasından hiçbirini ayırdetmeyiz, işittik, itaat ettik, Rabbimiz! Affını dileriz, dönüş Sanadır\" dediler"}, {"no": 286, "arapca": "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", "okunus": "La yükellifüllahü nefsen illa vüs'aha* leha ma kesebet ve aleyha mektesebet* rabbena la tüahızna in nesına ev ahta'na* rabbena ve la tahmil aleyna ısran kema hameltehu alellezıne min kablina* rabbena ve la tühammilna ma la takate lena bih* va'fü anna* vağfir lena* verhamna ente mevlane fensurna alel kavmil kafirın", "meal": "Allah kişiye ancak gücünün yeteceği kadar yükler; kazandığı iyilik lehine, ettiği kötülük de aleyhinedir. Rabbimiz! Eğer unutacak veya yanılacak olursak bizi sorumlu tutma. Rabbimiz bizden öncekilere yüklediğin gibi, bize de ağır yük yükleme. Rabbimiz! Bize gücümüzün yetmeyeceği şeyi taşıtma, bizi affet, bizi bağışla, bize acı. Sen Mevlamızsın, kafirlere karşı bize yardım et"}],
  },
  {
    id: "asr",
    ad: "Asr Suresi",
    sure: 103,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "وَالْعَصْرِ", "okunus": "Vel asr", "meal": "İkindi vaktine (Asra; çağa) and olsun ki"}, {"no": 2, "arapca": "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", "okunus": "İnnel insane le fi husr", "meal": "İnsan hiç şüphesiz hüsran içindedir"}, {"no": 3, "arapca": "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "okunus": "İllellezıne amenu ve amilus salihati ve tevasav bil hakkı ve tevasav bis sabr", "meal": "Ancak inanıp yararlı iş işleyenler, birbirlerine gerçeği tavsiye edenler ve sabırlı olmayı tavsiye edenler bunun dışındadır"}],
  },
  {
    id: "fil",
    ad: "Fîl Suresi",
    sure: 105,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "okunus": "E lem tera keyfe feale rabbüke bi ashabil fıl", "meal": "Fil sahiplerine Rabbinin ne ettiğini görmedin mi"}, {"no": 2, "arapca": "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "okunus": "E lem yec'al keydehüm fı tadlıl", "meal": "Onların düzenlerini boşa çıkarmadı mı"}, {"no": 3, "arapca": "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", "okunus": "Ve ersele aleyhim tayran ebabıl", "meal": "Onların üzerine, sert taşlar atan sürülerle kuşlar gönderdi"}, {"no": 4, "arapca": "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", "okunus": "Termıhim bi hıcaratin min siccıl", "meal": "Onların üzerine, sert taşlar atan sürülerle kuşlar gönderdi"}, {"no": 5, "arapca": "فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ", "okunus": "Fecealehüm keasfin me'kul", "meal": "Sonunda onları, yenilmiş ekin gibi yaptı"}],
  },
  {
    id: "kureys",
    ad: "Kureyş Suresi",
    sure: 106,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "لِإِيلَافِ قُرَيْشٍ", "okunus": "Li iylafi kurayş", "meal": "Kureyş kabilesinin yaz ve kış yolculuklarında uzlaşması ve anlaşması sağlanmıştır"}, {"no": 2, "arapca": "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "okunus": "İylafihim rıhleteş şitai ves sayf", "meal": "Kureyş kabilesinin yaz ve kış yolculuklarında uzlaşması ve anlaşması sağlanmıştır"}, {"no": 3, "arapca": "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", "okunus": "Felya'büdu rabbe hazelbeyt", "meal": "Öyleyse kendilerini açken doyuran ve korku içindeyken güven veren bu Ev'in (Kabe'nin) Rabbine kulluk etsinler"}, {"no": 4, "arapca": "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", "okunus": "Ellezı at'amehüm min cuıv ve amenehüm min havf", "meal": "Öyleyse kendilerini açken doyuran ve korku içindeyken güven veren bu Ev'in (Kabe'nin) Rabbine kulluk etsinler"}],
  },
  {
    id: "maun",
    ad: "Mâûn Suresi",
    sure: 107,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", "okunus": "E raeytellezi yükezzibü bid din", "meal": "Dini yalan sayanı gördün mü"}, {"no": 2, "arapca": "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", "okunus": "Fe zalikellezi yedu'ul yetim", "meal": "Öksüzü kakıştıran, yoksulu doyurmaya yanaşmayan kimse işte odur"}, {"no": 3, "arapca": "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", "okunus": "Ve la yehuddu ala taamil miskin", "meal": "Öksüzü kakıştıran, yoksulu doyurmaya yanaşmayan kimse işte odur"}, {"no": 4, "arapca": "فَوَيْلٌ لِلْمُصَلِّينَ", "okunus": "Fe veylün lil müsallin", "meal": "Vay o namaz kılanların haline ki"}, {"no": 5, "arapca": "الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ", "okunus": "Ellezine hüm an salatihim sahun", "meal": "Onlar kıldıkları namazdan gafildirler"}, {"no": 6, "arapca": "الَّذِينَ هُمْ يُرَاءُونَ", "okunus": "Ellezine hüm yüraun", "meal": "Onlar gösteriş yaparlar"}, {"no": 7, "arapca": "وَيَمْنَعُونَ الْمَاعُونَ", "okunus": "Ve yemneunel maun", "meal": "Onlar basit şeyleri dahi vermezler"}],
  },
  {
    id: "kevser",
    ad: "Kevser Suresi",
    sure: 108,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "okunus": "İnna a'taynakel kevser", "meal": "Doğrusu sana pek çok nimet vermişizdir"}, {"no": 2, "arapca": "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "okunus": "Fe salli li rabbike venhar", "meal": "Öyleyse Rabbin için namaz kıl, kurban kes"}, {"no": 3, "arapca": "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "okunus": "İnne şanieke hüvel'ebter", "meal": "Doğrusu adı sanı ortadan kalkacak olan, sana kin tutan kimsedir"}],
  },
  {
    id: "kafirun",
    ad: "Kâfirûn Suresi",
    sure: 109,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "قُلْ يَا أَيُّهَا الْكَافِرُونَ", "okunus": "Kul ya eyyühel kafirun", "meal": "De ki: \"Ey inkarcılar"}, {"no": 2, "arapca": "لَا أَعْبُدُ مَا تَعْبُدُونَ", "okunus": "La a'büdü ma ta'büdun", "meal": "Ben sizin taptıklarınıza tapmam"}, {"no": 3, "arapca": "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", "okunus": "Ve la entüm abidune ma a'büd", "meal": "Benim taptığıma da sizler tapmazsınız"}, {"no": 4, "arapca": "وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ", "okunus": "Ve la ene abidün ma abedtüm", "meal": "Ben de sizin taptığınıza tapacak değilim"}, {"no": 5, "arapca": "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", "okunus": "Ve la entüm abidune ma a'büd", "meal": "Benim taptığıma da sizler tapmıyorsunuz"}, {"no": 6, "arapca": "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", "okunus": "Leküm diynüküm ve liye din", "meal": "Sizin dininiz size, benim dinim banadır"}],
  },
  {
    id: "nasr",
    ad: "Nasr Suresi",
    sure: 110,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "okunus": "İza cae nasrullahi velfeth", "meal": "Allah'ın yardımı ve zafer günü gelip, insanların Allah'ın dinine akın akın girdiklerini görünce, Rabbini överek tesbih et; O'ndan bağışlama dile, çünkü O, tevbeleri daima kabul edendir"}, {"no": 2, "arapca": "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "okunus": "Veraeytennase yedhulune fiy diynillahi efvace", "meal": "Allah'ın yardımı ve zafer günü gelip, insanların Allah'ın dinine akın akın girdiklerini görünce, Rabbini överek tesbih et; O'ndan bağışlama dile, çünkü O, tevbeleri daima kabul edendir"}, {"no": 3, "arapca": "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", "okunus": "Fesebbıh bihamdi rabbike vestağfirh* innehu kane tevvaba", "meal": "Allah'ın yardımı ve zafer günü gelip, insanların Allah'ın dinine akın akın girdiklerini görünce, Rabbini överek tesbih et; O'ndan bağışlama dile, çünkü O, tevbeleri daima kabul edendir"}],
  },
  {
    id: "tebbet",
    ad: "Tebbet Suresi",
    sure: 111,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", "okunus": "Tebbet yeda ebiy lehebiv ve tebb", "meal": "Ebu Leheb'in elleri kurusun; kurudu da"}, {"no": 2, "arapca": "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", "okunus": "Ma ağna 'anhü malühu ve ma keseb", "meal": "Malı ve kazandığı kendisine fayda vermedi"}, {"no": 3, "arapca": "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", "okunus": "Seyasla naran zate leheb", "meal": "Alevli ateşe yaslanacaktır"}, {"no": 4, "arapca": "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", "okunus": "Vemraetüh* hammaletel hatab", "meal": "Karısı da, boynunda bir ip olduğu halde ona odun taşıyacaktır"}, {"no": 5, "arapca": "فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ", "okunus": "Fi cidiha hablüm mim mesed", "meal": "Karısı da, boynunda bir ip olduğu halde ona odun taşıyacaktır"}],
  },
  {
    id: "ihlas",
    ad: "İhlâs Suresi",
    sure: 112,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "قُلْ هُوَ اللَّهُ أَحَدٌ", "okunus": "Kul hüvallahü ehad", "meal": "De ki: O Allah bir tektir"}, {"no": 2, "arapca": "اللَّهُ الصَّمَدُ", "okunus": "Allahüs samed", "meal": "Allah her şeyden müstağni ve her şey O'na muhtaçtır"}, {"no": 3, "arapca": "لَمْ يَلِدْ وَلَمْ يُولَدْ", "okunus": "Lem yelid ve lem yuled", "meal": "O doğurmamış ve doğmamıştır"}, {"no": 4, "arapca": "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", "okunus": "Ve lem yekün lehu küfüven ehad", "meal": "Hiçbir şey O'na denk değildir"}],
  },
  {
    id: "felak",
    ad: "Felak Suresi",
    sure: 113,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "okunus": "Kul e'uzü birabbilfelak", "meal": "De ki: \"Yaratıkların şerrinden, bastırdığı zaman karanlığın şerrinden, düğümlere nefes eden büyücülerin şerrinden, hased ettiği zaman hasedcilerin şerrinden, tan yerini ağartan Rabbe sığınırım"}, {"no": 2, "arapca": "مِنْ شَرِّ مَا خَلَقَ", "okunus": "Minşerri ma halak", "meal": "De ki: \"Yaratıkların şerrinden, bastırdığı zaman karanlığın şerrinden, düğümlere nefes eden büyücülerin şerrinden, hased ettiği zaman hasedcilerin şerrinden, tan yerini ağartan Rabbe sığınırım"}, {"no": 3, "arapca": "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", "okunus": "Ve min şerri ğasikın iza vekab", "meal": "De ki: \"Yaratıkların şerrinden, bastırdığı zaman karanlığın şerrinden, düğümlere nefes eden büyücülerin şerrinden, hased ettiği zaman hasedcilerin şerrinden, tan yerini ağartan Rabbe sığınırım"}, {"no": 4, "arapca": "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "okunus": "Ve min şerrinneffasati fiyl'ukad", "meal": "De ki: \"Yaratıkların şerrinden, bastırdığı zaman karanlığın şerrinden, düğümlere nefes eden büyücülerin şerrinden, hased ettiği zaman hasedcilerin şerrinden, tan yerini ağartan Rabbe sığınırım"}, {"no": 5, "arapca": "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", "okunus": "Ve min şerri hasidin iza hased", "meal": "De ki: \"Yaratıkların şerrinden, bastırdığı zaman karanlığın şerrinden, düğümlere nefes eden büyücülerin şerrinden, hased ettiği zaman hasedcilerin şerrinden, tan yerini ağartan Rabbe sığınırım"}],
  },
  {
    id: "nas",
    ad: "Nâs Suresi",
    sure: 114,
    besmele: true,
    ayetler: [{"no": 1, "arapca": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "okunus": "Kul e'uzü birabbinnas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}, {"no": 2, "arapca": "مَلِكِ النَّاسِ", "okunus": "Melikinnas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}, {"no": 3, "arapca": "إِلَٰهِ النَّاسِ", "okunus": "İlahinnas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}, {"no": 4, "arapca": "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "okunus": "Min şerrilvesvasil hannas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}, {"no": 5, "arapca": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "okunus": "Elleziy yüvesvisü fiysudurinnas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}, {"no": 6, "arapca": "مِنَ الْجِنَّةِ وَالنَّاسِ", "okunus": "Minel cinnetivennas", "meal": "De ki: \"İnsanlardan ve cinlerden ve insanların gönüllerine vesvese veren o sinsi vesvesecinin şerrinden, insanların Tanrısı, insanların Hükümranı ve insanların Rabbi olan Allah'a sığınırım"}],
  },
];

export const KURAN_DUALARI: readonly Sure[] = [
  {
    id: "rabbenaatina",
    ad: "Rabbenâ Âtinâ",
    sure: 2,
    besmele: false,
    ayetler: [{"no": 201, "arapca": "وَمِنْهُمْ مَنْ يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "okunus": "Ve minhüm mey yekulü rabbena atine fid dünya hasenetev ve fil ahırati hasenetev ve kına azaben nar", "meal": "Rabbimiz! Bize dünyada iyiyi, ahirette de iyiyi ver, bizi ateşin azabından koru\" diyenler vardır"}],
  },
  {
    id: "rabbenagfirli",
    ad: "Rabbenağfirlî",
    sure: 14,
    besmele: false,
    ayetler: [{"no": 41, "arapca": "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", "okunus": "Rabbenağfir lı ve li valideyye ve lil mü'minıne yevme yekumül hısab", "meal": "Rabbimiz! Hesap görülecek günde, beni, anamı babamı ve inananları bağışla"}],
  },
];

