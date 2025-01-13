
describe('merdiven', function () {
  before(function () {
    window.alert = sinon.stub(window, "alert");
  });

  beforeEach(function () {
    merdiven.adim = 0;
  });

  it('yukari() bunu dondermeli', function () {
    assert.equal(merdiven.yukari(), merdiven);
  });

  it('asagi() bunu dondurmeli', function () {
    assert.equal(merdiven.asagi(), merdiven);
  });

  it('adimiGoster() alert ile uyarı vermeli.', function () {
    merdiven.adimiGoster();
    assert(alert.called);
  });

  it('yukari() adimi artırmalı', function () {
    assert.equal(merdiven.yukari().yukari().adim, 2);
  });

  it('asagi() adimi azaltmalı', function () {
    assert.equal(merdiven.asagi().adim, -1);
  });

  it('asagi().yukari().yukari().yukari() ', function () {
    assert.equal(merdiven.asagi().yukari().yukari().yukari().adim, 2);
  });

<<<<<<< HEAD
  after(function () {
    merdiven.adim = 0;
    alert.kaydet();
=======
  it('showStep() should return this', function() {
    assert.equal(ladder.showStep(), ladder);
  });
 
  it('up().up().down().showStep().down().showStep()', function () {
    assert.equal(ladder.up().up().down().showStep().down().showStep().step, 0)
  });
  
  after(function() {
    ladder.step = 0;
    alert.restore();
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  });
});
