document.addEventListener('DOMContentLoaded', () => {
  const dragContainer = document.querySelector('.drag-container');
  const dragImages = [];
  const dragTotalFrames = 36;
  let dragCurrentFrame = 0;
  let isDragging = false;
  let dragStartX = 0;
  
  let framesMovedThisDrag = 0;
  const maxFramesPerDrag = Math.floor(dragTotalFrames / 4);
  const sides = ['back', 'left', 'front', 'right'];
  let isAnimating = false;

  // Add class based on side
  const updateSideClass = () => {
    const sideIndex = Math.floor(dragCurrentFrame / (dragTotalFrames / sides.length)) % sides.length;
    sides.forEach(side => dragContainer.classList.remove(side+'-view'));
    dragContainer.classList.add(sides[sideIndex]+'-view');
  };
  
  // Preload drag images (returns a Promise that resolves when ALL images are loaded)
  const preloadDragImages = () => {
    let loadedCount = 0;
    return new Promise((resolve) => {
      for (let i = 1; i <= dragTotalFrames; i++) {
        const img = new Image();
        img.src = `img/proceduresdrag/${i.toString().padStart(4, '0')}.jpg`;
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === dragTotalFrames) resolve();
        };
        dragImages.push(img);
      }
    });
  };
  
  // Update the drag animation frame
  const updateDragFrame = () => {
    dragContainer.style.backgroundImage = `url('${dragImages[dragCurrentFrame].src}')`;
    updateSideClass();
  };
  
  // Handle drag start
  const onDragStart = (event) => {
    isDragging = true;
    dragContainer.style.cursor = 'grabbing';
    dragStartX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    framesMovedThisDrag = 0; // Reset counter for each new drag
  };
  
  // Handle dragging
  const animateFrames = (direction) => {
    isAnimating = true;
    let framesToAnimate = maxFramesPerDrag;
    const interval = setInterval(() => {
      if (framesToAnimate <= 0) {
        clearInterval(interval);
        isAnimating = false;
        return;
      }
      dragCurrentFrame = (dragCurrentFrame + direction + dragTotalFrames) % dragTotalFrames;
      updateDragFrame();
      framesToAnimate--;
    }, 40); // 40ms per frame = ~22fps animation
  };

  // On load Animation: Front side - up to 18 image frame
  const animateToFrontSide = (targetFrame) => {
    if (isAnimating) return;
    isAnimating = true;

    let frameStep = targetFrame > dragCurrentFrame ? 1 : -1;
    let framesToAnimate = Math.abs(targetFrame - dragCurrentFrame);

    const interval = setInterval(() => {
      if (framesToAnimate <= 0) {
        clearInterval(interval);
        isAnimating = false;
        document.querySelectorAll('ul.dots').forEach(function(trigger) {
          trigger.classList.remove('invisible');
        });
        return;
      }
      dragCurrentFrame = (dragCurrentFrame + frameStep + dragTotalFrames) % dragTotalFrames;
      updateDragFrame();
      framesToAnimate--;
    }, 60);
  };
  
  const onDragMove = (event) => {
    if (!isDragging || isAnimating) return;
  
    const currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const dragDeltaX = currentX - dragStartX;
  
    if (Math.abs(dragDeltaX) > 9) {
      const direction = dragDeltaX > 0 ? 1 : -1;
      animateFrames(direction);
      isDragging = false; // Prevent further move until user lifts and drags again
    }
  };
  
  // Handle drag end
  const onDragEnd = () => {
    isDragging = false;
    dragContainer.style.cursor = 'grab';
  };
  
  // Attach drag event listeners
  const attachDragListeners = () => {
    dragContainer.addEventListener('mousedown', onDragStart);
    dragContainer.addEventListener('mousemove', onDragMove);
    dragContainer.addEventListener('mouseup', onDragEnd);
    dragContainer.addEventListener('mouseleave', onDragEnd);
  
    dragContainer.addEventListener('touchstart', onDragStart);
    dragContainer.addEventListener('touchmove', onDragMove);
    dragContainer.addEventListener('touchend', onDragEnd);
  };

  // Initialize Drag Animation
  const initializeDragAnimation = () => {
    dragCurrentFrame = 0;
    updateDragFrame(); // Display initial frame (0001)
    attachDragListeners();

    setTimeout(() => {
      animateToFrontSide(18); // On load animate front side
    }, 500);
  };
  
  // Only start the animation logic after ALL images are loaded!
  preloadDragImages().then(() => {
    initializeDragAnimation();
  });

  // On Click "Rotate": Animation
  const prevBtn = document.querySelector('.prev-btn');
  prevBtn.addEventListener('click', () => {
    if (!isAnimating) {
      animateFrames(-1);
    }
  });

  /*** Modal: Treatment  ***/
  const scrollPositions = new WeakMap();
  let isModalOpen = false;
  document.querySelectorAll('.open-trtment-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (isModalOpen) return;
      e.preventDefault();
      var targetSelector = btn.getAttribute('data-target');
      var modal = document.getElementById(targetSelector);
      // const wrapper = document.querySelector('.hero-box');
      const wrapper = document.getElementById('viewProcedure');
      if (modal) {
        isModalOpen = true;
        scrollPositions.set(wrapper, wrapper.scrollTop);
        wrapper.scrollTop = 0;
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        wrapper.classList.add('modal-parent-active');
        // Add class to open modal btn;
        document.querySelectorAll('.open-trtment-modal').forEach(function(trigger) {
          if (trigger.getAttribute('data-target') === targetSelector) {
            trigger.classList.add('modal-active');
          }
        });
      }
    });
  });

  // Close modal on close button
  document.querySelectorAll('.treatment-modal .close-modal').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var modal = btn.closest('.treatment-modal');
      // const wrapper = modal.closest('.hero-box');
      const wrapper = document.getElementById('viewProcedure');

      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        if (scrollPositions.has(wrapper)) {
          wrapper.scrollTop = scrollPositions.get(wrapper);
        }
        wrapper.classList.remove('modal-parent-active');
        // Remove active class from all triggers with same data-target
        document.querySelectorAll('.open-trtment-modal').forEach(function(trigger) {
          trigger.classList.remove('modal-active');
        });
        isModalOpen = false;
      }, 400);
    });
  });

});