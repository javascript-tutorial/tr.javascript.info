# Modern mod, "use strict"

Uzun süredir JavaScript uyumluluk sorunu olmadan gelişmeye devam etmektedir. Yeni özellikler eklenmekte fakat eski özellikler olduğu gibi kalmaktadır.

Bu eski kodlarınızın çalışacağı garantisini verir. Kötü yanı ise JavaScript geliştiricileri tarafından eskiden verilen kötü bir kararın veya hatanın sürekli tekrar edilmesine neden olur. 

ECMAScript 5 (ES5) standardı 2009 yılında kabul edilmiştir. Bu standart yeni özellikler eklediği gibi eskide olanlardan bazılarını da düzenlemiştir. Eski kodun çalışabilirliğini garanti altına almak için çoğu düzenleme varsayılan olarak kapalı durumda gelir. Bunları açmak için `"use strict"` kullanılmalıdır.

## "use strict"

Bu direktif için kod dosyanızın başına `"use strict"` veya `'use strict'` yazmanız yeterlidir. Artık kodunuz "modern" JavaScript olarak çalışmaktadır.

Örnek : 

```js
"use strict";

// Bu kod modern JavaScript olarak çalışır
...
```

Yakında fonksiyonları (komutları gruplama yolu) göreceksiniz. 

`"use strict"` birden çok fonksiyonda kullanılacağı gibi tek fonksiyon için de kullanılabilir. Fakat genelde tüm dosya için kullanılır.


````warn header="\"use strict\" in en üstte olduğuna emin olun"

Lütfen yazarken `"use strict"` direktifinin sayfanızın en üst satırında olduğuna emin olun. Aksi taktirde bu mod açılmayacaktır.

Örneğin aşağıda "sıkı" modu açık değildir:


```js no-strict
alert("Bazı kodlar");
// "use strict"'i buraya yazarsanız bu mod açılmaz.

"use strict";

// sıkı modu aktif değildir.
```

````

```warn header="`use strict`'i iptal eden bir direktif bulunmamaktadır"
Modern JavaScript'i eski haline getiren `"no use strict"` gibi bir direktif bulunmamaktadır.

Sıkı moda girdiğinizde artık eskiye dönüş yoktur.
```

## Tarayıcı Konsolu

İleride özellikleri test etmek için bir [geliştirici konsolu](info:devtools) kullandığınızda, lütfen tarayıcının varsayılan olarak `use strict` kullanmadığını unutmayın.

Bazen, `use strict` bir fark yarattığında, yanlış sonuçlar alırsınız.

Birden çok satır girmek için `key:Shift+Enter` tuşlarına basmayı deneyebilir ve üstte `use strict` kullanmayı deneyebilirsiniz, örneğin:

```js
'use strict'; <Yeni satır için Shift+Enter>
//  ...sizin kodunuz
<Çalıştırmak için Enter>
```

Çoğu tarayıcıda, yani Firefox ve Chrome'da çalışır.

Aksi takdirde, `use strict` eklemenin en güvenilir yolu, kodu konsola şu şekilde girmek olacaktır:

```js
(function() {
  'use strict';

  // ...sizin kodunuz...
})()
```

## Her zaman "use strict" kullanın

`"use strict"` ile varsayılan modun farkları üzerinden tekrar geçilecektir.

Gelecek bölümlerde dilin özelliklerini öğrendikçe bu sıkı mod ile varsayılan modun farkları hakkında bilgi verilecektir. Aslında çok fark olmamasına rağmen sıkı mod yazdığımız kodu daha iyi hale getirir.

Şu anda genel hatlarıyla bilmek yeterli olacaktır.

1. `"use strict"` JavaScript motorunda varsayılan ile "modern" mod arasında geçiş yapmaya yarar. İleride kodunuza ne gibi artılar sağlayacağını göreceksiniz.
2. Sıkı moda dosyanın başına `"use strict"` direktifiyle geçilebilir. Bu bize "sınıf" veya "modül" gibi dil özelliklerini kazandırır.
3. Sıkı mod tüm modern tarayıcılar tarafından desteklenir.
4. Bundan sonra tersi söylenmedikçe her yazacağınız örneklerde  `"use strict"` ile başlayacağınız varsayılmaktadır. 
