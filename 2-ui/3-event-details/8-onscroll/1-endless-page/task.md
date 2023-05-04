importance: 5

---

# Sonsuz sayfa

Sonsuz bir sayfa oluşturun. Ziyaretçi sayfayı sonuna kadar kaydırığında metnin sonuna otomatik olarak güncel tarih-saat eklenir (böylece ziyaretçi daha fazla kaydırabilir).

Örnekteki gibi:

[iframe src="solution" height=200]

Lütfen kaydırmanın iki önemli özelliğine dikkat edin:

1. **Kaydırma "esnektir".** Bazı tarayıcılarda / cihazlarda belge başlangıcından veya sonundan biraz öteye kaydırabiliriz (altında boşluk görüntülenir ardından belge otomatik olarak normale "geri döner").
2. **Kaydırma "belirsizdir".**  Sayfa sonuna kaydırdığımızda gerçek belgenin altından 0-50 piksel kadar uzakta olabiliriz.

Dolayısıyla, "sonuna kadar kaydırma" ziyaretçinin belgenin sonundan 100 pikselden daha fazla uzaktlıkta olmadığı anlamına gelmelidir.

Not: Gerçek hayatta "daha fazla mesaj" veya "daha fazla ürün" göstermek isteyebiliriz.
