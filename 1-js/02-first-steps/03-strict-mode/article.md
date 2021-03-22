# Modern mod, "use strict"

Uzun süredir JavaScript uyumluluk sorunu olmadan gelişmeye devam etmektedir. Yeni özellikler eklenmekte fakat eski özellikler olduğu gibi kalmaktadır.

Bu eski kodlarınızın çalışacağı garantisini verir. Kötü yanı ise JavaScript geliştiricileri tarafından eskiden verilen kötü bir kararın veya hatanın sürekli tekrar edilmesine neden olur. 

<<<<<<< HEAD
ECMAScript 5 (ES5) standardı 2009 yılında kabul edilmiştir. Bu standar yeni özellikler eklediği gibi eskide olanlardan bazılarını da düzenlemiştir. Eski kodun çalışabilirliğini garanti altına almak için çoğu düzenleme varsayılan olarak kapalı durumda gelir. Bunları açmak için `"use strict"` kullanılmalıdır.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

## "use strict"

Bu direktif için kod dosyanızın başına `"use strict"` veya `'use strict'` yazmanız yeterlidir. Artık kodunuz "modern" JavaScript olarak çalışmaktadır.

Örnek : 

```js
"use strict";

// Bu kod modern JavaScript olarak çalışır
...
```

<<<<<<< HEAD
Yakında fonksiyonları ( komutları gruplama ) göreceksiniz. 

`"use strict"` birden çok fonksiyonda kullanılacağı gibi tek fonksiyon için de kullanılabilir. Fakat genelde tüm dosya için kullanılır.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

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

<<<<<<< HEAD
Sıkı moda girdiğinizda artık eskiye dönüş yoktur.
=======
Once we enter strict mode, there's no going back.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
```

## Tarayıcı Konsolu

<<<<<<< HEAD
İleride özellikleri test etmek için bir [geliştirici konsolu](info:devtools) kullandığınızda, lütfen tarayıcının varsayılan olarak `use strict` kullanmadığını unutmayın.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

Bazen, `use strict` bir fark yarattığında, yanlış sonuçlar alırsınız.

<<<<<<< HEAD
Birden çok satır girmek için `key:Shift+Enter` tuşlarına basmayı deneyebilir ve üstte `use strict` kullanmayı deneyebilirsiniz, örneğin:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```js
'use strict'; <Yeni satır için Shift+Enter>
//  ...sizin kodunuz
<Çalıştırmak için Enter>
```

Çoğu tarayıcıda, yani Firefox ve Chrome'da çalışır.

<<<<<<< HEAD
Aksi takdirde, `use strict` eklemenin en güvenilir yolu, kodu konsola şu şekilde girmek olacaktır:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3

```js
(function() {
  'use strict';

<<<<<<< HEAD
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
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
