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
      'npm:@oddbird/eleventy-plugin-slide-deck/*.webc',
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

- `<code-slide>`
  - `slide.<language>` (for `html`, `css`, `scss`, or `js`)
  - or `slide.code` and `slide.lang` for any other languages
- `<default-slide>`
  - `slide.pre`, `slide.title`, and `slide.sub` create the title block
  - `slide.md`, and `slide.webc` allow for arbitrary content
  - `slide.background`, `slide.color`, & `slide.mode` CSS values
- `<demo-slide>` --
  `slide.demo` embed any URL, or Eleventy page with matching `demo` value
- `<embed-slide>` -- `slide.embed` for the code to embed (iframe, video, etc)
- `<event-slide>`
  - `slide.pre`, `slide.title`, & `slide.sub` for the talk title block
  - `slide.venue` the event title
  - `slide.date` the date of the talk
  - `slide.exit` optional (inline markdown) "back" link in the top
  - `slide.detail` optional (block markdown) section for more detail
- `<img-slide>`
  - `slide.src` and `slide.alt` to embed an image
  - `slide.cite` for (inline markdown) photo credits
  - `slide.background`, `slide.fit`, `slide.position`,
    & `slide.padding` CSS values
- `<pen-slide>`
  - `slide.pen` for the codepen url
  - `slide.title` for the name of the pen
  - `slide.live` for a separate live-code demo link
- `<quote-slide>`
  - `slide.quote` for the (block markdown) text of the blockquote
  - `slide.cite` for a (inline markdown) citation after the quote
  - `slide.avatar` for an image next to the quote
- `<split-slide>` -- combo of `image-slide` and `default-slide` props
- `<support-slide>` --
  `slide.caniuse` or baseline `slide.support` feature ids
- `<todo-slide>` -- `slide.todo` markdown block
- `<url-slide>`
  - `slide.url` a URL to link and screenshot
    using the [11ty APIs](https://www.11ty.dev/docs/api-services/)
  - `slide.alt` optional alt text for the image
  - `slide.size` for controlling screenshot size/dimensions
  - `slide.type` can be set to `og` to use the open-graph API instead
  - `slide.title` will be added to the caption (and used as alt-fallback)
  - `slide.background`, `slide.fit`, `slide.position`,
    & `slide.padding` CSS values

All markdown properties also allow `WebC` content.

There's more to document, but this is a start.
