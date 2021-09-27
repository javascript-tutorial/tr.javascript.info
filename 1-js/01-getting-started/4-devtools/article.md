# Geliştirici Konsolu

Kod yazmak hataya meyilli bir iştir. Bu süreç içerisinde muhtemelen hatalar yapacaksınız. Pardon! Kesinlikle hata yapacaksınız, en azından [robot](<https://tr.wikipedia.org/wiki/Bender_(Futurama)>) değilseniz.

Kullanıcı, tarayıcıda meydana gelen hataları göremez. Eğer yazdığınız kodda bir yanlışlık varsa, hatalı kısımları göremez ve bunu düzeltemezsiniz.

Hataları ve diğer kullanışlı bilgileri görebilmek için tarayıcılara entegre edilmiş "Geliştirici Araçları"'nı kullanmalısınız.

Genelde geliştiriciler Chrome veya Firefox'a yoğunlaşmaktadırlar çünkü ikisinin de geliştirme aracı çok iyidir. Diğer tarayıcılar da geliştirme araçları sunarlar, bazen daha farklı özelliklerle bile olsa genelde amaçları Chrome veya Firefox'u yakalamaktır.  Bundan dolayı çoğu kişi "favori" tarayıcıya sahiptir ve eğer tarayıcı tabanlı bir problemle karşılaşırsa diğer tarayıcıyı kontrol eder.

Geliştirici araçları gerçekten güçlüdür ve birçok farklı özelliği bünyesinde barındırır. Öncelikle bu araçların nasıl açılacağını ve hataları nasıl inceleyeceğimizi göreceğiz. Tabi bunlar için JavaScript kodları da çalıştıracağız.

## Google Chrome

[bug.html](bug.html) sayfasını açın.

Bu sayfada bulunan JavaScript kodunda bir hata var. Kullanıcı bunu göremiyor, öyleyse geliştirici araçlarından bakıp bu hatayı tanımlayabilirsiniz.

`key:F12`'ye veya `key:Cmd+Opt+J`'ye basarak geliştirici araçlarını açabilirsiniz.

Geliştirici araçları konsol paneliyle açılacaktır. Aşağıdaki ekranda ilk hatanızı göreceksiniz:

![chrome](chrome.png)

Chrome'un geliştirme aracı versiyona göre değişiklik gösterecektir. Fakat genel hatları itibariyle bu anda gördüğünüze benzeyecektir.

- Konsol panelinde kırmızı renk ile hatayı görebilirsiniz. Bu durumda kodunuz bilinmeyen "lalala" komutunda hata vermiş.

<<<<<<< HEAD
- Sağ tarafında hatanın hangi satırda olduğunu görebilirsiniz. Bu alan tıklanabilirdir. Şu anda hata `bug.html:12`'de bulunmaktadır.
=======
Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

Hatanın altında `>` sembolünü görebilirsiniz. Bu "komut satırı"'nı işaret eder. Komutunuzu yazdıktan sonra `key:Enter`'a basarak o satırdaki komutu çalıştırabilirsiniz. Birden fazla satır kod yazabilmek için ise `key:Shift+Enter` tuş kombinasyonunu kullanabilirsiniz.

<<<<<<< HEAD
Başlangıç için hataları görmek yeterli olacaktır. Daha sonra geliştirme aracını <info:debugging-chrome> bölümünde derinlemesine öğreneceksiniz.
=======
```smart header="Multi-line input"
Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`. This way one can enter long fragments of JavaScript code.
```
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

## Firefox, Edge ve diğerleri

Çoğu tarayıcı geliştirme aracını `key:F12` tuşu ile açar.

Görüntü ve kullanım olarak çoğu birbirine benzer. Bir tanesini öğrendiğinizde diğerine geçişiniz oldukça kolay olur.

## Safari

Safari (sadece macOS için desteklenmektedir) biraz özeldir. Geliştirici araçlarını kullanabilmek için önce "Geliştirici Menüsü"'nü aktif hale getirmeniz gerekmektedir. Bunun için özellikler sayfasını açıp "Gelişmiş" panelinden aşağıdaki gibi "Show Develop menu in menu bar"'ı işaretlemelisiniz.

![safari](safari.png)

Bu işlemi yaptıktan sonra `key:Cmd+Opt+C` ile geliştirici konsolunu açıp kapatabilirsiniz. Ayrıca dikkat ederseniz üst menüde "Develop" adında yeni bir başlık göreceksiniz. Buradan da birçok komutu çalıştırabilirsiniz.

<<<<<<< HEAD
## Multi-line input

Genelde konsol ekranında `key:Enter` yaparsanız bulunduğu satırı çalıştırır. Birden fazla satırı yazmak istiyorsanız `key:Shift+Enter` kullanabilirsiniz.

## Özet
=======
## Summary
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

- Geliştirici araçları hataları görmenizi, komutları çalıştırmanızı, değişkenleri takip etmenizi sağlar.
- Windows işletim sisteminde `key:f12` tuşu ile açılır (Çoğu tarayıcıda bu tuş çalışır). macOS işletim sistemi için ise Google Chrome: `key:Cmd+Opt+J`  ile Safari ise: `key:Cmd+Opt+C` tuşu ile açılır (Safari'de geliştirici modunu açmanız gerekmekte).

Artık çalışma ortamınızı da ayarladığınıza göre JavaScript öğrenmeye başlayabilirsiniz.
