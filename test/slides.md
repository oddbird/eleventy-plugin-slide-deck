---
layout: slides
event: &event
  title: Test Slide Deck
  venue: Web Directions
  date: 2024-11-20

slides:
# see the knownSlides yaml data
- known: start-deck
  <<: *event
  note: |
    - `<event-slide>`
    - `known` reference

# the default slide
- pre: hello world
  title: This is a Title
  sub: with a subtitle
  caption: and a caption
  note: |
    - `<default-slide>`
    - `pre`, `title`, and `sub`

- md: |
    ## Put markdown in here
    - some
    - arbitrary
    - _markdown_
  note: |
    - `<default-slide>`
    - `md`-only

- webc: |
    <h3>Put WebC in here…</h3>
    <oddbird-logo style="fill: deepPink"></oddbird-logo>
  note: |
    - `<default-slide>`
    - `webc`-only

# codepen
- pen: new
  note: |
    - 'new' `<pen-slide>`

- pen: https://codepen.io/miriamsuzanne/pen/YzmMapj
  live: https://codepen.io/miriamsuzanne/pen/YzmMapj
  title: You Tell Me Clock
  note: |
    - `<pen-slide>`
    - both `pen` and `live` links
    - as well as a `title`

# series
- series: mia

# quote slide
- quote: >
    This is a quote
    with structured source info.
  known: miriam-codes

- quote: >
    This quote just has
    a _markdown citation_ and **avatar**.
  cite: Miriam, [somewhere else](https://miriam.codes/)
  known: mia

- quote: >
    This quote has no details associated with it.

# dark mode, with an explicit background color
- title: Slide styles
  sub: (dark mode)
  mode: dark
  background: maroon
  caption: Basic title slide, but dark mode and maroon

# code slides
- caption: a code slide
  css: |
    * { box-sizing: border-box; }
  html: |
    <p>lorem stuff</p>

# embed local demo pages
- demo: test

# todo slide, with markdown
- todo: |
    - finish building this
    - ship it
  caption: a `todo` slide

# url (screenshot) slide
- url: https://miriam.codes
  title: Miriam.codes
  caption: A `url` slide

# image slide
- img: mia-89.jpg
  alt: Young miriam
  credit: mom or dad, maybe?
  position: center
  caption: An `image` slide

# placeholder image
- img: computer
  credit: picsum
  caption: A placeholder image

# split image/content slide
- img: mia-89.jpg
  alt: Young miriam
  title: Split Slide
  pre: This is a…

# video & embeds
- youtube: d8PndpFPL8g
- embed: >
    <iframe src="https://oddbird.net" width="1600" height="900"></iframe>

# caniuse image embeds
- caniuse: flow-root

# baseline browser-support embeds
- support: display-flow-root

# unknown slide
- who: nobody
  what: >
    knows what this slide is all about.

# event slide
- <<: *event
  detail: |
    [@mia@front-end.social](https://front-end.social/@mia) \
    [@oddbird@front-end.social](https://front-end.social/@oddbird)
  caption: |
    Bring this workshop to your company!
---
