export async function fetchGithubRepositories({ username, token, fetchImpl = fetch }) {
  const repositories = [];

  for (let page = 1; ; page += 1) {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'christopher-agbagba-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetchImpl(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=owner&sort=updated`,
      { headers, signal: AbortSignal.timeout(10000) },
    );
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

    const pageRepositories = await response.json();
    if (!Array.isArray(pageRepositories)) throw new Error('GitHub API returned an unexpected response');
    repositories.push(...pageRepositories);
    if (pageRepositories.length < 100) break;
  }

  return repositories;
}

export function selectRepositories(repositories, { username, pinned = [], excluded = [] }) {
  const excludedNames = new Set(excluded.map((name) => name.toLowerCase()));
  const pinOrder = new Map(pinned.map((name, index) => [name.toLowerCase(), index]));

  return repositories
    .filter((repository) =>
      repository &&
      repository.private !== true &&
      repository.fork !== true &&
      repository.archived !== true &&
      repository.owner?.login?.toLowerCase() === username.toLowerCase() &&
      typeof repository.name === 'string' &&
      !excludedNames.has(repository.name.toLowerCase()),
    )
    .sort((left, right) => {
      const leftPin = pinOrder.get(left.name.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
      const rightPin = pinOrder.get(right.name.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
      if (leftPin !== rightPin) return leftPin - rightPin;
      return new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime();
    })
    .map(({ name, html_url, description, language, stargazers_count, updated_at }) => ({
      name,
      html_url,
      description,
      language,
      stargazers_count,
      updated_at,
    }));
}

export async function resolveGithubData({ fetchRepositories, fallback, config }) {
  try {
    const repositories = await fetchRepositories();
    return { repositories: selectRepositories(repositories, config), source: 'api' };
  } catch (error) {
    return {
      repositories: selectRepositories(fallback, config),
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown GitHub API error',
    };
  }
}