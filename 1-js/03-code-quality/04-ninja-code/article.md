# Ninja Kodları

Ninja programcıların eskiden bu kurnazlıkları yaparak kodu tekrardan düzenleyenleri ağlatırlardı. Kod guruları bu kodları anca test yazarak kontrol edebilirdi. Yeni kod yazmaya başlayanlar bazen daha iyi kullanabilirler.

<<<<<<< HEAD
Dikkatlice oku ve hangisisin bul bakalım - ninja, çaylak, veya kod eleştirmeni.
=======
```quote author="Confucius (Analects)"
Learning without thought is labor lost; thought without learning is perilous.
```

Programmer ninjas of the past used these tricks to sharpen the mind of code maintainers.

Code review gurus look for them in test tasks.

Novice developers sometimes use them even better than programmer ninjas.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

```warn header="İroni tesbit edildi!"
Bu kodlar kötü yazıma örnektirler.!!!
```

## Özlük aklın ruhudur!

Kodunuzu olabildiğince kısa tutmalısınız. Bu sizin ne kadar zeki olduğunuzu gösterir!

Örneğin aşağıdaki `'?'` kullanımına bakın:

```js
// meşur bir javascript kütüphanesinden.
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```
Harika değil mi? Eğer böyle yazarsanız, daha sonra gelen programcı bu satıra bakar ve `i` nin ne olduğunu ve ne yapmaya çalıştığınızı anlamak için uğraşır. Sonra size cevap almaya gelir.

Ona kısa yazmanın her zaman daha iyi olduğunu söyleyin. Sizin yolunuza yani Ninja yoluna çekmeye çalışın!

## Tek harf değişkenler

```quote author="Laozi (Tao Te Ching)"
Dao kelimesizlikte saklıdır. Sadece Dao doğru başlamıştır ve doğru biter.
```
Diğer bir şekilde daha hızlı ( ve daha beter!) kod yazma yöntemi de tek-harfli değişkenler kullanmaktır. Örneğin `a`,`b` ve `c` gibi.

<<<<<<< HEAD
Kısa değişken isimleri kodun içerisinde aynen bir ninjanın ormanda kaybolduğu gibi kaybolurlar. Kimse onları "arayarak" bulamaz. Hatta birisi bulsa bile ne olduğunu çözemez
=======
Another way to code shorter is to use single-letter variable names everywhere. Like `a`, `b` or `c`.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

.... Fakat bir istisna var. Gerçek ninja hiç bir zaman `for` döngüsünde sayaç için `i` kullanmaz. Her yerde kullanır ama orada kullanmaz. Biraz kurcalayın daha çok garip harf var. Örneğin `x` veya `y` gibi.

Garip değişkenler eğer döngü gövdesi 1-2 sayfaysa daha harika olurlar. ( olabildiğince uzun olsun). Eğer birisi daha derinlemesine bakarsa, kolayca `x` in döngü sayacı olduğunu anlayamasın.


## Kısaltmalar kullan

Eğer takım tek karakter veya garip kelimeler kullanmanızı engelliyorsa sizde kısaltmalar kullanın

örneğin:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc


Sadece gerçekten iyi sezgilere sahip olanlar ne demek istediğinizi anlayacaklar. Her şeyi kısaltın. Sadece sizi anlayabilen insanlar sizin kodunuzu geliştirmeye layıktırlar.


## Yükseklere çıkın, soyutlaşın.

```quote author="Laozi (Tao Te Ching)"
Mükemmel karenin köşeleri yoktur<br>
Mükemmel gemi en son inşa edilendir,<br>
Harika nota karmaşık olandır,<br>
Harika görselin belirli bir formu yoktur.
```

Bir kelime seçerken soyut olmasına önem verin. Örneğin
While choosing a name try to use the most abstract word. Like `obj`, `data`, `value`, `item`, `elem` vs. 

- **Kusursuz değişken ismi `data`** nerede isterseniz kullanın. Gerçekten de tüm değişkenler *data* tutmuyorlar zaten, değil mi?

    ...Fakat ya `data` daha önce alındıysa? `value` kullanabilirsiniz. O da genel bir tanım. En nihayetinde tüm değişkenler bir *value* alır değil mi?


- **Değişkeni tipi ile tanımlayın: `str`, `num`...**
    Bir defa deneyin. Genç ninjanın ağzı açık kalsın -- böyle isimler gerçekten de kodu kötü mü yapar? Evet!

    Bir taraftan değişken isimleri hala birşey ifade ediyor. Değişkenin içinde ne var bunu söylüyor: karakter, sayı veya başka birşey. Fakat dışından başkası kodu anlamaya çalıştığında, şaşıracak ve aslında hiç bir bilgi olmadığını anlayacak

    Gerçektende değerin tipi hata ayıklarken kolayca bulunabilir. Fakat ya anlamı? Hangi karakter veya sayıyı tutuyor? Bu sorunun cevabı anca iyi bir meditasyon ile bulunabilir!

- **...Peki artık bu değişkenlerden kalmadıysa?** Tabiki yanlarına sayı ekleyebilirsiniz: `data1, item2, elem5` gibi.


## Dikkat testi

Sadece gerçekten dikkatli programcılar kodu anlayabilmeli. Fakat bunu nasıl kontrol edebilirsiniz?


**Bunlardan biri -- benzer değişken isimleri kullanın `date` ve `data` gibi.**

Olabildiğince birbiri ile karıştırırn.

Karıştırın ki kodu okuyan kişi kolayca okuyamasın. Eğer bir yazım hatası falan varsa, uzun bir süre takılmışsan, bir çay arası versin.

## Zekice eş anlamlı sözler kullanmak

<<<<<<< HEAD
```quote author="Confucius"
Hepsinden zoru karanlık odada kara kediyi bulmak, hele bir de odada kedi yoksa.
=======
```quote author="Laozi (Tao Te Ching)"
The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
```

*Aynı şeyler* için *birbirine yakın* şeyler kullanmak hayatı daha ilginç kılar ve sizin yaratıcılığınız topluma gösterme açısından iyi bir fırsattır.

Örneğin, fonksiyon öneklerini kullanın. Eğer bir fonksiyon ekrana çıktı veriyorsa `display_` ön eki ile başlayın. Örneğin `displayMessage`. Sonrasında başka bir fonksiyonda ekrana yine birşey yazdırmak isterseniz bu defa `show_` kullanın. Örneğin `showName`

Bu fonksiyonlar için hiç bir farklılık olmasada sanki farklılık varmış hissi yaratın.

Diğer ninjalarla birleşip: Eğer Ahmet ekranda yazı gösteren fonksiyona `display..` ile başlıyorsa, Mehmet `render..` ile başlasın, Mehtapta `paint..` kullansın gibi kararlar verebilirsiniz. Düşünün kod ne kadar da ilginç ve çeşitli olur.

... ve şimdi hatrick!!!

birbirinden farklı olan iki önemli fonksioyonu aynı önek ile kullanın.

Örneğin, fonksiyon  `printPage(page)` yazıcıyı kullansın. `printText(text)` ise ekrana yazdırsın. Diyelim ki sizin kodunuza aşina olmayan bir okur bu iki fonksiyonun birbirine yakın isimleri olduğundan karıştırabilir. `printMessage` "Mesajı nereye yazdırmaktadır? Ekrana mı yoksa yazıcıya mı?" Daha da işi çıkmaza götürmek ve ustalığınızı belli etmek için `printMessage(mesaj)` kullanabilirsiniz. Bu da mesajı yeni pencerede göstersin.

## İsimleri tekrar kullanın

```quote author="Laozi (Tao Te Ching)"
Bütün taksim edildiğinde, her <br>
birinin isme ihtiyacı var.<br>
Yeteri kadar isim var.<br>
Kişi ne zaman duracağını bilmeli.
```

Sadece çok gerekli olduğunda yeni değişken ekleyin.

Bunun yerine, var olanı kullanın. Ona yeni değerler atayın

Fonksiyonda sadece paslanan değeri kullanmaya çalışın.

Bu gerçekten o değişkenin içinde *şu anda* ne olduğunu ve nereden geldiğini anlamayı zor kılar. Az dikkatli birisi hepsinin üzerinden satır satır geçmeli ve her kod dalındaki değişikliği takip etmelidir.

**Daha gelişmiş bir yaklaşım ise gizlice(!) bir döngü veya fonksiyon içindeki değişkenin değerini aynısı ile değiştirmek**

Örneğin:

```js
function ninjaFonksiyonu(elem) {
  // 20 satır elem ile çalışır

  elem = clone(elem);

  // sonraki 20 satır elemin klonuyla çalışır.
}
```

`elem` ile çalışmak isteyen yazılımcı dostunuz fonksiyonun ikinci bölümünde şaşıracaktır. Sadece hata ayıklarken bunun farkına varabilir. Sonrasında bir de bakar ki aslında klonuyla çalışıyormuş

Ölümcül derecede etkin bir yoldur. Hatta usta ninjalar bile bu olay karşısında şaşkınlık yaşayabilirler.

## Eğlence için alttan çizgi kullanmak.

Değişken isimlerinden önce alttan çizgi kullanın `_`, `__` gibi. Örneğin `_isim` veya `__deger` gibi. Bunun anlamını sadece siz biliyorsanız harika olur. Veya, daha iyisi, bunları eğlencesine ekleyin. Hiç bir anlamı olmasın. Farklı yerlerde farklı anlamlara gelsin.

Bir taşla iki kuş vurdunuz. Önce kodu daha uzun ve daha az okunabilir yaptınız, ikinci olarak, yazılımcı dostunuzu tongaya düşürerek alttan çizginin ne anlama geldiğini bulması için uzunca bir süre uğraşmasını sağladınız.

Zeki bir ninja bir yerde alttan çizgi kullanır, başka bir yerde kullanmaz. Böylece ileride kodu hataya hazır hale getirir.

## Aşkınızı gösterin

Herkese varlık(entity)larınızın ne kadar mükemel olduğunu gösterin. Örneğin `harikaElement`, `guzelAlert`, `cokAkilliNinja` gibi isimlendirmeler kodunuzu okuyanları aydınlatacaktır.

Gerçekten de bir yandan `super...`, `harika...`, `mega...` gibi kullanmış fakat diğer yandan hiç bir detay vermemiş olursunuz. Okuyucunun bunun altında yatan anlamı bulması için bir kaç saat meditasyon yapıp hayatını sorgulaması gerekmektedir.


## Global değişkenlerin veya dıştaki değişkenlerin üzerine başka değer yazın

```quote author="Guan Yin Zi"
Işıktayken karanlıktaki hiç bir şey görünmez<br>
Karanlıktayken, aydınlıktaki herşey görünür.
```

Fonksiyonun içinde ve dışında aynı değişken isimleri kullanın. Basit, fazladan efora hiç gerek yok!



```js
let *!*kullanici*/!* = kullaniciBilgisi();

function yaz() {
  let *!*kullanici*/!* = farkliBirFonksiyon();
  ...
  ...bir sürü satır...
  ...
  ... // <-- bir yazılımcı kullanici değişkeniyle çalışmak istiyor...
  ...
}
```

`yaz` fonksiyonunun içine bakan bir programcı muhtemelen, global `kullanici` değişkeninin üzerine yazan yerel bir `kullanici` değişkeni olduğunu göremeyecektir.

Sonrasında dışta bulunan `kullanici` değişkenine bakacak ve `kullaniciBilgisi` fonksiyonunda bir yanlış olduğu kanaatine varacak. Ver elini hata ayıklama!


## Her yerde yan etki!

Bazı fonksiyonlar hiç birşey değiştirmiyormuş gibi görünür. Örneğin `hazirMi()`, `izinKontrol()`, `tagbul()` gibi. Hesaplamaları yapıp veriyi geri döndürdüğü ve bunun dışında bir değişiklik yapılmadığı tahmin edilsin. Diğer bir deyişle "yan etkisi" olmadığı.

**En güzel kurnazlık bunlara kendi görevleri dışında "işe yarar" bir eylem yaptırın** 

İş arkadaşınızın yüzündeki şaşkınlığı düşünebiliyor musunuz? `hazirMi`,`kontrolEt`, `bul...` gibi fonksiyonlar birşeyleri değiştiriyor. Gerçekten de sınırları zorlayan bir yöntem.

**Yine bir başka şaşkınlık yaratacak yöntem ise standart olmayan bir sonuç döndürmek**

Gerçekten ne düşündüğünüzü gösterin! `izinKontrol` mesela `true/false` dönmesin de daha karmaşık bir obje dönsün.

Her kim ki `if(checkPermission(..))` yazarsa neden çalışmadığını anlayamasın. Onlara "Dökümantasyonu oku" diyebilirsiniz. Sonra bu dosyayı ona verin.

## Güçlü fonksiyonlar!

```quote author="Laozi (Tao Te Ching)"
Büyük Tao heryerden akar,<br>
sağa ve sola.
```

Fonksiyonu ismiyle sınırlı tutmayın! Daha geniş tutun.

Örneğin, `emailDogruluga(email)` diye bir fonksiyon sadece bu email'in doğruluğunu söylemesin, hata versin ve tekrardan email girilmesi gerektiğini söylesin.

Ek eylemler fonksiyonun isminde kesinlikle belirtilmesin. Gerçek bir ninja programcı, kodda da bunları açık bir şekilde belirtmeyecektir.


**Birçok eylemi bir fonksiyona yazın ki kodun tekrardan kullanılmasını engelleyin**

Düşünün ki, diğer yazılımcı sadece email'i kontrol etmek istiyor ve ekrana çıktı vermek istemiyor. Sizin fonksiyonunuz `emailDogrula(email)` ve hem doğruluk kontrolü yapıyor hemde ekrana hata çıktısı veriyor. Bundan dolayı size bu yazılımcının soracağı birşey olamaz. Siz zaten ikisini de yapmışsınız.

## Özet

Yukarıda bulunan tavsiyeler gerçek kodlardan alınmıştır. Bazıları deneyimli geliştiriciler tarafından yazılmıştır. Belki de sizden bile deneyimli programcılardan ;)


- Tavsiyelerden bazılarını uygularsanız kodunuz tamamen süprizlerle dolar.
- Çoğunu uygularsanız, kodunuz gerçekten de sadece size ait olur. Kimse değiştiremez.
- Hepsini uygularsanız aydınlanma arayışında olan genç geliştiricilere iyi bir ders vermiş olursunuz.