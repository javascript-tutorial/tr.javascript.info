importance: 2

---

# Zincirleme

<<<<<<< HEAD
`merdiven` objesi yukarı aşağı harekete izin vermektedir:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

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
<<<<<<< HEAD
Eğer aşağıdaki gibi ard arda çağrı yapılırsa:

```js
merdiven.yukari();
merdiven.yukari();
merdiven.asagi();
merdiven.adimiGoster(); // 1
```

`yukari`  ve `asagi` metodlarını aşağıdaki gibi zincirleme yapılabilir hale getiriniz:

```js
merdiven.yukari().yukari().asagi().adimiGoster(); // 1
```

Bu yaklaşım çoğu JavaScript kütüphanesinde yaygın olarak kullanılmaktadır.
=======

Now, if we need to make several calls in sequence, we can do it like this:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

Such an approach is widely used across JavaScript libraries.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
