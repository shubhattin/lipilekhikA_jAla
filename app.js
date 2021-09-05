let config = ["local", "web"];
class अनुप्रयोगः {
    constructor(mode) {
        this.mode = mode;
        this.env = "";
        this.time = 0;
        this.c = 0;
        this.lang_texts = {};
        this.pratyaya_sanchit = {
            "web": "https://cdn.jsdelivr.net/gh/ofsfobnelip/b/src",
            "local": "src"
        } [mode];
        this.translate = (f, t, v) => {
            v = `https://translate.google.com/?sl=${f}&tl=${t}&text=${encodeURIComponent(v)}&op=translate`;
            window.open(v, "_blank");
        };
        this.karya = true;
        this.sahayika_usage = true;
        this.loaded_display_lng = [];
        this.pages = ["inter", "about"];
        this.antar_loaded = false;
        this.menu_sthiti = false;
        this.br = '<span class="line-break"></span>';
        this.lipyaH = {
            'Hindi': 'हिन्दी',
            'Bengali': 'বাংলা',
            'Telugu': 'తెలుగు',
            'Tamil': 'தமிழ்',
            'Marathi': 'मराठी',
            'Gujarati': 'ગુજરાતી',
            'Malayalam': 'മലയാളം',
            'Kannada': 'ಕನ್ನಡ',
            'Oriya': 'ଓଡ଼ିଆ',
            'Konkani': 'कोंकणी',
            'Assamese': 'অসমীয়া',
            'Sanskrit': 'संस्कृतम्',
            'Nepali': 'नेपाली',
            'Punjabi': 'ਪੰਜਾਬੀ',
            'Urdu': '  اُردُو',
            'Kashmiri': ' كٲشُر',
            'Romanized': 'Romanized',
            'Sinhala': 'සිංහල',
            'Tamil-Extended': 'தமிழ்-Extended',
            'Sharada': 'शारदा',
            'Modi': 'मोडी',
            'Siddham': 'सिद्धम्',
            'Granth': 'கிரந்த (தமிழ்)',
            'Brahmi': 'ब्राह्मी'
        };
        this.up_lipyaH = ["Siddham", "Brahmi", "Sharada", "Modi", "Granth"];
        this.anulipyaH = LIPI.dict_rev(this.lipyaH);
        this.anulipyaH["English"] = "English";
        this.once_editded = false;
        this.inter_on_off = [false, false];
        this.do_not = false;
        this.auto = !false;
        this.html_initialized = false;
        this.current_page = "main";
        this.args = this.getUrlVars();
    };
    init_html() {
        let yuj = (x, y) => jQuery(y).appendTo(x);
        if (true) { //main1
            let el = $("#back_btn").click(() => {
                app.change_page("main");
                $("#back_btn").hide();
            });
            el.css("display", "none");
            $("#parivartak").click(() => {
                app.change_page("inter");
            });
            $("#up_usage").click(() => {
                app.set_image($("#main_lang").val());
                $('#prayog').show();
                $('#main1').hide();
            });
        }
        if (true) { //menu
            let left = 230,
                time = 170,
                op = "0.43";
            yuj("#menu_body", `<style>@keyframes menu_Agama{from{left:-${left}px}to{left:0px}}@keyframes menu_gama{to{left:-${left}px}from{left:0px}}@keyframes main_opac_add{from{opacity:1}to{opacity:${op}}}@keyframes main_opac_remove{to{opacity:1}from{opacity:${op}}}</style>`)
            $("#menu_body").css("left", `-${left}px`)
            $("#menu_btn").click(() => {
                $("html, body").css({
                    "overflow": "hidden",
                    "height": "100%"
                });
                $("#menu_container").show();
                $("#menu_body").css({
                    "animation-name": "menu_Agama",
                    "animation-duration": `${time}ms`,
                    "left": "0px"
                });
                setTimeout(() => $("#menu_blocker").show(), time);
                $("#main_section").css({
                    "animation-name": "main_opac_add",
                    "animation-duration": `${time-80}ms`,
                    "opacity": op
                });
                app.menu_sthiti = true;
            });
            $("#menu_blocker").click(() => {
                $("html, body").attr("style", "");
                app.menu_sthiti = false;
                $("#menu_blocker").hide();
                $("#menu_body").css({
                    "animation-name": "menu_gama",
                    "animation-duration": `${time+10}ms`,
                    "left": `-${left}px`
                });
                setTimeout(() => $("#menu_container").hide(), time + 10);
                $("#main_section").css({
                    "animation-name": "main_opac_remove",
                    "animation-duration": `${time-80}ms`,
                    "opacity": "1"
                });
            });
            for (let p in display_lang_list[0]) {
                let v = display_lang_list[0][p];
                yuj("#app_lang", `<option tlt="${p}" value="${v}" class="langsw titles">${v}</option>`)
            };
            $("#app_lang").on("change", function () {
                let v = LIPI.get_value('app_lang');
                let exec = () => {
                    app.store_values('app_lang', LIPI.get_value('app_lang'));
                    app.set_lang_text();
                    app.set_font_size();
                    app.add_convert_msg();
                };
                if (!LIPI.includes(app.loaded_display_lng, v)) {
                    app.loaded_display_lng.push(v);
                    $.ajax({
                        url: app.pratyaya_sanchit + `/lang/${v}.json`,
                        dataType: "json",
                        success: (result) => {
                            app.lang_texts[v] = result;
                            exec();
                        }
                    });
                } else exec();
            });
            $($("#about_button").parent()).click(() => {
                app.change_page('about');
                $("#menu_blocker").trigger("click");
            });
        }
        if (true) { //about
            $("#lic").click(() => {
                $.ajax({
                    url: app.pratyaya_sanchit + `/LICENCE.txt`,
                    dataType: "text",
                    success: (result) => {
                        $("#licence").html(LIPI.replace_all(result, "\n", app.br));
                        $("#licence").show();
                        $("#lic").hide();
                    }
                });
            });
        }
        if (true) { //main
            $("#sahayika_switch").click(() => {
                app.set_onoff_img(1);
            });
            $("#lekhan_sahayika").click(function () {
                this.style.color = 'white';
                $("#sahayika_switch").trigger("click");
                setTimeout(() => $('#lekhan_sahayika').css("color", ""), 250);
            });
            $("#sa_04").click(() => {
                LipiLekhikA.sa_lang = 0;
            });
            $("#sa_14").click(() => {
                LipiLekhikA.sa_lang = 1;
            });
            $('#dynamic').summernote({
                toolbar: [
                    ['style', ['bold', "italic", 'clear', "undo", "redo"]]
                ],
                focus: true,
            });
            $("#dynamic").remove();
            $(".note-editable")[0].id = "dynamic";
            let elm = $("#dynamic");
            elm.attr({
                spellcheck: "false",
                autocapitalize: "none",
                autocomplete: "off",
                autocorrect: "off",
                class: "Lipi-LekhikA titles",
                tlt: "mukhya_lekhan"
            });
            elm.css({
                padding: "4px"
            });
            $(".note-toolbar").css("background-color", "white");
            $(".note-btn").css("border", "1px solid black");
            $("#table_btn").click(() => {
                app.set_image($("#main_lang").val());
                $('#prayog').show();
                $('#main1').hide();
            });
            $(".note-style").before('<select class="lang block titles" tlt="typ_lang" id="main_lang"></select>');
            $("#main_lang").on("change", () => {
                let jkl = () => {
                    let ak = LIPI.get_value('main_lang');
                    LipiLekhikA.script = ak;
                    app.store_values('script', ak);
                    if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], ak))
                        $("#sa_mode").hide();
                    else
                        $("#sa_mode").show();
                    app.set_sa_val();
                    LipiLekhikA.akSharANi = LIPI.akSharAH[ak];
                    LipiLekhikA.sa_lang = LipiLekhikA.akSharANi['く'];
                    app.add_direction($("#dynamic"), LIPI.get_value("main_lang"));
                    if (!app.once_editded)
                        app.add_direction($("#first"), LIPI.get_value("main_lang"));
                };
                LipiLekhikA.set_lang_and_state($("#main_lang").val(), jkl);
            });
            $(".note-style").after('<span id="main_switch" tlt="imgon" img_off="imgoff" img_on="imgon" class="imgs titles checkbox_img"></span>');
            $("#main_switch").click(() => {
                app.set_onoff_img(0);
            });
            $("#main_switch").after('<button id="cp1" class="cpy_btn titles" tlt="cpy_btn"></button>');
            $("#cp1").click(() => {
                app.copy_text('dynamic', 1);
                setTimeout(function () {
                    document.execCommand("copy");
                }, 1);
            });
            let y = "";
            let cn = 0;
            for (let x in app.lipyaH) {
                cn++;
                if (cn % 5 == 1)
                    y += "<div>"
                y += `<a class='bhAShAnyAH dvayam-right-anya-bhAShA' href='https://app.lipilekhika.com/lang/${x}' target='_blank' id='title_${x}'>${app.lipyaH[x]} (<span class='bhAShAnyAH_name' id='link_${x}'></span>)${x!="Brahmi"?",":""}</a>`;
                if (cn % 5 == 0)
                    y += "</div>";
            }
            yuj("#bhaashhaah1", y);
        }
        if (true) { //inter prayog cha
            $("#lang1").on("change", () => {
                if (app.auto) {
                    function hjk() {
                        $('#first').val(LipiLekhikA.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
                    }
                    LIPI.load_lang(LIPI.get_value("lang1"), hjk);
                } else
                    LIPI.load_lang(LIPI.get_value("lang1"));
                app.add_direction($("#first"), LIPI.get_value("lang1"));
                app.add_convert_msg();
                $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
            });
            $(".img_inter1").click(() => {
                app.inter_on_off[0] = !app.inter_on_off[0];
                $("#first").attr("lipi-lekhika", {
                    true: "on",
                    false: "off"
                } [app.inter_on_off[0]]);
            });
            $("#set_text2").click(() => app.set_inter_values(1));
            $("#cp2").click(() => app.copy_text('first'));
            $("#first").on("input", function () {
                app.edited();
                if (app.auto)
                    $('#second').val(LipiLekhikA.antarparivartan(this.value, $('#lang1').val(), $('#lang2').val()));
            });
            $("#lang2").on("change", () => {
                if (app.auto) {
                    function jk() {
                        $('#second').val(LipiLekhikA.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
                    }
                    LIPI.load_lang(LIPI.get_value("lang2"), jk);
                } else
                    LIPI.load_lang(LIPI.get_value("lang2"));
                app.add_direction($("#second"), LIPI.get_value("lang2"));
                app.add_convert_msg();
                $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
            });
            $("#cp3").click(() => app.copy_text('second'));
            $("#set_text1").click(() => app.set_inter_values(2));
            $(".img_inter2").click(() => {
                app.inter_on_off[1] = !app.inter_on_off[1];
                $("#second").attr("lipi-lekhika", {
                    true: "on",
                    false: "off"
                } [app.inter_on_off[1]]);
            });
            $("#second").on("input", function () {
                app.edited();
                if (app.auto)
                    $('#first').val(LipiLekhikA.antarparivartan(this.value, $('#lang2').val(), $('#lang1').val()));
            });
            $("#close1_img").click(() => {
                $('#prayog').hide();
                $('#main1').show();
            });
            $("#xcv").on("change", () => {
                app.set_image();
            });
            $("#hide_warning").click(() => {
                $("#warning1").hide();
            });
            $("#auto_img").click(() => {
                app.auto = !app.auto;
                LIPI.get_element("auto_img").style.backgroundColor = `${app.auto?"#ff6464":"lightgreen"}`;
                if (!app.auto) {
                    $("#up_arrow_img").show();
                    $("#down_arrow_img").show();
                } else {
                    $("#up_arrow_img").hide();
                    $("#down_arrow_img").hide();
                }
            });
            $("#auto_img").trigger("click");
            $("#down_arrow_img").click(() => $('#second').val(LipiLekhikA.antarparivartan(LIPI.get_value("first"), $('#lang1').val(), $('#lang2').val())));
            $("#up_arrow_img").click(() => $('#first').val(LipiLekhikA.antarparivartan(LIPI.get_value("second"), $('#lang2').val(), $('#lang1').val())));
        }
        this.html_initialized = true;
    };
    add_convert_msg() {
        let db = app.lang_texts[LIPI.get_value('app_lang')];
        let data = db.scripts;
        db = db.others;
        let val = [LIPI.get_value("lang1"), LIPI.get_value("lang2")];
        val[0] = data[val[0]][0];
        val[1] = data[val[1]][0];
        let elm = [$("#down_arrow_img")[0], $("#up_arrow_img")[0]];
        elm[0].title = `${db.convert} :- ${val[0]}➠ ${val[1]}`;
        elm[1].title = `${db.convert} :- ${val[1]}➠ ${val[0]}`;
    };
    edited() {
        this.once_editded = true;
    };
    add_direction(i, lang) {
        if (LIPI.includes(["Urdu", "Kashmiri"], lang)) {
            i.attr("dir", "rtl");
        } else
            i.attr("dir", "ltr");
    };
    set_sa_val() {
        let src = LIPI.get_value("main_lang");
        let val = ajay[src];
        LIPI.get_element(`sa_${LIPI.akSharAH[src]["く"]}4`).checked = true;
        if (LIPI.includes(["Romanized", "Normal", "Urdu"], src))
            val += " ";
        let extra = 0;
        if (LIPI.includes(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], src))
            extra++;
        let val1 = val.substring(0, val.length - 1 - extra);
        LIPI.get_element("sa_0").innerHTML = "ajay ➠ " + val1;
        LIPI.get_element("sa_1").innerHTML = "ajay ➠ " + val;
    };
    change_page(to) {
        $(`#${app.current_page}`).hide();
        $(`#${to}`).show();
        if (to == "inter" && !app.once_editded) {
            let exec = () => {
                $("#lang1").val(LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], LipiLekhikA.script) ? "Devanagari" : LipiLekhikA.script);
                $("#lang2").val("Romanized");
                $("#first").val(LIPI.get_Text_from_div($("#dynamic").html()));
                $('#second').val(LipiLekhikA.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
                $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
                $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
            };
            if (!app.antar_loaded) {
                LIPI.load_inter_converter(exec);
                app.antar_loaded = true;
            } else
                exec();
        } else if (to == "prayog")
            $("#main1").hide();
        else if (app.current_page == "prayog")
            $("#main1").show();
        else if (to == "main")
            $("#parivartak").css("visibility", "visible");
        if (LIPI.includes(["inter", "about"], to)) {
            $("#parivartak").css("visibility", "hidden");
            $("#back_btn").show();
        }
        app.current_page = to;
    };
    set_image(val = $("#xcv").val()) {
        let data = this.lang_texts[$("#app_lang").val()],
            elm = $('#image');
        let v = `${data.scripts[val][0]} - ${data.title.image}`;
        $("#xcv").val(val);
        elm.attr("src", LipiLekhikA.usage_table_link(val));
        elm.attr({
            title: v,
            alt: v
        });
    };
    set_inter_values(n) {
        if (n == 1) {
            $("#lang1").val(LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], LipiLekhikA.script) ? "Devanagari" : LipiLekhikA.script);
            $("#first").val(LIPI.get_Text_from_div($("#dynamic").html()));
            if (app.auto)
                $('#second').val(LipiLekhikA.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
        } else {
            $("#lang2").val(LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], LipiLekhikA.script) ? "Devanagari" : LipiLekhikA.script);
            $("#second").val(LIPI.get_Text_from_div($("#dynamic").html()));
            if (app.auto)
                $('#first').val(LipiLekhikA.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
        }
    };
    selectText(id) {
        var sel, range;
        var el = document.getElementById(id); //get element id
        if (window.getSelection && document.createRange) { //Browser compatibility
            sel = window.getSelection();
            if (sel.toString() == '') { //no text selection
                window.setTimeout(function () {
                    range = document.createRange(); //range object
                    range.selectNodeContents(el); //sets Range
                    sel.removeAllRanges(); //remove all ranges from selection
                    sel.addRange(range); //add Range to a Selection.
                }, 1);
            }
        } else if (document.selection) { //older ie
            sel = document.selection.createRange();
            if (sel.text == '') { //no text selection
                range = document.body.createTextRange(); //Creates TextRange object
                range.moveToElementText(el); //sets Range
                range.select(); //make selection.
            }
        }
    };
    copy_text(element, mode = 0) {
        if (mode == 1) {
            this.selectText(element);
            return;
        }
        var copyText = LIPI.get_element(element);
        copyText.select();
        copyText.setSelectionRange(0, copyText.value.length + 2);
        document.execCommand("copy");
    };
    set_lang_text(val = LIPI.get_value("app_lang")) {
        let data = app.lang_texts[val];
        let g = (df) => LIPI.replace_all(df, "\n", this.br);
        $("title").html(data.others.page_title);
        for (let x of $(".lipi")) {
            let el = $(x);
            let n = el.attr("lipi");
            let nm = g(data.lipi[n]);
            if (n == "about_text")
                nm = LIPI.replace_all(LIPI.replace_all(nm, "{1}", "</a>"), "{0}", "<a href='https://rebrand.ly/lekhika' target='_blank'>");
            el.html(nm);
        };
        for (let x in data.scripts) {
            let v = data.scripts[x];
            $("." + x).html(`${v[0]} (${v[1]})`);
            $("#link_" + x).html(`${v[0]}`);
        };
        LipiLekhikA.set_interface_lang(this.anulipyaH[val]);
        for (let y of $(".titles")) {
            let el = $(y);
            let val = data.title[el.attr("tlt")];
            el.attr({
                "title": val,
                "alt": val
            });
        }
        for (let x in this.lipyaH) {
            let val = data["scripts"][x][0];
            $("#title_" + x).attr({
                "title": val,
                "alt": val
            });
        };
    };
    set_font_size() {
        let x = lang_sizes[LIPI.get_value("app_lang")];
        LIPI.get_element("main_section").style.fontSize = `${10+x}px`;
        $("html").attr("lang", lang_sizes.codes[LIPI.get_value("app_lang")]);
    };
    set_onoff_img(mode) {
        let data = this.lang_texts[LIPI.get_value("app_lang")]["title"];
        if (mode == 0) {
            this.karya = !this.karya;
            let elm = $("#dynamic"),
                msg = "lipi-lekhika";
            let val = [
                ["off", "on"],
                ""
            ];
            val[1] = val[0][this.karya ? 1 : 0];
            if (this.karya)
                elm.attr(msg, val[1]);
            else
                elm.attr(msg, val[1]);
            let cl = `img${val[1]}`;
            elm = $("#main_switch");
            let v = data[cl];
            elm.attr({
                "title": v,
                "alt": v,
                tlt: "img" + val[1]
            });
        } else if (mode == 1) {
            this.sahayika_usage = !this.sahayika_usage;
            let elm = $("#dynamic"),
                msg = "lekhan-sahayika";
            let val = [
                ["off1", "on1"],
                ""
            ];
            val[1] = val[0][this.sahayika_usage ? 1 : 0];
            let vl = LIPI.substring(val[1], 0, -1);
            if (this.sahayika_usage)
                elm.attr(msg, vl);
            else
                elm.attr(msg, vl);
            let cl = `img${val[1]}`;
            elm = $("#sahayika_switch");
            let v = data[cl];
            elm.attr({
                "title": v,
                "alt": v,
                tlt: "img" + val[1]
            });
        }
    };
    store_values(name, val, defal = false) {
        if (defal) {
            switch (name) {
                case "script":
                    storage.setItem("script", "Hindi")
                    break;
                case "app_lang":
                    storage.setItem("app_lang", "English");
                    break;
            }
        } else {
            if (!LIPI.includes(["app_lang", "script"], name))
                return;
            switch (name) {
                case "script":
                    if (!LIPI.includes(lang_list, val))
                        return;
                    break;
                case "app_lang":
                    if (!(val in display_lang_list[1]))
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
                    if (!LIPI.includes(lang_list, val)) {
                        val = "Hindi";
                        this.store_values("script", val);
                    }
                    break;
                case "app_lang":
                    if (!(val in display_lang_list[1])) {
                        val = "English";
                        this.store_values("app_lang", val);
                    }
                    break;
            }
            return val;
        } else {
            this.store_values(name, "", true);
            return app.get_values(name);
        }
    };
    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    };
    initialize(device) {
        this.env = device;
        if (device == "android") {
            $(".web_only").hide();
            LipiLekhikA.only_web_status = false;
            let elm = $(LipiLekhikA.sahayika.bhaNDAra.pashchAta[0]).children()[0];
            elm.removeAttribute("href");
            elm.removeAttribute("target");
        }
        let vbn = ["xcv", "lang1", "lang2", "main_lang"];
        for (let x in vbn) {
            let j = "";
            for (let y in lang_list) {
                if ((vbn[x] == "xcv" && lang_list[y] == "Normal") || lang_list[vbn] == "Vedic") continue;
                if (lang_list[y] == "Devanagari" && !LIPI.includes(["lang1", "lang2"], vbn[x])) continue;
                if (lang_list[y] == "Normal" && vbn[x] == "main_lang") continue;
                if (LIPI.includes(["lang1", "lang2"], vbn[x]) && LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], lang_list[y])) continue;
                j += `<option value="${lang_list[y]}" class="${lang_list[y]}"></option>`;
            }
            LIPI.set_html(vbn[x], j);
        }
        LIPI.get_element("xcv").innerHTML += "<option id='Vedic' value='Vedic'>Vedic Additions</option>"
        LIPI.set_html("paricaya", "भारते रचितः<span class='line-break'></span>E-mail : <a href='mailto:lipilekhika@gmail.com' class='mail'>lipilekhika@gmail.com</a>");
        $("#main_section").css("display", "block");
    };
    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    };
};
let display_lang_list = [{
    "en-in": "English",
    "hi-in": "हिन्दी",
    "ta-in": "தமிழ்",
    "te-in": "తెలుగు",
    "kn-in": "ಕನ್ನಡ",
    "bn-in": "বাংলা",
    "sa-in": "संस्कृतम्",
}, {}];
display_lang_list[1] = LIPI.dict_rev(display_lang_list[0]);
let lang_list = ["Devanagari", 'Hindi', 'Bengali', 'Telugu', 'Tamil', 'Marathi', 'Gujarati', 'Malayalam', 'Kannada', 'Oriya', 'Konkani', 'Assamese', 'Sanskrit', 'Tamil-Extended', 'Nepali', 'Punjabi', "Sinhala", 'Urdu', 'Kashmiri', 'Sharada', 'Modi', 'Siddham', 'Granth', 'Brahmi', "Romanized", "Normal"];
//Display Language Files
let ajay = {
    "Hindi": "अजय्",
    "Sharada": "𑆃𑆘𑆪𑇀",
    "Modi": "𑘀𑘕𑘧𑘿",
    "Siddham": "𑖀𑖕𑖧𑖿",
    "Granth": "𑌅𑌜𑌯𑍍",
    "Brahmi": "𑀅𑀚𑀬𑁆",
    "Sanskrit": "अजय्",
    "Nepali": "अजय्",
    "Marathi": "अजय्",
    "Konkani": "अजय्",
    "Sinhala": "අජය්",
    "Tamil": "அஜய்",
    "Tamil-Extended": "அஜய்",
    "Telugu": "అజయ్",
    "Malayalam": "അജയ്",
    "Kannada": "ಅಜಯ್",
    "Bengali": "অজয্",
    "Oriya": "ଅଜଯ୍",
    "Assamese": "অজয্",
    "Gujarati": "અજય્",
    "Punjabi": "ਅਜਯ੍",
    "Urdu": "اجَی ",
    "Kashmiri": "اجَی ",
    "Romanized": "ajay ",
    "Normal": "ajay "
};
let lang_sizes = {
    "English": 0,
    "हिन्दी": 0.5,
    "தமிழ்": -0.45,
    "తెలుగు": 0.5,
    "ಕನ್ನಡ": 0.5,
    "বাংলা": 0.5,
    "संस्कृतम्": 0.5,
    "codes": {
        "English": "en",
        "हिन्दी": "hi",
        "தமிழ்": "ta",
        "తెలుగు": "te",
        "ಕನ್ನಡ": "kn",
        "বাংলা": "bn",
        "संस्कृतम्": "sa",
    }
};
let app = new अनुप्रयोगः(config[0]);
let storage = window.localStorage;
let ah = app.args;
let args = {};
for (x in ah) {
    if (x == "app_lang") {
        let v = decodeURIComponent(ah[x]);
        if (v in lang_sizes.codes)
            args[x] = v;
        else
            args[x] = "English";
    } else if (x == "lang") {
        let v = ah[x];
        if (v in app.lipyaH)
            args[x] = v;
        else
            args[x] = "Hindi";
    } else if (x == "mode") {
        let v = ah[x];
        if (LIPI.includes(["main", "inter"], v))
            args[x] = v;
        else
            args[x] = "main";
    } else if (x == "lang_to") {
        let v = ah[x];
        if (v in app.lipyaH || v == "Devanagari")
            args[x] = v;
        else
            args[x] = "Romanized";
    } else if (x == "lang_from") {
        let v = ah[x];
        if (v in app.lipyaH || v == "Devanagari")
            args[x] = v;
        else
            args[x] = "Devanagari";
    } else if (x == "dev" && config[0] == "local")
        if (ah[x] == "amam")
            args[x] = ah[x];
};
let lng1 = app.get_values("app_lang");
if ("app_lang" in args)
    lng1 = args["app_lang"];
$.ajax({
    url: app.pratyaya_sanchit + `/lang/${lng1}.json`,
    dataType: "json",
    success: (result) => {
        $.ajax({
            url: LIPI.substring(app.pratyaya_sanchit, 0, -3) + "app.asp",
            dataType: "text",
            success: (result) => {
                result = LIPI.replace_all(result, "<br>", app.br);
                $("body").append(result);
                app.init_html();
                $("#bdy").children().hide();
                app.initialize(config[1]);
                app.set_lang_text(lng1);
                on_loaded();
            }
        });
        app.lang_texts[lng1] = result;
    }
});

window.history.pushState(null, "", window.location.href);
window.onpopstate = () => {
    $("title").html($("title").html());
    $(".lipi_icon").remove();
    add_icon();
    let t = LIPI.time();
    let back = false;
    let hde = () => $("#back_btn").hide();
    if (!back)
        window.history.pushState(null, "", window.location.href);
    if (app.menu_sthiti)
        $("#menu_blocker").trigger("click");
    else if (LIPI.includes(app.pages, app.current_page)) {
        app.change_page("main");
        hde();
    }
    app.time = LIPI.time();
    app.c++;
};
let icon_link = $("#lipi_icon").attr("href");

function add_icon() {
    let pra = icon_link;
    for (x of ["icon", "shortcut icon", "apple-touch-icon"])
        $("head").append(`<link rel="${x}" type="image/png" href="${pra}" class="lipi_icon">`);
};
add_icon();
let debug = false;
if ("dev" in args)
    debug = args["dev"] == "amam";
if (!debug)
    window.onbeforeunload = () => "Do you really want to Leave";
$("#lipi_icon").remove();

function on_loaded() {
    if (!("app_lang" in args))
        LIPI.set_value("app_lang", app.get_values("app_lang"));
    else
        LIPI.set_value("app_lang", args["app_lang"]);
    let lng = LIPI.get_value("app_lang");
    app.loaded_display_lng.push(lng);
    if (!("lang" in args))
        LIPI.set_value("main_lang", app.get_values("script"));
    else
        LIPI.set_value("main_lang", args["lang"]);
    if ("mode" in args) {
        app.current_page = args["mode"];
        $("#parivartak").css("visibility", "hidden");
    }
    $(`#${app.current_page}`).show();
    if (!("lang" in args) && "lang_from" in args)
        LIPI.set_value("main_lang", args["lang_from"]);
    let val = "";
    if (!("lang_from" in args))
        val = LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], LIPI.get_value("main_lang")) ? "Devanagari" : LIPI.get_value("main_lang");
    else
        val = LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], args["lang_from"]) ? "Devanagari" : args["lang_from"];
    LIPI.set_value("lang1", val);
    let lang_2 = "Romanized";
    if ("lang_to" in args)
        lang_2 = args["lang_to"];
    LIPI.set_value("lang2", lang_2);
    LIPI.load_lang($("#lang2").val());
    LIPI.load_lang($("#lang1").val());
    $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
    $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
    let akl = LIPI.get_value("main_lang");
    LipiLekhikA.set_lang_and_state(akl, app.set_sa_val, true);
    LIPI.set_html("menu_btn", '<svg width="35px" height="35px" viewBox="0 0 512 512"><g><path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/><path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/><path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/></g></svg>')
    $(".cpy_btn").html('<svg class="cpy_btn_img" viewBox="0 0 21 22"><g class="प्रति" transform="translate(-86.000000, -127.000000)"><g transform="translate(86.500000, 127.000000)"><path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z"/></g></g></svg>');
    $(".git").html('<svg viewBox="0 0 512 512"><g><path d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14  c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5 c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7 c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3 c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7 C480,134.8,379.7,32,256,32z"/></g></svg>')
    if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], akl))
        $("#sa_mode").hide();
    for (let x of $(".checkbox_img")) {
        let v = x.checked,
            e = $(x);
        if (v == undefined) {
            if (e.attr("img_check") == undefined) {
                x.checked = true;
                v = true;
            } else {
                v = [false, true][e.attr("img_check")];
                x.checked = v;
            }
        }
        let on = e.attr("img_on");
        let off = e.attr("img_off");
        e.addClass({
            true: on,
            false: off
        } [v]);
    }
    $(".checkbox_img").click((event) => {
        let e = $(event.target);
        let el = e[0];
        let v = !el.checked;
        el.checked = v;
        let on = e.attr("img_on");
        let off = e.attr("img_off");
        e.addClass({
            true: on,
            false: off
        } [v]);
        e.removeClass({
            true: off,
            false: on
        } [v]);
    })
    app.add_direction($("#dynamic"), akl);
    app.add_direction($("#first"), LIPI.get_value("lang1"));
    app.add_direction($("#second"), LIPI.get_value("lang2"));
    app.add_convert_msg();
    app.set_font_size();
    $.lipi_lekhika();
    setTimeout(() => {
        $("#dynamic").html("<p></p>");
        $("#first").html("");
        $("#second").html("");
    }, 400);
};