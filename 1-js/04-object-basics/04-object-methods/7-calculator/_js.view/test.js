

describe("hesapMakinesi", function () {

  context("2 ve 3 değeri girildiğinde", function () {
    beforeEach(function () {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      hesapMakinesi.oku();
    });

    afterEach(function () {
      prompt.restore();
    });
    
    it('the read get two values and saves them as object properties', function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("toplam 5", function () {
      assert.equal(hesapMakinesi.topla(), 5);
    });

    it("çarpım 6", function () {
      assert.equal(hesapMakinesi.carp(), 6);
    });
  });

});
