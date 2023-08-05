import { PaginateQuery } from '../../src/client/request/query/paginate.query';
import { buildQuery } from '../../src/client/request/query/query.builder';

it('Should create query string from paginate query object', () => {
  const query: PaginateQuery = {
    limit: 10,
    order: 'asc',
    starting_after: 'test',
    ending_before: 'test',
  };

  const queryString = buildQuery(query);

  expect(queryString).toBe(
    '?limit=10&order=asc&starting_after=test&ending_before=test',
  );
});
