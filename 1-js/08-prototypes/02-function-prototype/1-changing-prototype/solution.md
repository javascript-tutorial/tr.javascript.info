
Cevaplar:

1. `true`. 

    `Rabbit.prototype` ataması `[[Prototype]]`'I ayarlasada bu yeni objelerde etki eder. Var olanlarda bir değişikliğe neden olmaz.
    

2. `false`. 

    Objeler referanslar ile atanır. `Rabbit.prototype`'tan alınan obje kopya değildir, hala hem `Rabbit.prototype` hem de `rabbit`'in `[[Prototype]]`'ı tarafından referans edilir.
    
    Bundan dolayı referans edilen herhangi bir yerden içeriik değişirse bu diğerini de etkiler.
    
3. `true`.

    Tüm  `delete` operasyonları objeye doğrudan etki eder. Mesela `delete rabbit.eats` `rabbit`'ten `eats` özelliğini silmeye çalışır fakat yapaz. Bundan dolayı bu operasyonun hiçbir etkisi olayacaktır.
    
4. `undefined`.

    `eats` prototip'ten silindiğinden dolayı artık bir etkisi olmayacaktır.