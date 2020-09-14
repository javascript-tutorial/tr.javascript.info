

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Nedenleri:

<<<<<<< HEAD:1-js/02-first-steps/08-comparison/1-comparison-questions/solution.md
1. Apaçık doğru.
2. Alfabe dizilimine göre yanlış.
3. Yine harf sırasına göre `"2"` `"1"`'den büyük
4. `null` ve `undefined` birbirine eşit. 
5. Eğer sıkı eşitlik kontrolü yaparsanız farklı tipler her halükarda yanlış(false) dönderir
6. (4)'e bakın.
7. Farklı tipler yanlış(false) döndürür.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187:1-js/02-first-steps/09-comparison/1-comparison-questions/solution.md
