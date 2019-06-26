

```js run demo
function Toplayici(baslangicDegeri) {
  this.deger = baslangicDegeri;

  this.oku = function() {
    this.deger += +prompt('Kaç eklemek istersiniz?', 0);
  };

}

let toplayici = new Toplayici(1);
toplayici.oku();
toplayici.oku();
alert(toplayici.deger);
```
