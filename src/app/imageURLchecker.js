function imageURLchecker(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    console.log('new img by url - ', url);
    img.addEventListener('load', () => {
      console.log('loaded - ', img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });
}

export default imageURLchecker;
