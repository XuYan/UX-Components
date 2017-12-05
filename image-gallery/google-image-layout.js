let onImageLoaded = (function() {
	const rowMaxHeight = 240;
	const gapBetweenImages = 10;
	let imageLoadCounter = 0;
	let images = document.getElementsByTagName("img");

	function layout() {
		let viewportWidth = document.documentElement.clientWidth;
		let start = 0, current = 0, aspectRatio = 0;
		while (current < images.length) {
			let currentImage = images[current];
			aspectRatio += currentImage.width / currentImage.height;
			let totalGapBetweenImages = gapBetweenImages * (current - start);
			let rowHeight = (viewportWidth - totalGapBetweenImages) / aspectRatio;
			if (rowHeight <= rowMaxHeight) {
				applyStyles(start, current, rowHeight);
				start = current + 1;
				aspectRatio = 0;
			}
			current += 1;
		}
		if (start !== images.length) {
			applyStyles(start, images.length - 1, rowMaxHeight);
		}
	}

	function applyStyles(start, end, imageHeight) {
		let current = start;
		while (current <= end) {
			let currentImage = images[current];
			let currentImageAspectRatio = currentImage.width / currentImage.height;
			let imageWidth = currentImageAspectRatio * imageHeight;

			currentImage.style.width = imageWidth + "px";
			currentImage.style.height = imageHeight + "px";
			currentImage.style["margin-bottom"] = gapBetweenImages + "px";
			if (current !== end) {
				currentImage.style["margin-right"] = (gapBetweenImages - 4) + "px";
			}
			current += 1;
		}
	}

	return () => {
		imageLoadCounter += 1;
		if (imageLoadCounter === images.length) {
			layout();
		}
	};
})();