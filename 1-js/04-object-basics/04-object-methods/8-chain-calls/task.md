importance: 2

---

# Zincirleme

`merdiven` objesi yukarı aşağı harekete izin vermektedir:

```js
let merdiven = {
  adim: 0,
  yukari() { 
    this.adim++;
  },
  asagi() { 
    this.adim--;
  },
  adimiGoster: function() { // o anki adımı gösterir
    alert( this.adim );
  }
};
```
Eğer aşağıdaki gibi ard arda çağrı yapılırsa:

```js
<<<<<<< HEAD
merdiven.yukari();
merdiven.yukari();
merdiven.asagi();
merdiven.adimiGoster(); // 1
=======
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```

`yukari`  ve `asagi` metodlarını aşağıdaki gibi zincirleme yapılabilir hale getiriniz:

```js
<<<<<<< HEAD
merdiven.yukari().yukari().asagi().adimiGoster(); // 1
=======
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```

Bu yaklaşım çoğu JavaScript kütüphanesinde yaygın olarak kullanılmaktadır.
