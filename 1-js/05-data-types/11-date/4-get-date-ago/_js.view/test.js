describe("kacGunOnce", function () {

  it("02.01.2015'den 1 gün önce -> gün 1", function () {
    assert.equal(kacGunOnce(new Date(2015, 0, 2), 1), 1);
  });


  it("02.01.2015'den 2 gün önce -> gün 31", function () {
    assert.equal(kacGunOnce(new Date(2015, 0, 2), 2), 31);
  });

  it("02.01.2015'den 100 gün önce -> gün 24", function () {
    assert.equal(kacGunOnce(new Date(2015, 0, 2), 100), 24);
  });

  it("02.01.2015'den 365 gün önce-> gün 2", function () {
    assert.equal(kacGunOnce(new Date(2015, 0, 2), 365), 2);
  });

  it("Verilen tarihi değiştirmemeli", function () {
    let tarih = new Date(2015, 0, 2);
    let tarihKopyasi = new Date(tarih);
    kacGunOnce(tarihKopyasi, 100);
    assert.equal(tarih.getTime(), tarihKopyasi.getTime());
  });

});
