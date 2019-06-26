
let merdiven = {
  adim: 0,
  yukari: function () {
    this.adim++;
    return this;
  },
  asagi: function () {
    this.adim--;
    return this;
  },
  adimiGoster: function () {
    alert(this.adim);
  }
};

