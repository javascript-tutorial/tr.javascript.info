describe("filterRange", function () {

  it("filtrelenmiş değerleri döner.", function () {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(filtered, [3, 1]);
  });

  it("diziyi değiştirmez", function () {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(arr, [5, 3, 8, 1]);
  });

});