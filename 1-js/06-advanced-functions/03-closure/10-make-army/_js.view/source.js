function orduYap() {
  let nisancilar = [];

  let i = 0;
  while (i < 10) {
    let nisanci = function () { // Nişancılar fonksiyonu
      alert(i); // numara göstermeli
    };
    nisancilar.push(nisanci);
    i++;
  }

  return nisancilar;
}

/*
let ordu = orduYap();

ordu[0](); // nisanci 0 fakat 10 gösteriyor.
ordu[5](); // nisancı 5 fakat yine 10 gösteriyor.
// ... tüm nişancılar kendi numaraları yerine 10 gösteriyorlar.
*/