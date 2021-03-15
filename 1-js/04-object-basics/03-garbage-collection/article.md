# Çöp Toplama ( Garbage collection )

JavaScript dilinde hafıza yönetimi otomatik olarak gerçekleşir. Objeler, fonksiyonlar, değişkenler vs. hepsi hafızada yer alır.

Peki ya ihtiyaç yoksa ne yapılır? JavaScript motoru bunları nasıl temizler?

## Erişilebilirlik

JavaScript'te hafıza yönetimi *erişilebilirlik* konsepti üzerinden olur.

Basit bir şekilde; *erişilebilir* değerler yararlıdır mantığı vardır. Bunlar kesinlikle hafızada yer alır.

1. Başlangıçta varsayılan olarak var olan *erişilebilir* değerler bulunmaktadır bunlar hiç bir zaman silinemez.

    Örneğin:
    - O anda içinde bulunulan fonksiyonların yerel değişkenleri.
    - Birbirini çağıran fonksiyonların arasında gönderdikleri parametreler, değişkenler.
    - Global değişkenler.
    - (dahili değişkenler.)

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
    Bu değerlere *kökler* veya *roots* denir.
    
2. Eğer kökten herhangi bir değişkene erişilebiliyorsa, bu zincirleme referanslarla veya referanslarla olabilir, bu durumda o değişken *erişilebilir*dir.
=======
    - The currently executing function, its local variables and parameters.
    - Other functions on the current chain of nested calls, their local variables and parameters.
    - Global variables.
    - (there are some other, internal ones as well)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

    Örneğin, yerel bir obje özellikleri içinde başka bir obje kullanırsa, o kullandığı obje de erişilibilir olmaktadır. Eğer referans verilen obje de başka bir objeye referans verirse o da erişilebilir olur. Detaylı bir örneği aşağıdaki gibidir. 

JavaScript arka planda [Çöp Toplama](https://tr.wikipedia.org/wiki/%C3%87%C3%B6p_toplama_(bilgisayar_bilimi)) işlemini çalıştırır. Bu tüm erişelemeyen objeleri silme işini yapar.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
## Basit bir örnek
=======
    For instance, if there's an object in a global variable, and that object has a property referencing another object, *that* object is considered reachable. And those that it references are also reachable. Detailed examples to follow.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

En basit örnek şu şekildedir:

```js
// kullanici obje için referansa sahiptir.
let kullanici = {
  isim: "İhsan"
};
```

![](memory-user-john.svg)

Bu görselde ok obje referansını gösterir. Global değişken olan `"kullanici"` `{isim:"İhsan"}` objesinin referansına sahiptir. Bu objenin `"isim"` özelliği ilkel bir tip tutar. Doğal olarak obje dışına referans verilmemiştir.

Eğer `kullanici` değerinin üstüne yazılırsa, bu referans kaybolur.

```js
kullanici = null;
```

![](memory-user-john-lost.svg)

Şu anda `İhsan` ulaşılamaz oldu. Buna erişmenin bir yolu yok çünkü ona referans olan bir değişken yok. Bu durumda Çöp Toplama bunları hafızadan siler.

## İki referans

Diyelim ki `kullanici` değişkeni kopyalandı yani referans kopyalandı.

```js
// kullanici objeye referans olur
let kullanici = {
  isim: "İhsan"
};

*!*
let yonetici = kullanici;
*/!*
```

![](memory-user-john-admin.svg)

Eğer bir önceki örneğin aynısı yapılırsa:
```js
kullanici = null;
```
... Obje hala `yonetici` vasıtasıyla erişilebilir durumdadır. Öyleyse Çöp Toplama(Garbage Collector) bu objeyi silmeyecektir. Fakat `yonetici` değişkeninin de üzerine yazılırsa bu durumda objeye refans kalmayacağından hafızadan silinecektir.

## Birbirine bağlı objeler.

Şimdiki örnek ise biraz daha karmaşık:

```js
function evlilik(erkek, kadin) {
  kadin.bey = erkek;
  erkek.kadin = hanim;

  return {
    baba: erkek,
    anne: kadin
  }
}

let aile = evlilik({
  name: "İhsan"
}, {
  name: "Macide"
});
```
`evlilik` fonksiyonu verilen iki objeyi evlendirir ve bir obje yapar.

Son tahlilde hafıza haritası şu şekildedir:

![](family.svg)

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
Şu anda tüm objeler erişilebilir durumdadır.
=======
![](family.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

İki referans silinirse:

```js
delete aile.baba;
delete aile.anne.bey;
```

![](family-delete-refs.svg)

Bu referanslardan yalnız birisi sildiğinizde tüm objeler hala erişilebilir durumdadır.

Fakat ikisini birden silerseniz, İhsan'a erişilemez:

![](family-no-father.svg)

Dışarı giden referanslar önemli değildir. Sadece içeri gelenler o objeyi *ulaşılabilir* yapar. Öyleyse artık İhsan erişilemez ve hafızadan silinecektir. Ayrıca hiç bir verisine de erişilemez.

Çöp toplmaa işleminden sonra:

![](family-no-father-2.svg)

## Erişilemez Ada

Biribirine bağlı objelerden bir bölümünün hafızadan tamamen silinmesi mümküdür.

Aşağıdaki örneğe bakarsanız:

```js
aile = null;
```
Hafızadaki görüntüsü şu şekilde olur:

![](family-no-family.svg)

Bu örnek erişilebilirliğin ne kadar önemli bir konsept olduğunu gösterir.

`İhsan` ve `Macide`'nin hala birbirine bağlantısı vardır. Fakat bunlar sadece kendi aralarındadır ve yeterli değildir. 

Önceki `"aile"` objesi `ana kaynak`'tan silinmiştir. Bundan dolayı artık obje içinde ne olursa olsun referanslarını kaybetmişlerdir.

## Dahili Algoritmalar

Temelde Çöp Toplama algoritması "mark-and-sweep" algoritmasıdır.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
Aşağıdaki Çöp Toplama işlemleri düzenli olarak yapılır:
=======
![](family-no-family.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

- Çöp toplayıcı kökleri işaretler(hatırlar).
- Sonra bunlardan tüm referansları işaretler.
- Sonrasında bunlardan objeleri ve objelerin referanslarını işaretler. Tüm erişilenler hatırlanır, bundan dolayı aynı objeyi ikinci defa ziyaret etmez.
- ... Bu şekilde ziyaret edilmemiş ziyaret edilmemiş referanslar bulunur.
- İşaretlenmemiş olanlar silinir.

Diyelimki obje yapısı aşağıdaki gibi olsun:


![](garbage-collection-1.svg)

"Ulaşılamayan ada" sağ tarafta açıkça görülebilir. "mark-and-sweep" adım adım şu şekilde çalışır:

İlk adım kökleri işaretlemek:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
![](garbage-collection-2.svg)
=======
- The garbage collector takes roots and "marks" (remembers) them.
- Then it visits and "marks" all references from them.
- Then it visits marked objects and marks *their* references. All visited objects are remembered, so as not to visit the same object twice in the future.
- ...And so on until every reachable (from the roots) references are visited.
- All objects except marked ones are removed.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

Sonra bunların referansları:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
=======
![](garbage-collection-1.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

![](garbage-collection-3.svg)

...Sonra eğer mümkün ise referansların referansları:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
![](garbage-collection-4.svg)
=======
![](garbage-collection-2.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

Son adım olarak ziyaret edilmeyen objeler "ulaşılamaz" addedilip silinir:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
![](garbage-collection-5.svg)
=======
![](garbage-collection-3.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

JavaScript motoru bunu hızlıca çalıştırmak ve kodun çalışmasını etkilememek için bir çok optimizsyon yapar.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
=======
![](garbage-collection-4.svg)
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

Bazı Optimizasyonlar:

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
- **Jenerason Koleksiyonu** -- objeler iki kümeye ayrılır: "yeni olanlar" ve "eski olanlar". Çoğu obje birden var olur, işini hızlı bir şekilde yapar ve hızlıca ölür, bunların hemen silinmesi gerekir. Eğer silinemediler ise bu defa eskiler kümesine girerler ve daha az sıklıkla silinirler.


- **Artımlı Koleksiyon** -- Eğer çok fazla sayıda obje varsa bu objeleri bir seferde dolaşmak çok fazla zaman alacaktır. Kod çalışırken belki biraz yavaşlamaya neden olabilir. Bundan dolayı motorlar genelde çöp toplama işini bölümlere ayırırlar. Bu bölümleri ayrı ayrı çalışır. Tabi kendileri arasında bir şekilde değişiklikleri bildirmeleri gerekir, fakat bir tane büyük yerine bu şekilde küçük küçük işlemler hızı artırmaktadık.
=======
![](garbage-collection-5.svg)

We can also imagine the process as spilling a huge bucket of paint from the roots, that flows through all references and marks all reachable objects. The unmarked ones are then removed.

That's the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not affect the execution.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

- **Boş zaman Koleksiyonu** -- Çöp toplayıcı genelde CPU kullanılmadığı zamanlarda çalışır, böylece kodun çalışmasına olan etki en aza iner.

Bunlarla birlikte başka optimizasyon ve çöp toplama algoritmaları bulunmaktadır. Her motor kendine göre farklı optimizasyonu beraberinde getirir. Daha da önemlisi motor geliştikçe bakış açıları değişir. Analizler artar. Eğer gerçekten ilginizi çekiyorsa bu konu aşağıdaki linkler size yol gösterecektir.

<<<<<<< HEAD:1-js/04-object-basics/02-garbage-collection/article.md
=======
There exist other optimizations and flavours of garbage collection algorithms. As much as I'd like to describe them here, I have to hold off, because different engines implement different tweaks and techniques. And, what's even more important, things change as engines develop, so studying deeper "in advance", without a real need is probably not worth that. Unless, of course, it is a matter of pure interest, then there will be some links for you below.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69:1-js/04-object-basics/03-garbage-collection/article.md

## Özet

Bilinmesi gereken temeller:

- Çöp toplama otomatik olarak yapılır. Engellenemez veya korunulamaz.
- Objeler erişilebilir olduğu müddetçe hafızada kalırlar.
- Referans edilmiş olmak erişilebilir olmak değildir: birbiri içinde bağlantılı olan bir obje tamamen erişilemez hale getirilebilir.

Modern JavaScript motorları çöp toplama için çok gelişmiş algoritmalar kullanmaktadır.

Genel bir kitap önerisi olarak "The Garbage Collection Handbook: The Art of Automatic Memory Management" ( R.Jones et al)  algoritmaların bazılarını kapsamaktadır.

Eğer alt seviye diller ile aranız iyi ise, daha derinlemesine bilgiyi aşağıdaki makaleden edinebilirsiniz: [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](http://v8project.blogspot.com/) Arada bir hafıza yönetimi hakkında belge yayınlamaktadır. Doğal olarak, çöp toplama hakkında bilgi sahibi olunmak isteniyorsa dahili yapıların bilinmesi gerekmektedir. Bu yapılar [Vyacheslav Egorov](http://mrale.ph) takip edilerek öğrenilebilir. Kendisi "V8" motoru mühendislerindendir. "V8"in önerilmesinin nedeni internette hakkında çokça bilgi bulunabilmesinden dolayıdır. Diğer motorlar için çoğu yaklaşım benzerdir fakat çöp toplama bir çok yönden farklılık gösterir.

Alt-seviye optimizasyonu istendiğinde derinlemesine bilgi sahibi olunması gerekmektedir. JavaScript dilini öğrendikten sonra bu yolda ilerlenmesi daha mantıklı olur.
