# Mat X Space Blog files

This repo holds the files that power up the Mat X Space Blog! Initially based on [this repo](https://github.com/kevin-powell/JAMStack-blog-starter).

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd matxspace-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with live reloading:

```bash
npm start
```

This will:
- Build the site using Eleventy
- Start a local development server at `http://localhost:8080`
- Watch for file changes and automatically rebuild

### Production Build

To build the site for production:

```bash
npm run build
```

This will generate the static files in the `public/` directory, ready for deployment.

## Project Structure

- `src/` - Source files
  - `_includes/` - Nunjucks templates (header, footer, base layout)
  - `assets/` - Static assets (CSS, JS, images)
  - `blog/` - Blog post markdown files
  - `admin/` - Admin pages
  - `index.njk` - Homepage template
- `public/` - Generated static site (created by Eleventy)
- `plans/` - Implementation plans and documentation
- `.eleventy.js` - Eleventy configuration
- `package.json` - Node.js dependencies and scripts

## Technologies Used

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating engine
- [Luxon](https://moment.github.io/luxon/) - Date/time handling
- Custom CSS - Responsive design system
