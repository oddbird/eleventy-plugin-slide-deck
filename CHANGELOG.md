## v0.3.0 - unreleased

- Breaking: Image slides use `slide.credit` rather than `slide.cite`
  for displaying photo credit.
- Breaking: Remove new pen templates and `pen: new` behavior,
  since the use-case is simple to handle with known pens.
- Fix bug where `<pen-slide>` and `<demo-slide>`
  now extend `<embed-slide>` directly,
  including necessary styles.
- Add `slideDeck` collection (name can be configured).
- Pre-build slide data into `$data.slideDeck`
  with known slides/series references resolved,
  and slide layout determined (when not provided).
  This can be configured with an additional build function.
- Pre-build cited resources and CodePen demos into
  `$data.slideResources.cite` and `$data.slideResources.pens`.
  Both are filtered to include unique links,
  and return an array of inline markdown strings.
- Support explicit slide layouts with `slide.layout` property.
- Support series references with `slide.series` property
  (similar to `slide.known` but for referencing multiple slides).
- Add `<render-slide>` component for rendering slide data
  with a built-in layout.
- Simplify `<pen-slide>` to remove extra (never-documented) features,
  and add support for CodePen 2.0 pens.
- All slide types accept a markdown `slide.cite` property.
- Slides that have `slide.source`, `slide.name`, or `slide.url`
  will generate default `slide.cite` data
  if not provided explicitly.
- Quote slides will use either `slide.img` or `slide.avatar` data
  for rendering an avatar next to the quote.
- Add `<source-slide>` to display a resource with optional avatar/image.
  Since source information is allowed on all slide layouts,
  this is only the default when no other data is provided.
- Add `<error-slide>` to stop build failures
  when a slide component is rendered without `slide` data,
  and to render a json string when the data isn't recognized.
- Default slide deck theme supports both light and dark modes out of the box,
  using `light-dark()` so that control is left to the page.

Configuration Options…

- `collectionName` changes the name of the `slideDeck` collection,
  including every page with `slides` data.
- `buildFunction` (when provided)
  will be called on each slide during the build process.
  Use this to set additional layout types
  or make other slide-data alterations.
- `known.slides` (default `knownSlides`)
  and `known.series` (default `knownSeries`)
  establish where to look for slide and series source data.

Provided filters…

- Remove `placeHolder()` (use `slideImg()` without a path).
- Add `buildSlides()` for building out slide decks from any slide data.
- Change `slideStyles()` so that `color`, `background`, and `mode`
  are always allowed.

## v0.2.0 - 2025-04-25

- Add default theme
- Update docs
