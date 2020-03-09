# Clickjacking saldırısı

Clickjacking saldırısı kötücül bir sayfanın *kullanıcı adına* hedef sitede tıklamalar yapmasına olanak sağlar.

Sonradan düzeltilmiş olsa da Twitter, Facebook ve PayPal'ın da bulunduğu birçok site, zamanında bu saldırı ile ele geçirilmiştir. 

## Mantık

Saldırının arkasındaki mantık oldukça basittir.

Örneğin Facebook ile yapılan bir clickjacking saldırısı böyle işler:

1. Ziyaretçi herhangi bir neden veya yolla kötücül siteyi ziyaret eder.
2. Kötücül sitede zararsız ve ilgi çekici bir baplantı bulunur (örneğin "Zengin olmak için tıkla" veya "bu kedinin neler yaptığına inanamayacaksınız").
3. Kötücül sayfa bağlantının üzerine facebook.com'dan `src`'si olan şeffaf bir `<iframe>` yerleştirir. Bu `<iframe>` şeffaf bir "Beğen" butonunun tam bağlantının üzerine gelmesini sağlar. Genellikle yerleştirme için `z-index` kullanılır. 
4. Ziyaretçi bağlantıya tıklamayı denerken aslında şeffaf olan butona tıklar.

## Örnek

Bu kod bir kötücül sayfa örneğidir. Daha iyi görülebilmesi amacıyla `<iframe>` yarı şeffaf olarak ayarlanmıştır (Gerçek bir kötücül sayfada bu `<iframe>` tamamen şeffaftır):

```html run height=120 no-beautify
<style>
iframe { /* Hedef siteden alınan iframe */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* Gerçekte opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Zengin olmak için tıkla:</div>

<!-- Hedef sitenin url'si -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Buraya tıkla!</button>
*/!*

<div>Ve artık zenginsin (ve ayrıca beni Facebook'ta beğenmeni sağladım)!</div>
```

Saldırının tam bir örneği:

[codetabs src="clickjacking-visible" height=160]

Bu örnekte elimizde yarı şeffaf bir `<iframe src="facebook.html">` var, ve burada butonun üstünde kaldığını görebiliyoruz. Bu butona basılacak bir tıklama aslında iframe tarafından yakalanır, ancak bu olay iframe şeffaf olduğu için kullanıcı tarafından görülmez. 

Sonuç olarak eğer kullanıcının Facebook hesabı zaten açıksa sayfayı beğenmiş olur. Eğer örnekte Twitter hedef site olsaydı, kullanıcı sayfayı Twitter'da takip etmiş olurdu.

Aynı örneğin `<iframe>` için `opacity:0` ayarlanmış, daha gerçekçi bir versiyonu:

[codetabs src="clickjacking" height=160]

Saldırının gerçekleşmesi için tek gereken kötücül sayfadaki `<iframe>`'in tam olarak bağlantının üstüne yerleşmesidir. Bu olay çoğunlukla CSS ile mümkündür.

```smart header="Clickjacking sadece tıklamalar için kullanılabilir, metinler için değil"
Bu saldırı sadece fare hareketlerini kapsar.

Teknik olarak, saldıracağımız nesne bir metin alanı olsaydı, bir iframe'i tam olarak alanın üzerine getirerek saldırıyı deneyebilirdik. Böylece gerçek metin alanına yazdığını düşünen kullanıcı aslında iframe'in metin alanına yazardı. 

Ancak, bu durumds kullanıcının yazdıkları ekranda görünmez.

Genellikle kullanıcı ekranda yazdığını göremediğinde yazmayı keser, bu da bu saldırıyı metin alanalrı için kullanışsız kılar.
```

## Eski yöntem savunmalar (zayıf)

Bu saldırıya karşı en eski savunma yöntemi sayfanın iframe olarak açılmasını engelleyen bir JavaScript betiğidir. Bu yöntem ayrıca "framebusting" olarak da bilinir.

Betik şöyle görünür:

```js
if (top != window) {
  top.location = window.location;
}
```

Mantık: Eğer asıl sayfa en üstte olmadığını fark ederse, kendini en üste taşır.

Bu yöntem, etrafından dolaşma yolları nedeniyle güvenilmezdir. Bu yöntemlerden bazılarını inceleyelim.

### Üste taşımayı engellemek

[beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) olayından önce `top.location`'ın değişmesinden kaynaklanan üste çıkma eylemi engellenebilir.

Üstteki (saldırgana ait) sayfa bu olaya bir işleyici bağlayarak `iframe` `top.location`'ı değiştirmeyi denediğinde kullanıcıya ayrılamk isteyip istemediğini soran bir mesaj gösterebilir.

Örneğin:
```js
window.onbeforeunload = function() {
  window.onbeforeunload = null;
  return "Gerçekten tüm kedileri görmeden bu sayfadan ayrılmak istiyor musunuz?";
};
```

Çoğu senaryoda, kullanıcı iframe'in varlığını bilmediğinden dolayı "Hayır" cevabını verecektir. Sonuçta gördükleri tek şey üzerinde kedi videoları olan en üstteki sayfa, niye ayrılmak istesinler ki? Yani, `top.location` değişmeyecek. 

İş üzerinde:

[codetabs src="top-location"]

### Sandbox niteliği

`sandbox` niteliği tarafından kısıtlanan özelliklerden biri sayfa hareketidir. Sandbox niteliğine sahip bir iframe `top.location` değerini değiştiremez. 

Yani iframe'i `sandbox="allow-scripts allow-forms"` niteliğiyle ekleyebiliriz. Nitelikteki `"allow-scripts allow-forms"` kısmı sandbox niteliğindeki kısıtlamaları kaldırarak betik ve formların çalışmasını sağlar ancak `allow-top-navigation` olmadığından iframe üste çıkamaz.

Kod örneği:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Bu basit korumanın arkasından dolaşacak tabii ki daha fazla yöntem var.

## X-Frame-Options

Sunucu-taraflı `X-Frame-Options` başlığı bir sayfanın iframe içinde gösterilmesine izin verebilir veya reddedebilir.

Başlığın *sunucu tarafından* gönderilmesi şarttır, tarayıcı bu başlığı `<meta>` etiketinde görürse yok sayar. Yani `<meta http-equiv="X-Frame-Options"...>` etkisizdir.

Başlık üç değerden birini taşıyabilir:


`DENY`
: Sayfayı asla iframe içinde gösterme.

`SAMEORIGIN`
: Sayfanın iframe içinde gösterilmesine ancak ana dosya aynı kaynaktansa izin ver.A

`ALLOW-FROM domain`
: Sayfanın iframe içinde gösterilmesine ancak ana dosya belirtilen alan adından geliyorsa izin ver.

Örneğin, Twitter'da `X-Frame-Options: SAMEORIGIN` kullanılıyor.

````online
Sonuç:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Tarayıcınıza göre yukarıdaki `iframe` ya boştur ya da tarayıcının bu sayfa hareketine izin vermediği konusunda sizi uyaracaktır.
````

## İşlevsiz olarak göstermek

`X-Frame-Options` başlığının bir de kötü yanı var: Diğer siteler, iyi bir nedenleri olsa bile, bu başlığı taşıyan siteyi bir iframe içinde gösteremeyecek.

Yine de, başka çözümler var... Örneğin, bir `<div>` oluşturup `height: 100%; width: 100%;` değerlerini kullanarak sayfayı "kaplayabiliriz", böylece bu `<div>` gelen tüm tıklamaları engeller, eğer bu korumaya ihtiyaç duymazsak veya `window == top` olursa da yok olur. 

Bunun gibi:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Siteye git</a>
</div>

<script>
  // Eğer üstteki sayfa başka bir kaynaktansa burada bir hata oluşacak
  // ancak sorun değil
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

Örnek:

[codetabs src="protector"]

## Samesite çerez niteliği

`samesite` çerez niteliği clickjacking saldırılarını engelleyebilen niteliklerden biridir. Bu niteliğin amacı kullanıcı site dışındaki başka bir siteye gitmek istemediğinde o siteye çerezleri göndermemektir. Çapraz site sahteciliği saldırılarına karşı tasarlanmış olmasına rağmen clickjacking'e karşı doğal bir koruma sağlar, çünkü genellikle bir clickjacking saldırısı başka bir siteye bir istek gönderilmesine neden olur. Bir çerez samesite niteliğine sahip iken, değerinin `strict` veya `lax` olmasına bakılmaksızın iframe içinde açılan bir sayfayla paylaşılmaz.

`samesite` niteliği HTTP cevap başlıklarıyla veya JavaScript ile tanımlanabilir. HTTP kullanırken böyle gözükür: 

`Set-Cookie: demoCookie=demoValue; samesite=lax`

veya

`Set-Cookie: demoCookie=demoValue; samesite=strict`

JavaScript için: 

```html
document.cookie = "demoCookie=demoValue; SameSite=Lax";
document.cookie = "demoCookie=demoValue; SameSite=Strict";
```

Değer `lax` iken bu türden istekler engellenir: 
- Form POST gönderimi (&lt;form method="POST" action="..."&gt;)
- iframe (&lt;iframe src="..."&gt;&lt;/iframe&gt;)
- AJAX ($.get("..."))
- Görüntü (&lt;img src="..."&gt;)
- Betik (&lt;script src="..."&gt;&lt;/script&gt;)
- Stylesheet (&lt;link rel="stylesheet" type="text/css" href="..."&gt;)

Değer `strict` iken `lax` değerine ek olarak bunlar engellenir:
- Link tıklamaları (&lt;a href="..."&gt;&lt;/a&gt;)
- Önbetimleme (&lt;link rel="prerender" href=".."/&gt;)
- Form GET gönderimi (&lt;form method="GET" action="..."&gt;)

Bu senaryoda iframe istekleri ilgimizi çeken yer. Clickjacking saldırısı durumnda, nitelikten dolayı kullanıcı örneğin Facebook'ta giriş yapmamış sayılacağından herhangi bir şeyi beğenemez, bu yüzden saldırı sonuçsuz kalır.

`samesite` niteliği çerezlerin kullanılmadığı alanlarda işlevsiz kalır. Bu zaaf sitelerin iframe içinde çereze ihtiyaç duymayan halka açık sitelerin görüntülenebilmesine olanak verir. Örneğin sadece birden fazla oy verilmesin diye IP adreslerini kaydeden anonim bir oylama sitesi saldırıya açık kalacaktır.

## Özet

Clickjacking kullanıcıları kötücül bir siteye ne olduğunu bile anlamadan tıklamaya "sevk eden" bir yöntemdir. Özellikle önemli butonların bulunduğu sitelerde (örneğin PayPal) tehlikelidir. 

Saldırgan kötücül sayfaya bir bağlantı paylaşabilir veya kullanıcıları bu sayfaya çekebilir. 

Bir açıdan saldırı "sığ" olarak sınıflandırılabilir: sonuçta saldırgan sadece tek bir tıklamatı ele geçiriyor. Ancak, başka bir açıdan, eğer saldırgan başka tıklamaların gerekeceğini biliyorsa aynı yöntemle kullanıcının oralara tıklamasını sağlayabilir.

Bu saldırı olukça tehilkelidir, çünkü genellikle bir arayüzü tasarlarken saldırganın kullanıcı yerine tıklamasını heasba katmayız. Yani açıklar beklemediğimiz yerlerden gelebilir. 

- `X-Frame-Options: SAMEORIGIN` niteiğinin sayfalarda (veya sitelerde) kullanılması önerilir (eğer site iframe içinde görüntülenmek amacı taşımıyorsa)

- Sayfanın iframe içinde görüntülenebilir olmasını istiyorsak kaplayıcı bir `div` kullanabiliriz, ama önlemlerin alınması gereklidir.
