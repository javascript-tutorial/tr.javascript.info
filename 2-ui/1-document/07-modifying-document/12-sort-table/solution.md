Çözüm kısa, ancak biraz kafa karıştırıcı görünebilir, bu yüzden burada kapsamlı yorumlar sunuyorum:


```js
let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);

table.tBodies[0].append(...sortedRows);
```

1. `table.querySelectorAll('tr')` gibi tüm `<tr>`leri al, sonra onlardan bir array yap,  çünkü array yöntemlerine ihtiyacımız var.
2. İlk TR (`table.rows[0]`) aslında bir tablo başlığıdırö bu yüzden geri kalanını `.slice(1)` ile alıyoruz.
3. Daha sonra onları ilk `<td>` (isim alanı)'nın içeriği ile karşılaştıryoruz.
4. Şimdi düğümleri `.append(...sortedRows)` olarak doğru sırada ekleyin.

    Tobloların doğrudan belirtilmeyen bir <tbody> öğesi vardır, bu yüzden onu alır ve içine ekleriz: basit bir `table.append(...)` başarısız olacaktır.
  
    Lütfen not edin: Onları kaldırmak zorunda değiliz, sadece "re-insert" (yeniden ekle), onlar eski yerlerini kendiliğinden bırakacaktır.
