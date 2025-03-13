# Eleventy Slide-Deck Plugin

A plugin to use the `@oddbird/slide-deck`
web component in eleventy projects --
and generate decks from data.

## Config

We rely on the official WebC plugin,
but don't install it for you.


```js
// eleventy config
import pluginWebc from "@11ty/eleventy-plugin-webc";
import pluginSlideDeck from "@oddbird/eleventy-plugin-slide-deck";

export default async function(eleventyConfig) {

  eleventyConfig.addPlugin(pluginSlideDeck);

  // register the slide-deck WebC components
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'npm:@oddbird/eleventy-plugin-slide-deck/**/*.webc',
    ],
  });
}
```

There are several configuration options
for the plugin:

- `markdownIt` is an option object
  passed along to the `markdown-it` package
- `domain` is a string optionally
  prepended to the page url on event slides,
  to show the URL of the slide deck
- `eventDateLocale` and `eventDateFormat` options
  for rendering the event date with `toLocaleDateString()`
- `imgDir` optionally prepends a path
  to all slide image properties (such as `src` and `avatar`)
- By default a slide with `pen: new` will provide a link
  to a blank new CodePen.
  Use `newPenTemplates` to optionally register additional
  template shortcuts for generating new CodePens on the fly.

JavaScript for interactivity and loading the baseline `support` content are
included in the default bundle. Make sure it's included in a template. 

```js
<script @raw="getBundle('js')"></script>
// or in a .webc template
<script webc:keep @raw="getBundle('js')"></script>
```

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
  cite: You, Later
---

<build-deck webc:nokeep :slides="this.slides" id="if-you-want"></build-deck>

<style @raw="getBundle('css', 'slides-layer-order')" webc:keep></style>
<style @raw="getBundle('css', 'slides-core')" webc:keep></style>
```

Or build your own, using the provided slide types.
All of them accept a `slide` object
with `slide.id`, `slide.caption`, and `slide.note` properties.
Each slide type also accepts some type-specific properties:

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
  - `slide.background`, `slide.color`, & `slide.mode` CSS values

- `<img-slide>`
  - `slide.src` and `slide.alt` to embed an image
  - `slide.cite` for (inline markdown) photo credits
  - `slide.background`, `slide.fit`, `slide.position`,
    & `slide.padding` CSS values

- `<split-slide>` -- combo of `image-slide` and `default-slide` props

- `<url-slide>` -- screenshot or open-graph image slide, generated from a url
  using the [11ty APIs](https://www.11ty.dev/docs/api-services/)
  - `slide.url` source URL
  - `slide.alt` optional alt text for the image
  - `slide.size` controls the screenshot size/dimensions
  - `slide.type` can be set to `og` to use the open-graph API instead
  - `slide.title` will be added to the caption (and used as alt-fallback)
  - `slide.background`, `slide.fit`, `slide.position`,
    & `slide.padding` CSS values

- `<quote-slide>`
  - `slide.quote` the (block markdown) text of the blockquote
  - `slide.cite` a (inline markdown) citation after the quote
  - `slide.avatar` an image next to the quote

- `<embed-slide>` -- `slide.embed` for the code to embed (iframe, video, etc)
- `<demo-slide>` -- embeds and iframe, with a permalink in the caption
  - `slide.demo` any URL or Eleventy page with matching `demo` value
- `<pen-slide>` -- embed editable demos from code-pen
  - `slide.pen` URL of the CodePen
  - `slide.title` name of the pen, added to the caption
  - `slide.live` link a live-code version of the demo, if different
- `<code-slide>`
  - `slide.<language>` (for `html`, `css`, `scss`, or `js`)
  - or `slide.code` and `slide.lang` for any other languages
- `<support-slide>`
  - `slide.caniuse` feature id for CanIUse
  - `slide.support` feature id for Baseline

All markdown properties also allow `WebC` content.

Reuse common slides across different decks
by creating adding a `knownSlides` object
to the Eleventy data cascade:

```yaml
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
  fit: contain
  background: black
  caption: >
    I often try, actually
```

There's more to document, but this is a start.
