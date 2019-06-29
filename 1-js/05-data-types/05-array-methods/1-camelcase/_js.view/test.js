describe("camelize", function () {

  it("Boş satırı olduğu gibi bırakır", function () {
    assert.equal(camelize(""), "");
  });

  it("background-color'u backgroundColor haline getirir.", function () {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("list-style-image'u listStyleImage haline getirir.", function () {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("-webkit-transition'u WebkitTransition haline getirir", function () {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });

});