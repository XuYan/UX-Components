let onImageLoaded = (function() {
	const rowMaxHeight = 240;
	const gapBetweenImages = 10;
	let imageLoadCounter = 0;
	let images = document.getElementsByTagName("img");

    let columnWidth = 260;
	function layout() {
        let columns = Math.floor(document.getElementById("images-container").clientWidth / columnWidth);
        let ys = new Array(columns).fill(0);
        for (let i = 0; i < images.length; i++) {
            let image = images[i];

            let aspectRatio = image.width / image.height;
            let min = getMin(ys);
            let minValue = min.value;
            let minIndex = min.index;

            applyStyles(image, aspectRatio, minIndex * columnWidth, minValue);
            ys[minIndex] = minValue + columnWidth / aspectRatio;
        }
	}

    function getMin(values) {
        let minValue = Number.MAX_SAFE_INTEGER;
        let minValueIndex = Number.MAX_SAFE_INTEGER;

        for (var i = 0; i < values.length; i++) {
            if (values[i] < minValue) {
                minValue = values[i];
                minValueIndex = i;
            }
        }
        
        return {
            value: minValue,
            index: minValueIndex
        };
    }

    function applyStyles(image, aspectRatio, x, y) {
        image.style.width = columnWidth + "px";
        image.style.height = columnWidth / aspectRatio + "px";
        image.style.transform = "translateY(" + y + "px)";
        // image.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    }

	return () => {
		imageLoadCounter += 1;
		if (imageLoadCounter === images.length) {
			layout();
		}
	};
})();