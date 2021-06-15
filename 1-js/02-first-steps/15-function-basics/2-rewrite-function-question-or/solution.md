`'?'` operatörü kullanarak:

```js
function yasKontrolu(yas) {
  return (yas > 18) ? true : confirm('Ebeveynlerin izin verdi mi?');
}
```

`||` veya kullanarak:

```js
function yasKontrolu(yas) {
  return (yas > 18) || confirm('Ebeveynlerin izin verdi mi?');
}
```

<<<<<<< HEAD:1-js/02-first-steps/14-function-basics/2-rewrite-function-question-or/solution.md
`age > 18` etrafındaki parantezler aslında zorunlu değildir. Fakat okunurluğu artırır.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/02-first-steps/15-function-basics/2-rewrite-function-question-or/solution.md
