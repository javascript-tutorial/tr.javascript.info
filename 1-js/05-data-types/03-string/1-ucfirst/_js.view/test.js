describe("ucFirst", function () {
  it('İlk karakterin büyük harf yapılması', function () {
    assert.strictEqual(ucFirst("ahmet"), "Ahmet");
  });

  it("Boş karakter dizisinde hata dönmemesi", function () {
    assert.strictEqual(ucFirst(""), "");
  });
});