# Cookies, document.cookie

Çerezler, doğrudan tarayıcıda depolanan küçük veri dizileridir. Çerezler [RFC 6265](https://tools.ietf.org/html/rfc6265) teknik şartnamesi tarafından tanımlanan HTTP protokolünün bir parçasıdırlar.

Çoğu zaman, çerezler bir web sunucusu tarafından ayarlanır. Daha sonra aynı etki alanına yapılan her isteğe otomatik olarak eklenirler.

En yaygın kullanım alanlarından biri kimlik doğrulamadır:

1. Oturum açıldığında, sunucu "session identifier" içeren bir çerez ayarlamak için, gönderilen isteğe verdiği yanıtta `Set-Cookie` HTTP başlığını kullanır.
2. Gelecek sefere istek aynı etki alanından yapıldığında, tarayıcı `Cookie` HTTP-header başlağını kullanarak ağ üzerinden gönderir.
3. Böylece sunucu isteğin kim tarafından yapıldığını bilir.

Ayrıca `document.cookie` özelliğini kullarak çerezelere tarayıcıdan da erişebiliriz.

Çerezler ve seçenekleri hakkında birçok ince detay var. Bu bölümde bunları ayrıntılı olarak ele alacağız.

## Reading from document.cookie

```online
Bu sitede hiç çerezin var mı? Hadi görelim:
```

```offline
Bir web sitesinde olduğunuzu varsayalım, çerezleri şu şekilde görmek mümkündür:
```

```js run
// javascript.info sitesinde, biz istatistikler için Google Analytics kullanırız,
// bu yüzden bazı çerezler olmalı
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```
`document.cookie` değeri `; ` ile ayrılmış `name=value` çiftlerinden oluşur. Her biri ayrı bir çerezdir.

Bellirli bir çerezi bulmak için, `document.cookie` yi `; ` ile ayırabiliriz ve sonra doğru ismi bulabiliriz. Ayrıca bunu yapmak için düzenli ifadeler (regular expresion) veya dizi methodlarını da kullanabiliriz.

Bunu okuyucu için bir egseriz olarak bırakıyoruz. Ayrıca, bu bölümün sonunda yardımcı fonksiyonlar ve üzerinde değişiklik yapabileceğiniz çerezler bulacaksınız.

## document.cookie' ye yazma

`document.cookie` ye yazabilir. Ancak bu bir veri özelliği değildir, bu bir erişimdir.

**`document.cookie` yazılan bir işlemi, tarayıcında sayesinde belirttiğimiz çerezleri günceller fakat bu, diğer çerezleri etkilemez.**

Örneğin, bu ismi `user` ve değeri `John` olan bir çerezi ayarlar :

```js run
document.cookie = "user=John"; // sadece 'user' isimli çerezi günceller
alert(document.cookie); // tüm çerezleri göster
```
Eğer komutu çalıştırırsanız, muhtemelen birden fazla çerez göreceksiniz. Bunun nedeni `document.cookie=` işlem tüm çerezleri etkilemediği içindir. Sadece `user` adlı çerezi değiştirir.

Tekinik olarak, isim ve değer herhangi bir karakter içerebilir, fakat geçerli bir atama yapmak için `encodeURIComponent` yerleşik fonksiyonu kullanılmalıdır:

```js run
// special values, need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

```warn header="Limitations"
Birkaç kısıtlama vardır:
- `encodeURIComponent` fonksiyonunu kullanırken `name=value` çifti 4kb yi geçmemelidir. Yani br çerezde çok büyük bir değer tutulamaz.
- 
- Kesin sınır tarayıcının türüne bağlı olmakla birlilte, etki alanı başına toplam çerez sayısı 20+ ile sınırlıdır.
```

Çerezlerin birkaç seçeneği vardır, bunların çoğu önemli ve ayarlanması gerekir. 

Seçenekler `key=value` ile belirtilmiş ve `;` ile ayrılmış, aşağıdaki gibi listelenir:

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Çerezin URL öneki ulaşılabilir olmalıdır. Tam olmalıdır. Varsayılan olarak, geçerli yoldur.

Eğer bir çerez `path=/admin` olarak ayarlandıysa, bu çerez `/admin` ve `/admin/something` sayfalarında görülebilir, ancak `/home` ya da `/adminpage` sayfalarında görünmez.

Genelde, biz  çerezin tüm web sayfalarında  erişebilir olması için `path=/` şeklinde ayarlarız. 

## domain

- **`domain=site.com`**

Çerezlere etki alanı üzerinden erişilebilir. Ancak pratikte bazı kısıtlamalar vardır. Bu çerezleri herhangi bir etki alanına ayarlayamayız.

Varsayılan olarak, bir çerez sadece onu ayarladığımız etki alanından erişilebilir. Yani, eğer çerez `site.com` etki alanına ayarlanmışsa, biz ona `other.com` etki alanından erişemeyiz.

...Ancak daha ilginç olanı, `forum.site.com` alt etki alnından da çerezlere erişilemez.


```js
//  diyelim ki site.com alan adlı sitede şöyle bir çerez ataması yapılmış olsun 
document.cookie = "user=John"

// forum.site.com alt etki alanından aynı çereze erişmeye çalıştığımızda çıktı aşağıdaki gibi olur
alert(document.cookie); // kullanıcı yok
```

**Bir çerezin başka 2.seviye bir etki alanından erişilebilmesini sağlamanın bir yolu yok, bu nedenle `other.com` sitesi hiçbir zaman `site.com` sitesinde ayarlanmış bir çereze erişemeyeektir.**

Bunun sebebi, önemli verileri çerezlerde saklamamıza izin veren bir günvelik sınırlamasıdır.

...Ancak `forum.site.com` gibi alt alan adlarına erişim izni vermek istiyorsak, bu mümkündür. Bunun için `domain` seçeneğini açıkça `domain=site.com` seçeneğine ayarlamamız gerekiyor:

```js
//  site.com etki alnında, herhangi bir alt etki alanına şöyle ayarlayabiliriz:
document.cookie = "user=John; domain=site.com"

// forum.site.com alt alanından çerezlere erişelim 
alert(document.cookie); // çıktı: kullanıcılar
```
Geçmişten gelen nedenlerden dolayı, `domain=.site.com` (başında bir nokta ile) şeklinde de çalışır, çok eski tarayıcıları desteklemek içn noktayı eklemek daha iyi olabilir.

Dolayısıyla, `domain` seçeneği, çerezlere alt alan adlarından da erişmeyi izin verir.

## expires, max-age

Varsayılan olarak, eğer bir çerez bu seçeneklerden birine sahip değilse, tarayıcı kapatıldığında çerezler de yok olur. Bu tür çerezlere "session cookies" denir.

Tarayıcı kapatıldığında bile çerezlerin yok olmasını engellemek için `expires` ya da `max-age` seçeneklerinden birini ayarlamak gerekir.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Bu örnekte, tarayıcının 19 Ocak 2038 e kadar çerezi otomatik olarak tutumasını ve süresi dolunca silmesini sağlar.

Tarih, kesinlikle GMT zaman dilimi formatında olmalı. Bu formatı elde etmek için `date.toUTCString` methodunu kullanabiliriz. Örneğin, çerezi 1 gün sonra yok olacak şekilde ayarlabiliriz:

```js
// +1 day from now
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```
Eğer çerezin `expires` seçeneğini geçmişteki bir tarihe ayarlarsak, çerez silinir.

-  **`max-age=3600`**

`expires` seçeneğine alternatif olarak, çerezi geçerli andan itibaren saniye türünden yok olmasını belirtir.

Eğer saniye, sıfır ya da negatif bir sayı olursa, çerez silinir.

```js
// çerez ayarlandığı zamandan bir saat sonra silinir.
document.cookie = "user=John; max-age=3600";

// çerezi sil (çerezin süresinin sona ermesine izin ver)
document.cookie = "user=John; max-age=0";
```  

## secure

- **`secure`**

Çerez sadece HTTPS üzerinden gönderilmelidir.

**Varsayılan olarak, eğer `http://site.com` sitesi üzerinden bir çerez ayarlarsak, bu aynı zamanda `https://site.com` sitesi üzerinden görünür ve tersi de mümkündür.**

Yani, çerezler etki alanı tabanlıdır, protokoller arasında ayırım yapmaz.

Bu seçenekle beraber, eğer bir çerez hassas bilgiler içeriyorsa, durum değişir. Yani bir çerez `https://site.com` etki alanına ayarlamışsa, bu çereze `http://site.com` üzerinden erişem mümkün değildir, çünkü HTTP ile HTTPS arasında S günvelik flagı vardır. Bu da çerezlere erişilmesini engeller. Sonuç olarak hassas bilgilere sahip çerezleriniz varsa HTTPS protokülünü kullanmanız daha doğru olur.
```js
// assuming we're on https:// now
// set the cookie secure (only accessible if over HTTPS)
document.cookie = "user=John; secure";
```  

## samesite

Bu, XSRF (siteler arası sahte istek) saldırılarından korunmak için başka bir güvenlik seçeneğidir.

Bu seçeneğin ne zaman işimize yarayacağını anlamak için aşağıdaki senaryoya bakalım.

### XSRF attack

`bank.com` sitesine giriş yaptığınızı düşünün. Yani: bu siteden bir tane kimlik doğrulama çereziniz var. Tarayıcınızla `bank.com` sitesine her giriş yaptığınızda, tarayıcınız bu çerezi `bank.com` sitesinin bulunduğu sunucuya gönderir, böylece `bank.com` sitesi sizi tanır ve tüm hassas finansal işlemlerinizi gerçekleştirir.

Şimdi, başka bir sekmede internette gezinirken (`evil.com`), bu sitede (`evil.com`) de bilgisayar korsanına ait bir giriş hesabı var ve bu site zaman zaman <form action="https://bank.com/pay"> ile `bank.com` sitesine otomatik olarak bir form isteği gönderiyor.

Bu form kayıt isteği `evil.com` sitesi üzerinden doğrudan `bank.com` sitesine istekler gönderir ve siz `bank.com` sitesini her ziyaret ettiğinizde gönderildiği için otomatik olarak bu siteye de size gönderilen çerezin aynısı gönderilir. Böylece bilgisayar korsanı kendi bilgiyasarı üzerinden işlem yaptığında, `bank.com` sitesinin sunucusu bunun siz olduğunuzu varsayıp, yapılan tüm finansal işlemlere onay verir.


![](cookie-xsrf.svg)

Buna, siteler arası istek sahteciliği (ya da XSRF) saldırısı denir.

Tabi ki, gerçek bankalar buna karşı koruma sağlarlar. `bank.com` tarafından oluşturulan tüm formların özel bir alanı vardır, buna "xsrf protection token" (xsrf koruma belirteci) denir, kötü niyetli biri ne bir form oluşturabilir ne de buradan uzaktan veri çekebilir (formu kayıt edebilir ancak veriyi geri alamaz).

Ancak bunu uygulamak zaman alır, her formun token (belirteç) alanına sahip olduğundan emin olmalıyız ve ayrıca tüm istekleri kontrol etmemiz gerekir.

### Enter cookie samesite option

`samesite` seçeneği, bu tür saldırılardan korunmak için, (teorik olarak) "xsrf protection tokens" kullanmayı gerektirmeyen, başka bir yol sağlar.

Olası iki değeri vardır:

- **`samesite=strict` (same as `samesite` without value)**

`samesite=strict` 

`samesite=strict` özelliğine sahip bir çerez, kullanıcının web sitesine dışarıdan geldiği durumlarda hiçbir zaman tarayıcı tarafından gönderilmez veya paylaşılmaz. Bu, çerezin sadece aynı web sitesi içindeki isteklerde kullanılmasını ve diğer web siteleriyle paylaşılmamasını sağlayan bir güvenlik önlemidir.

Başka bir deyişle, bir kullanıcı e-postalarından bir bağlantıyı takip etse veya `evil.com` 'dan bir form gönderse veya başka bir alan alanından kaynaklanan herhangi bir işlem yapsa da çerez gönderilmez.

Eğer kimlik doğrulama çerezleri `samesite` seçeneğine sahipse, XSRF saldırısının başarılı olma şansı yoktur, çünkü `evil.com` gelen istekler çerezler olmadan gelir. Böylece `bank.com` sitesi kullanıcıyı tanımayacak ve ödeme işlemi gerçekleşmeyecektir.

Koruma oldukça güvenilirdir. Yalnızca `bank.com` sitesi içerisinden gelen işlemlere `samesite` çerezi gönderecektir.

Yine de, küçük bir sıkıntı var.

Bir kullanıcı kendi bilgisayarında not defterine `bank.com` sitesine giden gerçek bir link kaydettiğinde ve daha sonra bu linke tıklayıp işlem yapmaya çalıştığında, ilginç bir şekilde karşılacağı durum, tekrardan oturum açması gerektiğidir. Aslında, `samesite=strict` çerezleri bu durumda gönderilmez.

Bu durumu iki çerez kullarak aşabiliriz: birincisi "general recognition" (genel tanıma) için, bunun amacı sadece "Hello, John" gibi mesajları gösterme açmacı için kullanılır, ve diğeri de `samesite=strict` özelliği ile verileri değiştirmek içindir. O zaman eğer kişi site dışından geliyorsa hoşgeldin mesajını görecektir, ancak yine de işlem yapmak için (ödeme vs.) bankanın kendi sitesinden içinden işlem başlatmak zorundadır. 

- **`samesite=lax`**

XSRF saldırısından korunmak ve kullanıcı deneyimini olumsuz etkilememek için daha iyi bir yaklaşımdır.

Lax modu,  `strict` modu gibi, tarayıcının site dışından gelen istekleri çerezleri göndermesini engeller, ancak bir istisna ekler.

Eğer aşağıdaki her iki koşul varsa `samesite=lax` çerezi gönderilir: 

1. HTTP methodu eğer güvenli ise (örneğin GET, ama POST değilse).

    [RFC7231 specification](https://tools.ietf.org/html/rfc7231) (RFC7231 teknik şartnamesi) nin güvenli yöntemlerinin tam listesini burada bulabilirsiniz. Temel olarak, bunlar veriyi yazmak için değil, okumak için kullanılması gereken yöntemlerdir. Herhangi bir veriyi değiştirmek için kullanılmamalıdır. Bir link bağlantısını takip etmenin daima en güvenli yolu GET yöntemidir.

2. Bu işlem üst seviye gezinti gerçekleştirir (tarayıcı adres çubuğundaki URL'yi değiştirir).

    Bu durum genellikle olur, ancak bu bir `<iframe>` HTML elementi (bir sayfa içine dökümanlar, videolar ve interaktif medya yerleştirmenizi sağlayan bir HTML elementi) içindeyse, o zaman bu üst seviye bir gezinti değildir, Ayrıca, AJAX istekleri de üst seviye gezintiyi değiştirmediğinden, onlar da aynı kapsamdadır.

Yani, `samesite=lax`'nin yaptığı şey temel olarak en yaygın "go to URL" işlemlerinin çerezlere erişmesine izin vermektir. Örneğin, notlardan bir web sitesi bağlantısı açmak gibi bu koşulları karşılar.

Ancak başka siteden gelen AJAX istekleri veya bir form gönderimi gibi daha karmaşık işlemler bu çerezlere erişemezler. 

Eğer bu sizin için uygunsa, o zaman `samesite=lax` eklemek muhtemelen size korumak sağlayacak ve kullanıcı deneyiminizi olumsuz etkilemeyecektir. 

Genel olarak, `samesite` harika bir seçenektir, ancak önemli bir dezavantajı vardır:

- `samesite` 2017 ve önceki tarayıcıları tarafından desteklenmez (yok sayılır).

**Dolayısıyla, koruma sağlamak için yalnızca `samesite` güvenirsek, eski tarayıcılar savunmasız kalacaktır.**

Fakat, ek bir savunma katmanı eklemek için `samesite`'i,"xsrf belirteçleri" gibi, diğer koruma önlemleriyle birlikte kullanabiliriz, gelecekte, eski tarayıcılar kullanımdan kaldırıldığında (internet explorer gibi), muhtemelen "xsrf belirteçlerini" kullanmayı bırakabiliriz.

## httpOnly

Bu seçeneğin JavaScript ile hiçbir ilgisi yoktur, ancak konu bütünlüğünden dolayı bundan da bahsetmemiz gerekiyor.

Web sunucuları çerezleri ayarlamak için `Set-Cookie` başlığını kullanır. Ve bunu yaparken `httpOnly` seçeneğine ayarlanması gerekir.

Bu seçenek, çerezlere herhangi bir JavaScript erişimini engeller. Böyle bir çerezi göremeyiz ya da `document.cookie` seçeneğini ile üstünde değişiklikler yapamyız.

Bu, bir bilgisayar korsanının kendi JavaScript kodunu bir sayfaya enjekte etmesi ve kullanıcının bu sayfayı ziyaret etmesini beklemesi durumunda belirli saldırılardan korunmak için bir önlem olarak kullanılır. Buna hiçbir zaman izin verilmemeli, bir bilgisayar korsanı kendi kodunu sitemize enjekte edememelidir, ancak bilgisayar korsanlarının bunu yapmasına izin veren hatalar olabilir.

Normalde, eğer böyle bir şey olursa ve bir kullanıcı bilgisayar korsanının kodunu içeren bir web sayfasını ziyaret ederse, bu kod çalışır ve kimlik doğrulama bilgilerini içeren çerezlerine `document.cookie` seçeneği ile erişir. Berbat bir durum.

Ancak eğer bir çerez `httpOnly` ise, `document.cookie` bu çerezi göremez, bu nedenle bilgilerimiz korunur.

## Appendix: Cookie functions

Aşağıda çerezlerle çalışmak için `document.cookie` ile çerezleri  manuel olarak değiştirmekten daha kullanışlı bir fonksiyon var.

Bunun için yayınlanmış birçok çerez kütüphanesi vardır, bu yüzden bunlar sadece gösterim amaçlı. Yine de tamamen çalışıyor.

### getCookie(name)

Bir çereze erişmenin kısa yolu [regular expression](info:regular-expressions) (buradan daha detaylı bakabilirsiniz) yöntemini kullanmaktır.

 `getCookie(name)` fonksiyonu `name` adı verilen çerezi geriye döndürür:

```js
// verilen isme sahip çerezi geri döndürür,
// ya da bulamazsa undefined geri döndürür
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```
Burada `new RegExp` sınıfı dinamik olarak oluşturulur, eşleştirmek için `; name=<value>` kullanılır.

Lütfen bir çerez değerinin şifrelenmiş olduğunu unutmayın, bu nedenle `getCookie` fonksiyonu çerezlerin şifresini(encode => decode) çözmek için `decodeURIComponent` yerleşik methodunu kullanır.

### setCookie(name, value, options)

Çerezi verilen `name` ve `value`çifti ile varsayılan olarak `path=/` 'a ayarlar (başka varsayılanları eklemek için değiştirilebilir):

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // eğer istersek başka varsayılanları da buraya ekleyebiliriz
    ...options
  };

  if (options.expires.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Bizim için bir örnek:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Bir çerezi silmek için, onu negatif bir son kullanma tarihi ile çağırabiliriz:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Updating or deleting must use same path and domain"
Önemli not: bir çerezi güncellediğimizde ya da sildiğimizde, daha önce kullandığımız path ve domain seçeneklerinin tam olarak aynısını kullanmalıyız.
```

Tüm fonksiyonlar: [cookie.js](cookie.js).

## Appendix: Third-party cookies

Bir çerez, kullanıcının ziyaret ettiği başka bir etki alanı tarafından yerleştirilmişse buna "third-party" (üçüncü taraf) denir.

Örneğin:
1. `site.com` sitesindeki bir sayfa başka bir siteden banner yükler: `<img src="https://ads.com/banner.png">`.
2. Banner ile birlikte, `ads.com` adlı uzak sunucu `id=1234` gibi bir çerezi `Set-Cookie` yöntemiyle başlık olarak ayarlayabilir. Bu çerez `ads.com` etki alanından gelir, ve yalnıca `ads.com` sitesinde görünür:

    ![](cookie-third-party.svg)

3. Bir dahaki sefere `ads.com` sitesine erişildiğinde,  uzak sunucu `id` çerezini alır ve kullanıcıyı tanır:

    ![](cookie-third-party-2.svg)

4. Daha da önemlisi, kullanıcılar `site.com` sitesinden banneri olan başka bir siteye `other.com` geçtiğinde, o zaman, çerez `ads.com` sitesine ait olduğu için, `ads.com` sitesi çereze erişebilir, böylelikle ziyaretçiyi tanır ve siteler arasında gezinirken onu izler:

    ![](cookie-third-party-3.svg)

Üçüncü taraf(third-party) çerezleri, doğaları gereği, geneleneksel olarak izleme ve reklam hizmetleri için kullanılır. Bunlar kaynak etki alanına bağlıdır, bu yüzden `ads.com`, ona erişen farklı siteler arasında aynı kullanıcıyı takip edebilir.

Doğal olarak, bazı insanlar takip edilmeyi sevmezler, bu yüzden tarayıcı bu tür çerezlerin devre dışı bırakılmasına izin verir.

Ayrıca, bazı modern tarayıcılar bu tür çerezler için özel politikalar uygular:
- Safari üçüncü parti çerezlerine hiç izin vermez.
- Firefox üçüncü taraf çerezleri kullanan etki alanlarına ait bir "black list" liste seçeneği sunar.


```smart
Üçüncü taraf bir etki alanından bir script (komut dosyasını) yüklersek, örneğin `<script src="https://google-analytics.com/analytics.js">`, ve bu script (komut dosyasını) `document.cookie` özelliğini kullanarak bir çerez ayarlamak için kullanırsa, bu çerez üçüncü taraf çerezi değildir.

Eğer script(komut dosyasını) çerezleri ayarlarsa, o zaman komut dosyasının nereden geldiğinin bir önemi yoktur -- bu çerez web sayfasının etki alanına aittir.
```

## Appendix: GDPR

Bu konu JavaScript ile ilgili değildir, sadece çerezleri ayarlarken akılda tutulması gereken bir durumdur.

Avrupa'da GDPR adı verilen ve web sitelerinin kullanıcıların gizliliğine saygı göstermesi için bir dizi kural uygulayan bir mevzuat var. Bu kurallardan biri de çerezlerin izlenmesi için kullanıcıdan açık bir izin alınmasıdır.

Lütfen dikkat, bu yalnızca çerezleri izleme/tanımlama hakkındadır.

Dolayısıyla, yalnızca bazı bilgileri kaydeden, ancak kullanıcıyı izlemeyen veya tanımlamayan bir çerez ayarlarsak, bunu yapmakta özgürüz.

Ancak kimlik doğrulama oturumu veya kişiyi izmelek için bir çerez oluşturacaksak, bunun için kullanıcıdan izin almak zorundayız.

Genelde web siteleri GDPR nin iki varyantını takip ederler. Bunları zaten webde görmüşsünüzdür:

1. Eğer bir web sitesi izleme çerezlerini yalnızca kimliği doğrulanmış kullanıcılar için ayarlamak istiyorsa.

    Bunu yapmak için, kayıt formunda "gizlilik politikasını kabul et" gibi bir onay kutusu bulunmalı, kullanıcı bunu işaretlemeli ve ardından web sitesi auth(kimlik doğrulama) çerezlerini ayarlamakta özgürdür.

2. Eğer bir web sitesi herkesi izlemek için çerezleri ayarlamak istiyorsa.

    Bunu yasal olarak yapmak için, web sitesi yeni gelenler için bir tane açılır pencere(modal) "açılış ekranı" gösterir ve  çerezleri kabul etmelerini ister. Daha sonra web sitesi içeriği görüntülemesine izin verecek şekilde ayarlar. Ancak bu yeni ziyaretçiler için sinir bozucu olabilir. Hiç kimse web sitesinin içeriği yerine "tıklanması zorunlu" açılır pencere görmekten hoşlanmaz. Fakat GDPR mevzuatı gereği bunu açık bir şekilde yapması gerekir.

GDPR mevzuatı sadece çerezlerle ilgili değildir, gizliliği içeren diğer konularla da ilgili, ancak bu bizim konumuzun kapsamımının dışında.


## Özet

`document.cookie` çerezlere erişmemizi sağlar.
- yazma işlemleri sadece atıfta bulunduğumuz çerezleri düzenler.
- isim/değer çifti şifrelenmiş olmak zorundadır.
- bir çerez 4kb kadar olmalıdır, site başına 20+ çerez ayarlanabilir (tarayıcıya bağlı).

Çerez seçenekleri:
- `path=/`, varsayılan olarak geçerli yoldur,  çerezi yalnızca bu yol üzerinde görünür hale getirir.
- `domain=site.com`, varsayılan olarak bir çerez yalnızca geçerli etki alanında görünür, etki alanına açıkça ayarlanırsa, çerezi alt etki alanlarında görünür hale getirir.
- `expires` ya da `max-age` çerezin son kullanma tarihini ayarlar, eğer ayarlanmazsa tarayıcı kapatıldığında çerezler yok olur.
- `secure` çerezi HTTPS-only şeklinde ayarlar(hassas verilere sahip çerezler için gevenlik sağlar).
- `samesite` tarayıcının site dışından gelen isteklerle çerez göndermesini engeller, XSRF saldırılarını önlemeye yardımcı olur.

Ek olarak:
- Üçüncü taraf çerezleri tarayıcı tarafından engellenebilir, örneğin Safari varsayılan olarak engeller.
- AB vatandaşları için bir izleme çerezi ayarlarken, GDPR mevzuatına göre kullanıcıdan izin istemek zorundasınız.
