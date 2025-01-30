
window.addEventListener("DOMContentLoaded", function () {
    slider_js();
    search_complete();
	add_module();
	game_share();
	lazyLoad()
    $('input.searchMobileInput').on('keyup', function () {
        let empty = false;
        $('input.searchMobileInput').each(function () {
            empty = $(this).val().length == 0;
        });
        if (empty) {
            $('.searchMobileBtn').attr('disabled', 'disabled');
        } else {
            $('.searchMobileBtn').attr('disabled', false);
            $("input.searchMobileInput").on('keyup', function (e) {
                if (e.keyCode === 13) {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                }
                $(".searchMobileBtn").on('click', function () {
                    window.location.replace("/search/" + $("input.searchMobileInput").val());
                });
            });
        }
    });
    let mobile_icon = document.querySelector("#menu-mobile");
    let mobile_close_icon = document.querySelector(".mobile-close");
    let mobile_menu = document.querySelector(".mobile-menu");
    if (mobile_icon) {
        mobile_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "0";
            e.stopPropagation();
        })
    }
    if (mobile_close_icon) {
        mobile_close_icon.addEventListener('click', function (e) {
            document.querySelector(".mobile-menu").style.right = "-310px";
        })
    }
    mobile_menu.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    document.addEventListener('click', function () {
        document.querySelector(".mobile-menu").style.right = "-310px";
    }) 
});
function lazyLoad() {
    $('.lazy').Lazy({
        effect: "fadeIn", effectTime: 300,
    });
}

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
function game_share() {
    close_popup();
    $("._share_btn").click(function () {
        open_popup();
    })
    $(".popup-close").click(function () {
        close_popup();
    })
    $(".popup-bg").click(function () {
        close_popup();
    })
}

function open_popup() {
    $(".popup-bg").show();
    $('.share_social_list').find('.st-btn').addBack().show();
    $(".popup-share").show();
    $("html").css("overflow", "hidden")
}

function close_popup() {
    $(".popup-bg").hide();
    $(".popup-share").hide();
    $("html").css("overflow", "");
}



function search_complete() {
    $("#search").keyup(delay(function (e) {
        var keyword = $("#search").val();
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
                    $("#results").show();
                    $("#results").html(data);
                    var i = document.getElementById("search");
                    i.addEventListener("focus", (function () {
                        document.getElementById("results").style.display = "block"
                    })), i.addEventListener("focusout", (function () {
                        setTimeout((function () {
                            document.getElementById("results").style.display = "none"
                        }), 500)
                    }))
                    $("#search").keyup(delay(function (e) {
                        var keyword = $("#search").val();
                        if (keyword.length < 3) {
                            $("#results").hide();
                        }
                    }, 700));
                }
            }
        });
    }

    //
    if ($("#search").val != '') {
        $("#search").on('keyup', function (e) {
            if (e.keyCode === 13) {
                window.location.replace("/search/" + $("#search").val());
            }
        });
    }

}
function slider_js() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        center: false,
        dots: false,
        stagePadding: 50,
        margin: 10,
        nav: true,
        navText: [
            '<span class="svg-icon " aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#icon-chevron-left"></use></svg></span>',
            '<span class="svg-icon " aria-hidden="true"><svg class="svg-icon__link"><use xlink:href="#icon-chevron-right"></use></svg></span>'
        ],
        navContainer: '.main-content .custom-nav',
        autoplay: true,
        autoplayTimeout: 3000,
        onDrag: onDragGame,
        onDragged: onDraggedGame,
        onTranslate: callback, 
        responsive: {
            0: {
                items: 2.6
            },
            500: {
                items: 4.3
            },
            768: {
                items: 5
            },
            982: {
                items: 5.8
            },
            1100: {
                items: 6.2
            },
            1300: {
                items: 6.8
            },
            1500: {
                items:7.5
            }
        }
    });

}
function callback(event) {
    lazyLoad();
}

function onDraggedGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'auto');
}
function onDragGame(event) {
    event.preventDefault();
    $(event.currentTarget).css('pointer-events', 'none');
}
var btn = $('#button-gotop');
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.fadeIn();
    } else {
        btn.fadeOut();
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
function copyToClipboard(e, t) {
    var s = $("<input>");
    $("body").append(s), $(e).select(), document.execCommand("copy"), $(t).html("COPIED!!"), setTimeout((function () {
        $(t).html("Copy link")
    }), 3e3), s.remove()
}
