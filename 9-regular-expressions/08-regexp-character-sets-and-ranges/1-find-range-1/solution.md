Answers: **no, yes**.

- In the script `subject:Java` it doesn't match anything, because `pattern:[^script]` means "any character except given ones". So the regexp looks for `"Java"` followed by one such symbol, but there's a string end, no symbols after it.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD:9-regular-expressions/08-regexp-character-sets-and-ranges/1-find-range-1/solution.md
- Yes, because the part `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> 6989312841d843f2350803ab552d9082437be569:9-regular-expressions/08-regexp-character-sets-and-ranges/1-find-range-1/solution.md

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
