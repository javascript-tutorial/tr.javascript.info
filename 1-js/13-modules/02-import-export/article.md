# Dışa Aktarma ve Dahil Etme

<<<<<<< HEAD
Dışa aktarma ve dahil etme yönergeleri çok yönlüdür.

Önceki bölümde basit bir kullanımı gördük. Şimdi daha fazla örnek keşfedelim.
=======
Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let's explore more examples.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Bildirimler Önce Dışa Aktarım

Bir değişken, fonksiyon ya da bir sınıf olsun, herhangi bir bildirimi önce `export` diyerek dışa aktarılmış olarak etiketleyebiliriz.

Örneğin, buradaki tüm dışa aktarımlar geçerlidir:

```js
// Bir diziyi dışarıya atkarma
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Bir sabiti dışarıya aktarma
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// Bir sınıfı dışarıya aktarma
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="No semicolons after export class/function"
<<<<<<< HEAD
Unutmayın ki, bir sınıf veya fonksiyondan önce `export` bir  [işlev ifadeleri](info:arrow-functions-basics) yapmaz. Dışarıya aktarılmasına rağmen hala bir işlev bildirgesidir.

JavaScript stil kılavuzlarının çoğu ifadelerden sonra noktalı virgül önermektedir ama işlev ve sınıf bildirimlerinden sonra değil. 

Bu nedenle `export class` ve `export function` sonuna noktalı virgül konulmamalıdır..
=======
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.

Most JavaScript style guides don't recommend semicolons after function and class declarations.

That's why there's no need for a semicolon at the end of `export class` and `export function`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // sonunda ; yok */!*
```

````

## Bildirimlerden ayrı dışa aktarma

Ayrıca, `export` ayrı ayrı koyabiliriz.

Burada önce bildirir sonra dışarıya aktarırız:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // dışa aktarıların değişkenlerin listesi
*/!*
```

...Veya teknik olarak `export` fonksiyonların üstüne koyabiliriz. 

## İmport *

<<<<<<< HEAD
Genelde, `import {...}` içine neyin içine aktarılacağını içeren bir liste koyarız, şöyle:
=======
Usually, we put a list of what to import in curly braces `import {...}`, like this:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

<<<<<<< HEAD
Ama liste uzunsa, `import * as <obj>` kullanarak her şeyi nesne olarak alabiliriz, örneğin:
=======
But if there's a lot to import, we can import everything as an object using `import * as <obj>`, for instance:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

İlk bakışta, "her şeyi dahil etmek" kısa yazıldığı için güzel gözüküyor. İçeriye aktarmamız için neye ihtiyaç varsa neden açıkça listeleyelim?

Bunun birkaç nedeni var.

<<<<<<< HEAD
1. Modern derleme araçları ([webpack](http://webpack.github.io) ve diğerleri) modülleri bir araya getirir ve kullanılmasını önleyen yükleme işlemlerini hızlandırmak ve kaldırmak için optimize eder.

    Diyelim ki, birçok fonksiyona sahip projemize 3. parti bir kütüphane `lib.js` ekledik.   
    ```js
    // 📁 lib.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Şimdi projemizde `lib.js` fonksiyonlarından sadece birini kullanırsak
    ```js
    // 📁 main.js
    import {sayHi} from './lib.js';
    ```
    ...Ardından optimizer otomatik olarak algılar ve diğer işlevleri birlikte verilen koddan tamamen kaldırır, böylece yapı daha küçük hale gelir. Buna "tree-shaking" denilir.

2. Açıkça listelemek ne içeri aktarılacaksa daha kısa isimler verilir: `lib.sayHi()` yerine `sayHi()`.
3. Açıkça dahil etmek kod yapısında daha iyi genel bakışı sağlar: Nerede, ne kullanılır. Kod desteğini ve yeniden düzenlemeyi kolaylaştırır.
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Import "as"

Farklı isimler altında içeriye aktarmak için `as` da kullanabiliriz.

<<<<<<< HEAD
Örneğin, Hadi kısa olması için `sayHi` değişkenini `hi` yerel değişken içine alalım. Aynı şekilde `sayBye` içinde:
=======
For instance, let's import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export "as"

Benzer sözdizimleri `export` içinde var.

Hadi fonksiyonları `hi` ve `bye` olarak dışarıya aktaralım:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

<<<<<<< HEAD
Şimdi `hi` ve `bye` dışarıdakiler için resmi isimler:
=======
Now `hi` and `bye` are official names for outsiders, to be used in imports:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

<<<<<<< HEAD
Şimdiye kadar, Birden çok şeyi içeriye/dışarıya aktaracağımızı gördük, isteğe bağlı olarak "as" diğer isimler.

Pratikte, modüller şunlardan birini içerir:
- Bir kütüphane, fonksiyonlar paketi, `lib.js` gibi.
- Veya bir varlık,`user.js` de `class User` tanımlanmıştır. Bütün modül bu sınıfa sahiptir.
=======
In practice, there are mainly two kinds of modules.

1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Çoğunlukla ikinci yaklaşım tercih edilir. Böylece her "şey" kendi modülünde bulunur.

<<<<<<< HEAD
Doğal olarak bu çok fazla dosya gerektirir, her şeyin kendi modülünü istediği gibi, ama bu hiç sorun değil. Aslında, dosyalar iyi adlandırılmışsa ve klasörler halinde yapılandırılmışsa kod gezinme işlemi kolaylaşır.

Modüller, "modül başına bir şeyin" daha iyi görünmesini sağlamak için özel `export default` sözdizimi sağlar.

`export` ve `import` ifadesini takip etmesi gerekir:

1. Modulün "main export"tan önce `export default` koyun
2. Süslü parantez olmadan `import` çağırın.

Örneğin, burada `user.js` `class User` ı dışarıya aktarır:
=======
Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.

Put `export default` before the entity to export:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 user.js
export *!*default*/!* class User { // sadece "default" ekle
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
...ve `main.js`de içeriye aktarılır:
=======
There may be only one `export default` per file.

...And then import it without curly braces:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} değir, sadece User

new User('John');
```

<<<<<<< HEAD
Süslü parantezler olmadan içeri aktarmalar daha güzel görünür. Modülleri kullanmaya başlarken görülen yaygın hatalardan biri süslü parantezleri tamamen unutmaktır. Bu nedenle, unutmayın. `import` adlandırılmış içeriye aktarma işlemleri için süslü parantezler gereklidir ama varsayılan için bunlara gerek yoktur.
=======
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn't need them for the default one.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

| Adlandırılmış İçeriye Aktarılanlar | Varsayılan İçeriye Aktarılanlar |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

<<<<<<< HEAD
Doğal olarak, dosya başına yalnızca bir "varsayılan" dışa aktarma olabilir.

Tek bir modülde hem varsayılan hem de adlandırılmış içeriye aktarma yapabiliriz ancak pratikte insanlar genellikle bunu karıştırmaz. Bir modül, dışa aktarma adını verir veya varsayılan olanıdır.

**Unutulmaması gereken bir başka şey de, dışa aktarma adının (doğal olarak) bir adı olması gerekirken, `export default` adsız olabilir.**
=======
Technically, we may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Örneğin, Bunların hepsi mükemmel ve doğru `default export` kullanımları:

```js
export default class { // sınıf adı yok
  constructor() { ... }
}
```

<<<<<<< HEAD
export default function(user) { // fonksiyon adı yok
=======
```js
export default function(user) { // no function name
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  alert(`Hello, ${user}!`);
}
```

<<<<<<< HEAD
// bir değişken yapmadan tek bir değer dışarıya aktar
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Bu iyi çünkü `export default` dosya başına yalnızca bir tanesidir. Bunun aksine, adlandırılmış içeriye aktarma için bir adın çıkarılması bir hata olur: 
=======
```js
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
export class { // Hata! (non-default export needs a name)
  constructor() {}
}
```

<<<<<<< HEAD
### "Default" Takma Adı

"default" anahtar sözcüğü, varsayılan  içeriye aktarma, bağımsız içeriye aktarma ve referans göstermemiz gerektiğinde diğer senaryolar için "takma ad" kullanılır.

Örneğin, önceden bildirilmiş bir işlevimiz varsa , işte bunu `export default` nasıl yaparız (tanımdan ayrı olarak):
=======
### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

<<<<<<< HEAD
export {sayHi as default}; // fonksiyondan önce "export default" eklediğimiz gibi
```

Ya da bir `user.js` modulünün bir ana "varsayılan" şeyi ve birkaç tane adlandırılmış olanı dışarı aktarıldığını varsayalım.
=======
// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Varsayılan dışa aktarma adını adlandırılmış olanla birlikte şu şekilde alabiliriz: 

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

<<<<<<< HEAD
Ya da `*` nesnesini almayı düşünürsek `default` özelliği tam olarak varsayılan içeriye aktarmadır:
=======
And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### A word against default exports

<<<<<<< HEAD
### Varsayılan içeriye aktarmayı kullanmalı mıyım?

Varsayılan dışa aktarım kullanımlarında dikkat edilmelidir. Çünkü bakımı daha zordur.

Adlandırılmış açıktır. Aldıkları şeyi tam olarak açıklıyorlar. Bu yüzden onlardan bu bilgilere sahibiz. Bu iyi bir şey.

Ayrıca, adlandırılmış dışa aktarma işlemleri bizi içe aktarmak için doğru adı kullanmaya zorlar:
=======
Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
import {User} from './user.js';
// import {MyUser} çalışmayacak, adı {User} olmalı
```

<<<<<<< HEAD
Varsayılan içeriye aktarma için içeriye aktarırken her zaman adı seçeriz:

```js
import User from './user.js'; // çalışır
import MyUser from './user.js'; // çalışır
// Bir şey içeriye aktarılabilir..., ve çalışacaktır
=======
...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```
Yani, kötüye kullanılabilecek biraz daha fazla özgürlük var. Böylece ekip üyeleri aynı şey için farklı isimler kullanabilirler.

<<<<<<< HEAD
Genelde, bundan kaçınmak ve kodu tutarlı tutmak için içe aktarılan değişkenlerin dosya adlarına karşılık gelmesi gerektiği bir kural vardır: 
=======
So team members may use different names to import the same thing, and that's not good.

Usually, to avoid that and keep the code consistent, there's a rule that imported variables should correspond to file names, e.g:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

<<<<<<< HEAD
Başka bir çözüm, her yerde adlandırılmış içeriye aktarım kullanmak olacaktır. Sadece tek bir şey içeriye aktarılsa bile yine de `default` olmadan bir isim altında içeriye aktarılır.
=======
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Bu da re-export (aşağıda göreceksin) biraz daha kolay hale gelir.

## Yeniden dışa aktarma

"Yeniden dışa aktarma" söz dizimi `export ... from ...`  şeyleri içeriye aktarmasına ve hemen (başka bir isim altında) içeriye aktarmasına izin verir: 

```js
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

<<<<<<< HEAD
Amaç ne? Neden bu gerekli? Pratik bir kullanım örneği görelim.

Bir "paket" yazdığımızı düşünelim: dışarıda dışa aktarılan fonksiyonelliklerin bir kısmı ile çoğunlukla dahili olarak ihtiyaç duyulan birçok modüle sahip bir klasör (NPM gibi araçlar paketleri yayınlamaya ve dağıtmaya izin verir, ancak burada önemi yoktur).

Bir klasör yapısı şöyle olabilir: 
=======
Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don't have to use them), and many modules are just "helpers", for internal use in other package modules.

The file structure could be like this:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

<<<<<<< HEAD
Paket işlevselliğini tek bir giriş noktası üzerinden göstermek istiyoruz, "ana dosya" `auth/index.js` böyle kullanılmalı:
=======
We'd like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the "main file" `auth/index.js`.

Like this:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
Buradaki fikir, paketimizi kullanan geliştiricilerin iç yapısıyla karışmaması gerektiğidir. Paket klasörümüzdeki dosyaları aramamalılar. Sadece `auth/index.js`de gerekli olanları dışarıya aktarıyoruz ve gerisini meraklı gözlerden gizleriz.

Şimdi, dışa aktarılan gerçek işlevsellik paketin arasına dağılmış olduğundan, paket içinde "Yeniden dışa aktarma" ve toplayabiliriz:
`auth/index.js`:
=======
The "main file", `auth/index.js` exports all the functionality that we'd like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
```

<<<<<<< HEAD
"Yeniden dışa aktarma" bunun için sadece kısa bir gösterimidir:
=======
Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';
<<<<<<< HEAD
// ya da tüm yardımcıları yeniden dışa aktarma için kullanabiliriz.
// export * from './helpers.js';
=======
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

// re-export the default export as User
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
````warn header="Yeniden dışa aktarma default is tricky"
Lütfen unutmayın: `export User from './user.js'` çalışmayacak. Bu aslında sözdizimi hatası. Varsayılan içeriye aktarmayı yeniden dışa aktarım için açıkça belirtmeliyiz `{default as ...}`. Yukarıdaki örnekte olduğu gibi.

Ayrıca, başka bir tuhaflık var: `export * from './user.js'` varsayılan olan haric, yalnızca adlandırılmış dışa aktarımlar yeniden dışa aktarılır. Bir kez daha açıkça söylemeliyiz.

Örneğin, her şeyi yeniden dışa aktarmak için iki ifade gerekli olacaktır:
```js
export * from './module.js'; // adlandırılmış dışarıya aktarımı yeniden dışarıya aktarmak için
export {default} from './module.js'; // varsayılanı yeniden dışarıya aktarmak için 
```

Varsayılan değer açıkça yalnızca yeniden dışa aktarırken belirtilmelidir `import * as obj` iyi çalışır. Varsayılan dışa aktarımı `obj.default` olarak alır. Yani burada içe aktarım ve dışa aktarım yapıları arasında hafif bir asimetri var.
````
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.

### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js` with the `export default class User` and would like to re-export it:

```js
// 📁 user.js
export default class User {
  // ...
}
```

We can come across two problems with it:

1. `export User from './user.js'` won't work. That would lead to a syntax error.

    To re-export the default export, we have to write `export {default as User}`, as in the example above.

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and default exports, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting a default export are one of the reasons why some developers don't like default exports and prefer named ones.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Özetle

<<<<<<< HEAD
Aşağıda `export` türleri vardır:

- Bildirmeden önce:
  - `export [default] class/function/variable ...`
- Bağımsız:
  - `export {x [as y], ...}`.
- Yeniden dışa aktarma:
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"` (varsayılan yeniden dışa aktarmaz).
  - `export {default [as y]} from "mod"` (varsayılanı yeniden dışa aktar).
=======
Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

İçeriye Aktarma:

<<<<<<< HEAD
- Modülden adlandırılmış içeri aktarma:
  - `import {x [as y], ...} from "mod"`
- Varsayılan içeri aktarma:  
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- Her şey:
  - `import * as obj from "mod"`
- Modulü içeriye aktarın (çalışır) ama değişkene atamayın:
  - `import "mod"`

Import/export ifadelerini bir komut dosyasının en üstüne veya en altına koyabiliriz. Fark etmez.

Yani teknik olarak bu iyi:
=======
- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```js
sayHi();

// ...

<<<<<<< HEAD
import {sayHi} from './say.js'; // script'in sonunda içe aktar
```

Uygulamada, daha iyi rahatlık için içeriye aktarma genellikle dosyanın başındadır.
**Unutmayın ki, import/export ifadeleri `{...}` içindeyse çalışmaz.**
=======
import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for more convenience.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Bunun gibi koşullu bir içe aktarma çalışmaz: 
```js
if (something) {
  import {sayHi} from "./say.js"; // Hata: içe aktarma en üst düzeyde olmalı
}
```

...Ama ya bir şeyi gerçekten şartlı olarak içeri aktarmamız gerekiyorsa? Ya da doğru zamanda? Örneğin, gerçekten ihtiyaç duyulduğunda istek üzerine bir modül yükleme?

<<<<<<< HEAD
Bir sonraki bölümde dinamik içeriye aktarma göreceğiz.
=======
We'll see dynamic imports in the next article.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
