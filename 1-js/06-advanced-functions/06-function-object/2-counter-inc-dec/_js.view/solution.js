function sayacUret() {
  let sayac = 0;

  function sayac() {
    return sayac++;
  }

  sayac.set = deger => sayac = deger;

  sayac.azalt = () => sayac--;

  return sayac;
}
