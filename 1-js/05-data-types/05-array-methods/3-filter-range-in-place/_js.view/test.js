describe("filterRangeInPlace", function () {

  it("filtrelenmiş değerleri dönünüz", function () {

    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

    assert.deepEqual(arr, [5, 3]);
  });

  it("hiçbir şey döndürmez", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});
