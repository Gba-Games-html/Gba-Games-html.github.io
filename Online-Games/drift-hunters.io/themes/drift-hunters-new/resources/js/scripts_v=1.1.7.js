window.addEventListener("DOMContentLoaded", function () {

    search_complete();
    search_mobile();
    load_wishlist_cookies();
    $(".scrollTo").on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-target');
        let id_target = $('#' + target);
        console.log(id_target);
        $('html, body').animate({
            scrollTop: (id_target.offset().top)
        }, 500, 'swing');
    });

    $(".icon-search2").click(function () {
        0 == iSearch ? showSearch() : closeSearch()
    }), $(".icon-close").click(function () {
        closeSearch()
    })
    let height_menu = $('.Header_container__zAcIa').outerHeight();
	let padding_top = height_menu + 20;
	$('.LandingTemplate_main__ZNd4x').css({
            'padding-top': padding_top +'px'
        });
    let posWin = $(window).scrollTop();
    if (posWin >= height_menu) {
        $('.Menu_container__nTTRM').css({
            'position': 'fixed',
            'top': '0px'
        });
    }
    checkWidth();
    $(window).scroll(function () {
        var aTop = $('.Header_container__zAcIa').outerHeight();
		let menu_height_after = $('.Header_container__zAcIa').outerHeight();
        if ($(this).scrollTop() >= aTop) {
            $('.Menu_container__nTTRM').css({
                'position': 'fixed',
                'top': '0px'
            });
        } else {

            $('.Menu_container__nTTRM').css({
                'position': 'absolute',
                'top': menu_height_after + 'px'
            });
        }
    });
	
    
    $(window).resize(checkWidth);

    $(document).mouseup(function (e) {
        var container = $(".GameFrame_container__nwWxD");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            iframe_blur_close();
        }
    });

    var lightMode = readCookie('mode');
    if (lightMode) {
        $('html').attr('data-theme', 'light');
        $('.ThemeSwitcher_container__a7GUH').removeClass('ThemeSwitcher_changeAnimation__ntjBa');
        $('.light-mode').addClass('ThemeSwitcher_active__tEOA_');
        $('.dark-mode').removeClass('ThemeSwitcher_active__tEOA_');
    } else {
        $('html').attr('data-theme', 'dark');
        $('.light-mode').removeClass('ThemeSwitcher_active__tEOA_');
        $('.dark-mode').addClass('ThemeSwitcher_active__tEOA_');
        $('.ThemeSwitcher_container__a7GUH').addClass('ThemeSwitcher_changeAnimation__ntjBa');
    }
    $(document).on('click', '.ThemeSwitcher_container__a7GUH', function (e) {
        if ($('.ThemeSwitcher_container__a7GUH').hasClass("ThemeSwitcher_changeAnimation__ntjBa")) {
            createCookie('mode', 'light', 365);
            $('.ThemeSwitcher_container__a7GUH').removeClass('ThemeSwitcher_changeAnimation__ntjBa');
            $('.light-mode').addClass('ThemeSwitcher_active__tEOA_');
            $('.dark-mode').removeClass('ThemeSwitcher_active__tEOA_');
            $('html').attr('data-theme', 'light');
        } else {
            $('html').attr('data-theme', 'dark');
            $('.light-mode').removeClass('ThemeSwitcher_active__tEOA_');
            $('.dark-mode').addClass('ThemeSwitcher_active__tEOA_');
            $('.ThemeSwitcher_container__a7GUH').addClass('ThemeSwitcher_changeAnimation__ntjBa');
            eraseCookie('mode');
        }
    });

    lazyLoad();
    open_mobile();
    close_mobile();
    share_game();
    iframe_blur();
    hide_show_content();
	sliderMenuSlick();
	add_module();
});
function add_module() {
    if (!id_game && !url_game) {
        return
    }
    let url = "/add-module.ajax";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            id_game: id_game,
            url_game: url_game
        },
        success: function (response) {
            if (response) {
                let data = JSON.parse(response);

                $("#rate-area").html(data.rate);
                $("#comment-area").html(data.comment);
            }
        }
    })
}
function checkWidth() {
    var $window = $(window);
    var windowsize = $window.width();
    if (windowsize < 1024) {
        $('.Menu_container__nTTRM').css({
            'position': 'absolute',
            'top': '0px'
        });
    }
}

function lazyLoad() {
    $('.lazy').Lazy({
        effect: "fadeIn",
        effectTime: 300,
    });
}

function iframe_blur() {
    $('.GameFrame_theaterMode__jRbbR').click(function () {
        if ($('.GameFrame_container__nwWxD').hasClass('GameFrame_theaterModeActive__p_bQM')) {
            iframe_blur_close();
        } else {
            $('html').css({
                'position': 'relative',
                'overflow': 'hidden'
            });
            $('body').css({
                'position': 'relative',
                'overflow': 'hidden',
                'padding-right': '0px'
            });
            $('.iframe-blur').addClass('GameFrame_theaterModeBlur__dJNkq');
            $('.iframe-filler').addClass('GameFrame_theaterModeFiller__jDWAm');
            $('.GameFrame_container__nwWxD').addClass('GameFrame_theaterModeActive__p_bQM');
        }

    })

}

function sliderMenuSlick() {
    $('.menu_header_slick').slick({
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 7,
        centerMode: false,
		touchThreshold:100,
        variableWidth: true,  
		autoplay: false, 

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1196,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 1078,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 916,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 778,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

function iframe_blur_close() {
    $('html').attr('style', '');
    $('body').attr('style', '');
    $('.iframe-blur').removeClass('GameFrame_theaterModeBlur__dJNkq');
    $('.iframe-filler').removeClass('GameFrame_theaterModeFiller__jDWAm');
    $('.GameFrame_container__nwWxD').removeClass('GameFrame_theaterModeActive__p_bQM');
}

function open_mobile() {
    $('.seach_btn_mobile').click(function () {
        close_mobile()
        $(this).addClass('LandingTemplate_activeMenuItem__x5tAV');
        $('.Menu_container__nTTRM').addClass('Menu_open__6gCv7');
        $('.Menu_search__lQss3').addClass('Menu_searchView__kvXQg');
    })
    $('.menu_mobile').click(function () {
        close_mobile();
        $(this).addClass('LandingTemplate_activeMenuItem__x5tAV');
        $('.Menu_itemContainer__UWp0c').addClass('Menu_menuView__VrrfA');
        $('.Menu_container__nTTRM').addClass('Menu_open__6gCv7');
        $('html').css({
            'position': 'relative',
            'overflow': 'hidden'
        });
        $('body').css({
            'position': 'relative',
            'overflow': 'hidden',
            'padding-right': '0px'
        });
    })
    $('.Menu_back__3D_An').click(function () {
        close_mobile();
    })
}

function hide_show_content() {
    let height_content = $('.content_limit_height .content_game').outerHeight();
    if (height_content <= 300) {
        $('.ShowMore_buttonBlock__PKk1K').css({'display': 'none'})
        $('.GameDescription_textDescription__ypE_h').removeClass('ShowMore_container__Vmwgw');
    } else {
        $('.ShowMore_buttonBlock__PKk1K').css({'display': 'flex'})
        $('.GameDescription_textDescription__ypE_h').addClass('ShowMore_container__Vmwgw');
    }

    $('.ShowMore_showButton__1iBPT').click(function () {
        if ($('.ShowMore_showButton__1iBPT').hasClass('more')) {
            $('.ShowMore_showButton__1iBPT').removeClass('more')
            $('.content_limit_height').animate({
                'height': height_content + 'px',
                'overflow': 'hidden',
                'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing',
                complete: function () {
                    $('.content_limit_height').attr('style', 'height:auto');
                    $('.ShowMore_showButton__1iBPT').html('Show less <span class="svg-icon ShowMore_decorator__jIg0a ShowMore_rotateButton__Y08mp" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_up"></use> </svg> </span>');
                    $('.ShowMore_showButton__1iBPT').addClass('less')

                }
            })
        } else {
            $('.ShowMore_showButton__1iBPT').removeClass('less')
            $('.content_limit_height').animate({
                'height': '290px',
                'overflow': 'hidden',
                'animation': 'height 1000ms ease 0ms'
            }, {
                easing: 'swing',
                complete: function () {
                    $('.content_limit_height').attr('style', 'height:290px;overflow:hidden');
                    $('.ShowMore_showButton__1iBPT').html('Show more <span class="svg-icon ShowMore_decorator__jIg0a ShowMore_rotateButton__Y08mp" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-keyboard_arrow_down"></use> </svg> </span>');
                    $('.ShowMore_showButton__1iBPT').addClass('more')
                }
            })

        }

    })


}

function share_game() {
    $('.GameFrame_share__uBcfF').click(function () {
        $('html').css({
            'position': 'relative',
            'overflow': 'hidden'
        });
        $('body').css({
            'position': 'relative',
            'overflow': 'hidden',
            'padding-right': '0px'
        });
        $('.Modal_modal__AhY2h').css({
            'display': 'flex'
        });
    });
    $('.Modal_close__9zpcu').click(function () {
        $('html').attr('style', '');
        $('body').attr('style', '');
        $('.Modal_modal__AhY2h').css({
            'display': 'none'
        });
    })
}

function copyToClipboard(element, e) {
    var $temp = $("<input>");
    $("body").append($temp);
    // $temp.val($(element).val()).select();
    $(element).select();
    document.execCommand("copy");
    $(e).html('COPIED!!');
    setTimeout(function () {
        $(e).html('Copy link');
    }, 3000);
    $temp.remove();
}

function close_mobile() {

    $('.seach_btn_mobile').removeClass('LandingTemplate_activeMenuItem__x5tAV');
    $('.Menu_container__nTTRM').removeClass('Menu_open__6gCv7');
    $('.menu_mobile').removeClass('LandingTemplate_activeMenuItem__x5tAV');
    $('.Menu_search__lQss3').removeClass('Menu_searchView__kvXQg');
    $('.Menu_itemContainer__UWp0c').removeClass('Menu_menuView__VrrfA');
    $('html').attr('style', '');
    $('body').attr('style', '');

}

function search_mobile() {
    $('input#search2').each(function () {
        let empty = $(this).val().length == 0;
        if (empty) {
            $('.btn_search_2').attr('disabled', 'disabled');
        }
    });
    $('input#search2').on('keyup', function (e) {
        let empty = false;
        $('input#search2').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty) {
            $('.btn_search_2').attr('disabled', 'disabled');
        } else {
            $('.btn_search_2').attr('disabled', false);
            if (e.keyCode === 13) {
                window.location.replace("/search?q=" + $("#search2").val());
            }
            $(".btn_search_2").on('click', function () {
                window.location.replace("/search?q=" + $("#search2").val());
            });
        }

    });
}

function showContentGame() {
    var container = $("#game-content-game");
    var container_overlay = $(".popup-overlay");
    $('#how-to-play-game').click(function () {
        if (container.css("display") == "none") {
            container_overlay.show()
            container.fadeIn(200);
        } else {
            container_overlay.hide()
            container.fadeOut(300);
        }
    });
    $(document).mouseup(function (e) {
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container_overlay.hide();
            container.fadeOut(300);

        }
    });
    $('.close_popup').click(function () {
        container_overlay.hide();
        container.fadeOut(300);
    })
}


function search_complete() {
    $("#search_txt").keyup(delay(function (e) {
        var keyword = $("#search_txt").val();
        if (keyword.length >= 3) {
            search_complete(keyword);
        }
    }, 700));

    function search_complete(s) {
        var metadataload = {};
        metadataload.keywords = s;
        jQuery.ajax({
            url: "game-results-search.ajax",
            data: metadataload,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $(".HeaderSearchField_gamesList__fdc_x").css('display', 'flex');
                    $(".HeaderSearchField_gamesList__fdc_x").html(data);

                    var i = document.getElementById("search_txt");
                    i.addEventListener("focus", (function () {
                        document.getElementsByClassName("HeaderSearchField_gamesList__fdc_x")[0].style.display = "flex"
                    })), i.addEventListener("focusout", (function () {
                        setTimeout((function () {
                            document.getElementsByClassName("HeaderSearchField_gamesList__fdc_x")[0].style.display = "none"
                        }), 500)
                    }))
                    $("#search_txt").keyup(delay(function (e) {
                        var keyword = $("#search_txt").val();
                        if (keyword.length < 3) {
                            $(".HeaderSearchField_gamesList__fdc_x").css('display', 'none');
                        }
                    }, 700));
                }
            }
        });
    }

    //

    $("#search_txt").on('keyup', function (e) {
        let empty = false;
        $('input#search_txt').each(function () {
            empty = $(this).val().length == 0;
        });

        if (empty) {
            $('#search_button').attr('disabled', 'disabled');
        } else {
            $('#search_button').attr('disabled', false);
            if (e.keyCode === 13) {
                window.location.replace("/search?q=" + $("#search_txt").val());
            }
            $("#search_button").on('click', function () {
                window.location.replace("/search?q=" + $("#search_txt").val());
            });
        }
    });


    $('input#search_txt').each(function () {
        let empty = $(this).val().length == 0;
        if (empty) {
            $('#search_button').attr('disabled', 'disabled');
        }
    });
}

function favorite(e) {
    var image = $(e).data('image');
    var id = $(e).data('id');
    var slug = $(e).data("slug");
    var name = $(e).data("name");
    var state = $(e).data("state");
    var ratescore = $(e).data("ratescore");
    console.log(ratescore);
    var favorited;
    if ($(e).hasClass('favorited')) {
        remove_wishlist_cookies(id);
        favorited = true;
        $(e).removeClass('favorited');
    } else {
        console.log("luu lai");
        save_wishlish_cookies(id, slug, image, name, state, ratescore);
        $(e).addClass('favorited');
        favorited = false;
    }
    notifical_show(id, name, image, slug, favorited, e);
}

function notifical_show(id, name, image, slug, favorited, e) {
    let str = '';
    str += '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span><span class="ms-2">' + (favorited == true ? "Add" : "Remove") + ' to Favorites</span>';
    $(e).html(str);
    let html = '';
    html += '<div class="wrapper notification-success"> <div class="toastt"> <div class="content_notification"> <div class="icon"><img width="50" height="50" src="' + image + '" class="img-fluid" /></div> <div class="details"> <span>' + (favorited == true ? "Remove" : "Add") + ' Success</span> <p>' + name + '</p> </div> </div> </div> </div>'
    $('body').one("click", e, function () {
        notification(html, 1000)
    })
}

function notification(s, time) {
    $(s).appendTo('body').fadeTo(time, 1, function () {
        $(this).fadeTo(1000, 0, function () {
            $(this).addClass('hide');
            $(this).remove();
        });
    });
}

function remove_wishlist_cookies(_id) {
    if (!!jQuery.cookie('favorite_game') && _id !== '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        jQuery.each(favorite_array, function (key, value) {
            favorite_array = favorite_array.filter(function (element) {
                return element !== undefined;
            });
            if (value.id === _id && key > -1) {

                favorite_array.splice(key, 1);
            }
        });
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
        $(".favorites-add-" + _id).removeClass('favorited');
        $(".favorites-add-" + _id).html('<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span><span class="ms-2">Add to Favorites</span>')
        load_wishlist_cookies();
    }
}

function save_wishlish_cookies(_id, _slug, _image, _name, _state, _ratescore) {
    var favorites_count = 9;
    if (!!jQuery.cookie('favorite_game') && _slug !== '' && _image !== '' && _id !== '' && _name != '' && _ratescore != '' && _state != '') {
        var favorite_array = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        jQuery.each(favorite_array, function (key, value) {
            if (value !== undefined && value.slug === _slug && key > -1) {
                favorite_array.splice(key, 1);
            }
        });
        favorite_array.push(
            {
                "id": _id,
                "slug": _slug,
                "image": _image,
                "ratescore": _ratescore,
                "state": _state,
                "name": _name
            }
        );
        if (favorite_array.length > favorites_count) {
            favorite_array.shift();
        }
        jQuery.cookie('favorite_game', JSON.stringify(favorite_array), {expires: 30, path: '/'});
    } else {
        var data = [];
        data.push(
            {
                "id": _id,
                "slug": _slug,
                "image": _image,
                "ratescore": _ratescore,
                "state": _state,
                "name": _name
            }
        );
        jQuery.cookie('favorite_game', JSON.stringify(data), {expires: 30, path: '/'});
    }
    load_wishlist_cookies();
}

function load_wishlist_cookies() {
    if (!!jQuery.cookie('favorite_game')) {
        var favorites = JSON.parse(jQuery.cookie("favorite_game"));
        let circle_html = '';
        if (favorites.length > 0) {
//Load checked compare
            var str_wishlist = '';
            let str = '';
            var $leng = favorites.length;
            var slug_array = [];
            let label_game = '';
            for (var i = $leng - 1; i >= 0; i--) {
                var value = favorites[i];
                slug_array.push(value.slug + "_" + value.kind); 
                if (value.state == 'hot') {
                    label_game = 'GameLabel_hot__cd7o3';
                } else if (value.state == 'new') {
                    label_game = 'GameLabel_new__ZOGIJ';
                } else if (value.state == 'trending') {
                    label_game = 'GameLabel_top-rated__etkoJ';
                }
                //str_wishlist += '<a href="/' + value.slug + '" class="card"> <picture> <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="' + value.image + '" alt="' + value.name + '" class="lazy img-fluid"> </picture> <div class="card-body"> <h3>' + value.name + '</h3> </div> </a>'
                str_wishlist += '<div class="GameCard_container__Mx9pI LandingCategory_card__XCm8G" style="--my-css-var-scale: 1.2; --my-css-var-font: 12;">\n' +
                '    <a draggable="false" class="GameCard_link__OUOlF" href="/' + value.slug + '">\n' +
                '        <div style="position: relative; width: 100%; height: 100%; border-radius: 8px; overflow: hidden;">\n' +
                '            <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0; margin: 0; padding: 0; position: absolute; top: 0; left: 0; bottom: 0; right: 0;">\n' +
                '                <img\n' +
                '                    alt="' + value.name + '"\n' +
                '                    class=""\n' +
                '                    src="' + value.image + '"\n' +
                '                    decoding="async"\n' +
                '                    data-nimg="fill"\n' +
                '                    style="\n' +
                '                        position: absolute;\n' +
                '                        inset: 0px;\n' +
                '                        box-sizing: border-box;\n' +
                '                        object-fit: cover;\n' +
                '                        padding: 0px;\n' +
                '                        border: none;\n' +
                '                        margin: auto;\n' +
                '                        display: block;\n' +
                '                        width: 0px;\n' +
                '                        height: 0px;\n' +
                '                        min-width: 100%;\n' +
                '                        max-width: 100%;\n' +
                '                        min-height: 100%;\n' +
                '                        max-height: 100%;\n' +
                '                    "\n' +
                '                    loading="lazy"\n' +
                '                />\n' +
                '            </span>\n' +
                '        </div>\n' +
                '        <div class="GameCard_descriptionBlock__0fljH">\n' +
                '            <div class="GameCard_description__mYhK5"><p class="GameCard_descriptionTitle__XSI0n">' + value.name + '</p></div>\n' +
                '            <div class="OneStarRating__starRating__awF9F GameCard_rating__yT_mJ OneStarRating__likeLabel__JyaKh">' +
                '       <span class="svg-icon OneStarRating__star__ZoEus" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-star-full"></use> </svg> </span><span class="OneStarRating__number__b_kCp">' + value.ratescore + '</span></div>\n' +
                '        </div>\n' +
                '    </a>\n' +
                '    <div class="GameLabel_container__WUTxA '+label_game+'">' + value.state + '</div>\n' +
                    '</div>'
                if (value.slug === current_slug && !$(".favorites-add-" + value.id).hasClass('favorited')) {
                    $(".favorites-add-" + value.id).addClass("favorited");
                }

            }
            if ($(".favorites_btn").hasClass('favorited')) {
                str = '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span> <span class="ms-2">Remove to Favorites</span>';
            } else {
                str = '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-heart"></use> </svg> </span> <span class="ms-2">Add to Favorites</span>';
            }
            $(".favorites_btn").html(str);
            circle_html += '<span class="count">' + $leng + '</span>';
            let html = '';
            if (str_wishlist != "") {
                jQuery("#favoriteGames").html(str_wishlist);

            }
            $(".empty_favorite").hide();
        } else {
            circle_html += '';
            $(".empty_favorite").show();
            $(".empty_favorite").html('<center>No favorite game</center>')
            jQuery("#favoriteGames").html('');
        }

        /*var $listItems = $('#number-favorite > div');

        $listItems.each(function (id) {
            $listItems.eq(id).remove();

        });
        $('#number-favorite').append(circle_html);*/
        jQuery(".favorite-link .count_num").html(circle_html);

    } else {
        $(".empty_favorite").show();
        $(".empty_favorite").html('<center>No favorite game</center>')
        jQuery("#favoriteGames").html('');
    }

}

function slider_js() {
    $('.owl-carousel').owlCarousel({
        loop: false,
        center: false,
        dots: false,
        stagePadding: 50,
        margin: 10,
        nav: true,
        navText: [
            '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-chevron-left"></use> </svg> </span>',
            '<span class="svg-icon" aria-hidden="true"> <svg class="svg-icon__link"> <use xlink:href="#icon-chevron-right"></use> </svg> </span>'
        ],
        navContainer: '.main-content .custom-nav',
        autoplay: true,
        autoplayTimeout: 3000,
        onDragged: callback,
        onTranslate: callback,
        responsive: {
            0: {
                items: 1
            },
            425: {
                items: 2
            },
            600: {
                items: 3
            },
            928: {
                items: 5
            },
            1200: {
                items: 8
            }
        }
    });

    function callback(event) {
        lazyLoad();
    }
}

var btn = $('#button-gotop');
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});
btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});

function open_fullscreen() {
    let game = document.getElementById("game-area") || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {

        if (game.requestFullscreen) {
            game.requestFullscreen();
        } else if (game.msRequestFullscreen) {
            game.msRequestFullscreen();
        } else if (game.mozRequestFullScreen) {
            game.mozRequestFullScreen();
        } else if (game.webkitRequestFullscreen) {
            game.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
