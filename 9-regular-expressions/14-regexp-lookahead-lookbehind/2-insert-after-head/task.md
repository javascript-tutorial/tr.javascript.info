# Insert After Head

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

After that the value of `str` should be:
<<<<<<< HEAD
=======

>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
