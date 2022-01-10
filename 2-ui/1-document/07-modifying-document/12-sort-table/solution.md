Çözüm kısa, ancak biraz kafa karıştırıcı görünebilir, bu yüzden burada kapsamlı yorumlar sunuyorum:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

<<<<<<< HEAD
1. `table.querySelectorAll('tr')` gibi tüm `<tr>`leri al, sonra onlardan bir array yap,  çünkü array yöntemlerine ihtiyacımız var.
2. İlk TR (`table.rows[0]`) aslında bir tablo başlığıdır, bu yüzden geri kalanını `.slice(1)` ile alıyoruz.
3. Daha sonra onları ilk `<td>` (isim alanı)'nın içeriği ile karşılaştıryoruz.
4. Şimdi düğümleri `.append(...sortedRows)` olarak doğru sırada ekleyin.

    Tabloların doğrudan belirtilmeyen bir <tbody> öğesi vardır, bu yüzden onu alır ve içine ekleriz: basit bir `table.append(...)` başarısız olacaktır.
  
    Lütfen not edin: Onları kaldırmak zorunda değiliz, sadece yeniden ekle ("re-insert"), onlar eski yerlerini kendiliğinden bırakacaktır.
=======
The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

We don't have to remove row elements, just "re-insert", they leave the old place automatically.

P.S. In our case, there's an explicit `<tbody>` in the table, but even if HTML table doesn't have `<tbody>`, the DOM structure always has it.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f
