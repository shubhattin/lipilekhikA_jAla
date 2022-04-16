class लिपिquery {
    constructor(sel) {
        this.sel = sel;
        this.elm = [];
        this.init();
    }
    init() {
        let sel = this.sel,
            elm = [];
        if (typeof (sel) == "object") {
            if ("innerHTML" in sel)
                elm = [sel];
            else
                elm = sel;
        } else
            elm = document.querySelectorAll(sel);
        this.length = elm.length;
        for (let x = 0; x < this.length; x++)
            this[x] = elm[x];
        this.elm = elm;
        return this;
    }
    html() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 0)
            return this[0].innerHTML;
        else if (arg.length == 1) {
            for (let x of this.elm)
                x.innerHTML = arg[0];
            return this;
        }
    }
    text() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 0)
            return this[0].innerText;
        else if (arg.length == 1) {
            for (let x of this.elm)
                x.innerText = arg[0];
            return this;
        }
    }
    val() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 0)
            return this[0].value;
        else if (arg.length == 1) {
            for (let x of this.elm)
                x.value = arg[0];
            return this;
        }
    }
    attr() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 1)
            if (typeof (arg[0]) == "object") {
                for (let x of this.elm)
                    for (let ar in arg[0])
                        x.setAttribute(ar, arg[0][ar])
                return this;
            } else
                return this[0].getAttribute(arg[0]);
        else if (arg.length == 2) {
            for (let x of this.elm)
                x.setAttribute(arg[0], arg[1])
            return this;
        }
    }
    removeAttr() {
        let arg = arguments;
        for (let x of this.elm)
            x.removeAttribute(arg[0]);
        return this;
    }
    trigger() {
        let arg = arguments;
        for (let x of this.elm)
            x.dispatchEvent(new Event(arg[0]));
        return this;
    }
    on() {
        let arg = arguments;
        for (let x of this.elm)
            x.addEventListener(arg[0], arg[1]);
        return this;
    }
    append() {
        let arg = arguments;
        for (let x of this.elm)
            x.insertAdjacentHTML("beforeend", arg[0]);
        return this;
    }
    appendHTML() {
        let arg = arguments;
        let el = $lf.make(arg[0]);
        for (let x of this.elm)
            x.insertAdjacentElement("beforeend", el);
        return $l(el);
    }
    afterHTML() {
        let arg = arguments;
        let el = $lf.make(arg[0]);
        for (let x of this.elm)
            x.insertAdjacentElement("afterend", el);
        return $l(el);
    }
    after() {
        let arg = arguments;
        for (let x of this.elm)
            x.insertAdjacentHTML("afterend", arg[0])
        return this;
    }
    before() {
        let arg = arguments;
        for (let x of this.elm)
            x.insertAdjacentHTML("beforebegin", arg[0])
        return this;
    }
    addClass() {
        let arg = arguments;
        for (let x of this.elm)
            x.classList.add(arg[0]);
        return this;
    }
    removeClass() {
        let arg = arguments;
        for (let x of this.elm)
            x.classList.remove(arg[0]);
        return this;
    }
    toggleClass() {
        let arg = arguments;
        for (let x of this.elm)
            x.classList.toggle(arg[0]);
        return this;
    }
    focus() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        this[0].focus();
        return this;
    }
    css() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 1)
            if (typeof (arg[0]) == "object") {
                for (let x of this.elm)
                    Object.assign(x.style, arg[0]);
                return this;
            } else
                return getComputedStyle(this[0])[arg[0]];
        else if (arg.length == 2) {
            for (let x of this.elm)
                x.style[arg[0]] = arg[1];
            return this;
        }
    }
    removeCss() {
        let arg = arguments;
        for (let x of this.elm)
            x.style.removeProperty(arg[0]);
        return this;
    }
    check() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        if (arg.length == 0)
            this[0].checked;
        else if (arg.length == 1) {
            for (let x of this.elm)
                x.checked = arg[0];
            return this;
        }
    }
    show() {
        let arg = arguments;
        let lst = {
            div: "block",
            span: "inline"
        }
        for (let x of this.elm) {
            let e = $l(x);
            e.removeCss("display");
            if (e.css("display") == "none") {
                let nm = x.tagName.toLowerCase();
                if (nm in lst) {
                    e.css("display", lst[nm]);
                } else {
                    let el = $l("body").appendHTML(`<${nm}></${nm}>`);
                    e.css("display", el.css("display"));
                    el.remove();
                }
            }
        }
        return this;
    }
    hide() {
        let arg = arguments;
        for (let x of this.elm)
            x.style.display = "none";
        return this;
    }
    children() {
        let arg = arguments;
        let ch = [];
        for (let x of this.elm) {
            for (let y of x.children)
                ch.push(y)
        }
        return ch;
    }
    remove() {
        let arg = arguments;
        for (let x of this.elm)
            x.remove();
    }
    find() {
        let arg = arguments;
        if (this.length == 0)
            return this;
        let o = $l($lf.make("<div></div>"));
        let elm = this[0].querySelectorAll(arg[0]);
        o.length = elm.length;
        for (let x = 0; x < o.length; x++)
            o[x] = elm[x];
        o.elm = elm;
        return o;
    }
    width() {
        if (this.length == 0)
            return this;
        return this[0].offsetWidth;
    }
    height() {
        if (this.length == 0)
            return this;
        return this[0].offsetHeight;
    }
    parent() {
        if (this.length == 0)
            return this;
        return this[0].parentElement;
    }
    parents() {
        if (this.length == 0)
            return $l([]);
        var a = this[0];
        var els = [];
        while (a) {
            els.push(a);
            a = a.parentNode;
        }
        return els;
    }
    offset(options) {
        if (this.length == 0)
            return {
                top: 0,
                left: 0
            };
        var rect, win,
            elem = this[0];
        if (!elem) {
            return;
        }
        if (!elem.getClientRects().length) {
            return {
                top: 0,
                left: 0
            };
        }
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    }
    scrollLeft() {
        if (this.length == 0)
            return 0;
        return this[0].scrollLeft;
    }
    scrollTop() {
        let arg = arguments;
        if (this.length == 0)
            return 0;
        return this[0].scrollTop;
    }
    prop() {
        let arg = arguments;
        return this.attr(arg);
    }
    position(parent = null) {
        if (this.length == 0)
            return {
                top: 0,
                left: 0
            };
        let child = this[0].getBoundingClientRect();
        var parent = this[0].parentElement.getBoundingClientRect();
        return {
            top: child.top - parent.top,
            left: child.left - parent.left
        };
    }
    resize() {
        if (this.length == 0)
            return this;
        for (let e of this.elm) {
            let e1 = $l(e)
            e.style.width = "";
            let i = e.innerHTML,
                o = e.outerHTML;
            o = $lf.replace_all(o, i, "");
            o = $lf.replace_all(o, "id=", "idk=");
            o = $l("body").appendHTML(o).show();
            o.html(`<option>${e1.find("option:checked").html()}</option>`);
            let f = o.width();
            o.remove();
            e.style.width = `${f + 7}px`;
        }
        return this;
    }
}
class लिपिutil {
    make(html) {
        var template = document.createElement('div');
        template.innerHTML = html.trim();
        return template.firstChild;
    }
    ajax(url, op = {}) {
        let xhr = op.xhr || new XMLHttpRequest();
        let _async = "async" in op ? op.async : true;
        xhr.open(op.type || "GET", url, _async);
        xhr.send(null);

        function hdr(k) {
            return xhr.getResponseHeader(k).split(";")[0];
        }
        if ("dataType" in op)
            xhr.responseType = op["dataType"];
        if ("headers" in op)
            for (let x in op.headers)
                xhr.setRequestHeader(x, op.headers[x]);
        let scs = function () {
            if (xhr.status == 200) {
                let v = xhr.response;
                if (hdr("content-type") == "application/json" && xhr.responseType != "json")
                    v = JSON.parse(xhr.response);
                if ("success" in op)
                    op.success(v, xhr);
                return v;
            } else {
                if ("error" in op)
                    op.error(xhr);
                return null;
            }
        }
        if (_async)
            return new Promise(rs => {
                xhr.onerror = () => rs("Network Error");
                xhr.onload = () => rs(scs());
            });
        else
            return scs();
    }
    get(url, op = {}) {
        op.type = "GET";
        return this.ajax(url, op);
    }
    post(url, op = {}) {
        op.type = "POST";
        return this.ajax(url, op);
    }
    getScript(url) {
        let e = document.createElement("script");
        e.src = url;
        $l("body")[0].appendChild(e)
        e.remove();
    }
    isPlainObject(o) {
        return typeof (o) == 'object' && o.constructor == Object;
    } in (val, in_what) {
        return val.indexOf(in_what) != -1;
    }
    replace_all(str, replaceWhat, replaceTo) {
        replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        var re = new RegExp(replaceWhat, "g");
        return str.replace(re, replaceTo);
    }
    last(s, l = -1) {
        if (s == null || s == undefined)
            return "";
        let r = s[s.length + l];
        return r;
    }
}
if ($l != undefined)
    $l = undefined;
var $l = function (sel) {
    let el = new लिपिquery(sel);
    el.init();
    return el;
}
if ($lf != undefined)
    $lf = undefined;
var $lf = new लिपिutil();