**Cevap: Her iki drum için de `0` dan `4`'e kadardır**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Bu sonuç doğrudan `for` algoritmasına bakarak çıkartılabilir:

1. Başlangıçta öncelikle `i = 0`'ı başlat.
2. Koşulu kontrol et `i < 5`
3. Eğer `doğru` dönüyorsa uyarıyı göster `alert(i)` ve sonra `i++`

Artırma `i++` koşul kontrolünden tamamen ayrı bir olaydır(2). Sadece koşulacak ayrı bir cümledir.

Artırımdan dönen değer burada kullanılmadı, bundan dolayı `i++` ile `++i` arasında bir fark yoktur.