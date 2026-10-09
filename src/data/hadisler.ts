// Namaz hadisleri. Kaynak: fawazahmed0/hadith-api (Unlicense), Sahîh-i Buhârî Türkçe çevirisi (tur-bukhari).
// Metinler olduğu gibi alındı; yalnızca sondaki editör notları ("Tekrar:", "Diğer tahric:") çıkarıldı.
// Yayından önce çevirinin telif durumu netleştirilmeli (docs/SPEC.md, Bölüm 11).
import type { Vakit } from '../types';

export interface Hadis {
  metin: string;
  kaynak: string;
  /** Boşsa her vakte uygun; doluysa Vakitler ekranında ve bildirimde bu vakitlerde öne çıkar. */
  vakitler: Vakit[];
}

export const HADISLER: readonly Hadis[] = [
  {
    metin: "Abdullah'tan şöyle nakledilmiştir: Allah Resûlü Sallallahu Aleyhi ve Sellem'e, amellerin hangisinin Allah'a daha sevimli olduğunu sordum. O da, Vaktinde kılınan namaz' diye cevap verdi. 'Sonra hangisi?' diye sordum. Bu defa: 'Ana-baba'ya iyilik etmek' diye cevap verdi. 'Bundan sonra hangisi?' diye sordum. Bu kez, Allah yolunda cihad etmek' diye cevap verdi. Bana bunları anlattı. Eğer daha fazla soru sorsaydım, elbette cevabını verirdi.",
    kaynak: "Buhârî, 527",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre r.a.'den şöyle nakledilmiştir: Nebi Sallallahu Aleyhi ve Sellem: Siz'den birinizin kapısının önünden günde beş kez yıkandığı bir nehir aksa, ne dersiniz bu yıkanma onun üzerinde bir kir bırakır mı?\" diye sordu. Ashâb-ı kiram, \"Kir'den eser bırakmaz\" diye cevap verdi. Bunun üzerine Resulullah Sallallahu Aleyhi ve Sellem şöyle buyurdu: \"Beş vakit namaz da böyledir. Onlar sayesinde Allah, günahları siler.",
    kaynak: "Buhârî, 528",
    vakitler: [],
  },
  {
    metin: "Enes bin Malik r.a. Nebi s.a.v.'in şöyle buyurduğunu nakletmiştir: \"Kim bir namaz'ı kılmayı unutmuşsa, onu hatırlayınca kılsın! Zira bundan başka bunun bir keffâreti yoktur. Beni anmak için namaz kıl. [Taha suresi 14]\"",
    kaynak: "Buhârî, 597",
    vakitler: [],
  },
  {
    metin: "Abdullah Ibn Ömer (r.a.)'den Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğu nakledilmiştir: \"Cemaatle kılınan namaz, tek başına kılınan namazdan yirmi yedi derece daha üstündür.\"",
    kaynak: "Buhârî, 645",
    vakitler: [],
  },
  {
    metin: "Ebu Saîd el-Hudrî (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Ezan'ı işittiğiniz zaman, müezzinin söylediklerini tekrarlayın!\"",
    kaynak: "Buhârî, 611",
    vakitler: [],
  },
  {
    metin: "Ebu Bekir İbn Ebî Musa babası kanalıyla Allah Resulü (Sallallahu Aleyhi ve Sellem)'in şöyle dediğini nakletmiştir: \"iki serin vakitteki namazları kim kılarsa cennete girer\"",
    kaynak: "Buhârî, 574",
    vakitler: ['sabah', 'ikindi'],
  },
  {
    metin: "İbn Ömer (r.a.)'den Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğu nakledilmiştir: \"İkindi namazını kaçıran kimse, ailesi helak olmuş, serveti batmış kimse gibidir.\"",
    kaynak: "Buhârî, 552",
    vakitler: ['ikindi'],
  },
  {
    metin: "Ebu Kılabe, Ebu'l-Melih'in kendisine şöyle naklettiğini rivayet etmiştir: \"Bulutlu bir günde Büreyde ile birlikte idik. Bize 'Namazı erken kılın! Zira Allah Resulü Sallallahu Aleyhi ve Sellem şöyle buyurdu: Her kim ikindi namazını terk ederse ameli boşa gider' dedi\"",
    kaynak: "Buhârî, 594",
    vakitler: ['ikindi'],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Bazı melekler gece, bazıları da gündüz nöbetleşe yanınıza gelir. Bunlar, sabah ve ikindi namazlarında bir araya gelirler. Daha sonra gece sizin yanınızda olanlar Hak Teâlâ'nın huzuruna çıkar. Allah Teâlâ kullarını en iyi kendisi bilmesine rağmen yine de onlara 'Kullarımı nasıl bıraktınız?' diye sorar. Onlar da: Yanlarından ayrılırken namaz kılıyorlardı. Yanlarına vardığımızda da namaz kılıyorlardı' diye cevap verirler.\"",
    kaynak: "Buhârî, 555",
    vakitler: ['sabah', 'ikindi'],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Her kim güneş doğmadan önce sabah namazından bir rekat'a yetişirse, sabah namazına yetişmiş demektir. Her kim de, güneş batmadan önce ikindi namazına yetişirse, ikindi namazına yetişmiş demektir\"",
    kaynak: "Buhârî, 579",
    vakitler: ['sabah'],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: Her kim namaz'ın bir rek'atına yetişirse, namaz'a yetişmiş demektir",
    kaynak: "Buhârî, 580",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"İnsanlar ezan okumanın ve ilk safta namaz kılmanın faziletini bilselerdi ve bu ikisinin kura çekmekten başka yolunun olmadığını anlasalardı elbette aralarında kura çekerlerdi. Namazlara erken gitmenin faziletini bir bilselerdi erken gitmek için birbirleriyle yarışırlardı. Yatsı ve sabah namazlarını cemaatle kılmadaki sevabı bir idrak etselerdi, emekleyerek ve sürünerek bile olsa camiye gelirlerdi.\"",
    kaynak: "Buhârî, 615",
    vakitler: ['sabah', 'yatsi'],
  },
  {
    metin: "Ebu Hureyre (r.a.) Rasûlullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Siz'den biri abdestini bozmadan namaz kıldığı yerde bulunduğu sürece melekler onun için 'Allah'ım onu bağışla! Allah'ım ona merhamet et!' şeklinde dua edip bağışlanma dilerler. Ailesine gitmekten sadece namazın alıkoyduğu siz'den biri, namaz'ı beklediği sürece namaz kılıyor hükmündedir\"",
    kaynak: "Buhârî, 659",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre (r.a.)'in naklettiğine göre Resulullah Sallallahu Aleyhi ve Sellem şöyle buyurmuştur: \"Her kim mescide gidip gelirse her gidip gelmesi karşılığında Allah (Celle Celaluhu) o'na cennetteki yerini hazırlar\"",
    kaynak: "Buhârî, 662",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle dediğini işittiğini nakletmiştir: \"Cemaatle kılınan namaz tek başına kılınan namazdan yirmi beş kat daha faziletlidir. Gece ve gündüz melekleri sabah namazında bir araya gelirler.\" (Ravi der ki) sonra Ebu Hureyre (r.a.) şöyle dedi: Dilerseniz namazda şu âyeti okuyun: Çünkü sabah namazı şahitlidir. «...Sabah vaktin de namaz kıl. Çünkü sabah vakti şahitlidir...» [İsrâ 78]",
    kaynak: "Buhârî, 648",
    vakitler: ['sabah'],
  },
  {
    metin: "Ebu Hureyre (r.a.)'in belirttiğine göre Nebi Sallallahu Aleyhi ve Sellem şöyle buyurmuştur: \"Yüce Rabbimiz her gece, gece'nin son üçte biri kaldığında en yakın semaya inerek şöyle der: Bana dua eden yok mu ona icabet edeyim, isteyen yok mu ona vereyim, bağışlanmayı isteyen yok mu onu bağışlayayım.\"",
    kaynak: "Buhârî, 1145",
    vakitler: ['yatsi'],
  },
  {
    metin: "Aişe radıyallahu anha Şöyle demiştir: \"Nebi Sallallahu Aleyhi ve Sellem sabah namazının iki rekatına devam ettiği kadar hiçbir nafileye devam etmemiştir.\"",
    kaynak: "Buhârî, 1163",
    vakitler: ['sabah'],
  },
  {
    metin: "Aişe (radiyallahu anha) şöyle demiştir: Nebi Sallallahu Aleyhi ve Sellem öğleden önce dört, sabah'tan önce iki rek'at namazı bırakmazdı",
    kaynak: "Buhârî, 1182",
    vakitler: ['ogle'],
  },
  {
    metin: "Ebu Saîd Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Öğle namazını serinlik düşünce kılın! Zira hava'nın aşırı sıcak olması, cehennemin kaynamasından ileri gelir.\"",
    kaynak: "Buhârî, 538",
    vakitler: ['ogle'],
  },
  {
    metin: "Seleme (r.a.) şöyle demiştir: \"Nebi Sallallahu Aleyhi ve Sellem ile akşam namazını, güneş batınca kılardık\"",
    kaynak: "Buhârî, 561",
    vakitler: ['aksam'],
  },
  {
    metin: "Râfi' bin Hadîc (r.a.) şöyle demiştir: \"Nebi Sallallahu Aleyhi ve Sellem ile birlikte akşam namazını kılardık. Birimiz namazdan çıktıktan sonra (attığı) ok'un nereye düştüğünü görecek kadar, gün aydınlık olurdu\"",
    kaynak: "Buhârî, 559",
    vakitler: ['aksam'],
  },
  {
    metin: "Ebu Berze (r.a.)'den şöyle nakledilmiştir: \"Nebi Sallallahu Aleyhi ve Sellem yatsı namazından önce uyumayı, yatsı namazından sonra konuşmayı sevmezdi\"",
    kaynak: "Buhârî, 568",
    vakitler: ['yatsi'],
  },
  {
    metin: "Abdullah İbn Ömer radıyallahu anh şöyle demiştir: Resûlullah Sallallahu Aleyhi ve Sellem ile birlikte; öğle'den önce ve sonra, Cuma'dan sonra, akşam namazından sonra ve yatsıdan sonra ikişer rekat namaz kıldım",
    kaynak: "Buhârî, 1169",
    vakitler: ['ogle', 'aksam', 'yatsi'],
  },
  {
    metin: "Ebu Katâde es-Selemî'den Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğu nakledilmiştir: İçinizden biri Mescid'e girdiği zaman oturmadan önce iki rek'at namaz kılsın!.",
    kaynak: "Buhârî, 444",
    vakitler: [],
  },
  {
    metin: "İbn Ömer Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Bazı namazlarınızı evinizde kılın! Evlerinizi kabirlere çevirmeyin!\"",
    kaynak: "Buhârî, 432",
    vakitler: [],
  },
  {
    metin: "Enes İbn Mâlik (radiyallahu anh) şöyle demiştir: \"Resûlullah Sallallahu Aleyhi ve Sellem namaz'ını kısa kılmakla birlikte rükünlerini tam olarak yerine getirirdi\"",
    kaynak: "Buhârî, 706",
    vakitler: [],
  },
  {
    metin: "Enes İbn Mâlik (r.a.) Resûlullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: Rükû' ve secdeyi tam anlamıyla yerine getirin. Allah'a yemin ederim ki, siz rükû' ve secde ettiğiniz zaman ben sizi arkamdan da görürüm",
    kaynak: "Buhârî, 742",
    vakitler: [],
  },
  {
    metin: "Enes İbn Malik (r.a.) Resûlullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: Safları iyice düzeltin. Çünkü safları düzeltmek namazın tam anlamıyla ikâmeedildiğini gösteren unsurlardan biridir.",
    kaynak: "Buhârî, 723",
    vakitler: [],
  },
  {
    metin: "Ubâde İbn es-Sâmit (r.a.) Resûlullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Kur'an'ın ilk sûresi olan Fâtihatül-Kitâb'ı okumayan bir kimsenin namazı olmaz\"",
    kaynak: "Buhârî, 756",
    vakitler: [],
  },
  {
    metin: "Aişe (radiyallahu anha) şöyle demiştir: \"Resulullah Sallallahu Aleyhi ve Sellem'e namazda iken baş'ı sağ'a sol'a çevirmenin hükmünü sordum. Bana şu cevabı verdi: Bu şeytan'ın, kul'un namazından bir kısmını kapıp aşırmasıdır.\"",
    kaynak: "Buhârî, 751",
    vakitler: [],
  },
  {
    metin: "Enes r.a. Nebi (Sallallahu aleyhi ve Sellem)'in şöyle dediğini belirtmiştir: \"Siz'den birisi namazda uyuklarsa, ne okuduğunu bilinceye kadar uyusun\"",
    kaynak: "Buhârî, 213",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre (Radiyallahu Anh) Resûlullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Ümmetime veya insanlara sıkıntı verme endişesi taşımasaydım onlara her namaz öncesinde dişlerini misvakla temizlemelerini emrederdim.\"",
    kaynak: "Buhârî, 887",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre r.a.'den rivayet edildiğine göre Nebi Sallallahu Aleyhi ve Sellem şöyle buyurmuştur: \"Benim bu mescidimde kılınan bir namaz, Mescid-i Haram dışındaki başka mescitlerde kılınan bin namaz'dan daha hayırlıdır\"",
    kaynak: "Buhârî, 1190",
    vakitler: [],
  },
  {
    metin: "Aişe (radıyallahu anha) şöyle dedi: Yanımda Benî Esed kabilesinden bir kadın vardı. Bu sırada odama Resulullah Sallallahu Aleyhi ve Sellem girdi ve: \"Bu kimdir?\" diye sordu. Ben: \"Falan kadındır. O kadın geceleri uyumaz\" diyerek kıldığı namazları anlattım. Bunun üzerine Nebi Sallallahu Aleyhi ve Sellem : \"Bunu bırak. Amellerden gücünüzün yettiğini yapın. Çünkü siz bıkıp usanmadıkça Allah bıkıp usanmaz.\" buyurdu",
    kaynak: "Buhârî, 1151",
    vakitler: [],
  },
  {
    metin: "Abdullah İbn Amr İbnü'l-As'tan nakledildiğine göre: Nebi Sallallahu Aleyhi ve Sellem şöyle buyurdu: \"Allah'ın en çok sevdiği namaz Davud'un kıldığı namazdır. Allah'ın en fazla sevdiği oruç da Davud'un tuttuğu oruçtur. O gece yarısına kadar uyur, sonra kalkıp gecenin üçte birini ibadetle geçirir ve son altıda birlik vakitte de tekrar uyurdu. Orucu ise gün aşırı tutardı.\"",
    kaynak: "Buhârî, 1131",
    vakitler: ['yatsi'],
  },
  {
    metin: "İbn-i Ömer r.a.’den Resulullah sallallahu aleyhi ve sellem buyurdu ki: İslam beş şey üzerine bina olunmuştur: Allah`dan başka ilâh olmadığına ve Muhammed`in (sallallahu aleyhi ve sellem)'in Allâh`ın Resulü olduğuna Şahadet etmek, Namaz kılmak, Zekat vermek, Haccetmek, Ramazan orucunu tutmaktır.",
    kaynak: "Buhârî, 8",
    vakitler: [],
  },
  {
    metin: "el-Esved şöyle anlatır: Aişe (r.anha)'ya Resûlullah Sallallahu Aleyhi ve Sellem'in evinde ne işle meşgul olduğunu sordum. O da şu cevabı verdi: \"Ailesinin hizmetinde bulunur ve onlara ev işlerinde yardımcı olurdu. Namaz vakti gelince de namaza çıkardı.\"",
    kaynak: "Buhârî, 676",
    vakitler: [],
  },
  {
    metin: "Abdullah bin Mugaffal (r.a.) Allah Resûlü Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Her ezan ile kamet arasında bir namaz vardır. Her ezan ile kamet arasında bir namaz vardır. Her ezan ile kamet arasında bir namaz vardır.\" Ravi der ki: Üçüncüde 'Dileyen kimse İçin' buyurdu",
    kaynak: "Buhârî, 627",
    vakitler: [],
  },
  {
    metin: "Ebu Hureyre (r.a.) Nebi Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Kameti duyduğunuz vakit namaz'a gidiniz! Giderken vakur biçimde yürüyünüz. Acele etmeyiniz! Yetiştiğiniz kadarını kılınız, yetişemediklerinizi ise sonra tamamlayınız!\"",
    kaynak: "Buhârî, 636",
    vakitler: [],
  },
  {
    metin: "Ebu Musa el-Eş'arî (r.a.) Resulullah Sallallahu Aleyhi ve Sellem'in şöyle buyurduğunu nakletmiştir: \"Namaz konusunda en fazla sevaba nail olanlar camiye en uzaktan gelenlerdir. Cemaatle namaz kılmak için namaz'ı bekleyenler de, hemen namazı kılıp uyuyanlardan daha çok sevap kazanır\"",
    kaynak: "Buhârî, 651",
    vakitler: [],
  },
  {
    metin: "Aişe (r.anha)'dan şöyle nakledilmiştir: \"Allah Resulü Sallallahu Aleyhi ve Sellem sabah namazı vaktinde ezan ile kamet arasında iki kısa rek'at namaz kılardı.\"",
    kaynak: "Buhârî, 619",
    vakitler: ['sabah'],
  },
];
