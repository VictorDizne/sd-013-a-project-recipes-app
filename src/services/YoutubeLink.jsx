export default function youtubeLink(url, pathname) {
  if (pathname.includes('/bebidas')) {
    return null;
  }
  const ONZE = 11;
  const r = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(r);
  return (match && match[7].length === ONZE) ? match[7] : false;
}
