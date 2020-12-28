
Açıklama:

1. Normal metod çağrısı yapılmaktadır.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Aynı şekilde çağrı yapılmaktadır. Tek fark parantez ve bu parantez sadece sıralama için kullanılmaktadır. Bir anlam ifade etmez.

3. Daha karmaşık bir çağrı, `(ifade).metod()`. Eğer bu metod iki satıra ayrılırsa çalışır:
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

    ```js no-beautify
    f = obj.selamVer; // ifadeyi hesapla
    f();        // çağır
    ```
    Burada `f()` fonksiyon olarak `this` ifadesi olmadan çalıştırılmıştır.

4.  Aynı şekilde `.` nın sol tarafında bir ifade bulunmaktadır.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
`(3)` ve `(4)` ün davranışını açıklamak için dönen referans tipini tekrar çalıştırmak gereklidir.
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

Metod çağrısı haricinde her işlem( atama `=` veya `||`) bu fonksiyonu normal değere döndürür. Bundan dolayı da `this`'in tanımsız kalmasına yol açar.


