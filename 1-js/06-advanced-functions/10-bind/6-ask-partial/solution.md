

1. Bir saklayıcı fonksiyon ile, daha net olmak gerekirse ok fonksiyonu ile:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```
    Böylece `user` dış değişkenlerden alınır ve normal bir biçimde çalıştırılır.
    
2. Veya `user.login`'den bir kısmi fonksiyon üreterek; Bu fonksiyon kaynak olarak `user` kullanır ve doğru ilk argümana sahiptir.


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
