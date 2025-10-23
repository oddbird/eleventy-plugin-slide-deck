const imgPlaceholder = (img) => {
  return `https://picsum.photos/seed/${img || 'any'}/800/450?blur`;
};

export const slideImg = (src, dir) => {
  if (src.includes('://')) { return src; }

  return src && src.includes('.')
    ? `${dir}${src}`
    : imgPlaceholder(src);
}
