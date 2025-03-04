import markdownIt from 'markdown-it';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';

export default async function(eleventyConfig, options) {
  options = Object.assign({
    markdownIt: {
      html: true,
      breaks: false,
      typographer: true,
    },

    // imgDir: '',
    // newPenTemplates: { new: 'https://pen.new' }

    eventDateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  }, options);

  // images
  const placeHolder = (img) => {
    return `https://picsum.photos/seed/${img || 'any'}/800/450?blur`;
  };

  const slideImg = (src, dir) => {
    if (src.includes('://')) { return src; }

    return src.includes('.')
      ? `${dir || options.imgDir || ''}${src}`
      : placeHolder(src);
  }

  eleventyConfig.addFilter('placeHolder', placeHolder);
  eleventyConfig.addFilter('slideImg', slideImg);

  // data
  eleventyConfig.addGlobalData("slideDeckConfig", options);

  // markdown
  const mdIt = markdownIt(options.markdownIt).disable('code');

  const block = (content) => mdIt.render(content);
  const inline = (content) => mdIt.renderInline(content);

  eleventyConfig.addFilter('slideMDownBlock', block);
  eleventyConfig.addFilter('slideMDownInline', inline);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);

  // slide styles
  eleventyConfig.addFilter('slideStyles', (slide, allow) => {
    const props = allow || ['background', 'color'];
    const style = [];

    props.forEach((prop) => {
      if (slide[prop]) {
        style.push(`--slide-${prop}: ${slide[prop]};`);
      }
    });

    return style
      ? style.join('')
      : null;
  });
}
