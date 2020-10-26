describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("ilk çağrı şimdi çalışıyor", function() {
    f1000(1); // runs now
    assert.equal(log, "1");
  });

  it("Son çağrıdan sonra 1000ms içerisindeki çağrılar görmezden gelinir.", function() {
    f1000(2); // (son çağrıdan sonra 1000ms içerisinde olduğundan kısma gerçekleşir)
    f1000(3); // (son çağrıdan sonra 1000ms içerisinde olduğundan kısma gerçekleşir)
    // 1000 ms sonrasında f(3) planlanır.

    assert.equal(log, "1"); // şu anda sadece ilk çağrı gerçekleşti.

    this.clock.tick(1000); // 1000ms sonrasında
    assert.equal(log, "13"); // log==13, f1000(3) çağrısı gerçekleşmekte.
  });

  it("3. çağrı ikinci çağrı sonrasında 1000ms beklemeli", function() {
    this.clock.tick(100);
    f1000(4); // (son çağrıdan sonra 1000ms içerisinde olduğundan kısma gerçekleşir)
    this.clock.tick(100);
    f1000(5); // (son çağrıdan sonra 1000ms içerisinde olduğundan kısma gerçekleşir)
    this.clock.tick(700);
    f1000(6); // (son çağrıdan sonra 1000ms içerisinde olduğundan kısma gerçekleşir)

    this.clock.tick(100); // şimdi 100 + 100 + 700 + 100 = 1000ms geçti

    assert.equal(log, "136"); // son çağrı f(6)
  });

  after(function() {
    this.clock.restore();
  });

});
<<<<<<< HEAD
=======

describe('throttle', () => {

  it('runs a forwarded call once', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'once');
      done();
    }, 20);
  });

});
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5
