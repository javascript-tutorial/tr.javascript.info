describe("filterRangeInPlace", function () {

  it("filtrelenmiş değerleri dönünüz", function () {

    let arr = [5, 3, 8, 1];

    filterRangeInPlace(arr, 1, 4);

    assert.deepEqual(arr, [3, 1]);
  });

  it("hiçbir şey döndürmez", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});