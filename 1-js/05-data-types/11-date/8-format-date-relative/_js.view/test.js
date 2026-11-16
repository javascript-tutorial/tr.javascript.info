describe("formatTarih", function () {
  it("1 sn önceyi  \"şimdi\" olarak gösterir", function () {
    assert.equal(formatTarih(new Date(new Date - 1)), 'şimdi');
  });

  it('"30 saniye önce"', function () {
    assert.equal(formatTarih(new Date(new Date - 30 * 1000)), "30 saniye önce");
  });

  it('"5 dakika önce"', function () {
    assert.equal(formatTarih(new Date(new Date - 5 * 60 * 1000)), "5 dakika önce");
  });

  it("daka önceki tarihler DD.MM.YY HH:mm şeklinde", function () {
    assert.equal(formatTarih(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
