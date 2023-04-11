```js run demo
function sayiOku() {
  let sayi;

  do {
    sayi = prompt("Lütfen bir sayı giriniz?", 0);
  } while ( !isFinite(sayi) );

  if (sayi === null || sayi === '') return null;
  
  return +sayi;
}

alert(`Oku: ${sayiOku()}`);
```
Kod `null`/boş değer kontrolünden dolayı biraz garip görünebilir.

"sayı" gelene kadar değerler kontrol edilmelidir. `null` ve boş satır `true` döndürür. Çünkü numerik olarak bu değerler `0`'dır.
