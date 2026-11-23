describe("azamiMaas", function () {
  it("En yüksek maaş alan kişileri döndür", function () {
    let maaslar = {
      "Ahmet": 100,
      "Mehmet": 300,
      "Muzaffer": 250
    };
    assert.equal(azamiMaas(maaslar), "Mehmet");
  });

  it("Eğer obje boş ise null döndür", function () {
    assert.isNull(azamiMaas({}));
  });
});