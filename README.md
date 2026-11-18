# Christopher Agbagba — Portfolio

A static Astro portfolio for a backend developer and Linux systems administrator. GitHub is the source repository and primary publishing target; Netlify can build the same repository as a second deployment.

## Local setup

Requirements: Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Run the production checks and build:

```sh
npm run check
npm run build
npm run preview
```

The build fetches public repositories from GitHub. If the API is unavailable, it uses `src/content/github-repos.fallback.json`. A `GITHUB_TOKEN` environment variable is optional and is only used by the build script.

## Updating portfolio content

- Edit `src/content/site.ts` for profile copy, contact details, social links, and skills.
- Edit `src/content/projects.ts` for featured and additional projects.
- Edit `src/content/github-config.json` to pin repositories or exclude names.
- Put real project screenshots in `public/images/` and use their paths in project data. Add descriptive alt text.
- The printable CV is at `/cv`. Use its **Print / save as PDF** control to create a PDF; add the original PDF to the site later if preferred.

### Add a recent project

Add one object to `recentProjects` in `src/content/projects.ts`:

```ts
{
  title: 'Project title',
  date: '2026-11-17',
  description: 'A short, factual description of the project.',
  tags: ['Python', 'Linux'],
  repo: 'https://github.com/coded24/repository',
  live: '',
  image: '',
  imageAlt: '',
  published: true,
}
```

Use an ISO date (`YYYY-MM-DD`). Projects are sorted newest first. Keep `published` false until the description and date are ready; unpublished drafts are not shown.

## GitHub repository section

`src/content/github-config.json` contains the GitHub username, ordered pinned repository names, excluded repository names, and display count. Public repositories are fetched during each build. Forks, archived repositories, private repositories, and configured exclusions are omitted.

No token is needed for normal builds. For a higher API rate limit, set `GITHUB_TOKEN` in the build environment to a read-only token. Never add a token to a source file or commit it. The checked-in fallback is a static snapshot; update it with selected public repository records if you want the section populated while GitHub is unavailable.

The GitHub Actions workflow rebuilds daily. Netlify rebuilds on pushes when connected to the repository. To make scheduled GitHub data refresh on Netlify too, create a Netlify build hook and save its URL as the GitHub Actions secret `NETLIFY_BUILD_HOOK`.

## GitHub Pages

1. Create a public repository named `coded24.github.io` under the `coded24` account.
2. Connect this local repository and make its first push:

  ```sh
  git remote add origin https://github.com/coded24/coded24.github.io.git
  git add .
  git commit -m "Build portfolio"
  git push -u origin main
  ```

3. In repository **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
4. The included workflow installs dependencies, runs the static build, and publishes `dist/` on pushes and daily.

The configured canonical URL and sitemap use `https://coded24.github.io`. If the repository name or domain changes, update `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt`.

## Netlify

Import the same GitHub repository in Netlify. Use `npm run build` as the build command and `dist` as the publish directory; `netlify.toml` already supplies these settings. Netlify then creates deploy previews and publishes changes pushed to GitHub.

GitHub Pages and Netlify can both serve the site at their own addresses. A custom domain can be connected later to the host you choose as canonical; one domain should point to one primary host. Update the canonical URL and sitemap when selecting that domain.

## Deployment notes

Project dates, project links, and a Wi-Fi Hotspot Manager description are intentionally left unpublished until confirmed. The CV page is built from the supplied resume text; no dates or degree details were added where the resume did not provide them.