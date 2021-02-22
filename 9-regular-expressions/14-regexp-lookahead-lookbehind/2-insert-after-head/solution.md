<<<<<<< HEAD
In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*>` for that.
=======
In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*?>` for that.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

In this task we don't need to modify the `<body>` tag. We only need to add the text after it.

Here's how we can do it:

```js run
let str = '...<body style="...">...';
<<<<<<< HEAD
str = str.replace(/<body.*>/, '$&<h1>Hello</h1>');
=======
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*>`. It gets replaced by itself plus `<h1>Hello</h1>`.
=======
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

An alternative is to use lookbehind:

```js run
let str = '...<body style="...">...';
<<<<<<< HEAD
str = str.replace(/(?<=<body.*>)/, `<h1>Hello</h1>`);
=======
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

As you can see, there's only lookbehind part in this regexp.

It works like this:
- At every position in the text.
<<<<<<< HEAD
- Check if it's preceeded by `pattern:<body.*>`.
- If it's so then we have the match.

The tag `pattern:<body.*>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `pattern:<body.*>`.

So we replaces the "empty line", preceeded by `pattern:<body.*>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also useful: `pattern:/<body.*>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
=======
- Check if it's preceeded by `pattern:<body.*?>`.
- If it's so then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `pattern:<body.*?>`.

So we replaces the "empty line", preceeded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
