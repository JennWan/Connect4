(function () {
  const list = JSON.parse(localStorage.getItem('myList') || '[]');
  const item = list.find(obj => obj.id === 0);

  if (item && item.imageUrl) {
    document.body.style.backgroundImage = `url(${item.imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  } else {
    console.log("No image URL found in localStorage.");
  }
})();
