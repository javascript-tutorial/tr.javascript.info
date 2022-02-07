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
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
```

`yukari`  ve `asagi` metodlarını aşağıdaki gibi zincirleme yapılabilir hale getiriniz:

```js
<<<<<<< HEAD
merdiven.yukari().yukari().asagi().adimiGoster(); // 1
=======
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
```

Bu yaklaşım çoğu JavaScript kütüphanesinde yaygın olarak kullanılmaktadır.
