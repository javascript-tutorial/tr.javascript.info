describe("getMaxSubSum", function () {
  it(" [1, 2, 3]'ün maksimum ardışık toplamı 6 dır.", function () {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("[-1, 2, 3, -9]'ün maksimum ardışık toplamı 5'dir", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("[-1, 2, 3, -9, 11]'un maksimum ardışık toplamı 11", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("[-2, -1, 1, 2]'un maksimum toplamı 3'dür", function () {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("[100, -9, 2, -3, 5]'un maksimum ardışık toplamı 100'dür", function () {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("[]'un maksimum ardışık toplamı 0'dır.", function () {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("[-1]'un maksimum ardışık toplamı 0'dır.", function () {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("[-1, -2]'un maksimum ardışık toplamı 0'dır.", function () {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });
});