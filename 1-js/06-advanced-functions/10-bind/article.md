libs:
  - lodash

---

# Fonksiyon bağlama

Obje metodları ile `setTimeout` kullanıldığında veya obje metodları iletilirken, `this`'in kaybolması bilinen bir problemdir.

Aniden, `this` kaybolur. Bu problem başlangıç seviyesi geliştiriciler için çok tipiktir, bazen deneyimli geliştiriciler de bu hataya düşerler.

## "this"i kaybetme

JavaScript'te `this` in ne kadar kolay bir şekilde kaybolduğunu zaten biliyorsunuz. Eğer bir metod objeden farklı bir yere iletilirse `this` kaybolur.

Bu `setTimeout` ile nasıl olur bakalım:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Gördüğünüz gibi, çıktı "John"u göstermedi bunun yerine `undefined` döndü!

Bunun nedeni `setTimeout`'un `user.sayHi` fonksiyonunun objeden ayrı olmasıdır. Son satır şu şekilde yazılabilir:

```js
let f = user.sayHi;
setTimeout(f, 1000); // kullanıcı kaynağı kayboldu
```

Tarayıcıda `setTimeout` kullanımı biraz özeldir: `this=window` olarak ayarlanır. ( Node.JS için `this` timer objesi olur, fakat burada pek de önemli değil.) Öyleyse `this.firstName` bu değeri `window.firstName`'den almaya çalışır, fakat böyle bir şey yok. Buna benzer durumlarda siz de göreceksiniz `this` genelde `undefined` olur.

Aslında yapmak istediğimiz çok basit obje metodunu çağırılan yere ( -- ) iletmek istiyoruz ( burada -- zamanlayıcıdır). Bunun doğru kaynakta çağırıldığına nasıl emin olunabilir?

## Çözüm 1: saklayıcı

En basit çözüm bir saklayıcı ( wrapper ) fonksiyonu kullanmaktır:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Çalışmasının nedeni `user`'ı dış sözcük ortamından almasıdır, sonrasında metodu normal bir şekilde çalıştırır.

Aynısı, fakat biraz daha kısa hali:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```
Fena değil, fakat kod yapısal olarak biraz sorunlu görünüyor.

`setTimeout` çalışmadan önce ( 1 sn ara ile çalışıyor ) `user` değeri değişirse? Sonra aniden yanlış objeyi çağıracaktır.


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...kullanıcının değeri 1 saniye içinde değişir
user = { sayHi() { alert("Another user in setTimeout!"); } };

//SetTimeout'da başka bir kullanıcı!
```

Bir sonraki çözüm içe böyle bir şeyin olmasını engeller.

## Çözüm 2: bağlama

Fonksiyonlar [bind](mdn:js/Function/bind) varsayılan fonksiyonu sağlarlar. Bu fonksiyon `this`'in sabitlenmesini olanak verir.

Basitçe yazımı şu şekildedir:

```js
// daha karmaşık yazımlarına ileride geleceğiz.
let boundFunc = func.bind(kaynak);
````

`func.bind(kaynak)`'ın sonucu özel bir fonksiyon benzeri "egzotik obje"dir. Fonksiyon gibi çağırılabilir ve saydam bir şekilde çağrıyı `func`'a `this=kaynak` olacak şekilde iletir.

Diğer bir deyişle `boundFunc` aslında sabit `this`'e sahip `func`'dur.

Örneğin burada `funcUser` çağrıyı `func` fonksiyonuna `this=user` olacak şekilde iletir.

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Burada `func.bind(user)` aslında `func`'un `this=user` olarak "bağlanmış halidir".

Tüm argümanlar orjinal `func`'a olduğu gibi aktarılır, örneğin:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// this'i user'a bağla.
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John ("Hello" iletildi ve this=user oldu)
*/!*
```
Bunu obje metodu ile deneyecek olursak:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
```

`(*)` satırında `user.sayHi` metodunu alıyoruz ve `user`'a bağlıyoruz. `sayHi` bu durumda `bağlanmış` fonksiyon oluyor. Böylece tek başına çağırılabilir veya `setTimeout` içerisinde çağırılabilir. Nereden çağırıldığı çok da önemli değildir. Kaynağı her zaman doğru olacaktır.

Gördüğünüz gibi tüm argümanlar "olduğu gibi" iletilir, sadece `this` `bind` tarafından sabitlenmiştir:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" `say` fonksiyonuna iletildi)
say("Bye"); // Bye, John ("Bye" `say` fonksiyonuna iletildi.)
```

````smart header="Kullanışlı metod: `bindAll`"
Eğer bir objenin birçok metodu var ise bunu aktif olarak gerekli yerlere iletip, bunları bir döngü içerisine alabiliriz:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```
Bu şekilde büyük bağlama olayları için bazı JavaScript kütüphanelerinden yardım alınabilir. Örneğin lodash ,[_.bindAll(obj)](http://lodash.com/docs#bindAll) fonksiyonuna sahiptir.

````

## Özet

`func.bind(kaynak, ...args)` `func` fonksiyonunun "bağlanmış hali"ni döndürür. Bu bağlanmış halde `this` ve argümanlar sabitlenir.

Bind genelde obje metodlarındaki `this`'in sabitlenmesi amacıyla kullanılır, sonrasında istenilen yere iletilebilir. `setTimeout` örneği gibi. `bind`'in modern geliştirmede kullanılmasının birçok nedeni vardır bunlara ilerleyen konularda değineceğiz.

