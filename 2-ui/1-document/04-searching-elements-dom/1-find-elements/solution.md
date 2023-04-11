Arama yapmanın birden fazla yolu vardır.

Bunlardan bazıları:

```js
// 1. `id="age-table"` özniteliğine sahip form elementi seçilmektedir.
let table = document.getElementById('age-table')

// 2. tablo içerisinde yer alan bütün label elementleri seçilmektedir.
table.getElementsByTagName('label')
// veya
document.querySelectorAll('#age-table label')

// 3. Tablodaki ilk elementi bulmak için kullanılır. (İçerisinde bulunan metinde gelmektedir.)
table.rows[0].cells[0]
// veya
table.getElementsByTagName('td')[0]
// veya
table.querySelector('td')

// 4. "search" isimde bir elementi aramaktadır.
// dönecek olan veriler içerisinden ilk olanı bulmak için kullanılır.
let form = document.getElementsByName('search')[0]
// veya, form için isim özniteliğinden faydalanarak bulmak
document.querySelector('form[name="search"]')

// 5. Form içerisinde bulunan ilk input elementini bulmak için kullanılır.
form.getElementsByTagName('input')[0]
// veya
form.querySelector('input')

// 6. Form içerisinde bulunan son elementi bulmak için kullanılır.
// Tek seferde ulaşabilmemizi mümkün değildir.
let inputs = form.querySelectorAll('input') // Bütün input elementleri bulunur.
inputs[inputs.length-1] // sonuncuyu bulabilmek için gerekli işlem yapılır.
```
