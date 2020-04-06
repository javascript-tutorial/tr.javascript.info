
Açıklama:

1. Normal metod çağrısı yapılmaktadır.

<<<<<<< HEAD
2. Aynı şekilde çağrı yapılmaktadır. Tek fark parantez ve bu parantez sadece sıralama için kullanılmaktadır. Bir anlam ifade etmez.
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

3. Daha karmaşık bir çağrı, `(ifade).metod()`. Eğer bu metod iki satıra ayrılırsa çalışır:

    ```js no-beautify
    f = obj.selamVer; // ifadeyi hesapla
    f();        // çağır
    ```
    Burada `f()` fonksiyon olarak `this` ifadesi olmadan çalıştırılmıştır.

4.  Aynı şekilde `.` nın sol tarafında bir ifade bulunmaktadır.

`(3)` ve `(4)` ün davranışını açıklamak için dönen referans tipini tekrar çalıştırmak gereklidir.

Metod çağrısı haricinde her işlem( atama `=` veya `||`) bu fonksiyonu normal değere döndürür. Bundan dolayı da `this`'in tanımsız kalmasına yol açar.


