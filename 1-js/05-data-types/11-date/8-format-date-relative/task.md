importance: 4

---

# Bağık tarihin formatlanması

`formatTarih(tarih)` adında bir fonksiyon yazınız, bu `tarih`'i aşağıdaki gibi formatlamalıdır:

- Eğer `tarih` 1 sn'den önce geçiyse `"şimdi"` yazmalıdır.
- Eğer, eğer 1 dk önce geçtiyse `"n. saniye önce"` yazılmalıdır.
- Eğer, bir saatten önce geçtiyse `"m. dakika önce"` yazılmalıdır.
- Diğer türlü tüm tarihi `"DD.MM.YY HH:mm"` formatında yazmalıdır. Bu : `"gun.ay.yıl saat:dakika"` formatıdır. Örneğin : `31.12.16 10:00`.

Örneğin:

```js
alert( formatTarih(new Date(new Date - 1)) ); // "şimdi"

alert( formatTarih(new Date(new Date - 30 * 1000)) ); // "30 saniye önce"

alert( formatTarih(new Date(new Date - 5 * 60 * 1000)) ); // "5 dakika önce"

// dün için gün 31.12.2016, 20:00
alert( formatTarih(new Date(new Date - 86400 * 1000)) );
```
