describe("Hesap Makinesi", function () {
  let hesapMakinesi;

  before(function () {
    hesapMakinesi = new HesapMakinesi;
  });

  it("hesapMakinesi(12 + 34) = 46", function () {
    assert.equal(hesapMakinesi.hesapla("12 + 34"), 46);
  });

  it("hesapMakinesi(34 - 12) = 22", function () {
    assert.equal(hesapMakinesi.hesapla("34 - 12"), 22);
  });

  it("Çarpım ekle : hesapla(2 * 3) = 6", function () {
    hesapMakinesi.metodEkle("*", (a, b) => a * b);
    assert.equal(hesapMakinesi.hesapla("2 * 3"), 6);
  });

  it("Üs metodu ekle: hesapla(2 ** 3) = 8", function () {
    hesapMakinesi.metodEkle("**", (a, b) => a ** b);
    assert.equal(hesapMakinesi.metodEkle("2 ** 3"), 8);
  });
});
