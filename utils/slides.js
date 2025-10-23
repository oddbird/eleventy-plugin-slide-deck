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

  if (result && result[key]) {
    result = mergeFromSource(source, result, key);
  }

  return {...result, ...item};
}

const slideType = (slide) => {
  if (slide.todo || slide._img) return 'todo';
  if (slide.venue) return 'event';
  if (slide.demo) return 'demo';
  if (slide.caniuse || slide.support) return 'support';
  if (slide.embed || slide.video) return 'embed';
  if (slide.quote) return 'quote';
  if (slide.pen) return 'pen';
  if (
    slide.code ||
    slide.html || slide.css || slide.js ||
    slide.scss
  ) return 'code';

  const hasGeneral = slide.title
    || slide.pre || slide.sub
    || slide.md || slide.webc;

  if (slide.img) {
    if (hasGeneral) return 'split';
    return 'image'
  }

  if (slide.url) return 'url';
  if (hasGeneral) return 'default';
  if (slide.name || slide.source || slide.avatar) return 'source';

  // error-slide
  return;
}

const slideCitation = (slide) => {
  if (slide.cite) return slide.cite;

  const hasSource = slide.source || slide.name || slide.url;
  if (!hasSource) return;

  const nameAndSource = slide.source && slide.name;
  const linkText = slide.source || slide.name || (new URL(slide.url)).hostname;

  if (!slide.url) return nameAndSource
    ? `${slide.name}, _${slide.source}_`
    : linkText;

  const link = `[${linkText}](${slide.url})`;

  return nameAndSource
    ? `${slide.name}, ${link}`
    : link;
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
      if (!slide.cite) slide.cite = slideCitation(slide);
      return slide;
    });

    all.push(...merged);
    return all;
  }, []
);

export const getSlideResources = (deck) => {
  const seen = [];
  const mdUrl = /(?<=\]\()(https?:\/\/[^\s]+)(?=\))/g;

  return deck.reduce((all, slide) => {
    if (slide.cite?.includes('://')) {
      let citeLink = slide.cite.match(mdUrl)[0].trim();

      if (!seen.includes(citeLink)) {
        seen.push(citeLink);
        all.cite.push(slide.cite);
      }
    }

    if (slide.pen?.includes('://') && !seen.includes(slide.pen)) {
      seen.push(slide.pen);
      all.pens.push(`[${slide.title || 'CodePen'}](${slide.pen})`);
    }

    return all;
  }, { pens: [], cite: [] });
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
