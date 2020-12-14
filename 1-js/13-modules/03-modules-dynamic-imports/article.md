<<<<<<< HEAD

# Dinamik İçeriye Aktarma

Önceki bölümlerde ele aldığımız ifadelere içeri aktarım ve dışa aktarım ifadelerine "statik" denir.

Çünkü onlar gerçekten statik. Sözdizimi çok katıdır.
=======
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Birincisi, dinamik olarak `import` parametresini oluşturamıyoruz.

Modül yolu ilkel bir dize olmalı ve işlev çağrısı olamaz. Bu çalışmayacaktır:

```js
import ... from *!*getModuleName()*/!*; // Hata, sadece "string"den izin verilir.
```

İkincisi, koşullu veya çalışma zamanında içe aktaramıyoruz: 

```js
if(...) {
  import ...; // Hata, izin verilmiyor!
}

{
  import ...; // Hata, içe aktarma işlemini herhangi bir bloğa koyamıyoruz.
}
```

<<<<<<< HEAD
Çünkü import/export kod yapısı için omurga sağlamayı hedefleriyor. Bu iyi bir şey, Kod yapısı analiz edilebildiğinden modüller toplanabilir ve birlikte paketlenebilir, kullanılmayan dışa aktarımlar kaldırılabilir (tree-shaken). Bu mümkün çünkü her şey sabit.


Ancak bir modülü dinamik ve isteğe bağlı olarak nasıl içeriye aktarırız?

## import() Fonksiyonu

`import(module)` fonksiyonu her yerden çağrılabilir. Bir modül nesnesine çözümlenen bir söz verir.

Kullanım şekli şöyle görünür: 
```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <modül nesnesi>)
  .catch(err => <yükleme hatası, böyle bir modül yok?>)
=======
That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
```

Veya bir zaman async işlevi içindeyse `let module = await import(modulePath)` kullanabiliriz

<<<<<<< HEAD
Bunun gibi:

[codetabs src="say" current="index.html"]

Bu nedenle dinamik içe aktarım kullanımı çok basittir.

Ayrıca dinamik içeri aktarımlar düzenli komut dosyalarında çalışır, `script type="module"` gerektirmezler.
=======
For instance, if we have the following module `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...Then, in order to access it, we can use `default` property of the module object:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

Here's the full example:

[codetabs src="say" current="index.html"]

```smart
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. It's not a function.
```
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
