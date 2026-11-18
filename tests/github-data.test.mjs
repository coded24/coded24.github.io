import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveGithubData, selectRepositories } from '../scripts/github-data.mjs';

const config = { username: 'coded24', pinned: ['second'], excluded: ['private-by-policy'] };
const repository = (name, updated_at, extras = {}) => ({
  name,
  html_url: `https://github.com/coded24/${name}`,
  description: null,
  language: 'TypeScript',
  stargazers_count: 0,
  updated_at,
  owner: { login: 'coded24' },
  ...extras,
});

test('orders pinned repositories first and excludes forks, archives, private repos, and configured names', async () => {
  const result = await resolveGithubData({
    fetchRepositories: async () => [
      repository('newest', '2026-02-01'),
      repository('second', '2025-01-01'),
      repository('fork', '2026-03-01', { fork: true }),
      repository('archived', '2026-03-01', { archived: true }),
      repository('private', '2026-03-01', { private: true }),
      repository('private-by-policy', '2026-03-01'),
    ],
    fallback: [],
    config,
  });

  assert.equal(result.source, 'api');
  assert.deepEqual(result.repositories.map(({ name }) => name), ['second', 'newest']);
});

test('uses the static snapshot when the API fails', async () => {
  const snapshot = [repository('cached', '2025-01-01')];
  const result = await resolveGithubData({
    fetchRepositories: async () => { throw new Error('offline'); },
    fallback: snapshot,
    config,
  });

  assert.equal(result.source, 'fallback');
  assert.equal(result.error, 'offline');
  assert.deepEqual(result.repositories.map(({ name }) => name), ['cached']);
});

test('keeps an empty API result empty instead of substituting stale repositories', async () => {
  const result = await resolveGithubData({
    fetchRepositories: async () => [],
    fallback: [repository('stale', '2025-01-01')],
    config,
  });

  assert.equal(result.source, 'api');
  assert.deepEqual(result.repositories, []);
});

test('applies the same filters to cached fallback data', () => {
  const result = selectRepositories([
    repository('visible', '2025-01-01'),
    repository('another-owner', '2026-01-01', { owner: { login: 'someone-else' } }),
  ], config);

  assert.deepEqual(result.map(({ name }) => name), ['visible']);
});