Cevap: **1 ve 3**.

Her iki komut da 'metin'i(`text`) "elem" e 'metin olarak' eklemeyle sonuçlanır.

İşte bir örnek:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
