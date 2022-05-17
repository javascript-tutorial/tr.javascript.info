# Chrome ile Hata Ayıklama

Daha karmaşık kodlara geçmeden, hata ayıklama hakkında konuşmamız gerekmekte.

Çoğu modern tarayıcı "hata ayıklama"(debugging) özelliğine sahiptir -- bu özel arayüz kod yazarken hata bulunmasını ve düzeltilmesini kolaylaştırır.

Geliştirici özellikleri en iyi olan tarayıcı Chrome olduğundan bu tarayıcı ile çalışacağız.

## "Kaynak" paneli

Şu anda sizin kullandığınız Chrome biraz farklı olabilir. Fakat bu panel kesinlikle orada biryerde olmalı

- [Örnek Sayfayı](debugging/index.html) Chrome ile açın.
- Geliştirici araçlarını `key:F12` (Mac: `key:Cmd+Opt+I`) ile açabilirsiniz.
- `kaynak` panelini seçin.

Eğer ilk defa bu işlemi yapıyorsanız görmeniz gereken ekran şudur:

![](chrome-open-sources.svg)

Sol tarafta bulunan açma kapama butonu  <span class="devtools" style="background-position:-168px -76px"></span> size dosyaları gösteren bir tab açar.

Bu panelde `hello.js` i seçtiğinizde aşağıdaki gibi bir ekran görmeniz gerekir.

![](chrome-tabs.svg)

Bu bölüm üçe ayrılmıştır:
1. **Dosya Gezgini**: Html, javascript, css ve diğer dosyalar görseller de dahil olmak üzere açılan sayfaya ait olan kaynakları gösterir. Chrome eklentileri de burada yer alabilir.
2. **Kod Editörü** burası ise kaynak kodu gösterir.
3. **Bilgi ve kontrol bölgesi** burada ise hata ayıklama yapılır.

Şimdi geliştirici araçlarının sol köşesinde bulunan <span class="devtools" style="background-position:-172px -122px"></span> açma kapama bölümünü kullanarak kendinize biraz yer açabilirsiniz.

## Konsol

Eğer `Esc` tuşuna basarsanız altta `konsol` açılır. Buraya komutları yazıp `key:Enter` ile çalıştırabilirsiniz.

Komut çalıştıktan sonra sonucunu hemen altında gösterir.

Örneğin burada `1+2` `3`  çıktısını verir. `hello("debugger")` dediğinizde hiçbir şey bulamadığından `undefined` döndürür.

![](chrome-sources-console.svg)

## Kesme Noktası

[Örnek Kod](debugging/index.html) içerisinde ne olduğunu incelenecek olursa. `hello.js` içerisinde `4.` satıra tıklayın. Evet `4` e tıklayın koda değil.

Tebrikler artık ilk kesme noktanızı oluşturdunuz. Lütfen `8` e de tıklayın.

Aşağıdaki gibi görünmeli. (tıkladığınız yerler mavi olmalı)

![](chrome-sources-breakpoint.svg)

*kesme noktası* JavaScript çalışırken çalışmasını o noktada durdurmasını sağlar.

Kod durdurulduğunda, o anki değişken değerlerini inceleyebilir veya konsoldan kod çalıştırabilirsiniz. Diğer bir deyişle *hata ayıklayabilirsiniz*

Oluşturulan bu kesme noktalarını sağ taraftaki panelde list halinde görmek mümkündür. Bu farklı dosyalarda eğer kesme noktaları varsa bunları görme açısından yararlı bir özelliktir. Eğer birçok dosyada kesme noktası varsa bu panel vasıtasıyla:

- İstenilen herhangi bir kesme noktasına doğrudan üstüne tıklayarak gidilebilir.
- Geçici olarak kesme noklarını devre dışı bırakılabilir.
- Sağ tıklayıp Sil'e tıkladığınızda bu kesme noktalarını silebilirsiniz.

```smart header="Koşullu kesme noktaları"
Satır sayılarının yazıldığı yere sağ tıklayarak *Koşullu Kesme Noktası* oluşturabilirsiniz. Eğer ifadeniz doğruysa bu kesme noktası çalışır ve JavaScript çalışması durur.

Belirli değişken değerlerine veya parametre değerlerine göre çalışma durdurulmak istendiğinde yararlı bir özelliktir.
```

## Debugger komutu

Ayrıca  `debugger` kodu ile de hata ayıklama işlemini yapmak mümkündür.

```js
function merhaba(adi) {
  let selam = `Merhaba, ${adi}!`;

*!*
  debugger;  // <-- hata ayıklama çalışır
*/!*

  say(selam);
}
```

Bu kod, siz editörde kod yazarken tekrar tarayıcıya geçip, kodu bulup kesme noktası koyma sürecini ortadan kaldırıyor.

## Dur ve ne olduğuna bak

Yaptığımız örnekte `merhaba()` sayfa yüklenirken çalışmaktadır. Bundan dolayı hata ayıklayıcıyı çalıştırmanın en kolay yolu sayfayı yenilemektir. Bunun için `key:F5` (Windows, Linux) veya `key:Cmd+R` ile sayfanın yenileyiniz.

Kesme noktasını kodda belirlediğinizden dolayı 4. satırda JavaScript çalışmayı durduracaktır.

![](chrome-sources-debugger-pause.svg)

Lütfen bilgilerin görüneceği dropdownları sağ panelden açınız. Bu bölümler oklar ile gösterilmiştir. Bu bölümler kesme anındaki değişkenlerin değerleri ve kod durumunu incelemeye yarar.

1. **`Watch` -- herhangi bir ifadenin o anki değerini gösterir.**
    `+` işaretine basarak ifade girebilirsiniz. Bu ifadenin değerini kod ayıklayıcı her halükarda gösterir. Kod çalışırken bu değerleri her adımda kontrol eder ve sonucunu yazar.

2. **`Call Stack` -- İç içe çağrı zincirlerini gösterir.**

    Şu anda hata ayıklayıcı `merhaba()` fonksiyonunun içindedir ve `index.html` tarafından çağırılmıştır. Eğer  yığın(stack) bölgesine dikkat ederseniz fonksiyona girdiğinde nereden çağırıldığını gösterir. ( herhangi bir fonksiyondan çağırılmadığından dolayı "anonymous" olarak göreceksiniz)

    Eğer yığın maddesine tıklayacak olursanız hangi fonksiyondan çağırıldığını görebilirsiniz.
3. **`Scope` -- kesme anında var olan değişkenlerin değerlerini gösterir**

    `Local` yerel değişken değerlerini gösterir. Ayrıca değerlerini kodun sağ tarafında vurgulanmış şekilde de görebilirsiniz.

    `Global` global değişkenler. Yani fonksiyon dışında tanımlanmış değerleri görebilirsiniz.

    Bunların yanında `this` anahtar kelimesi de vardır. Fakat bu konu üzerinden geçmedik.

## Çalışma izini sürme

Artık *iz sürme* safhasına geçebilirsiniz.

Sağ panelin üstünde sadece bu işe has butonlar bulunmaktadır.


<span class="devtools" style="background-position:-7px -76px"></span> -- çalışmaya devam et, `key:F8`.
: Çalışmaya devam edilmesini sağlar. Eğer ayrı bir kesme noktası yoksa çalışma kod bitene kadar devam eder.

    Üzerine bir defa tıkladığınızda aşağıdaki gibi olur.

    ![](chrome-sources-debugger-trace-1.svg)

    Çalışmaya devam edildi, `yaz()` fonksiyonunun içerisinde tekrar durdu. Dikkat ederseniz "Call stack" çağrısını bu işlem bir artırdı.

<span class="devtools" style="background-position:-137px -76px"></span> -- adım at (bir sonraki komutu çalıştır), fakat *fonksiyonun içine girme*,  `key:F10`.
: Eğer buna şimdi tıklarsanız `alert` çalışır. Önemli olan şey `alert` yerine farklı bir fonksiyon da olsa çalışma bu fonksiyonun içinde ne yaptığına önem vermez ve "üstünden atlar".

<span class="devtools" style="background-position:-72px -76px"></span> -- adım at, `key:F11`.
: Bir öncekinin aynısı, bir adım gider fakat bu defa eğer bir fonksiyon varsa onun "içine girer"(step into).

<span class="devtools" style="background-position:-104px -76px"></span> -- içinde bulunulan fonksiyonun sonuna kadar devam et, `key:Shift+F11`.
: Çalışma içinde bulunan fonksiyonun sonuna gelir ve orada durur.Yanlışlıkla iç içe çağrının içine girilirse çıkmak için kullanışlı bir özelliktir.<span class="devtools" style="background-position:-72px -76px"></span>,

<span class="devtools" style="background-position:-7px -28px"></span> -- Tüm kesme noktalarını etkinleştirme/devre dışı bırakma.

<span class="devtools" style="background-position:-264px -4px"></span> -- Hata olduğu anda otomatik olarak durdurmayı açma kapama butonu
: Etkinleştirildiğinde, kodda herhangi bir hata olduğunda çalışma otomatik olarak durdurulur. Bu noktada analizlerinizi yapabilirsiniz. Eğer hata varsa hata ayıklama ekranını açabilir ve bu özelliği etkinleştirerek hatanın nerede olduğunu bulabilirsiniz.

```smart header="Buradan devam edin"
Satır numaralarına sağ tıklayıp "Buradan devam et" özelliği ile kodu bir kaç adım ileriden devam etmesini sağlayabilirsiniz. Böylece yeniden bir kesme noktası oluşturmanıza gerek kalmaz.
```

## Loglama

Konsola basit bir şey yazdıracağınız zaman `console.log` fonksiyonunu kullanabilirsiniz. Aşağıdaki örnekte ekrana 0 ile 4 arasındaki değerler yazılır.

```js run
// çalışmasını görmek için lütfen geliştirici konsolunu açınız.
for (let i = 0; i < 5; i++) {
  console.log("deger", i);
}
```
Normal kullanıcı bu çıktıyı ekranda göremez, bunun için geliştirici konsoluna girmesi gerekir.

Eğer kodunuzun içerisinde yeterli derecede log varsa hata ayıklamanıza gerek yoktur.

## Özet

Bahsettiğimiz gibi çalışan kodu durdurmanın üç farklı yönü vardır. Bunlar:
1. Kesme noktası ile durdurma
2. `debugger` kelimesi ile durdurma
3. Eğer hata olduğunda aç/kapa butonu aktifse çalışmada hata olduğunda  <span class="devtools" style="background-position:-264px -4px"></span> durdurma

Bunların sonucunda çalışmada ne gibi hatalar olduğunu görebilirsiniz.

Bunlara ek olarak <https://developers.google.com/web/tools/chrome-devtools> adresinden daha geniş ve yeni bilgilere ulaşabilirsiniz.

Bu bölümdeki bilgiler sizin hata ayıklama işlemine başlamanızda yardımcı olacaktır. Fakat tarayıcı ile alakalı çok fazla işlem yapıyorsanız bu durumda geliştirici  derinlemesine incelemeniz gerekmektedir.

Tabi bunun yanında deneme yanılma yöntemi ile de geliştirici araçlarının özelliklerini keşfedebilirsiniz. Unutmayın sağ tıklayarak farklı bölgelerde farklı fonksiyonları görebilirsiniz.
