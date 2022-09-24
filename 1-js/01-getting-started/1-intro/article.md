# JavaScript'e Giriş

JavaScript nedir, ne yapar ve hangi teknolojilerle çalışır? İnceleyelim!

## JavaScript Nedir?

*JavaScript*, ilk başta  *"web belgelerine canlılık"* getirmek için oluşturulmuştur.

Bu dilde yazılan kod kümelerine betik denir. Doğrudan HTML kodu içerisine yazılıp sayfa yüklendiğinde doğrudan çalışabilir.

Komutlar herhangi bir derleme ve hazırlığa gereksinim duymadan doğrudan çalışır.

Bu yönden bakınca JavaScript diğer dillere kıyasla oldukça farklıdır. Bkz: [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Neden <u>Java</u>Script?"
JavaScript ilk yazıldığında, başka bir adı vardı: "LiveScript". Ancak Java dili o dönemlerde çok ünlü olduğundan dolayı yeni bir dil ve "küçük kardeş" gibi görünmesi açısından JavaScript olarak değiştirildi.

Ancak JavaScript gelişerek kendince yönergeleri [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) olan bağımsız bir dil haline geldi. Şu anda Java ile hiçbir ilgisi bulunmamaktadır.
```

Günümüzde JavaScript yalnızca web tarayıcıda değil, sunucuda veya
[JavaScript motoru](https://en.wikipedia.org/wiki/JavaScript_engine) olan her yerde çalışmaktadır.

Tarayıcılar bu JavaScript motoru gömülü bir biçimde gelirler. Bu ayrıca "JavaScript sanal makinesi" olarak da adlandırılır.

Bu JavaScript motorlarından bazıları şunlardır;

- [V8](https://tr.wikipedia.org/wiki/V8_(JavaScript_engine)) --  Chrome, Opera, Microsoft Edge'in yeni versiyonu veya Yandex Browser gibi Chromium tabanlı tarayıcılar tarafından kullanılır. En çok kullanılan JavaScript motorudur.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) --  Firefox'un kendi JavaScript motorudur. [GNOME Shell](https://tr.wikipedia.org/wiki/GNOME_Shell) uzantı desteği için kullanır.
- [JavaScriptCore](https://tr.wikipedia.org/wiki/WebKit) -- Apple'ın Safari tarayıcısı için kullandığı motordur. Diğer WebKit tabanlı tarayıcılar da bunu kullanır. 
- Internet Explorer'ın "Trident", "Chakra" takma adlı motorlarının yanında Microsoft Edge'in eski versiyonu için "ChakraCore" adında ayrı bir motoru bulunmaktadır.

Yukarıdaki terimleri aklınızda tutarsanız iyi olur, çünkü ileride şu tür tümcelerle karşılaşabilirsiniz: "V8'de A özelliğinin altyapısı", "Bu özelliğin altyapısının Chromium tabanlı tarayıcılarda bulunduğunu anlamanız gerekir."

```smart header="JavaScript Motoru Nasıl Çalışır?"

Motorlar çok karmaşık yapılardır. Ancak kolay ögelere dayanırlar.

1. Eğer bu motor tarayıcıya gömülmüş ise yazılan JavaScript kodlarını ayrıştırır.
2. Sonra bu kodları makine diline çevirir.
3. Makine bu kodları çok hızlı bir biçimde çalıştırır.

Motor bu sürecin her bir adımında iyileştirme yapar. Hatta derlenmiş ve çalışır durumda bulunan kodlardaki veri yapılarını inceler ve bunları iyileştirerek daha hızlı duruma getirir. Sonuç olarak yazılan bu kodlar çok hızlı bir biçimde çalışır.
```

## Tarayıcı içerisindeki JavaScript neler yapabilir?

Günümüz JavaScript'i "güvenli" bir programlama dilidir. Düşük seviye diller gibi bellek veya işlemciye doğrudan erişim sağlamaz. Tarayıcı için olduğundan dolayı böyle bir şeye gereksinim duymaz.

JavaScript'in yapabilecekleri büyük bir oranda ortama dayanır. Örneğin [Node.JS](https://wikipedia.org/wiki/Node.js), JavaScript işlevleri ile dosyaları okuma, yazma veya ağ üzerinden isteme işlemlerini yapabilir.

Tarayıcı içerisindeki JavaScript ise web sayfasında görsel değişikliklere ve kullanıcı ile sunucu arasındaki etkileşimle ilgili her şeyi yapabilir.

Örneğin tarayıcı içerisindeki JavaScript şunları yapabilir:

- Sayfaya yeni HTML kodları ekleme veya öncekileri değiştirme, stilleri değiştirme veya ekleme.
- Kullanıcının eylemlerine karşılık verme. Tıklama veya fare imlecinin hareketine göre işlem yaptırabilme.
- Ağ üzerinden talep gönderebilme. Dosya yükleme veya indirebilme ( buna [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) ve [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) teknolojileri denir )
- Tarayıcıdaki çerezleri silme, ekleme veya düzeltme işlemlerinin yapılması. İleti gösterilmesi.
- Kullanıcı tarafında verilerin saklanması ("local storage")

## Tarayıcı içerisinde bulunan JavaScript ne yapamaz?

Tarayıcı içerisinde bulunan JavaScript kullanıcı güvenliği amacıyla sınırlandırılmıştır. Amaç zararlı web sitelerinin özel bilgilere erişip kullanıcıya zarar vermesini engellemektir.

Bu engellemeleri şu biçimde sıralayabiliriz :

- Web sayfasında çalışan JavaScript dosyalara erişim sağlayamaz, saklama alanınızda bulunan programları kopyalayamaz veya çalıştıramaz. İşletim sisteminizin fonksiyonlarına doğrudan erişimi yoktur.

    Günümüz tarayıcıları dosyalarla çalışmanıza izin verebilir. Ancak bu izin oldukça sınırlıdır. Örneğin, yalnızca dosyayı tarayıcıya taşıyıp bırakabilirsiniz veya `<input>` kullanarak dosyayı seçebilirsiniz.

    Her zaman kullanıcıyla kamera veya mikrofon vasıtasıyla veya diğer aygıtlar aracılığıyla etkileşime geçebilirsiniz. Ancak kullanıcının kesin iznini almanız gerekir. Dolayısıyla bir web sayfası JavaScript ile gizliden sizin web kameranızı izleyemez veya çevrenizde bulunanlar hakkında bilgi alamaz. [NSA](https://en.wikipedia.org/wiki/National_Security_Agency)

- Farklı sekmeler birbiri ile iletişime geçemez ve bilgi alışverişi yapamazlar. Bazı sitelerde aynı sekmeler iletişimde bulunabilir, örneğin bir sekmeden JavaScript ile diğer sekmeyi açabilirsiniz. Bu durumda bile, bir sayfa diğerinden farklı alan adı, kural veya kapılarda ise erişemez.

    Bu olaya "Same Origin Policy" (Aynı kaynak kuralı) denir. Bunu çözmek için *her iki sayfa* özel bir JavaScript kodu ile birbirlerini onaylamalıdır. Bu engellemeler yine kullanıcının güvenliği içindir. Kullanıcının açtığı `http://örneksite.com` sitesi diğer sekmede bulunan `http://gmail.com` sitesinden bilgi çalamamalıdır.
- JavaScript kolayca bulunduğu sayfadan veri alabilir. Ancak başka site veya alan adlarından veri alması sorunludur. Olanaklı olmasına karşın her iki yanın onayı gereklidir. Yine, bunun nedeni güvenlik sınırlarıdır diyebiliriz.

![Sınırlamalar](limitations.svg)

Bu sınırlar, tarayıcı dışında kullanıldığında ortadan kalkar. Örneğin, sunucular daha geniş yetkilere sahiptir.

## JavaScript'i eşsiz yapan nedir ?

JavaScript'i eşsiz yapan en az 3 neden vardır:

```compare
+ HTML/CSS ile tamamen bütünleşik çalışması.
+ Basit şeyler basitçe yapılır.
+ Tüm önemli tarayıcılarda çalışır ve ön tanımlı olarak etkindir.
```

JavaScript'ten başka bu üç özelliği taşıyan hiçbir tarayıcı teknolojisi yoktur.

JavaScript'in eşsiz olma nedeni budur ve bu yüzden web sayfaları geliştirmekte kullanılan en yaygın araçtır.

Yeni bir teknolojiyi öğrenmeye başlarken, sunacağı avantajlar için öngörü önemlidir. Bu sebeptendir ki, yeni diller ve tarayıcı yetkinlikleri içeren bu yönelimlere ayak uydurmalıyız.

## JavaScript'e üstün diller

JavaScript'in söz dizimi ve yazımı herkese uymayabilir. Her yiğidin yoğurt yiyişi farklıdır.

Bu olağan bir durum, çünkü tasarımlar ve gereksinimler kişiden kişiye göre değişir.

Bundan dolayı yakın zamanda bir sürü yeni *transpiled* yani çevirilmiş/derlenmiş diller türemiştir. Bu diller, çalıştırılmadan önce JavaScript'e çevriliyor/derleniyor. Günümüz araçları bu çeviri/derleme işini çok hızlı bir biçimde yapmaktadır. Gerçekte, doğrudan —siz yazarken bile— çevirme/derleme işini yapıp bu yeni dosyayı kullanılabilir duruma getirirler.

Bu dillere örnek vermek gerekirse:

- [CofeeScript](http://coffeescript.org) JavaScript için "tatlı yazım" denebilecek bir dildir. Yazılımı daha kısadır ve daha temiz kod yazmaya yardımcı olur. Genellikle [Ruby](https://www.ruby-lang.org/tr/) geliştiriciler bunu sever.

- [Typescript](http://www.typescriptlang.org/) durağan veri yapıları ile JavaScript yazılmasını sağlar. Karmaşık programlar geliştirmeyi kolaylaştırır. Microsoft tarafından geliştirilmiştir.

- [Dart](https://www.dartlang.org/) kendi başına ayrı bir dildir. Tarayıcı üzerinde veya telefon uygulamalarında kendi motoru üzerinden çalıştırılır. Google'ın tarayıcılarda JavaScript yerine Dart'ı önermiş olmasına karşın, bugünlerde JavaScript'e çeviri yapılarak kullanılmaktadır.

Bunlara daha fazla örnek eklenebilir. Yukarıdakileri bilseniz bile ne yaptığınızı tam olarak anlamak için JavaScript bilmelisiniz.

## Özet

- JavaScript başlangıçta yalnızca web tarayıcılarında kullanılmak üzere geliştirilmiş bir dildi. Ancak günümüzde, birçok ortamda çalışabilir durumda.
- JavaScript şu anda HTML/CSS ile bütünleşik olmasından ve geniş uyumluluğundan dolayı benzersizdir.
- Birçok JavaScript'e çevirici/derleyici dil bulunmaktadır. JavaScript'i iyi bir biçimde öğrendikten sonra bu dillere de bir bakmanızı öneririz.
