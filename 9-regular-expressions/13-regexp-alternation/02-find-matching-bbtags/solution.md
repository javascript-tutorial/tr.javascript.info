
<<<<<<< HEAD
Opening tag is `pattern:\[(b|url|quote)\]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1\]`.
=======
Opening tag is `pattern:\[(b|url|quote)]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

In action:

```js run
<<<<<<< HEAD
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;
=======
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

<<<<<<< HEAD
Please note that besides escaping `pattern:[` and `pattern:]`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
