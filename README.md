# Eleventy Slide-Deck Plugin

A plugin to use the
[`@oddbird/slide-deck`](https://github.com/oddbird/slide-deck)
web component in eleventy projects --
and generate decks from data.

[Demo](https://11ty-slide-deck.netlify.app/)

Any page with `slides` data
will be added to the (configurable) `slideDeck` collection,
and provided with a built-out `slideDeck` data property
ready for rendering.

## Config

We rely on the official WebC plugin,
but don't install it for you.
Configure both plugins,
and register the provided components:

```js
// eleventy config
import pluginWebc from "@11ty/eleventy-plugin-webc";
import pluginSlideDeck from "@oddbird/eleventy-plugin-slide-deck";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSlideDeck, {
    // optional slide deck configuration
  });

  // register the slide-deck WebC components
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'npm:@oddbird/eleventy-plugin-slide-deck/**/*.webc',
    ],
  });
}
```

There are several (optional) configuration settings
for this slide deck plugin:

- `collectionName` changes the name of the generated `slideDeck` collection,
  including every page that has `slides` data.
- `buildFunction` (when provided)
  will be called on each slide during the build process,
  after relationships have resolved, but before layout is determined.
  Use this to set additional layout types
  or make other slide-data alterations.
- `markdownIt` is an option object
  passed along to the `markdown-it` package
- `markdownFunctions.inline` & `markdownFunctions.block` allow
  replacing the markdown parser entirely,
  in case you want to add plugins or use a different library.
- `domain` is a string optionally
  prepended to the page url on event slides,
  to show the URL of the slide deck
- `eventDateLocale` and `eventDateFormat` options
  for rendering the event date with `toLocaleDateString()`
- `imgDir` optionally prepends a path
  to all slide image properties (such as `src` and `avatar`)
- `known.slides` (default `knownSlides`)
  and `known.series` (default `knownSeries`)
  establish where to look for slide and series source data.

## Usage

Build an entire slide-deck from structured data:

```html
---yaml
slides:
- title: My Presentation
  venue: Cool Web Club
  date: 2024-11-20
  caption: '@mia@front-end.social'
- img: './my-image.jpg'
  alt: a very tall or short building or not a building at all
- quote: "This is one of the bests talks I've ever seen"
  cite: People who see your talk
---

<build-deck webc:nokeep :slides="this.slideDeck" id="if-you-want"></build-deck>
```

JavaScript for interactivity
and loading the baseline `support` content
are included in the default bundle.
Make sure it's included in a template:

```js
<script webc:keep @raw="getBundle('js')"></script>
```

Along with the core and (optional) theme style bundles:

```html
<style @raw="getBundle('css', 'slides-layer-order')" webc:keep></style>
<style @raw="getBundle('css', 'slides-core')" webc:keep></style>
<!--- Add optional slide theme styles --->
<style @raw="getBundle('css', 'slides-theme')" webc:keep></style>
```

### Writing slides

Create your slides in any data format
supported by Eleventy,
[or add your own](https://www.11ty.dev/docs/data-custom/).
This package adds a `.slides` data format to Eleventy,
that is a markdown script
with yaml comments for the slides:

```md
<!-- @slide
title: Hello World
background: mediumVioletRed
mode: dark
-->

The stuff inside the comment
is structured YAML
that describes the slide itself,
while this bit of _markdown_
will be used for speaker notes
(the `slide.note` property described below).
```

We provide several built-in slide layouts
that accept a variety of properties:

- all slide layouts support…
  - `slide.id` used for the `id` attribute
  - `slide.caption` for a caption under the slide
  - `slide.note` for speaker notes
  - `slide.source`, `slide.name`, & `slide.url`
    for providing credit (often appended to the `caption`)
  - `slide.cite` Markdown text, often appended to the `caption`.
    This is useful when you want to provide links to more info
    without changing how the slide is rendered otherwise.
  - `slide.background`, `slide.color`, & `slide.mode` CSS values

- `<event-slide>` -- usually the first/last slides of a deck
  - `slide.pre`, `slide.title`, & `slide.sub` for the talk title block
  - `slide.venue` the event title
  - `slide.date` the date of the talk
  - `slide.exit` optional (inline markdown) "back" link in the top
  - `slide.detail` optional (block markdown) section for more detail

- `<todo-slide>` -- for drafting a new talk
  - `slide.todo` markdown block

- `<default-slide>` -- titles, bullets, and arbitrary content
  - `slide.pre`, `slide.title`, and `slide.sub` create the title block
  - `slide.md`, and `slide.webc` allow for arbitrary content

- `<img-slide>`
  - `slide.src` and `slide.alt` to embed an image
  - `slide.credit` for (inline markdown) photo credits
  - `slide.fit`, `slide.position`, & `slide.padding` CSS values

- `<split-slide>` -- combo of `image-slide` and `default-slide` props
- `<source-slide>` -- combo of `image-slide` and `source`/`name`/`url` data

- `<url-slide>` -- screenshot or open-graph image slide, generated from a url
  using the [11ty APIs](https://www.11ty.dev/docs/api-services/)
  - `slide.url` source URL
  - `slide.alt` optional alt text for the image
  - `slide.size` controls the screenshot size/dimensions
  - `slide.type` can be set to `og` to use the open-graph API instead
  - `slide.title` will be added to the caption (and used as alt-fallback)
  - `slide.fit`, `slide.position`, & `slide.padding` CSS values

- `<quote-slide>`
  - `slide.quote` the (block markdown) text of the blockquote
  - `slide.cite` a (inline markdown) citation after the quote
  - `slide.img` or `slide.avatar` an image next to the quote
  - `slide.alt` optional alt text for the avatar

- `<embed-slide>` -- `slide.embed` for the code to embed (iframe, video, etc)
- `<demo-slide>` -- embeds and iframe, with a permalink in the caption
  - `slide.demo` any URL or Eleventy page with matching `demo` value
- `<pen-slide>` -- embed editable demos from code-pen
  - `slide.pen` URL of the CodePen
  - `slide.title` name of the pen, added to the caption
  - `slide.live` link a live-code version of the demo, if different
  - `slide.preview` (boolean) set `true` for click-to-load behavior
- `<code-slide>`
  - `slide.<language>` (for `html`, `css`, `scss`, or `js`)
  - or `slide.code` and `slide.lang` for any other languages
- `<support-slide>`
  - `slide.caniuse` feature id for CanIUse
  - `slide.support` feature id for Baseline

All markdown properties also allow `WebC` content as well.

### Known (reusable) slides

Reuse common slides across different decks
by creating adding a `knownSlides` object
to the Eleventy data cascade:

```yaml
# _data/knownSlides.yml
start-deck:
  exit: >
    [home](/)
  caption: |
    <img src="oddbird-logo.svg" alt="OddBird" sizes="96w" width="180">
    <a href="https://front-end.social/@mia">
      @mia@front-end.social
    </a>
    <span>
      (<kbd>Cmd/Ctr-k</kbd> for settings)
    </span>
yoda:
  img: yoda.jpg
  alt: Yoda using the force in a swamp
  fit: cover
  position: top
```

These can be referenced in a slide deck,
using the `slide.known` property.
Additional properties added here
will be combined with (or override)
properties in the known slide:

```yaml
slides:
- known: start-deck
  title: New Presentation
  venue: The Best Conference
- known: yoda
  note: yoda, with speaker notes
```

Re-use an entire series of slides
with `knownSeries` data:

```yaml
# _data/knownSeries.yml
intro:
- known: start-deck
  title: New Presentation
  venue: The Best Conference
- img: './my-image.jpg'
  alt: Miriam smiling
  title: Miriam Suzanne
  sub: Web developer
```

```yaml
slides:
- series: intro
- title: More slides…
```

Change the `known.slides` and `known.series` configuration options
to store known slide & series data under a different name.

### Rendering the slides

Use the built-in `<build-deck>` component
to render a slide deck
using the provided slide layouts:

```html
<build-deck webc:nokeep :slides="this.slideDeck"></build-deck>
<!-- be sure to include js and css bundles as needed -->
```

For more flexibility
use the `<slide-deck>`,
`<render-slide>` and `<slide-controls>` components
to loop through your slide data --
and optionally add custom layouts…

```html
<slide-deck
  webc:import="npm:@oddbird/slide-deck"
  :id="this.id || 'slides'"
  :@slides="this.slides"
  slide-view="slideshow"
  key-control
  follow-active
>
  <template webc:nokeep webc:for="slide of this.slideDeck">
    <!-- render custom layouts -->
    <custom-slide-layout
      webc:if="slide.layout === 'custom'"
      :@slide="slide"
    >

    <!-- fall back to built-in layouts -->
    <render-slide
      webc:nokeep
      webc:else
      :@slide="slide"
    ></render-slide>
  </template>

  <slide-controls webc:nokeep></slide-controls>
</slide-deck>
```

### Theme

To get started using the provided
default theme, add the `slides-theme`
bundle to your project:

```html
<style @raw="getBundle('css', 'slides-theme')" webc:keep></style>
```

The theme in this layer adds settings for colors, basic styling,
and fonts.

In the `slides-theme` layer we list
default font stacks for sans-serif
(`--slide-os-sans-font`), serif (`--slide-os-serif-font`),
and code (`--slide-os-code-font`) fonts.

To add a main font for each font stack type, manually
add self-hosted or web-based fonts to your project and then set the
font-family name to the respective custom property for each font.

Example:

```css
--slide-web-font-sans: "Recursive Sans Linear";
--slide-web-font-serif: freight-text-pro;
```

There's more to document, but this is a start.
