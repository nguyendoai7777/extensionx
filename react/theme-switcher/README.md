nhớ nhét đoạn này vào head trong index

```js
(function () {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme =
        stored === "light" || stored === "dark"
            ? stored
            : prefersDark
                ? "dark"
                : "light";

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = "light dark";
})();
```
