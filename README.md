# Türkçe Modern JavaScript Eğitimi

Bu kaynak <https://javascript.info> sitesinin Türkçe çevirisini içermektedir.

**Şu şekilde yardımda bulunabilirsiniz:**

- [Türkçe çeviri gelişimini](https://github.com/javascript-tutorial/tr.javascript.info/issues/1) adresinden görebilirsiniz
- Çevirmek istediğiniz tiklenmemiş makaleyi seçin
- Bu makale başlığını yorum olarak konuya yazın, örneğin : `JavaScript'e giriş`.
	- Bot bunu anlayıp konuda bunu işaretleyecek ve böylece herkes bilecek hangi konuda çalıştığınızı.
	- Yorumunuz sadece başlığı içermelidir.
- Repoyu kopyalayın, çevirin ve Pull Request talebinde bulunun.
	- PR başlığı yazılan makale ile aynı olmalıdır. Böylece bot bu PR'ı konuya yazabilir


Lütfen proje yöneticilerinin değişiklikleri incelemesi ve merge etmesine zaman tanıyın.

Eğer cevap vermiyorlar ise, ve siz yöneticiliğe geçmek istiyorsanız, [ana repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new) üzerinden bizimle iletişime geçebilirsiniz.

<<<<<<< HEAD
**Başkalarına çeviri yaptığınızı bildirerek onların da bize katılmalarını isteyebilirsiniz**

🎉 Teşekkürler!
=======
Something's wrong? A topic is missing? Explain it to people, add it as PR 👏

**You can edit the text in any editor.** The tutorial uses an enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

İsminiz ve paylaşımınız proje yayınlandığında "Proje Hakkında" bölümünde yer alacaktır.

Not: Tercüme edilen dillerin listesi <https://javascript.info/translate> adresinden erişilebilir.

<<<<<<< HEAD
## Yapı

Makale veya görev farketmeksizin her bölüm kendine ait klasörde bulunur.
Klasör `N-url` şeklinde `N`-sırası ( makaleler sıralıdır ) ve `url` sitedeki url yazımıdır.
=======
Every chapter, article, or task has its folder.

The folder is named like `N-url`, where `N` is a number for the sorting purposes and `URL` is the URL part with the title of the material.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Klasörler aşağıdaki dosyalardan oluşur:

<<<<<<< HEAD
- Bölüm için `index.md`,
- Makale için `article.md`,
- Görev için `task.md` ve çözüm var ise `solution.md`.
=======
  - `index.md` stands for a chapter
  - `article.md` stands for an article
  - `task.md` stands for a task (solution must be provided in `solution.md` file as well)
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Dosya `# Title Header` başında diyez ile başlar ve bu metnin hepsi Markdown-benzeri bir format ile yazılmalıdır. Böylece basit metin editörleri ile yazabilirsiniz.

Makale için gerekli ek kaynaklar ve örnekler de aynı klasörde yer alır.

## Tercüme İpuçları

Lütfen paragraf ve satır boşluklarını olduğu gibi bırakın. Yeni satır eklemeyin veya var olanı silmeyin. Bu ileride İngilizce versiyonundan çevirirken değişiklikleri bulma konusunda kolaylık sağlar.

Eğer İngilizce versiyonunun da geliştirilebileceğini düşünüyorsanız. Lütfen Pull Request yapın. Çok memnun oluruz!

### Terimler

- Bazı özel terimler çevirilemez. Örneğin "Function Declaration" olduğu gibi bırakılabilir.
- `resolved promise`, `slash`, `regexp` gibi diğer terimler sözlükle bulunabilir. 
    - Eğer sözlükte yoksa bunların tercümelerini [MDN](https://developer.mozilla.org/en-US/) adresinden bulabilirsiniz.

### Kod bloğu içerisindeki metinler

- Yorumları tercüme edin.
- Örnek metinleri ve kullanıcı mesajlarını tercüme edin.
- Değişkenleri, sınıfları, tanımlamaları tercüme etmeyiniz.
- Kodun tercümeden sonra çalıştığına emin olun :)

Örnek:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Örnek
const text = 'Merhaba Dünya';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Örnek
const text = 'Merhaba Dünya';
// ".hello" Bir sınıf
// BUNU TERCÜME ETMEYİNİZ
document.querySelector('.hola').innerHTML = text;
```

### Dış Linkler

Eğer dış kaynak linkleri Wikipedia ise ve iyi bir kaynak olarak görüyorsanız buna link verebilirsiniz.

Örnek:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://tr.wikipedia.org/wiki/JavaScript) bir programlama dilidir.
```

MDN'de eğer bir bölümü tercüme edilmiş ise buraya link verebilirsiniz.

Eğer hiçbir çevirisi yoksa linki olduğu gibi bırakın.

### Metadata

Bazı dosyalar, genelde görevler, `---` şeklinde YAML metedata'ya sahiptir.

```md
importance: 5
```
Lütfen buradaki "importance" ( ve diğer metadataları ) tercüme etmeyiniz.

### Çapa

Bazı başlıklar sonunda `[#çapa]`'ya sahiptir.

```md
## Ayırma operatörü [#spread-operator]
```
Lütfen bunu tercüme etmeyiniz veya silmeyiniz. Burası URL'i ayarlamak için yazılmıştır.

<<<<<<< HEAD
=======
---  
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
♥  
