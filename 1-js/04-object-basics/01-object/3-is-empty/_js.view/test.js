describe("bosMu", function () {
  it("Boş obje için true döndürür.", function () {
    assert.isTrue(isEmpty({}));
  });

  it("Eğer objenin içinde bir özellik far ise false döndürür.", function () {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});