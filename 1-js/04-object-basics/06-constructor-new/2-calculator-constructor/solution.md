```js run demo
function HesapMakinesi() {

  this.oku = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.topla = function() {
    return this.a + this.b;
  };

  this.carp = function() {
    return this.a * this.b;
  };
}

let hesapMakinesi = new HesapMakinesi();
hesapMakinesi.oku();

alert( "Toplam=" + hesapMakinesi.topla() );
alert( "Carpım=" + hesapMakinesi.carp() );
```
