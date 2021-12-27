# Merhaba Dünya

<<<<<<< HEAD
Okuyacağınız bu konu Javascript'in özü hakkındadır, platform ile bağlantılı değildir. İleride Node.JS ve diğer platformlarda aynı şekilde kullanabilirsiniz.
=======
This part of the tutorial is about core JavaScript, the language itself.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Fakat kodlarımızın çalıştırılabilmesi için en azından bir ortam gerekli ve bu kitap tarayıcı üzerinden açılarak size bu ortamı yaratmış oluyor. Tarayıcı özel komutları ( `alert`) daha az tutulacak. Böylece eğer diğer platformlara yönelmek istiyorsanız bu komutlarla zaman geçirmenize gerek kalmayacak. Diğer yandan [sonraki](/ui) bölümde tarayıcı özellikleri daha derinlemesine incelenecektir.

Öyleyse web sayfasına nasıl JavaScript dökümanı ekleyeceğinizi öğreneceksiniz. Sunucu taraflı çevrelerde JavaScript kodunuzu `"node my.js"` komutuyla çalıştırabilirsiniz.


## Script etiketi

<<<<<<< HEAD
Javascript programları html içerisine `<script>` etiketi ile eklenebilir.
=======
JavaScript programs can be inserted almost anywhere into an HTML document using the `<script>` tag.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Örneğin:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Javascript Kodundan önce...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...Javascript kodundan sonra.</p>

</body>

</html>
```

```online
Sağ üst taraftaki "Play" ( Çalıştır ) butonuna basarak örneği çalıştırabilirsiniz.
```

`<script>` etiketi içerisine yazdığınız JavaScript komutu tarayıcı o koda geldiğinde doğrudan okunur.


## Modern yazım

Bu günlerde `<script>` etiketi genelde özellikler eklenmeden yazılmakta. Fakat eski kodlara baktınızda aşağıdaki gibi kodları görmek mümkündür:

<<<<<<< HEAD
 `type` özelliği: <code>&lt;script <u>type</u>=...&gt;</code>
 : Eski HTML4 standardı script etiketi içerisinde tip gelirmeyi zorunlu kılıyordu. Genelde bu `type="text/javascript"` idi. Günümüzde ise HTML standartları `type` özelliğini varsayılan olarak kabul edebiliyor.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic, we'll talk about modules in another part of the tutorial.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

`language` (dil) özelliği: <code>&lt;script <u>language</u>=...&gt;</code>
: Bu özellik yazılan script'in dilini göstermek amacıyla kullanılır. Fakat bu da artık önemini yitirmiştir. Javascript varsayılan dil olduğundan dolayı söylemeye gerek yoktur.

JavaScript kodundan önce ve sonra yazılan yorumlar. Çok eski JavaScript kitaplarına bakarsanız aşağıdaki gibi bir kod bloğuyla karşılaşmanız muhtemeldir:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
    Bu yorumların amacı <script> etiketini anlamayan tarayıcılarda JavaScript kodunun ekrana yazılmasını engellemektir. <br>Fakat artık neredeyse tüm tarayıcılar `<script>` etiketini anladıklarından bu konuda da bir sıkıntı bulunmamaktadır. <br>Eğer böyle bir kod bloğu görürseniz kod çok eski diyebilirsiniz.
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c


## Dışardan yüklenen Javascript kod dosyaları

Eğer çok fazla JavaScript kodunuz varsa bunları ayrı bir sayfaya koyabilirsiniz.

Sonrasında bu dosyayı aşağıdaki gibi yol göstererek sayfanızda çalıştırılmasını sağlayabilirsiniz.

```html
<script src="/kod/yolu/ana.js"></script>
```

<<<<<<< HEAD
Buraki `/kod/yolu/ana.js` site ana dizininden itibaren kesin(absolute) yol belirtir.

Tabi göreceli(relative) yol belirtmek de mümkündür. Örneğin `src="script.js"` HTML dosyasının kayıt edildiği klasördeki `"script.js"`'yi al anlamına gelir.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Tam URL vermek de mümkündür. Örneğin:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```
Birkaç kod dosyası eklemek isterseniz aşağıdaki gibi yazabilirsiniz.

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Kural olarak en basit JavaScript kodları doğrudan HTML içerisine yazılır. Daha karmaşık olanlar farklı dosyalarda taşınır.

Ayrı dosyalarda taşınmasının bir diğer güzel yanı tarayıcıların bu dosyaları indirip ön belleğe almasıdır.[cache] https://tr.wikipedia.org/wiki/Web_%C3%B6nbelle%C4%9Fi).

Bu olaydan sonra eğer bu kod dosyaları değişmediyse daha sonraki sayfa gösterimlerinde o dosyaları tekrar indirmeyecektir. Yani kod dosyaları sadece bir defa indirilecektir. Bu da web sayfasının veri trafiğinin daha az olmasını ve sayfanın daha hızlı gösterilmesini sağlar.
```

````warn header="Eğer `src`etiketi yazılmışsa sadece kod dosyası eklemeye yarar. Yani hem `scr` ekleyip hemde `<script>` tagları arasında kod çalıştıramazsınız.

Aşağıdaki kod bloğu çalışmayacaktır:


```html
<script *!*src*/!*="file.js">
  alert(1); // İçerik görmezden gelinecektir çünkü `src` tagı kullanılmıştır.
</script>
```

`script` tagını kullırken dışarıdan mı dosya ekleyeceksiniz ( `<script src="…">` ) yoksa dosyayı içeride mi yazacaksınız bunun kararını vermemiz gerekmektedir.

Yukarıdaki örnek iyi `<script>` etiketi içerisinde şu şekilde çalıştırılır.

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Özet

- `<script>` etiketi kullanarak sayfaya Javascript kodu entegre edebilirsiniz.
- `type` ve `language` özellikleri artık gerekli değildir.
- Dışarıdan bir kod eklemek için `src` özelliğini kullanabilirsiniz. Ör : `<script src="path/to/script.js"></script>`


Tarayıcı ve web sayfası etkileşimi üzerine JavaScript tarafında öğrenilecek çok şey vardır. Fakat unutmayın ki bu bölüm JavaScript diline adanmıştır. Tarayıcıyı sadece JavaScript çalıştırabilmesinden dolayı kullanacaksınız. Böylece anında kodu çalıştırabilecek ve bir yandan da kitabı okumaya devam edebileceksiniz.
