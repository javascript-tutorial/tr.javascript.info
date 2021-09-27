Cevap: önce `1`, sonra `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```
`alert` çağrısı bir değer döndürmez. Diğer bir deyişle `undefined` döndürür.

1. Öncelikle birinci operand doğru olduğundan ekrana `1` uyarısı çıkar.
2. Bu uyarı ekranından `undefined` döner bundan dolayı ikinci operand çalışır çünkü daha `doğru`'yu bulamadı.
3. İkinci operand `2` `doğru`'dur. Bundan dolayı değer sona erer. Tabi `2` döndüğünde bu defa dışarıda bulunan `alert` fonksiyonu çalışır ve ekranda `2` uyarısı görünür.

<<<<<<< HEAD
`3` değeri ekrana çıkmayacaktır çünkü değerlendirme sonuncu operand'a `alert(3)` gelmeden bitmiştir.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.

There will be no `3`, because the evaluation does not reach `alert(3)`.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115
