
$(function () {
    // const sides = ['front', 'left', 'back', 'right'];
    const sides = ['front', 'right', 'back', 'left'];

    const framesPerSide = 9;

    let currentSideIndex = 0;
    let isAnimating = false;

    function getImagePath(side, frame) {
        return `img/procedures/${side}-${frame}.jpg`;
    }

    function updateImage(side, frame) {
        document.getElementById("productImage").src = getImagePath(side, frame);
    }

    function animateSide(index, callback) {
        isAnimating = true;

        const side = sides[index];
        let frame = 0;

        const interval = setInterval(() => {
            updateImage(side, frame);

            frame++;
            if (frame >= framesPerSide) {
                clearInterval(interval);
                isAnimating = false;
                /* Clear any existing side class */
                sides.forEach(side => document.getElementById("productImage").parentElement.classList.remove(side+"-view"));
                /* Add current side class (e.g., 'front', 'left', etc.) */
                document.getElementById("productImage").parentElement.classList.add(side+"-view");

                if (typeof callback === 'function') callback();
            }
        }, 100);
    }

    window.goToNextSide = function () {
        if (isAnimating) return;
        currentSideIndex = (currentSideIndex + 1) % sides.length;
        animateSide(currentSideIndex);
    };

    window.goToPreviousSide = function () {
        if (isAnimating) return;
        currentSideIndex = (currentSideIndex - 1 + sides.length) % sides.length;
        animateSide(currentSideIndex);
    };
    
    /*** Mouse + Touch Drag Support ***/
    let startX = 0;
    let isDragging = false;

    const viewer = document.getElementById("productImage");

    /* Drag Decision Logic */
    function handleDrag(distance) {
        const threshold = 30; // drag sensitivity
        if (distance > threshold) {
            goToPreviousSide(); // drag right
        } else if (distance < -threshold) {
            goToNextSide(); // drag left
        }
    }
    /* Mouse Events */
    viewer.addEventListener('mousedown', (e) => {
        if (isAnimating) return;
        startX = e.clientX;
        isDragging = true;
        viewer.style.cursor = 'grabbing';
    });

    viewer.addEventListener('mouseup', (e) => {
        if (!isDragging || isAnimating) return;
        const endX = e.clientX;
        handleDrag(endX - startX);
        isDragging = false;
        viewer.style.cursor = 'grab';
    });

    /* Touch Events */
    viewer.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    viewer.addEventListener('touchend', (e) => {
        if (!isDragging || isAnimating) return;
        const endX = e.changedTouches[0].clientX;
        handleDrag(endX - startX);
        isDragging = false;
    });

    

});