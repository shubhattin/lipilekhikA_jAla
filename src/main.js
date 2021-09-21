class लिपिलेखिकासहायक {
    constructor() {
        this.akSharAH = {
            "Normal": {}
        };
        this.loaded_scripts = ["Normal"];
        this.antar_load = false;
        this.sanchit = "src/dattAMsh";
        this.font_loca = this.substring(this.sanchit, 0, -8) + "fonts";
        this.image_loca = this.substring(this.sanchit, 0, -12) + "img/lang";
        this.pratyakSharAH = {};
        let sarve = new Set();
        for (let lang in this.akSharAH) {
            let x = this.akSharAH[lang];
            for (let ak in x) {
                if (ak == "く")
                    continue;
                sarve.add(ak);
            }
        }
        this.alph = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"];
        this.pUrNasarve = this.alph[0] + this.alph[1] + "01234567890'$.#?";
        this.re_arrange_num = (b) => b.replace(/[0-9]/g, '') + b.replace(/\D/g, '');
        let mobile_check = function () {
            let nav = (x) => navigator.userAgent.match(x),
                g = false;
            if (nav(/Android/i) || nav(/webOS/i) || nav(/iPhone/i) || nav(/iPad/i) || nav(/iPod/i) || nav(/BlackBerry/i) || nav(/Windows Phone/i))
                g = true;
            return g;
        };
        this.is_mobile = mobile_check();
    }
    load_inter_converter(callback = null) {
        if (this.antar_load)
            return;
        $.ajax({
            url: this.sanchit + `/antar.json`,
            dataType: "json",
            success: (result) => {
                this.pratyakSharAH = result;
                if (callback != null)
                    callback();
            }
        });
        this.antar_load = true;
    }
    load_lang(lang, callback = null, call = null) {
        lang = lang == "Devanagari" ? "Sanskrit" : lang;
        if (!this.includes(this.loaded_scripts, lang)) {
            return $.ajax({
                url: this.sanchit + `/${lang}.json`,
                dataType: "json",
                success: (result) => {
                    this.akSharAH[lang] = result;
                    this.loaded_scripts.push(lang);
                    LipiLekhikA.clear_all_val(true);
                    LipiLekhikA.add_font(lang);
                    if (callback != null)
                        callback();
                    if (call != null)
                        call();
                }
            });
        } else {
            if (callback != null)
                callback();
            if (call != null)
                call();
        }
    }
    includes(val, what) {
        return val.indexOf(what) != -1;
    }
    is_lower(b) {
        return this.includes(this.alph[1], b);
    }
    is_null(k) {
        return k == null || k == undefined;
    }
    is_upper(b) {
        return this.includes(this.alph[0], b);
    }

    to_lower(b) {
        return this.alph[1][this.alph[0].indexOf(b)];
    }

    to_upper(b) {
        return this.alph[0][this.alph[1].indexOf(b)];
    }
    time() {
        let a = new Date();
        return a.getTime() / 1000;
    }
    clear(e) {
        if (this.is_mobile)
            return;
        let key = e.key;
        if (this.includes(["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowRight"], key))
            LipiLekhikA.clear_all_val(true);
    }
    replace_all(str, replaceWhat, replaceTo) {
        replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        var re = new RegExp(replaceWhat, "g");
        return str.replace(re, replaceTo);
    }
    text_to_html(v) {
        return this.replace_all("<div>" + v + "</div>", "\n", "</div><div>");
    }
    last(s, l = -1) {
        if (s == null || s == undefined)
            return "";
        let r = s[s.length + l];
        return r;
    }
    dict_rev(d) {
        let res = {};
        for (let x in d) {
            res[d[x]] = x;
        }
        return res;
    }
    substring(val, from, to = null) {
        if (to == null)
            to = val.length;
        if (to > 0)
            return val.substring(from, to)
        else if (to < 0)
            return val.substring(from, val.length + to)
    };

    get_Text_from_div(t) {
        t = this.replace_all(t, "&nbsp;", " ");
        t = this.replace_all(t, "&amp;", "");
        t = this.replace_all(t, "<br>", "\n");
        t = this.replace_all(t, "<br/>", "\n");
        t = this.replace_all(t, "<br />", "\n");
        t = this.replace_all(t, "</p>", "觀");
        let res = "",
            st = false;
        for (let x of t) {
            if (x == "<")
                st = true;
            if (st) {
                if (x == ">")
                    st = false;
                continue;
            }
            res += x;
        }
        res = this.replace_all(res, "觀\n", "\n");
        res = this.replace_all(res, "觀", "\n");
        return res;
    }
}
let लिपि = new लिपिलेखिकासहायक();
class लिपिलेखिकापरिवर्तक {
    constructor() {
        this.k = लिपि;
        this.karya = false;
        this.time = लिपि.time();
        this.back_space = 0;
        this.sahayika_usage = true;
        this.halant_add_status = false;
        //[key record, output, whats on screen]
        this.varna = ["", "", ""];
        this.next_chars = "";
        this.d = false;
        this.mAtrA_sthiti = false;
        this.madhye = false;
        this.capital = [0, "", -1, -1, 0, 0, false];
        this.store_last_of_3 = "";
        this.added_fonts = [];
        this.last_of_3_status_for_mAtrA = false;
        this.special_ved_s = false;
        this.usage_table_link = (lang) => {
            let y = lang;
            y = y == "Kashmiri" ? "Urdu" : y;
            y = लिपि.includes(["Devanagari", "Marathi", "Konkani", "Sanskrit", "Nepali"], y) ? "Hindi" : y;
            return `${लिपि.image_loca}/${y}.png`;
        };
        this.pUrva_lekhit = [
            ["", -1],
            ["", -1],
            ["", -1],
            ["", -1],
            ["", -1]
        ];
        this.second_cap_time = 0;
        this.sahayika = new लिपिलेखिकालेखनसहायिका();
        this.set_interface_lang = (lang = "English") => this.sahayika.load_lang(lang);
        this.hide = () => this.sahayika.elm.hide();
        this.from_click = false;
        this.font_scripts = ["Sharada", "Modi", "Brahmi", "Siddham", "Granth"];
    };
    set_lang_and_state(lang, call = console.log, ks = null) {
        let exec = () => {
            this.script = lang;
            if (ks != null)
                this.karya = ks;
            this.akSharANi = लिपि.akSharAH[this.script];
            this.sa_lang = this.akSharANi["く"];
        };
        लिपि.load_lang(lang, exec, call);
    };
    mukhya(elmt, e) {
        if (!this.karya)
            return;
        if (elmt.attr("lipi-lekhika") != "on")
            return;
        e = e.data;
        if (e == null || e == undefined) {
            this.clear_all_val(true);
            return;
        }
        e = e.substring(e.length - 1);
        let elf = this.elphased_time() < 15.0;
        if (लिपि.includes(लिपि.pUrNasarve, e)) {
            if (!elf)
                this.clear_all_val(true);
            this.prakriyA(e, 1, elmt.attr("lipi-lang") == undefined ? this.script : elmt.attr("lipi-lang"), this.sa_lang, elmt);
        } else
            this.clear_all_val(true);
    };
    elphased_time() {
        let t = this.time,
            c = लिपि.time();
        let t1 = c - t;
        this.time = c;
        return t1;
    };
    prakriyA(code, mode, lang, ajay, elm = null, html = false) {
        this.akSharANi = लिपि.akSharAH[lang];
        this.halant = !लिपि.includes(["Normal", "Romanized", "Urdu", "Kashmiri"], lang) ? this.akSharANi["."][".x"][0] : "";
        let sa = (ajay == 0 && mode == 1) ? 0 : 1;
        this.dev_text = [];
        if (code == undefined || code == null)
            return;
        html = mode == 0 && html ? true : false;
        if (html) {
            let t = code;
            t = लिपि.replace_all(t, "&nbsp;", " ");
            t = लिपि.replace_all(t, "&amp;", "");
            t = लिपि.replace_all(t, "<br>", "\n");
            t = लिपि.replace_all(t, "<br/>", "\n");
            t = लिपि.replace_all(t, "<br />", "\n");
            code = t;
        }
        let html_st = false,
            ignore_st = false;
        for (let k = 0; k < code.length; k++) {
            let key = code[k];
            if (key == "<" && html) {
                html_st = true;
                this.dev_text.push(key);
                this.clear_all_val(true);
                continue;
            }
            if (html_st) {
                if (key == ">")
                    html_st = false;
                this.dev_text.push(key);
                continue;
            }
            if (key == "#" && code[k + 1] == "^" && mode == 0 && !ignore_st) {
                ignore_st = true;
                this.clear_all_val(true);
                k++;
                continue;
            }
            if (ignore_st) {
                if (key == "^" && code[k + 1] == "#") {
                    ignore_st = false;
                    k++;
                    continue;
                }
                this.dev_text.push(key);
                continue;
            }
            this.dev_text = this.dev_text.join("");
            this.dev_text = this.dev_text.split("");
            if (key == "て") {
                k++;
                key = code[k];
                this.dev_text.push(key);
                this.clear_all_val(true);
                continue;
            }
            if (this.next_chars == "" && key in this.akSharANi) {
                this.varna[2] = "";
                this.vitaraNa(key, mode, sa, elm, lang);
            } else if (this.next_chars == "" && लिपि.is_upper(key) && लिपि.to_lower(key) in this.akSharANi) {
                this.varna[2] = "";
                this.vitaraNa(लिपि.to_lower(key), mode, sa, elm, lang);
            } else if (this.next_chars != "") {
                if (लिपि.includes(this.next_chars, key)) {
                    if (this.d) {
                        this.halant_add_status = true;
                        this.d = false;
                    }
                    this.varna[2] = this.varna[1];
                    key = this.varna[0] + key;
                    this.vitaraNa(key, mode, sa, elm, lang);
                } else if (key == ";" || key == "q") {
                    this.clear_all_val(true);
                    if (mode == 1)
                        this.back_space++;
                    else if (mode == 0 && lang == "Romanized")
                        this.dev_text.push(";");
                } else if (key in this.akSharANi) {
                    this.clear_all_val();
                    this.varna[2] = "";
                    if (this.store_last_of_3 != "" && this.pUrva_lekhit[4][1] != 0 && lang == "Tamil-Extended" && key == "#")
                        this.clear_all_val(true)
                    this.vitaraNa(key, mode, sa, elm, lang);
                } else if (लिपि.is_upper(key) && लिपि.to_lower(key) in this.akSharANi) {
                    this.clear_all_val();
                    this.vitaraNa(लिपि.to_lower(key), mode, sa, elm, lang);
                } else {
                    this.dev_text.push(key);
                    this.clear_all_val(true);
                }
            } else {
                this.dev_text.push(key);
                this.clear_all_val(true);
            }
        }
        this.dev_text = this.dev_text.join("");
        if (mode == 0)
            return this.dev_text;
    };
    vitaraNa(key, mode, sa, elm, lang) {
        let cap_0_from_1 = [false, ["", -1]];
        let data = this.akSharANi[key[0]];
        let current = data[key];
        let prev_temp = this.pUrva_lekhit[3][1];
        let temp = this.pUrva_lekhit[4][1];
        let varna_sthiti = लिपि.last(current);
        if (this.capital[0] == 2 && mode == 1) {
            if (key == this.capital[1]) {
                if (लिपि.time() - this.capital[4] <= 4.0) {
                    key = लिपि.to_upper(key);
                    data = this.akSharANi[key];
                    current = data[key];
                    temp = this.capital[3];
                    varna_sthiti = लिपि.last(current);
                    this.back_space += 2 * this.capital[5];
                    if (varna_sthiti == 0 && लिपि.includes([1, 3], this.pUrva_lekhit[2][1]))
                        cap_0_from_1 = [true, this.pUrva_lekhit[2]];
                    if (लिपि.includes(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], lang)) {
                        this.back_space++;
                        if (temp == 1) {
                            this.back_space++;
                        }
                        if (this.sa_lang == 1) {
                            this.back_space -= 2;
                            if (temp != 1)
                                this.back_space++;
                        }
                    }
                    if (this.capital[6]) {
                        this.back_space--;
                        if (this.sa_lang == 1) {
                            if (this.capital[3] == 1)
                                this.back_space--;
                            if (this.capital[2] == 1)
                                this.back_space += 2;
                        }
                        if (this.capital[3] != 1 && this.capital[2] == 1)
                            this.back_space--;
                    }
                    if (this.sa_lang == 0)
                        if (this.capital[2] == 1) {
                            this.back_space++;
                            if (this.capital[3] == 1 && !this.capital[6])
                                this.back_space++;
                        }
                    if (sa == 1 && this.capital[3] == 3)
                        this.back_space--;
                    this.capital = [3, "", -1, -1, 0, 0, false];
                } else
                    this.capital = [
                        2,
                        key,
                        varna_sthiti,
                        this.pUrva_lekhit[3][1],
                        this.second_cap_time,
                        this.capital[5],
                        false,
                    ];
            } else
                this.capital = [0, "", -1, -1, 0, 0, false];
        }
        if (this.mAtrA_sthiti && लिपि.includes([1, 2], varna_sthiti)) {
            this.clear_all_val(true);
            this.vitaraNa(लिपि.last(key), mode, sa, elm, lang);
            return;
        }
        this.varna[0] = key;
        this.varna[1] = current[0];
        if (temp == 1 || temp == 3) {
            if (varna_sthiti == 1 && !लिपि.includes(this.next_chars, लिपि.last(key)) && sa == 0) {
                this.halant_add_status = true;
                if (temp == 3) {
                    this.back_space++;
                    this.varna[1] = this.store_last_of_3 + this.varna[1];
                }
            } else if (varna_sthiti == 0)
                this.mAtrA_sthiti = true;
        }
        if (this.capital[0] == 1 && mode == 1) {
            if (key == this.capital[1]) {
                this.capital[0] = 2;
                this.second_cap_time = लिपि.time();
            } else if (लिपि.last(key) == this.capital[1] && this.akSharANi[लिपि.to_upper(this.capital[1])][लिपि.to_upper(this.capital[1])][0] != this.varna[1]) {
                this.capital[6] = true;
                this.capital[0] = 2;
                this.capital[2] = varna_sthiti;
                this.capital[5] = this.varna[1].length;
                this.second_cap_time = लिपि.time();
            } else
                this.capital = [0, "", -1, -1, 0, 0];
        }
        if ((key == "LR" || key == "r3") && varna_sthiti == 0) {
            if (prev_temp != 1)
                this.mAtrA_sthiti = false;
            else if (sa == 0)
                this.back_space++;
            if (लिपि.includes(["Modi", "Sharada"], lang)) {
                this.back_space++;
            }
        }
        if (this.mAtrA_sthiti) {
            this.varna[1] = current[1];
            if (temp == 1 && sa == 1)
                this.back_space += this.halant.length;
            if (temp == 3) {
                this.back_space++;
                if (sa == 1)
                    this.back_space++;
                this.varna[1] += this.store_last_of_3;
                this.last_of_3_status_for_mAtrA = true;
            } else if (temp == 0 && this.last_of_3_status_for_mAtrA) {
                this.varna[1] += this.store_last_of_3;
                this.last_of_3_status_for_mAtrA = true;
            }
        }
        if (lang == "Tamil-Extended" && key == "M" && (
                (
                    (
                        prev_temp == 3 ||
                        (prev_temp == 0 && this.pUrva_lekhit[2][1] == 3)
                    ) &&
                    temp == 0
                ) ||
                (
                    this.capital[0] == 3 &&
                    (
                        (
                            this.pUrva_lekhit[1][1] == 3 ||
                            (
                                this.pUrva_lekhit[1][1] == 0 &&
                                this.pUrva_lekhit[0][1] == 3
                            )
                        ) &&
                        this.pUrva_lekhit[2][1] == 0
                    )
                )
            )) {
            this.varna[1] += this.store_last_of_3;
            this.back_space++;
        }
        if (lang == "Tamil-Extended" && लिपि.includes(["#an", "#s"], key)) {
            if (key == "#an" && (
                    (
                        this.pUrva_lekhit[1][1] == 3 ||
                        (this.pUrva_lekhit[1][1] == 0 && this.pUrva_lekhit[0][1] == 3)
                    ) &&
                    this.pUrva_lekhit[2][1] == 0
                )) {
                this.varna[1] += this.store_last_of_3;
                this.back_space++;
            } else if (key == "#s" &&
                (
                    (
                        this.pUrva_lekhit[2][1] == 3 || (this.pUrva_lekhit[2][1] == 0 || this.pUrva_lekhit[1][1] == 3)
                    ) && this.pUrva_lekhit[3][1] == 0
                )) {
                this.varna[1] += this.store_last_of_3;
                this.back_space++;
                this.special_ved_s = true;
            }
        }
        if (lang == "Tamil" && key == "R" && temp == 1 && varna_sthiti == 2) this.back_space++;
        if (lang == "Tamil-Extended" && लिपि.includes(["#ss", "#sss"], key) && this.special_ved_s)
            this.varna[1] += this.store_last_of_3;
        if (temp == 1 && varna_sthiti == 2 && key.length == 1 && Object.keys(data).length > 1 && sa == 0) {
            for (let v of लिपि.last(current, -2)) {
                if (key + v in data) {
                    if (लिपि.last(data[key + v]) == 1)
                        this.d = true;
                    break;
                }
            }
        }
        if (
            (लिपि.includes(lang, "Tamil") || lang == "Punjabi") &&
            लिपि.includes(["R", "LR", "LRR", "RR"], key) &&
            varna_sthiti == 1
        )
            varna_sthiti = 2;
        if (sa == 1) {
            if (varna_sthiti == 1)
                this.varna[1] += this.halant;
            else if (varna_sthiti == 3)
                this.varna[1] = लिपि.substring(this.varna[1], 0, -1) + this.halant + लिपि.last(this.varna[1]);
        }
        let val = this.likha(this.varna[1], this.varna[2], this.back_space, this.halant_add_status);
        if (mode == 0) {
            for (let p = 0; p < val[1]; p++)
                this.dev_text.pop();
            this.dev_text.push(val[0]);
        } else if (mode == 1) {
            let is_input = false;
            if (लिपि.includes(["input", "textarea"], elm[0].tagName.toLowerCase()))
                is_input = true;
            if (is_input) {
                let dyn = elm.val();
                let current_cursor_pos = elm[0].selectionStart + 1;
                let ex = 0;
                if (this.from_click) {
                    this.from_click = false;
                    current_cursor_pos++;
                    ex = 1;
                };
                let a = 0;
                if (this.madhye) {
                    this.madhye = false;
                    a = 1;
                }
                let pre_part = dyn.substring(0, current_cursor_pos - val[1] - 2 - a);
                let changing_part = val[0];
                let post_part = "";
                if (dyn.length + 1 == current_cursor_pos)
                    post_part = dyn.substring(current_cursor_pos + 1);
                else if (dyn.length + 1 != current_cursor_pos) {
                    post_part = dyn.substring(current_cursor_pos - 1 - ex);
                    if (varna_sthiti == 1 && this.sa_lang == 1) {
                        this.madhye = true;
                        changing_part += this.zero_joiner;
                    }
                }
                let length = pre_part.length + changing_part.length;
                elm.val(pre_part + changing_part + post_part)
                elm.focus();
                elm[0].selectionStart = length;
                elm[0].selectionEnd = length;
            } else {
                let dyn = elm.html();
                let caret = new VanillaCaret(elm[0]);
                let current_cursor_pos = caret.getPos() + 1;
                if (this.from_click)
                    current_cursor_pos = this.sahayika.abhisthAnam;
                let st = false;
                let rs = [],
                    x1 = 0;
                dyn = लिपि.replace_all(dyn, "&nbsp;", "<费费费费>");
                dyn = लिपि.replace_all(dyn, "&amp;", "<费费费>");
                let record = true,
                    recorder = 0,
                    t_rec = 0,
                    prv = "";
                for (let x = 0; x < dyn.length; x++) {
                    let v = dyn[x];
                    if (v == "<")
                        st = true;
                    else if (st && v == ">") {
                        if (prv == "费") {
                            x1++;
                            if (record) recorder++;
                            t_rec++;
                        }
                        st = false;
                        rs.push(v);
                        continue;
                    }
                    if (x1 >= current_cursor_pos - 2 - val[1] && x1 < current_cursor_pos - 2 && !st) {
                        x1++;
                        if (record) recorder++;
                        t_rec++;
                        continue;
                    }
                    if (x1 == current_cursor_pos - 2 && !st) {
                        rs.push("梵");
                        if (this.from_click)
                            rs.push(v);
                        record = false;
                    } else
                        rs.push(v);
                    if (!st) {
                        x1++;
                        if (record) recorder++;
                        t_rec++;
                    }
                    prv = v;
                };
                // console.log(rs)
                rs = rs.join("");
                rs = लिपि.replace_all(rs, "<费费费费>", "&nbsp;");
                rs = लिपि.replace_all(rs, "<费费费>", "&amp;");
                rs = rs.split("梵");
                let pre_part = rs[0];
                let a = 0;
                if (this.madhye) {
                    this.madhye = false;
                    pre_part = लिपि.substring(pre_part, 0, -1);
                    a = 1;
                }
                let changing_part = val[0];
                let post_part = "";
                if (rs[1] == undefined || rs[1] == null)
                    rs[1] = "";
                post_part = rs[1];
                if (varna_sthiti == 1 && this.sa_lang == 1 && t_rec + 1 != current_cursor_pos) {
                    this.madhye = true;
                    changing_part += this.zero_joiner;
                }
                // console.log([pre_part, changing_part, post_part], val)
                let r = pre_part + changing_part + post_part;
                elm.html(r);
                if (this.from_click)
                    this.from_click = false;
                caret.setPos(recorder + changing_part.length - val[1] - a);
            }
        }
        if (this.capital[0] == 3)
            this.capital = [0, "", -1, -1, 0, 0, false];
        if (key.length == 1 && लिपि.is_lower(key) && लिपि.to_upper(key) in this.akSharANi && this.capital[0] == 0 && mode == 1) {
            let a = [0, "", -1, -1, 0, 0, false];
            let b = [1, key, varna_sthiti, temp, लिपि.time(), this.varna[1].length, false];
            if ((key + key) in data) {
                if (this.akSharANi[लिपि.to_upper(key)][लिपि.to_upper(key)][0] != data[key + key][0])
                    this.capital = b;
                else
                    this.capital = a;
            } else
                this.capital = b;
        }
        this.next_chars = current[current.length - 2];
        if (this.sahayika_usage && mode == 1) {
            let a = {
                "key": [key, this.next_chars],
                "status": [temp, varna_sthiti],
                "elm": elm,
                "mAtrA": this.mAtrA_sthiti,
                "special_cap": cap_0_from_1,
                "lang": lang,
                "sa": sa
            };
            if (this.capital[0] == 1)
                a["cap"] = true;
            this.sahayika.show(a);
        }
        if (varna_sthiti == 3)
            this.store_last_of_3 = लिपि.last(this.varna[1]);
        if (this.next_chars == "")
            this.clear_all_val();
        this.pUrva_lekhit[0] = this.pUrva_lekhit[1];
        this.pUrva_lekhit[1] = this.pUrva_lekhit[2];
        this.pUrva_lekhit[2] = this.pUrva_lekhit[3];
        this.pUrva_lekhit[3] = this.pUrva_lekhit[4];
        this.pUrva_lekhit[4] = [key, varna_sthiti];
    };
    likha(b, a, bk, hal) {
        // a = what is currently on screen
        // b = it is that to which a has to be replaced
        let back = 0;
        let lekha = "";
        if (a == "" || b == "") {
            lekha = b;
            back = a.length;
        } else if (b[0] != a[0]) {
            lekha = b;
            back = a.length;
        } else {
            let x = 0;
            for (let n in a) {
                let v = a[n];
                if (b.length == x)
                    break;
                if (b[x] != a[x])
                    break;
                x++;
            }
            lekha = b.substring(x);
            back = a.length - x;
        }
        back += bk;
        if (hal)
            lekha = this.halant + lekha;
        this.back_space = 0;
        this.halant_add_status = false;
        return [lekha, back];
    };
    clear_all_val(spl) {
        this.next_chars = "";
        this.varna = ["", "", ""];
        this.mAtrA_sthiti = false;
        this.last_of_3_status_for_mAtrA = false;
        this.special_ved_s = false;
        this.back_space = 0;
        if (spl) {
            this.pUrva_lekhit = [
                ["", -1],
                ["", -1],
                ["", -1],
                ["", -1],
                ["", -1]
            ];
            this.store_last_of_3 = "";
            this.capital = [0, "", -1, -1, 0, 0, false];
            this.madhye = false;
            this.sahayika.pUrvavarNa = [("", "", -1), ""]
            this.hide();
        }
    };
    antarparivartan(val, from, to, html = false) {
        if (from == "Devanagari")
            from = "Sanskrit";
        if (to == "Devanagari")
            to = "Sanskrit";
        if (from == "Kashmiri")
            from = "Urdu";
        if (to == "Kashmiri")
            to = "Urdu";
        val = this.anulekhana(val, from, html);
        let c = (x) => लिपि.includes(["Romanized", "Normal", "Tamil", "Telugu", "Malayalam", "Kannada"], x);
        if (c(to) && !(c(from) || from == "Tamil-Extended")) {
            val = लिपि.replace_all(val, "o", "O");
            val = लिपि.replace_all(val, "e", "E");
        }
        val = this.prakriyA(val, 0, to, 0, null, html);
        return val;
    };
    anulekhana(val, lang, html) {
        let res = [];
        let lang_data = लिपि.pratyakSharAH[lang];
        val = val.split("");
        let pUrva_lekhit = ["", "", ""];
        let ak = लिपि.akSharAH[lang];
        let pUrva = ["", "", ""];
        let html_st = false,
            ignore_st = false,
            sp = 0,
            sp1 = 0;
        for (let x = 0; x < val.length; x++) {
            let s = val[x];
            if (s == "<" && html) {
                html_st = true;
                res.push(s);
                continue;
            }
            if (html_st) {
                if (s == ">")
                    html_st = false;
                res.push(s);
                continue;
            }
            if (s == "#" && val[x + 1] == "^" && !ignore_st) {
                ignore_st = true;
                x++;
                res.push("#^");
                continue;
            }
            if (ignore_st) {
                if (s == "^" && val[x + 1] == "#") {
                    ignore_st = false;
                    x++;
                    res.push("^#");
                    continue;
                }
                res.push(s);
                continue;
            }
            if (लिपि.includes(["\ud805", "\ud804"], s) && लिपि.includes(["Modi", "Sharada", "Brahmi", "Siddham", "Granth"], lang)) {
                x++;
                s += val[x];
            }
            if ((pUrva_lekhit[1] + s) in lang_data && लिपि.last(lang_data[pUrva_lekhit[1] + s]) == "百" && pUrva_lekhit[1] != "")
                res[res.length - 2] = lang_data[pUrva_lekhit[1] + s];
            else if ((pUrva_lekhit[0] + s) in lang_data && लिपि.last(lang_data[pUrva_lekhit[0] + s]) == "百" && pUrva_lekhit[0] != "")
                res[res.length - 3] = lang_data[pUrva_lekhit[0] + s];
            else if ((pUrva_lekhit[1] + pUrva_lekhit[2] + s) in lang_data && (pUrva_lekhit[2] != "" && pUrva_lekhit[1] != "")) {
                res[res.length - 1] = lang_data[pUrva_lekhit[1] + pUrva_lekhit[2] + s];
                if (sp != 2)
                    res[res.length - 2] = "";
            } else if ((pUrva_lekhit[2] + s) in lang_data && pUrva_lekhit[2] != "") {
                res[res.length - 1] = lang_data[pUrva_lekhit[2] + s];
                sp++;
            } else if (s in lang_data && s != " ")
                res.push(lang_data[s]);
            else {
                if ((लिपि.includes(["Romanized", "Normal"], lang) && लिपि.includes(लिपि.pUrNasarve.split(""), s)) || लिपि.includes("\n; .'#$1234567890".split(""), s))
                    res.push(s);
                else
                    res.push("て" + s);
            }
            if (!लिपि.is_null(ak[pUrva[1].substring(0, 1)]) && pUrva[2] == "基" && (लिपि.last(pUrva[1]) == "百" || लिपि.last(pUrva[1]) == "此")) {
                let v1 = ak[pUrva[1].substring(0, 1)];
                if (!लिपि.is_null(v1[लिपि.substring(pUrva[1], 0, -1) + लिपि.substring(लिपि.last(res), 0, -1)])) {
                    let v2 = v1[लिपि.substring(pUrva[1], 0, -1) + लिपि.substring(लिपि.last(res), 0, -1)][0];
                    if (v2 != (pUrva_lekhit[1] + s)) {
                        res[res.length - 1] = ";" + res[res.length - 1];
                    }
                }
            } else if (!लिपि.is_null(ak[pUrva[2].substring(0, 1)])) {
                let v1 = ak[pUrva[2].substring(0, 1)];
                if (!लिपि.is_null(v1[pUrva[2] + लिपि.last(res)])) {
                    let v2 = v1[pUrva[2] + लिपि.last(res)][0];
                    if (v2 != (pUrva_lekhit[2] + s)) {
                        res[res.length - 1] = ";" + res[res.length - 1];
                    }
                }
            }
            if (sp != 0) {
                sp++;
                if (sp == 3)
                    sp = 0;
            }
            pUrva_lekhit[0] = pUrva_lekhit[1];
            pUrva_lekhit[1] = pUrva_lekhit[2];
            pUrva_lekhit[2] = s;
            pUrva[0] = pUrva[1];
            pUrva[1] = pUrva[2];
            pUrva[2] = लिपि.last(res);
        }
        res = res.join("");
        if (!लिपि.includes(["Normal", "Romanized", "Urdu", "Kashmiri"], lang)) {
            for (let x of ["A", "i", "I", "u", "U", "e", "E", "o", "O", "ai", "au", "R", "RR", "LR", "LRR"]) {
                res = लिपि.replace_all(res, "此." + x, x);
                res = लिपि.replace_all(res, "百." + x, x);
            }
            pUrva = ["", "", "", ""];
            for (let u of ["a", "i", "u"]) {
                res = लिपि.replace_all(res, "此" + u, "a;" + u);
                res = लिपि.replace_all(res, "百" + u, "a;" + u);
            }
            res = लिपि.replace_all(res, "此基", "");
            res = लिपि.replace_all(res, "百基", "");
            res = लिपि.replace_all(res, "此", "a");
            res = लिपि.replace_all(res, "百", "a");
            res = लिपि.replace_all(res, "基", ".x");
        }
        return res;
    };
    add_font(lang) {
        let script = this.font_scripts;
        if (!लिपि.includes(script, lang) || लिपि.includes(this.added_fonts, lang))
            return;
        let name = `LipiFont${lang}`;
        var font = new FontFace(name, `url(${लिपि.font_loca}/${lang}.ttf)`);
        let fnt = this.sahayika.elm.css("font-family");
        this.sahayika.elm.css("font-family", `${fnt},"${name}"`);
        font.load().then(function (loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function (error) {
            // error occurred
        });
        this.added_fonts.push(lang);
    };
};
jQuery.fn.lipi_lekhika_add = (attri = false) => {
    if (!attri) {
        this.on("input", () => {
            LipiLekhikA.mukhya($(this), event);
        });
        this.on("keydown", () => {
            लिपि.clear(event);
        });
    } else {
        this.attr("oninput", "LipiLekhikA.mukhya($(this), event);");
        this.attr("onkeydown", "लिपि.clear(event);");
    }
};
jQuery.lipi_lekhika = (time = null) => {
    let elm = $(".Lipi-LekhikA");
    let lek = ["lipi-lekhika", "lekhan-sahayika"];
    for (let x of elm) {
        let e = $(x);
        if (!लिपि.includes(["span", "div", "textarea", "input"], x.tagName.toLowerCase()))
            continue;
        for (let v of lek) {
            if (e.attr(v) == undefined)
                e.attr(v, "on");
        }
        elm.attr({
            autocapitalize: "none",
            autocomplete: "off",
            autocorrect: "off"
        });
        x.oninput = () => {
            LipiLekhikA.mukhya($(x), event);
        };
        x.onkeydown = () => {
            लिपि.clear(event);
        };
    };
    if (time != null)
        setTimeout(() => $.lipi_lekhika(time), time * 1000);
};
class लिपिलेखिकालेखनसहायिका {
    constructor() {
        this.c = 0;
        this.d = 0;
        this.idAnIma = 0;
        this.reset_capital_status = false;
        this.pUrvavarNa = [
            ["", "", -1], ""
        ];
        this.elm = jQuery('<div></div>').appendTo('body');
        this.elm.css({
            "position": "absolute",
            "background-color": "white",
            "padding": "2.5px",
            "border": "2px solid black",
            'border-radius': "4.5px",
            "font-weight": "bold",
            "display": "none",
            "z-index": "1000000",
            "user-select": "none",
            "cursor": "default",
            "background-color": "white",
            "min-width": "58px",
            "box-shadow": "0 4px 8.25px 0 #00000033, 0 6px 20px 0 #00000030",
            "font-family": '"Nirmala UI","Calibri"'
        });
        let row1 = "",
            row2 = "";
        row1 += `<td><span></span><span></span></td>`;
        row2 += `<td><a href="https://www.lipilekhika.com" target="_blank"><span></span></a></td>`;
        row1 += `<td></td>`;
        row2 += `<td></td>`;
        for (let x = 0; x <= 60; x++) {
            row1 += `<td class="लिপিಜಃ"></td>`;
            row2 += `<td class="लिপিಜಂ"></td>`;
        };
        let table = `<table><tbody><tr>${row2}</tr><tr>${row1}</tr></tbody></table><div style="font-size: 10.5px;color: purple;"></div>`;
        this.elm.html(table);
        this.bhaNDAra_index = ["sahayika", "pashchAta", "akShara", "key1", "key2"];
        this.bhaNDAra = {
            "sahayika": this.elm.children()[1],
            "key1": 0,
            "key2": 0,
            "pashchAta": 0,
            "akShara": 0,
            "tbody": [0, 0]
        };
        let tbody = $(this.elm.children()[0]).children()[0];
        tbody = $(tbody).children();
        this.adhar = 0;
        this.bhaNDAra.tbody = [tbody[0], tbody[1]];
        let tr1 = $(tbody[0]).children();
        let tr2 = $(tbody[1]).children();
        this.bhaNDAra.pashchAta = tr1;
        this.bhaNDAra.akShara = tr2;
        this.bhaNDAra.key1 = tr1[1];
        this.bhaNDAra.key2 = tr2[1];
        let img = $(tr2[0]).children(); //1st down 2nd up
        $(img[1]).css({
            "cursor": "pointer",
            "display": "none",
            "position": "absolute",
            "top": "32.6px",
            "left": "1px"
        });
        $(img[0]).css({
            "cursor": "pointer",
            "display": "none",
            "position": "absolute",
            "top": "32.6px",
            "left": "1px",
        });
        this.ins_button = [$(img[1]), $(img[0]), 0, 0];
        this.ins_sthiti = 1;
        this.ins_button[this.ins_sthiti].show();
        this.ins_button[0].click(() => this.change_ins(0));
        this.ins_button[1].click(() => this.change_ins(1));
        if (this.ins_sthiti == 1)
            this.bhaNDAra.sahayika.style.display = "none";
        $(tbody[1]).css({
            "color": "green",
            "font-size": "18px",
            "text-align": "center",
            "cursor": "grab"
        });
        $(tbody[0]).css({
            "color": "black",
            "font-size": "18px",
            "text-align": "center",
            "cursor": "grab"
        });
        $(this.bhaNDAra.key1).css({
            "color": "brown",
            "font-size": "19.5px",
            "text-align": "center",
            "padding-left": "22.5px",
            "padding-right": "5.6px",
            "cursor": "default"
        });
        $(this.bhaNDAra.key2).css({
            "color": "red",
            "font-size": "15px",
            "text-align": "center",
            "padding-left": "22.5px",
            "padding-right": "5.6px",
            "margin-bottom": "2.5px",
            "cursor": "default"
        });
        this.display = {};
        for (let x = 0; x < 60; x++) {
            tr1[x + 2].style.display = "none";
            tr2[x + 2].style.display = "none";
        };
        this.objs = {
            "down": $(img[0]),
            "up": $(img[1]),
            "icon": $($(tr1[0]).children()[0])
        };
        $(this.objs.icon.children()[0]).css({
            "display": "inline-block",
            "height": "20px",
            "width": "20px",
            "position": "absolute",
            "left": "4px",
            "top": "10px",
            "background-image": `url(${लिपि.sanchit}/icon.png)`,
            "background-size": "20px 20px"
        });
        let r = ['<svg style="enable-background:new 0 0 26 26;" height="26px" width="26px" class="निच्चैरुच्चैः" viewBox="0 0 512 512"><polygon points="396.6,',
            '160 416,180.7 256,352 96,180.7 115.3,160 256,310.5', '352 416,331.3 256,160 96,331.3 115.3,352 256,201.5', '"/></svg>'
        ];
        img[1].innerHTML = `${r[0]+r[2]+r[3]}`;
        img[0].innerHTML = `${r[0]+r[1]+r[3]}`;
        let y = $(".निच्चैरुच्चैः");
        this.ins_button[2] = y[0];
        this.ins_button[3] = y[1];
        this.lang_loaded = 0;
        this.ins_msg = "";
        this.load_lang = (lng) => {
            if (this.lang_loaded == 0)
                $.ajax({
                    url: `${लिपि.sanchit}/sahayika.json`,
                    dataType: "json",
                    success: (result) => {
                        this.display = result;
                        this.set_lang(lng, false);
                        this.lang_loaded++;
                    }
                });
            else {
                this.set_lang(lng, this.lang_loaded >= 2 ? true : false);
                this.lang_loaded++;
            }
        };
        this.load_lang("English", false);
        this.abhisthAnam = 0;
        $("body").click((event) => {
            let obj = LipiLekhikA;
            let o = this;
            let bh = o.bhaNDAra;
            if (o.elm.css("display") == "none")
                return;
            event = event.target;
            let p = $(event).parents();
            let sah = p.index(o.elm[0]) != -1;
            p = $(event).parent()[0];
            if (लिपि.includes(bh.tbody, p) && !लिपि.includes([bh.key1, bh.key2], event)) {
                sah = true;
                let el = o.adhar;
                for (let x of event.value) {
                    // if (लिपि.includes(["input", "textarea"], el[0].tagName.toLowerCase())) {
                    obj.from_click = true;
                    obj.prakriyA(x, 1, obj.script, obj.sa_lang, el);
                    // }
                };
            }
            if (!sah)
                obj.clear_all_val(true);
        });
        $("body").dblclick(() => {
            let obj = LipiLekhikA;
            let o = this;
            if (o.elm[0].style.display == "none")
                return;
            obj.clear_all_val(true);
        });
        let n = ":hover{color:blue;}",
            l = ".लिপি",
            p = "{padding:0.5px;}";
        this.elm.append(`<style>${l}ಜಃ${n}${l}ಜಂ${n}${l}ಜಃ${p}${l}ಜಂ${p}</style>`)
    };
    hide_other() {
        let elm = LipiLekhikA.sahayika;
        if (elm.c == 1)
            elm.elm.hide();
        elm.c--;
    };
    change_ins(i) {
        let elm = LipiLekhikA.sahayika;
        elm.ins_button[i].hide();
        let t = Math.abs(i - 1);
        elm.ins_sthiti = t;
        elm.ins_button[Math.abs(i - 1)].show();
        let el = elm.bhaNDAra.sahayika;
        elm.set_labels(1, t == 0 ? elm.ins_msg : "");
        el.style.display = t == 1 ? "none" : "block";
    };
    show(v) {
        if (v["elm"].attr("lekhan-sahayika") != "on")
            return;
        this.reset_capital_status = false;

        function reset_capital(k) {
            let elm = LipiLekhikA.sahayika;
            elm.d--;
            if (!elm.reset_capital_status)
                return;
            if (elm.d == 0) {
                for (let x = k[0]; x < k[1]; x++) {
                    elm.set_labels(2, "", x);
                    elm.set_labels(3, "", x);
                    elm.hide_elm(1, x);
                    elm.hide_elm(2, x);
                    elm.idAnIma--;
                };
            }
            LipiLekhikA.capital = [0, "", -1, -1, 0, 0, false];
        };
        let next = v["key"][1],
            key = v["key"][0];
        let matra = v["mAtrA"],
            extra_cap = v["special_cap"],
            lang = v["lang"],
            sa = v["sa"];
        if (extra_cap[0])
            this.pUrvavarNa = [
                [
                    लिपि.akSharAH[lang][extra_cap[1][0]][extra_cap[1][0]][0],
                    "",
                    extra_cap[1][1],
                ],
                extra_cap[1][0]
            ];
        this.adhar = v.elm;
        let cordinate = v.elm.caret("offset");
        let top = cordinate.top,
            hieght = cordinate.height,
            left = cordinate.left;
        if (लिपि.includes(["input", "textarea"], v.elm[0].tagName.toLowerCase())) {
            this.abhisthAnam = v.elm.selectionStart + 1;
        } else {
            let caret = new VanillaCaret(v.elm[0]);
            this.abhisthAnam = caret.getPos() + 2;
        }
        this.elm[0].style.top = `${top+hieght}px`;
        this.elm[0].style.left = `${left+8}px`;
        let halant = ["", false];
        if (!लिपि.includes(["Urdu", "Romanized", "Normal", "Kashmiri"], lang))
            halant = [लिपि.akSharAH[lang]["."][".x"][0], sa == 1];
        let a = new Map(),
            b = लिपि.akSharAH[lang][key[0]],
            count = 0;
        for (let x of next) {
            if ((key + x) in b) {
                a.set(x, b[key + x]);
                for (let y of लिपि.last(b[key + x], -2))
                    if ((key + x + y) in b) {
                        a.set(x + y, b[key + x + y]);
                        count++;
                    }
                count++;
            }
        }
        let c = 0,
            cap_count = [0, 0];
        if ("cap" in v) {
            cap_count[0] = count;
            let tmp = लिपि.to_upper(key);
            let b1 = लिपि.akSharAH[lang][tmp];
            a.set(key + key, b1[tmp]);
            let next = लिपि.last(a.get(key + key), -2);
            for (let x of next)
                if ((tmp + x) in b1) {
                    a.set(key + key + x, b1[tmp + x]);
                    for (let y of लिपि.last(b1[tmp + x], -2))
                        if ((tmp + x + y) in b1) {
                            a.set(key + key + x + y, b1[tmp + x + y]);
                            count++;
                        }
                    count++;
                }
            cap_count[1] = count + 1;
        }
        if ((लिपि.includes([1, 3], लिपि.last(this.pUrvavarNa[0])) || matra) && लिपि.last(b[key]) == 0) {
            let k12 = this.pUrvavarNa[0][0] + b[key][1];
            if (लिपि.last(this.pUrvavarNa[0]) == 3 && key != "a")
                k12 = लिपि.substring(k12, 0, -2) + लिपि.last(k12) + लिपि.last(k12, -2);
            else if (लिपि.last(this.pUrvavarNa[0]) == 3 && key == "a")
                k12 = लिपि.last(k12, 0, -1) + लिपि.last(k12);
            this.set_labels(4, this.pUrvavarNa[1] + key);
            this.set_labels(5, k12);
        } else {
            this.set_labels(4, key);
            let l12 = b[key][0] + (लिपि.includes([1, 3], लिपि.last(b[key])) ? halant[0] : "");
            if (लिपि.last(b[key]) == 3)
                l12 = लिपि.substring(l12, 0, -2) + लिपि.last(l12) + लिपि.last(l12, -2);
            this.set_labels(5, l12);
        }
        let extra = 0;
        for (let x of a.keys()) {
            if (matra && लिपि.includes([1, 2], लिपि.last(a.get(x)))) {
                extra++;
                continue;
            }
            this.set_labels(2, x, c);
            let k = a.get(x)[0];
            if (लिपि.last(a.get(x)) == 0 && लिपि.includes([1, 3], लिपि.last(this.pUrvavarNa[0])))
                k = a.get(x)[1];
            if (लिपि.includes([1, 3], लिपि.last(a.get(x))) && halant[1]) {
                k += halant[0];
                if (लिपि.last(a.get(x)) == 3)
                    k = लिपि.substring(k, 0, -2) + लिपि.last(k) + लिपि.last(k, -2);
            }
            if ((लिपि.includes([1, 3], लिपि.last(this.pUrvavarNa[0])) || matra) && लिपि.last(a.get(x)) == 0) {
                k = this.pUrvavarNa[0][0] + k;
                if (लिपि.last(this.pUrvavarNa[0]) == 3)
                    k = लिपि.substring(k, 0, -2) + लिपि.last(k) + लिपि.last(k, -2);
            }
            this.set_labels(3, k, c);
            c++;
        }
        let len = 0;
        for (let x of a.keys())
            len++;
        len -= extra;
        if (len >= this.idAnIma) {
            for (let x = this.idAnIma; x < len; x++) {
                this.show_elm(1, x);
                this.show_elm(2, x);
            };
        } else {
            for (let x = len; x < this.idAnIma; x++) {
                this.hide_elm(1, x);
                this.hide_elm(2, x);
            };
        }
        this.idAnIma = len;
        this.c++;
        if (!matra)
            this.pUrvavarNa = [b[key], key];
        this.elm.show();
        if ("cap" in v) {
            this.d++;
            this.reset_capital_status = true;
            setTimeout(function () {
                reset_capital(cap_count);
            }, 4000);
        }
        let klj = this.hide_other;
        setTimeout(function () {
            klj();
        }, 15000);
    };
    hide_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.display = "none";
    };
    show_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.removeProperty('display');
    };
    set_labels(type, txt, index = -1) {
        if (index != -1 && (type == 3 || type == 2)) {
            index += 2;
            type--;
            this.bhaNDAra[this.bhaNDAra_index[type]][index].innerHTML = txt;
            if (type == 2)
                this.bhaNDAra.pashchAta[index].title = txt;
            else if (type == 1) {
                this.bhaNDAra.akShara[index].title = txt;
                this.bhaNDAra.akShara[index].value = txt;
                this.bhaNDAra.pashchAta[index].value = txt;
            }
        } else
            this.bhaNDAra[this.bhaNDAra_index[type - 1]].innerHTML = txt;
    };
    set_lang(l, g = true) {
        let data = this.display[l];
        this.ins_msg = लिपि.text_to_html(data["ins"]);
        this.elm.attr("title", data["title"]);
        for (let x in this.objs)
            this.objs[x].attr("title", data[x]);
        if (g && this.ins_sthiti == 0)
            this.set_labels(1, this.ins_msg);
    };
};
let LipiLekhikA = new लिपिलेखिकापरिवर्तक();