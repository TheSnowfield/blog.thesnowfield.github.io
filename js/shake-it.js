function shakeit() {
    async function showLyricBanner() {

        // create style sheet
        var bannerstyle = document.createElement("link");
        bannerstyle.setAttribute("type", "text/css");
        bannerstyle.setAttribute("rel", "stylesheet");
        bannerstyle.setAttribute("href", f);
        bannerstyle.setAttribute("img", f);
        bannerstyle.setAttribute("h4", f);
        bannerstyle.setAttribute("div", f);
        document.body.appendChild(bannerstyle)

        // create banner
        banner = document.createElement('div');
        banner.setAttribute('id', 'lrc');
        document.body.appendChild(banner);

        // let's go
        lyrictxt = await (await fetch(z)).text();
        Lrc = function (obj) {
            var
                lrc_arr = [],
                interval,
                lastTime = 0,
                Lrc = {
                    num: 0,
                    load: function (id) {
                        var txt_arr = lyrictxt.split('\n');
                        clearTimeout(interval);
                        obj.innerHTML = '';
                        Lrc.num = 0;
                        lrc_arr = [];
                        for (var i in txt_arr) {
                            var _time = txt_arr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g),
                                _txt = txt_arr[i].replace(/\[[0-9:.]{5,8}\]/g, '');
                            for (var _i in _time) {
                                var _t_text = String(_time[_i]);
                                lrc_arr.push([Number(_t_text.match(/\[([0-9]{2})/)[1]) * 60 + Number(_t_text.match(/\:([0-9]{2})/)[1]) + (Number(_t_text.match(/([0-9]{2})\]/)[1]) * 0.01666), _txt]);
                            }
                        }

                        lrc_arr.sort(function (a, b) { return a[0] < b[0] ? -1 : 1 });
                        interval = setTimeout(function () { Lrc.step() }, 50);
                    },
                    step: function () {
                        if (!FM || !FM.currentTime) {
                            clearTimeout(interval);
                            interval = setTimeout(Lrc.step, 50);
                        }
                        var Song_time = FM.currentTime;

                        if ((FM.currentTime - lastTime) < -1) {
                            Lrc.num = 0;
                        }

                        lastTime = FM.currentTime;

                        for (var _i = Lrc.num, _l = lrc_arr.length; _i < _l; _i++) {
                            if (lrc_arr[_i][0] < Song_time) {
                                obj.innerHTML = lrc_arr[_i][1];
                                Lrc.num++;
                            } else {
                                break;
                            }
                        }

                        clearTimeout(interval);
                        interval = setTimeout(Lrc.step, 50);
                    }
                };
            return Lrc
        }(lrc);


        if (!navigator.userAgent.match(/ip(hone|ad|od)/i))
            Lrc.load();
        //获取DIV为‘box’的盒子
        var divlrc = document.getElementById('lrc');
        //获取元素自身的宽度
        var L1 = divlrc.offsetWidth;
        //获取元素自身的高度
        var H1 = divlrc.offsetHeight;
        //获取实际页面的top值。（页面宽度减去元素自身高度/2）
        // var top = (document.documentElement.clientHeight - H1) / 2;
        // divlrc.style.top = top + 'px';



    }
    function h() {
        var e = document.getElementsByClassName(l);
        for (var t = 0; t < e.length; t++) {
            document.body.removeChild(e[t])

            var lrc = document.getElementById("lrc");
            if (lrc != null)
                lrc.parentNode.removeChild(lrc);
            location.reload(false);
        }
    }
    function p() {
        var e = document.createElement("div");
        e.setAttribute("class", a);
        document.body.appendChild(e);
        setTimeout(function () {
            document.body.removeChild(e)
        },
            100)
    }
    function d(e) {
        return {
            height: e.offsetHeight,
            width: e.offsetWidth
        }
    }
    function v(i) {
        var s = d(i);
        return s.height > e && s.height < n && s.width > t && s.width < r
    }
    function m(e) {
        var t = e;
        var n = 0;
        while (!!t) {
            n += t.offsetTop;
            t = t.offsetParent
        }
        return n
    }
    function getHeight() {
        var e = document.documentElement;
        if (!!window.innerWidth) {
            return window.innerHeight
        } else if (e && !isNaN(e.clientHeight)) {
            return e.clientHeight
        }
        return 0
    }
    function getYOffset() {
        if (window.pageYOffset) {
            return window.pageYOffset
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    }
    function E(e) {
        var t = m(e);
        return t >= w && t <= b + w
    }
    function createAudioObject() {
        var e = document.createElement("audio");
        e.setAttribute("class", l);
        e.setAttribute("id", "FM");
        e.src = i;
        e.loop = false;
        e.addEventListener("canplay",
            function () {
                setTimeout(function () {
                    x(k)
                },
                    500);
                setTimeout(function () {

                    N();
                    p();
                    for (var e = 0; e < O.length; e++) {
                        T(O[e])
                    }
                },
                    1000)
            },
            true);

        e.addEventListener("ended",
            function () {
                N();
                h()
            },
            true);
        e.innerHTML = " <p>如果你正在读这篇文章，那是因为你的浏览器不支持音频元素。我们建议你得到一个新的浏览器。</p> <p>";
        document.body.appendChild(e);
        e.play()
    }

    function x(e) {
        e.className += " " + s + " " + o
    }

    function T(e) {
        e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
    }

    function N() {
        var e = document.getElementsByClassName(s);
        var t = new RegExp("\\b" + s + "\\b");
        for (var n = 0; n < e.length;) {
            e[n].className = e[n].className.replace(t, "")
        }
    }

    // keep player singleton
    if(document.querySelector('#lrc'))
        return;

    var e = 30;
    var t = 30;
    var n = 350;
    var r = 350;
    var i = document.querySelector('#shake-it').getAttribute('audio');
    var z = document.querySelector('#shake-it').getAttribute('lyric');
    var f = "/css/shake-it.css";
    var s = "mw-harlem_shake_me";
    var o = "im_first";
    var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
    var a = "mw-strobe_light";
    var l = "mw_added_css";
    var b = getHeight();
    var w = getYOffset();
    var C = document.getElementsByTagName("*");
    var k = null;
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            if (E(A)) {
                k = A;
                break
            }
        }
    }
    if (A === null) {
        return
    }
    showLyricBanner();
    createAudioObject();
    var O = [];
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            O.push(A)
        }
    }
}
