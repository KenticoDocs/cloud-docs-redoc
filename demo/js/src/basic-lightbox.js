! function (e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).basicLightbox = e()
  }
}(function () {
  return function i(u, c, a) {
    function s(n, e) {
      if (!c[n]) {
        if (!u[n]) {
          var t = "function" == typeof require && require;
          if (!e && t) return t(n, !0);
          if (l) return l(n, !0);
          var o = new Error("Cannot find module '" + n + "'");
          throw o.code = "MODULE_NOT_FOUND", o
        }
        var r = c[n] = {
          exports: {}
        };
        u[n][0].call(r.exports, function (e) {
          return s(u[n][1][e] || e)
        }, r, r.exports, i, u, c, a)
      }
      return c[n].exports
    }
    for (var l = "function" == typeof require && require, e = 0; e < a.length; e++) s(a[e]);
    return s
  }({
    1: [function (e, n, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var c = function (e) {
          var n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            t = document.createElement("div");
          return t.innerHTML = e.trim(), !0 === n ? t.children : t.firstChild
        },
        a = function (e, n) {
          var t = e.children;
          return 1 === t.length && t[0].tagName === n
        },
        u = t.visible = function (e) {
          return null != (e = e || document.querySelector(".basicLightbox")) && !0 === e.ownerDocument.body.contains(e)
        };
      t.create = function (e, o) {
        var r = function (e, n) {
            var t = c('\n\t\t<div class="basicLightbox ' + n.className + '">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t'),
              o = t.querySelector(".basicLightbox__placeholder");
            e.forEach(function (e) {
              return o.appendChild(e)
            });
            var r = a(o, "IMG"),
              i = a(o, "VIDEO"),
              u = a(o, "IFRAME");
            return !0 === r && t.classList.add("basicLightbox--img"), !0 === i && t.classList.add("basicLightbox--video"), !0 === u && t.classList.add("basicLightbox--iframe"), t
          }(e = function (e) {
            var n = "string" == typeof e,
              t = e instanceof HTMLElement == 1;
            if (!1 === n && !1 === t) throw new Error("Content must be a DOM element/node or string");
            return !0 === n ? Array.from(c(e, !0)) : "TEMPLATE" === e.tagName ? [e.content.cloneNode(!0)] : Array.from(e.children)
          }(e), o = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (null == (e = Object.assign({}, e)).closable && (e.closable = !0), null == e.className && (e.className = ""), null == e.onShow && (e.onShow = function () {}), null == e.onClose && (e.onClose = function () {}), "boolean" != typeof e.closable) throw new Error("Property `closable` must be a boolean");
            if ("string" != typeof e.className) throw new Error("Property `className` must be a string");
            if ("function" != typeof e.onShow) throw new Error("Property `onShow` must be a function");
            if ("function" != typeof e.onClose) throw new Error("Property `onClose` must be a function");
            return e
          }(o)),
          n = function (e) {
            return !1 !== o.onClose(i) && (t = function () {
              if ("function" == typeof e) return e(i)
            }, (n = r).classList.remove("basicLightbox--visible"), setTimeout(function () {
              return !1 === u(n) || n.parentElement.removeChild(n), t()
            }, 410), !0);
            var n, t
          };
        !0 === o.closable && r.addEventListener("click", function (e) {
          /*e.target === r && */
          n()
        });
        var i = {
          element: function () {
            return r
          },
          visible: function () {
            return u(r)
          },
          show: function (e) {
            return !1 !== o.onShow(i) && (n = r, t = function () {
              if ("function" == typeof e) return e(i)
            }, document.body.appendChild(n), setTimeout(function () {
              requestAnimationFrame(function () {
                return n.classList.add("basicLightbox--visible"), t()
              })
            }, 10), !0);
            var n, t
          },
          close: n
        };
        return i
      }
    }, {}]
  }, {}, [1])(1)
});
