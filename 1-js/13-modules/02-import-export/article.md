# Dışa Aktarma ve Dahil Etme

Dışa aktarma ve dahil etme yönergeleri çok yönlüdür.

Önceki bölümde basit bir kullanımı gördük. Şimdi daha fazla örnek keşfedelim.

## Bildirimler Önce Dışa Aktarım

Bir değişken, fonksyion ya da bir sınıf olsun, herhangi bir bildirimi önce `export` diyerek dışa aktarılmış olarak etiketleyebiliriz.

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
Unutmayın ki, bir sınıf veya fonksyiondan önce `export` bir  [işlev ifadeleri](info:function-expressions-arrows) yapmaz. Dışarıya aktarılmasına rağmen hala bir işlev bildirgesidir.

Javascript stil kılavuzlarının çoğu ifadelerden sonra noktalı birgül önermektedir ama işlev ve sınıf bildirimlerinden sonra değil. 

Bu nedenle `export class` ve `export function` sonuna noktalı virgül konuşmamalıdır..

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

Genelde, `import {...}` içine neyin içine aktarılacağını içeren bir liste koyarız, şöyle:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Ama liste uzunsa, `import * as <obj>` kullanarak her şeyi nesne olarak alabiliriz, örneğin:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

İlk bakışta, "her şeyi dahil etmek" kısa yazıldığı için güzel gözüküyor. İçeriye aktarmamız için neye ihtiyaç varsa neden açıkça listeleyelim?

Bunun bir kaç nedeni var.

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
3. Açıkça dahil etmek kod kod yapısında daha iyi genel bakışı sağlar: Nerede, ne kullanılır. Kod desteğini ve yeniden düzenlemeyi kolaylaştırır.

## Import "as"

Farklı isimler altında içeriye aktarmak için `as` da kullanabiliriz.

Örneğin, Hadi kısa olması için `sayHi` değişkenini `hi` yerel değişken içine alalım. Aynı şekilde `sayBye` içinde:

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

Şimdi `hi` ve `bye` dışarıdakiler için resmi isimler:

```js
// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```

## export default

Şimdiye kadar, Birden çok şeyi içeriye/dışarıya aktaracağımızı gördük, isteğe bağlı olarak "as" diğer isimler.

Pratikte, modüller şunlardan birini içerir:
- Bir kütüphane, fonksiyonlar paketi, `lib.js` gibi.
- Veya bir varlık,`user.js` de `class User` tanımlanmıştır. Bütün modül bu sınıfa sahiptir.

Çoğunlukla ikinci yaklaşım tercih edilir. Böylece her "şey" kendi modulünde bulunur.

Doğal olarak bu çok fazla dosya gerektirir, her şeyin kendi modülünü istediği gibi, ama bu hiç sorun değil. Aslında, dosyalar iyi adlandırılmışsa ve klasörler halinde yapılandırılmışsa kod gezinme işlemi kolaylaşır.

Modüller, "modül başına bir şeyin" daha iyi görünmesini sağlamak için özel `export default` sözdizimi sağlar.

`export` ve `import` ifadesini takip etmesi gerekir:

1. Modulün "main export"'dan önce `export default` koyun
2. Süslü parantez olmadan `import` çağırın.

Örneğin, Burada `user.js` `class User` ı dışarıya aktarır:

```js
// 📁 user.js
export *!*default*/!* class User { // sadece "default" ekle
  constructor(name) {
    this.name = name;
  }
}
```

...ve `main.js`de içeriye aktarılır:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // {User} değir, sadece User

new User('John');
```

Süslü parantezler olmadan içeri aktarmalar daha güzel görünür. Modülleri kullanmaya başlarken görülen yaygın hatalardan biri süslü parantezleri tamamen unutmaktır. Bu nedenle, unutmayın. `import` adlandırılmış içeriye aktarma işlemleri için süslü parantezler gereklidir ama varsayılan için bunlara gerek yoktur.

| Adlandırılmış İçeriye Aktarılanlar | Varsayılan İçeriye Aktarılanlar |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Doğal olarak, dosya başına yalnızca bir "varsayılan" dışa aktarma olabilir.

Tek bir modülde hem varsayılan hem de adlandırılmış içeriye aktarma yapabiliriz ancak pratikte insanlar genellikle bunu karıştırmaz. Bir modül, dışa aktarma adını verir veya varsayılan olanıdır.

**Unutulmaması gereken bir başka şey de, dışa aktarma adının (doğal olarak) bir adı olması gerekirken, `export default` adsız olabilir**

Örneğin, Bunların hepsi mükemmel ve doğru `default export` kullanımları:

```js
export default class { // sınıf adı yok
  constructor() { ... }
}

export default function(user) { // fonksiyon adı yok
  alert(`Hello, ${user}!`);
}

// bir değişken yapmadan tek bir değer dışarıya aktar
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Bu iyi çünkü `export default` dosya başına yalnızca bir tanesidir. Bunun aksine, adlandırılmış içeriye aktarma için bir adın çıkarılması bir hata olur: 

```js
export class { // Hata! (non-default export needs a name)
  constructor() {}
}
```     

### "Default" Takma Adı

"defaul" anahtar sözcüğü, varsayılan  içeriye aktarma, bağımsız içeriye aktarma ve referans göstermemiz gerektiğinde diğer seneryolar için "takma ad" kullanılır

Örneğin, önceden bildirilmiş bir işlevimiz varsa , işte bunu `export default` nasıl yaparız (tanımdan ayrı olarak):

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export {sayHi as default}; // fonksiyondan önce "export default" eklediğimiz gibi
```

Ya da bir `user.js` modulünün bir ana "varsayılan" şeyi ve bir kaç tane adlandırılmış olanı dışarı aktarıldığını varsayalım.

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

Ya da `*` nesnesini almayı düşünürsek `default` özelliği tam olarak varsayılan içeriye aktarmadır:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default;
new User('John');
```


### Varsayılan içeriye aktarmayı kullanmalı mıyım?

One should be careful about using default exports, because they are more difficult to maintain.

Named exports are explicit. They exactly name what they import, so we have that information from them, that's a good thing.

Also, named exports enforce us to use exactly the right name to import:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

For default exports, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything..., and it'll be work
```

So, there's a little bit more freedom that can be abused, so that team members may use different names for the same thing.

Usually, to avoid that and keep the code consistent, there's a rule that imported variables should correspond to file names, e.g:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Another solution would be to use named exports everywhere. Even if only a single thing is exported, it's still exported under a name, without `default`.

That also makes re-export (see below) a little bit easier.

## Re-export

"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

```js
export {sayHi} from './say.js';
export {default as User} from './user.js';
```

What's the point, why that's needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, mostly needed internally, with some of the functionality exported outside (tools like NPM allow to publish and distribute packages, but here it doesn't matter).

A directory structure could be like this:
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

We'd like to expose the package functionality via a single entry point, the "main file" `auth/index.js`, to be used like this:

```js
import {login, logout} from 'auth/index.js'
```

The idea is that outsiders, developers who use our package, should not meddle with its internal structure. They should not search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

Now, as the actual exported functionality is scattered among the package, we can gather and "re-export" it in `auth/index.js`:

```js
// 📁 auth/index.js
import {login, logout} from './helpers.js';
export {login, logout};

import User from './user.js';
export {User};

import Github from './providers/github.js';
export {Github};
...
```

"Re-exporting" is just a shorter notation for that:

```js
// 📁 auth/index.js
export {login, logout} from './helpers.js';
// or, to re-export all helpers, we could use:
// export * from './helpers.js';

export {default as User} from './user.js';

export {default as Github} from './providers/github.js';
...
```

````warn header="Re-exporting default is tricky"
Please note: `export User from './user.js'` won't work. It's actually a syntax error. To re-export the default export, we must mention it explicitly `{default as ...}`, like in the example above.

Also, there's another oddity: `export * from './user.js'` re-exports only named exports, excluding the default one. Once again, we need to mention it explicitly.

For instance, to re-export everything, two statements will be necessary:
```js
export * from './module.js'; // to re-export named exports
export {default} from './module.js'; // to re-export default
```

The default should be mentioned explicitly only when re-exporting: `import * as obj` works fine. It imports the default export as `obj.default`. So there's a slight asymmetry between import and export constructs here.
````

## Summary

There are following types of `export`:

- Before declaration:
  - `export [default] class/function/variable ...`
- Standalone:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"` (doesn't re-export default).
  - `export {default [as y]} from "mod"` (re-export default).

Import:

- Named exports from module:
  - `import {x [as y], ...} from "mod"`
- Default export:  
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- Everything:
  - `import * as obj from "mod"`
- Import the module (it runs), but do not assign it to a variable:
  - `import "mod"`

We can put import/export statements at the top or at the bottom of a script, that doesn't matter.

So this is technically fine:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the script
```

In practice imports are usually at the start of the file, but that's only for better convenience.

**Please note that import/export statements don't work if inside `{...}`.**

A conditional import, like this, won't work:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import must be at top level
}
```

...But what if we really need to import something conditionally? Or at the right time? Like, load a module upon request, when it's really needed?

We'll see dynamic imports in the next chapter.
