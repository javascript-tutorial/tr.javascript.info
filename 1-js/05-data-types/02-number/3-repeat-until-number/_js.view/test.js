beforeEach(function () {
  sinon.stub(window, "prompt");
});

afterEach(function () {
  prompt.restore();
});

describe("sayiOku", function () {

  it("eğer sayı ise döndür", function () {
    prompt.returns("123");
    assert.strictEqual(readNumber(), 123);
  });

  it("Eğer 0 ise döndür", function () {
    prompt.returns("0");
    assert.strictEqual(readNumber(), 0);
  });

  it("Sayı olana kadar soru sormaya devam eder", function () {
    prompt.onCall(0).returns("Sayı değil");
    prompt.onCall(1).returns("yine sayı değil");
    prompt.onCall(2).returns("1");
    assert.strictEqual(readNumber(), 1);
  });

  it("eğer boş değer girilirse null dönder", function () {
    prompt.returns("");
    assert.isNull(readNumber());
  });

  it("iptal tuşuna basılırsa null dönder", function () {
    prompt.returns(null);
    assert.isNull(readNumber());
  });

});