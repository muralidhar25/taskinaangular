"use strict";
! function(p) {
    p.fn.myOwl = function(e) {
        var t = p.extend({
            items: 1,
            dots: !1,
            loop: !0,
            mouseDrag: !0,
            touchDrag: !0,
            nav: !1,
            autoplay: !0,
            navText: ["", ""],
            margin: 0,
            stagePadding: 0,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !0,
            navRewind: !1,
            responsive: {},
            animateOut: "",
            animateIn: "",
            center: "",
            merge: "",
            autoWidth: ""
        }, e);
        return this.owlCarousel({
            items: t.items,
            loop: t.loop,
            mouseDrag: t.mouseDrag,
            touchDrag: t.touchDrag,
            nav: t.nav,
            navText: t.navText,
            dots: t.dots,
            margin: t.margin,
            stagePadding: t.stagePadding,
            autoplay: t.autoplay,
            autoplayTimeout: t.autoplayTimeout,
            autoplayHoverPause: t.autoplayHoverPause,
            animateOut: t.animateOut,
            animateIn: t.animateIn,
            responsive: t.responsive,
            navRewind: t.navRewind,
            center: t.center,
            merge: t.merge,
            autoWidth: t.autoWidth
        })
    }
    var y = function() {
        var e = p(".xs-header");
        p(".xs-inner-banner .inner-banner").css("marginTop", e.outerHeight() / 2)
    };
    if (p.fn.scrollView = function() {
            return this.each(function() {
                p("html, body").animate({
                    scrollTop: p(this).offset().top
                }, 1e3)
            })
        }, p(document).ready(function() {
            var e, t;
            y(), e = p(".timeline").children(), t = (e.length - 1) * e.outerHeight(), p(".timeline").append("<style>.timeline::before{height: " + t + "px}</style>"), e.last().css("paddingBottom", "0"), 0 < p(".xs-menus").length && p(".xs-menus").xs_nav({
                    mobileBreakpoint: 992
                }), 0 < p(".xs-hidden-menus").length && (p(".xs-hidden-menus").xs_nav({
                    hidden: !0,
                    offCanvasSide: "right"
                }), p(".offsetmenu-btn").on("click", function() {
                    p(".xs-hidden-menus").data("xs_nav").toggleOffcanvas()
                })), p(document).on("submit", "#xs-contact-form", function(e) {
                    e.preventDefault();
                    var t, i = p("#xs_contact_name"),
                        a = p("#xs_contact_last_name"),
                        o = p("#xs_contact_number"),
                        n = p("#xs_contact_email"),
                        s = p("#xs_contact_subject"),
                        r = p("#x_contact_massage"),
                        l = p("#xs_contact_submit"),
                        d = !1;
                    
                    
                  
                  
                    if (0 < r.length) {
                        if ("" === r.val().trim()) return r.addClass("invaild"), d = !0, r.focus(), !1;
                        r.removeClass("invaild")
                    }!1 === d && (l.before().hide().fadeIn(), p.ajax({
                        type: "POST",
                        url: "assets/php/contact-form.php",
                        data: {
                            xs_contact_name: i.val(),
                            xs_contact_last_name: a.val(),
                            xs_contact_number: o.val(),
                            xs_contact_email: n.val(),
                            xs_contact_subject: s.val(),
                            x_contact_massage: r.val()
                        },
                        success: function(e) {
                            l.after('<p class="xpeedStudio_success_message">' + e + "</p>").hide().fadeIn(), setTimeout(function() {
                                p(".xpeedStudio_success_message").fadeOut(1e3, function() {
                                    p(this).remove()
                                })
                            }, 5e3), p("#xs-contact-form")[0].reset()
                        }
                    }))
                }), p(document).on("keydown", function(e) {
                    return !(e.ctrlKey && 85 == e.keyCode || e.ctrlKey && e.shiftKey && 73 == e.keyCode || e.ctrlKey && e.shiftKey && 75 == e.keyCode)
                }), 0 < p(".insta-feed").length && p(".insta-feed").instaFeed({
                    token: "2367672995.1677ed0.dea7a14501d04cd9982c7a0d23c716dd",
                    photos: 6
                }), 0 < p(".insta-feed2").length && p(".insta-feed2").instaFeed({
                    token: "2367672995.1677ed0.dea7a14501d04cd9982c7a0d23c716dd",
                    photos: 8
                }), 0 < p(".xs-modal-popup").length && p(".xs-modal-popup").magnificPopup({
                    type: "inline",
                    fixedContentPos: !1,
                    fixedBgPos: !0,
                    overflowY: "auto",
                    closeBtnInside: !1,
                    callbacks: {
                        beforeOpen: function() {
                            this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup"
                        }
                    }
                }), 0 < p("img").length && p("img").each(function() {
                    p(this).attr("draggable", "false"), p(this).on("mousedown", function(e) {
                        e.preventDefault && e.preventDefault()
                    })
                }), 0 < p(".agency-office-slider").length && p(".agency-office-slider").myOwl({
                    items: 3,
                    autoWidth: !0,
                    margin: 30,
                    nav: !0,
                    navText: ['<i class="icon icon-arrow-left" />', '<i class="icon icon-arrow-right" />'],
                    responsive: {
                        0: {
                            items: 1,
                            autoWidth: !1,
                            nav: !1,
                            margin: 0
                        },
                        480: {
                            items: 1,
                            autoWidth: !1,
                            nav: !1,
                            margin: 0
                        },
                        768: {
                            items: 2,
                            autoWidth: !1,
                            nav: !1
                        },
                        1024: {
                            items: 3,
                            autoWidth: !0,
                            nav: !0
                        }
                    }
                }), 0 < p(".review-slider").length && p(".review-slider").myOwl({
                    nav: !0,
                    navText: ['<i class="icon icon-left-arrows"></i>', '<i class="icon icon-right-arrow"></i>'],
                    dots: !0,
                    responsive: {
                        0: {
                            nav: !1
                        },
                        480: {
                            nav: !1
                        },
                        768: {
                            nav: !1
                        },
                        1024: {
                            nav: !0
                        }
                    }
                }), 0 < p(".client-slider").length && p(".client-slider").myOwl({
                    items: 5,
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        },
                        1024: {
                            items: 5
                        }
                    }
                }),
                function() {
                    for (var e = ["#b224ef", "#0369d1", "#ff4eb6"], t = ["#5055fa", "#00ecbc", "#ffcb6d"], i = p(".chart"), a = p(".chart-content"), o = 0; o < p(".single-piechart").length; o++) {
                        p(i[o]).myGradientChart({
                            barColor1: e[o],
                            barColor2: t[o]
                        });
                        var n = p(i[o]).attr("data-percent");
                        p(a[o]).append('<span class="gradient-title" style="background: linear-gradient(90deg, ' + e[o] + " 0%, " + t[o] + " 84%); color: " + e[o] + ';     -webkit-background-clip: text;">' + n + "%</span>")
                    }
                }();
            
           
           
            var a = window.location.pathname,
                o = a.substr(a.lastIndexOf("/") + 1);
            if (p(".nav-menu li a").each(function(e, t) {
                    var i = this.href.substr(this.href.lastIndexOf("/") + 1);
                    o == i && (p([t]).addClass("active"), p([t]).parents().closest(".nav-submenu").parent("li") && p([t]).parents().closest(".nav-submenu").parent("li").addClass("active"), p([t]).parent().addClass("active"))
                }), 0 < p(".xs-image-popup").length && p(".xs-image-popup").magnificPopup({
                    type: "image",
                    removalDelay: 500,
                    callbacks: {
                        beforeOpen: function() {
                            this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"), this.st.mainClass = "mfp-zoom-in"
                        }
                    },
                    closeOnContentClick: !0,
                    midClick: !0,
                    gallery: {
                        enabled: !0
                    }
                }), 0 < p(".post-gallery-slider").length && p(".post-gallery-slider").myOwl({
                    nav: !0,
                    navText: ['<i class="icon icon-left-arrows" />', '<i class="icon icon-right-arrow" />']
                }), p(".comment-reply-link").on("click", function(e) {
                    e.preventDefault(), p("#comment-form").scrollView()
                }), 0 < p(".parallax-service").length) new Swiper(".parallax-service", {
                direction: "vertical",
                slidesPerView: 1,
                mousewheel: {
                    invert: !0,
                    releaseOnEdges: !0,
                    forceToAxis: !0
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0
                }
            });
            (0 < p(".xs-select").length && p(".xs-select").mySelect(), 0 < p(".product-slider, .about-slider").length && p(".product-slider, .about-slider").myOwl({
                dots: !0,
                responsive: {
                    0: {
                        dots: !1
                    },
                    768: {
                        dots: !0
                    }
                }
            }), 0 < p(".custom_number").length && p(".custom_number").customNumber({
                plusIcon: '<i class="icon icon-up-arrow2"></i>',
                minusIcon: '<i class="icon icon-down-arrow2"></i>'
            }), 0 < p(".btn-floating").length) && (p(".floating-icons-list").addClass("hidden"), p(".btn-floating").each(function() {
                p(this).on("click", function(e) {
                    e.preventDefault(), p(this).next().toggleClass("open"), p(this).next().toggleClass("hidden"), p(this).hasClass("active") ? p(this).removeClass("active") : p(this).addClass("active")
                })
            }));
            if (0 < p(".rate-graph").length && p(".rate-graph").each(function() {
                   
                }), 0 < p(".banner-slider, .quote-slider").length && p(".banner-slider, .quote-slider").myOwl({
                    nav: !0,
                    navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
                    responsive: {
                        0: {
                            nav: !1
                        },
                        768: {
                            nav: !0
                        }
                    }
                }), 0 < p(".scrollto-button").length && p(".scrollto-button").goCurrentSection(), 0 < p(".review-slider-preview").length && 0 < p(".review-slider-thumb").length) {
                var n = p(".review-slider-preview"),
                    s = p(".review-slider-thumb"),
                    r = 5,
                    l = !0;
                n.owlCarousel({
                    items: 1,
                    slideSpeed: 2e3,
                    nav: !1,
                    autoplay: !0,
                    dots: !1,
                    loop: !0,
                    responsiveRefreshRate: 200
                }).on("changed.owl.carousel", function(e) {
                    var t = e.item.count - 1,
                        i = Math.round(e.item.index - e.item.count / 2 - .5);
                    i < 0 && (i = t), t < i && (i = 0), s.find(".owl-item").removeClass("current").eq(i).addClass("current");
                    var a = s.find(".owl-item.active").length - 1,
                        o = s.find(".owl-item.active").first().index();
                    s.find(".owl-item.active").last().index() < i && s.data("owl.carousel").to(i, 100, !0), i < o && s.data("owl.carousel").to(i - a, 100, !0)
                }), s.on("initialized.owl.carousel", function() {
                    s.find(".owl-item").eq(0).addClass("current")
                }).owlCarousel({
                    items: r,
                    dots: !1,
                    nav: !1,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    slideBy: r,
                    responsiveRefreshRate: 100,
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        768: {
                            items: 3
                        },
                        1024: {
                            items: r
                        }
                    }
                }).on("changed.owl.carousel", function(e) {
                    if (l) {
                        var t = e.item.index;
                        n.data("owl.carousel").to(t, 100, !0)
                    }
                }), s.on("click", ".owl-item", function(e) {
                    e.preventDefault();
                    var t = p(this).index();
                    n.data("owl.carousel").to(t, 300, !0)
                })
            }

          
        }), 0 < p("#xs-map").length) {
    }
}(jQuery);