import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { fetchGithubRepositories, resolveGithubData } from './github-data.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(root, 'src/content');
const config = JSON.parse(await readFile(resolve(contentDir, 'github-config.json'), 'utf8'));
const fallback = JSON.parse(await readFile(resolve(contentDir, 'github-repos.fallback.json'), 'utf8'));

const result = await resolveGithubData({
  fetchRepositories: () => fetchGithubRepositories({
    username: config.username,
    token: process.env.GITHUB_TOKEN,
  }),
  fallback,
  config: {
    username: config.username,
    pinned: config.pinnedRepositories,
    excluded: config.excludedRepositories,
  },
});

await writeFile(resolve(contentDir, 'github-repos.json'), `${JSON.stringify(result.repositories, null, 2)}\n`);

if (result.source === 'fallback') {
  console.warn(`GitHub API unavailable (${result.error}); using the checked-in repository snapshot.`);
} else if (result.repositories.length === 0) {
  console.info('GitHub API succeeded; no eligible public repositories were found.');
} else {
  console.info(`Fetched ${result.repositories.length} public repositories from GitHub.`);
}