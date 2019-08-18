
# Promise Zinciri

<info:callbacks> bölümünde bahsettiğimiz probleme tekrar göz atalım. Burada bir seri asenkron görevin ardaşık bir biçimde çağırılması gerekmekte. Örneğin script dosyalarının yüklenmesi. Bunu Promise ile nasıl yapabiliriz?

Promise bize bunu gerçekleştirebilmemiz için bazı yöntemler sunmakta.

Bu bölümde Promise Zinciri'nden bahsedeceğiz.

Şöyle:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

Buradaki yaklaşım, elde edilen sonuçların `.then` zincirinde tekrar işleme alınmasıdır.

Genel akış şu şekilde:
1. İlk Promise 1 saniye içerisinde sonuçlanır `(*)`,
2. Sonrasında ilk `.then` işleyicisi çağrılır  `(**)`.
3. Bu fonksiyondan dönen değer bir sonraki `.then` işleyicisine aktarılır `(***)`
4. ...ve zincirleme süreç böyle işlemeye devam eder.

Sonucun işleyiciler arasında aktarılmasıyla birlikte `alert` fonsiyonlarının çağırıldığını ve sırasıyla `1` -> `2` -> `4` çıktılarını verdiğini görürüz. 

![](promise-then-chain.svg)

`promise.then` çağrısı bir Promise döndürür, böylelikle bir sonraki `.then` işleyicisi çağırılabilir.

İşleyiciden bir değer döndüğünde, bu Promise' in sonucu olur. Böylece bir sonraki `.then` işleyicisi bu değer ile çağrılır. 

Promise Zinciri şöyle başlamakta:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result);
  return result * 2; // <-- (1)

}) // <-- (2)
// .then…
```

`.then` işleyicisinden dönen değer yine Promise' dir, böylece zinciri oluşturacak olan diğer `.then` işleyicileri `(1)` ve `(2)` değerleri üzerinden çağrılabilmektedir. 

**Aşağıda genel olarak yapılan bir hata görülmekte. Tanımlanmış olan Promise objesinin bir değişkene atanıp bunun üzerinden tekil şekilde `.then` işleyicisinin çağırılması bir Promise Zinciri oluşturmaz.**

Örnek:
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

Burada tek bir Promise objesine birden fazla işleyicinin eklenmesi ve bu işleyicilerin birbirleri arasında veriyi aktarmadan, yanlızca ilk dönütü birbirlerinden bağımsız olarak işledikleri görülmektedir. 

Burada durumu niteleyen akışı görebiliriz (bunu yukarıdaki zincir akışını göz önüne alarak inceleyiniz):

![](promise-then-many.svg)

Aynı Promise üzerindeki tüm `.then` işleyicileri yukarıdaki örnekte aynı sonucu vermekte. Yani `alert` fonksiyonu sürekli olarak `1` değerini gösterir.

Genel olarak uygulamalarımızda bir Promise üzerinde birden fazla işleyiciye nadiren ihtiyaç duyulur. Fakat, zincir yapısı ise çok daha sık şekilde kullanılmaktadır. 


## Promise Dönütü

Normal koşullarda `.then` işleyicisinden dönen değer doğrudan sonraki işleyiciye bir parametre olarak aktarılır. Fakat burada bir istisna var.

Şayet dönen değer yine bir Promise ise zincirleme akış bu Promise sonuçlanana dek durur, yeni değerin gelmesini bekler. Sonrasında gelen dönüt bir sonraki `.then` işleyicisine aktarılır.

Örnek:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

Buradaki ilk `.then` işleyicisi `alert` fonksiyonu ile `1` değerini gösterir ve yeni bir Promise objesi oluşturarak döndürür. Bir sonraki `.then` işleyicisi `result` parametresi olarak gönderdiğimiz Promise' i alır. 1000ms sonrasında bu Promise sonuçlanır ve kendi tanım aralığındaki `result` değerini kullanarak `result * 2` değerini döner.`(**)` satırında tanımlanmış olan işleyici içerisindeki `alert` fonksiyonu çalışır ve `2` değerini gösterir.

Sonuç olarak `alert` fonksiyonları birer saniyelik gecikmeyle birlikte sırasıyla 1 -> 2 -> 4 çıktılarını gösterir.

Promise dönütü oluşturabiliyo olmak bize asenkron zincir yapıları oluşturma kolaylığı sağlar.

## Örnek: loadScript

Yukarıda bahsettiğimiz zincir yapısını, önceki bölümlerde tanımladığımız [previous chapter](/promise-basics#loadscript) örneğindeki içeriği kullanmak için tanımlayalım:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // scriptlerde tanımlı fonksiyonların
    // yüklendiğini doğrulamak için çağıralım
    one();
    two();
    three();
  });
```

Arrow fonksiyon notasyonu kullanılarak daha kısa bir biçimde şöyle de yazılabilir:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scriptler yüklendi, fonksiyonlar artık çağrılabilir
    one();
    two();
    three();
  });
```
Burada her `loadScript` çağrısı bir Promise döndürmekte ve takip eden `.then` işleyicisi bu Promise değeri ortaya çıktığında çalışmakta. Böylelikle scriptler birbiri ardına yüklenebilmekte.

Yukarıdaki kod bloğunun halen sade bir yapı halinde olduğuna da dikkat etmekte fayda var. Kod bloğu sağ tarafa doğru değil aşağı yönde genişleme göstermekte. Burada herhangi bir şekilde "kıyamet piramidi / callback cehennemi" yapısının oluşmadığını görebiliriz.

`.then` işleyicisini doğrudan `loadScript` fonksiyonu üzerinden de çağırabiliriz:

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // script1, script2 ve script3 parametrelerine erişilebilir
      one();
      two();
      three();
    });
  });
});
```

Burada yukarıda bahsettiğimiz büyüme yönü bu kod bloğunda sağa doğru olmakta. Yani callback ile yaşadığımız sorunlar burada da oluşmaya başlayacaktır.

Promise yapısını yeni kullanmaya başlayan kişiler bazen zincir yapısı hakkında fikir sahibi olmadıkları için yukarıdaki kod bloğuna benzer bir yapı kurabilirler. Fakat bu da kodun okunabilirliğini/sürdürülebilirliğini azaltmaktadır. Bundan dolayı zincir yapısının kullanımı tercih edilmelidir.

Fakat bunun da istisnai olarak kullanılması gereken durumlar ortaya çıkabilmektedir. Örneğin; `script1`, `script2` ve `script3` parametrelerine en içteki işleyiciden erişilmesi gereken bir durumun oluşabilmesi gibi.


````smart header="Thenable"
`.then` işleyicisi herhangi bir "thenable" obje döndürebilir ve bu, aynı bir Promise objesi gibi işlem görür.

Bir "thenable" objesi, üzerinde `.then` metodu tanımlı herhangi bir objedir.

Buradaki düşünce, 3. parti kütüphanelere kendi Promise uyumlu objelerini geliştirebilme esnekliği sunmaktır. Bu kütüphaneler kendi istekleri doğrultusunda farklı metodları objelerine ekleyebilirler.

Aşağıda bir "thenable" obje örneği mevcut:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // this.num*2 değerini 1 saniye sonra çözümle
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 2 değerini 1000ms sonra gösterir
```
JavaScript `(*)` olan satırda `.then` tarafından dönen objeyi kontrol eder: eğer bu obje üzerinde `.then` metodu tanımlıysa `resolve` ve `reject` fonksiyonlarını parametre olarak `.then` fonksiyonuna sağlar ve bu metodlardan biri çağırılıncaya dek bekler.

Yukarıdaki örnekte `resolve(2)` metodu `(**)` satırı yorumlandıktan 1 saniye sonra çağrılır. Ortaya çıkan sonuç sonrasında Promise Zinciri üzerinde aşağı doğru gidecektir.

Bu özellik sayesinde Promise Zinciri özelliğine sahip objelerin yaratımı `Promise` objesinden kalıtılmak zorunda olmaksızın yapılabilir.
````


## Daha kapsamlı bir örnek: fetch

Ön-yüz programla içinde promise çoğunlukla ağ üzerinde yapılan isteklerde kullanılır. Bunu gerçekleştiren bir örnekle devam edelim.

Burada [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) metodunu uzak bir sağlayıcıdan veri almak için kullanacağız. Bu metod birçok parametreye sahip fakat basitçe kullanımı aşağıdaki gibi:

```js
let promise = fetch(url);
```

Bu, verilmiş olan `url` adresine bir istek yollar ve Promise döner. Promise, uzaktaki sağlayıcıdan istenen veriyi aldığında bir `response` objesi olarak çözümlenir.

Tüm dönütü elde edebilmek için `response.text()` metodunu çağırmamız gerekir. Bu çağrı, uzak sunucudan tüm içerik alındıktan sonra çözümlenecek olan bir Promise döner.

Aşağıdaki örnekte `user.json` dosyasına çağrı yapılmakta ve dönüt `alert` fonksiyonu ile gösterilmekte:


```js run
fetch('/article/promise-chaining/user.json')
  // uzak sunucudan cevap geldiğinde aşağıdaki `.then` çalışır
  .then(function(response) {
    // response.text() tüm içeriği çözümleyecek olan promise' i döner
    // sonrasında içeriği indirir
    return response.text();
  })
  .then(function(text) {
    // ...ve uzak sunucudan gelen içerik
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```
Ayrıca `response.json()` metodu gelen veriyi doğruca JSON formatına çözümler. Örnekteki senaryoya daha uygun olduğundan kodda bu kısmı değiştirelim.

Arrow fonksiyon kullanarak da daha sade bir biçime ulaşabilmek için kodu tekrar düzenleyelim.

```js run
// yukarıdan farklı olarak response.json() kullanıyoruz
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan
```

Şimdi de elde ettiğimiz kullanıcı verisiyle bir şeyler yapalım.

Örneğin, Github sayfasına da bir istekte bulunarak kullanıcı profilini ve avatarını elde edebiliriz.

```js run
// user.json dosyasına istek yolla
fetch('/article/promise-chaining/user.json')
  // json formatına dönüştür
  .then(response => response.json())
  // GitHub sayfasına isteği yolla
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // dönütü json formatına dönüştür
  .then(response => response.json())
  // kullanıcı avatar resmini (githubUser.avatar_url) 3 saniye boyunca göster
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

Yukarıdaki kod bloğu istediğimiz şekilde çalışmakta fakat burada potansiyel bir sorun da mevcut.

`(*)` işaretli satıra bakıcak olursak, gösterdiğimiz avatar resmi DOM üzerinden silindikten sonra herhangi bir şey yapmak istiyorsak bunu nasıl yapabiliriz? Örneğin sayfa üzerde bu kullanıcının verilerini düzenlemek için bir form göstermek istiyor olalım. Mevcut durumda bunu yapamayız, çünkü son `.then` işleyicisi herhangi bir değer döndürmemekte. Bundan dolayı, tekrar `.then` fonksiyonu çağırılamaz.

Mevcut zinciri genişletmek için bu işlem sonucunda bir promise döndürmemiz gerekir.

Şöyle:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) {
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser);
*/!*
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

Yapılan değişiklikten sonra `img.remove()` metodu ayn şekilde 3 saniye sonra çalışacak. Fakat, sonrasında `resolve(githubUser)` ile kullanıcı bilgilerini bir sonraki zincirde kullanılabilmesi için çözümleyecek.

Genel bir kural olarak, asenkron eylemler her zaman bir promise döndürmelidir.

Bu, asenkron eylemlerden sonra gerçekleştirilecek işlemler için olanak sağlamaktadır. Şu anda, zincirin son işleyicisinden sonra herhangi bir genişlemeye ihtiyaç duymuyor olsak dahi, ileriye dönük olarak buna ihtiyacımız olabileceğini göz önüne almamız gerekir.

Nihayetinde, kodu daha yönetilebilir parçalara ayrıştırarak tekrar kullanılabilir fonksiyonlarımızı yazıyoruz:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// fonksiyonları kullanıyoruz:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

## Özet

Eğer `.then` (ya da `catch/finally`) işleyicisi promise dönerse, zincirleme akış bu Promise sonuçlanana dek durur, yeni değerin gelmesini bekler. Promise çözümlendiğinde akış kaldığı yerden yeni değer ile devam eder.

Genel bakış:

![](promise-handler-variants.svg)
