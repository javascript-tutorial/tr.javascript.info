Bu test programcıların test yazarken onları cezbedecek yanlış yöntemleri göstermektedir.

Burada aslında 3 tane test var, fakat bunların hepsi bir fonksiyon içine tıkıştırılmış

Bazen böyle yazmak kolay olsa da bir hata olursa bu gizli saklı kalır ve nerede hata olduğu anlaşılamaz.

<<<<<<< HEAD
Eğer karmaşık bir akış içinde bir hata olursa ve bunun nedenini testler vasıtasıyla çözmeye çalışırsanız, testleri **ayıklamanız** gerekir.
=======
If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.
>>>>>>> 4541b7af7584014a676da731f6e8774da5e059f6

Bunun yerine testi birden çok `it` bloğuna ayırırsanız bu problemden kurtulursunuz.

Bunun gibi:
```js
describe("x'in n. kuvvetini alir", function() {
  it("5'in birinci kuvveti 5'tir", function() {
    assert.equal(us(5, 1), 5);
  });

  it("5'in ikinci kuvveti 25'tir", function() {
    assert.equal(us(5, 2), 25);
  });

  it("5'in üçüncü kuvveti 125'tir", function() {
    assert.equal(us(5, 3), 125);
  });
});
```

Soruda tek bir `it` vardı. Bu birçok `it` bloğu ile değiştirildi. Eğer şimdi bir yanlış olursa yanlışın neden kaynaklandığı daha açık bir biçimde görünür.

Ayrıca sadece tek bir `it` bloğu çalıştırmak istiyorsanız Mocha bunu `it.only` ile yapmanızı sağlar.:


```js
describe("Raises x to power n", function() {
  it("5'in birinci kuvveti 5'tir", function() {
    assert.equal(us(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5'in ikinci kuvveti 25'tir", function() {
    assert.equal(us(5, 2), 25);
  });
*/!*

  it("5'in üçüncü kuvveti 125'tir", function() {
    assert.equal(us(5, 3), 125);
  });
});
```
