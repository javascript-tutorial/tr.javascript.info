importance: 5

---

# Geliştirilmiş ipucu (tooltip) davranışı 

Fare ile bir elementin üzerinden geçildiğinde `data-tooltip` özelliği ile beraber tooltip (ipucu) gösteren bir javaScript kodu yazın.

Buradaki göreve benziyor <info:task/behavior-tooltip>, ancak burada gösterilen öğeler iç içe geçmiş olabilir. En içteki tooltip gösterilmelidir.

Örneğin:

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Fare ile buranın üzerine gel</a>
</div>
```

Sonuç iframe üzerinde:

[iframe src="solution" height=300 border=1]

Not ipucu: aynı anda yalnızca bir araç ipucu (tooltip) görünebilir.
