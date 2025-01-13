<<<<<<< HEAD
# Chrome ile Hata Ayıklama
=======
# Debugging in the browser
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Daha karmaşık kodlara geçmeden, hata ayıklama hakkında konuşmamız gerekmekte.

<<<<<<< HEAD
Çoğu modern tarayıcı "hata ayıklama"(debugging) özelliğine sahiptir -- bu özel arayüz kod yazarken hata bulunmasını ve düzeltilmesini kolaylaştırır.

Geliştirici özellikleri en iyi olan tarayıcı Chrome olduğundan bu tarayıcı ile çalışacağız.

## "Kaynak" paneli
=======
[Debugging](https://en.wikipedia.org/wiki/Debugging) is the process of finding and fixing errors within a script. All modern browsers and most other environments support debugging tools -- a special UI in developer tools that makes debugging much easier. It also allows to trace the code step by step to see what exactly is going on.

We'll be using Chrome here, because it has enough features, most other browsers have a similar process.

## The "Sources" panel
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Şu anda sizin kullandığınız Chrome biraz farklı olabilir. Fakat bu panel kesinlikle orada biryerde olmalı

<<<<<<< HEAD
- [Örnek Sayfayı](debugging/index.html) Chrome ile açın.
- Geliştirici araçlarını `key:F12` (Mac: `key:Cmd+Opt+I`) ile açabilirsiniz.
- `kaynak` panelini seçin.
=======
- Open the [example page](debugging/index.html) in Chrome.
- Turn on developer tools with `key:F12` (Mac: `key:Cmd+Opt+I`).
- Select the `Sources` panel.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Eğer ilk defa bu işlemi yapıyorsanız görmeniz gereken ekran şudur:

![](chrome-open-sources.svg)

<<<<<<< HEAD
Sol tarafta bulunan açma kapama butonu  <span class="devtools" style="background-position:-168px -76px"></span> size dosyaları gösteren bir tab açar.
=======
The toggler button <span class="devtools" style="background-position:-172px -98px"></span> opens the tab with files.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu panelde `hello.js` i seçtiğinizde aşağıdaki gibi bir ekran görmeniz gerekir.

![](chrome-tabs.svg)

<<<<<<< HEAD
Bu bölüm üçe ayrılmıştır:
1. **Dosya Gezgini**: Html, javascript, css ve diğer dosyalar görseller de dahil olmak üzere açılan sayfaya ait olan kaynakları gösterir. Chrome eklentileri de burada yer alabilir.
2. **Kod Editörü** burası ise kaynak kodu gösterir.
3. **Bilgi ve kontrol bölgesi** burada ise hata ayıklama yapılır.

Şimdi geliştirici araçlarının sol köşesinde bulunan <span class="devtools" style="background-position:-172px -122px"></span> açma kapama bölümünü kullanarak kendinize biraz yer açabilirsiniz.

## Konsol
=======
The Sources panel has 3 parts:

1. The **File Navigator** pane lists HTML, JavaScript, CSS and other files, including images that are attached to the page. Chrome extensions may appear here too.
2. The **Code Editor** pane shows the source code.
3. The **JavaScript Debugging** pane is for debugging, we'll explore it soon.

Now you could click the same toggler <span class="devtools" style="background-position:-172px -122px"></span> again to hide the resources list and give the code some space.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Eğer `Esc` tuşuna basarsanız altta `konsol` açılır. Buraya komutları yazıp `key:Enter` ile çalıştırabilirsiniz.

Komut çalıştıktan sonra sonucunu hemen altında gösterir.

Örneğin burada `1+2` `3`  çıktısını verir. `hello("debugger")` dediğinizde hiçbir şey bulamadığından `undefined` döndürür.

<<<<<<< HEAD
![](chrome-sources-console.svg)

## Kesme Noktası
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:

![](chrome-sources-console.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

[Örnek Kod](debugging/index.html) içerisinde ne olduğunu incelenecek olursa. `hello.js` içerisinde `4.` satıra tıklayın. Evet `4` e tıklayın koda değil.

Tebrikler artık ilk kesme noktanızı oluşturdunuz. Lütfen `8` e de tıklayın.

Aşağıdaki gibi görünmeli. (tıkladığınız yerler mavi olmalı)

![](chrome-sources-breakpoint.svg)

<<<<<<< HEAD
*kesme noktası* JavaScript çalışırken çalışmasını o noktada durdurmasını sağlar.
=======
![](chrome-sources-breakpoint.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Kod durdurulduğunda, o anki değişken değerlerini inceleyebilir veya konsoldan kod çalıştırabilirsiniz. Diğer bir deyişle *hata ayıklayabilirsiniz*

Oluşturulan bu kesme noktalarını sağ taraftaki panelde list halinde görmek mümkündür. Bu farklı dosyalarda eğer kesme noktaları varsa bunları görme açısından yararlı bir özelliktir. Eğer birçok dosyada kesme noktası varsa bu panel vasıtasıyla:

<<<<<<< HEAD
- İstenilen herhangi bir kesme noktasına doğrudan üstüne tıklayarak gidilebilir.
- Geçici olarak kesme noklarını devre dışı bırakılabilir.
- Sağ tıklayıp Sil'e tıkladığınızda bu kesme noktalarını silebilirsiniz.

```smart header="Koşullu kesme noktaları"
Satır sayılarının yazıldığı yere sağ tıklayarak *Koşullu Kesme Noktası* oluşturabilirsiniz. Eğer ifadeniz doğruysa bu kesme noktası çalışır ve JavaScript çalışması durur.
=======
We can always find a list of breakpoints in the right panel. That's useful when we have many breakpoints in various files. It allows us to:
- Quickly jump to the breakpoint in the code (by clicking on it in the right panel).
- Temporarily disable the breakpoint by unchecking it.
- Remove the breakpoint by right-clicking and selecting Remove.
- ...And so on.

```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Belirli değişken değerlerine veya parametre değerlerine göre çalışma durdurulmak istendiğinde yararlı bir özelliktir.
```

<<<<<<< HEAD
## Debugger komutu

Ayrıca  `debugger` kodu ile de hata ayıklama işlemini yapmak mümkündür.
=======
## The command "debugger"

We can also pause the code by using the `debugger` command in it, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
function merhaba(adi) {
  let selam = `Merhaba, ${adi}!`;

*!*
  debugger;  // <-- hata ayıklama çalışır
*/!*

  say(selam);
}
```

<<<<<<< HEAD
Bu kod, siz editörde kod yazarken tekrar tarayıcıya geçip, kodu bulup kesme noktası koyma sürecini ortadan kaldırıyor.

## Dur ve ne olduğuna bak

Yaptığımız örnekte `merhaba()` sayfa yüklenirken çalışmaktadır. Bundan dolayı hata ayıklayıcıyı çalıştırmanın en kolay yolu sayfayı yenilemektir. Bunun için `key:F5` (Windows, Linux) veya `key:Cmd+R` ile sayfanın yenileyiniz.

Kesme noktasını kodda belirlediğinizden dolayı 4. satırda JavaScript çalışmayı durduracaktır.

![](chrome-sources-debugger-pause.svg)

Lütfen bilgilerin görüneceği dropdownları sağ panelden açınız. Bu bölümler oklar ile gösterilmiştir. Bu bölümler kesme anındaki değişkenlerin değerleri ve kod durumunu incelemeye yarar.

1. **`Watch` -- herhangi bir ifadenin o anki değerini gösterir.**
    `+` işaretine basarak ifade girebilirsiniz. Bu ifadenin değerini kod ayıklayıcı her halükarda gösterir. Kod çalışırken bu değerleri her adımda kontrol eder ve sonucunu yazar.

2. **`Call Stack` -- İç içe çağrı zincirlerini gösterir.**

    Şu anda hata ayıklayıcı `merhaba()` fonksiyonunun içindedir ve `index.html` tarafından çağırılmıştır. Eğer  yığın(stack) bölgesine dikkat ederseniz fonksiyona girdiğinde nereden çağırıldığını gösterir. ( herhangi bir fonksiyondan çağırılmadığından dolayı "anonymous" olarak göreceksiniz)

    Eğer yığın maddesine tıklayacak olursanız hangi fonksiyondan çağırıldığını görebilirsiniz.
3. **`Scope` -- kesme anında var olan değişkenlerin değerlerini gösterir**

    `Local` yerel değişken değerlerini gösterir. Ayrıca değerlerini kodun sağ tarafında vurgulanmış şekilde de görebilirsiniz.

    `Global` global değişkenler. Yani fonksiyon dışında tanımlanmış değerleri görebilirsiniz.

    Bunların yanında `this` anahtar kelimesi de vardır. Fakat bu konu üzerinden geçmedik.

## Çalışma izini sürme

Artık *iz sürme* safhasına geçebilirsiniz.

Sağ panelin üstünde sadece bu işe has butonlar bulunmaktadır.

=======
Such command works only when the development tools are open, otherwise the browser ignores it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

<span class="devtools" style="background-position:-7px -76px"></span> -- çalışmaya devam et, `key:F8`.
: Çalışmaya devam edilmesini sağlar. Eğer ayrı bir kesme noktası yoksa çalışma kod bitene kadar devam eder.

<<<<<<< HEAD
    Üzerine bir defa tıkladığınızda aşağıdaki gibi olur.
=======
In our example, `hello()` is called during the page load, so the easiest way to activate the debugger (after we've set the breakpoints) is to reload the page. So let's press `key:F5` (Windows, Linux) or `key:Cmd+R` (Mac).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

    ![](chrome-sources-debugger-trace-1.svg)

<<<<<<< HEAD
    Çalışmaya devam edildi, `yaz()` fonksiyonunun içerisinde tekrar durdu. Dikkat ederseniz "Call stack" çağrısını bu işlem bir artırdı.
=======
![](chrome-sources-debugger-pause.svg)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

<span class="devtools" style="background-position:-137px -76px"></span> -- adım at (bir sonraki komutu çalıştır), fakat *fonksiyonun içine girme*,  `key:F10`.
: Eğer buna şimdi tıklarsanız `alert` çalışır. Önemli olan şey `alert` yerine farklı bir fonksiyon da olsa çalışma bu fonksiyonun içinde ne yaptığına önem vermez ve "üstünden atlar".

<span class="devtools" style="background-position:-72px -76px"></span> -- adım at, `key:F11`.
: Bir öncekinin aynısı, bir adım gider fakat bu defa eğer bir fonksiyon varsa onun "içine girer"(step into).

<<<<<<< HEAD
<span class="devtools" style="background-position:-104px -76px"></span> -- içinde bulunulan fonksiyonun sonuna kadar devam et, `key:Shift+F11`.
: Çalışma içinde bulunan fonksiyonun sonuna gelir ve orada durur.Yanlışlıkla iç içe çağrının içine girilirse çıkmak için kullanışlı bir özelliktir.<span class="devtools" style="background-position:-72px -76px"></span>,
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

<span class="devtools" style="background-position:-7px -28px"></span> -- Tüm kesme noktalarını etkinleştirme/devre dışı bırakma.

<span class="devtools" style="background-position:-264px -4px"></span> -- Hata olduğu anda otomatik olarak durdurmayı açma kapama butonu
: Etkinleştirildiğinde, kodda herhangi bir hata olduğunda çalışma otomatik olarak durdurulur. Bu noktada analizlerinizi yapabilirsiniz. Eğer hata varsa hata ayıklama ekranını açabilir ve bu özelliği etkinleştirerek hatanın nerede olduğunu bulabilirsiniz.

<<<<<<< HEAD
```smart header="Buradan devam edin"
Satır numaralarına sağ tıklayıp "Buradan devam et" özelliği ile kodu bir kaç adım ileriden devam etmesini sağlayabilirsiniz. Böylece yeniden bir kesme noktası oluşturmanıza gerek kalmaz.
=======
    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**

    `Local` shows local function variables. You can also see their values highlighted right over the source.

    `Global` has global variables (out of any functions).

    There's also `this` keyword there that we didn't study yet, but we'll do that soon.

## Tracing the execution

Now it's time to *trace* the script.

There are buttons for it at the top of the right panel. Let's engage them.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "Resume": continue the execution, hotkey `key:F8`.
: Resumes the execution. If there are no additional breakpoints, then the execution just continues and the debugger loses control.

    Here's what we can see after a click on it:

    ![](chrome-sources-debugger-trace-1.svg)

    The execution has resumed, reached another breakpoint inside `say()` and paused there. Take a look at the "Call Stack" at the right. It has increased by one more call. We're inside `say()` now.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Step": run the next command, hotkey `key:F9`.
: Run the next statement. If we click it now, `alert` will be shown.

    Clicking this again and again will step through all script statements one by one.

<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.

    That's good if we're not interested to see what happens inside the function call.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Step into", hotkey `key:F11`.
: That's similar to "Step", but behaves differently in case of asynchronous function calls. If you're only starting to learn JavaScript, then you can ignore the difference, as we don't have asynchronous calls yet.

    For the future, just note that "Step" command ignores async actions, such as `setTimeout` (scheduled function call), that execute later. The "Step into" goes into their code, waiting for them if necessary. See [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) for more details.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Step out": continue the execution till the end of the current function, hotkey `key:Shift+F11`.
: Continue the execution and stop it at the very last line of the current function. That's handy when we accidentally entered a nested call using <span class="devtools" style="background-position:-200px -190px"></span>, but it does not interest us, and we want to continue to its end as soon as possible.

<span class="devtools" style="background-position:-61px -74px"></span> -- enable/disable all breakpoints.
: That button does not move the execution. Just a mass on/off for breakpoints.

<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.

```smart header="Continue to here"
Right click on a line of code opens the context menu with a great option called "Continue to here".

That's handy when we want to move multiple steps forward to the line, but we're too lazy to set a breakpoint.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

## Loglama

<<<<<<< HEAD
Konsola basit bir şey yazdıracağınız zaman `console.log` fonksiyonunu kullanabilirsiniz. Aşağıdaki örnekte ekrana 0 ile 4 arasındaki değerler yazılır.
=======
To output something to console from our code, there's `console.log` function.

For instance, this outputs values from `0` to `4` to console:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
// çalışmasını görmek için lütfen geliştirici konsolunu açınız.
for (let i = 0; i < 5; i++) {
<<<<<<< HEAD
  console.log("deger", i);
=======
  console.log("value,", i);
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
}
```
Normal kullanıcı bu çıktıyı ekranda göremez, bunun için geliştirici konsoluna girmesi gerekir.

<<<<<<< HEAD
Eğer kodunuzun içerisinde yeterli derecede log varsa hata ayıklamanıza gerek yoktur.
=======
Regular users don't see that output, it is in the console. To see it, either open the Console panel of developer tools or press `key:Esc` while in another panel: that opens the console at the bottom.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## Özet

Bahsettiğimiz gibi çalışan kodu durdurmanın üç farklı yönü vardır. Bunlar:
1. Kesme noktası ile durdurma
2. `debugger` kelimesi ile durdurma
3. Eğer hata olduğunda aç/kapa butonu aktifse çalışmada hata olduğunda  <span class="devtools" style="background-position:-264px -4px"></span> durdurma

<<<<<<< HEAD
Bunların sonucunda çalışmada ne gibi hatalar olduğunu görebilirsiniz.

Bunlara ek olarak <https://developers.google.com/web/tools/chrome-devtools> adresinden daha geniş ve yeni bilgilere ulaşabilirsiniz.
=======
As we can see, there are three main ways to pause a script:
1. A breakpoint.
2. The `debugger` statements.
3. An error (if dev tools are open and the button <span class="devtools" style="background-position:-90px -146px"></span> is "on").

When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Bu bölümdeki bilgiler sizin hata ayıklama işlemine başlamanızda yardımcı olacaktır. Fakat tarayıcı ile alakalı çok fazla işlem yapıyorsanız bu durumda geliştirici  derinlemesine incelemeniz gerekmektedir.

<<<<<<< HEAD
Tabi bunun yanında deneme yanılma yöntemi ile de geliştirici araçlarının özelliklerini keşfedebilirsiniz. Unutmayın sağ tıklayarak farklı bölgelerde farklı fonksiyonları görebilirsiniz.
=======
The information from this chapter is enough to begin debugging, but later, especially if you do a lot of browser stuff, please go there and look through more advanced capabilities of developer tools.

Oh, and also you can click at various places of dev tools and just see what's showing up. That's probably the fastest route to learn dev tools. Don't forget about the right click and context menus!
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
