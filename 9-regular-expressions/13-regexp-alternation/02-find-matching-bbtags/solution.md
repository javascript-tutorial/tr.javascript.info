
<<<<<<< HEAD
Opening tag is `pattern:\[(b|url|quote)\]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1\]`.
=======
Opening tag is `pattern:\[(b|url|quote)]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

In action:

```js run
<<<<<<< HEAD
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;
=======
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

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
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b
