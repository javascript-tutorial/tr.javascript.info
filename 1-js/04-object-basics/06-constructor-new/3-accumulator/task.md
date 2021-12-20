importance: 5

---

# new Toplayici fonksiyonunu yazınız

Toplayici(baslangicDegeri) yapıcı fonksiyonunu yazınız.

Yaratacağı obje:
- `deger` icerisinde o anki değeri tutmalı, başlangıç değeri `baslangicDegeri` argümanı ile sağlanacaktır.
- `oku()` metodu kullanıcıdan `prompt` ile bilgi almalı ve bunu `deger`'e eklemelidir.


Diğer bir deyişle `deger` özelliği tüm kullanıcıların girdiği değerlerin `baslangicDegeri` ile toplamıdır.

Aşağıda bir demosunu görmektesiniz:

```js
<<<<<<< HEAD
let toplayici = new Toplayici(1); // toplayıcıya  1 ile başla.
toplayici.oku(); // kullanıcının girdiği değeri toplar.
toplayici.oku(); // kullanıcının girdiği değeri toplar.
alert(toplayici.deger); // toplamı gösterir.
=======
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831
```

[demo]

