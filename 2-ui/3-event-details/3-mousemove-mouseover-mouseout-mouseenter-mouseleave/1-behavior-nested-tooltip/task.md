importance: 5

---

# Geliştirilmiş ipucu (tooltip) davranışı 

<<<<<<< HEAD
Fare ile bir elementin üzerinden geçildiğinde `data-tooltip` özelliği ile beraber tooltip (ipucu) gösteren bir javaScript kodu yazın.
=======
Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Buradaki göreve benziyor <info:task/behavior-tooltip>, ancak burada gösterilen öğeler iç içe geçmiş olabilir. En içteki tooltip gösterilmelidir.

<<<<<<< HEAD
Örneğin:
=======
Only one tooltip may show up at the same time.

For instance:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Fare ile buranın üzerine gel</a>
</div>
```

Sonuç iframe üzerinde:

[iframe src="solution" height=300 border=1]
<<<<<<< HEAD

Not ipucu: aynı anda yalnızca bir araç ipucu (tooltip) görünebilir.
=======
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
