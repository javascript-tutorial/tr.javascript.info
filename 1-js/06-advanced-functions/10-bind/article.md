libs:
  - lodash

---

# Fonksiyon bağlama

<<<<<<< HEAD
Obje metodları ile `setTimeout` kullanıldığında veya obje metodları iletilirken, `this`'in kaybolması bilinen bir problemdir.

Aniden, `this` kaybolur. Bu problem başlangıç seviyesi geliştiriciler için çok tipiktir, bazen deneyimli geliştiriceler de bu hataya düşerler.
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

## "this"'in kaybetme

<<<<<<< HEAD
JavaScript'te `this` in ne kadar kolay bir şekilde kaybolduğunu zaten biliyorsunuz. Eğer bir metod objeden farklı bir yere iletilirse `this` kaybolur.
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

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

Gördüğünüz gibi, çıktı "John"'u göstermedi bunun yerine `undefined` döndü!

Bunun nedeni `setTimeout`'un `user.sayHi` fonksiyonunun objeden ayrı olmasıdır. Son satır şu şekilde yazılabilri:

```js
let f = user.sayHi;
setTimeout(f, 1000); // lost kullanıcı kaynağı kayboldu
```

<<<<<<< HEAD
Tarayıcıda `setTimeout` kullanımı biraz özeldir: `this=window` olarak ayarlanır. ( Node.JS için `this` timer objesi olur, fakat burada pek de önemli değil.) Öyleyse `this.firstName` bu değeri `window.firstName`'den almaya çalışır, fakat böyle birşey yok. Buna benzer durumlarda siz de göreceksiniz `this` genelde `undefined` olur.
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Aslında yapmak istediğimiz çok basit obje metodunu çağrılan yere ( -- ) iletmek istiyoruz ( burada -- zamanlayıcıdır.) Bunun doğru kaynakta çağırıldığına nasıl emin olunabilir?

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

// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
```

Bir sonraki çözüm içe böyle birşeyin olmasını engeller.

## Çözüm 2: bağlama

Fonksiyonlar [bind](mdn:js/Function/bind) varsayılan fonksiyonu sağlarlar. Bu fonksiyon `this`'in sabitlenmesini olanak verir.

Basitçe yazımı şu şekildedir:

```js
<<<<<<< HEAD
// daha karmaşık yazımlarına ileride geleceğiz.
let boundFunc = func.bind(kaynak);
````
=======
// more complex syntax will come a little later
let boundFunc = func.bind(context);
```
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

`func.bind(kaynak)`'ın sonucu özel bir fonksiyon benzeri "egzotik obje"'dir. Fonksiyon gibi çağırılabilir ve saydam bir şekilde çağrıyı `func`'a `this=kaynak` olacak şekilde iletir.

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

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

`(*)` satırında `user.sayHi` metodunu aıyoruz ve `user`'a bağlıyoruz. `sayHi` bu durumda `bağlanmış` fonksiyon oluyor. Böylece tek başına çağrılabilir veya `setTimeout` içerisinde çağrılabilir. Nereden çağırıldığı çok da önemli değidlir. Kaynağı her zaman doğru olacaktır.

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
Eğer bir objenin birçok metodu var ise bunu aktik olarak gerekli yerlere iletep, bunları bir döngü içerisine alabiliriz:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```
Bu şekilde büyük bağlama olayları için bazı JavaScript kütüphanelerinden yardım alınabilir. Örneğin lodash ,[_.bindAll(obj)](http://lodash.com/docs#bindAll) fonksiyonuna sahiptir.

<<<<<<< HEAD
````

## Özet

`func.bind(kaynak, ...args)` `func` fonksiyonunun "bağlanmış hali"'ni döndürür. Bu bağlanmış halde `this` ve argümanlar sabitlenir.
=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
````

## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function `double` on its base:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Bind genelde obje metodlarındaki `this`'in sabitlenmesi amacıyla kullanılır, sonrasında istenilen yere iletilebilir. `setTimeout` örneği gibi. `bind`'in modern geliştirmede kullanılmasının bir çok nedeni vardır bunlara ilerleyen konularda değineceğiz.

<<<<<<< HEAD
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
