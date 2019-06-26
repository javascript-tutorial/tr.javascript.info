
Notunuz aşağıdaki gibi olabilir:

```js no-beautify
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

if (n < 0) {
  alert(`${n} üssü alınamadı, kullandığınız sayı 0'dan küçük olamaz.
     Lütfen doğal sayıları kullanınız.`);
} else {
  alert( ust(x, n) );
}
```
