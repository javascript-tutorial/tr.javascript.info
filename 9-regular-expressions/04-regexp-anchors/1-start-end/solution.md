Tek eşleşme boş bir dizedir: metin başlar ve hemen biter. An empty string is the only match: it starts and immediately finishes.

Bu örnek, çapaların karakter değil, testler olduğunu bir kez daha gösteriyor. The task once again demonstrates that anchors are not characters, but tests.

Metin boş bir dizidir `""`. Regexp motoru öncelikle `pattern:^` çapasıyla eşleşir (satır başı), evet satır başı var `""`, daha sonra satır sonu gelir `pattern:$`, satır sonu da var `""`. Böylece metin ile kalıp eşleşmiş olur.  The string is empty `""`. The engine first matches the `pattern:^` (input start), yes it's there, and then immediately the end `pattern:$`, it's here too. So there's a match.
