describe("ayinSonGunu", function () {
  it("01.01.2012 ayının son günü - 31", function () {
    assert.equal(ayinSonGunu(2012, 0), 31);
  });

  it(" 01.02.2012 ayının son günü- 29 (artık yıl)", function () {
    assert.equal(ayinSonGunu(2012, 1), 29);
  });

  it(" 01.02.2013 ayının son günü - 28", function () {
    assert.equal(ayinSonGunu(2013, 1), 28);
  });
});
