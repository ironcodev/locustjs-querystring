import QueryHelper from '../index.esm.js';

let obj, query;

obj = QueryHelper.parse('a=12&b=ali', true);
query = QueryHelper.stringify(obj, 'b');

console.log(obj);
console.log(query);