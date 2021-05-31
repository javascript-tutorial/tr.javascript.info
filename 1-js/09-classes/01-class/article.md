
# Temel Sınıf sözdizimi

```quote author="Wikipedia"
Sınıf, nesne yönelimli programlama dillerinde nesnelerin özelliklerini, davranışlarını ve başlangıç durumlarını tanımlamak için kullanılan şablonlara verilen addır.
```

Pratikte, aynı türden birçok nesne oluşturmamız gerekebilir, kullanıcılar veya malzemeler gibi.

<info:constructor-new>, kısmından bildiğimiz gibi `new(yeni) fonksiyonu` bize bu konuda yardımcı olabilir.

Ancak modern Javascript'de bundan daha gelişmiş bir "sınıf" yapısı var. Bu yapı nesne tabanlı programlamaya yeni ve faydalı özellikler getiriyor.

## Sınıf sözdizimi

Temel sözdizimi:
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Sonra `new MyClass()` bu metotlarla birlikte yeni bir nesne oluşturuyor.

`constructor()` metodu `new` tarafından otomatik olarak çağırılıyor. Bu sayede nesneyi orada tanımlayabiliyoruz.

Örnek olarak:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();
```

`new User("John")` çağırıldığında:
1. Yeni bir nesne oluşturuluyor.
2. `constructor` verilen argümanla çalışıyor ve buna `this.name`'i atıyor.


...Daha sonra `user.sayHi` gibi metodları çağırabiliriz.


```warn header="Sınıf metodları arasında virgül kullanılmaz"
Acemi geliştiricilerin düştüğü bir hata da, sınıf metodları arasına virgül koymak. Bu da sözdimizi hatasına neden oluyor.

Buradaki notasyon nesne sabitleriyle karıştırılmamalı. Sınıf içinde virgüle ihtiyaç yok.
```

## Sınıf nedir?

Peki, `class` (sınıf) tam olarak nedir? Bu aslında tam olarak yeni bir dil seviyesi obje değil.

Hadi, sihri ortaya çıkaralım ve bir sınıfın tam olarak ne olduğunu görelim. Bu daha karmaşık konseptleri anlamamıza da yardımcı olacak.

Javascript'de sınıf aslında bir tür fonksiyondur.

Şuna bir göz atalım:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
*!*
alert(typeof User); // function
*/!*
```

`class User {...}` yapısının yaptığı şey aslında:
1. `User` adında, sınıfın tanımlayıcısın sonucu olacak, yeni bir fonksiyon oluşturur.
    - The function code is taken from the `constructor` method (assumed empty if we don't write such method).
3. Stores all methods, such as `sayHi`, in `User.prototype`.

Afterwards, for new objects, when we call a method, it's taken from the prototype, just as  described in the chapter <info:function-prototype>. So `new User` object has access to class methods.

We can illustrate the result of `class User` declaration as:

![](class-user.svg)

Here's the code to introspect it:


```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // alert(this.name);

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Not just a syntax sugar

Sometimes people say that `class` is a "syntax sugar" in JavaScript, because we could actually declare the same without `class` keyword at all:

```js run
// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// any function prototype has constructor property by default,
// so we don't need to create it

// 2. Add the method to prototype
User.prototype.sayHi = function() {
  alert(this.name);
};

// Usage:
let user = new User("John");
user.sayHi();
```

The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntax sugar to define a constructor together with its prototype methods.

Although, there are important differences.

1. First, a function created by `class` is labelled by a special internal property `[[FunctionKind]]:"classConstructor"`. So it's not entirely the same as creating it manually.

    Unlike a regular function, a class constructor can't be called without `new`:

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Also, a string representation of a class constructor in most JavaScript engines starts with the "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```

2. Class methods are non-enumerable.
    A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.

    That's good, because if we `for..in` over an object, we usually don't want its class methods.

3. Classes always `use strict`.
    All code inside the class construct is automatically in strict mode.


Also, in addition to its basic operation, the `class` syntax brings many other features with it which we'll explore later.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned, assigned etc.

Here's an example of a class expression:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

Similar to Named Function Expressions, class expressions may or may not have a name.

If a class expression has a name, it's visible inside the class only:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass not visible outside of the class
```


We can even make classes dynamically "on-demand", like this:

```js run
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Create a new class
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getters/setters, other shorthands

Just like literal objects, classes may include getters/setters, generators, computed properties etc.

Here's an example for `user.name` implemented using `get/set`:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

The class declaration creates getters and setters in `User.prototype`, like this:

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

Here's an example with computed properties:

```js run
function f() { return "sayHi"; }

class User {
  [f()]() {
    alert("Hello");
  }

}

new User().sayHi();
```

For a generator method, similarly, prepend it with `*`.

## Class properties

```warn header="Old browsers may need a polyfill"
Class-level properties are a recent addition to the language.
```

In the example above, `User` only had methods. Let's add a property:

```js run
class User {
  name = "Anonymous";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();
```

The property is not placed into `User.prototype`. Instead, it is created by `new`, separately for every object. So, the property will never be shared between different objects of the same class.


## Summary

The basic class syntax looks like this:

```js
class MyClass {
  prop = value; // field

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name/symbol name
  // ...
}
```

`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and settors are written to `MyClass.prototype`.

In the next chapters we'll learn more about classes, including inheritance and other features.
