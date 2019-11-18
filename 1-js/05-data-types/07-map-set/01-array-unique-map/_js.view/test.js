describe("essiz", function () {
  it("tekrar eden elemanları sil", function () {
    let kullanicilar = ["Emine", "Muzaffer", "Fatma", "Kanako",
      "Kanako", "Muzaffer", "Fatma", "Kanako", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Emine", ":-O"]);
  });

  it("kaynak diziyi değiştirme", function () {
    let strings = ["Emine", "Muzaffer", "Fatma"];
    unique(strings);
    assert.deepEqual(strings, ["Emine", "Muzaffer", "Fatma"]);
  });
});
