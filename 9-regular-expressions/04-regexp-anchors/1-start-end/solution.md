<<<<<<< HEAD
Tek eşleşme boş bir dizidir: metin başlar ve hemen biter.

Bu örnek, çapaların karakterler değil, testler olduğunu bir kez daha gösteriyor.

Dizi (string) boştur `""`. Regexp motoru öncelikle `pattern:^` çapasıyla eşleşir (satır başı), evet burada, daha sonra satır sonu gelir `pattern:$`, satır sonu da burada `""`. Böylece dizi ile kalıp eşleşmiş olur.
=======
An empty string is the only match: it starts and immediately finishes.

The task once again demonstrates that anchors are not characters, but tests.

The string is empty `""`. The engine first matches the `pattern:^` (input start), yes it's there, and then immediately the end `pattern:$`, it's here too. So there's a match.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
