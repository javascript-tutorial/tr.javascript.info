
describe("diziIcinde", function () {
  let arr = [1, 2, 3, 4, 5, 6, 7];

  it("dizi içindeki değerleri filtreleyerek döner", function () {

    let filter = diziIcinde(arr);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});


describe("arasinda", function () {

  it("arasinda filtresi döner", function () {
    let filter = arasinda(3, 6);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});
