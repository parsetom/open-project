import { getSlug } from './stringUtil';

it('should get the slug', () => {
  const slug = '1';
  const path = 'http://www.example.com/1';
  const extractedSlug = getSlug(path);
  expect(extractedSlug).toEqual(slug);
});

it('should not process slug if url is empty', () => {
  expect(getSlug('')).toEqual('');
  expect(getSlug(null)).toEqual(null);
});
