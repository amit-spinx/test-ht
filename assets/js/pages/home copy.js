
$(function () {
    const sides = ['front', 'left', 'back', 'right'];
    const onLoadSides = ['back', 'left', 'right', 'front'];
    let isInitialLoad = true;

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

        // Choose which sides array to use
        const sideOrder = isInitialLoad ? onLoadSides : sides;
        const side = sideOrder[index];
        let frame = isInitialLoad ? framesPerSide - 1 : 0;

        // const side = sides[index];
        // let frame = 0;

        const interval = setInterval(() => {
            updateImage(side, frame);

             if (isInitialLoad) {
                frame--; // reverse
                if (frame < 0) {
                    clearInterval(interval);
                    finishAnimation(side, callback);
                }
            } else {
                frame++; // forward
                if (frame >= framesPerSide) {
                    clearInterval(interval);
                    finishAnimation(side, callback);
                }
            }


            // frame++;
            // if (frame >= framesPerSide) {
            //     clearInterval(interval);
            //     isAnimating = false;
            //     /* Clear any existing side class */
            //     sides.forEach(side => document.getElementById("productImage").parentElement.classList.remove(side+"-view"));
            //     /* Add current side class (e.g., 'front', 'left', etc.) */
            //     document.getElementById("productImage").parentElement.classList.add(side+"-view");

            //     // After the first run, reset the flag
            //     if (isInitialLoad) isInitialLoad = false;

            //     if (typeof callback === 'function') callback();
            // }
        }, 100);
    }

    function finishAnimation(side, callback) {
        isAnimating = false;

        // Clear old view classes and add current
        sides.forEach(view => {
            document.getElementById("productImage").parentElement.classList.remove(view + "-view");
        });
        document.getElementById("productImage").parentElement.classList.add(side + "-view");

        // Only reset isInitialLoad after animation completes
        if (isInitialLoad) isInitialLoad = false;

        if (typeof callback === 'function') callback();
    }


    /* Onload animation */
    runInitialSequence();
    
    function runInitialSequence() {
        let index = 1;
        function next() {
            if (index >= onLoadSides.length) return;
            animateSide(index, () => {
                setTimeout(() => {
                    index++;
                    next();
                }, 300);
            });
        }
        next();
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
    });

    viewer.addEventListener('mouseup', (e) => {
        if (!isDragging || isAnimating) return;
        const endX = e.clientX;
        handleDrag(endX - startX);
        isDragging = false;
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