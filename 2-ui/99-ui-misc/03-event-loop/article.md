
# Olay döngüsü: microtasks ve macrotasks

Node.js'de olduğu gibi tarayıcı JavaScript yürütme akışı da bir *olay döngüsüne* dayanır.

Olay döngüsünün nasıl çalıştığını anlamak, optimizasyonlar ve bazen de doğru mimari için önemlidir.

Bu bölümde önce işlerin nasıl yürüdüğüyle ilgili teorik ayrıntıları ele alacağız ve ardından bu bilginin pratik uygulamalarını göreceğiz.

## Olay Döngüsü

*Olay döngüsü* kavramı çok basittir. JavaScript motorunun görevleri beklediği, yürüttüğü ve daha sonra uyuyarak daha fazla görev beklediği sonsuz bir döngü vardır.

Motorun genel algoritması:

1. Görevler varken:
    - en eski görevden başlayarak bunları yürütün.
2. Bir görev görünene kadar uyuyun, ardından 1'e gidin.

Bu, bir sayfaya göz atarken gördüğümüz şeyin biçimselleştirilmesidir. JavaScript motoru çoğu zaman hiçbir şey yapmaz, yalnızca bir script/işleyici/olay etkinleştirildiğinde çalışır.

Görev örnekleri:

- Harici bir script `<script src="...">` yüklendiğinde, görev onu yürütmektir.
- Bir kullanıcı faresini hareket ettirdiğinde, görev `mousemove` olayını göndermek ve işleyicileri yürütmektir.
- Zamanlanmış bir `setTimeout` için zaman geldiğinde, görev callback'i çalıştırmaktır.
- ...ve benzeri.

Görevler belirlenir - motor bunları işler - sonra daha fazla görev bekler (uyurken ve sıfıra yakın CPU tüketirken).

Motor meşgulken bir görev gelebilir, sonra sıraya girebilir.

Görevler, "macrotask sırası" (v8 terimi) olarak adlandırılan bir sıra oluşturur:

![](eventLoop.svg)

Örneğin, motor bir `script`'i yürütmekle meşgulken, bir kullanıcı faresini hareket ettirerek `mousemove`'a neden olabilir ve `setTimeout` zamanı gelmiş olabilir ve benzeri, yukarıdaki resimde gösterildiği gibi bu görevler bir kuyruk oluşturur.

Kuyruktaki görevler "ilk gelene ilk hizmet" esasına göre işlenir. Tarayıcı motoru `script` ile işi bittiğinde, `mousemove` olayını, ardından `setTimeout` işleyicisini vb. işler.

Buraya kadar oldukça basit, değil mi?

İki ayrıntı daha:
1. Motor bir görevi yürütürken oluşturma(Render) asla gerçekleşmez. Görevin uzun sürmesi önemli değil. DOM'daki değişiklikler yalnızca görev tamamlandıktan sonra boyanır.
2. Bir görev çok uzun sürerse tarayıcı, kullanıcı olaylarını işleme gibi diğer görevleri yapamaz. Bu yüzden bir süre sonra "Sayfa Yanıt Vermiyor" gibi bir uyarı vererek görevi tüm sayfayla sonlandırmayı önerir. Bu, çok sayıda karmaşık hesaplama olduğunda veya sonsuz bir döngüye yol açan bir programlama hatası olduğunda olur.

Teori buydu. Şimdi bu bilgiyi nasıl uygulayabileceğimizi görelim.

## Kullanım Senaryosu 1: CPU'ya aç görevleri bölme

Diyelim ki CPU'ya aç bir görevimiz var.

Örneğin, sözdizimi vurgulama(syntax-highlighting) (bu sayfadaki kod örneklerini renklendirmek için kullanılır) oldukça CPU ağırlıklıdır. Kodu vurgulamak için, analizi gerçekleştirir, birçok renkli öğe oluşturur, bunları belgeye ekler - çok fazla zaman alan büyük miktarda metin için.

Motor sözdizimi vurgulama ile meşgulken, DOM ile ilgili diğer işlemleri yapamaz, kullanıcı olaylarını işleyemez vb. Hatta tarayıcının bir süre "hıçkırmasına" ve hatta "takılmasına" neden olabilir ki bu kabul edilemez bir durumdur.

Büyük görevi parçalara bölerek sorunlardan kaçınabiliriz. İlk 100 satırı vurgulayın, ardından sonraki 100 satır için "setTimeout" (sıfır gecikmeli) zamanlayın, vb.

Bu yaklaşımı göstermek için, basitlik adına, metin vurgulama yerine `1` ile `1000000000` arasında sayan bir fonksiyon alalım.

Aşağıdaki kodu çalıştırırsanız, motor bir süre "askıda kalır". Açıkça fark edilen sunucu tarafı JS için ve tarayıcıda çalıştırıyorsanız, sayfadaki diğer düğmeleri tıklamayı deneyin - sayım bitene kadar başka hiçbir olayın işlenmediğini göreceksiniz.

```js run
let i = 0;

let start = Date.now();

function count() {

  // ağır bir iş yap
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

Tarayıcı, "script çok uzun sürüyor" uyarısı bile gösterebilir.

İşi iç içe `setTimeout` çağrılarını kullanarak bölelim:

```js run
let i = 0;

let start = Date.now();

function count() {

  // ağır işin bir parçasını yap (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // yeni cağrıyı planla (**)
  }

}

count();
```

Artık tarayıcı arayüzü "sayma" işlemi sırasında tamamen işlevseldir.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:
Tek bir `count` çalıştırması `(*)` işinin bir bölümünü yapar ve ardından gerekirse kendisini `(**)` olarak yeniden zamanlar:

1. İlk çalıştırma sayar: `i=1...1000000`.
2. İkinci çalıştırma sayar: `i=1000001..2000000`.
3. ...ve benzeri.

Şimdi, motor bölüm 1'i yürütmekle meşgulken yeni bir yan görev (örneğin `onclick` olayı) ortaya çıkarsa, sıraya alınır ve sonraki bölümden önce bölüm 1 bittiğinde yürütülür. `count` yürütmeleri arasındaki olay döngüsüne periyodik geri dönüşler, JavaScript motorunun başka bir şey yapması, diğer kullanıcı eylemlerine tepki vermesi için yeterli "hava" sağlar.

Dikkate değer olan şey, her iki varyantın da -- işi `setTimeout` ile bölerek ve bölmeden -- hız açısından karşılaştırılabilir olmasıdır. Toplam sayım süresinde pek bir fark yok.

Onları daha da yakınlaştırmak için bir iyileştirme yapalım.

Zamanlamayı `count()`un başına taşıyacağız:

```js run
let i = 0;

let start = Date.now();

function count() {

  // zamanlamayı en başa taşı
  if (i < 1e9 - 1e6) {
    setTimeout(count); // yeni cağrıyı planla 
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

Şimdi `count()` yapmaya başladığımızda ve daha fazla `count()` yapmamız gerektiğini gördüğümüzde, işi yapmadan önce bunu hemen zamanlıyoruz.

Çalıştırırsanız, önemli ölçüde daha az zaman aldığını fark etmek kolaydır.

Neden?  

Çok basit: Hatırladığınız gibi, iç içe geçmiş birçok `setTimeout` çağrısı için tarayıcıda minimum 4 ms gecikme vardır. `0` ayarlasak bile, `4ms` (veya biraz daha fazla). Yani ne kadar erken zamanlarsak o kadar hızlı çalışır.

Son olarak, CPU'ya aç bir görevi parçalara ayırdık - artık kullanıcı arayüzünü engellemiyor. Ve genel yürütme süresi çok daha uzun değil.

## Kullanım Senaryosu 2: ilerleme göstergesi

Tarayıcı komut dosyaları için ağır görevleri bölmenin bir başka yararı da ilerleme göstergesi gösterebilmemizdir.

Daha önce belirtildiği gibi, DOM'daki değişiklikler, ne kadar sürdüğüne bakılmaksızın, yalnızca şu anda çalışan görev tamamlandıktan sonra boyanır.

Bir yandan, bu harika, çünkü fonksiyonumuz birçok öğe oluşturabilir, bunları tek tek belgeye ekleyebilir ve stillerini değiştirebilir -- ziyaretçi herhangi bir "ara", tamamlanmamış durum görmez. Önemli bir şey, değil mi?

İşte demo, `i`'deki değişiklikler fonksiyon bitene kadar görünmeyecek, bu yüzden yalnızca son değeri göreceğiz:


```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

...Ancak görev sırasında da bir şey göstermek isteyebiliriz, örneğin bir ilerleme çubuğu.

Eğer ağır görevi `setTimeout` kullanarak parçalara ayırırsak, o zaman değişiklikler aralarında boyanır.

Bu daha güzel görünüyor:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // ağır işin bir parçasını yap (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Şimdi `<div>`, bir tür ilerleme çubuğu olan `i`'nin artan değerlerini gösteriyor.


## Kullanım Senaryosu 3: olaydan sonra bir şeyler yapmak

Bir olay işleyicide, bazı eylemleri olay kabarıp tüm seviyelerde işlenene kadar ertelemeye karar verebiliriz. Bunu, kodu sıfır gecikmeli `setTimeout` içine sararak yapabiliriz.

<info:dispatch-events> bölümünde bir örnek gördük: `menu-open` özel olayı(custom event) `setTimeout` içinde gönderilir, böylece click" olayı tamamen işlendikten sonra gerçekleşir.

```js
menu.onclick = function() {
  // ...

  // create a custom event with the clicked menu item data
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // dispatch the custom event asynchronously
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

## Macrotasks ve Microtasks

Bu bölümde açıklanan *macrotasks* ile birlikte, <info:microtasks-sırası> bölümünde bahsedilen *microtasks* vardır.

Microtask'ler yalnızca kodumuzdan gelir. Genellikle promise'larla oluşturulurlar: `.then/catch/finally` işleyicisinin yürütülmesi bir microtask haline gelir. Microtask'ler, bir başka promise işleme biçimi olduğu için, `wait`'in "örtüsü altında" da kullanılır.

Ayrıca, microtask kuyruğunda yürütülmek üzere `func`'u sıraya sokan özel bir `queueMicrotask(func)` fonksiyonu da vardır.

**Her macrotask'dan hemen sonra, motor, diğer macrotask'ları çalıştırmadan veya oluşturmadan veya başka herhangi bir şeyden önce tüm görevleri microtask kuyruğundan yürütür.**

Örneğin, bir göz atın:

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

![](eventLoop-full.svg)

All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

## Summary

A more detailed event loop algorithm (though still simplified compared to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react to user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There's no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

```smart header="Web Workers"
For long heavy calculations that shouldn't block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That's a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
```
