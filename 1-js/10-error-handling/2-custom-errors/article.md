# Düzenlenmiş hatalar, hataların geliştirilmesi

Bir şey geliştirirken, genelde kendi hata sınıflarımıza sahip olmak isteriz, böylece bize has yerlerde oluşabilecek hataları idare edebiliriz. Örneğin network hataları için `HttpError`, veri tabanı hataları için `DbError`, arama hataları için `NotFoundError` gibi.

Hatalarımız basit hata özelliklerini `message`, `name` ve `stack`'i desteklemelidir. Bunun ile birlikte kendine has özellikleri de olabilir. Örneğin `HttpError` objesi `statusCode` özelliğine sahip olabilir. Bu özelliğin değeri de `404`, `403`, `500` gibi hata kodları olacaktır.

JavaScript `throw`'un argüman ile atılmasına izin verir. Teknik olarak hata sınıflarımızın hepsinin `Error`'dan türemesine gerek yoktur. Fakat türetirsek `obj instance of` kullanmak mümkün olacaktır. Böylece hata objesi tanımlanabilir. Bundan dolayı türetirseniz daha iyidir.

Uygulamanızı geliştirirken oluşturacağınız `HttpTimeoutError` gibi sınıflar `HttpError`'dan türetilebilir.

## Hata sınıflarını genişletme

Örnek olarak, `readUser(json)` adında bir fonksiyon olsun ve bu fonksiyon JSON okusun.

Geçerli bir `json` şu şekildedir:
```js
let json = `{ "name": "John", "age": 30 }`;
```
Dahili olarak gelen `JSON.parse` kullanılacaktır. Eğer bozuk `json` gelirse bu durumda `SyntaxError` atar.

Fakat `json` yazım olarak doğru olsa bile geçerli sayılmayabilir, değil mi? Belki bizim ihtiyacımız veri bulumamaktadır. Örneğin, `name` ve `age` özellikleri bulunmaz ise bu durumda bizim için geçerli bir veri sayılmaz.

`readUser(json)` fonksiyonu sadece JSON okumayacak, doğruluk kontrolü de yapacaktır. Eğer gerekli alanlar yok ise, format yanlışsa bu durumda bu bizim için hatadır. Ayrıca bu bir `SyntaxError` yani yazım hatası değildir. Çünkü yazım olarak doğru olsa da başka türde bir hatadır. Bu hatalara `ValidationError` diyeceğiz ve bunun için bir sınıf oluşturacağız. Bu tür hatalar ayrıca hatanın nedeni hakkında da bilgi içermelidir.

Bizim yazacağımız `ValidationError` sınıfı dahili olarak bulunan `Error` sınıfından türemelidir.

`Error` sınıfı gömülü olarak gelmektedir. Genişletmeden önce neyi genişleteceğimizi bilmek iyi olacaktır:

Şu şekilde:

```js
// Gömülü gelen error sınıfının basitleştirilmiş tanımı JavaScript kodu olarak gösterilmektedir.
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (farklı gömülü hata sınıfları için farklı isimler)
    this.stack = <nested calls>; // standartlarda yok fakat çoğu ortam desteklemekte
  }
}
```
Şimdi `ValidationError` kalıtımını yapabiliriz:

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

1. `(1)` satırda üst sınıfın yapıcısı çağırılmakta. Javascript bizim kalıtılan sınıftan `super` ile üst sınıfı çağırmamız koşulunu koymaktadır. Böylece üst sınıftaki yapıcı `message`'ı doğru bir şekilde ayarlar.
2. Üst sınıfın yapıcısı da `name` ve `"Error"` özelliğini ayarlar, bundan dolayı `(2)` satırda bunu doğru değere ayarlamış oluruz.

`readUser(json)` kullanmayı deneyelim:

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

dikkat ederseniz `PropertyRequiredError` içerisindeki `this.name` yapıcısı elle yapılmıştır. Bu biraz gereksiz gelebilir ( `this.name = <classname>`'in her yeni üretilen sınıf için yazılması). Bunun bir çözümü var elbette. Kendimize ait bir "basic error" ile bu **zor** olayı omzumuzdan atmak mümkündür. Bunun için yapıcıda `this.name` için `this.constructor.name` kullanılarak çözüm sağlanabilir. Sonra bundan kalıtım yapılır.

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

Bundan dolayı `readUser`'ı çağıran fonksiyon hataları ile başa çıkmalıdır. Şu anda bir çok `if`, `catch` ile kontrol edilip eğer bunlar dahilinde değil ise tekrar hata atma işlemini yapmaktayız. Fakat `readUser` fonksiyonu daha fazla hataya neden olursa, kendimize: gerçekten de tüm hataları birer birer kontrol etmemiz gerekli mi sorusunu sormalıyız.

Tabiki cevap "Hayır": Dıştaki kod her zaman "diğerlerinden bir üst seviyede" olmak ister. "veri okuma hatası" gibi bir hata olmak ister. Neden olduğu çok da önemli değildir. Tabi hataların detayları olsa iyi olur fakat sadece ihtiyaç olursa.

Bunlar ışığında `ReadError` sınıfını yeniden yazacak olursak. Eğer `readUser` içerisinde bir hata olursa bunu yakalayacak ve `ReadError` üreteceğiz. Ayrıca orjinal hatanın `cause` ( neden ) özelliğine referans vereceğiz. Bundan dolayı dıştaki kod sadece `ReadError`'u kontrol etmeli.

Aşağıdaki kod `ReadError`'u tanımlamakta ve `readUser` ve `try..catch`'in nasıl kullanılacağını göstermektedir:

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

Bundan dolayı dıştaki kod `instanceof ReadError`'u kontrol eder, hepsi bu! Diğer tüm muhtemel hataları listelemeye gerek yok.

Bu yaklaşıma "İstisnaları kapsama" yaklaşımı denilir, "düşük seviye istisnalar"'ı alıp bunları "kapsayarak" `ReadError` haline getirdik. Böylece daha soyut, ve çağırması kolay bir kod yazmış olduk. Bu kullanım nesne tabanlı dillerde oldukça yaygındır.

## Özet

- Genelde `Error`'dan veya diğer gömülü hata sınıflarından yeni hata türetilir, yapmanız gereken `name` özelliğini ayarlamak ve `super`'i çağırmaktır.
- Çoğu zaman `instanceof` ile belirli hataları kontrol edebilirsiniz. Bu kalıtım ile de çalışmaktadır. Fakat bazen 3. parti kütüphanelerden gelen hatalar olabilir, bunların sınıflarını almak çok da kolay olmaz. Bu durumda `name` özelliği ile konrol sağlanabilir.
- Alt-seviye istisnaların idaresi ve üst seviye hataların raporlanması oldukça genel bir tekniktir. Alt seviye istisnalar bazen o objenin özelliği olur. Örneğin yukarıdaki `err.cause` buna iyi bir örnektir, fakat katı bir biçimde gereklidir diyemeyiz.