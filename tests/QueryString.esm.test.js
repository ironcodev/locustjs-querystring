import QueryHelper, { parseQuery, createQuery } from '../index.esm.js';

describe('Testing Querystring library', () => {
    // --------------------- parseQuery -------------------

    test('1. parseQuery(): parses a querystring and returns an object', () => {
        const obj = parseQuery('a=10&b=ali');

        expect(obj).toBeDefined();
        expect(obj.a).toBeDefined();
        expect(obj.b).toBeDefined();
        expect(obj.a).toBe('10');
        expect(obj.b).toBe('ali');
    });

    test('2. parseQuery(): parses a querystring and returns an object', () => {
        const obj = parseQuery('type=Rock%20%26%20Roll');

        expect(obj).toBeDefined();
        expect(obj.type).toBeDefined();
        expect(obj.type).toBe('Rock & Roll');
    });

    test('3. parseQuery(): parses a querystring and returns an object', () => {
        const obj = parseQuery('a=10', true);

        expect(obj).toBeDefined();
        expect(obj.a).toBeDefined();
        expect(obj.a === 10).toBe(true);
    });

    // --------------------- createQuery -------------------

    test('1. parseQuery(): parses a querystring and returns an object', () => {
        const query = createQuery({ a: 10, b: 'ali' });

        expect(query).toBe('a=10&b=ali');
    });

    test('2. parseQuery(): parses a querystring and returns an object', () => {
        const query = createQuery({ type: 'Rock & Roll', order: 'title' });

        expect(query).toBe('type=Rock%20%26%20Roll&order=title');
    });
});

