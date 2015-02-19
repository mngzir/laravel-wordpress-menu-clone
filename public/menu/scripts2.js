
var showNotice, adminMenu, columns, validateForm, screenMeta;
! function(a, b) {
    adminMenu = {
            init: function() {},
            fold: function() {},
            restoreMenuState: function() {},
            toggle: function() {},
            favorites: function() {}
        }, columns = {
            init: function() {
                var b = this;
                a(".hide-column-tog", "#adv-settings").click(function() {
                    var c = a(this),
                        d = c.val();
                    c.prop("checked") ? b.checked(d) : b.unchecked(d), columns.saveManageColumnsState()
                })
            },
            saveManageColumnsState: function() {
                var b = this.hidden();
                a.post(ajaxurl, {
                    action: "hidden-columns",
                    hidden: b,
                    screenoptionnonce: a("#screenoptionnonce").val(),
                    page: pagenow
                })
            },
            checked: function(b) {
                a(".column-" + b).show(), this.colSpanChange(1)
            },
            unchecked: function(b) {
                a(".column-" + b).hide(), this.colSpanChange(-1)
            },
            hidden: function() {
                return a(".manage-column").filter(":hidden").map(function() {
                    return this.id
                }).get().join(",")
            },
            useCheckboxesForHidden: function() {
                this.hidden = function() {
                    return a(".hide-column-tog").not(":checked").map(function() {
                        var a = this.id;
                        return a.substring(a, a.length - 5)
                    }).get().join(",")
                }
            },
            colSpanChange: function(b) {
                var c, d = a("table").find(".colspanchange");
                d.length && (c = parseInt(d.attr("colspan"), 10) + b, d.attr("colspan", c.toString()))
            }
        }, a(document).ready(function() {
            columns.init()
        }), validateForm = function(b) {
            return !a(b).find(".form-required").filter(function() {
                return "" === a("input:visible", this).val()
            }).addClass("form-invalid").find("input:visible").change(function() {
                a(this).closest(".form-invalid").removeClass("form-invalid")
            }).size()
        }, showNotice = {
            warn: function() {
                var a = commonL10n.warnDelete || "";
                return confirm(a) ? !0 : !1
            },
            note: function(a) {
                alert(a)
            }
        }, screenMeta = {
            element: null,
            toggles: null,
            page: null,
            init: function() {
                this.element = a("#screen-meta"), this.toggles = a(".screen-meta-toggle a"), this.page = a("#wpcontent"), this.toggles.click(this.toggleEvent)
            },
            toggleEvent: function(b) {
                var c = a(this.href.replace(/.+#/, "#"));
                b.preventDefault(), c.length && (c.is(":visible") ? screenMeta.close(c, a(this)) : screenMeta.open(c, a(this)))
            },
            open: function(b, c) {
                a(".screen-meta-toggle").not(c.parent()).css("visibility", "hidden"), b.parent().show(), b.slideDown("fast", function() {
                    b.focus(), c.addClass("screen-meta-active").attr("aria-expanded", !0)
                }), a(document).trigger("screen:options:open")
            },
            close: function(b, c) {
                b.slideUp("fast", function() {
                    c.removeClass("screen-meta-active").attr("aria-expanded", !1), a(".screen-meta-toggle").css("visibility", ""), b.parent().hide()
                }), a(document).trigger("screen:options:close")
            }
        }, a(".contextual-help-tabs").delegate("a", "click", function(b) {
            var c, d = a(this);
            return b.preventDefault(), d.is(".active a") ? !1 : (a(".contextual-help-tabs .active").removeClass("active"), d.parent("li").addClass("active"), c = a(d.attr("href")), a(".help-tab-content").not(c).removeClass("active").hide(), void c.addClass("active").show())
        }), a(document).ready(function() {
            function c(a) {
                var b, c, d, e, f, g, h, i = a.find(".wp-submenu");
                f = a.offset().top, g = w.scrollTop(), h = f - g - 30, b = f + i.height() + 1, c = z.height(), d = 60 + b - c, e = w.height() + g - 50, b - d > e && (d = b - e), d > h && (d = h), d > 1 ? i.css("margin-top", "-" + d + "px") : i.css("margin-top", "")
            }

            function d(a) {
                var b = w.scrollTop(),
                    c = !a || "scroll" !== a.type;
                if (!(s || u || A.data("wp-responsive"))) {
                    if (M.menu + M.adminbar < M.window || M.menu + M.adminbar + 20 > M.wpwrap) return void f();
                    if (L = !0, M.menu + M.adminbar > M.window) {
                        if (0 > b) return void(I || (I = !0, J = !1, y.css({
                            position: "fixed",
                            top: "",
                            bottom: ""
                        })));
                        if (b + M.window > v.height() - 1) return void(J || (J = !0, I = !1, y.css({
                            position: "fixed",
                            top: "",
                            bottom: 0
                        })));
                        b > H ? I ? (I = !1, K = y.offset().top - M.adminbar - (b - H), K + M.menu + M.adminbar < b + M.window && (K = b + M.window - M.menu - M.adminbar), y.css({
                            position: "absolute",
                            top: K,
                            bottom: ""
                        })) : !J && y.offset().top + M.menu < b + M.window && (J = !0, y.css({
                            position: "fixed",
                            top: "",
                            bottom: 0
                        })) : H > b ? J ? (J = !1, K = y.offset().top - M.adminbar + (H - b), K + M.menu > b + M.window && (K = b), y.css({
                            position: "absolute",
                            top: K,
                            bottom: ""
                        })) : !I && y.offset().top >= b + M.adminbar && (I = !0, y.css({
                            position: "fixed",
                            top: "",
                            bottom: ""
                        })) : c && (I = J = !1, K = b + M.window - M.menu - M.adminbar - 1, K > 0 ? y.css({
                            position: "absolute",
                            top: K,
                            bottom: ""
                        }) : f())
                    }
                    H = b
                }
            }

            function e() {
                M = {
                    window: w.height(),
                    wpwrap: z.height(),
                    adminbar: G.height(),
                    menu: y.height()
                }
            }

            function f() {
                !s && L && (I = J = L = !1, y.css({
                    position: "",
                    top: "",
                    bottom: ""
                }))
            }

            function g() {
                e(), A.data("wp-responsive") ? (x.removeClass("sticky-menu"), f()) : M.menu + M.adminbar > M.window ? (d(), x.removeClass("sticky-menu")) : (x.addClass("sticky-menu"), f())
            }
            var h, i, j, k, l, m, n, o, p = !1,
                q = a("input.current-page"),
                r = q.val(),
                s = /iPhone|iPad|iPod/.test(navigator.userAgent),
                t = -1 !== navigator.userAgent.indexOf("Android"),
                u = a(document.documentElement).hasClass("ie8"),
                v = a(document),
                w = a(b),
                x = a(document.body),
                y = a("#adminmenuwrap"),
                z = a("#wpwrap"),
                A = a("#adminmenu"),
                B = a("#wp-responsive-overlay"),
                C = a("#wp-toolbar"),
                D = C.find('a[aria-haspopup="true"]'),
                E = a(".meta-box-sortables"),
                F = !1,
                G = a("#wpadminbar"),
                H = 0,
                I = !1,
                J = !1,
                K = 0,
                L = !1,
                M = {
                    window: w.height(),
                    wpwrap: z.height(),
                    adminbar: G.height(),
                    menu: y.height()
                };
            A.on("click.wp-submenu-head", ".wp-submenu-head", function(b) {
                    a(b.target).parent().siblings("a").get(0).click()
                }), a("#collapse-menu").on("click.collapse-menu", function() {
                    var c, d, e = a(document.body);
                    a("#adminmenu div.wp-submenu").css("margin-top", ""), c = b.innerWidth ? Math.max(b.innerWidth, document.documentElement.clientWidth) : 961, c && 960 > c ? e.hasClass("auto-fold") ? (e.removeClass("auto-fold").removeClass("folded"), setUserSetting("unfold", 1), setUserSetting("mfold", "o"), d = "open") : (e.addClass("auto-fold"), setUserSetting("unfold", 0), d = "folded") : e.hasClass("folded") ? (e.removeClass("folded"), setUserSetting("mfold", "o"), d = "open") : (e.addClass("folded"), setUserSetting("mfold", "f"), d = "folded"), a(document).trigger("wp-collapse-menu", {
                        state: d
                    })
                }), ("ontouchstart" in b || /IEMobile\/[1-9]/.test(navigator.userAgent)) && (m = s ? "touchstart" : "click", a(document.body).on(m + ".wp-mobile-hover", function(b) {
                    A.data("wp-responsive") || a(b.target).closest("#adminmenu").length || A.find("li.opensub").removeClass("opensub")
                }), A.find("a.wp-has-submenu").on(m + ".wp-mobile-hover", function(b) {
                    var d = a(this).parent();
                    A.data("wp-responsive") || d.hasClass("opensub") || d.hasClass("wp-menu-open") && !(d.width() < 40) || (b.preventDefault(), c(d), A.find("li.opensub").removeClass("opensub"), d.addClass("opensub"))
                })), s || t || (A.find("li.wp-has-submenu").hoverIntent({
                    over: function() {
                        var b = a(this),
                            d = b.find(".wp-submenu"),
                            e = parseInt(d.css("top"), 10);
                        isNaN(e) || e > -5 || A.data("wp-responsive") || (c(b), A.find("li.opensub").removeClass("opensub"), b.addClass("opensub"))
                    },
                    out: function() {
                        A.data("wp-responsive") || a(this).removeClass("opensub").find(".wp-submenu").css("margin-top", "")
                    },
                    timeout: 200,
                    sensitivity: 7,
                    interval: 90
                }), A.on("focus.adminmenu", ".wp-submenu a", function(b) {
                    A.data("wp-responsive") || a(b.target).closest("li.menu-top").addClass("opensub")
                }).on("blur.adminmenu", ".wp-submenu a", function(b) {
                    A.data("wp-responsive") || a(b.target).closest("li.menu-top").removeClass("opensub")
                }).find("li.wp-has-submenu.wp-not-current-submenu").on("focusin.adminmenu", function() {
                    c(a(this))
                })), a("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2"), a("div.updated, div.error").not(".below-h2, .inline").insertAfter(a("div.wrap h2:first")), screenMeta.init(), a("tbody").children().children(".check-column").find(":checkbox").click(function(b) {
                    if ("undefined" == b.shiftKey) return !0;
                    if (b.shiftKey) {
                        if (!p) return !0;
                        h = a(p).closest("form").find(":checkbox"), i = h.index(p), j = h.index(this), k = a(this).prop("checked"), i > 0 && j > 0 && i != j && (l = j > i ? h.slice(i, j) : h.slice(j, i), l.prop("checked", function() {
                            return a(this).closest("tr").is(":visible") ? k : !1
                        }))
                    }
                    p = this;
                    var c = a(this).closest("tbody").find(":checkbox").filter(":visible").not(":checked");
                    return a(this).closest("table").children("thead, tfoot").find(":checkbox").prop("checked", function() {
                        return 0 === c.length
                    }), !0
                }), a("thead, tfoot").find(".check-column :checkbox").on("click.wp-toggle-checkboxes", function(b) {
                    var c = a(this),
                        d = c.closest("table"),
                        e = c.prop("checked"),
                        f = b.shiftKey || c.data("wp-toggle");
                    d.children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function() {
                        return a(this).is(":hidden") ? !1 : f ? !a(this).prop("checked") : e ? !0 : !1
                    }), d.children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function() {
                        return f ? !1 : e ? !0 : !1
                    })
                }), a("td.post-title, td.title, td.comment, .bookmarks td.column-name, td.blogname, td.username, .dashboard-comment-wrap").focusin(function() {
                    clearTimeout(n), o = a(this).find(".row-actions"), o.addClass("visible")
                }).focusout(function() {
                    n = setTimeout(function() {
                        o.removeClass("visible")
                    }, 30)
                }), a("#default-password-nag-no").click(function() {
                    return setUserSetting("default_password_nag", "hide"), a("div.default-password-nag").hide(), !1
                }), a("#newcontent").bind("keydown.wpevent_InsertTab", function(b) {
                    var c, d, e, f, g, h = b.target;
                    if (27 == b.keyCode) return void a(h).data("tab-out", !0);
                    if (!(9 != b.keyCode || b.ctrlKey || b.altKey || b.shiftKey)) {
                        if (a(h).data("tab-out")) return void a(h).data("tab-out", !1);
                        c = h.selectionStart, d = h.selectionEnd, e = h.value;
                        try {
                            this.lastKey = 9
                        } catch (i) {}
                        document.selection ? (h.focus(), g = document.selection.createRange(), g.text = "	") : c >= 0 && (f = this.scrollTop, h.value = e.substring(0, c).concat("	", e.substring(d)), h.selectionStart = h.selectionEnd = c + 1, this.scrollTop = f), b.stopPropagation && b.stopPropagation(), b.preventDefault && b.preventDefault()
                    }
                }), a("#newcontent").bind("blur.wpevent_InsertTab", function() {
                    this.lastKey && 9 == this.lastKey && this.focus()
                }), q.length && q.closest("form").submit(function() {
                    -1 == a('select[name="action"]').val() && -1 == a('select[name="action2"]').val() && q.val() == r && q.val("1")
                }), a('.search-box input[type="search"], .search-box input[type="submit"]').mousedown(function() {
                    a('select[name^="action"]').val("-1")
                }), a("#contextual-help-link, #show-settings-link").on("focus.scroll-into-view", function(a) {
                    a.target.scrollIntoView && a.target.scrollIntoView(!1)
                }),
                function() {
                    function b() {
                        c.prop("disabled", "" === d.map(function() {
                            return a(this).val()
                        }).get().join(""))
                    }
                    var c, d, e = a("form.wp-upload-form");
                    e.length && (c = e.find('input[type="submit"]'), d = e.find('input[type="file"]'), b(), d.on("change", b))
                }(), s || (w.on("scroll.pin-menu", d), v.on("tinymce-editor-init.pin-menu", function(a, b) {
                    b.on("wp-autoresize", e)
                })), b.wpResponsive = {
                    init: function() {
                        var c = this;
                        v.on("wp-responsive-activate.wp-responsive", function() {
                            c.activate()
                        }).on("wp-responsive-deactivate.wp-responsive", function() {
                            c.deactivate()
                        }), a("#wp-admin-bar-menu-toggle a").attr("aria-expanded", "false"), a("#wp-admin-bar-menu-toggle").on("click.wp-responsive", function(b) {
                            b.preventDefault(), z.toggleClass("wp-responsive-open"), z.hasClass("wp-responsive-open") ? (a(this).find("a").attr("aria-expanded", "true"), a("#adminmenu a:first").focus()) : a(this).find("a").attr("aria-expanded", "false")
                        }), A.on("click.wp-responsive", "li.wp-has-submenu > a", function(b) {
                            A.data("wp-responsive") && (a(this).parent("li").toggleClass("selected"), b.preventDefault())
                        }), c.trigger(), v.on("wp-window-resized.wp-responsive", a.proxy(this.trigger, this)), w.on("load.wp-responsive", function() {
                            var a = navigator.userAgent.indexOf("AppleWebKit/") > -1 ? w.width() : b.innerWidth;
                            782 >= a && c.disableSortables()
                        })
                    },
                    activate: function() {
                        g(), x.hasClass("auto-fold") || x.addClass("auto-fold"), A.data("wp-responsive", 1), this.disableSortables()
                    },
                    deactivate: function() {
                        g(), A.removeData("wp-responsive"), this.enableSortables()
                    },
                    trigger: function() {
                        var a;
                        b.innerWidth && (a = Math.max(b.innerWidth, document.documentElement.clientWidth), 782 >= a ? F || (v.trigger("wp-responsive-activate"), F = !0) : F && (v.trigger("wp-responsive-deactivate"), F = !1), 480 >= a ? this.enableOverlay() : this.disableOverlay())
                    },
                    enableOverlay: function() {
                        0 === B.length && (B = a('<div id="wp-responsive-overlay"></div>').insertAfter("#wpcontent").hide().on("click.wp-responsive", function() {
                            C.find(".menupop.hover").removeClass("hover"), a(this).hide()
                        })), D.on("click.wp-responsive", function() {
                            B.show()
                        })
                    },
                    disableOverlay: function() {
                        D.off("click.wp-responsive"), B.hide()
                    },
                    disableSortables: function() {
                        if (E.length) try {
                            E.sortable("disable")
                        } catch (a) {}
                    },
                    enableSortables: function() {
                        if (E.length) try {
                            E.sortable("enable")
                        } catch (a) {}
                    }
                }, b.wpResponsive.init(), g(), v.on("wp-window-resized.pin-menu postboxes-columnchange.pin-menu postbox-toggled.pin-menu wp-collapse-menu.pin-menu wp-scroll-start.pin-menu", g)
        }),
        function() {
            function c() {
                a(document).trigger("wp-window-resized")
            }

            function d() {
                b.clearTimeout(e), e = b.setTimeout(c, 200)
            }
            var e;
            a(b).on("resize.wp-fire-once", d)
        }(),
        function() {
            if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var a = document.createElement("style");
                a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(a)
            }
        }()
}(jQuery, window);
"undefined" != typeof jQuery ? ("undefined" == typeof jQuery.fn.hoverIntent && ! function(a) {
    a.fn.hoverIntent = function(b, c, d) {
        var e = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        e = "object" == typeof b ? a.extend(e, b) : a.isFunction(c) ? a.extend(e, {
            over: b,
            out: c,
            selector: d
        }) : a.extend(e, {
            over: b,
            out: b,
            selector: c
        });
        var f, g, h, i, j = function(a) {
                f = a.pageX, g = a.pageY
            },
            k = function(b, c) {
                return c.hoverIntent_t = clearTimeout(c.hoverIntent_t), Math.abs(h - f) + Math.abs(i - g) < e.sensitivity ? (a(c).off("mousemove.hoverIntent", j), c.hoverIntent_s = 1, e.over.apply(c, [b])) : (h = f, i = g, c.hoverIntent_t = setTimeout(function() {
                    k(b, c)
                }, e.interval), void 0)
            },
            l = function(a, b) {
                return b.hoverIntent_t = clearTimeout(b.hoverIntent_t), b.hoverIntent_s = 0, e.out.apply(b, [a])
            },
            m = function(b) {
                var c = jQuery.extend({}, b),
                    d = this;
                d.hoverIntent_t && (d.hoverIntent_t = clearTimeout(d.hoverIntent_t)), "mouseenter" == b.type ? (h = c.pageX, i = c.pageY, a(d).on("mousemove.hoverIntent", j), 1 != d.hoverIntent_s && (d.hoverIntent_t = setTimeout(function() {
                    k(c, d)
                }, e.interval))) : (a(d).off("mousemove.hoverIntent", j), 1 == d.hoverIntent_s && (d.hoverIntent_t = setTimeout(function() {
                    l(c, d)
                }, e.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": m,
            "mouseleave.hoverIntent": m
        }, e.selector)
    }
}(jQuery), jQuery(document).ready(function(a) {
    var b, c, d, e = a("#wpadminbar"),
        f = !1;
    b = function(b, c) {
        var d = a(c),
            e = d.attr("tabindex");
        e && d.attr("tabindex", "0").attr("tabindex", e)
    }, c = function(b) {
        e.find("li.menupop").on("click.wp-mobile-hover", function(c) {
            var d = a(this);
            d.parent().is("#wp-admin-bar-root-default") && !d.hasClass("hover") ? (c.preventDefault(), e.find("li.menupop.hover").removeClass("hover"), d.addClass("hover")) : d.hasClass("hover") || (c.stopPropagation(), c.preventDefault(), d.addClass("hover")), b && (a("li.menupop").off("click.wp-mobile-hover"), f = !1)
        })
    }, d = function() {
        var b = /Mobile\/.+Safari/.test(navigator.userAgent) ? "touchstart" : "click";
        a(document.body).on(b + ".wp-mobile-hover", function(b) {
            a(b.target).closest("#wpadminbar").length || e.find("li.menupop.hover").removeClass("hover")
        })
    }, e.removeClass("nojq").removeClass("nojs"), "ontouchstart" in window ? (e.on("touchstart", function() {
        c(!0), f = !0
    }), d()) : /IEMobile\/[1-9]/.test(navigator.userAgent) && (c(), d()), e.find("li.menupop").hoverIntent({
        over: function() {
            f || a(this).addClass("hover")
        },
        out: function() {
            f || a(this).removeClass("hover")
        },
        timeout: 180,
        sensitivity: 7,
        interval: 100
    }), window.location.hash && window.scrollBy(0, -32), a("#wp-admin-bar-get-shortlink").click(function(b) {
        b.preventDefault(), a(this).addClass("selected").children(".shortlink-input").blur(function() {
            a(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")
        }).focus().select()
    }), a("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar", function(c) {
        if (13 == c.which) {
            var d = a(c.target),
                e = d.closest("ab-sub-wrapper");
            c.stopPropagation(), c.preventDefault(), e.length || (e = a("#wpadminbar .quicklinks")), e.find(".menupop").removeClass("hover"), d.parent().toggleClass("hover"), d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)
        }
    }).each(b), a("#wpadminbar .ab-item").bind("keydown.adminbar", function(c) {
        if (27 == c.which) {
            var d = a(c.target);
            c.stopPropagation(), c.preventDefault(), d.closest(".hover").removeClass("hover").children(".ab-item").focus(), d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)
        }
    }), a("#wpadminbar").click(function(b) {
        ("wpadminbar" == b.target.id || "wp-admin-bar-top-secondary" == b.target.id) && (b.preventDefault(), a("html, body").animate({
            scrollTop: 0
        }, "fast"))
    }), a(".screen-reader-shortcut").keydown(function(b) {
        var c, d;
        13 == b.which && (c = a(this).attr("href"), d = navigator.userAgent.toLowerCase(), -1 != d.indexOf("applewebkit") && c && "#" == c.charAt(0) && setTimeout(function() {
            a(c).focus()
        }, 100))
    }), "sessionStorage" in window && a("#wp-admin-bar-logout a").click(function() {
        try {
            for (var a in sessionStorage) - 1 != a.indexOf("wp-autosave-") && sessionStorage.removeItem(a)
        } catch (b) {}
    }), navigator.userAgent && -1 === document.body.className.indexOf("no-font-face") && /Android (1.0|1.1|1.5|1.6|2.0|2.1)|Nokia|Opera Mini|w(eb)?OSBrowser|webOS|UCWEB|Windows Phone OS 7|XBLWP7|ZuneWP7|MSIE 7/.test(navigator.userAgent) && (document.body.className += " no-font-face")
})) : ! function(a, b) {
   
}(document, window);





	var arraydata = [];
			function getmenus() {

			
				var cont = 0;
				$("#menu-to-edit li").each(function(index) {
					var dept = 0;
					for (var i = 0; i < $("#menu-to-edit li").length; i++) {

						var n = $(this).attr("class").indexOf("menu-item-depth-" + i);
						if (n != -1) {
							dept = i;
						}
					};

					var textoiner = $(this).find(".item-edit").context.outerText;

					var textoexplotado = textoiner.split("|");
					var padre = 0;
					if (textoexplotado.length == 7) {
						padre = textoexplotado[5]
					}

					var id = this.id.split("-");

					arraydata.push({
						depth : dept,
						id : id[2],
						parent : padre,
						sort : cont
					})
					cont++;
				});
				console.log(JSON.stringify(arraydata))
				actualizarmenu();
			}

			function actualizarmenu() {
				$.ajax({
					dataType : "json",
					data : {
						arraydata : arraydata
					},
					
					url : "{{route('generatemenucontrol')}}",
					type : 'POST',
					success : function(response) {

						console.log(response);

					}
				});
			}

			function verificarpadres(arraydata) {

				var arrayotro = [];

				for (var j = 0; j < arraydata.length; j++) {
					var arrayremporal = [];
					arrayremporal["padre"] = arraydata[j];

					var hijos = [];

					for (var i = 0; i < 10; i++) {

						if (!!arraydata[j + i]) {
							if ((arraydata[j].profundidad < arraydata[j + i].profundidad)) {

								hijos.push(arraydata[j + i]);
							}
							arrayotro.push(arrayremporal);
						}
					};
					arrayremporal["hijo"] = hijos;

				};
				arraygeneral.push(arrayotro);

				console.log(arraygeneral);

			}

