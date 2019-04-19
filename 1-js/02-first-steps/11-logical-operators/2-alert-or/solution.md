Cevap: önce `1`, sonra `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```
`alert` çağrısı bir değer döndürmez. Diğer bir deyişle `undefined` döndürür.

1. Öncelikle birinci operand doğru olduğundan ekrana `1` uyarısı çıkar.
2. Bu uyarı ekranından `undefined` döner bundan dolayı ikinci operand çalışır çünkü daha `doğru`'yu bulamadı.
3. İkinci operand `2` `doğru`'dur. Bundan dolayı değer sona erer. Tabi `2` döndüğünde bu defa dışarıda bulunan `alert` fonksiyonu çalışır ve ekranda `2` uyarısı görünür.

`3` değeri ekrana çıkmayacaktır çünkü değerlendirme sonuncu operand'a `alert(3)` gelmeden bitmiştir.
