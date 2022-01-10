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
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f
```

`yukari`  ve `asagi` metodlarını aşağıdaki gibi zincirleme yapılabilir hale getiriniz:

```js
<<<<<<< HEAD
merdiven.yukari().yukari().asagi().adimiGoster(); // 1
=======
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f
```

Bu yaklaşım çoğu JavaScript kütüphanesinde yaygın olarak kullanılmaktadır.
