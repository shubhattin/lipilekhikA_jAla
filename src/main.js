class लिपिलेखिकासहायक {
    constructor() {
        this.akSharAH = {};
        this.loaded_scripts = [];
        this.antar_load = false;
        let mode = "local";
        this.sanchit = {
            "web": "https://cdn.jsdelivr.net/gh/jAlasthAnavitaraNamidam/jAlasthAnam/src/dattAMsh",
            "local": "src/dattAMsh"
        } [mode];
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
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };
        this.is_mobile = mobile_check();
    }
    load_inter_converter(callback = null) {
        if (this.antar_load)
            return;
        $.ajax({
            url: this.sanchit + `/antar.json`,
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
                success: (result) => {
                    this.akSharAH[lang] = result;
                    this.loaded_scripts.push(lang);
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
    get_value(id) {
        return document.getElementById(id).value;
    }
    get_element(id) {
        return document.getElementById(id);
    }
    set_html(id, val) {
        let fg = this.get_element(id);
        if (fg == null || fg == undefined)
            return;
        fg.innerHTML = val;
    }
    set_value(id, val) {
        this.get_element(id).value = val;
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
let LIPI = new लिपिलेखिकासहायक();
class लिपिलेखिकापरिवर्तक {
    constructor() {
        this.karya = false;
        this.time = LIPI.time();
        this.zero_joiner = "‌";
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
        this.usage_table_link = (lang, link = "https://cdn.jsdelivr.net/gh/jAlasthAnavitaraNamidam/jAlasthAnam/img/lang") => {
            let y = lang;
            y = y == "Kashmiri" ? "Urdu" : y;
            y = LIPI.includes(["Devanagari", "Marathi", "Konkani", "Sanskrit", "Nepali"], y) ? "Hindi" : y;
            return `${link}/${y}.png`;
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
        this.set_interface_lang = (lang = "English") => this.sahayika.load_lang(lang, LIPI.sanchit);
        this.hide = () => this.sahayika.elm.hide();
        $("body").click(() => {
            LipiLekhikA.clear_all_val(true);
        });
        $("body").dblclick(() => {
            LipiLekhikA.clear_all_val(true);
        });
    };
    set_lang_and_state(lang, call = console.log, ks = null) {
        let exec = () => {
            this.script = lang;
            if (ks != null)
                this.karya = ks;
            this.akSharANi = LIPI.akSharAH[this.script];
            this.sa_lang = this.akSharANi["く"];
        };
        LIPI.load_lang(lang, exec, call);
    };
    mukhya(elmt, e) {
        if (!this.karya)
            return;
        e = e.data;
        if (e == null || e == undefined) {
            this.clear_all_val(true);
            return;
        }
        e = e.substring(e.length - 1);
        let elf = this.elphased_time() < 15.0;
        if (LIPI.includes(LIPI.pUrNasarve, e)) {
            if (!elf)
                this.clear_all_val(true);
            this.prakriyA(e, 1, this.script, this.sa_lang, elmt);
        } else
            this.clear_all_val(true);
    };
    elphased_time() {
        let t = this.time,
            c = LIPI.time();
        let t1 = c - t;
        this.time = c;
        return t1;
    };
    prakriyA(code, mode, lang, ajay, elm = null, html = false) {
        this.akSharANi = LIPI.akSharAH[lang];
        this.halant = !LIPI.includes(["Normal", "Romanized", "Urdu", "Kashmiri"], lang) ? this.akSharANi["."][".x"][0] : "";
        let sa = (ajay == 0 && mode == 1) ? 0 : 1;
        this.dev_text = [];
        if (code == undefined || code == null)
            return;
        html = mode == 0 && html ? true : false;
        if (html) {
            let t = code;
            t = LIPI.replace_all(t, "&nbsp;", " ");
            t = LIPI.replace_all(t, "&amp;", "");
            t = LIPI.replace_all(t, "<br>", "\n");
            t = LIPI.replace_all(t, "<br/>", "\n");
            t = LIPI.replace_all(t, "<br />", "\n");
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
            } else if (this.next_chars == "" && LIPI.is_upper(key) && LIPI.to_lower(key) in this.akSharANi) {
                this.varna[2] = "";
                this.vitaraNa(LIPI.to_lower(key), mode, sa, elm, lang);
            } else if (this.next_chars != "") {
                if (LIPI.includes(this.next_chars, key)) {
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
                } else if (LIPI.is_upper(key) && LIPI.to_lower(key) in this.akSharANi) {
                    this.clear_all_val();
                    this.vitaraNa(LIPI.to_lower(key), mode, sa, elm, lang);
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
        let varna_sthiti = LIPI.last(current);
        if (this.capital[0] == 2 && mode == 1) {
            if (key == this.capital[1]) {
                if (LIPI.time() - this.capital[4] <= 4.0) {
                    key = LIPI.to_upper(key);
                    data = this.akSharANi[key];
                    current = data[key];
                    temp = this.capital[3];
                    varna_sthiti = LIPI.last(current);
                    this.back_space += 2 * this.capital[5];
                    if (varna_sthiti == 0 && LIPI.includes([1, 3], this.pUrva_lekhit[2][1]))
                        cap_0_from_1 = [true, this.pUrva_lekhit[2]];
                    if (LIPI.includes(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], lang)) {
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
        if (this.mAtrA_sthiti && LIPI.includes([1, 2], varna_sthiti)) {
            this.clear_all_val(true);
            this.vitaraNa(LIPI.last(key), mode, sa, elm, lang);
            return;
        }
        this.varna[0] = key;
        this.varna[1] = current[0];
        if (temp == 1 || temp == 3) {
            if (varna_sthiti == 1 && !LIPI.includes(this.next_chars, LIPI.last(key)) && sa == 0) {
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
                this.second_cap_time = LIPI.time();
            } else if (LIPI.last(key) == this.capital[1] && this.akSharANi[LIPI.to_upper(this.capital[1])][LIPI.to_upper(this.capital[1])][0] != this.varna[1]) {
                this.capital[6] = true;
                this.capital[0] = 2;
                this.capital[2] = varna_sthiti;
                this.capital[5] = this.varna[1].length;
                this.second_cap_time = LIPI.time();
            } else
                this.capital = [0, "", -1, -1, 0, 0];
        }
        if ((key == "LR" || key == "r3") && varna_sthiti == 0) {
            if (prev_temp != 1)
                this.mAtrA_sthiti = false;
            else if (sa == 0)
                this.back_space++;
            if (LIPI.includes(["Modi", "Sharada"], lang)) {
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
        if (lang == "Tamil-Extended" && LIPI.includes(["#an", "#s"], key)) {
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
        if (lang == "Tamil-Extended" && LIPI.includes(["#ss", "#sss"], key) && this.special_ved_s)
            this.varna[1] += this.store_last_of_3;
        if (temp == 1 && varna_sthiti == 2 && key.length == 1 && Object.keys(data).length > 1 && sa == 0) {
            for (let v of LIPI.last(current, -2)) {
                if (key + v in data) {
                    if (LIPI.last(data[key + v]) == 1)
                        this.d = true;
                    break;
                }
            }
        }
        if (
            (LIPI.includes(lang, "Tamil") || lang == "Punjabi") &&
            LIPI.includes(["R", "LR", "LRR", "RR"], key) &&
            varna_sthiti == 1
        )
            varna_sthiti = 2
        if (sa == 1) {
            if (varna_sthiti == 1)
                this.varna[1] += this.halant;
            else if (varna_sthiti == 3)
                this.varna[1] = LIPI.substring(this.varna[1], 0, -1) + this.halant + LIPI.last(this.varna[1]);
        }
        let val = this.likha(this.varna[1], this.varna[2], this.back_space, this.halant_add_status);
        if (mode == 0) {
            for (let p = 0; p < val[1]; p++)
                this.dev_text.pop();
            this.dev_text.push(val[0]);
        } else if (mode == 1) {
            let is_input = false;
            if (LIPI.includes(["input", "textarea"], elm[0].tagName.toLowerCase()))
                is_input = true;
            if (is_input) {
                let dyn = elm.val();
                let current_cursor_pos = elm[0].selectionStart + 1;
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
                    post_part = dyn.substring(current_cursor_pos - 1);
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
                let st = false;
                let rs = [],
                    x1 = 0;
                dyn = LIPI.replace_all(dyn, "&nbsp;", "<费费费费>");
                dyn = LIPI.replace_all(dyn, "&amp;", "<费费费>");
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
                        record = false;
                    } else
                        rs.push(v);
                    if (!st) {
                        x1++;
                        if (record) recorder++;
                        t_rec++;
                    }
                    prv = v;
                }
                rs = rs.join("");
                rs = LIPI.replace_all(rs, "<费费费费>", "&nbsp;");
                rs = LIPI.replace_all(rs, "<费费费>", "&amp;");
                rs = rs.split("梵");
                let pre_part = rs[0];
                let a = 0;
                if (this.madhye) {
                    this.madhye = false;
                    pre_part = LIPI.substring(pre_part, 0, -1);
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
                let r = pre_part + changing_part + post_part;
                elm.html(r);
                caret.setPos(recorder + val[0].length - val[1] - a);
            }
        }
        if (this.capital[0] == 3)
            this.capital = [0, "", -1, -1, 0, 0, false];
        if (key.length == 1 && LIPI.is_lower(key) && LIPI.to_upper(key) in this.akSharANi && this.capital[0] == 0 && mode == 1) {
            let a = [0, "", -1, -1, 0, 0, false];
            let b = [1, key, varna_sthiti, temp, LIPI.time(), this.varna[1].length, false];
            if ((key + key) in data) {
                if (this.akSharANi[LIPI.to_upper(key)][LIPI.to_upper(key)][0] != data[key + key][0])
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
            this.store_last_of_3 = LIPI.last(this.varna[1]);
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
        let c = (x) => LIPI.includes(["Romanized", "Normal", "Tamil", "Telugu", "Malayalam", "Kannada"], x);
        if (c(to) && !(c(from) || from == "Tamil-Extended")) {
            val = LIPI.replace_all(val, "o", "O");
            val = LIPI.replace_all(val, "e", "E");
        }
        val = this.prakriyA(val, 0, to, 0, null, html);
        return val;
    };
    anulekhana(val, lang, html) {
        let res = [];
        let lang_data = LIPI.pratyakSharAH[lang];
        val = val.split("");
        let pUrva_lekhit = ["", "", ""];
        let ak = LIPI.akSharAH[lang];
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
            if (LIPI.includes(["\ud805", "\ud804"], s) && LIPI.includes(["Modi", "Sharada", "Brahmi", "Siddham", "Granth"], lang)) {
                x++;
                s += val[x];
            }
            if ((pUrva_lekhit[1] + s) in lang_data && LIPI.last(lang_data[pUrva_lekhit[1] + s]) == "百" && pUrva_lekhit[1] != "")
                res[res.length - 2] = lang_data[pUrva_lekhit[1] + s];
            else if ((pUrva_lekhit[0] + s) in lang_data && LIPI.last(lang_data[pUrva_lekhit[0] + s]) == "百" && pUrva_lekhit[0] != "")
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
                if ((LIPI.includes(["Romanized", "Normal"], lang) && LIPI.includes(LIPI.pUrNasarve.split(""), s)) || LIPI.includes("\n; .'#$1234567890".split(""), s))
                    res.push(s);
                else
                    res.push("て" + s);
            }
            if (!LIPI.is_null(ak[pUrva[1].substring(0, 1)]) && pUrva[2] == "基" && (LIPI.last(pUrva[1]) == "百" || LIPI.last(pUrva[1]) == "此")) {
                let v1 = ak[pUrva[1].substring(0, 1)];
                if (!LIPI.is_null(v1[LIPI.substring(pUrva[1], 0, -1) + LIPI.substring(LIPI.last(res), 0, -1)])) {
                    let v2 = v1[LIPI.substring(pUrva[1], 0, -1) + LIPI.substring(LIPI.last(res), 0, -1)][0];
                    if (v2 != (pUrva_lekhit[1] + s)) {
                        res[res.length - 1] = ";" + res[res.length - 1];
                    }
                }
            } else if (!LIPI.is_null(ak[pUrva[2].substring(0, 1)])) {
                let v1 = ak[pUrva[2].substring(0, 1)];
                if (!LIPI.is_null(v1[pUrva[2] + LIPI.last(res)])) {
                    let v2 = v1[pUrva[2] + LIPI.last(res)][0];
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
            pUrva[2] = LIPI.last(res);
        }
        res = res.join("");
        if (!LIPI.includes(["Normal", "Romanized", "Urdu", "Kashmiri"], lang)) {
            for (let x of ["A", "i", "I", "u", "U", "e", "E", "o", "O", "ai", "au", "R", "RR", "LR", "LRR"]) {
                res = LIPI.replace_all(res, "此." + x, x);
                res = LIPI.replace_all(res, "百." + x, x);
            }
            pUrva = ["", "", "", ""];
            for (let u of ["a", "i", "u"]) {
                res = LIPI.replace_all(res, "此" + u, "a;" + u);
                res = LIPI.replace_all(res, "百" + u, "a;" + u);
            }
            res = LIPI.replace_all(res, "此基", "");
            res = LIPI.replace_all(res, "百基", "");
            res = LIPI.replace_all(res, "此", "a");
            res = LIPI.replace_all(res, "百", "a");
            res = LIPI.replace_all(res, "基", ".x");
        }
        return res;
    };
    add_font(lang, l = "https://cdn.jsdelivr.net/gh/jAlasthAnavitaraNamidam/jAlasthAnam/src/fonts") {
        let script = ["Sharada", "Modi", "Brahmi", "Siddham", "Granth"];
        if (!LIPI.includes(script, lang) || LIPI.includes(this.added_fonts, lang))
            return;
        let name = `LipiFont${script.indexOf(lang)+1}`;
        var font = new FontFace(name, `url(${l}/${lang}.ttf)`);
        font.load().then(function (loaded_face) {
            document.fonts.add(loaded_face);
        }).catch(function (error) {
            // error occurred
        });
        this.added_fonts.push(lang);
    };
};
jQuery.fn.lipi_lekhika_add = function (attri = false) {
    if (!attri) {
        this.on("input", () => {
            LipiLekhikA.mukhya($(this), event);
        });
        this.on("keydown", () => {
            LIPI.clear(event);
        });
    } else {
        this.attr("oninput", "LipiLekhikA.mukhya($(this), event);");
        this.attr("onkeydown", "LIPI.clear(event);");
    }
};
class लिपिलेखिकालेखनसहायिका {
    constructor() {
        this.c = 0;
        this.d = 0;
        this.f_count = 12;
        this.reset_capital_status = false;
        this.pUrvavarNa = [
            ["", "", -1], ""
        ];
        this.closed = true;
        this.elm = jQuery('<span>').appendTo('body');
        this.elm.css({
            "position": "absolute",
            "background-color": "white",
            "padding": "2.5px",
            "border": "1px solid black",
            "font-weight": "bold",
            "display": "none",
            "z-index": "1000000",
            "cursor": "default",
            "font-family": '"Calibri","Nirmala UI","LipiFont1","LipiFont2","LipiFont3","LipiFont4","LipiFont5"'
        });
        let row1 = "",
            row2 = "";
        row1 += `<td><span></span><span></span></td>`;
        row2 += `<td><a href="https://www.lipilekhika.com" target="_blank"><span style="left:3.5px;height:20px;width:20px;position:absolute;top:7px;"></span></a></td>`;
        row1 += `<td></td>`;
        row2 += `<td></td>`;
        for (let x = 0; x < 60; x++) {
            row1 += `<td></td>`;
            row2 += `<td></td>`;
        };
        let table = `<table><tr>${row2}</tr><tr>${row1}</tr></table><div style="font-size: 10.5px;color: purple;"></div>`;
        this.elm.html(table);
        this.bhaNDAra_index = ["sahayika", "pashchAta", "akShara", "key1", "key2"];
        this.bhaNDAra = {
            "sahayika": this.elm.children()[1],
            "key1": 0,
            "key2": 0,
            "pashchAta": 0,
            "akShara": 0
        };
        let tbody = $(this.elm.children()[0]).children()[0];
        tbody = $(tbody).children();
        let tr1 = $(tbody[0]).children();
        let tr2 = $(tbody[1]).children();
        this.bhaNDAra.pashchAta = tr1
        this.bhaNDAra.akShara = tr2;
        this.bhaNDAra.key1 = tr1[1];
        this.bhaNDAra.key2 = tr2[1];
        let img = $(tr2[0]).children(); //1st down 2nd up
        $(img[1]).css({
            "cursor": "pointer",
            "display": "none",
            "height": "26px",
            "width": "26px",
            "position": "absolute",
            "top": "29px",
            "left": "1px",
            "background-size": "26px 26px"
        });
        $(img[0]).css({
            "cursor": "pointer",
            "display": "none",
            "height": "26px",
            "width": "26px",
            "position": "absolute",
            "top": "29px",
            "left": "1px",
            "background-size": "26px 26px"
        });
        this.ins_button = [$($(tr2[0]).children()[1]), $($(tr2[0]).children()[0])];
        this.ins_sthiti = 1;
        this.ins_button[this.ins_sthiti].show();
        this.ins_button[0].click(() => this.change_ins(0));
        this.ins_button[1].click(() => this.change_ins(1));
        if (this.ins_sthiti == 1)
            this.bhaNDAra.sahayika.style.display = "none";
        $(tbody[1]).css({
            "color": "green",
            "font-size": "18px",
            "text-align": "center"
        });
        $(tbody[0]).css({
            "color": "black",
            "font-size": "18px",
            "text-align": "center"
        });
        $(tr1).css("padding", "0.5px");
        $(tr2).css("padding", "0.5px");
        $(this.bhaNDAra.key1).css({
            "color": "brown",
            "font-size": "19.5px",
            "text-align": "center",
            "padding-left": "21.2px",
            "padding-right": "5.6px"
        });
        $(this.bhaNDAra.key2).css({
            "color": "red",
            "font-size": "15px",
            "text-align": "center",
            "padding-left": "21.2px",
            "padding-right": "5.6px",
            "margin-bottom": "2.5px"
        });
        this.display = {};
        for (let x = this.f_count + 1; x < 60; x++) {
            tr1[x + 2].style.display = "none";
            tr2[x + 2].style.display = "none";
        };
        this.objs = {
            "down": $(img[0]),
            "up": $(img[1]),
            "icon": $($(tr1[0]).children()[0])
        };
        this.lang_loaded = false;
        $.ajax({
            url: `${LIPI.sanchit}/img.txt`,
            success: (result) => {
                let r = result.split("基"),
                    l = "background-image";
                $(this.objs.icon.children()[0]).css(l, `url(data:image/png;base64,${r[0]})`);
                $(img[1]).css(l, `url(data:image/svg+xml;base64,${r[1]})`);
                $(img[0]).css(l, `url(data:image/svg+xml;base64,${r[2]})`);
            }
        });
        this.load_lang = (lng, link) => {
            if (!this.lang_loaded)
                $.ajax({
                    url: `${link}/sahayika.json`,
                    success: (result) => {
                        this.display = result;
                        this.set_lang(lng);
                        this.lang_loaded = true;
                    }
                });
            else
                this.set_lang(lng);
        }
    }
    hide_other(s = false) {
        if (s) {
            if (LipiLekhikA.sahayika.closed) {
                LipiLekhikA.sahayika.reset();
                LipiLekhikA.sahayika.closed = true;
            }
            return;
        }
        if (LipiLekhikA.sahayika.c == 1 && !LipiLekhikA.sahayika.closed) {
            LipiLekhikA.sahayika.reset();
            LipiLekhikA.sahayika.closed = true;
        }
        LipiLekhikA.sahayika.c--;
    }
    change_ins(i) {
        let elm = LipiLekhikA.sahayika;
        elm.ins_button[i].hide();
        let t = Math.abs(i - 1);
        elm.ins_sthiti = t;
        elm.ins_button[Math.abs(i - 1)].show();
        elm = elm.bhaNDAra.sahayika;
        elm.style.display = t == 1 ? "none" : "block";
        setTimeout(() => {
            LipiLekhikA.sahayika.elm.show();
        }, 1);
    }
    reset() {
        LipiLekhikA.sahayika.elm.hide();
        if (this.f_count > 12) {
            for (let x = 13; x <= this.f_count; x++) {
                LipiLekhikA.sahayika.hide_elm(1, x);
                LipiLekhikA.sahayika.hide_elm(2, x);
            }
            this.f_count = 12;
        }
        for (let x = 0; x < 60; x++) {
            LipiLekhikA.sahayika.set_labels(2, "", x);
            LipiLekhikA.sahayika.set_labels(3, "", x);
        }
    }
    show(v) {
        this.reset_capital_status = false;

        function reset_capital(k) {
            LipiLekhikA.sahayika.d--;
            if (!LipiLekhikA.sahayika.reset_capital_status)
                return;
            if (LipiLekhikA.sahayika.d == 0) {
                for (let x = k[0]; x < k[1]; x++) {
                    LipiLekhikA.sahayika.set_labels(2, "", x);
                    LipiLekhikA.sahayika.set_labels(3, "", x);
                }
            }
            LipiLekhikA.capital = [0, "", -1, -1, 0, 0, false];
        }
        if (this.f_count > 12) {
            for (let x = 13; x <= this.f_count; x++) {
                this.hide_elm(1, x);
                this.hide_elm(2, x);
            }
            this.f_count = 12;
        }
        let next = v["key"][1],
            key = v["key"][0];
        let matra = v["mAtrA"],
            extra_cap = v["special_cap"],
            lang = v["lang"],
            sa = v["sa"];
        if (extra_cap[0])
            this.pUrvavarNa = [
                [
                    LIPI.akSharAH[lang][extra_cap[1][0]][extra_cap[1][0]][0],
                    "",
                    extra_cap[1][1],
                ],
                extra_cap[1][0]
            ];
        let cordinate = v["elm"].caret("offset");
        let top = cordinate["top"],
            hieght = cordinate["height"],
            left = cordinate["left"];
        this.elm[0].style.top = `${top+hieght}px`;
        this.elm[0].style.left = `${left+8}px`;
        let halant = ["", false];
        if (!LIPI.includes(["Urdu", "Romanized", "Normal", "Kashmiri"], LipiLekhikA.script))
            halant = [LIPI.akSharAH[lang]["."][".x"][0], sa == 1];
        let a = new Map(),
            b = LIPI.akSharAH[lang][key[0]],
            count = 0;
        for (let x of next) {
            if ((key + x) in b) {
                a.set(x, b[key + x]);
                for (let y of LIPI.last(b[key + x], -2))
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
            let tmp = LIPI.to_upper(key);
            let b1 = LIPI.akSharAH[lang][tmp];
            a.set(key + key, b1[tmp]);
            let next = LIPI.last(a.get(key + key), -2);
            for (let x of next)
                if ((tmp + x) in b1) {
                    a.set(key + key + x, b1[tmp + x]);
                    for (let y of LIPI.last(b1[tmp + x], -2))
                        if ((tmp + x + y) in b1) {
                            a.set(key + key + x + y, b1[tmp + x + y]);
                            count++;
                        }
                    count++;
                }
            cap_count[1] = count + 1;
        }
        if ((LIPI.includes([1, 3], LIPI.last(this.pUrvavarNa[0])) || matra) && LIPI.last(b[key]) == 0) {
            let k12 = this.pUrvavarNa[0][0] + b[key][1];
            if (LIPI.last(this.pUrvavarNa[0]) == 3 && key != "a")
                k12 = LIPI.substring(k12, 0, -2) + LIPI.last(k12) + LIPI.last(k12, -2);
            else if (LIPI.last(this.pUrvavarNa[0]) == 3 && key == "a")
                k12 = LIPI.last(k12, 0, -1) + LIPI.last(k12);
            this.set_labels(4, this.pUrvavarNa[1] + key);
            this.set_labels(5, k12);
        } else {
            this.set_labels(4, key);
            let l12 = b[key][0] + (LIPI.includes([1, 3], LIPI.last(b[key])) ? halant[0] : "");
            if (LIPI.last(b[key]) == 3)
                l12 = LIPI.substring(l12, 0, -2) + LIPI.last(l12) + LIPI.last(l12, -2);
            this.set_labels(5, l12);
        }
        for (let x of a.keys()) {
            this.set_labels(2, x, c);
            let k = a.get(x)[0];
            if (LIPI.last(a.get(x)) == 0 && LIPI.includes([1, 3], LIPI.last(this.pUrvavarNa[0])))
                k = a.get(x)[1];
            if (LIPI.includes([1, 3], LIPI.last(a.get(x))) && halant[1]) {
                k += halant[0];
                if (LIPI.last(a.get(x)) == 3)
                    k = LIPI.substring(k, 0, -2) + LIPI.last(k) + LIPI.last(k, -2);
            }
            if ((LIPI.includes([1, 3], LIPI.last(this.pUrvavarNa[0])) || matra) && LIPI.last(a.get(x)) == 0) {
                k = this.pUrvavarNa[0][0] + k;
                if (LIPI.last(this.pUrvavarNa[0]) == 3)
                    k = LIPI.substring(k, 0, -2) + LIPI.last(k) + LIPI.last(k, -2);
            }
            this.set_labels(3, k, c);
            c++;
        }
        let len = 0;
        for (let x of a.keys())
            len++;
        if ((len - 1) > (this.f_count + 1)) {
            for (let x = this.f_count + 1; x < len; x++) {
                this.show_elm(1, x);
                this.show_elm(2, x);
            };
            this.f_count = len - 1;
        }
        for (let x = c; x < 13; x++) {
            this.set_labels(3, "", x);
            this.set_labels(2, "", x);
        }
        this.c++;
        if (!matra)
            this.pUrvavarNa = [b[key], key];
        if (this.closed)
            this.closed = false;
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
    }
    hide_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.display = "none";
    };
    show_elm(type, x) {
        this.bhaNDAra[["pashchAta", "akShara"][type - 1]][x + 2].style.removeProperty('display');
    }
    set_labels(type, txt, index = -1) {
        if (index != -1 && (type == 3 || type == 2))
            this.bhaNDAra[this.bhaNDAra_index[type - 1]][index + 2].innerHTML = txt;
        else
            this.bhaNDAra[this.bhaNDAra_index[type - 1]].innerHTML = txt;
    };
    set_lang(l) {
        let data = this.display[l];
        let txt = data["ins"].split("\n");
        txt = "<div>" + txt[0] + "</div><div>" + txt[1] + "</div>";
        this.set_labels(1, txt);
        this.elm.attr("title", data["title"]);
        for (let x in this.objs)
            this.objs[x].attr("title", data[x]);
    };
};
let LipiLekhikA = new लिपिलेखिकापरिवर्तक();