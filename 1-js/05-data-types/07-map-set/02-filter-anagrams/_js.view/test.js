function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

describe("atemiz", function () {

  it("Her anagram setinden sadece 1 tane kelime döndürür", function () {
    let arr = ["aks", "alim", "açlık", "ask", "ilam", "çalık"];

    let result = atemiz(arr);
    assert.equal(result.length, 3);

    assert.equal(intersection(result, ["aks", "ask"]).length, 1);
    assert.equal(intersection(result, ["alim", "ilam", "hectares"]).length, 1);
    assert.equal(intersection(result, ["açlık", "çalık"]).length, 1);

  });

  it("büyük küçük harf duyarlılığı var mı?", function () {
    let arr = ["era", "EAR"];
    assert.equal(atemiz(arr).length, 1);
  });

});