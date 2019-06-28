describe("Metin kesme", function () {
  it("Verilen metinin `...` düşünerek kesme işlemini yapar.", function () {
    assert.equal(
      truncate("Size bu konuda söylemek istediğim şey:", 20),
      "Size bu konuda sö..."
    );
  });

  it("Kısa metinleri kesmez", function () {
    assert.equal(
      truncate("Merhaba!", 20),
      "Merhaba!"
    );
  });

});