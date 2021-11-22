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

Çoğunlukla ikinci yaklaşım tercih edilir. Böylece her " şey" kendi modulünde bulunur.

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

Varsayılan dışa aktarım kullanımlarında dikkat edilmelidir. Çünkü bakımı daha zordur.

Adlandırılmış açıktır. Aldıkları şeyi tam olarak açıklıyorlar. Bu yüzden onlardan bu bilgilere sahibiz. Bu iyi bir şey.

Ayrıca, adlandırılmış dışa aktarma işlemleri bizi içe aktarmak için doğru adı kullanmaya zorlar.:

```js
import {User} from './user.js';
// import {MyUser} çalışmayacak, adı {User} olmalı
```

Varsayılan içeriye aktarma için içeriye aktarırken her zaman adı seçeriz:

```js
import User from './user.js'; // çalışır
import MyUser from './user.js'; // çalışır
// Bir şey içeriye aktarılabilir..., ve çalışacaktır
```
Yani, kötüye kullanılabilecek biraz daha fazla özgürlük var. Böylece ekip üyeleri aynı şey için farklı isimler kullanabilirler.

Genelde, bundan kaçınmak ve kodu tutarlı tutmak için içe aktarılan değişkenlerin dosya adlarına karşılık gelmesi gerektiği bir kural vardır: 

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Başka bir çözüm, her yerde adlandırılmış içeriye aktarım kullanmak olacaktır. Sadece tek bir şey içeriye aktarılsa bile yine de `default` olmadan bir isim altında içeriye aktarılır.

Bu da re-export (aşağıda göreceksin) biraz daha kolay hale gelir.

## Yeniden dışa aktarma

"Yeniden dışa aktarma" söz dizimi `export ... from ...`  şeyleri içeriye aktarmasına ve hemen (başka bir isim altında) içeriye aktarmasına izin verir: 

```js
export {sayHi} from './say.js';
export {default as User} from './user.js';
```

Amaç ne? Neden bu gerekli? Pratik bir kullanım örneği görelim.

Bir "paket" yazdığımızı düşünelim: dışarıda dışa aktarılan fonksiyonelliklerin bir kısmı ile çoğunlukla dahili olarak ihtiyaç duyulan birçok modüle sahip bir klasör (NPM gibi araçlar paketleri yayınlamaya ve dağıtmaya izin verir, ancak burada önemi yoktur).

Bir klasör yapısı şöyle olabilir: 
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

Paket işlevselliğini tek bir giriş noktası üzerinden göstermek istiyoruz, "ana dosya" `auth/index.js` böyle kullanılmalı,

```js
import {login, logout} from 'auth/index.js'
```

Buradaki fikir, paketimizi kullanan geliştiricilerin iç yapısıyla karışmaması gerektiğidir. Paket klasörümüzdeki dosyaları aramamalılar. Sadece `auth/index.js`de gerekli olanları dışarıya aktarıyoruz ve gerisini meraklı gözlerden gizleriz.

Şimdi, dışa aktarılan gerçek işlevsellik paketin arasına dağıl olduğundan, paket içinde "Yeniden dışa aktarma" ve toplayabiliriz.
`auth/index.js`:

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

"Yeniden dışa aktarma" bunun için sadece kısa bir gösterimidir:

```js
// 📁 auth/index.js
export {login, logout} from './helpers.js';
// ya da tüm yardımcıları yeniden dışa aktarma için kullanabiliriz.
// export * from './helpers.js';

export {default as User} from './user.js';

export {default as Github} from './providers/github.js';
...
```

````warn header="Yeniden dışa aktarma default is tricky"
Lütfen unutmayın: `export User from './user.js'` çalışmayacak. Bu aslında sözdizimi hatası. Varsayılan içeriye aktarmayı yeniden dışa aktarm için açıkça belirtmeliyiz `{default as ...}`. Yukarıdaki örnekte olduğu gibi.

Ayrıca, başka bir tuhaflık var: `export * from './user.js'` varsayılan olan haric, yalnızca adlandırılmış dışa aktarımlar yeniden dışa aktarılır. Bir kez daha açıkça söylemeliyiz.

Örneğin, her şeyi yeniden dışa aktarmak için iki ifade gerekli olacaktır:
```js
export * from './module.js'; // adlandırılmış dışarıya aktarımı yeniden dışarıya aktarmak için
export {default} from './module.js'; // varsayılanı yeniden dışarıya aktarmak için 
```

Varsayılan değer açıkça yalnızca yeniden dışa aktarırken belirtilmelidir `import * as obj` iyi çalışır. Varsayılan dışa aktarımı `obj.default` olarak alır. Yani burada içe aktarım ve dışa aktarım yapıları arasında hafif bir asimetri var.
````

## Özetle

Aşağıda `export` türleri vardır:

- Bildirmeden önce:
  - `export [default] class/function/variable ...`
- Bağımsız:
  - `export {x [as y], ...}`.
- Yeniden dışa aktarma:
  - `export {x [as y], ...} from "mod"`
  - `export * from "mod"` (varsayılan yeniden dışa aktarmaz).
  - `export {default [as y]} from "mod"` (varsayılanı yeniden dışa aktar).

İçeriye Aktarma:

- Modülden adlandırılmış içeri aktarma:
  - `import {x [as y], ...} from "mod"`
- Varsayılan içeri aktarma:  
  - `import x from "mod"`
  - `import {default as x} from "mod"`
- Her şey:
  - `import * as obj from "mod"`
- Modulü içeriye aktarın (çalışır) ama değişkene atamayın:
  - `import "mod"`

Import/export ifadelerini bir komus dosyasının en üstüne veya en altına koyabiliriz. Fark etmez.

Yani teknik olarak bu iyi:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // script'in sonunda içe aktar
```

Uygulamada, daha iyi rahatlık için içeriye aktarma genellikle dosyanın başındadır.
**Please note that import/export statements don't work if inside `{...}`.**
**Unutmayın ki, import/export ifadeleri `{...}` içindeyse çalışmaz**

Bunun gibi koşullu bir içe aktarma çalışmaz: 
```js
if (something) {
  import {sayHi} from "./say.js"; // Hata: içe aktarma en üst düzeyde olmalı
}
```

...Ama ya gerçekten şartlı olarak bir şeyler ithal etmemiz gerekirse? Ya da doğru zamanda? Gibi. Gerçekten ihtiyaç duyulduğunda istek üzerine bir modül yükleyin?

Bir sonraki bölümde dinamik içeriye aktarma göreceğiz.
