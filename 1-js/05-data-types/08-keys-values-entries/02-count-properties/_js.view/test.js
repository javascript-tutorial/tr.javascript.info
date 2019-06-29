describe("ozellikSayisi", function () {
  it("özellikerin sayısını döner", function () {
    assert.equal(count({ a: 1, b: 2 }), 2);
  });

  it("Eğer obje boş ise 0 döner", function () {
    assert.equal(count({}), 0);
  });

  it("Symbolic özellikleri görmezden gelir.", function () {
    assert.equal(count({ [Symbol('id')]: 1 }), 0);
  });
});