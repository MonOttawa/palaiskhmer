(function($) {
    "use strict";

    // Site navigation setup

    var header = $('.header'),
        pos = header.offset();

    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + 50 && header.hasClass('default')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('switched-header').fadeIn(200);
                $('.scroll-to-top').addClass('active');
            });
        } else if ($(this).scrollTop() <= pos.top + 50 && header.hasClass('switched-header')) {
            header.fadeOut('fast', function() {
                $(this).removeClass('switched-header').addClass('default').fadeIn(100);
                $('.scroll-to-top').removeClass('active');
            });
        }
    });

    // Scroll to

    $('a.scroll').smoothScroll({
        speed: 800,
        offset: -62
    });

    // Append images as css background (must run before flexslider)

    $('.background-img').each(function() {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });

    // Slider

    $('.main-slider').flexslider({
        animation: "fade",
        slideshow: true,
        directionNav: false,
        controlNav: true,
        pauseOnAction: false,
        animationSpeed: 700
    });

    //Popup elements

    $('.popup-image').magnificPopup({
        type: 'image',
        fixedContentPos: false,
        fixedBgPos: false,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

})(jQuery);
