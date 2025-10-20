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

# the default slide
- pre: hello world
  title: This is a Title
  sub: with a subtitle
  caption: and a caption
  note: |
    This is a _note_.

- md: |
    - some
    - arbitrary
    - _markdown_

- webc: |
    <h3>I can put any WebC in here</h3>
    <browser-support webc:import="npm:@oddbird/browser-support" data-feature="container-queries"></browser-support>

# new codepen
- pen: new

# source slide
- name: Miriam Suzanne
  source: Testing Source Slides
  url: https://miriam.codes/
  img: mia-89.jpg

- name: Miriam Suzanne
  source: Explicit slide layout
  url: https://miriam.codes/
  img: mia-89.jpg
  layout: url

# quote slide
- quote: >
    This is a quote
    with fully fleshed out source info.
  name: Miriam
  source: maybe an article
  url: https://miriam.codes/
  img: mia-89.jpg

- quote: >
    This quote just has a _markdown citation_ and **avatar**.
  cite: Miriam, [somewhere else](https://miriam.codes/)
  avatar: mia-89.jpg

# quote without an avatar
- quote: >
    This quote has no details associated with it.

# dark mode, with an explicit background color
- title: Hello Dark Mode
  mode: dark
  background: maroon

# code slides
- caption: something -- else
  css: |
    * { box-sizing: border-box; }
  html: |
    <p>lorem stuff</p>

# codepen embeds
- pen: https://codepen.io/miriamsuzanne/pen/YzmMapj
  live: https://codepen.io/miriamsuzanne/pen/YzmMapj
  title: name this pen

# embed local demo pages
- demo: test

# todo slide, with markdown
- todo: |
    - finish building this
    - ship it

# url (screenshot) slide
- url: https://miriam.codes
  title: Miriam.codes

# image slide
- img: mia-89.jpg
  alt: Young miriam
  cite: mom or dad, maybe?
  position: center

# placeholder image
- img: computer
  credit: picsum

# split image/content slide
- img: mia-89.jpg
  alt: Young miriam
  title: Hello split slide

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
