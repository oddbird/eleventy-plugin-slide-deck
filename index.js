import markdownIt from 'markdown-it';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';

import {
  slideStyles,
  buildSlides,
  getSlideResources,
} from './utils/slides.js';

import { slideImg } from './utils/img.js';

export default async function(eleventyConfig, options) {
  options = Object.assign({
    markdownIt: {
      html: true,
      breaks: false,
      typographer: true,
    },

    // markdownFunctions: {
    //   inline: (function),
    //   block: (function),
    // },
    // imgDir: (path relative to content folder),
    // buildFunction: (function),

    collectionName: 'slideDeck',
    known: {
      slides: 'knownSlides',
      series: 'knownSeries',
    },

    // eventDateLocale: (locale),
    eventDateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  }, options);

  if (!options.markdownFunctions) {
    const mdDefault = markdownIt(options.markdownIt).disable('code');

    options.markdownFunctions = {
      inline: (content) => mdDefault.renderInline(content),
      block: (content) => mdDefault.render(content),
    };
  }

  // data
  eleventyConfig.addGlobalData("slideDeckConfig", options);

  // slides
  eleventyConfig.addFilter('buildSlides', buildSlides);
  eleventyConfig.addFilter('slideStyles', slideStyles);
  eleventyConfig.addFilter('slideImg', (src, dir) =>
    slideImg(src, dir || options.imgDir || '')
  );

  // markdown
  eleventyConfig.addPlugin(syntaxHighlightPlugin);

  eleventyConfig.addFilter(
    'slideMarkdownBlock',
    options.markdownFunctions.block
  );
  eleventyConfig.addFilter(
    'slideMarkdownInline',
    options.markdownFunctions.inline
  );

  // collection
  eleventyConfig.addCollection(options.collectionName, (collectionApi) => {
    return collectionApi
      .getAll()
      .filter((item) => item.data.slides)
      .map((item) => {
        item.data.slideDeck = buildSlides({
          slides: item.data.slides,
          knownSlides: item.data[options.known.slides],
          knownSeries: item.data[options.known.series],
          buildFn: options.buildFunction,
        });
        item.data.slideResources = getSlideResources(item.data.slideDeck);
        return item;
      });
  });
}
