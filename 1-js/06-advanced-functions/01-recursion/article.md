# Kendini tekrarlayan ( özçağrı )  ve yığın

Bu bölümde fonksiyonlar daha derinlemesine incelenecektir.

İlk konu *özçağrı*  olacaktır.

Eğer daha önce program yazdıysanız bir sonraki bölüme geçebilirsiniz.

Öz çağrı bir programlama desenidir. Bu desen bir görevin aynı türde daha basit görevcikler haline getirilmesini sağlar. Veya bir görev daha kolay aksiyonlara ve aynı şekilde görevlere dönüştürülebildiğinde, veya daha sonra göreceğiniz gibi, belirli veri yapılarında kullanılabilir.

Bir fonksiyon problemi çözerken birçok farklı fonksiyonu çağırabilir. Bu özel durumda ise fonksiyon *kendisini* çağırır. Bu olaya *özçağrı*, *recursion* denir.

## Çift yönlü düşünme
Başlangıçta `us(x,n)` adında bir fonksiyon olsun ve bu `n` üssü `x` i hesaplasın. Diğer bir ifadeyle `x`'i `n` defa kendisiyle çarpsın.

```js
us(2, 2) = 4
us(2, 3) = 8
us(2, 4) = 16
```

Bunu uygulamanın iki yolu bulunmaktadır.

1. Tekrarlı düşünürseniz: `for` döngüsü:

    ```js run
    function us(x, n) {
      let sonuc = 1;
      // x'in x defa kendisiyle çarpımı.
      for(let i = 0; i < n; i++) {
        sonuc *= x;
      }

      return sonuc;
    }

    alert( us(2, 3) ); // 8
    ```

2. Özçağrı: işi daha basite indirgeyerek kendisini çağırsın:

    ```js run
    function us(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * us(x, n - 1);
      }
    }

    alert( us(2, 3) ); // 8
    ```

Dikkat ederseniz özçağrı fonksiyonu aslen farklıdır.
`us(x,n)` çağrıldığında çalıştırılma iki dala ayrılır.

```js
              if n==1  = x
             /
us(x, n) =
             \       
              else     = x * us(x, n - 1)
```

1. Eğer `n==1` ise geriye kalanlar önemsizdir. Buna *temel* özçağrı denir, çünkü bu belirli bir sonucu çıktı verir: `us(x,1)` eşittir `x` 

2. Diğer türlü `us(x,n)` `x*us(x,n-1)` şeklinde ifade edilebilir. Matematiksel olarak <code>x<sup>n</sup> = x * x<sup>n-1</sup></code> şeklinde ifade edilebilir. Buna *öztekrar basamağı* denir. Görev daha küçük aksiyonlara ( `x` ile çarpma ) indirgenmiş olur. Ayrıca aynı görevi daha basit görevlerle ( `us`'ün daha küçük `n` değeri) indirgenmiş oldu. Bir sonraki sitep ise bunun daha basite indirgene indirgene `n`'in `1` e ulaşmasını sağlamaktır.

Buna `us` *öz çağrı ile* kendisini `n==1` olana kadar çağırır diyebiliriz.

<<<<<<< HEAD
![özçağrı diyagramı](recursion-pow.svg)
=======
![recursive diagram of pow](recursion-pow.svg)
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a


`us(2,4)`'ü hesaplayabilmek için *özçağrı* şu adımları gerçekleştirir:

1. `us(2, 4) = 2 * us(2, 3)`
2. `us(2, 3) = 2 * us(2, 2)`
3. `us(2, 2) = 2 * us(2, 1)`
4. `us(2, 1) = 2`


*özçağrı* böylece fonksiyon çağrılarını dah abasite indirgemiştir. Daha sonra daha basite ve en sonunda sonuç belirli olana kadar devam etmiştir.

````smart header="Özçağrı genelde tekrarlı olana göre daha kısadır"

Aşağıda aynı fonksiyonun `?` ile tekrar yazılmış hali bulunmaktadır. 

```js run
function us(x, n) {
  return (n == 1) ? x : (x * pow(x, n-1));
}
```
````
Maksimum iç içe çağırma sayısına *özçağrı derinliği* `us` fonksiyonunda bu `n`'dir.

<<<<<<< HEAD
JavaScript motorları maksimum özçağrı derinliğini sınırlamaktadır. Bazı motorlarda 10000, bazılarında 100000 limiti bulunmaktadır. Bunun için otomatik optimizasyonlar bulunmaktadır. Fakat yine de her motorda desteklenmemektedir ve çok basit durumlarda kullanılır.
=======
The maximal number of nested calls (including the first one) is called *recursion depth*. In our case, it will be exactly `n`.

The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000, some engines allow more, but 100000 is probably out of limit for the majority of them. There are automatic optimizations that help alleviate this ("tail calls optimizations"), but they are not yet supported everywhere and work only in simple cases.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Bu özçağrı uygulamalarını limitler, fakat yine de çoğu yerde kullanılmaktadırlar. Çoğu görevde özçağrı şeklinde düşünmek daha basit ve sürdürülebilir bod yazmanızı sağlayacaktır.


## Çalıştırma Yığını

Peki *özçağrılar* nasıl çalışır. Bunun için fonksiyonların içinde ne yaptıklarına bakmak gerekmektedir.

Çalışan fonksiyon hakkında bilgi *çalıştırma kaynağında* tutulur.

[Çalıştırma Kaynağı -  Execution Context](https://tc39.github.io/ecma262/#sec-execution-contexts) fonksiyonun çalışması hakkında detayları tutan dahili bir veri yapısıdır: Kontrol akışı nerede, o anki değişkenlerin değeri, `this` neye denk gelir ve bunun gibi detaylar dahili detaylar tutar.

Her fonksiyon çağrısı kendine ait çalıştırma kaynağı tutar.

Eğer bir fonksiyon içeride başka bir çağrı yaparsa şunlar olur:

- O anki fonksiyon durur.
- Bu fonksiyon ile ilintili çalışma kaynağı *çalışma kaynağı yığını* veri yapısı şeklinde kaydedilir.
- Dallanılan çağrı çalıştırılır.
- Bu işlem bittikten sonra çalışma kaynağı yığınından daha önceki çalışmakta olan yer geri alınır, böylece fonksiyon kaldığı yerden görevini tamamlayabilir.

Aşağıda `us(2,3)`'ün çalışması gösterilmiştir.

### us(2, 3)

`us(2,3)` çağrısının başlangıcında, çalışma kaynağı değişkenleri `x=2,n=3` olacak şekilde tutar. Çalışma şu anda birinci satırdadır. 

Bu aşağıdaki gibi gösterilebilir:
<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Çalışma kaynağı: { x: 2, n: 3, birinci satırda }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

<<<<<<< HEAD
Ardından fonksiyon çalışmaya başlar. `n==1` şartı yanlıştır, bundan dolayı ikinci `if`'e geçer.
=======
That's when the function starts to execute. The condition `n == 1` is falsy, so the flow continues into the second branch of `if`:
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

```js run
function us(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * us(x, n - 1);
*/!*
  }
}

alert( us(2, 3) );
```

Değişkenler aynı fakat satır değiştir, şimdiki kaynak şu şekilde:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 3, 5. satırda }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

`x*pow(x, n-1)`'i hesaplayabilmek için `us` fonksiyonuna `us(2,2)` şeklinde yeni bir çağrı yapılmalıdır.

### us(2, 2)

Dallanma işleminin yapılabilmesi için JavaScript'in öncelikle o anki çalışma durumunu *çalışma kaynağı yığını*na atması gerekmektedir.

Burada `us` fonksiyonu çağrılmıştır. Bu herhangi bir fonksiyon da olabilirdi, aralarında bu yönden hiç bir farklılık bulunmamaktadır:

1. O anki kaynak yığının en üstüne "hatırlatılır"
2. Alt çağrı için yeni bir kaynak yaratılır.
3. Alt çağrılar bittiğinde -- bir önceki kaynak yığından alınır ve çalışmasına devam eder.

Aşağıda `pow(2,2)` altçağrısına girildiğinde kaynak yığınının durumu gösterilmektedir.

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 2, 1. satırda }</span>
    <span class="function-execution-context-call">us(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 3, 5. satırda }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

Üst tarafta o anda çalışan kaynak ( kalın harflerle ), alt tarafta ise "hatırlatılan" kaynak bulunmaktadır.

<<<<<<< HEAD
Altçağrı bittiğinde, daha önceki kalınan kaynaktan devam etmek kolaydır. Çünkü bu her iki değişkeni ve kaldığı satırı tutmaktadır. Burada "satır" denmesine rağmen aslında bunun daha net birşey olduğu bilinmelidir.
=======
When we finish the subcall -- it is easy to resume the previous context, because it keeps both variables and the exact place of the code where it stopped.

```smart
Here in the picture we use the word "line", as in our example there's only one subcall in line, but generally a single line of code may contain multiple subcalls, like `pow(…) + pow(…) + somethingElse(…)`.

So it would be more precise to say that the execution resumes "immediately after the subcall".
```
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

### us(2, 1)

İşlem tekrar ediyor: `5.` satırda yeni bir altçağrı yapılmaktadır, argümanlar ise `x=2`, `n=1` şeklindedir.

Yeni çalışma yığını oluşturur, bir önceki yığının üstüne itelenir. 
A new execution context is created, the previous one is pushed on top of the stack:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 1, 1. satır }</span>
    <span class="function-execution-context-call">us(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 2, 5. satır }</span>
    <span class="function-execution-context-call">us(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 3, 5.satır }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

Şu anda 2 eski kaynak ve 1 tane çalışmakta olan kaynak bulunmaktadır `us(2,1)`


### Çıkış
`us(2,1)` çalışırken diğerlerinin aksine `n==1` şartı sağlanır, bundan dolayı ilk defa birinci `if` çalışır.

```js
function us(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * us(x, n - 1);
  }
}
```
Daha fazla dallanan çağrı olmadığından dolayı fonksiyon sona erer ve değeri döner.

Fonksiyon bittiğinden dolayı, çalışma kaynağına gerek kalmamıştır ve dolayısıyla hafızadan silinir. Bir önceki yığından alınır:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 2, 5. satırda }</span>
    <span class="function-execution-context-call">us(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 3, 5. satırda }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

`us(2,2)` nin çalışması devam etti. `us(2,1)`'in sonucuna sahip olduğundan `x * us(x,n-1)`'in sonucunu bulabilir, bu da `4`'tür.

Ardından bir önceki kaynak geri yüklenir:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kaynak: { x: 2, n: 3, 5. satırda }</span>
    <span class="function-execution-context-call">us(2, 3)</span>
  </li>
</ul>

İşlemler bittiğinde, `us(2,3) = 8` sonucu alınır.

Bu durumda özçağrı derinliği **3**tür

Yukarıda da görüldüğü üzere, özçağrı derinliği yığındaki kaynak sayısı demektir. Bu drumda `n`'in üssü değiştirildiğinde daha fazla hafıza kullanacaktır.

Döngü bazlı algoritma daha az hafıza kullanacaktır:

```js
function us(x, n) {
  let sonuc = 1;

  for(let i = 0; i < n; i++) {
    sonuc *= x;
  }

  return sonuc;
}
```

Tekrar eden `us` fonksiyonu `i` ve `sonuc` kaynağını kullanır ve sürekli bunları değiştirir. Hafıza gereksinimleri oldukça azdır ve bu hafıza büyüklüğü `n`'e bağlı değildir.

**Tüm özçağrılar döngü olarak yazılabilir. Döngü versiyonu daha az kaynak gerektirecektir**

... Bazen yeniden yazmak çok kolay değildir, özellikle fonksiyon alt çağrılarda özçağrı kullanıyorsa, bu çağrılar sonucunda daha karmaşık dallanmalar oluyor ise optimizasyon değmeyebilir.

Özçağrı fonksiyonun daha kısa kod ile yazılmasını sağlar, ayrıca anlaşılmayı da kolaylaştırır. Optimizasyon her yerde gerekli değildir, genelde iyi kod gereklidir, bunun için kullanılır.

## Özçağrı Akışı

Özçağrıların kullanılabileceği diğer bir uygulama özçağrı akışıdır.

Bir firma hayal edin. Çalışanların yapısı obje olarak şu şekilde tanımlanabilir:

```js
let firma = {
  satis: [{
    adi: 'Ahmet',
    maasi: 1000
  }, {
<<<<<<< HEAD
    adi: 'Mehmet',
    salary: 150
=======
    name: 'Alice',
    salary: 1600
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
  }],

  gelistirme: {
    siteler: [{
      adi: 'Mustafa',
      ucret: 200
    }, {
      adi: 'Mazlum',
      ucret: 50
    }],

    dahili: [{
      adi: 'Zafer',
      ucret: 1300
    }]
  }
};
```
Diğer bir deyişle bu firmanın departmanları bulunmaktadır.

- Bir departman çalışanlar dizilerinden oluşabilir. Öreğin `satis` departmanı 2 tane çalışana sahiptir: Ahmet ve Mehmet.
- Veya bazen departmanlar alt departmanlara ayrılabilirler. Örneğin `gelistirme` departmanı `siteler` ve `dahili` olmak üzere ikiye ayrılmıştır. Her bir alt departmanın kendine ait çalışanları vardır.
- Bunun yanında departmanların büyüyüp alt departmanlara ayrılması da mümkündür.

    Örneğin `siteler` departmanı ileride iki ayrı takıma `siteA` ve `siteB` şeklinde ayrılabilirler. Ve yine potansiyele göre ileride bu takımlar da alt takımlara ayrılabilirler.

Öyle bir fonksiyon olsun ki tüm çalışanların maaşlarının toplamını dönsün. Bu nasıl yapılır?


<<<<<<< HEAD
Döngü yaklaşımı kolay değildir, çünkü yapı kolay değildir. Önce `firma` için bir `for` döngüsü kullanıldığını ve bununla ilk seviye departmanları bulduğunuzu varsayın. Sonrasında bunun içine bir döngü daha yapıp `siteler`'i bulmanız gerekir. Ayrıca ilerisi için bir tane daha `for` döngüsü yapmanız lazım ve belki yine onun içerisine de bir döngü koymanız lazım. 3. basamakta mı 4. basamakta mı durmalı? Eğer ileride bu yapı sadece bir seviyeye indirilirse kodda karmaşıklık meydana gelir.
=======
An iterative approach is not easy, because the structure is not simple. The first idea may be to make a `for` loop over `company` with nested subloop over 1st level departments. But then we need more nested subloops to iterate over the staff in 2nd level departments like `sites`... And then another subloop inside those for 3rd level departments that might appear in the future? If we put 3-4 nested subloops in the code to traverse a single object, it becomes rather ugly.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Özçağrı yaklaşımıyla.

Fonksiyon toplanacak departmanı aldığında iki muhtemel durum mevcuttur:

<<<<<<< HEAD
1. Bu "basit" bir departman olabilir *içerisinde çalışanlar bulunur* -- sonra bunların maaşları basit bir döngüyle toplanabilir.
2. Veya *`N` alt departmana sahip obje* olabilir - öyleyse `N` defa özçağrı yapıp her bir alt departmanın toplamının sonucunu döndürülür.

(1) özçağrının temelidir.

(2) Özçağrının tekrar eden adımlarıdır. Karmaşık görev daha küçük departman görevlerine ayrılır. Sonrasında yine ayrılabilir fakat en sonunda (1)'e erişecektir.
=======
1. Either it's a "simple" department with an *array* of people -- then we can sum the salaries in a simple loop.
2. Or it's *an object* with `N` subdepartments -- then we can make `N` recursive calls to get the sum for each of the subdeps and combine the results.

The 1st case is the base of recursion, the trivial case, when we get an array.

The 2nd case when we get an object is the recursive step. A complex task is split into subtasks for smaller departments. They may in turn split again, but sooner or later the split will finish at (1).
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Algoritma kodunu okumak oldukça kolaydır:


```js run
<<<<<<< HEAD
let firma = {
  satis: [{
    adi: 'Ahmet',
    maasi: 1000
  }, {
    adi: 'Mehmet',
    salary: 150
  }],

  gelistirme: {
    siteler: [{
      adi: 'Mustafa',
      ucret: 200
    }, {
      adi: 'Mazlum',
      ucret: 50
    }],

    dahili: [{
      adi: 'Zafer',
      ucret: 1300
    }]
=======
let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
  }
};

// İşi yapan fonksiyon
*!*
function maaslariTopla(firma) {
  if (Array.isArray(firma)) { // (1). durum
    return firma.reduce((onceki, suanki) => onceki + suanki.salary, 0); // diziyi topla
  } else { // (2.) durum
    let toplam = 0;
    for(let altDep of Object.values(altDep)) {
      sum += maaslariTopla(altDep); // özçağrı ile alt departmanların çağrılması, bunu sum ile topla.
    }
    return sum;
  }
}
*/!*

<<<<<<< HEAD
alert(maaslariTopla(firma)); // 2700
=======
alert(sumSalaries(company)); // 7700
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
```
Kod oldukça kısa ve anlaması kolay(umarım). Burada özçağrının gücünden bahsetmek mümkün, her seviye alt departman için çalışacaktır.

Aşağıda ise bu çağrının diyagramı bulunmaktadır.

![Özçağrı ile maaşlar](recursive-salaries.svg)

<<<<<<< HEAD
Prensip basitçe şu şekilde açıklanabilir: Obje için `{...}` altçağrıları yapılır, `[...]` ise özçağrı ağacının "yapraklarıdır", anında sonucu dönerler.
=======
![recursive salaries](recursive-salaries.svg)
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Kodun akıllı özellikler kullandığına dikkat edin, bunlar daha önceki kolarda işlenmişti:

-  `arr.reduce` metodu <info:array-methods> bölümünde bir dizinin toplamını almak için kullanılmıştı.
- `for(val of Object.values(obj))` objenin değerlerini dönmek için kullanılmıştı: `Object.values` objenin değerlerini dizi olarak döner.



## Özçağrı yapıları

Özçağrı yapıları, kendini bazı bölümlerde tekrar eden veri yapılarıdır.

Örnekte kullanılan firmalar objesi bu yapıyı kullanmaktadır.

Bir *departman*
- Dizi veya çalışanlardan oluşur.
- Veya *departmanlardan* oluşur.

Web-geliştiricileri için daha bilinen bir örneği: HTML ve XML dökümanlarıdır.

HTML dökümanında, *HTML-tag*'ı şunları içerebilir:
- Metinler
- HTML-yorumları
- Diğer *HTML-tagları* ( bunlar da yine metinler, yorumlar ve diğer tagları içerebilir)

Bu da yine özçağrı yapısıdır.

Daha iyi anlaşılması için "Linked list" yapısı üzerinden gitmek gerekir. Bu bazı durumlarda *dizi*lere alternatif olarak kullanılabilir.

### Linked list

Diyelim objelerin sıralı şekilde liste halinde tutmak istiyorsunuz.


Diziler ile aşağıdaki gibi yapılabilir:

```js
let arr = [obj1, obj2, obj3];
```

... Fakat diziler "eleman silme", "eleman ekle" gibi olaylar için çok işlem yaparlar. Örneğin `arr.unshift(ob)` işlemi tüm elemanları yeni eleman için tekrardan sıraya dizer, eğer dizi büyükse bu zaman alır. Aynısı `arr.shift()` için de geçerlidir.


Tekrardan numaralama gerektirmeyen `arr.push/pop` metodları kullanılabilir. Bunlar da dizinin sonuna ekler veya çıkarır. Çok elemanlı dizilerde bu işlemlerin yavaş olacağı söylenebilir.

Alternatif olarak, eğer hızlı bir şekilde, silme/yerleştirme istenirse diğer bir veri yapısı olan [linked list](https://en.wikipedia.org/wiki/Linked_list) kullanılabilir.


*linked list elemanı* özçağrı biçimde aşağıdaki obje gibi tanımlanır:
- `deger`.
- `sonraki` sonraki *linked list elemanı*'nı tenımlar, sonuncuysa `null` döner.

Örneğin:

```js
let list = {
  deger: 1,
  sonraki: {
    deger: 2,
    sonraki: {
      deger: 3,
      sonraki: {
        deger: 4,
        sonraki: null
      }
    }
  }
};
```
Bu listenin grafiksel gösterimi şu şekildedir:


![linked list](linked-list.svg)

Bu yapıyı yaratmanın alternatif yolu şu şekildedir:

```js no-beautify
<<<<<<< HEAD
let list = { deger: 1 };
list.sonraki = { deger: 2 };
list.sonraki.sonraki = { deger: 3 };
list.sonraki.sonraki.sonraki = { deger: 4 };
=======
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a
```
Burada görüldüğü üzere her obje `deger`e sahiptir ve komşusu olan `sonraki`ni gösterir. `list` değişkeni bu zincirin ilk halkasıdır, sonrasında `sonraki` pointer'ını takip eder.

<<<<<<< HEAD
Liste kolayca birçok parçaya bölünebilir ve sonradan tek bir yapı haline getirilebilir:
=======
Here we can even more clearly see that there are multiple objects, each one has the `value` and `next` pointing to the neighbour. The `list` variable is the first object in the chain, so following `next` pointers from it we can reach any element.

The list can be easily split into multiple parts and later joined back:
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

```js
let ikinciList = list.next.next;
list.next.next = null;
```

<<<<<<< HEAD
![linked list ayırma](linked-list-split.svg)
=======
![linked list split](linked-list-split.svg)
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Birleştirme:

```js
list.next.next = ikinciList;
```
Ve istenildiği gibi elemanlar bir yerden silinebilir veya eklenebilir.

Örneğin yeni bir değer ekleneceği zaman, listenin başlangıcının güncellenmesi gerekir:

```js
let list = { deger: 1 };
list.sonraki = { deger: 2 };
list.sonraki.sonraki = { deger: 3 };
list.sonraki.sonraki.sonraki = { deger: 4 };

*!*
// Yeni bir değer ekleneceği zaman 
list = { deger: "yeni eleman", sonraki: list };
*/!*
```

<<<<<<< HEAD
![linked list](linked-list-0.svg) 
=======
![linked list](linked-list-0.svg)
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Yine ortalardan bir yerden veri silineceği zaman `sonraki`'nin bir öncekine getirilmesi gerekri.

```js
list.sonraki = list.sonraki.sonraki;
```

![linked list](linked-list-remove-1.svg)
<<<<<<< HEAD
=======

We made `list.next` jump over `1` to value `2`. The value `1` is now excluded from the chain. If it's not stored anywhere else, it will be automatically removed from the memory.

Unlike arrays, there's no mass-renumbering, we can easily rearrange elements.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

`list.sonraki`'nin değeri `1`'den `2`'ye geçirildi. `1` değeri artık zincirden çıkarıldı. Eğer bu değer başka bir yerde tutulmuyor ise, bu değer ileride otomatik olarak hafızadan silinecektir.

Diziler gibi çok büyük sayida tekrar numaralama bulunmamaktadır, ve kolayca istenilen eleman istenilen yere koyulur.

Her zaman List diziden daha iyidir denemez. Öyle olsaydı herkes dizi yerine List kullanırdı.

En büyük handikapı List'te istenilen elemana kolayca erişim sağlanamaz. Dizilerde bu oldukça kolaydır: `dizi[n]` doğrudan referans verir. Fakat dizilerde ilk elemandan itibaren `sonraki` şeklinde `N` defa gitmek gerekir.

Fakat çoğu zaman böyle bir işleme ihtiyaç duymayız. Örneğin bir kuyruk ihtiyacı olduğunda hatta [deque](https://en.wikipedia.org/wiki/Double-ended_queue) ihtiyacı olduğunda hızlı bir şekilde baştan veya sondan eleman eklenip silinmesi gerekir.

Bazen `kuyruk` adında bir değişken eklenerek  ( yeni eleman eklendiğinde/çıkarıldığında ) listenin son elemanı takip edilebilir. Büyük dizilerde listeye göre hız oldukça fazladır.

## Özet

Tanımlar:
- *Öz Çağrı*  kendi kendini çağırma fonksiyonu demektir. Böyle fonksiyonlar belirli yapıdaki görevlerin çözülmesini sağlar. 

    Fonksiyon kendisini çağırdığında buna *öztekrar adımı* denir. *temel* ise öz çağrı fonksiyonun argümanının tekrar öz çağrı yapılamayacak kadar basite indirgenmesi olayıdır.
    
-  [Özçağrı yapısı](https://en.wikipedia.org/wiki/Recursive_data_type) kendisini tekrar kullanarak tanımlanan veri yapılarıdır.

    Örneğin, linked list objenin listeyi referans veren bir veri yapısı olarak tanımlanabilir.
    
    ```js
    list = { deger, sonraki -> list }
    ```
    HTML elemanlarının ağacı veya departman ağacı gibi yapılar özçağrı yapısıdır: Bunların dalları ve dallarının yine dalları bulunmaktadır.
    
    *Özçağrı* fonksiyonları `maaslariTopla` fonksiyonunda olduğu gibi elemanların üzerinden geçer.
    
Her özçağrı fonksiyonu tekrarlı şekile getirilebilir. Bazen optimize etmek için kullanılabilir. Fakat çoğu görev için özçağrı çözümleri yeteri kadar hızlı ve yazması kolaydır.