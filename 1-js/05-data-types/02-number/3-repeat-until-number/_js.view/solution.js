
function sayiOku() {
  let sayi;

  do {
    sayi = prompt("Lütfen bir sayı giriniz?", 0);
  } while (!isFinite(sayi));

  if (sayi === null || sayi === '') return null;

  return +sayi;
}