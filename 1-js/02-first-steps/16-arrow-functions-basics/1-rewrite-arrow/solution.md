
```js run
function sor(soru, evet, hayir) {
  if (confirm(soru)) evet()
  else hayir();
}

sor(
  "Kabul ediyor musun?",
*!*
  () => alert("Kabul ettin."),
  () => alert("Çalışmasını durdurdun")
*/!*
);
```
Daha kısa ve temiz görünüyor değil mi?
