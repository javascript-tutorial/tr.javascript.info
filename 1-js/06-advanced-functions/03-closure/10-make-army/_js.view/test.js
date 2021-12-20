describe("ordu", function () {

  let ordu;

  before(function () {
    army = orduYap();
    window.alert = sinon.stub(window, "alert");
  });

  it("ordu[0]  0 gösterir", function () {
    army[0]();
    assert(alert.calledWith(0));
  });


  it("ordu[5]  5 gösterir", function () {
    army[5]();
    assert(alert.calledWith(5));
  });

  after(function () {
    window.alert.restore();
  });

});
