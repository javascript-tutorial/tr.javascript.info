describe("benzersiz", function () {
  it("benzeri olan elemanları siler.", function () {
    let karakterler = ["Emine", "Muzaffer", "Fatma", "Kanako",
      "Kanako", "Muzaffer", "Fatma", "Kanako", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Emine", ":-O"]);
  });

  it("Kaynak diziyi değiştirmez", function () {
    let strings = ["Emine", "Muzaffer", "Fatma", "Kanako"];
    unique(strings);
    assert.deepEqual(strings, ["Emine", "Muzaffer", "Fatma", "Kanako"]);
  });
});
