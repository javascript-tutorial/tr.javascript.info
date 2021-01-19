
# URL yapısı


Yerleşik [URL](https://url.spec.whatwg.org/#api) sınıfı, URL'leri oluşturmak ve ayrıştırmak için uygun bir arayüz sağlar.

Tam olarak bir `URL` nesnesi gerektiren ağ oluşturma yöntemi yoktur, dizeler(strings) yeterince iyidir. Yani teknik olarak `URL` kullanmak zorunda değiliz. Ama bazen gerçekten yardımcı olabilir.

##  URL oluşturma

Yeni bir URL nesnesi oluşturmak için sözdizimi:

```js
new URL(url, [base])
```

- **`url`** -- URL'nin dizesi veya yolu (temel ayarlanmışsa, aşağıya bakın).
- **`base`** -- isteğe bağlı, base ayarlanmış ve `url`'de yalnızca yol varsa bu durumda URL `base`'e göre yani tabana göre oluşturulur.

Örneğin, bu iki URL aynı:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Mevcut URL'ye göre bir yola ata:

```js run
let url = new URL('https://javascript.info/profile/admin');
let testerUrl = new URL('tester', url);

alert(testerUrl); // https://javascript.info/profile/tester
```

`URL` nesnesi, bileşenlerine anında erişmemizi sağlar, bu nedenle URL'yi ayrıştırmanın güzel bir yoludur.

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

İşte kopya kağıdı:

![](url-object.svg)

- `href` tam url, `url.toString()` ile aynı
- `protocol` iki nokta üst üste karakteri ile biter `:`
- `search` - bir dizi parametre, soru işaretiyle başlar `?`
- `hash` karma karakterle başlar `#`
- HTTP kimlik doğrulaması varsa `user` ve `password` özellikleri de vardır.


```smart header="Bir string yerine her yerde `URL` kullanabiliriz"
`fetch` veya `XMLHttpRequest`'te, bir string url'nin beklendiği hemen hemen her yerde bir `URL` nesnesi kullanabiliriz.

Yöntemlerin büyük çoğunluğunda otomatik olarak bir stringe dönüştürülür.


## Arama Parametreleri "?..."

Verilen arama parametreleriyle bir url oluşturmak istediğimizi varsayalım, örneğin, `https://google.com/search?query=JavaScript`.

Latin olmayan karakterleri, boşlukları vb. içerecek şekilde doğru kodlanmaları gerekir.

Bir süre önce, `URL` nesneler ortaya çıkmadan önce yerleşik işlevleri kullanırdık encodeURIComponent/decodeURIComponent. Bazı sorunları var ama artık bu önemli değil.

Bunun için URL özelliği var: `url.searchParams` bu [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) türünde bir nesnedir.

Arama parametreleri için uygun yöntemler sağlar:

- **`append(name, value)`** -- parametre ekleme,
- **`delete(name)`** -- parametreyi silme,
- **`get(name)`** -- parametreyi alma,
- **`getAll(name)`** -- bu isimdeki tüm parametreleri al (eğer çoksa örnek: `?user=John&user=Pete`),
- **`has(name)`** -- parametrenin varlığını kontrol etme,
- **`set(name, value)`** -- parametreyi ayarlama / değiştirme,
- **`sort()`** -- parametreleri ada göre sırala, nadiren gerekli...

Dolayısıyla `URL` nesnesi, url parametreleri üzerinde çalışmanın kolay bir yolunu da sağlar.

Örneğin:

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('query', 'test me!'); // added parameter with a space and !

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // add param for date range: past year

alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // query=test me!, then tbs=qdr:y
}
```
