
Cevaplar:

1. `true`. 

    `Rabbit.prototype` ataması `[[Prototype]]`'I ayarlasada bu yeni objelerde etki eder. Var olanlarda bir değişikliğe neden olmaz.
    

2. `false`. 

<<<<<<< HEAD
    Objeler referanslar ile atanır. `Rabbit.prototype`'tan alınan obje kopya değildir, hala hem `Rabbit.prototype` hem de `rabbit`'in `[[Prototype]]`'ı tarafından referans edilir.
    
    Bundan dolayı referans edilen herhangi bir yerden içeriik değişirse bu diğerini de etkiler.
    
=======
    Objects are assigned by reference. The object from `Rabbit.prototype` is not duplicated, it's still a single object referenced both by `Rabbit.prototype` and by the `[[Prototype]]` of `rabbit`. 

    So when we change its content through one reference, it is visible through the other one.

>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
3. `true`.

    Tüm  `delete` operasyonları objeye doğrudan etki eder. Mesela `delete rabbit.eats` `rabbit`'ten `eats` özelliğini silmeye çalışır fakat yapaz. Bundan dolayı bu operasyonun hiç bir etkisi olayacaktır.
    
4. `undefined`.

    `eats` prototip'ten silindiğinden dolayı artık bir etkisi olmayacaktır.