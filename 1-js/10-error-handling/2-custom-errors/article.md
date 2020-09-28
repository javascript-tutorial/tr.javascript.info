# Düzenlenmiş hatalar, hataların geliştirilmesi

Birşey geliştirirken, genelde kendi hata sınıflarımıza sahip olmak isteriz, böylece bize has yerlerde oluşabilecek hataları idare edebiliriz. Örneğin network hataları için `HttpError`, veri tabanı hataları için `DbError`, arama hataları için `NotFoundError` gibi.

<<<<<<< HEAD
Hatalarımız basit hata özelliklerini `message`, `name` ve `stack`'i desteklemelidir. Bunun ile birlikte kendine has özellikleri de olabilir. Örneğin `HttpError` objesi `statusCode` özelliğine sahip olabilir. Bu özelliğin değeri de `404`, `403`, `500` gibi hata kodları olacaktır.
=======
Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have a `statusCode` property with a value like `404` or `403` or `500`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

JavaScript `throw`'un argüman ile atılmasına izin verir. Teknik olarak hata sınıflarımızın hepsinin `Error`'dan türemesine gerek yoktur. Fakat türetirsek `obj instance of` kullanmak mümkün olacaktır. Böylece hata objesi tanımlanabilir. Bundan dolayı türetirseniz daha iyidir.

<<<<<<< HEAD
Uygulamanızı geliştirirken oluşturacağınız `HttpTimeoutError` gibi sınıflar `HttpError`'dan türetilebilir.
=======
As the application grows, our own errors naturally form a hierarchy. For instance, `HttpTimeoutError` may inherit from `HttpError`, and so on.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Hata sınıflarını genişletme

Örnek olarak, `readUser(json)` adında bir fonksiyon olsun ve bu fonksiyon JSON okusun.

Geçerli bir `json` şu şekildedir:
```js
let json = `{ "name": "John", "age": 30 }`;
```
Dahili olarak gelen `JSON.parse` kullanılacaktır. Eğer bozuk `json` gelirse bu durumda `SyntaxError` atar.

<<<<<<< HEAD
Fakat `json` yazım olarak doğru olsa bile geçerli sayılmayabilir, değil mi? Belki bizim ihtiyacımız veri bulumamaktadır. Örneğin, `name` ve `age` özellikleri bulunmaz ise bu durumda bizim için geçerli bir veri sayılmaz.

`readUser(json)` fonksiyonu sadece JSON okumayacak, doğruluk kontrolü de yapacaktır. Eğer gerekli alanlar yok ise, format yanlışsa bu durumda bu bizim için hatadır. Ayrıca bu bir `SyntaxError` yani yazım hatası değildir. Çünkü yazım olarak doğru olsa da başka türde bir hatadır. Bu hatalara `ValidationError` diyeceğiz ve bunun için bir sınıf oluşturacağız. Bu tür hatalar ayrıca hatanın nedeni hakkında da bilgi içermelidir.
=======
Internally, we'll use `JSON.parse`. If it receives malformed `json`, then it throws `SyntaxError`. But even if `json` is syntactically correct, that doesn't mean that it's a valid user, right? It may miss the necessary data. For instance, it may not have `name` and `age` properties that are essential for our users.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Bizim yazacağımız `ValidationError` sınıfı dahili olarak bulunan `Error` sınıfından türemelidir.

`Error` sınıfı gömülü olarak gelmektedir. Genişletmeden önce neyi genişleteceğimizi bilmek iyi olacaktır:

<<<<<<< HEAD
Şu şekilde:
=======
That class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js
// Gömülü gelen error sınıfının basitleştirilmiş tanımı JavaScript kodu olarak gösterilmektedir.
class Error {
  constructor(message) {
    this.message = message;
<<<<<<< HEAD
    this.name = "Error"; // (farklı gömülü hata sınıfları için farklı isimler)
    this.stack = <nested calls>; // standartlarda yok fakat çoğu ortam desteklemekte
  }
}
```
Şimdi `ValidationError` kalıtımını yapabiliriz:
=======
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <call stack>; // non-standard, but most environments support it
  }
}
```

Now let's inherit `ValidationError` from it and try it in action:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // İç içe çağrıların hangi satırlarda olduğunun listesi.
}
```
Yapıcıya bakarsanız:

<<<<<<< HEAD
1. `(1)` satırda üst sınıfın yapıcısı çağırılmakta. Javascript bizim kalıtılan sınıftan `super` ile üst sınıfı çağırmamız koşulunu koymaktadır. Böylece üst sınıftaki yapıcı `message`'ı doğru bir şekilde ayarlar.
2. Üst sınıfın yapıcısı da `name` ve `"Error"` özelliğini ayarlar, bundan dolayı `(2)` satırda bunu doğru değere ayarlamış oluruz.

`readUser(json)` kullanmayı deneyelim:
=======
Please note: in the line `(1)` we call the parent constructor. JavaScript requires us to call `super` in the child constructor, so that's obligatory. The parent constructor sets the `message` property.

The parent constructor also sets the `name` property to `"Error"`, so in the line `(2)` we reset it to the right value.

Let's try to use it in `readUser(json)`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age"); // age alanı bulunmamakta
  }
  if (!user.name) {
    throw new ValidationError("No field: name");// name alanı bulunmamakta
  }

  return user;
}

// try..catch ile çalışan bir örnek.

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Yanlış veri: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // bilinmeyen bir hata, tekrar at(**)
  }
}
```
Yukarıdaki `try..catch` bloğu hem bizim yazdığımız `ValidationError` hem de gömülü olarak gelen `SyntaxError` hatalarını idare etmektedir.

`instanceof` ile hataların tiplerinin nasıl kontrol edildiğine dikkat edin. `(*)`

Ayrıca `err.name`'e şu şekilde bakabiliriz:

```js
// ...
//  (err instanceof SyntaxError) kullanmak yerine
} else if (err.name == "SyntaxError") { // (*)
// ...
```  
`instanceof` kullanmak daha iyidir. İleride `ValidationError`'u genişletir ve `PropertyRequiredError` gibi alt tipler oluşturursanız `instanceof` ile kalıtılan sınıfı da kontrol etmiş olursunuz. Bundan dolayı gelecekte olacak değişikliklere daha iyi tepki verir.

Ayrıca `catch` bilinmeyen bir hata olduğunda tekrardan bu hatayı atması `(**)` oldukça önemlidir. `catch` sadece veri kontrolü ve yazım hatalarını kontrol etmektedir. Diğer hatalar ise bilinmeyen hatalar bölümüne düşmektedir.

## İleri seviye kalıtım


`ValidationError` sınıfı çok genel bir sınıf. Çoğu şey yanlış gidebilir. Özellik eksik olabilir veya farklı formatta olabilir( örneğin `age` özelliğinin karakter dizisi olması). Bundan dolayı daha özel `PropertyRequiredError` sınıfını yazmakta fayda var. Bu eklenmeyen özellikle ilgili bilgi verecektir.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```
Yeni yazdığımız `PropertyRequiredError` sınıfının kullanımı kolaydır: sadece `new PropertyRequiredError(property)` ismini göndermek yeterli. Okunabilir `message` yapıcı tarafından üretilir.

<<<<<<< HEAD
dikkat ederseniz `PropertyRequiredError` içerisindeki `this.name` yapıcısı elle yapılmıştır. Bu biraz gereksiz gelebilir ( `this.name = <classname>`'in her yeni üretilen sınıf için yazılması). Bunun bir çözümü var elbette. Kendimize ait bir "basic error" ile bu **zor** olayı omzumuzdan atmak mümkündür. Bunun için yapıcıda `this.name` için `this.constructor.name` kullanılarak çözüm sağlanabilir. Sonra bundan kalıtım yapılır.
=======
The new class `PropertyRequiredError` is easy to use: we only need to pass the property name: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Örneğin buna `MyError` diyelim

Aşağıda `MyError` ve diğer özel hata sınıflarının basitleştirilmiş hali görülmektedir:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```
Böylece hata sınıfları kısalmış oldu, özellikle `"this.name=..."`'i attıktan sonra `ValidationError` daha da kısalmış oldu.

## İstisnaları Kapsama

Hatırlarsanız yukarıdaki `readUser` "kullanıcıların verilerini okumak" amacıyla yazılmıştı, değil mi? Farklı hatalar olabileceğinden dolayı şimdilik `SyntaxError`, `ValidationError` gibi hata sınıflarına sahibiz. Fakat `readUser` ileride daha da büyüyebilir: yeni kod yeni hatalara neden olacaktır.

<<<<<<< HEAD
Bundan dolayı `readUser`'ı çağıran fonksiyon hataları ile başa çıkmalıdır. Şu anda bir çok `if`, `catch` ile kontrol edilip eğer bunlar dahilinde değil ise tekrar hata atma işlemini yapmaktayız. Fakat `readUser` fonksiyonu daha fazla hataya neden olursa, kendimize: gerçekten de tüm hataları birer birer kontrol etmemiz gerekli mi sorusunu sormalıyız.

Tabiki cevap "Hayır": Dıştaki kod her zaman "diğerlerinden bir üst seviyede" olmak ister. "veri okuma hatası" gibi bir hata olmak ister. Neden olduğu çok da önemli değildir. Tabi hataların detayları olsa iyi olur fakat sadece ihtiyaç olursa.

Bunlar ışığında `ReadError` sınıfını yeniden yazacak olursak. Eğer `readUser` içerisinde bir hata olursa bunu yakalayacak ve `ReadError` üreteceğiz. Ayrıca orjinal hatanın `cause` ( neden ) özelliğine referans vereceğiz. Bundan dolayı dıştaki kod sadece `ReadError`'u kontrol etmeli.

Aşağıdaki kod `ReadError`'u tanımlamakta ve `readUser` ve `try..catch`'in nasıl kullanılacağını göstermektedir:
=======
The purpose of the function `readUser` in the code above is "to read the user data". There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.

Here's the code that defines `ReadError` and demonstrates its use in `readUser` and `try..catch`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```
Yukarıdaki kodda `readUser` tam da tanımlandığı şekliyle çalışmaktadır -- yazım hatalarını yakalar, eğer doğrular ve bilinmeyen hatalar yerine `ReadError` hatası atar.

<<<<<<< HEAD
Bundan dolayı dıştaki kod `instanceof ReadError`'u kontrol eder, hepsi bu! Diğer tüm muhtemel hataları listelemeye gerek yok.

Bu yaklaşıma "İstisnaları kapsama" yaklaşımı denilir, "düşük seviye istisnalar"'ı alıp bunları "kapsayarak" `ReadError` haline getirdik. Böylece daha soyut, ve çağırması kolay bir kod yazmış olduk. Bu kullanım nesne tabanlı dillerde oldukça yaygındır.
=======
In the code above, `readUser` works exactly as described -- catches syntax and validation errors and throws `ReadError` errors instead (unknown errors are rethrown as usual).

So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Özet

<<<<<<< HEAD
- Genelde `Error`'dan veya diğer gömülü hata sınıflarından yeni hata türetilir, yapmanız gereken `name` özelliğini ayarlamak ve `super`'i çağırmaktır.
- Çoğu zaman `instanceof` ile belirli hataları kontrol edebilirsiniz. Bu kalıtım ile de çalışmaktadır. Fakat bazen 3. parti kütüphanelerden gelen hatalar olabilir, bunların sınıflarını almak çok da kolay olmaz. Bu durumda `name` özelliği ile konrol sağlanabilir.
- Alt-seviye istisnaların idaresi ve üst seviye hataların raporlanması oldukça genel bir tekniktir. Alt seviye istisnalar bazen o objenin özelliği olur. Örneğin yukarıdaki `err.cause` buna iyi bir örnektir, fakat katı bir biçimde gereklidir diyemeyiz.
=======
- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
