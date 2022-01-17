Tabloyu bir string olarak oluşturacağız: `"<table>...</table>"` ve ardından `innerHTML`'ye atayacağız.

Algoritma:

<<<<<<< HEAD
1. Tablo başlığını ve hafta içi gün isimlerini `<th>` ile oluşturun.
1. Tarih nesnesini ile `d = new Date(year, month-1)` oluşturun. Bu, ayın ilk günüdür. (JavaScript'te ayların `1`den değil, `0`dan başladığını hesaba katarak)
2. Ayın ilk gününe kadar ilk birkaç hücre `d.getDay()` boş olabilir. Onları `<td></td>` ile dolduralım.
3. `d`: `d.setDate(d.getDate()+1)` içindeki günü artırın. Eğer `d.getMonth()` henüz gelecek ay değilse, ondan sonra takvime yeni hücre ekle. Eğer bu bir Pazar günüyse, yeni bir satır <code>"&lt;/tr&gt;&lt;tr&gt;"</code>'i ekleyin.
4. Eğer ay bitmişse, ama tablo satırı henüz dolu değilse, onu kare yapmak için içine boş `<td>` ekleyin.
=======
1. Create the table header with `<th>` and weekday names.
2. Create the date object `d = new Date(year, month-1)`. That's the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3. First few cells till the first day of the month `d.getDay()` may be empty. Let's fill them in with `<td></td>`.
4. Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that's a Sunday, then add a newline <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad
