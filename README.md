# Kavitha Laboratory Website

This project is designed so a professor or lab administrator can update most information without writing code.

## Edit content easily

All editable content is stored in the `data/` folder:

- `data/professor.json` — professor profile, university, department, biography, contact details
- `data/members.json` — members and research students
- `data/research.json` — research themes and descriptions
- `data/publications.json` — publications and academic outputs
- `data/news.json` — laboratory news and announcements
- `data/site-config.json` — site title, footer text, contact email, maps link and base URL

Do not edit `index.html`, `research.html`, `members.html`, `publications.html`, or `news.html` for normal content changes. Those pages are templates and should stay as they are.

## Local development

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Validate data files

```bash
npm run validate:data
```

This checks whether all JSON content files are valid.

## Build for production

```bash
npm run build
```

## GitHub Pages deployment

The repo includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

After pushing the code to GitHub, open the repository settings and enable GitHub Pages with the GitHub Actions source.

## Recommended editing workflow

1. Open the relevant JSON file inside `data/`
2. Update the text you want to change
3. Save the file
4. Run `npm run dev` to preview the site locally
5. Run `npm run validate:data` before publishing

## Notes

- Keep JSON valid.
- Use double quotes for strings.
- If you are unsure, edit only the data files and leave the HTML templates alone.
