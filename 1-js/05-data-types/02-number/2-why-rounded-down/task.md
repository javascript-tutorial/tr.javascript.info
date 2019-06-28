importance: 4

---

# 6.35.toFixed(1) == 6.3 ?

Dökümantasyona göre `Math.round` ve `toFixed` en yakın sayıya yuvarlarlar: `0..4` arası aşağı yuvarlarken `5..9` arası yukarı yuvarlar.

Örneğin:
```js run
alert( 1.35.toFixed(1) ); // 1.4
```

Peki aşağıdaki örnekte neden `6.4` e yuvarlamadı da `6.3` e yuvarladı?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```
`6.35` in doğru bir şekilde yuvarlanması için ne yapılmalıdır?