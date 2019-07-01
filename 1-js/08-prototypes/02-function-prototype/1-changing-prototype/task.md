importance: 5

---

# "prototype"'i değiştirme

Aşağıdaki kodda `new Rabbit`ile yeni bir `Rabbit` oluşturulmuş sonra prototype'ı değiştirilmeye çalışılmıştır.

Başlangıçta aşağıdaki koda sahibiz:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```

1. Bir tane daha karakter dizisi ekledik, `alert` ne gösterir?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```
2. ...Eğer kod aşağıdaki gibi değiştirilirse ne olur ( bir satır değiştirildi )?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

3. Ya böyle ? ( bir satır değiştirildi )

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
4. Son şekli:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
