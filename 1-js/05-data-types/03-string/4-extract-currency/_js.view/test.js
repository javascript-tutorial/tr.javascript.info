describe("extractCurrencyValue", function () {

  it("Eğer gelen değer $120 ise 120 döndürmesi gerekmekte", function () {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});