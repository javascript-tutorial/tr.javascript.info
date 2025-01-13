Arama yapmanın birden fazla yolu vardır.

Bunlardan bazıları:

```js
// 1. `id="age-table"` özniteliğine sahip form elementi seçilmektedir.
let table = document.getElementById('age-table')

// 2. tablo içerisinde yer alan bütün label elementleri seçilmektedir.
table.getElementsByTagName('label')
// veya
document.querySelectorAll('#age-table label')

<<<<<<< HEAD
// 3. Tablodaki ilk elementi bulmak için kullanılır. (İçerisinde bulunan metinde gelmektedir.)
=======
// 3. The first td in that table (with the word "Age")
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
table.rows[0].cells[0]
// veya
table.getElementsByTagName('td')[0]
// veya
table.querySelector('td')

<<<<<<< HEAD
// 4. "search" isimde bir elementi aramaktadır.
// dönecek olan veriler içerisinden ilk olanı bulmak için kullanılır.
=======
// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let form = document.getElementsByName('search')[0]
// veya, form için isim özniteliğinden faydalanarak bulmak
document.querySelector('form[name="search"]')

// 5. Form içerisinde bulunan ilk input elementini bulmak için kullanılır.
form.getElementsByTagName('input')[0]
// veya
form.querySelector('input')

<<<<<<< HEAD
// 6. Form içerisinde bulunan son elementi bulmak için kullanılır.
// Tek seferde ulaşabilmemizi mümkün değildir.
let inputs = form.querySelectorAll('input') // Bütün input elementleri bulunur.
inputs[inputs.length-1] // sonuncuyu bulabilmek için gerekli işlem yapılır.
=======
// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
