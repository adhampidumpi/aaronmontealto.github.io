# Aaron Dave's portfolio

A responsive React + Vite + Tailwind CSS portfolio for Aaron Dave Montealto, a second-year Computer Science student building practical software skills. Content uses verified information and makes no claims about paid client work or completed projects.

## Run locally

Use Node.js 22.13+ (22.x) or Node.js 24+, then run:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. In Windows PowerShell, if `npm.ps1` is blocked by the execution policy, use `npm.cmd install` and `npm.cmd run dev`. There is no need to change your system execution policy.

## Edit your information

Personal information, skill groups, interests, education, and project records live in `src/data/portfolio.js`.

- Replace `[Institution name]` and `[Attendance dates]` with your actual education details when ready.
- Set `email` and `linkedin` to valid contact details to display their links. Leave them empty to hide the links.
- Keep skill claims and freelance availability accurate as your experience grows.
- The GitHub profile is `https://github.com/adhampidumpi`.

Add your own portrait at `public/images/aaron-3d.png`. The site has a monogram placeholder when the image is unavailable; it does not use an invented portrait.

After adding the portrait, reload the page. If changing the name or positioning, also update the page title and description in `index.html`.

## Add a real project

The `projects` array starts empty. The page shows an intentional empty state until you add a real project record. Every record supports these fields:

| Field | Content |
| --- | --- |
| `title` | Actual project name |
| `description` | An honest description of the work and its current state |
| `techStack` | Array of technology names used by that project |
| `status` | `planned`, `in-progress`, or `completed` |
| `image` | Image URL or local public path, such as `/images/my-project.png`; empty if unavailable |
| `githubUrl` | Valid HTTP(S) repository URL; empty if unavailable |
| `demoUrl` | Valid HTTP(S) demo URL; empty if unavailable |

Status labels are always visible. Missing or broken project images receive a fallback. Missing or invalid project URLs do not create links. A planned project should remain marked `planned` until work has begun; mark it `completed` only when it is finished.

## Validate

```sh
npm run lint
npm run build
```

Use `npm.cmd` instead of `npm` on Windows if needed. The production build is generated in `dist/`. No automated test script or test suite is configured; validation uses build, lint, and manual browser checks.

Check the website at 360px, 390px, 768px, and 1440px wide:

- Confirm the hero, portrait, buttons, navigation, and cards fit without horizontal scrolling.
- Open and close the mobile navigation, and follow its section links.
- Use Tab and Shift+Tab to verify visible focus and keyboard access; confirm the skip link reaches the main content.
- Confirm **View My Work** reaches Projects and GitHub links reach the correct profile.
- Confirm unprovided email and LinkedIn buttons are hidden.
- Enable the operating system's reduced-motion preference and check that motion is reduced.
- Check the portrait fallback with the portrait file absent, then add your real portrait and verify it loads.

In Chrome, open DevTools with F12 and toggle the device toolbar with Ctrl+Shift+M. Select Responsive and enter each width above. Also try a desktop height of 720px to check the scrollable sidebar. The mobile menu closes with Escape, outside clicks, and section selection. At the bottom of the page, Contact should be the active navigation link.

The lint dependencies use a scoped `minimatch` override to avoid [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). Build and lint must pass when updating this override; remove it when upstream ESLint dependencies include a patched version.

Hosting configuration is stored in `.openai/hosting.json`. The Sites publishing workflow synchronizes the source and deploys the production files from `dist/`. Local caches and temporary verification files are excluded from source control.
