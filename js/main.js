/*  ---------------------------------------------------
    Template Name: Violet 
    Description: Violet ecommerce Html Template
    Author: Colorlib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

//import "jquery-editable-select"

$(document).ready(function() {
    // check if user is logged in
    if(window.sessionStorage.getItem("loggedIn") == "true") {
        $('.user-access').empty();
        $('.user-access').append("<a id = 'profilepage' href='./profile.html' tabindex='0'>Profile</a><a href='./logout.html' class='in' tabindex='0'>Logout</a>");
    }
});

'use strict';

document.getElementById("browse-all").addEventListener('click', () => {
    searchProductDB('{}');
})
document.getElementById("browse-toy").addEventListener('click', () => {
    searchProductDB({"Type":"Toy"});
})
document.getElementById("browse-switch").addEventListener('click', () => {
    searchProductDB({"Type":"Switch"});
})
document.getElementById("browse-mount").addEventListener('click', () => {
    searchProductDB({"Type":"Mount"});
})
document.getElementById("browse-adapter").addEventListener('click', () => {
    searchProductDB({"Type":"Adapter"});
})
function searchProductDB(searchTerms) {
    var Q = {
        query: searchTerms
    };
    $.get("/searchquery", $.param(Q), function (data) {
        //console.log(data);
        window.sessionStorage.removeItem("queryResult");
        window.sessionStorage.setItem("queryResult", JSON.stringify(data));
        window.sessionStorage.removeItem("userQuery");
        window.sessionStorage.setItem("userQuery", JSON.stringify(Q));
        window.location.href = "categories.html";
    });
}

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
		    Product filter
	    --------------------*/
        if ($('#product-list').length > 0) {
            var containerEl = document.querySelector('#product-list');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        appendTo: '.header-section',
        allowParentLinks: true,
        closedSymbol: '<i class="fa fa-angle-right"></i>',
		openedSymbol: '<i class="fa fa-angle-down"></i>'
    });

    /*------------------
		Search model
	--------------------*/
	$('.search-trigger').on('click', function() {
		$('.search-model').fadeIn(400);
	});

	$('.search-close-switch').on('click', function() {
		$('.search-model').fadeOut(400,function(){
			$('#search-input').val('');
		});
    });
    
    /* Editable select */
    //$('#tag-select').editableSelect();

    /*------------------
        Carousel Slider
    --------------------
     $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoplayHoverPause: true,
        mouseDrag: false,
        autoplay: false,
    });

    /*------------------
        Carousel Slider
    --------------------
    $(".logo-items").owlCarousel({
        loop: true,
		nav: false,
		dots: false,
		margin : 40,
		autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 5
            }
        }
    });


    /*------------------
        Carousel Slider
    --------------------
    $(".product-slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        dots: true,
        autoplay: true,
    });
    

    /*------------------
        Magnific Popup
    --------------------
    $('.pop-up').magnificPopup({
        type: 'image'
    });*/

    /*-------------------
		Sort Select
	--------------------- */
    $('.sort').niceSelect();

    /*-------------------
		Cart Select
	--------------------- */
    $('.cart-select').niceSelect();

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*-------------------
		Radio Btn
	--------------------- */
    $(".shipping-info .cs-item label").on('click', function () {
        $(".shipping-info .cs-item label").removeClass('active');
        $(this).addClass('active');
    });

    $(".checkout-form .diff-addr label").on('click', function () {
        $(this).toggleClass('active');
    });

    $(".payment-method ul li label").on('click', function () {
        $(this).toggleClass('active');
    });

})(jQuery);