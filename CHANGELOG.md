## v0.3.0 - unreleased

- Breaking: Image slides use `slide.credit` rather than `slide.cite`
  for displaying photo credit.
- Add `slideDeck` collection (name can be configured).
- Support explicit slide layouts with `layout` property.
- Support series references with `series` property
  (similar to `known` but for referencing multiple slides).
- Pre-build slide data into `$data.slideDeck`
  with known slides/series references resolved,
  and slide layout determined
  (can be configured with additional build steps).
- Add `<render-slide>` component for rendering slide data
  with a built-in layout.
- More slide types use `source`/`title`, `url`, and `name`
  do display links to source material
  (these properties can also be nested under `cite`).
- Quote slides will use either `img` or `avatar` data
  for rendering an avatar next to the quote.
- Add `source-slide` to display a resource link with an image
- `<default-slide>` will render `JSON.stringify(slide)` output
  when no properties are recognized for output.
- Add `<error-slide>` to stop build failures
  when a slide component is rendered without `slide` data.

Configuration Options…

- `collectionName` changes the name of the `slideDeck` collection,
  including every page with `slides` data.
- `buildStepFunction` (when provided)
  will be called on each slide during the build process.
  Use this to set additional layout types
  or make other slide-data alterations.
- `known.slides` (default `knownSlides`)
  and `known.series` (default `knownSeries`)
  establish where to look for slide and series source data.

Provided filters…

- Remove `placeHolder()` (use `slideImg()` without a path).
- Add `buildSlides()` for building out slide decks from any slide data.
- Add `slideSourceMDown()` and `slideCiteMDown()`
  for converting source/cite data into a markdown link.
- Change `slideStyles()` so that `color`, `background`, and `mode`
  are always allowed.

## v0.2.0 - 2025-04-25

- Add default theme
- Update docs
