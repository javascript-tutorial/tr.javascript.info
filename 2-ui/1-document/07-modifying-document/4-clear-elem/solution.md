
İlk olarak, bunun nasıl *yapılmadığını* görelim: 

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Bu işlemeyecektir,  çünkü `remove()` çağrısı `elem.childNodes` koleksiyonunun yerini değiştirir, bu nedenle her seferinde öğeler "0" dizininden başlar. Ama "i" ıle değeri artar ve bazı öğeler atlanmış olabilir.

`for..of` döngüsü(loop) de aynısını yapar.

Doğru değişken(variant) şöyle olabilir:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Ve aynısını yapmanın daha basit bir yolu da var:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
