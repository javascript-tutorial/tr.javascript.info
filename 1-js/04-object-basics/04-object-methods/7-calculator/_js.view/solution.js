let hesapMakinesi = {
  toplam() {
    return this.a + this.b;
  },

  carpim() {
    return this.a * this.b;
  },

  oku() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};