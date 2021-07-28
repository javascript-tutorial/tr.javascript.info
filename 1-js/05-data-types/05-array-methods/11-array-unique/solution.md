Dizinin elemanlarını dolaşacak olursak:
- Her eleman için sonuç dizisinde bu elemanın olup olmadığınına bakılacak.
- Eğer var ise, görmezden gelinecek, diğer türlü sonuç dizisine eklenecek.

```js run
function benzersiz(arr) {
  let sonuc = [];

  for (let str of arr) {
    if (!sonuc.includes(str)) {
      sonuc.push(str);
    }
  }

  return sonuc;
}

let kullanicilar = ["Emine", "Muzaffer", "Fatma", "Kanako",
  "Kanako", "Muzaffer", "Fatma", "Kanako", ":-O"
];

alert( benzersiz(kullanicilar) ); // Emine, Muzaffer, Fatma, Kanako, :-O
```
Kod çalışacaktır, fakat performans problemi yaratabilir.

`sonuc.includes(str)` `sonuc` dizisini tamamen dolanır ve `str` ile karşılaştırır.

Diyelimki `sonuc` dizisinde `100` tane eleman var ve `str` ile eşleşen yok. `sonuc` dizisi dolanılacak ve kesinlikle `100` defa karşılaştırma yapılacaktır. Eğer `sonuc` dizisi `10000` gibi elemana sahip ise bu karşılaştırma `10000` olacaktır.

Aslında problem bu değildir. JavaScript motoru `10000` karşılaştırmayı mikrosaniyeler içerisinde yapabilir.

Asıl sorun bu testlerin `arr`'in her bir elemanı için yapılmasıdır.

Yani `arr.length` `10000` olduğundan dolayı biz `10000*10000` = 100 milyon karşılaştırma olmaktadır.

Bundan dolayı bu çözüm az elemana sahip diziler için kullanılabilir.

<<<<<<< HEAD
Bu optimizasyonu <info:map-set-weakmap-weakset> bölümünde göreceksiniz. 
=======
So the solution is only good for small arrays.

Further in the chapter <info:map-set> we'll see how to optimize it.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
