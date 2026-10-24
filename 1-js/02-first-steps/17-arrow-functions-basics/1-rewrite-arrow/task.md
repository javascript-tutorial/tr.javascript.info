
# Ok Fonksiyonları ile tekrar yazınız

Aşağıda verilen Fonksiyon İfadelerini Ok fonksiyonlarına çevriniz.

```js run
function sor(soru, evet, hayir) {
  if (confirm(soru)) evet()
  else hayir();
}

sor(
  "Kabul ediyor musun?",
  function() { alert("Kabul ettin"); },
  function() { alert("Çalışmasını durdurdun"); }
);
```
