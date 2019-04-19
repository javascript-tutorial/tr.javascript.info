function HesapMakinesi() {

  let metodlar = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.hesapla = function (str) {

    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2]

    if (!metodlar[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return metodlar[op](a, b);
  }

  this.metodEkle = function (isim, fonksiyon) {
    metodlar[isim] = fonksiyon;
  };
}
