# Runtime IFI Website

The official website for IFI Runtime, a running club at the Institute of Informatics (IFI) for everyone who enjoys running. The site provides information about the club, upcoming events, and contact details.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher recommended)
- npm or yarn

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/RUNTIME-IFI/runtime-ifi.github.io.git
cd runtime-ifi.github.io
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components (Home, About, Contact, etc.)
├── App.tsx         # Main app component
└── main.tsx        # Application entry point
```

## Deployment

This project has two deployment workflows configured:

### 1. GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Workflow:** [`.github/workflows/pages.yml`](.github/workflows/pages.yml)

**Process:**
1. Checks out the repository
2. Sets up Node.js 20 with npm caching
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Creates a `.nojekyll` file in the dist directory
6. Uploads and deploys the build artifact to GitHub Pages

**Manual trigger:** Can also be triggered manually via workflow_dispatch

### 2. Mirror to Vercel

The repository is automatically mirrored to [vuhnger/runtime-ifi](https://github.com/vuhnger/runtime-ifi) on every push to any branch. The mirrored repository is then used for deployment on Vercel.

**Workflow:** [`.github/workflows/mirror-to-vuhnger.yml`](.github/workflows/mirror-to-vuhnger.yml)

**Process:**
1. Checks out the full repository history (including all branches and tags)
2. Sets up SSH authentication using a deploy key
3. Configures Git identity as "mirror-bot"
4. Force-pushes all branches and tags to the mirror repository
5. Optionally cleans up branches that were deleted in the source (protects the default branch)

**Required Secret:**
- `MIRROR_SSH_PRIVATE_KEY`: SSH private key for authentication with the mirror repository

Without this secret configured, the mirror workflow will fail with:
```
Error: The ssh-private-key argument is empty. Maybe the secret has not been configured,
or you are using a wrong secret name in your workflow file.
```

#### Setting Up SSH Authentication for Mirroring

Follow these steps to configure SSH authentication:

1. **Generate an SSH key pair:**
   ```bash
   ssh-keygen -t ed25519 -C "mirror-bot@runtime-ifi" -f ~/.ssh/runtime_mirror_key -N ""
   ```
   This creates two files:
   - `~/.ssh/runtime_mirror_key` (private key)
   - `~/.ssh/runtime_mirror_key.pub` (public key)

2. **Add the public key to the mirror repository:**
   - Go to the mirror repository: https://github.com/vuhnger/runtime-ifi
   - Navigate to Settings > Deploy keys
   - Click "Add deploy key"
   - Title: `Mirror Bot Deploy Key`
   - Paste the contents of `~/.ssh/runtime_mirror_key.pub`
   - Check "Allow write access" (required for pushing)
   - Click "Add key"

If you need access to deploy this project, email runtimeifi@gmail.com your public ssh key.

3. **Add the private key as a GitHub secret:**
   - Go to this repository: https://github.com/RUNTIME-IFI/runtime-ifi.github.io
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `MIRROR_SSH_PRIVATE_KEY`
   - Value: Paste the entire contents of `~/.ssh/runtime_mirror_key` (including the header and footer)
   - Click "Add secret"

4. **Verify the setup:**
   - Push a commit to any branch
   - Check the Actions tab to see if the mirror workflow runs successfully
   - Verify the changes appear in the mirror repository

**Security Note:** Keep the private key secure and never commit it to the repository. Only add it as a GitHub secret.

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** and ensure the code follows the existing style
3. **Test your changes** by running `npm run dev` and checking the site locally
4. **Run the linter** with `npm run lint` and fix any issues
5. **Commit your changes** with clear, descriptive commit messages
6. **Push to your fork** and submit a pull request

### Guidelines

- Write clear, concise commit messages
- Keep pull requests focused on a single feature or fix
- Update documentation if you're changing functionality
- Respect the existing code style and structure
- Test your changes thoroughly before submitting

### Reporting Issues

If you find a bug or have a suggestion, please open an issue on GitHub with:
- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior (for bugs)

## License

This project is maintained by Runtime IFI.

## Contact

For questions about the running club, visit the Contact page on the website or reach out through the channels listed there.
