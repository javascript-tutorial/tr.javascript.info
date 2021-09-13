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

<<<<<<< HEAD
1. Bir tane daha karakter dizisi ekledik, `alert` ne gösterir?
=======

1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

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

<<<<<<< HEAD
3. Ya böyle ? ( bir satır değiştirildi )
=======
3. And like this (replaced one line)?
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

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
