Answers: **no, yes**.

- In the script `subject:Java` it doesn't match anything, because `pattern:[^script]` means "any character except given ones". So the regexp looks for `"Java"` followed by one such symbol, but there's a string end, no symbols after it.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD
- Yes, because the part `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
