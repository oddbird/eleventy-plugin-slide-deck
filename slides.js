const imgPlaceholder = (img) => {
  return `https://picsum.photos/seed/${img || 'any'}/800/450?blur`;
};

const getItem = (source, key) => {
  if (!source) return;

  const keyPath = key.split('.');

  return keyPath.reduce(
    (result, path) => result ? result[path] : null,
    source
  );
}

const mergeFromSource = (source, item, key) => {
  let result = getItem(source, item[key]);

  if (key && result && result[key]) {
    result = mergeFromSource(source, result, key);
  }

  return {...result, ...item};
}

const slideType = (slide) => {
  if (slide.todo || slide._img) return 'todo';
  if (slide.venue) return 'event';
  else if (slide.demo) return 'demo';
  else if (slide.caniuse || slide.support) return 'support';
  else if (slide.embed || slide.video) return 'embed';
  else if (slide.quote) return 'quote';
  else if (slide.pen) return 'pen';
  else if (
    slide.html || slide.css || slide.scss || slide.js || slide.code
  ) return 'code';
  else if (slide.url) {
    if (slide.source && slide.img) return 'source';
    return 'url';
  }
  else if (slide.img) {
    if (slide.title || slide.name || slide.md || slide.webc) return 'split';
    return 'image'
  }
  return;
}

export const buildSlides = (slides, known, series, buildStepFn) =>
  slides.reduce((all, item) => {
    const expanded = item.series
      ? getItem(series, item.series)
      : [item];
    const merged = expanded.map((item) => {
      let slide = (item.known)
        ? mergeFromSource(known, item, 'known')
        : item;
      if (typeof buildStepFn === 'function') slide = buildStepFn(slide);
      if (!slide.layout) slide.layout = slideType(slide);
      return slide;
    });
    all.push(...merged);
    return all;
  }, []
);

export const slideSourceMDown = (slide) => {
  let source = slide.source || slide.title;

  if (slide.url && !source) source = (new URL(slide.url)).hostname;
  if (!source) return slide.name;

  const link = slide.url ? `[${source}](${slide.url})` : source;
  return slide.name
    ? `${slide.name}, ${link}`
    : link;
}

export const slideCiteMDown = (cite, source) => {
  if (!cite) return;
  if (cite.includes('/')) return cite;

  const citeData = getItem(source, cite);
  if (!citeData) return cite;

  const result = mergeFromSource(source, citeData, 'known');
  return slideSourceMDown(result);
}

export const slideStyles = (slide, allow = []) => {
  const props = ['background', 'color', 'mode', ...allow];
  const style = [];

  props.forEach((prop) => {
    if (slide[prop]) {
      style.push(`--slide-${prop}: ${slide[prop]};`);
    }
  });

  return style
    ? style.join('')
    : null;
}

export const slideImg = (src, dir) => {
  if (src.includes('://')) { return src; }

  return src.includes('.')
    ? `${dir}${src}`
    : imgPlaceholder(src);
}
