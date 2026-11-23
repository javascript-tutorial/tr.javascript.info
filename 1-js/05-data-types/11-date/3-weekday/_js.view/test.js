describe("yerelGunAl avrupa takvimine göre haftanın gününü alır", function () {
  it("3 Ocak 2014 - cuma", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 3)), 5);
  });

  it("4 Ocak 2014 - cumartesi", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 4)), 6);
  });

  it("5 Ocak 2014 - pazar", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 5)), 7);
  });

  it("6 Ocak 2014 - pazartesi", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 6)), 1);
  });

  it("7 Ocak 2014 - salı", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 7)), 2);
  });

  it("8 Ocak 2014 - çarşamba", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 8)), 3);
  });

  it("9 Ocak 2014 - perşembe", function () {
    assert.equal(yerelGunAl(new Date(2014, 0, 9)), 4);
  });
});
