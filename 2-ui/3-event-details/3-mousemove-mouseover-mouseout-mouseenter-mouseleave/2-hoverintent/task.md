importance: 5

---

# "Akıllı" tooltip

Kullanıcı fareyle bir elementin *üzerinden geçtiğinde* ancak *üzerinden geçip gitmediğinde* tooltip (ipucu) gösteren bir fonksiyon yazın. 

Diğer kelimelerle, eğer kullanıcı faresiyle bir ögenin üzerine gelirse ve durursa -- tooltipi göster. Ancak eğer faresiyle bu ögenin üzerinden hızlıca geçip giderse, tooltip gösterme.

Teknik olarak, bir öğenin üzerindeki fare hızını ölçebiliriz, eğer hızı yavaşsa biz bunu elementin üzerinden geçiyor kabul ederek tooltipi göstermeliyiz. Hızı fazla ise o zaman görmezden gelmeliyiz.

Bunun için global obje `new HoverIntent(options)` yap. `options` (seçenekler) ile beraber:

- `elem` -- Takip edilecek element.
- `over` -- Eğer fare elementin üzerinden yavaşca geçiyorsa çağırılacak fonksiyon.
- `out` -- Fare elementin üzerinden ayrıldığı zaman çağırılacak fonksiyon (eğer `over` çağırıldıysa).

Tooltip için böyle bir objeyi kullanmaya bir örnek:

```js
// örnek tooltip
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// mouse hareketlerini takip edecek nesne
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

demo:

[iframe src="solution" height=140]

Fareyi "saat" üzerine hızlı bir şekilde hareket ettirirseniz hiçbir şey olmaz ve bunu yavaş yaparsanız veya durdurursanız, bir tooltip gösterecektir.

Lütfen dikkat: imleç saat alt öğeleri arasında hareket ettiğinde tooltip "gelip gitmez".
