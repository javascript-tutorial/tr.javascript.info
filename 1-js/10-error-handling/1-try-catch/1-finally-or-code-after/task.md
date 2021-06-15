importance: 5

---

# Finally veya sadece kod?

Aşağıdaki iki kod parçacığını karşılaştırınız.

<<<<<<< HEAD
1. İlki `finally` ile `try..catch`'den sonra kod çalıştırmaktadır:

    ```js
    try {
      birşeyler çalıştır
    } catch (e) {
      hatalarla uğraş
=======
1. The first one uses `finally` to execute the code after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    } finally {
    *!*
      temizlik yap
    */!*
    }
    ```
<<<<<<< HEAD
2. İkinci bölümde ise temizliği doğrudan `try..catch` sonrasında yap:

    ```js
    try {
      birşeyler çalıştır
    } catch (e) {
      hatalarla uğraş
=======
2. The second fragment puts the cleaning right after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    }

    *!*
    temizlik yap
    */!*
    ```

Bu temizlik olayını iş başladıktan sonra bir şekilde hata olsa da olmasa da yapmamız gerekmekte.

Burada `finally` kullanılmasının bir anlamı var mı? Anlamı var ise bir örnek ile açıklayınız.