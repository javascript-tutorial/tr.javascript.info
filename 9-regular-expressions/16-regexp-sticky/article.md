
# Sticky flag "y", searching at position

The flag `pattern:y` allows to perform the search at the given position in the source string.

<<<<<<< HEAD
To grasp the use case of `pattern:y` flag, and see how great it is, let's explore a practical use case.

One of common tasks for regexps is "lexical analysis": we get a text, e.g. in a programming language, and analyze it for structural elements.

For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.
=======
To grasp the use case of `pattern:y` flag, and better understand the ways of regexps, let's explore a practical example.

One of common tasks for regexps is "lexical analysis": we get a text, e.g. in a programming language, and need to find its structural elements. For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Writing lexical analyzers is a special area, with its own tools and algorithms, so we don't go deep in there, but there's a common task: to read something at the given position.

E.g. we have a code string `subject:let varName = "value"`, and we need to read the variable name from it, that starts at position `4`.

We'll look for variable name using regexp `pattern:\w+`. Actually, JavaScript variable names need a bit more complex regexp for accurate matching, but here it doesn't matter.

<<<<<<< HEAD
A call to `str.match(/\w+/)` will find only the first word in the line. Or all words with the flag `pattern:g`. But we need only one word at position `4`.

To search from the given position, we can use method `regexp.exec(str)`.

If the `regexp` doesn't have flags `pattern:g` or `pattern:y`, then this method looks for the first match in the string `str`, exactly like `str.match(regexp)`. Such simple no-flags case doesn't interest us here.

If there's flag `pattern:g`, then it performs the search in the string `str`, starting from position stored in its `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

When a regexp is created, its `lastIndex` is `0`.

So, successive calls to `regexp.exec(str)` return matches one after another.

An example (with flag `pattern:g`):

```js run
let str = 'let varName';

let regexp = /\w+/g;
=======
- A call to `str.match(/\w+/)` will find only the first word in the line (`let`). That's not it.
- We can add the flag `pattern:g`. But then the call `str.match(/\w+/g)` will look for all words in the text, while we need one word at position `4`. Again, not what we need.

**So, how to search for a regexp exactly at the given position?**

Let's try using method `regexp.exec(str)`.

For a `regexp` without flags `pattern:g` and `pattern:y`, this method looks only for the first match, it works exactly like `str.match(regexp)`.

...But if there's flag `pattern:g`, then it performs the search in `str`, starting from position stored in the `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

In other words, `regexp.lastIndex` serves as a starting point for the search, that each `regexp.exec(str)` call resets to the new value ("after the last match"). That's only if there's `pattern:g` flag, of course.

So, successive calls to `regexp.exec(str)` return matches one after another.

Here's an example of such calls:

```js run
let str = 'let varName'; // Let's find all words in this string
let regexp = /\w+/g;

>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
alert(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1st word)
alert(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2nd word)
alert(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);
alert(word3); // null (no more matches)
alert(regexp.lastIndex); // 0 (resets at search end)
```

<<<<<<< HEAD
Every match is returned as an array with groups and additional properties.

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
We can get all matches in the loop:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
```

<<<<<<< HEAD
Such use of `regexp.exec` is an alternative to method `str.matchAll`.

Unlike other methods, we can set our own `lastIndex`, to start the search from the given position.

For instance, let's find a word, starting from position `4`:
=======
Such use of `regexp.exec` is an alternative to method `str.matchAll`, with a bit more control over the process.

Let's go back to our task.

We can manually set `lastIndex` to `4`, to start the search from the given position!

Like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

<<<<<<< HEAD
We performed a search of `pattern:\w+`, starting from position `regexp.lastIndex = 4`.

Please note: the search starts at position `lastIndex` and then goes further. If there's no word at position `lastIndex`, but it's somewhere after it, then it will be found:
=======
Hooray! Problem solved! 

We performed a search of `pattern:\w+`, starting from position `regexp.lastIndex = 4`.

The result is correct.

...But wait, not so fast.

Please note: the `regexp.exec` call starts searching at position `lastIndex` and then goes further. If there's no word at position `lastIndex`, but it's somewhere after it, then it will be found:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
<<<<<<< HEAD
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
=======
// start the search from position 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// found the match at position 4
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
alert(word[0]); // varName
alert(word.index); // 4
```

<<<<<<< HEAD
...So, with flag `pattern:g` property `lastIndex` sets the starting position for the search.

**Flag `pattern:y` makes `regexp.exec` to look exactly at position `lastIndex`, not before, not after it.**
=======
For some tasks, including the lexical analysis, that's just wrong. We need to find a match exactly at the given position at the text, not somewhere after it. And that's what the flag `y` is for.

**The flag `pattern:y` makes `regexp.exec` to search exactly at position `lastIndex`, not "starting from" it.**
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Here's the same search with flag `pattern:y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)
```

As we can see, regexp `pattern:/\w+/y` doesn't match at position `3` (unlike the flag  `pattern:g`), but matches at position `4`.

<<<<<<< HEAD
Imagine, we have a long text, and there are no matches in it, at all. Then searching with flag `pattern:g` will go till the end of the text, and this will take significantly more time than the search with flag `pattern:y`.

In such tasks like lexical analysis, there are usually many searches at an exact position. Using flag `pattern:y` is the key for a good performance.
=======
Not only that's what we need, there's an important performance gain when using flag `pattern:y`.

Imagine, we have a long text, and there are no matches in it, at all. Then a search with flag `pattern:g` will go till the end of the text and find nothing, and this will take significantly more time than the search with flag `pattern:y`, that checks only the exact position.

In tasks like lexical analysis, there are usually many searches at an exact position, to check what we have there. Using flag `pattern:y` is the key for correct implementations and a good performance.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
