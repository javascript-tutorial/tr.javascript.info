describe("filterRangeInPlace", function () {

  it("filtrelenmiş değerleri dönünüz", function () {

    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    assert.deepEqual(arr, [5, 3]);
  });

  it("hiçbir şey döndürmez", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});
