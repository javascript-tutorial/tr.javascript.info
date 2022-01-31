# Yörünge yüksekliğinden

Bu bölüm, "web bileşenleri" için bir dizi modern standardı tanımlayacaktır.

Şu anda bu standartlar geliştirme aşamasındadır. Bazı standartlar iyi bir desteğe sahip ve modern HTML/DOM standardına entegre edilmişken, diğerleri henüz taslak aşamasındadır. Örnekleri herhangi bir tarayıcıda deneyebilirsiniz, Google Chrome muhtemelen bu özellikler konusundaki en güncel tarayıcı seçeneği olacaktır. Bunun nedeni belki de Google takımının ilgili birçok özelliğin arkasında olmasıdır.

## ... arasında ortak olan nedir?

Bu bileşen fikri tamamen yeni bir şey değil. Birçok framework ve dahası tarafından daha önceden kullanılmaktaydı.

Detayları tanımlamaya başlamadan önce insanlığın bu büyük başarısına bir göz atalım:

![](satellite.jpg)

Bu, Uluslararası Uzay İstasyonu (ISS).

Bu ise içerisinde ne olduğu (hemen hemen):

![](satellite-expanded.jpg)

Uluslararası Uzay İstasyonu:
- Birçok bileşenden meydana gelir.
- Her bileşen kendi tarafında, içerisinde çok sayıda küçük detaylara sahiptir.
- Bileşenler oldukça karmaşık, birçok websitesinden çok daha karmaşık bir yapıdadır.
- Bileşenler; farklı dilleri konuşan, farklı ülkelerden takımlar tarafından, uluslararası olarak geliştirilir.

... Ayrıca bu şey, içerisinde insanları canlı tutarak uzayda uçar!

<<<<<<< HEAD
Bu kadar karmaşık cihazlar nasıl oluşturulur?

Geliştirmemizi aynı düzeyde güvenilir ve ölçeklenebilir hale getirmek için hangi prensipleri ödünç alabiliriz? En azından, yaklaşabilmek için.
=======
How are such complex devices created?

Which principles could we borrow to make our development same-level reliable and scalable? Or, at least, close to it?
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

## Bileşen mimarisi

Karmaşık yazılım geliştirmenin en meşhur kuralı şudur: karmaşık yazılım yapma.

Bir şey eğer karmaşıklaşacaksa -- onu parçalara ayır ve birbiriyle en açık şekilde bir araya getir.

**İyi bir mimar, karmaşığı basit bir şekilde oluşturabilendir.**

Kullanıcı arayüzünü görsel bileşenlere ayırabiliriz: herbiri sayfada kendi yerine sahip olur, iyi tanımlanmış bir görev "yapar" ve diğerlerinden ayrıdır.

Şimdi bir web sitesine, örneğin Twitter'a bir göz atalım.

Doğal olarak bileşenlere ayrılıyor:

![](web-components-twitter.svg)

1. Üst menü.
2. Üye bilgisi.
3. Takip önerileri.
4. Gönderi formu.
5. (ve aynı zamanda 6, 7) -- mesajlar.

Bileşenler alt bileşenlere sahip olabilir; örneğin mesajlar, bir üst seviyedeki "mesaj listesi" bileşeninin birer parçası olabilir. Tıklanabilir bir kullanıcı resmi kendi başına bir bileşen olabilir ve bu şekilde gider.

Bir bileşenin ne olduğuna nasıl karar vereceğiz? Bu biraz da sezgiden, deneyimden ve sağduyudan gelir. Genellikle ne yaptığını ve sayfa ile nasıl etkileşimde bulunduğunu tanımlayabildiğimiz, ayrılmış bir görsel varlıktır. Yukarıdaki durumda sayfa bloklara sahiptir, bunların herbiri kendi rolünü oynar. Bu durumda bunları bileşen yapmak mantıklıdır.

<<<<<<< HEAD
Bir bileşen şunlara sahiptir:
- kendi JavaScript sınıfı.
- yalnızca kendi sınıfı tarafından yönetilen DOM mimarisi, dış kod buna erişemez ("kapsülleme" prensibi).
- Bileşen tarafından uygulanan CSS stilleri
- API: diğer bileşenlerle etkileşime geçmek için olaylar, sınıf metotları vs.
=======
A component has:
- Its own JavaScript class.
- DOM structure, managed solely by its class, outside code doesn't access it ("encapsulation" principle).
- CSS styles, applied to the component.
- API: events, class methods etc, to interact with other components.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

Bir kez daha değinelim, tüm bu "bileşen" yapısı özel bir şey değildir.

<<<<<<< HEAD
Bunları oluşturmak için çok fazla framework ve geliştirme metodolojisi vardır, herbirinin kendi gösterişi vardır. Genellikle "bileşen hissi" sağlamak adına, CSS kapsamı ve DOM kapsülleme için özel CSS sınıfları ve kuralları kullanır.
=======
There exist many frameworks and development methodologies to build them, each with its own bells and whistles. Usually, special CSS classes and conventions are used to provide "component feel" -- CSS scoping and DOM encapsulation.
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

"Web bileşenleri" bunun için yerleşik tarayıcı özellikleri sağlar, bu yüzden bunları artık taklit etmemize gerek yok.

- [Özel elementler](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements) -- özel HTML elementleri tanımlamak için.
- [Gölge DOM](https://dom.spec.whatwg.org/#shadow-trees) -- bileşen için iç DOM oluşturarak onu diğerlerinden gizlemek için.
- [CSS Kapsamı](https://drafts.csswg.org/css-scoping/) -- yalnızca bileşen içindeki Gölge DOM'a etki edecek stiller tanımlamak için.
- [Olay yeniden hedefleme](https://dom.spec.whatwg.org/#retarget) ve özel bileşenlerin geliştirmeye daha çok uyması için diğer şeyler.

Bir sonraki bölümde, web bileşenleri için temel, iyi desteğe sahip ve kendi başına iyi bir yapıya sahip olan "Özel Elementler"in detaylarına ineceğiz.
