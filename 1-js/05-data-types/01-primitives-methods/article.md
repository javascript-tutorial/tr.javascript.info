# İlkel Tiplerin Metodları

<<<<<<< HEAD
JavaScript ilkel tiplerin(karakter dizisi, sayılar vs.) karakter gibi kullanılmasına olanak verir.

Ayrıca bunların metodlarının çağırılabilmesini sağlar. Az sonra da gösterileceği gibi, aslında bu ilkel tipler obje değillerdir. (İlerleyen zamanlarda bu daha açık bir şekilde görülecektir.)
=======
JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we'll see how it works because, of course, primitives are not objects (and here we will make it even clearer).
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

İlkel tipler ile objeler arasındaki farka bakılacak olursa:

İlkel tip:
- 7 tane ilkel tip vardır: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` ve `undefined`.

<<<<<<< HEAD
Obje:
- Birçok değeri özellikleri içerisinde saklayabilir.
- `{}` şeklinde, örneğin `{isim:"Kemal", yas:30}` gibi. JavaScript'te fonksiyonlar gibi başka türde de objeler bulunmaktadır.
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Objeler için ön önemli özelliklerden birisi de fonksiyonları özellikleri içerisinde tutabilmeleridir:

```js run
let kemal = {
  isim: "Kemal",
  selamVer: function() {
    alert("Selam Dostum!");
  }
};

kemal.selamVer(); // Selam Dostum!
```

`kemal` isminde bir obje ve `selamVer` adında bir metod yukarıdaki gibi tanımlanabilir.

Çoğu var olan objeler, tarih, hatalar, HTML elementleri kendine has metodlara sahiptirler.

Tabi bu farklılığın bir maliyeti var!

Objeler ilkellere göre daha "ağırdırlar". Daha fazla kaynak gerektirirler. Fakat özellikler ve metodlar çok önemli olduklarından JavaScript motoru bunları olabildiğince optimize eder.

<<<<<<< HEAD
## Obje olarak ilkel tipler
=======
Objects are "heavier" than primitives. They require additional resources to support the internal machinery.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Burada JavaScript'i oluşturan kişiler ikilem ile karşılaşmışlardır:

- Karakter dizisi veya sayı gibi ilkel tipler ile bir çok şey yapılmak istenebilir. Bunlara metod eklenmesine izin vermek harika olur.
- İlkel tipler olabildiğince hızlı olmalıdır.

Çözüm biraz garip :

1. İlkel tipler hala ilkel tip olarak kalacak. Tek bir değer istendiği gibi atanabilecek.
2. Karakter dizisi, sayı, boolean ve sembollerin metodlarına izin verilecek.
3. Bu yapıldığı yani bu metodlara erişilmeye çalışıldığında özel bir "obje kabı" yaratılacak ve bunun içinde farklı fonksiyonalite eklenebilecek veya silinebilecek.

"Obje Kapları"(Object wrappers) her ilkel tip için farklıdır bunlar: `String`, `Number`, `Boolean` ve `Symbol` şeklindedir. Hepsinin kendine has metodları vardır.

Örneğin [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)  bir stringdeki karakterlerin hepsini büyük harfe çevirir.

<<<<<<< HEAD
=======
For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Çalışması şu şekilde:

```js run
let str = "Merhaba";

alert( str.toUpperCase() ); // MERHABA
```

Basit değil mi? `str.toUpperCase()` çağırıldığında sırası ile aşağıdakiler olmaktadır.

1. Karakter dizisi `str` ilkel bir tiptir. Bundan dolayı özelliğine erişilmek istendiğinde aynı karakter dizisine sahip bir obje yaratılır. Bu objenin `toUpperCase()` gibi kullanışlı metodları bulunmaktadır.
2. Bu metod yeni bir karakter dizisi döndürür ve bu `alert` içinde gösterilir.
3. Özel yaratılan obje imha edilir, `str` eski ilkel haline döner.

Yani ilkel tipler metodları sağlamış olur fakat yine de "hafif" bir şekilde varlığını sürdürür.

JavaScript motoru bu işlemleri en uygun hale getirmektedir. Belki ekstra bir objenin yaratılmasını tamamen pas geçebilir. Fakat yine de sanki yaratılmış gibi davranması gerekmektedir.

Sayılar da kendine has metodlara sahiptir. Örneğin [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) sayıyı yuvarlamaya yarar:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```
<info:number> ve <info:string> bölümlerinde daha fazla metod işlenecektir..


````warn header="`String/Number/Boolean` gibi yapıcılar sadece içte kullanım içindir"

<<<<<<< HEAD
Java gibi bazı diller bu obje kapsayıcıları doğrudan tanımlamanıza izin verir. Örneğin `new Number(1)` veya `new Boolean(false)` gibi
=======
````warn header="Constructors `String/Number/Boolean` are for internal use only"
Some languages like Java allow us to explicitly create "wrapper objects" for primitives using a syntax like `new Number(1)` or `new Boolean(false)`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

JavaScript'te de bu eskiden kalma özelliklerden dolayı mümkündür, fakat **önerilmez**. Bir örnek verilecek olursa:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```
`sifir` karşılaştırmalarında sorunla yaratabilir:

```js run
let sifir = new Number(0);

if (sifir) { // burada sıfır true gelecek çünkü o bir obje
  alert( "Sıfır doğru mu??? );
}
```
Diğer bir yandan `new` olmadan `String/Number/Boolean` kullanılması ise tamamen mantıklıdır. Değeri belirtilen `ilkel`  tipe çevirmeye yarar.

Örneğin:
```js
let num = Number("123"); // karakteri sayıya çevir.
```
````

````warn header="null/undefined'ın metodları yoktur."

`null` ve `undifined`'ın "obje kabı" yoktur. Bundan dolayı metodları bulunmaz. Böyle baklıdığında bunlara "en ilkel tip" denebilir.

Böyle bir değişkenin özelliğine erişmeye çalışmak hata dödürür:

```js run
alert(null.test); // hata
````

## Özet

- `null` ve `undefined` haricindeki ilkel tipler işe yarar metodların kullanılmasına izin verir. 
- Şeklen, bu metodlar geçici objelerle çalışır, fakat JavaScript motorları çok etkin bir şekilde çalıştıklarından bu çağrılar masraflı değildir.
