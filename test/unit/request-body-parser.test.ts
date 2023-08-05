import { parseRequestBody } from '../../src/client/request/parser/request-body.parser';

it('Should parse body into string', () => {
  const body = {
    test: 'test',
  };

  const parsedBody = parseRequestBody(body);
  expect(parsedBody).toBe(JSON.stringify(body));
});

it('Should return empty string if object is empty', () => {
  const body = {};

  const parsedBody = parseRequestBody(body);
  expect(parsedBody).toBe('');
});
