# web_scrapper

```
function myFunction() {
    var rowsCount = jsonData.length;
    var values = jsonData.map(({img, stars, name, ingredients, where, effect}) =>
        [`=IMAGE("${img}", 4, 60, 60)`, stars, name, ingredients.map(i => `- ${i}`).join('\n'), where, effect]
    );
    var header = ['Image', 'Rarity', 'Name', 'Ingridients', 'Where to find', 'Effect'];
    values.unshift(header)
    SpreadsheetApp.getActiveSpreadsheet().getRange(`B1:G${rowsCount + 1}`).setValues(values)
}
```
