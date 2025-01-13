<<<<<<< HEAD
# Form gönderme: Olay veya metod olarak
=======
# Forms: event and method submit
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Form gönderildiğinde `submit` olayı tetiklenir, genellikle formu sunucuya göndermeden önce doğrulamak veya gönderimi iptal edip JavaScript'te işlemek için kullanılır.

`form.submit()` metodu JavaScript'ten form gönderimini başlatmaya izin verir. Kendi formlarımızı dinamik olarak oluşturmak ve sunucuya göndermek için kullanabiliriz.

Daha fazla ayrıntı görelim.

## Olay olarak submit kullanımı

Form göndermenin iki ana yolu vardır:

1. Birincisi -- `<input type="submit">` veya `<input type="image">` alanlarına tıklamak.
2. İkincisi -- bir giriş alanında (input) `key:Enter`a basmak.



Her iki eylem de formda olay gönderilmesine yol açar. İşleyici verileri kontrol edebilir ve hata varsa bunları gösterebilir ve `event.preventDefault()` öğesini çağırabilir, bu durumda form sunucuya gönderilmez.

Aşağıdaki formda:
1. Metin alanına gidin ve `key:Enter` tuşuna basın.
2. Tıklayın  `<input type="submit">`

Her iki eylem de `alert` gösterir ve `return false` olduğu için form hiçbir yere gönderilmez.

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="`submit` ve `click` arasındaki ilişki"
Bir input alanında `key:Enter` kullanılarak bir form gönderildiğinde, `<input type="submit">` üzerinde bir `click` olayı tetiklenir.

Bu oldukça komik çünkü hiç tıklama yoktu.

Örnek:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Buraya tıkla ve bir şeyler yaz sonra enter'e bas">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```



## Metod olarak submit kullanımı

Sunucuya manuel olarak bir form göndermek için, `form.submit()` metodunu kullanabiliriz.

Sonra herhangi bir `submit` olayı oluşturulmaz. Programcı `form.submit()` 'i çağırırsa, komut dosyasının tüm ilgili işlemleri zaten yaptığı varsayılır.
Bazen bu, aşağıdaki gibi bir formu manuel olarak oluşturmak ve göndermek için kullanılır:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// the form must be in the document to submit it
document.body.append(form);

form.submit();
```
