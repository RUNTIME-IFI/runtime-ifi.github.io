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
