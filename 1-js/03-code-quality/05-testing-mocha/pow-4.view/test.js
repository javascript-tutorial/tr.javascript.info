describe("us", function () {

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


  // ... buraya daha fazla `describe` ve `it` gelebilir.
});