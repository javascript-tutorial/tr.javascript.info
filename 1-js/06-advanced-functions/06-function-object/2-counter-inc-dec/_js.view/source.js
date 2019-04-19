function sayacUret() {
  let sayac = 0;

  // ... sizin kodunuz ...
}

let sayac = sayacUret();

alert( sayac() ); // 0
alert( sayac() ); // 1

sayac.set(10); // sayacın değerini ayarla

alert( sayac() ); // 10

sayac.azalt(); // sayacın değerini 1 azaltır.

alert( sayac() ); // 10 (11'in yerine 10 yazması lazım)
