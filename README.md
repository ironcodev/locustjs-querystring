# locustjs-querystring
This library provides querystring utilities.

Currently there is a single function named parseQuery() in this library that eases parsing strings in querystring format. It receives a string and returns a json object.

```javascript
import { parseQuery } from 'locustjs-querystring';

var result = parseQuery('name=John%20Doe&age=23&city=UK&agree=true');

console.log(result);

/*
  {
    age: "23"
    agree: "true"
    city: "UK"
    name: "John Doe"
  }
*/
```
