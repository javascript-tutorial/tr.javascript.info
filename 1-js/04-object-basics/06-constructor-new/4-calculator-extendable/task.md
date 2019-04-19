Önem: 5

---

# Genişletilebilir özellikli hesap makinesi programını yazınız.

Yapıcı `HesapMakinesi` ile "genişletilebilir" hesap makinesi objesi yaratınız.

Bu görev iki bölümden oluşmaktadır.

1. Önce `hesapMakinesi(str)` şeklinde karakter dizisi alan `"1 + 2"`, "SAYI operatör SAYI" şeklinde yazımı olan ve sonucu döndüren bir metod yazınız. Bu `+` ve `-` gibi operatörleri anlayabilmelidir.

    Kullanım örneği:

    ```js
    let hesap = new HesapMakinesi;

    alert( hesap.hesapla("3 + 7") ); // 10
    ```

2. Sonra `operatorEkle(isim,fonksiyon)` adında bir metod ekle ve bu metod hesap makinesine yeni işlemi öğretsin. Bu metod `isim` operatörünü alır ve `fonksiyon(a,b)` yi uygular.
    
    Örneğin `*`,`/` ve `**`(üs) işlemlerini uygulayalım.

    ```js
    let usIslemi = new HesapMakinesi;
    usIslemi.metodEkle("*", (a, b) => a * b);
    usIslemi.metodEkle("/", (a, b) => a / b);
    usIslemi.metodEkle("**", (a, b) => a ** b);

    let sonuc = usIslemi.hesapla("2 ** 3");
    alert( sonuc ); // 8
    ```

- Parantez veya daha karmaşık ifadeler kullanılmayacak.
- Sayılar ve operatör kesinlikle arada bir boşluk olacak şekilde yazılacak.
- Eğer isterseniz hata kontrolü yapabilirsiniz.