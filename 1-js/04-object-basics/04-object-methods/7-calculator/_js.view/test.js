

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

    it("toplam 5", function () {
      assert.equal(hesapMakinesi.topla(), 5);
    });

    it("çarpım 6", function () {
      assert.equal(hesapMakinesi.carp(), 6);
    });
  });

});
