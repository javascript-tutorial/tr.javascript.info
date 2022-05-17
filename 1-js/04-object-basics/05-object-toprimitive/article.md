# Objelerin ilkel çevirileri

Objeler `obj1 + obj2` gibi toplanırsa, `obj1 - obj2` gibi çıkarılırsa veya `alert(obj)` gibi yazdırılırsa ne olur?

Objeler içerisinde bu çevirimi yapan özel metodlar bulunmaktadır.

<info:type-conversions> bölümünde sayısal, karakter ve boolean çevrimleri gösterildi. Fakat objeler için daha sonra değilineceği söylendi. Şimdi objeler ve semboller hakkında bilginiz olduğuna göre bunu anlaması daha da kolay olacaktır.

[cut]
Objeler için boolean çevirimi bulunmamaktadır çünkü tüm objeler boolean dahilinde `true`'dur. Bundan dolayı sadece sayısal ve karakter çevrimleri mevcuttur.

Sayısal çevirim obje çıkarıldığında veya metematiksel fonksiyonlar uygulandığında meydana gelir. Örneğin `Date` objesi (<info:date> bölümünde anlatılacak) çıkarılabilir ve `date1-date2` bu iki tarih arasındaki zaman farkını verir.

Karakter dizisi çevirimi için -- genelde `alert(ob)` çağırıldığında meydana gelir.


## ToPrimitive

Objenin ilkel bir tip olarak gerekli olduğu durumlarda, örneğin `alert` veya matematiksel uygulamalarda, `ToPrimitive` algoritması kullanılarak bu işlem yapılır. ([Özellikleri](https://tc39.github.io/ecma262/#sec-toprimitive))

Bu algoritma özel bir obje metodu ile ilkel tipe çevrimi düzenlememizi sağlar.

Duruma bağlı olarak, bu çevirime "ipucu(hint)" da denir.

Üç çeşidi vardır:

`"karakter dizisi"` - `string`
: Uygulama karakter dizisi bekliyorsa, objeden karakter dizisine çeviri yapmak gerekmektedir. Örneğin `alert`:

    ```js
    // çıktı
    alert(obj);

    // veya obje özellik anahtarı olarak kullanıldığında.
    digerObj[obj] = 123;
    ```

`"sayı"` - `number`
: Eğer bir uygulama sayı bekliyorsa, objeden sayıya çevrilmelidir. Genelde aşağıdaki gibi matematiksel işlemlerde kullanılır:

    ```js
    // doğrudan çeviri
    let num = Number(obj);

    // matekatiksel işlemler için 
    let n = +obj; 
    let delta = tarih1 - tarih2;

    // karşılaştırmalarda
    let greater = kullanici1 > kullanici2;
    ```

`"varsayılan"` - `default`
: Çok nadir olmakla birlikte operatör ne beklediği konusunda "emin olmayabilir"

    Örneğin, binary `+` karakter dizisi için birleştirme işlemi yaparken sayı için toplama işlemi yapar, bunden dolayı hem karakter hem sayı olabilir. Veya objeyi karakter, sayı veya sembol ile `==` şeklinde karşılaştırırken 

    ```js
    // binary toplama
    let toplam = araba1 + araba2;

    // obj == karakter/sayı/sembol
    if (kullanici == 1) { ... };
    ```

    Büyüktür/küçüktür operatörü `<>` karakter ve sayı ile çalışabilir. Fakat yine de `default` değil de `sayı` ipucunu kullanır. Bu tarihsel nedenlerden ötürü böyledir.
    
    Pratikte tüm objeler ( `Date` objesi hariç ) `"default" çevrimini `"number"` çevrimi ile aynı şekilde yaparlar.
    
Sadece üç çeşit ipucu(hint) bulunmaktadır. `boolean` bulunmamaktadır, çünkü her obje zaten boolean `true` döndürür. `"default"` ve `"number"` için de aynı olduklarını varsayarsanız, sadece iki çevrim bulunmaktadır.


**Çevrimi yapabilmek için JavaScript üç obje metodu bulup çağırmaya çalışır"**

1. Eğer  `obj[Symbol.toPrimitive](hint)` metodu varsa çağır,
2. Eğer yoksa ve ipucu(hint) karakter ise
    - `obj.toString()` ve `obj.valueOf()` metodlardan hangisi varsa çalıştır.
3. Eğer ipucu(hint)  `"number"` veya `"default"` ise 
    -  `obj.valueOf()` ve `obj.toString()` metodlarından hangisi varsa çalıştır.

## Symbol.toPrimitive

`Symbol.toPrimitive` adında bir metod var ve bu metod çeviri metodunu adlandırmak için kullanılır. Örneğin:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // ilkel bir tip döndür.
  // ipucu(hint) = "string", "number" veya "default"
}
```
Örneğin `kullanici` objesi için bunu uygulayacak olursak:

```js run
let kullanici = {
  isim: "İhsan",
  para: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`ipucu: ${hint}`);
    return hint == "string" ? `{isim: "${this.isim}"}` : this.para;
  }
};

// demo
alert(kullanici); // ipucu: string -> {isim: "İhsan"}
alert(+kullanici); // ipucu: number -> 1000
alert(kullanici + 500); // ipucu: default -> 1500
```
Koddan da gördüğünüz üzere `kullanici` çeviriye göre karakter veya para olabiliyor. Tek bir metod `kullanici[Symbol.toPrimitive]` tüm çeviri durumlarını karşılıyor.

## toString/valueOf

`toString` ve `valueOf` gibi metodlar ilk JavaScript çıktığı zamandan kalma metodlardır. Sembol değillerdir( O zamanlar sembol yoktu), yani normal metodlardır. Eski tip çevirim düzenlemesi yapabilmenize olanak verir.

Eğer `Symbol.toPrimitive` yoksa JavaScript aşağıdaki metodları bulmaya çalışır:

- `toString -> valueOf` "string" ipuçları için.
- `valueOf -> toString` diğer hallerde.

Örneğin, `kullanici` objesinin içinde `toString` ve `valueOf` nasıl yazılacağı aşağıda gösterilmiştir:

```js run
let kullanici = {
  isim: "İhsan",
  para: 1000,

  // hint="string" için
  toString() {
    return `{isim: "${this.isim}"}`;
  },

  // hint="number" veya "default" için
  valueOf() {
    return this.para;
  }

};

alert(kullanici); // toString -> {isim: "İhsan"}
alert(+kullanici); // valueOf -> 1000
alert(kullanici + 500); // valueOf -> 1500
```

Genelde tek bir "hepsini yakala" metodu ile tüm çeviriler yapılmak istenir. Bu durumda `toString` metodu kullanılabilir:


```js run
let kullanici = {
  isim: "İhsan",

  toString() {
    return this.isim;
  }
};

alert(kullanici); // toString -> İhsan
alert(kullanici + 500); // toString -> İhsan500
```

Eğer `Symbol.toPrimitive` ve `valueOf` yoksa `toString` metodu objeleri ilkel tiplere çevirmeye çalışır.


## Dönüş Tipleri

İlkel tip çevrilerinde bilinmesi gereken en önemli olay bu metodların illa da ipucunda alınan tiplere dönüştürmesine gerek yoktur.

`toString()` illa karakter döndürecek diye veya `Symbol.toPrimitive` içerisinde eğer ipucu sayı ise sayı döndürecek diye bir kural yoktur.

**Tek zorunlu nokta bu metodların ilkel tip döndürmesidir**

Bu ilkel değeri alan operatör işine devam eder ve eğer gerekliyse başka çeviriler de yapabilir.

Örneğin:

- Matematiksel operatörler( binary toplama dışında) `ToNumber` çevrimini kullanır:

    ```js run
    let obj = {
      toString() { // diğer metodlar yoksa karakter çevirimini bu metod yapar.
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive  "2" verir, sonra bu 2 olur.
    ```

- Binary toplama ilkel tipi kontrol eder -- eğer karakter dizisi ise birleştirir diğer türlü sayılar için `ToNumber` çalışır.


    Karakter dizisi örneği:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive karakter dizisi dönderdi => birleştirme)
    ```

    Sayı örneği:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive boolean dönderdi, string değil => ToNumber)
    ```

```smart header="Tarihi Nedenlar"
`toString` veya `valueOf` ilkel tip döndürmelidir. Eğer obje dönderiyorsa bir hata vardır. Fakat bu obje sadece pas geçilir aynı metodu olmadığında sadece pas geçildiği gibi.

Buna karşın `Symbol.toPrimitive`  ilkel dip döndürmek *zorundadır*, diğer türlü hata meydana gelir.
```

## Özet

Obje-ilkel tip çevrimi, ilkel tip bekleyen çoğu fonksiyon ve operatör tarafından otomatik olarak yapılmaktadır.

3 çeşit ipucu(hint) bulunmaktadır:
- `"string"` ( `alert` ve diğer karakter çevrimleri için)
- `"number"` (matematiksel)
- `"default"` (sadece birkaç operatör)

Hangi operatörün hangi ipucunu kullanacağı doğrudan bildirilmiştir. Fakat bir kaç operatör vardır ki "ne beklemesi gerektiğini bilemez" bunlar `"default"` ipucunu kullanmaktadır. Genelde objeler `"default"` ve `"number"` ipu.larını aynı şekilde uygularlar böylece pratikte ikisi aynı şekilde işler.

Çevirme algoritması:

1. Eğer  `obj[Symbol.toPrimitive](hint)` metodu varsa çağır,
2. Eğer yoksa ve ipucu(hint) karakter ise
    - `obj.toString()` ve `obj.valueOf()` metodlardan hangisi varsa çalıştır.
3. Eğer ipucu(hint)  `"number"` veya `"default"` ise 
    -  `obj.valueOf()` ve `obj.toString()` metodlarından hangisi varsa çalıştır.

Genelde tek bir "hepsini yakala" metodu ile tüm çeviriler yapılmak istenir. Böylece insan tarafından okunabilir gösterimi çıkarılabilir. Bu loglama için oldukça yararlıdır.
