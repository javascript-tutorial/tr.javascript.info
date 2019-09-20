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

**Başkalarına çeviri yaptığınızı bildirerek onların da bize katılmalarını isteyebilirsiniz**

🎉 Teşekkürler!

İsminiz ve paylaşımınız proje yayınlandığında "Proje Hakkında" bölümünde yer alacaktır.

Not: Tercüme edilen dillerin listesi <https://javascript.info/translate> adresinden erişilebilir.

## Structure

Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones. Makes it easy to merge future changes from the English version into the translation. 

If you see that the English version can be improved – great, please send a PR to it.

### Terms

- Some specification terms are not to be translated, e.g. "Function Declaration" can be left "as is".
- For other terms like `resolved promise`, `slash`, `regexp`, and so on look a good glossary, hopefully there's one for your language already.
    - If there's no dictionary, look for translations in manuals, such as [MDN](https://developer.mozilla.org/en-US/).

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, a partially translated version is ok.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5
```

Please don't translate "importance" (and other top metadata).

### Anchors

Some headers have `[#anchor]` at the end, e.g.

```md
## Spread operator [#spread-operator]
```

Please don't translate or remove the `[#...]` part, it's for URL anchors.

## Running locally

You can run the tutorial server locally to see how the translation looks.

The server and install instructions are at <https://github.com/javascript-tutorial/server>. 
♥  
Ilya Kantor @iliakan
