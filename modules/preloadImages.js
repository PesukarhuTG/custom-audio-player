function preloadImages(arr) {
  arr.forEach(item => {
    for (let i = 0; i < arr.length; i++) {
      const img = new Image();
      img.src = `assets/img/${item}.jpg`;
    }
  })
}

export default preloadImages;