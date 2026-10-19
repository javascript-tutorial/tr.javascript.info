describe("haftaninGunleriniAl", function () {
  it("3 Ocak 2014 - Cuma", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'CM');
  });

  it("4 Ocak 2014 - Cumartesi", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'CT');
  });

  it("5 Ocak 2014 - Pazar", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'PZ');
  });

  it("6 Ocak 2014 - Pazartesi", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'PT');
  });

  it("7 Ocak 2014 - Salı", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'SA');
  });

  it("8 Ocak 2014 - Çarşamba", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'ÇA');
  });

  it("9 Ocak 2014 - Perşembe", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'PR');
  });
});
