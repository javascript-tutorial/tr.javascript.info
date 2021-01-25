importance: 5

---

# Create a tree from the object

İçiçe geçmiş nesneden, içiçe geçmiş bir `ul/li` listesi oluşturan bir "createTree" fonksiyonu yazın.

Örneğin:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

Sözdizimi (syntax):

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // creates the tree in the container
*/!*
```

Sonuç (ağaç) şöyle görünmeli:

[iframe border=1 src="build-tree-dom"]

Bu görevi çözmenin iki yolundan birini seçin:

1. Ağaç için HTML oluşturun ve ardından `container.innerHTML`ye atayın.
2. Ağaç düğümleri (tree nodes) oluşturun ve DOM yöntemleriyle sonuna ekleyin. 

Eğer her ikisini de yapabilirseniz harika olur.

Not: Ağacın yapraklar için boş `<ul></ul>` gibi "fazladan" öğeleri olmamalıdır.
