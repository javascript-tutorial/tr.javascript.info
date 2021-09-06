importance: 5

---

# Obje tanımında "this" kullanamak.

Aşağıda `kullaniciOlustur` obje döndermektedir.

`ref`'e ulaşıldığında ne döner? Neden?

```js
function kullaniciOlustur() {
  return {
    isim: "İhsan",
    ref: this
  };
}

let kullanici = kullaniciOlustur();

alert( kullanici.ref.isim ); // Sonuç nedir?
```
