describe("sayac", function() {

  it("her çağrıda bir artar", function() {

    let sayac = sayacUret();

    assert.equal( sayac(), 0 ); 
    assert.equal( sayac(), 1 ); 
    assert.equal( sayac(), 2 ); 
  });

  
  describe("sayac.set", function() {
    it("sayacın değerini ayarlamaya yarar", function() {

      let sayac = sayacUret();

      sayac.set(10);

      assert.equal( sayac(), 10 ); 
      assert.equal( sayac(), 11 ); 
    });
  });
  
  describe("sayac.azalt", function() {
    it("Sayacın değerini azaltır", function() {

      let sayac = sayacUret();

      sayac.set(10);

      assert.equal( sayac(), 10 ); 

      sayac.azalt();

      assert.equal( sayac(), 10 ); 

    });
  });

});
