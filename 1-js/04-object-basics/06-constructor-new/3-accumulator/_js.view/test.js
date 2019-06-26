describe("Toplayici", function () {

  beforeEach(function () {
    sinon.stub(window, "prompt")
  });

  afterEach(function () {
    prompt.restore();
  });

  it("Yapıcı fonksiyona argüman olarak başlangıç değeri eklenir", function () {
    let toplayici = new Toplayici(1);

    assert.equal(toplayici.deger, 1);
  });

  it("Eğer 0 girilirse değer bir olmalıdır.", function () {
    let toplayici = new Toplayici(1);
    prompt.returns("0");
    toplayici.oku();
    assert.equal(toplayici.deger, 1);
  });

  it("Eğer bir girilirse sonuç 2 olmalıdır.", function () {
    let toplayici = new Toplayici(1);
    prompt.returns("1");
    toplayici.oku();
    assert.equal(toplayici.deger, 2);
  });
});
