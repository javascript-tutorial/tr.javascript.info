# Ok fonksiyonları

Ok fonksiyonlarının tekrardan üzerinden geçelim.

<<<<<<< HEAD
Ok fonksiyonları sadece basit şeylerin kolayca yazılması için kullanılmaz.

JavaScript'te bir sürü başka yerde çalıştırılması gereken kolayca yazılacak fonksiyonlara ihtiyacımız olabilir, 
=======
Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that's executed somewhere else.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

Örneğin:

- `arr.forEach(func)` -- her bir `forEach` döngüsünde `func` çalıştırılır.
- `setTimeout(func)` -- Varolan planlayıcı tarafında `func` çalıştırılır. 
- .. vs.

Bir fonksiyon yaratıp bunu başka bir yerlere iletmek JavaScript'in ruhuna tam da uyan bir işlemdir.
Böyle fonksiyonlarda var olan kaynağın ( context) kaybolması istenmez.

<<<<<<< HEAD
=======
And in such functions we usually don't want to leave the current context. That's where arrow functions come in handy.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

## Ok fonksiyonlarının "this"'i yoktur.

Daha önceki bölümden de <info:object-methods> hatırlayacağınız üzere, ok fonksiyonlarının `this`'i olmaz. Eğer `this` erişilmiş ise bu dışarıdaki `this`'dir.

Örneğin bunu objenin içerisinde dönme amaçlı kullanabiliriz:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```
Buradaki `forEach`'te ok fonksiyonu kullanılmıştır, ve `this.title` tam olarak dışarıdaki `showList` metodu ile aynı içeriğe sahiptir. Yani group.title'dır.

Eğer bunu "normal" bir fonksiyon ile yazsaydık, hata alırdık:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
<<<<<<< HEAD
      // Hata: 'title' özelliği tanımsız.
      alert(this.title + ': ' + student)
=======
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
    });
*/!*
  }
};

group.showList();
```
Hatanın sebebi `forEach` çalışırken `this=undefined` varsayılan olarak çalışır, bundan dolayı `undefined.title` çağrısı yapılır.

Bu ok fonksiyonlarında işlemez çünkü ok fonksiyonlarında `this` bulunmamaktadır.

```warn header="Ok fonksiyonları `new` ile çalıştırılamazlar."
`this`'in olmaması bazı sınırlamalara neden olur: ok fonksiyonları constructors(yapıcı - kurucu ) olamazlar ve `new` ile çağırılamazlar. 
```

```smart header="Arrow fonksiyonları ile bind arasındaki fark"
`=>` fonksiyonları ile `.bind(this)` ile çağırılan normal fonksiyonlar arasında ince bir fark vardır.

- `.bind(this)` fonksiyonun "bağlı versiyonu"'nu oluştururken.
- `=>` fonksiyonu hiçbir bağlılık oluşturmaz. Fonksiyon basit bir şekilde `this`'e sahip değildir. `this`'in aranması aynı normal fonksiyonlardaki gibi dışarıdaki sözcüksel ortamda aranması ile son bulur.
```

## Ok fonksiyonlarının "argümanları" olmaz.

Ok fonksiyonlarının `argüman` değişkenleri olmaz.

Var olan `this` ve `argümanlar` ile çağrıyı  yönelendirmek istediğimizde ( dekoratör ) çok yararlı olur.

Örneğin `defer(f, ms)` fonksiyonu bir fonksiyon alıyor ve çağrıyı `ms` kadar geciktiren bir saklayıcı ile dönderiyor:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John 2 sn sonra.
```
Aynısı ok fonksiyonu olmadan aşağıdaki gibi görünür:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```
Burada ayrıca `args` ve `ctx` değişkenlerinin yaratılması gerekir. Böylece `setTimeout` içerisindeki fonksiyon bunları alabilir.

## Özet

Ok fonksiyonları:

- `this` yok.
- `argüman` yok
- `new` ile çağırılamaz.
- `super` yok. Bunu henüz işlemedik, ilerleyen <info:class-inheritance> bölümünde inceleyeceğiz.

<<<<<<< HEAD
Bunların nedeni kısa ve kendi "kaynağı" olmayan ve dış kaynağı kullanacak fonksiyonlar yaratılmak istenmesindendir. Bu noktada gerçekten beklendiği gibi bir etki yapmatadır.

=======
- Do not have `this`
- Do not have `arguments`
- Can't be called with `new`
- They also don't have `super`, but we didn't study it yet. We will on the chapter <info:class-inheritance>

That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one. And they really shine in that use case.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
