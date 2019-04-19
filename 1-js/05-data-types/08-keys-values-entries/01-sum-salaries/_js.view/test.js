describe("toplamMaas", function () {
  it("maaşların toplamını dön", function () {
    let maaslar = {
      "Ahmet": 100,
      "Mehmet": 300,
      "Muzaffer": 700
    };

    assert.equal(toplamMaas(salaries), 1100);
  });

  it("Eğer boş obje ise 0 dön", function () {
    assert.strictEqual(sumSalaries({}), 0);
  });
});