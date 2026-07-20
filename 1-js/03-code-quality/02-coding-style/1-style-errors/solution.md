
Notunuz aşağıdaki gibi olabilir:

```js no-beautify
<<<<<<< HEAD
function ust(x,n)  // <- argümanlar arasında boşluk bulunmamakta.
{  // <-süslü parantez yeni satırda
  let sonuc=1;   // <-  = in iki yanında da boşluk bulunmamakta
  for(let i=0;i<n;i++) {sonuc*=x;}   // <- boşluk yok
  // süslü parantezin içi yeni bir satırda olmalı
  return sonuc;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- teknik olarka mümkün,
// fakat iki satır yapmak daha iyi, ayrıca boşluk ve ; kullanılmamış.
if (n<0)  // <- (n < 0) olmalı, arada boşluk kullanılmamış
{   // <- süslü parantez yeni satırda
  // Aşağıdaki uzun metin iki satırda yazılsa daha iyi olabilir
  alert(`${n} üssü alınamadı, kullandığınız sayı 0'dan küçük olamaz. Lütfen doğal sayıları kullanınız.`);
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
}
else // <- tek satırda  "} else {" şeklinde kullanılabilir.
{
  alert(ust(x,n))  //  ; ve boşluk kullanılmamıştır.
}
```

düzeltilmiş şekli:

```js
function ust(x, n) {
  let sonuc = 1;

  for (let i = 0; i < n; i++) {
    sonuc *= x;
  }

  return sonuc;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

<<<<<<< HEAD
if (n < 0) {
  alert(`${n} üssü alınamadı, kullandığınız sayı 0'dan küçük olamaz.
     Lütfen doğal sayıları kullanınız.`);
=======
if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
} else {
  alert( ust(x, n) );
}
```
