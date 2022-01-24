importance: 5

---

# Finally veya sadece kod?

Aşağıdaki iki kod parçacığını karşılaştırınız.

1. İlki `finally` ile `try..catch`'den sonra kod çalıştırmaktadır:

    ```js
    try {
      bir şeyler çalıştır
    } catch (e) {
      hatalarla uğraş
    } finally {
    *!*
      temizlik yap
    */!*
    }
    ```
2. İkinci bölümde ise temizliği doğrudan `try..catch` sonrasında yap:

    ```js
    try {
      bir şeyler çalıştır
    } catch (e) {
      hatalarla uğraş
    }

    *!*
    temizlik yap
    */!*
    ```

Bu temizlik olayını iş başladıktan sonra bir şekilde hata olsa da olmasa da yapmamız gerekmekte.

Burada `finally` kullanılmasının bir anlamı var mı? Anlamı var ise bir örnek ile açıklayınız.