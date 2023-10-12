function getImageUrl(name, ext) {
  return new URL(`../assets/${name}.${ext}`, import.meta.url).href;
}

export default getImageUrl;
