# Cookies, document.cookie

<<<<<<< HEAD
Çerezler, doğrudan tarayıcıda depolanan küçük veri dizileridir. Çerezler [RFC 6265](https://tools.ietf.org/html/rfc6265) teknik şartnamesi tarafından tanımlanan HTTP protokolünün bir parçasıdırlar.

Çoğu zaman, çerezler bir web sunucusu tarafından ayarlanır. Daha sonra aynı etki alanına yapılan her isteğe otomatik olarak eklenirler.
=======
Cookies are small strings of data that are stored directly in the browser. They are a part of the HTTP protocol, defined by the [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Cookies are usually set by a web server using the response `Set-Cookie` HTTP header. Then, the browser automatically adds them to (almost) every request to the same domain using the `Cookie` HTTP header.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

En yaygın kullanım alanlarından biri kimlik doğrulamadır:

<<<<<<< HEAD
1. Oturum açıldığında, sunucu "session identifier" içeren bir çerez ayarlamak için, gönderilen isteğe verdiği yanıtta `Set-Cookie` HTTP başlığını kullanır.
2. Gelecek sefere istek aynı etki alanından yapıldığında, tarayıcı `Cookie` HTTP-header başlağını kullanarak ağ üzerinden gönderir.
3. Böylece sunucu isteğin kim tarafından yapıldığını bilir.
=======
1. Upon sign-in, the server uses the `Set-Cookie` HTTP header in the response to set a cookie with a unique "session identifier".
2. Next time the request is sent to the same domain, the browser sends the cookie over the net using the `Cookie` HTTP header.
3. So the server knows who made the request.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ayrıca `document.cookie` özelliğini kullarak çerezelere tarayıcıdan da erişebiliriz.

<<<<<<< HEAD
Çerezler ve seçenekleri hakkında birçok ince detay var. Bu bölümde bunları ayrıntılı olarak ele alacağız.
=======
There are many tricky things about cookies and their attributes. In this chapter, we'll cover them in detail.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Reading from document.cookie

```online
<<<<<<< HEAD
Bu sitede hiç çerezin var mı? Hadi görelim:
```

```offline
Bir web sitesinde olduğunuzu varsayalım, çerezleri şu şekilde görmek mümkündür:
=======
Does your browser store any cookies from this site? Let's see:
```

```offline
Assuming you're on a website, it's possible to see the cookies from it, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

```js run
// javascript.info sitesinde, biz istatistikler için Google Analytics kullanırız,
// bu yüzden bazı çerezler olmalı
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```
`document.cookie` değeri `; ` ile ayrılmış `name=value` çiftlerinden oluşur. Her biri ayrı bir çerezdir.

Bellirli bir çerezi bulmak için, `document.cookie` yi `; ` ile ayırabiliriz ve sonra doğru ismi bulabiliriz. Ayrıca bunu yapmak için düzenli ifadeler (regular expresion) veya dizi methodlarını da kullanabiliriz.

<<<<<<< HEAD
Bunu okuyucu için bir egseriz olarak bırakıyoruz. Ayrıca, bu bölümün sonunda yardımcı fonksiyonlar ve üzerinde değişiklik yapabileceğiniz çerezler bulacaksınız.

## document.cookie' ye yazma

`document.cookie` ye yazabilir. Ancak bu bir veri özelliği değildir, bu bir erişimdir.
=======
The value of `document.cookie` consists of `name=value` pairs, delimited by `; `. Each one is a separate cookie.

To find a particular cookie, we can split `document.cookie` by `; `, and then find the right name. We can use either a regular expression or array functions to do that.

We leave it as an exercise for the reader. Also, at the end of the chapter, you'll find helper functions to manipulate cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**`document.cookie` yazılan bir işlemi, tarayıcında sayesinde belirttiğimiz çerezleri günceller fakat bu, diğer çerezleri etkilemez.**

<<<<<<< HEAD
Örneğin, bu ismi `user` ve değeri `John` olan bir çerezi ayarlar :
=======
We can write to `document.cookie`. But it's not a data property, it's an [accessor (getter/setter)](info:property-accessors). An assignment to it is treated specially.

**A write operation to `document.cookie` updates only the cookie mentioned in it and doesn't touch other cookies.**

For instance, this call sets a cookie with the name `user` and value `John`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
document.cookie = "user=John"; // sadece 'user' isimli çerezi günceller
alert(document.cookie); // tüm çerezleri göster
```
Eğer komutu çalıştırırsanız, muhtemelen birden fazla çerez göreceksiniz. Bunun nedeni `document.cookie=` işlem tüm çerezleri etkilemediği içindir. Sadece `user` adlı çerezi değiştirir.

<<<<<<< HEAD
Tekinik olarak, isim ve değer herhangi bir karakter içerebilir, fakat geçerli bir atama yapmak için `encodeURIComponent` yerleşik fonksiyonu kullanılmalıdır:
=======
If you run it, you will likely see multiple cookies. That's because the `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// special characters (spaces) need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```

```warn header="Limitations"
<<<<<<< HEAD
Birkaç kısıtlama vardır:
- `encodeURIComponent` fonksiyonunu kullanırken `name=value` çifti 4kb yi geçmemelidir. Yani br çerezde çok büyük bir değer tutulamaz.
- 
- Kesin sınır tarayıcının türüne bağlı olmakla birlilte, etki alanı başına toplam çerez sayısı 20+ ile sınırlıdır.
```

Çerezlerin birkaç seçeneği vardır, bunların çoğu önemli ve ayarlanması gerekir. 

Seçenekler `key=value` ile belirtilmiş ve `;` ile ayrılmış, aşağıdaki gibi listelenir:
=======
There are a few limitations:
- You can only set/update a single cookie at a time using `document.cookie`.
- The `name=value` pair, after `encodeURIComponent`, should not exceed 4KB. So we can't store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.
```

Cookies have several attributes, many of which are important and should be set.

The attributes are listed after `key=value`, delimited by `;`, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

<<<<<<< HEAD
## path

- **`path=/mypath`**

Çerezin URL öneki ulaşılabilir olmalıdır. Tam olmalıdır. Varsayılan olarak, geçerli yoldur.

Eğer bir çerez `path=/admin` olarak ayarlandıysa, bu çerez `/admin` ve `/admin/something` sayfalarında görülebilir, ancak `/home` ya da `/adminpage` sayfalarında görünmez.

Genelde, biz  çerezin tüm web sayfalarında  erişebilir olması için `path=/` şeklinde ayarlarız. 

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
## domain

- **`domain=site.com`**

<<<<<<< HEAD
Çerezlere etki alanı üzerinden erişilebilir. Ancak pratikte bazı kısıtlamalar vardır. Bu çerezleri herhangi bir etki alanına ayarlayamayız.

Varsayılan olarak, bir çerez sadece onu ayarladığımız etki alanından erişilebilir. Yani, eğer çerez `site.com` etki alanına ayarlanmışsa, biz ona `other.com` etki alanından erişemeyiz.

...Ancak daha ilginç olanı, `forum.site.com` alt etki alnından da çerezlere erişilemez.


```js
//  diyelim ki site.com alan adlı sitede şöyle bir çerez ataması yapılmış olsun 
document.cookie = "user=John"

// forum.site.com alt etki alanından aynı çereze erişmeye çalıştığımızda çıktı aşağıdaki gibi olur
alert(document.cookie); // kullanıcı yok
```
=======
A domain defines where the cookie is accessible. In practice though, there are limitations. We can't set any domain.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

**Bir çerezin başka 2.seviye bir etki alanından erişilebilmesini sağlamanın bir yolu yok, bu nedenle `other.com` sitesi hiçbir zaman `site.com` sitesinde ayarlanmış bir çereze erişemeyeektir.**

<<<<<<< HEAD
Bunun sebebi, önemli verileri çerezlerde saklamamıza izin veren bir günvelik sınırlamasıdır.

...Ancak `forum.site.com` gibi alt alan adlarına erişim izni vermek istiyorsak, bu mümkündür. Bunun için `domain` seçeneğini açıkça `domain=site.com` seçeneğine ayarlamamız gerekiyor:

```js
//  site.com etki alnında, herhangi bir alt etki alanına şöyle ayarlayabiliriz:
document.cookie = "user=John; domain=site.com"

// forum.site.com alt alanından çerezlere erişelim 
alert(document.cookie); // çıktı: kullanıcılar
=======
It's a safety restriction, to allow us to store sensitive data in cookies that should be available only on one site.

By default, a cookie is accessible only at the domain that set it.

Please note, by default, a cookie is not shared with a subdomain, such as `forum.site.com`.

```js
// if we set a cookie at site.com website...
document.cookie = "user=John"

// ...we won't see it at forum.site.com
alert(document.cookie); // no user
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
Geçmişten gelen nedenlerden dolayı, `domain=.site.com` (başında bir nokta ile) şeklinde de çalışır, çok eski tarayıcıları desteklemek içn noktayı eklemek daha iyi olabilir.

<<<<<<< HEAD
Dolayısıyla, `domain` seçeneği, çerezlere alt alan adlarından da erişmeyi izin verir.

## expires, max-age

Varsayılan olarak, eğer bir çerez bu seçeneklerden birine sahip değilse, tarayıcı kapatıldığında çerezler de yok olur. Bu tür çerezlere "session cookies" denir.

Tarayıcı kapatıldığında bile çerezlerin yok olmasını engellemek için `expires` ya da `max-age` seçeneklerinden birini ayarlamak gerekir.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Bu örnekte, tarayıcının 19 Ocak 2038 e kadar çerezi otomatik olarak tutumasını ve süresi dolunca silmesini sağlar.

Tarih, kesinlikle GMT zaman dilimi formatında olmalı. Bu formatı elde etmek için `date.toUTCString` methodunu kullanabiliriz. Örneğin, çerezi 1 gün sonra yok olacak şekilde ayarlabiliriz:
=======
...But this can be changed. If we'd like to allow subdomains like `forum.site.com` to get a cookie set at `site.com`, that's possible.

For that to happen, when setting a cookie at `site.com`, we should explicitly set the `domain` attribute to the root domain: `domain=site.com`. Then all subdomains will see such a cookie.

For example:

```js
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; *!*domain=site.com*/!*"

// later

// at forum.site.com
alert(document.cookie); // has cookie user=John
```

```warn header="Legacy syntax"
Historically, `domain=.site.com` (with a dot before `site.com`) used to work the same way, allowing access to the cookie from subdomains. Leading dots in domain names are now ignored, but some browsers may decline to set the cookie containing such dots.
```

To summarize, the `domain` attribute allows to make a cookie accessible at subdomains.

## path

- **`path=/mypath`**

The URL path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it's the current path.

If a cookie is set with `path=/admin`, it's visible on pages `/admin` and `/admin/something`, but not at `/home`, `/home/admin` or `/`.

Usually, we should set `path` to the root: `path=/` to make the cookie accessible from all website pages. If this attribute is not set the default is calculated using [this method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#path_default_value).

## expires, max-age

By default, if a cookie doesn't have one of these attributes, it disappears when the browser/tab is closed. Such cookies are called "session cookies"

To let cookies survive a browser close, we can set either the `expires` or `max-age` attribute. `max-Age` has precedence if both are set.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

The cookie expiration date defines the time when the browser will automatically delete it (according to the browser's time zone).

The date must be exactly in this format, in the GMT timezone. We can use `date.toUTCString` to get it. For instance, we can set the cookie to expire in 1 day:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
// +1 day from now
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```
Eğer çerezin `expires` seçeneğini geçmişteki bir tarihe ayarlarsak, çerez silinir.

-  **`max-age=3600`**

<<<<<<< HEAD
`expires` seçeneğine alternatif olarak, çerezi geçerli andan itibaren saniye türünden yok olmasını belirtir.

Eğer saniye, sıfır ya da negatif bir sayı olursa, çerez silinir.

```js
// çerez ayarlandığı zamandan bir saat sonra silinir.
=======
It's an alternative to `expires` and specifies the cookie's expiration in seconds from the current moment.

If set to zero or a negative value, the cookie is deleted:

```js
// cookie will die in +1 hour from now
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
document.cookie = "user=John; max-age=3600";

// çerezi sil (çerezin süresinin sona ermesine izin ver)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Çerez sadece HTTPS üzerinden gönderilmelidir.

**Varsayılan olarak, eğer `http://site.com` sitesi üzerinden bir çerez ayarlarsak, bu aynı zamanda `https://site.com` sitesi üzerinden görünür ve tersi de mümkündür.**

<<<<<<< HEAD
Yani, çerezler etki alanı tabanlıdır, protokoller arasında ayırım yapmaz.
=======
That is, cookies are domain-based, they do not distinguish between the protocols.

With this attribute, if a cookie is set by `https://site.com`, then it doesn't appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the `secure` flag is the right thing.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu seçenekle beraber, eğer bir çerez hassas bilgiler içeriyorsa, durum değişir. Yani bir çerez `https://site.com` etki alanına ayarlamışsa, bu çereze `http://site.com` üzerinden erişem mümkün değildir, çünkü HTTP ile HTTPS arasında S günvelik flagı vardır. Bu da çerezlere erişilmesini engeller. Sonuç olarak hassas bilgilere sahip çerezleriniz varsa HTTPS protokülünü kullanmanız daha doğru olur.
```js
// assuming we're on https:// now
// set the cookie to be secure (only accessible over HTTPS)
document.cookie = "user=John; secure";
```

## samesite

<<<<<<< HEAD
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
=======
This is another security attribute `samesite`. It's designed to protect from so-called XSRF (cross-site request forgery) attacks.

To understand how it works and when it's useful, let's take a look at XSRF attacks.

### XSRF attack

Imagine, you are logged into the site `bank.com`. That is: you have an authentication cookie from that site. Your browser sends it to `bank.com` with every request so that it recognizes you and performs all sensitive financial operations.

Now, while browsing the web in another window, you accidentally come to another site `evil.com`. That site has JavaScript code that submits a form `<form action="https://bank.com/pay">` to `bank.com` with fields that initiate a transaction to the hacker's account.

The browser sends cookies every time you visit the site `bank.com`, even if the form was submitted from `evil.com`. So the bank recognizes you and performs the payment.

![](cookie-xsrf.svg)

This is a so-called "Cross-Site Request Forgery" (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, a so-called "XSRF protection token", that an evil page can't generate or extract from a remote page. It can submit a form there, but can't get the data back. The site `bank.com` checks for such a token in every form it receives.

Such a protection takes time to implement though. We need to ensure that every form has the required token field, and we must also check all requests.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### Use cookie samesite attribute

<<<<<<< HEAD
`samesite` seçeneği, bu tür saldırılardan korunmak için, (teorik olarak) "xsrf protection tokens" kullanmayı gerektirmeyen, başka bir yol sağlar.
=======
The cookie `samesite` attribute provides another way to protect from such attacks, that (in theory) should not require "xsrf protection tokens".
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Olası iki değeri vardır:

- **`samesite=strict`**

<<<<<<< HEAD
`samesite=strict` 

`samesite=strict` özelliğine sahip bir çerez, kullanıcının web sitesine dışarıdan geldiği durumlarda hiçbir zaman tarayıcı tarafından gönderilmez veya paylaşılmaz. Bu, çerezin sadece aynı web sitesi içindeki isteklerde kullanılmasını ve diğer web siteleriyle paylaşılmamasını sağlayan bir güvenlik önlemidir.

Başka bir deyişle, bir kullanıcı e-postalarından bir bağlantıyı takip etse veya `evil.com` 'dan bir form gönderse veya başka bir alan alanından kaynaklanan herhangi bir işlem yapsa da çerez gönderilmez.

Eğer kimlik doğrulama çerezleri `samesite` seçeneğine sahipse, XSRF saldırısının başarılı olma şansı yoktur, çünkü `evil.com` gelen istekler çerezler olmadan gelir. Böylece `bank.com` sitesi kullanıcıyı tanımayacak ve ödeme işlemi gerçekleşmeyecektir.
=======
A cookie with `samesite=strict` is never sent if the user comes from outside the same site.

In other words, whether a user follows a link from their email, submits a form from `evil.com`, or does any operation that originates from another domain, the cookie is not sent.

If authentication cookies have the `samesite=strict` attribute, then an XSRF attack has no chance of succeeding, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the `samesite=strict` cookie, e.g. a form submission from another page at `bank.com`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Koruma oldukça güvenilirdir. Yalnızca `bank.com` sitesi içerisinden gelen işlemlere `samesite` çerezi gönderecektir.

<<<<<<< HEAD
Yine de, küçük bir sıkıntı var.

Bir kullanıcı kendi bilgisayarında not defterine `bank.com` sitesine giden gerçek bir link kaydettiğinde ve daha sonra bu linke tıklayıp işlem yapmaya çalıştığında, ilginç bir şekilde karşılacağı durum, tekrardan oturum açması gerektiğidir. Aslında, `samesite=strict` çerezleri bu durumda gönderilmez.

Bu durumu iki çerez kullarak aşabiliriz: birincisi "general recognition" (genel tanıma) için, bunun amacı sadece "Hello, John" gibi mesajları gösterme açmacı için kullanılır, ve diğeri de `samesite=strict` özelliği ile verileri değiştirmek içindir. O zaman eğer kişi site dışından geliyorsa hoşgeldin mesajını görecektir, ancak yine de işlem yapmak için (ödeme vs.) bankanın kendi sitesinden içinden işlem başlatmak zorundadır. 
=======
When a user follows a legitimate link to `bank.com`, like from their notes, they'll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for "general recognition", only to say: "Hello, John", and the other one for data-changing operations with `samesite=strict`. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank's website, for the second cookie to be sent.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- **`samesite=lax` (same as `samesite` without value)**

<<<<<<< HEAD
XSRF saldırısından korunmak ve kullanıcı deneyimini olumsuz etkilememek için daha iyi bir yaklaşımdır.
=======
A more relaxed approach that also protects from XSRF and doesn't break the user experience.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Lax modu,  `strict` modu gibi, tarayıcının site dışından gelen istekleri çerezleri göndermesini engeller, ancak bir istisna ekler.

Eğer aşağıdaki her iki koşul varsa `samesite=lax` çerezi gönderilir: 

<<<<<<< HEAD
1. HTTP methodu eğer güvenli ise (örneğin GET, ama POST değilse).

    [RFC7231 specification](https://tools.ietf.org/html/rfc7231) (RFC7231 teknik şartnamesi) nin güvenli yöntemlerinin tam listesini burada bulabilirsiniz. Temel olarak, bunlar veriyi yazmak için değil, okumak için kullanılması gereken yöntemlerdir. Herhangi bir veriyi değiştirmek için kullanılmamalıdır. Bir link bağlantısını takip etmenin daima en güvenli yolu GET yöntemidir.

2. Bu işlem üst seviye gezinti gerçekleştirir (tarayıcı adres çubuğundaki URL'yi değiştirir).

    Bu durum genellikle olur, ancak bu bir `<iframe>` HTML elementi (bir sayfa içine dökümanlar, videolar ve interaktif medya yerleştirmenizi sağlayan bir HTML elementi) içindeyse, o zaman bu üst seviye bir gezinti değildir, Ayrıca, AJAX istekleri de üst seviye gezintiyi değiştirmediğinden, onlar da aynı kapsamdadır.

Yani, `samesite=lax`'nin yaptığı şey temel olarak en yaygın "go to URL" işlemlerinin çerezlere erişmesine izin vermektir. Örneğin, notlardan bir web sitesi bağlantısı açmak gibi bu koşulları karşılar.
=======
    The full list of safe HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231#section-4.2.1). These are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

2. The operation performs a top-level navigation (changes URL in the browser address bar).

    This is usually true, but if the navigation is performed in an `<iframe>`, then it is not top-level. Additionally, JavaScript methods for network requests do not perform any navigation.

So, what `samesite=lax` does, is to allow the most common "go to URL" operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.

But anything more complicated, like a network request from another site or a form submission, loses cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Ancak başka siteden gelen AJAX istekleri veya bir form gönderimi gibi daha karmaşık işlemler bu çerezlere erişemezler. 

<<<<<<< HEAD
Eğer bu sizin için uygunsa, o zaman `samesite=lax` eklemek muhtemelen size korumak sağlayacak ve kullanıcı deneyiminizi olumsuz etkilemeyecektir. 
=======
Overall, `samesite` is a great attribute.

There's a drawback:

- `samesite` is ignored (not supported) by very old browsers, the year 2017 or so.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Genel olarak, `samesite` harika bir seçenektir, ancak önemli bir dezavantajı vardır:

<<<<<<< HEAD
- `samesite` 2017 ve önceki tarayıcıları tarafından desteklenmez (yok sayılır).

**Dolayısıyla, koruma sağlamak için yalnızca `samesite` güvenirsek, eski tarayıcılar savunmasız kalacaktır.**

Fakat, ek bir savunma katmanı eklemek için `samesite`'i,"xsrf belirteçleri" gibi, diğer koruma önlemleriyle birlikte kullanabiliriz, gelecekte, eski tarayıcılar kullanımdan kaldırıldığında (internet explorer gibi), muhtemelen "xsrf belirteçlerini" kullanmayı bırakabiliriz.

## httpOnly

Bu seçeneğin JavaScript ile hiçbir ilgisi yoktur, ancak konu bütünlüğünden dolayı bundan da bahsetmemiz gerekiyor.

Web sunucuları çerezleri ayarlamak için `Set-Cookie` başlığını kullanır. Ve bunu yaparken `httpOnly` seçeneğine ayarlanması gerekir.

Bu seçenek, çerezlere herhangi bir JavaScript erişimini engeller. Böyle bir çerezi göremeyiz ya da `document.cookie` seçeneğini ile üstünde değişiklikler yapamyız.

Bu, bir bilgisayar korsanının kendi JavaScript kodunu bir sayfaya enjekte etmesi ve kullanıcının bu sayfayı ziyaret etmesini beklemesi durumunda belirli saldırılardan korunmak için bir önlem olarak kullanılır. Buna hiçbir zaman izin verilmemeli, bir bilgisayar korsanı kendi kodunu sitemize enjekte edememelidir, ancak bilgisayar korsanlarının bunu yapmasına izin veren hatalar olabilir.
=======
But we can use `samesite` together with other protection measures, like xsrf tokens, to add a layer of defence and then, in the future, when old browsers die out, we'll probably be able to drop xsrf tokens.

## httpOnly

This attribute has nothing to do with JavaScript, but we have to mention it for completeness.

The web server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` attribute.

This attribute forbids any JavaScript access to the cookie. We can't see such a cookie or manipulate it using `document.cookie`.

This is used as a precautionary measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn't be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Normalde, eğer böyle bir şey olursa ve bir kullanıcı bilgisayar korsanının kodunu içeren bir web sayfasını ziyaret ederse, bu kod çalışır ve kimlik doğrulama bilgilerini içeren çerezlerine `document.cookie` seçeneği ile erişir. Berbat bir durum.

<<<<<<< HEAD
Ancak eğer bir çerez `httpOnly` ise, `document.cookie` bu çerezi göremez, bu nedenle bilgilerimiz korunur.
=======
Normally, if such a thing happens, and a user visits a web-page with a hacker's JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.

But if a cookie is `httpOnly`, then `document.cookie` doesn't see it, so it is protected.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Appendix: Cookie functions

Aşağıda çerezlerle çalışmak için `document.cookie` ile çerezleri  manuel olarak değiştirmekten daha kullanışlı bir fonksiyon var.

<<<<<<< HEAD
Bunun için yayınlanmış birçok çerez kütüphanesi vardır, bu yüzden bunlar sadece gösterim amaçlı. Yine de tamamen çalışıyor.

### getCookie(name)

Bir çereze erişmenin kısa yolu [regular expression](info:regular-expressions) (buradan daha detaylı bakabilirsiniz) yöntemini kullanmaktır.
=======
### getCookie(name)

The shortest way to access a cookie is to use a [regular expression](info:regular-expressions).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

### setCookie(name, value, attributes)

<<<<<<< HEAD
Çerezi verilen `name` ve `value`çifti ile varsayılan olarak `path=/` 'a ayarlar (başka varsayılanları eklemek için değiştirilebilir):
=======
Sets the cookie's `name` to the given `value` with `path=/` by default (can be modified to add other defaults):
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
function setCookie(name, value, attributes = {}) {

  attributes = {
    path: '/',
<<<<<<< HEAD
    // eğer istersek başka varsayılanları da buraya ekleyebiliriz
    ...options
=======
    // add other defaults here if necessary
    ...attributes
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  };

  if (attributes.expires instanceof Date) {
    attributes.expires = attributes.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let attributeKey in attributes) {
    updatedCookie += "; " + attributeKey;
    let attributeValue = attributes[attributeKey];
    if (attributeValue !== true) {
      updatedCookie += "=" + attributeValue;
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
<<<<<<< HEAD
Önemli not: bir çerezi güncellediğimizde ya da sildiğimizde, daha önce kullandığımız path ve domain seçeneklerinin tam olarak aynısını kullanmalıyız.
=======
Please note: when we update or delete a cookie, we should use exactly the same path and domain attributes as when we set it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Tüm fonksiyonlar: [cookie.js](cookie.js).

## Appendix: Third-party cookies

<<<<<<< HEAD
Bir çerez, kullanıcının ziyaret ettiği başka bir etki alanı tarafından yerleştirilmişse buna "third-party" (üçüncü taraf) denir.

Örneğin:
1. `site.com` sitesindeki bir sayfa başka bir siteden banner yükler: `<img src="https://ads.com/banner.png">`.
2. Banner ile birlikte, `ads.com` adlı uzak sunucu `id=1234` gibi bir çerezi `Set-Cookie` yöntemiyle başlık olarak ayarlayabilir. Bu çerez `ads.com` etki alanından gelir, ve yalnıca `ads.com` sitesinde görünür:
=======
A cookie is called "third-party" if it's placed by a domain other than the page the user is visiting.

For instance:
1. A page at `site.com` loads a banner from another site: `<img src="https://ads.com/banner.png">`.
2. Along with the banner, the remote server at `ads.com` may set the `Set-Cookie` header with a cookie like `id=1234`. Such a cookie originates from the `ads.com` domain, and will only be visible at `ads.com`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ![](cookie-third-party.svg)

3. Bir dahaki sefere `ads.com` sitesine erişildiğinde,  uzak sunucu `id` çerezini alır ve kullanıcıyı tanır:

    ![](cookie-third-party-2.svg)

<<<<<<< HEAD
4. Daha da önemlisi, kullanıcılar `site.com` sitesinden banneri olan başka bir siteye `other.com` geçtiğinde, o zaman, çerez `ads.com` sitesine ait olduğu için, `ads.com` sitesi çereze erişebilir, böylelikle ziyaretçiyi tanır ve siteler arasında gezinirken onu izler:
=======
4. What's even more important is, when the user moves from `site.com` to another site `other.com`, which also has a banner, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ![](cookie-third-party-3.svg)

Üçüncü taraf(third-party) çerezleri, doğaları gereği, geneleneksel olarak izleme ve reklam hizmetleri için kullanılır. Bunlar kaynak etki alanına bağlıdır, bu yüzden `ads.com`, ona erişen farklı siteler arasında aynı kullanıcıyı takip edebilir.

Doğal olarak, bazı insanlar takip edilmeyi sevmezler, bu yüzden tarayıcı bu tür çerezlerin devre dışı bırakılmasına izin verir.

<<<<<<< HEAD
Ayrıca, bazı modern tarayıcılar bu tür çerezler için özel politikalar uygular:
- Safari üçüncü parti çerezlerine hiç izin vermez.
- Firefox üçüncü taraf çerezleri kullanan etki alanlarına ait bir "black list" liste seçeneği sunar.
=======
Naturally, some people don't like being tracked, so browsers allow them to disable such cookies.

Also, some modern browsers employ special policies for such cookies:
- Safari does not allow third-party cookies at all.
- Firefox comes with a "black list" of third-party domains where it blocks third-party cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


```smart
Üçüncü taraf bir etki alanından bir script (komut dosyasını) yüklersek, örneğin `<script src="https://google-analytics.com/analytics.js">`, ve bu script (komut dosyasını) `document.cookie` özelliğini kullanarak bir çerez ayarlamak için kullanırsa, bu çerez üçüncü taraf çerezi değildir.

<<<<<<< HEAD
Eğer script(komut dosyasını) çerezleri ayarlarsa, o zaman komut dosyasının nereden geldiğinin bir önemi yoktur -- bu çerez web sayfasının etki alanına aittir.
=======
If a script sets a cookie, then no matter where the script came from -- the cookie belongs to the domain of the current webpage.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Appendix: GDPR

<<<<<<< HEAD
Bu konu JavaScript ile ilgili değildir, sadece çerezleri ayarlarken akılda tutulması gereken bir durumdur.

Avrupa'da GDPR adı verilen ve web sitelerinin kullanıcıların gizliliğine saygı göstermesi için bir dizi kural uygulayan bir mevzuat var. Bu kurallardan biri de çerezlerin izlenmesi için kullanıcıdan açık bir izin alınmasıdır.

Lütfen dikkat, bu yalnızca çerezleri izleme/tanımlama hakkındadır.
=======
This topic is not related to JavaScript at all, it is just something to keep in mind when setting cookies.

There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users' privacy. One of these rules is to require explicit permission for tracking cookies from the user.

Please note, that's only about tracking/identifying/authorizing cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Dolayısıyla, yalnızca bazı bilgileri kaydeden, ancak kullanıcıyı izlemeyen veya tanımlamayan bir çerez ayarlarsak, bunu yapmakta özgürüz.

<<<<<<< HEAD
Ancak kimlik doğrulama oturumu veya kişiyi izmelek için bir çerez oluşturacaksak, bunun için kullanıcıdan izin almak zorundayız.

Genelde web siteleri GDPR nin iki varyantını takip ederler. Bunları zaten webde görmüşsünüzdür:
=======
But if we are going to set a cookie with an authentication session or a tracking ID, then a user must allow that.

Websites generally have two variants of complying with GDPR. You are likely to have seen them both on the web:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

1. Eğer bir web sitesi izleme çerezlerini yalnızca kimliği doğrulanmış kullanıcılar için ayarlamak istiyorsa.

<<<<<<< HEAD
    Bunu yapmak için, kayıt formunda "gizlilik politikasını kabul et" gibi bir onay kutusu bulunmalı, kullanıcı bunu işaretlemeli ve ardından web sitesi auth(kimlik doğrulama) çerezlerini ayarlamakta özgürdür.
=======
    To do so, the registration form should have a checkbox like "accept the privacy policy" (that describes how cookies are used), the user must check it, and then the website is free to set auth cookies.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

2. Eğer bir web sitesi herkesi izlemek için çerezleri ayarlamak istiyorsa.

<<<<<<< HEAD
    Bunu yasal olarak yapmak için, web sitesi yeni gelenler için bir tane açılır pencere(modal) "açılış ekranı" gösterir ve  çerezleri kabul etmelerini ister. Daha sonra web sitesi içeriği görüntülemesine izin verecek şekilde ayarlar. Ancak bu yeni ziyaretçiler için sinir bozucu olabilir. Hiç kimse web sitesinin içeriği yerine "tıklanması zorunlu" açılır pencere görmekten hoşlanmaz. Fakat GDPR mevzuatı gereği bunu açık bir şekilde yapması gerekir.

GDPR mevzuatı sadece çerezlerle ilgili değildir, gizliliği içeren diğer konularla da ilgili, ancak bu bizim konumuzun kapsamımının dışında.


## Özet
=======
    To do so legally, a website shows a modal "splash screen" for newcomers and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.


GDPR is not only about cookies, it is about other privacy-related issues too, but that is beyond our scope.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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

<<<<<<< HEAD
Ek olarak:
- Üçüncü taraf çerezleri tarayıcı tarafından engellenebilir, örneğin Safari varsayılan olarak engeller.
- AB vatandaşları için bir izleme çerezi ayarlarken, GDPR mevzuatına göre kullanıcıdan izin istemek zorundasınız.
=======
`document.cookie` provides access to cookies.
- Write operations modify only the cookie mentioned in it.
- Name/value must be encoded.
- One cookie may not exceed 4KB in size. The number of cookies allowed on a domain is around 20+ (varies by browser).

Cookie attributes:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
- `expires` or `max-age` sets the cookie expiration time. Without them, the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.

Additionally:
- The browser may forbid third-party cookies, e.g. Safari does that by default. There is also work in progress to implement this in Chrome.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
