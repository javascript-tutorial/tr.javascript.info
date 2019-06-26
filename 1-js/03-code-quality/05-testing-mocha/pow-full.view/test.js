describe("pow", function () {

  describe("n'in x'inci kuvvetini bulur", function () {

    function testEt(x) {
      let beklenen = x * x * x;
      it(`${x} in 3. kuvveti ${bekenen} dir`, function () {
        assert.equal(us(x, 3), beklenen);
      });
    }

    for (let x = 1; x <= 5; x++) {
      testEt(x);
    }

  });

  it("Eğer n negatif ise NaN döndürmelidir", function () {
    assert.isNaN(us(2, -1));
  });

  it("Eğer n tam sayı değilse NaN döndürmelidir", function () {
    assert.isNaN(us(2, 1.5));
  });

});
