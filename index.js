import markdownIt from 'markdown-it';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';

import {
  slideImg,
  slideStyles,
  slideSourceMDown,
  slideCiteMDown,
  buildSlides
} from './slides.js';

export default async function(eleventyConfig, options) {
  options = Object.assign({
    markdownIt: {
      html: true,
      breaks: false,
      typographer: true,
    },

    // imgDir: (path relative to content folder),
    // buildStepFunction: (function),
    // newPenTemplates: { new: 'https://pen.new' }
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

  // data
  eleventyConfig.addGlobalData("slideDeckConfig", options);

  // slides
  eleventyConfig.addFilter('buildSlides', buildSlides);
  eleventyConfig.addFilter('slideStyles', slideStyles);
  eleventyConfig.addFilter('slideSourceMDown', slideSourceMDown);
  eleventyConfig.addFilter('slideCiteMDown', slideCiteMDown);
  eleventyConfig.addFilter('slideImg', (src, dir) =>
    slideImg(src, dir || options.imgDir || '')
  );

  // markdown
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  const mdIt = markdownIt(options.markdownIt).disable('code');

  eleventyConfig.addFilter(
    'slideMDownBlock',
    (content) => mdIt.render(content)
  );
  eleventyConfig.addFilter(
    'slideMDownInline',
    (content) => mdIt.renderInline(content)
  );

  // collection
  eleventyConfig.addCollection(options.collectionName, (collectionApi) => {
    return collectionApi
      .getAll()
      .filter((item) => item.data.slides)
      .map((item) => {
        item.data.slideDeck = buildSlides(
          item.data.slides,
          item.data[options.known.slides],
          item.data[options.known.series],
          options.buildStepFunction
        );
        return item;
      });
  });
}
