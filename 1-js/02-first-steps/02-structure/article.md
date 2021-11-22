# Kod yapısı

Öğrenilmesi gereken ilk şey kod bloğunun nasıl oluşturulacağıdır.

## İfadeler

İfadeler, komutları oluşturmak için yazdığımız cümlelerdir.

Şu ana kadar `alert('Merhaba Dünya')` ifadesini gördük ve bunun uyarı mesajı verdiğini biliyorsunuz.

Kodun içerisinde istediğiniz kadar ifadeye. Diğer kod cümlesi bir birinden noktalı virgül ile ayrılır.

Örneğin burada mesaj ikiye ayrılmıştır.

```js run no-beautify
alert('Merhaba'); alert('Dünya');
```
Genelde ifadeler farklı satırlarda yazılırlar. Böylece yazdığınız kod daha okunabilir olacaktır.


```js run no-beautify
alert('Merhaba');
alert('Dünya');
```

## Noktalı Virgüller [#semicolon]
Eğer ifadeleri satır bırakarak yazarsanız noktalı virgül kullanmanıza gerek yoktur.

Örneğin aşağıdaki kod bloğu da çalışacaktır

```js run no-beautify
alert('Merhaba')
alert('Dünya')
```
JavaScript dilinde bu şekilde satır bırakarak ifadeyi bitirme olayına "üstü kapalı" noktalı virgül denilmektedir. Ayrıca [otomatik noktalı virgül koyma](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) da denir

**Çoğu durumda yeni satır noktalı virgül anlamına gelir. Unutulmamalı ki çoğu durum herzaman demek değildir.**

Aşağıdaki örnekte görüleceği üzeri yeni satır noktalı virgül anlamına gelmemektedir.

```js run no-beautify
alert(3 +
1
+ 2);
```

Yukarıdaki bloğun çıktısı `6` olacaktır çünkü JavaScript yeni satırda noktalı virgül eklememiştir. Buradan anlayabilirsiniz ki eğer satır `"+"` ile bitiyorsa ifade bitmiş sayılmaz ve noktalı virgül gereklidir. Bu durumda yukarıdaki kod beklendiği gibi çalışmaktadır.

**Fakat bazı durumlarda noktalı virgülün otomatik olarak konulması gerekirken JavaScript bunu yapmakta sorun yaşar**

Böyle hataları bulmak oldukça zordur.

````smart header="Hata Örneği"
Eğer böyle bir hata görmek istiyorsanız, aşağıdaki koda bir bakın

```js run
[1, 2].forEach(alert)
```
`[]` veya `forEach` in ne anlama geldiğini bilmenize şimdilik gerek yok daha sonra bu konuyu işleyeceğiz. Şu anda bilmeniz gereken önce 1 uyarısı alacaksınız sonra 2.

Şimdi bu koddan önce noktalı virgül ile bitmeyen bir uyarı ifadesi yazın.

```js run no-beautify
alert("Hata alacaksınız")

[1, 2].forEach(alert)
```

Eğer yukarıdaki kodu çalıştırısanız sadece ilk uyarı mesajını görecek ve sonrasında hata alacaksınız.

Fakat aşağıdaki gibi noktalı virgül kullanırsanız her şeyin beklenen şekilde çalıştığını göreceksiniz:

```js run
alert("Şimdi ise beklendiği gibi hatasız");

[1, 2].forEach(alert)  
```

Şimdi "Her şey yolunda" mesajını ve ardından `1` ve `2`'yi görüyoruz.

İlk yazdığımız kod bloğunda hata olmasının sebebi JavaScript'in `[...]` den önce noktalı virgül gelmeyeceğini varsaymasından dolayı olmaktadır.

Bundan dolayı noktalı virgül koyulmaz, bu durumda ilk kod bloğunda tüm blok bir ifadesi olarak görülür. JavaScript motoru kodu aşağıdaki gibi görecektir.

```js run no-beautify
alert("Bir hata gerçekleşecek")[1, 2].forEach(alert)
```

Fakat normalde sizinde bildiğiniz gibi bunu iki satır görmesi gerekmektedir. Bu ve bunun gibi hatalar ile kod yazdığınız sürece karşılaşabileceğiniz hatalardır.
````

Eğer yeni satıra geçmek istiyorsanız önerilen yöntem noktalı virgül kullanmanızdır. Bu kural JavaScript toplumu tarafından benimsenmiştir. Tekrar belitelim JavaScript yazarken noktalı virgül kullanmadan yeni satıra geçmek çoğu zaman -- *mümkündür* -- fakat başlangıçta noktalı virgül kullanmanız daha güvenlidir ve önerilir.


## Yorum Satırları
Zamanla yazdığınız programlar gittikçe karmaşıklaşır. Neyin ne için yapıldığını belirtmeniz için *yorum* yazmak kaçınılmaz olur.

Yorum satırları kodun içerisinde herhangi bir yere koyulabilir. Kodun çalışmasını engellemez çünkü JavaScript motoru bu yorumları görmezden gelir.

**Tek satır olarak yazmak istiyorsanız `//` kullanarak yorum yazabilirsiniz** 

Kesik çizgi işaretlerinden sonra istediğiniz yorumu yazabilirsiniz.

Örneğin:
```js run
// Bu yorum kendi başına bir satırda yer alır
alert('Merhaba');

alert('Dünya'); // Bu yorum ise ifadeyi takip eder
```

**Eğer birden çok satırda yorum yazmak istiyorsanız kesik çizgi + yıldız ile ( <code>/&#42;</code> ) yoruma başlayıp yıldız ve kesik çizgi ile bu kod bloğunu bitirebilirsiniz <code>&#42;/</code>.**

Örneğin:

```js run
/* İki satıra yazılmış bir 
yorum örneği. 
*/
alert('Merhaba');
alert('Dünya');
```
Eğer yorumlarınızı <code>/&#42; ... &#42;/</code> arasına yazarsanız bu JavaScript  motoru tarafından görmezden gelinecektir. Bazen geçici olarak yazdığınız kodun bazı bölümlerinin görmezden gelinmesini isteyebilirsiniz. Bu durumda da kodunuzu yorum satırı haline getirebilirsiniz.
```js run
/* Kod yorum satırı yapıldı
alert('Hello');
*/
alert('Dünya');
```

```smart header="Klavye kısa yollarını kullanın!"

Çoğu editör `key:Ctrl+/` kısa yolunu kullanarak tek satır veya `key:Ctrl+Shift+/` kullanarak çok satır yorum yapmanıza yardımcı olur. Mac için `key:Cmd` tuşu windows için ise `key:Ctrl` tuşudur.
```

````warn header="Yorum satırı içerisinde ayrı bir yorum satırı yapılamaz!"
Aşağıdaki yorum satırı yanlış bir kulanımdır. Bu durumda hata alırsınız.

```js run no-beautify
/*
  /* yorum içinde yorum ?!? */
*/
alert( 'Dünya' );
```
````

Lütfen kod yazarken yorum satırı yazmaktan çekinmeyin.

Yorumlar elbette dosyanızın biraz daha büyük olmasına sebep olabilir, fakat bu sorun değildir. Kodunuzu küçültmek için bir çok sıkıştırıcı bulunmaktadır. Bunlar kodunuzu canlı sisteme alırken yorumlardan arındırarak server'a koyarlar böylece yazdığınız kod hiç yer kaplamaz.

Daha fazla örneği ve daha iyi nasıl yorum yazabileceğinizi <info:coding-style> bölümünde göreceksiniz.
