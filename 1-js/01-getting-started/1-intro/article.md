# JavaScript'e Giriş

<<<<<<< HEAD
Bakalım JavaScript nedir, ne yapılır ve hangi teknolojilerle birlikte çalışır.
=======
Let's see what's so special about JavaScript, what we can achieve with it, and what other technologies play well with it.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## JavaScript Nedir?

<<<<<<< HEAD
*JavaScript*, ilk başta  *"web belgelerine canlılık"* getirmek için oluşturulmuştur.
=======
*JavaScript* was initially created to "make web pages alive".
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Bu dilde yazılan kod kümelerine betik denir. Doğrudan HTML kodu içerisine yazılıp sayfa yüklendiğinde doğrudan çalışabilir.

Komutlar herhangi bir derleme ve hazırlığa gereksinim duymadan doğrudan çalışırlar.

Bu yönden bakınca JavaScript diğer dillere kıyasla oldukça farklıdır. Bkz: [Java](http://en.wikipedia.org/wiki/Java).

<<<<<<< HEAD
```smart header="Neden <u>Java</u>Script?"
JavaScript ilk yazıldığında, başka bir adı vardı: "LiveScript". Ancak Java dili o dönemlerde çok ünlü olduğundan dolayı yeni bir dil ve "küçük kardeş" gibi görünmesi açısından JavaScript olarak değiştirildi.
=======
```smart header="Why is it called <u>Java</u>Script?"
When JavaScript was created, it initially had another name: "LiveScript". But Java was very popular at that time, so it was decided that positioning a new language as a "younger brother" of Java would help.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Ancak JavaScript gelişerek kendince yönergeleri [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) olan bağımsız bir dil haline geldi. Şu anda Java ile hiçbir ilgisi bulunmamaktadır.
```

Günümüzde JavaScript yalnızca ağ tarayıcıda değil, sunucuda veya
[JavaScript motoru](https://en.wikipedia.org/wiki/JavaScript_engine) olan her yerde çalışmaktadır.

Tarayıcılar bu JavaScript motoru gömülü bir biçimde gelirler. Bu ayrıca "JavaScript sanal makinesi" olarak da adlandırılır.

Bu JavaScript motorlarından bazıları şunlardır;

<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) --  Chrome ve Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) --  Firefox.
- Internet Explorer'ın "Trident", "Chakra" takma adlı motorlarının yanında Microsoft Edge için "ChakraCore" adında ayrı bir motoru bulunmaktadır. Safari ise "Nitro", "SquirrelFish" ve "SquirrelFish Extreme" gibi takma adlarla adlandırılan JavaScript motorunu kullanmaktadır.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome and Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "ChakraCore" for Microsoft Edge, "Nitro" and "SquirrelFish" for Safari, etc.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Yukarıdaki terimleri aklınızda tutarsanız iyi olur, çünkü ileride şu tür tümcelerle karşılaşabilirsiniz: "V8'de A özelliğinin altyapısı", "Bu özelliğin altyapısının Chrome ve Opera'da bulunduğunu anlamanız gerekir."

```smart header="JavaScript Motoru Nasıl Çalışır?"

Motorlar çok karmaşık yapılardır. Ancak kolay ögelere dayanırlar.

1. Eğer bu motor tarayıcıya gömülmüş ise yazılan JavaScript kodlarını ayrıştırır.
2. Sonra bu kodları makine diline çevirir.
3. Makine bu kodları çok hızlı bir biçimde çalıştırır.

<<<<<<< HEAD
Motor bu sürecin her bir adımında iyileştirme yapar. Hatta derlenmiş ve çalışır durumda bulunan kodlardaki veri yapılarını inceler ve bunları iyileştirerek daha hızlı duruma getirir. Sonuç olarak yazılan bu kodlar çok hızlı bir biçimde çalışır.
=======
The engine applies optimizations at each step of the process. It even watches the compiled script as it runs, analyzes the data that flows through it, and further optimizes the machine code based on that knowledge.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
```

## Tarayıcı içerisindeki JavaScript neler yapabilir?

Günümüz JavaScript'i "güvenli" bir programlama dilidir. Düşük düzeydeki diller gibi bellek veya işlemciye doğrudan erişim sağlamaz. Tarayıcı için olduğundan dolayı böyle birşeye gereksinim duymaz.

JavaScript'in yapabilecekçeleri büyük bir oranda ortama dayanır. Örneğin [Node.JS](https://wikipedia.org/wiki/Node.js), JavaScript işlevleri ile dosyaları okuma, yazma veya ağ üzerinden isteme işlemlerini yapabilir.

Tarayıcı içerisindeki JavaScript ise web sayfasında görsel değişikliklere ve kullanıcı ile sunucu arasındaki etkileşimle ilgili herşeyi yapabilir.

Örneğin tarayıcı içerisindeki JavaScript şunları yapabilir:

- Sayfaya yeni HTML kodları ekleme veya öncekileri değiştirme, stilleri değiştirme veya ekleme.
- Kullanıcının eylemlerine karşılık verme. Tıklama veya fare imlecinin hareketine göre işlem yaptırabilme.
- Ağ üzerinden talep gönderebilme. Dosya yükleme veya indirebilme ( buna [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) ve [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) teknolojileri denir )
- Tarayıcıdaki çerezleri silme, ekleme veya düzeltme işlemlerinin yapılması. İleti gösterilmesi.
- Kullanıcı tarafında verilerin saklanması ("local storage")

## Tarayıcı içerisinde bulunan JavaScript ne yapamaz?

Tarayıcı içerisinde bulunan JavaScript kullanıcı güvenliği amacıyla sınırlandırılmıştır. Amaç zararlı web sitelerinin özel bilgilere erişip kullanıcıya zarar vermesini engellemektir.

Bu engellemeleri şu biçimde sıralayabiliriz :

<<<<<<< HEAD
- Web sayfasında çalışan JavaScript dosyalara erişim sağlayamaz, saklama alanınızda bulunan programları kopyalayamaz veya çalıştıramaz. İşletim sisteminizin fonksiyonlarına doğrudan erişimi yoktur.
=======
- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS functions.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

    Günümüz tarayıcıları dosyalarla çalışmanıza izin verebilir. Ancak bu izin oldukça sınırlıdır. Örneğin, yalnızca dosyayı tarayıcıya taşıyıp bırakabilirsiniz veya `<input>` kullanarak dosyayı seçebilirsiniz.

    Her zaman kullanıcıyla kamera veya mikrofon vasıtasıyla veya diğer aygıtlar aracılığıyla etkileşime geçebilirsiniz. Ancak kullanıcının kesin iznini almanız gerekir. Dolayısıyla bir web sayfası JavaScript ile gizliden sizin web kameranızı izleyemez veya çevrenizde bulunanlar hakkında bilgi alamaz. [NSA](https://en.wikipedia.org/wiki/National_Security_Agency)

- Farklı sekmeler birbiri ile iletişime geçemez ve bilgi alışverişi yapamazlar. Bazı sitelerde aynı sekmeler iletişimde bulunabilir, örneğin bir sekmeden JavaScript ile diğer sekmeyi açabilirsiniz. Bu durumda bile, bir sayfa diğerinden farklı alan adı, kural veya kapılarda ise erişemez.

    Bu olaya "Same Origin Policy" (Aynı kaynak kuralı) denir. Bunu çözmek için *her iki sayfa* özel bir JavaScript kodu ile birbirlerini onaylamalıdır. Bu engellemeler yine kullanıcının güvenliği içindir. Kullanıcının açtığı `http://örnekyerlik.com` sitesi diğer sekmede bulunan `http://diğeryerlik.com` sitesinden bilgi çalamamalıdır.
- JavaScript kolayca bulunduğu sayfadan veri alabilir. Ancak başka site veya alan adlarından veri alması sorunludur. Olanaklı olmasına karşın her iki yanın onayı gereklidir. Yine, bunun nedeni güvenlik sınırlarıdır diyebiliriz.

<<<<<<< HEAD
![Sınırlamalar](limitations.svg)
=======
![](limitations.svg)
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

Bu sınırlar, tarayıcı dışında kullanıldığında ortadan kalkar. Örneğin, sunucular daha geniş yetkilere sahiptir.

## JavaScript'i eşsiz yapan nedir ?

JavaScript'i eşsiz yapan en az 3 neden vardır:

```compare
+ HTML/CSS ile tamamen bütünleşik çalışması.
+ Basit şeyler basitçe yapılır.
+ Tüm önemli tarayıcılarda çalışır ve ön tanımlı olarak etkindir.
```

JavaScript'ten başka bu üç özelliği taşıyan hiçbir tarayıcı teknolojisi yoktur.

<<<<<<< HEAD
JavaScript'in eşsiz olma nedeni budur ve bu yüzden web sayfaları geliştirmekte kullanılan en yaygın araçtır.

Yeni bir teknolojiyi öğrenmeye başlarken, sunacağı avantajlar için öngörü önemlidir. Bu sebeptendir ki, yeni diller ve tarayıcı yetkinlikleri içeren bu yönelimlere ayak uydurmalıyız.
=======
That said, JavaScript also allows to create servers, mobile applications, etc.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## JavaScript'e üstün diller

JavaScript'in sözdizimi ve yazımı herkese uymayabilir. Her yiğidin yoğurt yiyişi ayrıdır.

Bu olağan bir durum, çünkü tasarımlar ve gereksinimler kişiden kişiye göre değişir.

Bundan dolayı yakın zamanda bir sürü yeni *transpiled* yani çevirilmiş diller türemiştir. Bu diller, çalıştırılmadan önce JavaScript'e çevriliyor. Günümüz araçları bu çeviri işini çok hızlı bir biçimde yapmaktadır. Gerçekte, doğrudan -siz yazarken bile- çevirme işini yapıp bu yeni dosyayı kullanılabilir duruma getirirler.

Bu dillere örnek vermek gerekirse:

<<<<<<< HEAD
- [CofeeScript](http://coffeescript.org) JavaScript için "şeker yazım" denebilecek bir dildir. Yazılımı daha kısadır ve daha temiz kod yazmaya yardımcı olur. Genellikle [Ruby](https://www.ruby-lang.org/tr/) geliştiriciler bunu sever.

- [Typescript](http://www.typescriptlang.org/) durağan veri yapıları ile JavaScript yazılmasını sağlar. Karmaşık programlar geliştirmeyi kolaylaştırır. Microsoft tarafından geliştirilmiştir.
=======
Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

- [Dart](https://www.dartlang.org/) kendi başına ayrı bir dildir. Tarayıcı üzerinde veya telefon uygulamalarında kendi motoru üzerinden çalıştırılır. Google'ın tarayıcılarda JavaScript yerine Dart'ı önermiş olmasına karşın, bu günlerde JavaScript'e çeviri yapılarak kullanılmaktadır.

Bunlara daha fazla örnek eklenebilir. Yukarıdakileri bilseniz bile ne yaptığınızı tam olarak anlamak için JavaScript bilmelisiniz.

<<<<<<< HEAD
## Özet

- JavaScript başlangıçta yalnızca ağ tarayıcılarında kullanılmak üzere geliştirilmiş bir dildi. Ancak günümüzde, birçok çevrede çalışabilir durumda.
- JavaScript şu anda HTML/CSS ile bütünleşik olmasından ve geniş uyumluluğundan dolayı benzersizdir.
- Bir çok JavaScript'e çevirici dil bulunmaktadır. JavaScript'i iyi bir biçimde öğrendikten sonra bu dillere de bir bakmanızı öneririz.
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration in HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
