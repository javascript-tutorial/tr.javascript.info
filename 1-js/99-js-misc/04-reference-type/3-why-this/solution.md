
Açıklama:

1. Normal metod çağrısı yapılmaktadır.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. Aynı şekilde çağrı yapılmaktadır. Tek fark parantez ve bu parantez sadece sıralama için kullanılmaktadır. Bir anlam ifade etmez.
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

3. Daha karmaşık bir çağrı, `(ifade).metod()`. Eğer bu metod iki satıra ayrılırsa çalışır:

    ```js no-beautify
    f = obj.selamVer; // ifadeyi hesapla
    f();        // çağır
    ```
    Burada `f()` fonksiyon olarak `this` ifadesi olmadan çalıştırılmıştır.

4.  Aynı şekilde `.` nın sol tarafında bir ifade bulunmaktadır.

`(3)` ve `(4)` ün davranışını açıklamak için dönen referans tipini tekrar çalıştırmak gereklidir.

Metod çağrısı haricinde her işlem( atama `=` veya `||`) bu fonksiyonu normal değere döndürür. Bundan dolayı da `this`'in tanımsız kalmasına yol açar.


