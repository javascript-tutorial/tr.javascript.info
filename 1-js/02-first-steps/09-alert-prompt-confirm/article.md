# Etkileşim: alarm kutusu, kullanıcıdan bilgi isteme, onaylama

Bu bölüm JavaScript'i çevre bağımsız yani tarayıcı veya server farketmeksizin olduğu gibi kapsar.

Fakat şu anda eğitimler tarayıcı üzerinde yapılmaktadır. Bundan dolayı en azından kullanıcı arayüzüne dair fonksiyon bilmenizde fayda var. Bu bölümde tarayıcıda çalışan `aler`, `prompt`, `confirm` fonksiyonları incelenecek.

## alert

Yazımı:

```js
alert(mesaj);
```
Bu ekrana mesaj' değişkenini çıkarır ve önünüze gelen bu pop-up'da "OK" butonuna basmadan kodda bir sonraki adıma geçilmez.

For example:

```js run
alert("Merhaba");
```
Ekrana çıkan küçük pencereye *modal pencere* denir. "Modal" sayfayı kullanan kişinin bu durumda sayfayla iletişime geçemeyeceğini, başka tuşlara basamayacağını sadece bu pencere ile etkileşim kurabileceğini ifade eder. Yani "OK"'e basması beklenir.

## Kullanıcıdan bilgi isteme

Kullanıcıdan bilgi istemek için `prompt` fonksiyonu kullanılır. Bu fonksiyon iki tane argümana ihtiyaç duyar:


```js no-beautify
result = prompt(başlık[, varsayılan]);
```
Modal penceresi içerisinde bir yazı ve OK/CANCEL butonlarını içerir.

`başlık`
: Kullanıcıya gösterilecek yazı.

`default`
: Opsiyonel bir ikinci parametre, input alanı için varsayılan değeri içerir.

Kullanıcı ekrana çıkan veri girişi kutusuna istediğini yazar ve OK tuşuna basar. İsterse bunu CANCEL tuşuna basarak iptal edebilir. Veya `key:Esc` tuşu da aynı işlevi görür.

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

Eğer OK'e basıldıysa `true`, CANCEL'a basıldıysa `false` dönderir.

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
: Kullanıcıya bir mesaj ile soru sorar. Bir veri giriş kutusu ile cevap alır. Eğer kullanıcı bir yazı yazar ve `OK` tuşuna basarsa yazılan değeri döner. Eğer `CANCEL` veya `key:Esc`'ye basarsa bu durumda tarayıcıya `null` değeri döner.


`confirm`
: Kullanıcıdan "OK" veya "CANCEL"'a basmasını ister. Eğer kullanıcı "OK" basarsa `true`, CANCEL veya `key:Esc` durumunda false döner.

Tüm bu metodlar modaldır. Yani bu kod çalıştığında kullanıcı sayfanın başka bir yeriyle etkileşimde bulunamaz, taki bu pencereler kapatılana kadar.

Yukarıdaki metodlar için iki tane sınırlama vardır.

1. Bu açılan modal'ın yeri genelde sayfanın ortasıdır.
2. Ayrıca ekranın stili, bu da tarayıcıdan tarayıcıya değişmektedir. Bunu değiştiremezsiniz.

Bu da her şeyi basite indirgemenin karşılığı. Tabi farklı yollarla daha güzel ekranlar göstermek mümkün fakat görüntü o kadar da önemli değil, işlevsellik önemli derseniz, bu durumda bu metodları kullanabilirsiniz.
