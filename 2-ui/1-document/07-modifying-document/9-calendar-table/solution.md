Tabloyu bir string olarak oluşturacağız: `"<table>...</table>"` ve ardından `innerHTML`'ye atayacağız

Algoritma:

1. Tablo başlığını `<th>` ve hafta içi isimleri ile oluşturun..
1. Tarih nesnesini `d = new Date(year, month-1)` oluşturun. Bu, ayın ilk günüdür (JavaScript'te ayların `1`den değil, `0`dan başladığını    hesaba katarak)
2. Ayın ilk gününe kadar ilk birkaç hücre `d.getDay()` boş olabilir. Onları `<td></td>` ile dolduralım.
3. `d`: `d.setDate(d.getDate()+1)` içindeki günü artırın. Eğer `d.getMonth()` henüz gelecek ay değilse, ondan sonra takvime yeni hücre ekle. Eğer bu bir Pazar günüyse, yeni bir satır <code>"&lt;/tr&gt;&lt;tr&gt;"</code>'i ekleyin.
4. Eğer ay bitmişse, ama tablo satırı henüz dolu değil, onu kare yapmak için içine boş `<td>` ekleyin.
