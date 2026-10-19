
describe("hesapMakinesi", function () {
  let hesapMakinesi;
  before(function () {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    hesapMakinesi = new HesapMakinesi();
    hesapMakinesi.oku();
  });
  
  it("the read method asks for two values using prompt and remembers them in object properties", function() {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("2 ile 3 toplanınca sonuç 5 çıkar.", function () {
    assert.equal(hesapMakinesi.topla(), 5);
  });

  it("2 ile 3 çarpılınca sonuç 6 çıkar", function () {
    assert.equal(hesapMakinesi.carp(), 6);
  });

  after(function () {
    prompt.restore();
  });
});
