
# Ok Fonksiyonları ile tekrar yazınız

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/1-rewrite-arrow/task.md
Aşağıda verilen Fonksiyon İfadelerini Ok fonksiyonlarına çevriniz.
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd:1-js/02-first-steps/16-arrow-functions-basics/1-rewrite-arrow/task.md

```js run
function sor(soru, evet, hayir) {
  if (confirm(soru)) evet()
  else hayir();
}

ask(
  "Kabul ediyor musun?",
  function() { alert("Kabul ettin"); },
  function() { alert("Çalışmasını durdurdun"); }
);
```
