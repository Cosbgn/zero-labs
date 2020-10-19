# zero-labs

Main repo for small opensource projects for Zero.sh - More info at Zero.sh/labs

# Google Sheets to JSON (GS2JSON)
A simple API which allows anyone to convert easily any public spreadsheet to a well formatted JSON.

To use it simply set you Google Sheet to public (file -> publish to web) and then visit the url: `https://zero.sh/labs/api/gs2json?url=YOUR-SPREADSHEET-URL`

That's it! If you want more options you can use the following URL parameter:

| name   | possible values      | example                                                    | description                                                                                                                                                                  |
|--------|----------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url    | the spreadsheet url  | https://docs.google.com/spreadsheets/d/12345677/edit#gid=0 | The entire spreadsheet url                                                                                                                                                   |
| id     | the spreadsheet id   | 12345677                                                   | Just the ID, This is optional, if you pass the URL you don't need to pass the ID                                                                                             |
| format | 1 or 2 or 3          | 3                                                          | The API can return the data formatted in different ways:  1: An object without columns names 2: An object with column names 3: An Array of the rows with mapped column names |
| sheet  | Any number           | 1                                                          | The number of the sheet you want to access                                                                                                                                   |

