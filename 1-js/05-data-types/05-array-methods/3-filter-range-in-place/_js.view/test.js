describe("filterRangeInPlace", function () {

  it("filtrelenmiş değerleri dönünüz", function () {

    let arr = [5, 3, 8, 1];

<<<<<<< HEAD
    filterRangeInPlace(arr, 1, 4);
=======
    filterRangeInPlace(arr, 2, 5); 
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    assert.deepEqual(arr, [5, 3]);
  });

  it("hiçbir şey döndürmez", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});
