

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

1. Apaçık doğru.
2. Alfabe dizilimine göre yanlış.
3. Yine harf sırasına göre `"2"` `"1"`'den büyük
4. `null` ve `undefined` birbirine eşit. 
5. Eğer sıkı eşitlik kontrolü yaparsanız farklı tipler her halükarda yanlış(false) dönderir
6. (4)'e bakın.
7. Farklı tipler yanlış(false) döndürür.
