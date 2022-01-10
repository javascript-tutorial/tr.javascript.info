# Etkileşim: alarm kutusu, kullanıcıdan bilgi isteme, onaylama

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Bu bölüm JavaScript'i çevre bağımsız yani tarayıcı veya server farketmeksizin olduğu gibi kapsar.

Fakat şu anda eğitimler tarayıcı üzerinde yapılmaktadır. Bundan dolayı en azından kullanıcı arayüzüne dair fonksiyon bilmenizde fayda var. Bu bölümde tarayıcıda çalışan `aler`, `prompt`, `confirm` fonksiyonları incelenecek.

## alert

Yazımı:

```js
alert(mesaj);
```
Bu ekrana mesaj' değişkenini çıkarır ve önünüze gelen bu pop-up'da "OK" butonuna basmadan kodda bir sonraki adıma geçilmez.
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

For example:

```js run
alert("Merhaba");
```
Ekrana çıkan küçük pencereye *modal pencere* denir. "Modal" sayfayı kullanan kişinin bu durumda sayfayla iletişime geçemeyeceğini, başka tuşlara basamayacağını sadece bu pencere ile etkileşim kurabileceğini ifade eder. Yani "OK"'e basması beklenir.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
## Kullanıcıdan bilgi isteme
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Kullanıcıdan bilgi istemek için `prompt` fonksiyonu kullanılır. Bu fonksiyon iki tane argümana ihtiyaç duyar:


```js no-beautify
result = prompt(başlık[, varsayılan]);
```
Modal penceresi içerisinde bir yazı ve OK/CANCEL butonlarını içerir.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
`başlık`
: Kullanıcıya gösterilecek yazı.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

`default`
: Opsiyonel bir ikinci parametre, input alanı için varsayılan değeri içerir.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Kullanıcı ekrana çıkan veri girişi kutusuna istediğini yazar ve OK tuşuna basar. İsterse bunu CANCEL tuşuna basarak iptal edebilir. Veya `key:Esc` tuşu da aynı işlevi görür.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Eğer kullanıcı değer girdiyse bunu dönderir, eğer girmediyse ve o ekrandan `key:Esc` veya CANCEL butonu ile çıktıysa `null` dönderir.


Örneğin:

```js run
let age = prompt('Kaç yaşındasın?', 100);

alert(`Sen ${age} yaşındasın!`); // Sen 100 yaşındasın!
```

````warn header="IE: her zaman  `varsayılan` değeri kullanın"
İkinci parametre opsiyonel. Fakat eğer bu parametreyi göndermezsek, Internet Explorer veri giriş ekranında `"undefined"` gösterir.

İsterseniz aşağıdaki kodu Internet Explorer'da çalıştırıp görebilirsiniz:

```js run
let test = prompt("Test");
```
Bundan dolayı IE'de düzgün görünebilmesi için her zaman boşta olsa bir değer atamak önemli. Bu arada Edge browser'da bu problem görünmemektedir.

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## Onay

Yazım:

```js
result = confirm(soru);
```
`confirm` fonksiyonu içerisine yazdığımız `soru` ile OK ve CANCEL butonu olan bir pencere çıkarır.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Eğer OK'e basıldıysa `true`, CANCEL'a basıldıysa `false` dönderir.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Örneğin:

```js run
let patron = confirm("Patron musun?");

alert( patron ); // eğer OK'e basıldıysa `true` döner.
```

## Özet

Bu bölümde 3 tane tarayıcı tabanlı ve kullanıcı ile etkileşimi sağlayan fonksiyon işlendi.

`alert`
: Ekranda mesaj gösterir.

`prompt`
<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
: Kullanıcıya bir mesaj ile soru sorar. Bir veri giriş kutusu ile cevap alır. Eğer kullanıcı bir yazı yazar ve `OK` tuşuna basarsa yazılan değeri döner. Eğer `CANCEL` veya `key:Esc`'ye basarsa bu durumda tarayıcıya `null` değeri döner.


`confirm`
: Kullanıcıdan "OK" veya "CANCEL"'a basmasını ister. Eğer kullanıcı "OK" basarsa `true`, CANCEL veya `key:Esc` durumunda false döner.
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Tüm bu metodlar modaldır. Yani bu kod çalıştığında kullanıcı sayfanın başka bir yeriyle etkileşimde bulunamaz, taki bu pencereler kapatılana kadar.

Yukarıdaki metodlar için iki tane sınırlama vardır.

1. Bu açılan modal'ın yeri genelde sayfanın ortasıdır.
2. Ayrıca ekranın stili, bu da tarayıcıdan tarayıcıya değişmektedir. Bunu değiştiremezsiniz.

Bu da herşeyi basite indirgemenin karşılığı. Tabi farklı yollarla daha güzel ekranlar göstermek mümkün fakat görüntü o kadar da önemli değil, işlevsellik önemli derseniz, bu durumda bu metodları kullanabilirsiniz.
