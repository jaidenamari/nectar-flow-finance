# Nectar Flow Finance

Source for [nectarflowfinance.com](https://nectarflowfinance.com), a personal finance blog about building wealth without the complexity. Built with Jekyll and the minima theme, with a custom botanical-editorial style, and deployed by GitHub Pages from `main`.

## Local development

Requires Ruby and Bundler.

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Layout

| Path | What lives there |
| --- | --- |
| `_posts/` | Published posts, named `YYYY-MM-DD-slug.md` |
| `_categories/` | Category landing pages (collection, served at `/category/:name/`) |
| `_layouts/`, `_includes/` | Page templates; these override the minima theme's |
| `_sass/` | Design tokens (`_variables.scss`) and component styles |
| `assets/` | Compiled CSS entry point and post images |
| `_notes/` | Local-only planning, research and brand notes (gitignored) |

## License

Content is copyright © 2024–2026 Nectar Flow Finance.
