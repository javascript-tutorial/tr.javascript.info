describe("ikiIleCarp", function () {
  it("Sayısal olan özelliklerin değerlerini iki ile çarpar.", function () {
    let menu = {
      en: 200,
      boy: 300,
      baslik: "Menü"
    };
    let sonuc = ikiIleCarp(menu);
    assert.equal(menu.en, 400);
    assert.equal(menu.boy, 600);
    assert.equal(menu.baslik, "Menü");
  });

  it("bir şey döndürmez", function () {
    assert.isUndefined(ikiIleCarp({}));
  });

});
