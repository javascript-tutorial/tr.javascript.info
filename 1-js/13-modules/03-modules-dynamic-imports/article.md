
# Dinamik İçeriye Aktarma

Önceki bölümlerde ele aldığımız ifadelere içeri aktarım ve dışa aktarım ifadelerine "statik" denir.

Çünkü onlar gerçekten statik. Sözdizimi çok katıdır.

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
```

Veya bir zaman async işlevi içindeyse `let module = await import(modulePath)` kullanabiliriz

Bunun gibi:

[codetabs src="say" current="index.html"]

Bu nedenle dinamik içe aktarım kullanımı çok basittir.

Ayrıca dinamik içeri aktarımlar düzenli komut dosyalarında çalışır, `script type="module"` gerektirmezler.
