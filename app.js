class अनुप्रयोगः {
    constructor() {
        this.time = 0;
        this.c = 0;
        this.k = लिपि;
        this.lang_texts = {};
        this.pratyaya_sanchit = this.k.substring(this.k.sanchit, 0, -9);
        this.anya_html = {};
        this.app = LipiLekhikA;
        this.loaded_display_lng = [];
        this.pages = ["inter", "parri"];
        this.lipyaH = {
            Devanagari: ["देवनागरी", "", "अ", "auto"],
            Hindi: ["हिन्दी", "अजय्", "अ", "hi"],
            "Purna-Devanagari": ["पूर्ण-देवनागरी", "अजय्", "अ", "auto"],
            Bengali: ["বাংলা", "অজয্", "অ", "bn"],
            Telugu: ["తెలుగు", "అజయ్", "అ", "te"],
            Tamil: ["தமிழ்", "அஜய்", "அ", "ta"],
            Marathi: ["मराठी", "अजय्", "अ", "mr"],
            Gujarati: ["ગુજરાતી", "અજય્", "અ", "gu"],
            Malayalam: ["മലയാളം", "അജയ്", "അ", "ml"],
            Kannada: ["ಕನ್ನಡ", "ಅಜಯ್", "ಅ", "kn"],
            Oriya: ["ଓଡ଼ିଆ", "ଅଜଯ୍", "ଅ", "or"],
            Assamese: ["অসমীয়া", "অজয্", "অ", 0],
            Konkani: ["कोंकणी", "अजय्", "अ", 0],
            Sanskrit: ["संस्कृतम्", "अजय्", "अ", 0],
            Punjabi: ["ਪੰਜਾਬੀ", "ਅਜਯ੍", "ਅ", "pa"],
            Nepali: ["नेपाली", "अजय्", "अ", "ne"],
            Urdu: ["اُردُو", "اجَے ", "ب", "ur"],
            Romanized: ["Romanized", "ajay ", "ā", "en"],
            Sinhala: ["සිංහල", "අජය්", "අ", "si"],
            "Tamil-Extended": ["தமிழ்-Extended", "அஜய்", "அ", 0],
            Sharada: ["शारदा", "𑆃𑆘𑆪𑇀", "𑆃", 0],
            Modi: ["मोडी", "𑘀𑘕𑘧𑘿", "𑘀", 0],
            Siddham: ["सिद्धम्", "𑖀𑖕𑖧𑖿", "𑖀", 0],
            Granth: ["கிரந்த", "𑌅𑌜𑌯𑍍", "𑌅", 0],
            Brahmi: ["ब्राह्मी", "𑀅𑀚𑀬𑁆", "𑀅", 0],
            Normal: ["Normal", "", "A", "en"]
        };
        this.lang_list = {
            "English": [0, "en", "English"],
            "हिन्दी": [0.5, "hi", "Hindi"],
            "தமிழ்": [0, "ta", "Tamil"],
            "संस्कृतम्": [0.5, "sa", "Sanskrit"],
            "తెలుగు": [0.5, "te", "Telugu"],
            "ಕನ್ನಡ": [0.5, "kn", "Kannada"],
            "বাংলা": [0.5, "bn", "Bengali"],
            "मराठी": [0.5, "mr", "Marathi"],
            "ગુજરાતી": [0.5, "gu", "Gujarati"],
            "ଓଡ଼ିଆ": [0.5, "or", "Odia"],
            "ਪੰਜਾਬੀ": [0.5, "pa", "Punjabi"],
            "മലയാളം": [-0.3, "ml", "Malayalam"],
            "اُردُو": [2.3, "ur", "Urdu"]
        };
        this.translate = (v, f, t) => {
            v = `https://translate.google.com/?sl=${f}&tl=${t}&text=${encodeURIComponent(v)}&op=translate`;
            window.open(v, "_blank");
        };
        this.sthAna = {
            "main": "",
            "lang": "",
            "from": "",
            "to": ""
        };
        this.pRShThedAnIm = "";
        this.up_lipyaH = ["Siddham", "Brahmi", "Sharada", "Modi", "Granth"];
        this.once_editded = false;
        this.auto = !false;
        this.menu_btn_clicked = false;
        this.yuj = (x, y) => jQuery(y).appendTo(x);
        this.current_page = "gRham";
        this.back_loaded = false;
        this.first_load = 0;
        this.in = (x, y) => this.k.in(x, y);
    };
    init_html() {
        let yuj = app.yuj;
        if (true) { //main
            let el = $("#back_btn").on("click", () => app.change_page("gRham"));
            el.css("display", "none");
            $("#parivartak").on("click", () => app.change_page("inter"));
            $(".prayog_btn").on("click", () => app.change_page("prayog", false));
            $("#sah_set_val").on("click", function () {
                app.store_values("sahayika", {
                    false: "off",
                    true: "on"
                } [this.checked]);
            });
            $("#script_set").on("change", function () {
                app.store_values("script", this.value)
            });
        }
        if (true) { //menu
            let time = 210,
                cl = ["#38383871", "transparent"];
            let cl_st = (x, y, v) => `@keyframes black_color${v}{from{background-color:${cl[x]}}to{background-color:${cl[y]}}}`;
            let anm = (x, y, z) => $("#menu_blocker").css({
                "animation-name": `black_color${x}`,
                "animation-duration": `${y}ms`,
                "background-color": cl[z]
            });
            yuj("#menu_body", `<style>${cl_st(1,0,1)+cl_st(0,1,2)}</style>`);
            $("#menu_btn").on("click", () => {
                $("#menu_container").show();
                anm(1, time - 15, 0);
                $("#menu_body").animate({
                    left: "0px"
                }, time);
                app.pRShThedAnIm = "menu";
            });
            $("#menu_blocker").on("click", () => {
                app.pRShThedAnIm = "";
                $("#menu_body").animate({
                    "left": "-" + $("#menu_body").css("width")
                }, time + 7, "linear", () => $("#menu_container").hide(), time + 12);
                if (app.menu_btn_clicked) {
                    $("#menu_blocker").css("background-color", cl[1]);
                    app.menu_btn_clicked = false;
                } else
                    anm(2, time + 7, 1);
            });
            for (let p in app.lang_list)
                yuj("#app_lang", `<option tlt="${app.lang_list[p][1]}-in" value="${p}" class="langsw">${p}</option>`)
            $("#app_lang").on("change", async function () {
                let v = $("#app_lang").val();
                if (!app.in(app.loaded_display_lng, v)) {
                    app.loaded_display_lng.push(v);
                    app.lang_texts[v] = await $.get({
                        url: app.pratyaya_sanchit + `/display/${v}.json`,
                        dataType: "json"
                    });
                }
                app.store_values("app_lang", $("#app_lang").val());
                app.set_lang_text();
                app.kr("font-size");
                app.kr("convert-msg");
            });
            $("#about_menu").on("click", () => {
                app.change_page("parri");
                $("#menu_blocker").trigger("click");
            });
            $("#setting_menu").on("click", () => {
                app.change_page("setting", false);
                app.menu_btn_clicked = true;
                $("#menu_blocker").trigger("click");
            });
            $("#prayog_menu").on("click", () => {
                app.change_page("prayog", false);
                app.menu_btn_clicked = true;
                $("#menu_blocker").trigger("click");
            });
            $("#redirect1").on("click", () => {
                if ("app_lang" in s1)
                    window.open("/", "_blank");
                else
                    app.open_link("/" + app.lang_list[$("#app_lang").val()][1], null);
            });
        }
        if (true) { //about
            $("#licence_btn").on("click", () => {
                $.get({
                    url: app.pratyaya_sanchit + `/LICENCE.txt`,
                    dataType: "text",
                    success: (result) => {
                        $("#licence").html(app.k.replace_all(result, "\n", "<br>"));
                        $("#licence").show();
                        $("#licence_btn").hide();
                    }
                });
            });
        }
        if (true) { //base
            $("#sah_val").on("click", function () {
                let sah = this.checked;
                let elm = $("#main"),
                    msg = "lekhan-sahayika";
                let val = [
                    ["off1", "on1"],
                    ""
                ];
                val[1] = val[0][sah ? 1 : 0];
                let vl = app.k.substring(val[1], 0, -1);
                if (sah)
                    elm.attr(msg, vl);
                else
                    elm.attr(msg, vl);
            });
            $("#sahayika_text").on("click", function () {
                $(this).css("color", "white")
                setTimeout(() => $(this).css("color", ""), 250);
            });
            $("#sah_val").check({
                "off": false,
                "on": true
            } [app.get_values("sahayika")]);
            $("#sa_04").on("click", () => $("#main").attr("lipi-mode", 0));
            $("#sa_14").on("click", () => $("#main").attr("lipi-mode", 1));
            $("#main").attr("lekhan-sahayika", app.get_values("sahayika"));
            $(".no_checking").attr({
                spellcheck: "false",
                autocapitalize: "none",
                autocomplete: "off",
                autocorrect: "off"
            });
            $("#main_lang").on("change", async () => {
                await app.k.load_lang($("#main_lang").val());
                let ak = $("#main_lang").val();
                $("#main").attr("lipi-lang", ak)
                if (app.in(["Urdu", "Romanized"], ak))
                    $("#sa_mode").hide();
                else
                    $("#sa_mode").show();
                app.kr("sa-val");
                app.kr("add-direction", $("#main"), $("#main_lang").val());
                if (!app.once_editded)
                    app.kr("add-direction", $("#first"), $("#main_lang").val());
                let e = $("#anu_main");
                if (s.mode == 0)
                    if (app.lipyaH[ak][3] == 0) {
                        e.hide();
                        $("#main").attr("lang", "");
                    } else {
                        e.show();
                        $("#main").attr("lang", app.lipyaH[ak][3]);
                    }
                app.kr("p-holder", "#main_lang");
            });
            $("#main_val").on("click", function () {
                let kry = this.checked;
                let elm = $("#main"),
                    msg = "lipi-lekhika";
                let val = [
                    ["off", "on"],
                    ""
                ];
                val[1] = val[0][kry ? 1 : 0];
                if (kry)
                    elm.attr(msg, val[1]);
                else
                    elm.attr(msg, val[1]);
            });
            $("#cp1").on("click", () => {
                app.copy_text("#main");
                setTimeout(function () {
                    document.execCommand("copy");
                }, 1);
            });
            if (s.mode == 0) {
                let y = "";
                for (let x in app.lipyaH) {
                    if (app.in(["Devanagari", "Normal"], x))
                        continue;
                    y += `<a rel="noopener" class="bhAShAnyAH block dvayam-right-anya-bhAShA" href="/lang/${x}" target="_blank">${app.lipyaH[x][0]} (<span class="bhAShAnyAH_name" value="${x}"></span>)</a>`;
                }
                yuj("#bhAShA_sanchit", y);
            }
            $("#redirect0").on("click", () => {
                if ("main_lang" in s1)
                    window.open("/", "_blank");
                else
                    app.open_link(null, "/lang/" + $("#main_lang").val());
            });
            $("#anu_main").on("click", () => {
                let v = $("#main").val(),
                    fr = app.lipyaH[$("#main_lang").val()][3];
                app.translate(v, fr, "en")
            });
        }
        if (true) { //prayog
            let t = $("#close1").on("click", () => app.change_page("mA_prayog", false));
            $("#prayog .blocker").on("click", () => t.trigger("click"));
            $("#xcv").on("change", () => app.kr("set-lang-img"));
            $("#download").on("click", () => {
                let e = $("#image");
                app.download(e.attr("src"), `${e.attr("title").split(" - ")[0]}.png`)
            });
        }
        if (true) { //setting
            $("#set_img").on("click", () => app.change_page("setting", false));
            let t = $("#close2").on("click", () => app.change_page("mA_setting", false));
            $("#setting .blocker").on("click", () => t.trigger("click"));
        }
        if (true) { //lipi parivartak
            $("#anu_main1").on("click", () => {
                let v = $("#first").val(),
                    fr = app.lipyaH[$("#lang1").val()][3],
                    to = app.lipyaH[$("#lang2").val()][3];
                to = to == "auto" ? "hi" : to;
                app.translate(v, fr, to);
            });
            $("#lang1").on("change", () => {
                $.load_lekhika_lang($("#lang1").val(), () => {
                    if (app.auto)
                        $("#first").val(app.app.parivartak($("#second").val(), $("#lang2").val(), $("#lang1").val()))
                    let n = app.k.akSharAH[$("#lang1").val()].sa;
                    $("#first").attr("lipi-mode", n);
                });
                app.kr("add-direction", $("#first"), $("#lang1").val());
                app.kr("convert-msg");
                $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
                app.kr("inter-anuvadak");
                app.kr("inter-set");
                app.kr("p-holder", "#lang1");
            });
            $(".img_inter1").on("click", function () {
                $("#first").attr("lipi-lekhika", {
                    true: "on",
                    false: "off"
                } [this.checked]);
            });
            $("#cp2").on("click", () => app.copy_text("#first"));
            $("#first").on("input", function () {
                app.kr("edited");
                if (app.auto)
                    $("#second").val(app.app.parivartak(this.value, $("#lang1").val(), $("#lang2").val()));
            });
            $("#lang2").on("change", () => {
                $.load_lekhika_lang($("#lang2").val(), () => {
                    if (app.auto)
                        $("#second").val(app.app.parivartak($("#first").val(), $("#lang1").val(), $("#lang2").val()));
                    let n = app.k.akSharAH[$("#lang2").val()].sa;
                    $("#second").attr("lipi-mode", n);
                });
                app.kr("add-direction", $("#second"), $("#lang2").val());
                app.kr("convert-msg");
                $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
                app.kr("inter-anuvadak");
                app.kr("inter-set");
                app.kr("p-holder", "#lang2");
            });
            $("#cp3").on("click", () => app.copy_text("#second"));
            $(".img_inter2").on("click", function () {
                $("#second").attr("lipi-lekhika", {
                    true: "on",
                    false: "off"
                } [this.checked]);
            });
            $("#second").on("input", function () {
                app.kr("edited");
                if (app.auto)
                    $("#first").val(app.app.parivartak(this.value, $("#lang2").val(), $("#lang1").val()));
            });
            $("#auto_img").on("click", () => {
                app.auto = !app.auto;
                $("#auto_img").css("background-color", `${app.auto ? "#ff6464" : "lightgreen"}`);
                if (!app.auto) {
                    $("#up_arrow_img").show();
                    $("#down_arrow_img").show();
                } else {
                    $("#down_arrow_img").trigger("click");
                    $("#up_arrow_img").hide();
                    $("#down_arrow_img").hide();
                }
            });
            $("#auto_img").trigger("click");
            $("#down_arrow_img").on("click", () => $("#second").val(app.app.parivartak($("#first").val(), $("#lang1").val(), $("#lang2").val())));
            $("#up_arrow_img").on("click", () => $("#first").val(app.app.parivartak($("#second").val(), $("#lang2").val(), $("#lang1").val())));
            $(".inter_redirect").on("click", () => {
                if ("to" in s1 && "from" in s1)
                    window.open("/", "_blank");
                else {
                    if ($("#lang1").val() == "Normal")
                        return;
                    app.open_link(null, `/converter/${$("#lang1").val()}/${$("#lang2").val()}`);
                }
            });
        }
        if (true) { // adding lang options in select tags
            if (s.mode == 1)
                setTimeout(() => {
                    $(".web_only1").remove();
                    $(".web_only").hide();
                }, 1);
            for (let z of $(".lang")) {
                let x = $(z).attr("id");
                let j = "";
                for (let y in app.lipyaH) {
                    if (y == "Devanagari" && !app.in(["lang1", "lang2"], x))
                        continue;
                    if (y == "Normal" && app.in(["main_lang", "xcv", "script_set"], x))
                        continue;
                    j += `<option value="${y}"></option>`;
                }
                app.yuj("#" + x, j);
            }
            app.yuj("#xcv", `<option id="Vedic" value="Vedic"></option>`)
            app.yuj("#paricaya", `<div class="br-above">भारते रचितः</div>E-mail : <a rel="noopener" href="mailto:lipilekhika@gmail.com" class="mail">lipilekhika@gmail.com</a>`);
        }
    };
    kr(q, i = null, lang = 0) {
        if (q == "font-size") {
            let x = app.lang_list[$("#app_lang").val()][0];
            $("body").css("font-size", `${10 + x}px`);
            $("html").attr("lang", app.lang_list[$("#app_lang").val()][1]);
        } else if (q == "add-direction") {
            if (lang == "Urdu")
                i.attr("dir", "rtl");
            else
                i.attr("dir", "ltr");
        } else if (q == "inter-anuvadak") {
            let e = $("#anu_main1");
            if (s.mode == 0)
                if (app.lipyaH[$("#lang1").val()][3] == 0 || app.lipyaH[$("#lang2").val()][3] == 0)
                    e.hide();
                else
                    e.show();
        } else if (q == "edited")
            this.once_editded = true;
        else if (q == "convert-msg") {
            let db = app.lang_texts[$("#app_lang").val()];
            let data = db.scripts;
            db = db.others;
            let val = [$("#lang1").val(), $("#lang2").val()];
            val[0] = data[val[0]];
            val[1] = data[val[1]];
            let elm = [$("#down_arrow_img")[0], $("#up_arrow_img")[0]];
            elm[0].title = `${db.convert} :- ${val[0]} ➠ ${val[1]}`;
            elm[1].title = `${db.convert} :- ${val[1]} ➠ ${val[0]}`;
        } else if (q == "sa-val") {
            let src = $("#main_lang").val();
            let val = app.lipyaH[src][1];
            let sa = app.k.akSharAH[src].sa;
            $(`#sa_${sa}4`).check(true);
            $("#main").attr("lipi-mode", sa);
            if (app.in(["Romanized", "Normal", "Urdu"], src))
                val += " ";
            let extra = 0;
            if (app.in(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], src))
                extra++;
            let val1 = val.substring(0, val.length - 1 - extra);
            $("#sa_0").html(`ajay ➠ ${val1}`);
            $("#sa_1").html(`ajay ➠ ${val}`);
        } else if (q == "inter-set") {
            $($(`#lang1, #lang2`).children()).show();
            $(`#lang1 [value=${$("#lang2").val()}], #lang2 [value=${$("#lang1").val()}]`).hide();
        } else if (q == "set-lang-img") {
            let val = "";
            if (i == null)
                val = $("#xcv").val();
            else
                val = i;
            let data = this.lang_texts[$("#app_lang").val()],
                elm = $("#image");
            let v = `${data.scripts[val]} - ${data.title.image}`;
            $("#xcv").val(val);
            let img = new Image();
            img.onload = function () {
                elm.css({
                    width: `${this.width*0.78}px`,
                    height: `${this.height*0.78}px`
                });
                elm.attr({
                    src: app.app.usage_table_link(val),
                    title: v,
                    alt: v
                });
            };
            img.src = app.app.usage_table_link(val);
        } else if (q == "p-holder") {
            for (let x of ["#lang1", "#lang2", "#main_lang"]) {
                if (i != null && x != i)
                    continue;
                let e = $(x);
                let f = $(e.attr("of"));
                let d = this.lang_texts[$("#app_lang").val()];
                f.attr("placeholder", app.k.format(d.others.place, ["- " + this.lipyaH[e.val()][0]]));
            }
        }
    };
    change_page(to, set = true) {
        if (set) {
            $(`#${app.current_page}`).hide();
            $(`#${to}`).show();
        }
        if (to == "inter" || to == "parri") {
            $("#parivartak").hide();
            $("#back_btn").show();
        }
        if (to == "inter" && !app.once_editded)
            $.load_lekhika_lang($("#lang1").val(), () => {
                $.load_lekhika_lang($("#lang2").val(), () => {
                    if (!("from" in s1))
                        $("#lang1").val($("#main_lang").val());
                    if (!("to" in s1))
                        $("#lang2").val("Romanized");
                    $("#first").val($("#main").val());
                    $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
                    $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
                    let n = app.k.akSharAH[$("#lang1").val()].sa;
                    $("#first").attr("lipi-mode", n);
                    n = app.k.akSharAH[$("#lang2").val()].sa;
                    $("#second").attr("lipi-mode", n);
                    app.kr("inter-anuvadak");
                    for (let u of ["#lang1", "#lang2"])
                        app.resize_one($(u));
                    $("#second").val(app.app.parivartak($("#first").val(), $("#lang1").val(), $("#lang2").val()));
                    app.kr("inter-set");
                })
            });
        else if (to == "gRham") {
            $("#parivartak").show();
            $("#back_btn").hide();
        } else if (to == "prayog") {
            $("#xcv").val($("#main_lang").val());
            $("#xcv").trigger("change");
            $("#prayog").show();
        } else if (to == "mA_prayog") {
            $("#prayog").hide();
        } else if (to == "setting") {
            $("#setting").show();
        } else if (to == "mA_setting") {
            $("#setting").hide();
        }
        if (set)
            app.current_page = to;
        app.pRShThedAnIm = to;
    };
    copy_text(query) {
        var copyText = $(query)[0];
        copyText.select();
        copyText.setSelectionRange(0, copyText.value.length + 2);
        document.execCommand("copy");
    };
    set_lang_text(val = $("#app_lang").val()) {
        let data = app.lang_texts[val];
        let tlt = data.others.page_title,
            t1 = data.scripts;
        if ("main_lang" in s1)
            tlt = app.k.format(data.others.title_lang, [t1[s1["main_lang"]]]);
        if ("to" in s1)
            tlt = app.k.format(data.others.title_convert, [t1[s1["from"]], t1[s1["to"]]]);
        $("title").html(tlt);
        for (let x in data.lekhAH) {
            let v = "";
            if (x == "anya_nirdesh")
                v = app.k.text_to_html(data.lekhAH[x], "li");
            else
                v = app.k.replace_all(data.lekhAH[x], "\n", "<br>");
            if (x == "about_text")
                v = app.k.format(v, [`<a rel="noopener" href="https://rebrand.ly/lekhika" target="_blank">`, "</a>"]);
            $(`[lkh=${x}]`).html(v);
        };
        for (let x in data.scripts) {
            let v = data.scripts[x];
            if (x == "Vedic")
                $(`[value=${x}]`).html(`${v}`);
            else
                $(`:not(.bhAShAnyAH) [value=${x}]`).html(`${v} (${this.lipyaH[x][2]})`);
            $(`.bhAShAnyAH [value=${x}]`).html(`${v}`);
        }
        app.app.set_interface_lang(app.lang_list[val][2]);
        for (let x in data.title) {
            let v = data.title[x];
            $(`[tlt=${x}]`).attr({
                "title": v,
                "alt": v
            });
        }
        this.resize();
        this.kr("p-holder");
        if (s.mode == 1) {
            let hj = (y, x) => y.removeAttribute(x)
            for (let x of $("a"))
                for (let g of ["href", "target", "rel"])
                    hj(x, g);
        }
    };
    store_values(name, val, defal = false) {
        if (defal) {
            switch (name) {
                case "script":
                    storage.setItem(name, "Hindi")
                    break;
                case "app_lang":
                    storage.setItem(name, "English");
                    break;
                case "sahayika":
                    storage.setItem(name, "on");
                    break;
            }
        } else {
            if (!app.in(["app_lang", "script", "sahayika"], name))
                return;
            switch (name) {
                case "script":
                    if (!(val in app.lipyaH))
                        return;
                    break;
                case "app_lang":
                    if (!(val in app.lang_list))
                        return;
                    break;
                case "sahayika":
                    if (!(val == "on" || val == "off"))
                        return;
                    break;
            }
            storage.setItem(name, val);
        }
    };
    get_values(name) {
        if (name in storage) {
            let val = storage[name];
            switch (name) {
                case "script":
                    if (!(val in app.lipyaH)) {
                        val = "Hindi";
                        this.store_values(name, val);
                    }
                    break;
                case "app_lang":
                    if (!(val in app.lang_list)) {
                        val = "English";
                        this.store_values(name, val);
                    }
                    break;
                case "sahayika":
                    if (!(val == "off" || val == "on")) {
                        val = "on";
                        this.store_values(name, val);
                    }
                    break;
            }
            return val;
        } else {
            this.store_values(name, "", true);
            return app.get_values(name);
        }
    };
    open_link(lang = null, main = null) {
        if (lang == null)
            lang = app.sthAna.lang;
        if (main == null)
            if ("to" in s1)
                main = app.sthAna.from + app.sthAna.to;
            else
                main = app.sthAna.main;
        window.open("https://app.lipilekhika.com" + lang + main, "_blank");
    };
    download(url, nm = "") {
        let e = $(this.yuj("#main_section", '<a></a>'));
        e.attr({
            href: url,
            download: nm
        })[0].on("click", );
        e.remove();
    }
};
jQuery.fn.check = function (k = null) {
    if (k == null)
        return this[0].checked;
    else {
        this[0].checked = k;
        return k;
    }
};
var app = new अनुप्रयोगः();
var storage = window.localStorage;
var s1 = {};
setTimeout(async () => {
    if (true) { //pre settings
        if ("main_lang" in s)
            s["from"] = s["main_lang"];
        if ("from" in s) {
            s["main_lang"] = s["from"] == "Devanagari" ? "Sanskrit" : s["from"];
            s["from"] = s["from"];
        }
        s1 = JSON.parse(JSON.stringify(s));
    }
    if (true) { //setting values
        if (!("app_lang" in s))
            s["app_lang"] = app.get_values("app_lang");
        if (!("main_lang" in s))
            s["main_lang"] = app.get_values("script");
        if (!("from" in s))
            s["from"] = s["main_lang"];
        if (!("to" in s))
            s["to"] = "Romanized";
        if (!("vitroTanam" in s))
            s["vitroTanam"] = true;
        if (!("page" in s))
            s["page"] = 0;
        if (!("mode" in s))
            s["mode"] = 0;
    }
    let v = s["app_lang"];
    app.lang_texts[v] = await $.get({
        url: app.pratyaya_sanchit + `/display/${s["app_lang"]}.json`,
        dataType: "json"
    });
    $("body").append(await $.get({
        url: app.k.substring(app.pratyaya_sanchit, 0, -3) + "app.html",
        dataType: "text"
    }));
    let e = $("#store_html").children();
    for (let x of e)
        app.anya_html[$(x).attr("nm")] = x.innerHTML;
    $("#store_html").remove();
    app.init_html();
    $("#main_val").check(true);
    setTimeout(async () => { // waiting for main process to complete
        let e1 = app.yuj("body", await $.get({
            url: app.k.substring(app.k.image_loca, 0, -5) + "/img.html",
            dataType: "text"
        }));
        let e = $(e1).children();
        for (let x of e) {
            let elm = $(`[chv=${$(x).attr("nm")}]`).html($(x).html());;
            elm.addClass("imgs");
        }
        e1.remove();
        $("#main_section").show(); // showing the Application
    }, 1);
    $(".redirect").attr("tlt", "redirect_msg");
    let ht = (x, y) => app.k.format(app.anya_html[x], [y]),
        t = "";
    if (true) { // init values
        if ("app_lang" in s1) {
            t = $("#app_lang").after(ht("app_set", s1["app_lang"]));
            t.hide();
            app.sthAna.lang = "/" + app.lang_list[s["app_lang"]][1];
        }
        if ("main_lang" in s1) {
            t = $("#main_lang").after(ht("main_set", s1["main_lang"]));
            t.hide();
            t = $("#script_set").after(ht("script_set", s1["main_lang"]));
            t.hide();
            app.sthAna.main = "/lang/" + s1["main_lang"];
        }
        if ("from" in s1) {
            t = $("#lang1").after(ht("from_set", s1["from"]));
            t.hide();
            app.sthAna.from = "/converter/" + s1["from"];
        }
        if ("to" in s1) {
            t = $("#lang2").after(ht("to_set", s1["to"]));
            t.hide();
            app.sthAna.to = "/" + s1["to"];
            if (s1.page == 1)
                $.load_lekhika_lang(s1.to);
        }
    }
    //adding on off tooltip of img type 2
    $("[chv=imgon2]").attr("tlt", "imgon");
    $("[chv=imgoff2]").attr("tlt", "imgoff");
    on_loaded();
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
        $("title").html($("title").html());
        $(".lipi_icon").remove();
        add_icon();
        // let t = app.k.time();
        let back = false;
        let hde = () => $("#back_btn").hide();
        if (!back)
            window.history.pushState(null, "", window.location.href);
        let pg = app.pRShThedAnIm,
            bck = {
                "prayog": "#close1",
                "setting": "#close2"
            };
        if (pg == "menu")
            $("#menu_blocker").trigger("click");
        else if (pg in bck)
            $(bck[pg]).trigger("click");
        else if (app.in(app.pages, app.current_page)) {
            app.change_page("gRham");
            hde();
        }
        app.time = app.k.time();
        app.c++;
    };
}, 1);

var icon_link = $("#lipi_icon").attr("href");

function add_icon() {
    let pra = icon_link;
    for (x of ["icon", "shortcut icon", "apple-touch-icon"])
        $("head").append(`<link rel="${x}" type="image/png" href="${pra}" class="lipi_icon">`);
};
add_icon();

function on_loaded() {
    $.lipi_lekhika(); // initializing lipi lekhika core tool
    $("#sah_set_val").check($("#sah_val").check({
        "on": true,
        "off": false
    } [app.get_values("sahayika")]));

    function resize(e) {
        e.css("width", "");
        let i = e.html(),
            o = e[0].outerHTML;
        o = app.k.replace_all(o, i, "");
        o = app.k.replace_all(o, "id=", "idk=");
        o = app.yuj("body", o);
        o.html(`<option>${e.find("option:checked").html()}</option>`).text();
        let f = o.width();
        o.remove();
        e.css("width", `${f + 7}px`);
    };
    app.resize = () => $("select").each(function () {
        resize($(this))
    });
    app.resize_one = resize;
    if (true) {
        $("#app_lang").val(s["app_lang"]);
        $("#main_lang").val(s["main_lang"]);
        $("#lang1").val(s["from"]);
        $("#xcv").val(s["main_lang"]);
        $("#lang2").val(s["to"]);
        $("#script_set").val(app.get_values("script"));
        $("#main_lang").trigger("change");
        $("select").on("change", (e) => resize($(e.target)));
        app.set_lang_text();
        if (s["page"] == 0)
            $("#gRham").show();
        else if (s["page"] == 1) {
            app.current_page = "inter";
            $("#inter").show();
            $("#parivartak").hide();
            $("#back_btn").show();
        }
        $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
        $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
    }
    if (true) {
        let akl = $("#main_lang").val();
        if (app.in(["Urdu", "Romanized"], akl))
            $("#sa_mode").hide();
        app.kr("add-direction", $("#main"), akl);
        app.kr("add-direction", $("#first"), $("#lang1").val());
        app.kr("add-direction", $("#second"), $("#lang2").val());
        app.kr("convert-msg");
        app.kr("font-size");
        app.kr("inter-set");
    }
    if (s.vitroTanam)
        window.onbeforeunload = () => "Do you really want to Leave";
    $("#lipi_icon").remove();
    $("select").each(function () {
        resize($(this))
    });
    for (let x of ["#main", "#first", "#second"]) {
        let e = $(x);
        e.css("height", e.css("height"));
    }
    for (let x of ["select", ".ajay", "#main", ".normal"])
        $(x).addClass("fonts");
    // Setting Location of the Menu
    $("#menu_container").show();
    $("#menu_body").css("left", "-" + $("#menu_body").css("width"));
    $("#menu_container").hide();
};