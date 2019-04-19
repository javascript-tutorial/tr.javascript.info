
1. `__proto__`'yu ekleyelim:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

3. Modern JavaScript motorlarında, bir özelliği objeden veya prototypetan almasının bir farklılığı yoktur. Özelliğin nerede olduğunu hatırlar ve bunu bir sonraki talepte tekrar kullanabilirler.

    Örneğin, `pockets.glasses` `glasses`'ı nerede bulduğunu hatırlar. Bu durumda `glasses` `head`'de bulundu, bir sonraki sefere doğrudan orada arayacaktır. Ayrıca kodda herhangi bir değişiklik olduğunda kendi önbelleğini siler böylece optimizasyon güvenli olur.