$(document).ready(function () {

  // ─── Focus Areas Slider ────────────────────────────────────────────────
  function initFocusSlider() {
    var $slider = $('[data-action="focus-slider"]');
    if (!$slider.length) return;

    $slider.slick({
      slidesToShow: 1,
      variableWidth: true,
      infinite: false,
      arrows: false,
      dots: false,
      swipe: true,
      touchMove: true,
      cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      speed: 500
    });
  }

  // ─── Lazy Loading (data-src) ───────────────────────────────────────────
  function initLazyLoad() {
    var $lazyImages = $('img[data-src]');

    function loadVisible() {
      $lazyImages.each(function () {
        var $img = $(this);
        if ($img.attr('src') === $img.attr('data-src')) return;

        var rect = this.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          $img.attr('src', $img.attr('data-src'));
        }
      });
    }

    loadVisible();
    $(window).on('scroll.lazyload resize.lazyload', loadVisible);
  }

  // ─── Nav scroll state ──────────────────────────────────────────────────
  function initNavScroll() {
    var $header = $('.site-header');
    if (!$header.length) return;

    function update() {
      if ($(window).scrollTop() > 20) {
        $header.addClass('is-scrolled');
      } else {
        $header.removeClass('is-scrolled');
      }
    }

    update();
    $(window).on('scroll.navscroll', update);
  }

  // ─── Init ──────────────────────────────────────────────────────────────
  initFocusSlider();
  initLazyLoad();
  initNavScroll();

});
