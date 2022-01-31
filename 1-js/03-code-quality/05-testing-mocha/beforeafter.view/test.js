<<<<<<< HEAD
describe("test", function () {

  before(() => alert("Testler başlayacak - tüm testlerden önce"));
  after(() => alert("Testler bitti – tüm testlerden sonra"));
=======
describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

  beforeEach(() => alert("Testten önce – teste giriyor"));
  afterEach(() => alert("Testten sonra – testten çıktı"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
