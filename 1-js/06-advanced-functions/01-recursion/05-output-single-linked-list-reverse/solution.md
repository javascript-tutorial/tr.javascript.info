# Özçağrı kullanarak

Özçağrı çözümü burada biraz çetrefilli.

Önce listenin ggeri kalanını yazdırmak *sonra* ise o anki değerini yazdırmak gerekmektedir.


```js run
let list = {
  deger: 1,
  sonraki: {
    deger: 2,
    sonraki: {
      deger: 3,
      sonraki: {
        deger: 4,
        sonraki: null
      }
    }
  }
};

function geriListeYazdır(list) {

  if (list.sonraki) {
    geriListeYazdır(list.sonraki);
  }

  alert(list.deger);
}

geriListeYazdır(list);
```

# Döngü versiyonu

<<<<<<< HEAD
Döngü versiyonu da bir öncekine göre biraz daha karmaşıktır.
=======
The loop variant is also a little bit more complicated than the direct output.
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c

`list`'teki son değerin alınması gibi bir yol yoktur. Ayrıca "geri doğru" gidilemez.

Bundan dolayı elemanlar sıra ile bir diziye yazılıp sonra bu dizi sondan başa okunarak bu problem çözülebilir.

```js run
let list = {
  deger: 1,
  sonraki: {
    deger: 2,
    sonraki: {
      deger: 3,
      sonraki: {
        deger: 4,
        sonraki: null
      }
    }
  }
};

function geriListeYazdır(list) {
  let dizi = [];
  let tmp = list;

  while (tmp) {
    dizi.push(tmp.deger);
    tmp = tmp.sonraki;
  }

  for (let i = dizi.length - 1; i >= 0; i--) {
    alert( dizi[i] );
  }
}

geriListeYazdır(list);
```

İki çözüm de aynı şekilde listeyi dolanıyor ve çalıştırma yığınındaki çağrıları hatırlayıp bunları ekrana basıyor.