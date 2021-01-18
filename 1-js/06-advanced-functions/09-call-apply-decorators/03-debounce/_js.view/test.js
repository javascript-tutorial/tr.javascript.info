<<<<<<< HEAD
describe("debounce", function () {
=======
describe('debounce', function () {
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

<<<<<<< HEAD
  it("belirlenen süre zarfında istenen fonksiyonu sadece bir defa çağırır.", function () {
    let log = '';
=======
  it('for one call - runs it after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

    debounced('test');
    assert(f.notCalled, 'not called immediately');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'called after 1000ms');
  });

<<<<<<< HEAD
    let f = debounce(alert, 1000);

    f(1); // Anında çalışacak
    f(2); // görmezden gelinecek

    setTimeout(() => f(3), 100); // görmezden gelinecek ( 100 ms'de çalıştığından )
    setTimeout(() => f(4), 1100); // çalışır
    setTimeout(() => f(5), 1500); // görmezden gelinecek çünkü son çağrıdan itibaren 1000ms'den az bir zaman geçmiştir.
=======
  it('for 3 calls - runs the last one after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // ignored (too early)
    setTimeout(() => debounced('c'), 500); // runs (1000 ms passed)
    this.clock.tick(1000);

    assert(f.notCalled, 'not called after 1000ms');
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'called after 1500ms');
  });

<<<<<<< HEAD
  it("Çağrının kaynağını tutar.", function () {
=======
  it('keeps the context of the call', function () {
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
  
});
