# Doğal prototipler

`"prototype"` özelliği JavaScript çekirdeğinde oldukça fazla kullanılmaktadır. Tüm varsayılan yapıcı fonksiyonlar bunu kullanır.

Önce basit objeler, sonra daha karmaşık olanları için nasıl çalıştığını göreceğiz.

## Object.prototype

Diyelim ki boş bir objeyi yazdırdınız:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

`"[object Object]"` yazısını oluşturan kod nerede? Bu varsayılan `toString` metodu, ama asıl soru nerede? bu `obj` boş!

...Fakat `obj = {}` ile `obj = new Object()` aslında aynı anlama gelmektedir. `Object` object yapıcı fonksiyonudur. Bu fonksiyon `Object.prototype`'e ki bu da büyük bir `toString`'e sahip objeye ve diğer fonksiyonlara sahiptir.

Aşağıdaki gibi( Tamamı gömülüdür):

![](object-prototype.svg)

`new Object()` çağrıldığında ( veya `{...}` ile yaratıldığında ) Objenin `[[Prototype]]`'i  bir önceki bölümde bahsettiğimiz gibi `Object.prototype`'a ayarlanır.

![](object-prototype-1.svg)

Sonrasında `obj.toString()` çaprıldığında -- Bu metod `Object.prototype`'tan alınır.

Bunu şu şekilde kontrol edebiliriz:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__.toString == Object.prototype.toString
```

`Object.prototype`'ın üstünde başka bir `[[Prototype]]` yoktur.

```js run
alert(Object.prototype.__proto__); // null
```

## Diğer gömülü prototipler

`Array`, `Date`, `Function` gibi diğer gömülü objeler metodlarını prototype üzerinde tutar.

Örneğin, `[1,2,3]` bir array yarattığınızda içte varsayılan `new Array()` yapıcısı kullanılır. Bundan dolayı dizi dizi objesi yeni bir objeye yazılır ve `Array.prototype` bunun prototipi olur ve metodlar sağlar. Bu hafızayı oldukça etkin kullanmaya yarar.

Tanım gereği, tüm gömülü prototipler üstünde `Object.prototype`'a sahip olmalıdır. Bazen "her şey objelerden kalıtım alır" sözünü duyarsınız.

Aşağıda bunun etraflı bir görselini görebilirsiniz. 

![](native-prototypes-classes.svg)

Prototipleri inceleyecek olursak:

```js run
let arr = [1, 2, 3];

// Array.prototype'tan mı kalıtım alıyor?
alert( arr.__proto__ === Array.prototype ); // true

// peki ya Object.prototype'tan mı?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// Peki ya onun üzerine bir null.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

Bazı metodlar üst üste gelebilir, örneğin `Array.prototype` kendine ait bir `toString` metoduna sahiptir ve bu da elemanları arasına virgül koyarak çıktı vermesini sağlar:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <--  Array.prototype.toString'in sonucu
```

Daha önce de gördüğümüz gibi, `Object.prototype`'ın `toString` metodu bulunmaktadır fakat `Array.prototype` bu zincirlemede daha yakındır ve bundan dolayı diziler bunu kullanır.


![](native-prototypes-array-tostring.svg)


Chrome Developer Tools konsolunda da bu kalıtımı ( console.dir  kullanarak görebilirsiniz ) 

![](console_dir_array.png)

Diğer gömülü objeler de aynı şekilde çalışır, hatta fonksiyonlar bile. Bunlar gömülü `Fonksiyon` yapıcısının objeleridir, `call/apply` gibi metodları ve diğerleri `Function.prototype`'tan alınmıştır. Fonksiyonların kendine ait `toString` metdoları da bulunmaktadır.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, objelerden kalıtım alır.
```

## İlkel tipler

En karışık yapılar karakter dizileri, sayılar ve boolean ile yapılır.

Hatırlayacağınız üzere bunlar obje değildirler. Fakat özelliklerine erişmeye çalıştığınızda, gömülü yapıcı obje ile geçici objeler üretilir. Bunlar `String`, `Number`, `Boolean` metodlarını sağlar ve yok olurlar.

Bu objeler gizli üretilir ve çoğu motor bunları optimize edebilir, Fakat şartname bunu tam olarak bu şekilde tanımlar. Bu objelerin metodları da prototype'ta yer alır, `String.prototype`, `Number.prototype` ve `Boolean.prototype` olarak bulunur.


```warn header="`null` ve `undefined` object kapsayıcılara sahip değildir. Bundan dolayı metodlar ve özellikler bunlar için mevcut değildir. Ayrıca bunlara uyan prototipler de bulunmamaktadır.```

## Doğal prototiplerin değiştirilmesi [#yerli-prototip-değişikliği]

Doğal(native) prototipler modifiye edilebilir. Örneğin, `String.prototype`'a bir metod eklersek, bu tüm karakter dizileri için geçerli olur:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```
Geliştirme sürecinde hangi fikirlerin gömülü olması gerektiğine dair fikrimiz olabilir. Hatta doğal prototiplere ekleme yapmak için istek duyabilirsiniz. Fakat bu genelde kötü bir fikiridir.

Prototipler evrenseldir, bundan dolayı kolayca ikilik çıkarabilir. Eğer iki kütüphane `String.prototype.show` şeklinde metod eklerse bunlardan biri diğerinin üzerine yazar.

Modern programlama da sadece bir koşulda doğal prototiplerin düzenlenmesine izin verilir. Buna pollyfills denir. Diğer bir deyişle eğer JavaScript şartnamesinde bir metod var fakat bu JavaScript motoru tarafından henüz desteklenmiyorsa, bunu elle yazmak ve gömülü prototipe eklemek mümkündür.

Örneğin:

```js run
if (!String.prototype.repeat) { // Eğer böyle bir metod yoksa
  // prototip'e ekle

  String.prototype.repeat = function(n) {
    // karakteri n defa tekrarlar

    // aslında kod bundan daha karmaşık olmalıdır.
    // eğer n negatif bir sayı gelirse hata dönder
    // Algoritma şartnamede belirlenmiştir.
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```

## Prototiplerden ödünç alma

<info:call-apply-decorators#method-borrowing> bölümünde metod ödünç almadan bahsetmiştik.

```js run
function showArgs() {
*!*
  // Array'den join i ödünç al ve argüman kaynağında çağır.
  alert( [].join.call(arguments, " - ") );
*/!*
}

showArgs("John", "Pete", "Alice"); // John - Pete - Alice
```

`join` `Array.prototype` içerisinde bulunduğundan dolayı, oradan doğrudan çağırabilir ve şu şekilde tekrar yazabiliriz:

```js
function showArgs() {
*!*
  alert( Array.prototype.join.call(arguments, " - ") );
*/!*
}
```
Bu daha etkin çünkü ayrıca bir dizi `[]` objesi yaratmaktan kaçınılmıştır. Fakat biraz uzun sürmüştür.

## Özet

- Tüm gömülü objeler aynı yapıyı paylaşır:
    - Metodlar prototiplerde saklanır ( `Array.prototype`, `Object.prototype`, `Date.prototype` vs. )
    - Veriyi objenin kendisi tutar ( dizi elemanları, obje özellikleri, tarih vs. )
- İlkel veriler de saklayıcı objelerin prototiplerinde metodlarını tutarlar:`Number.prototype`, `String.prototype`, `Boolean.prototype`. Sadece `undefined` ve `null` için saklayıcı objeler bulunmamaktadır.
- Gömülü prototipler yeni metodlar ile değiştirilebilir. Fakat bunların değiştirilmesi önerilmez. Tek değiştirilebilir diyeceğimiz olay yeni bir standart'ın eklenmesi olabilir, JavaScript motoru henüz o özelliği uygulamamışsa bu standart'ı siz uygulayabilirsiniz.