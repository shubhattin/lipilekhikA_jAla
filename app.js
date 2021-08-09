let config = ["local", "web"];
class अनुप्रयोगः {
    constructor(mode) {
        this.mode = mode;
        this.env = "";
        this.time = 0;
        this.c = 0;
        this.lang_texts = {};
        this.pratyaya_sanchit = {
            "web": "https://cdn.jsdelivr.net/gh/nirukta/a@main/src",
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
        this.anulipyaH = LIPI.dict_rev(this.lipyaH);
        this.anulipyaH["English"] = "English";
        this.once_editded = false;
        this.auto = !false;
        this.html_initialized = false;
        this.current_page = "main";
        this.args = this.getUrlVars();
    };
    init_html() {
        let yuj = (x, y) => jQuery(y).appendTo(x);

        function body() {
            yuj("body", `<span id="main_section"></span>`);
            yuj("#main_section", `<span id="main1"></span><span id="prayog"></span>`);
        };

        function mukhya() {
            let val = "#main1",
                t = null;
            yuj(val, `<span id="menu_btn" class="imgs"></span>`);
            t = yuj(val, '<span class="back imgs" id="back_btn"></span>');
            t.click(() => {
                app.change_page("main");
                $("#back_btn").hide();
            });
            t.css("display", "none");

            function menu() {
                yuj("body", `<div id="menu_container"><div id="menu_bhaNDAr"><div id="menu_body"></div></div><div id="menu_blocker"></div></div>`);
                let val = "#menu_body";
                $("#menu_btn").click(() => {
                    $("html, body").css({
                        "overflow": "hidden",
                        "height": "100%"
                    });
                    $("#menu_container").show();
                    let width = 230;
                    $("#menu_bhaNDAr").animate({
                        "width": `${width}px`
                    }, 170);
                    $("#menu_blocker").css("left", `${width+2}px`);
                    $("#main_section").animate({
                        "opacity": "0.43"
                    }, 130);
                    setTimeout(() => $("#menu_body").show(), 200);
                    setTimeout(() => {
                        app.menu_sthiti = true;
                    }, 210);
                });
                $("#menu_blocker").click(() => {
                    $("html, body").attr("style", "");
                    $("#menu_bhaNDAr").animate({
                        "width": "0"
                    }, 120);
                    $("#main_section").animate({
                        "opacity": "1"
                    }, 50);
                    setTimeout(() => $("#menu_container").hide(), 70);
                    setTimeout(() => $("#menu_body").hide(), 60);
                    setTimeout(() => {
                        app.menu_sthiti = false;
                    }, 201);

                });
                yuj(val, `<div id="lang_change_container"></div>`);
                val = "#lang_change_container";
                yuj(val, `<span id="lang_img" class="imgs"></span>`);
                t = yuj(val, `<select id="app_lang"></select>`);
                t.on("change", function () {
                    let v = LIPI.get_value('app_lang');
                    let exec = () => {
                        app.set_cookie('app_lang', LIPI.get_value('app_lang'));
                        app.set_lang_text();
                        app.set_font_size();
                    };
                    if (!LIPI.includes(app.loaded_display_lng, v)) {
                        app.loaded_display_lng.push(v);
                        $.ajax({
                            url: app.pratyaya_sanchit + `/lang/${v}.json`,
                            success: (result) => {
                                app.lang_texts[v] = result;
                                exec();
                            }
                        });
                    } else exec();
                });
                val = "#menu_body";
                t = yuj(val, `<span class="ekam-left menu_borders"><span id="about_button" class="imgs"></span><span id="about_msg" class="menu_msg"></span></span>`);
                t.click(() => {
                    app.change_page('about');
                    $("#menu_blocker").trigger("click");
                });
                yuj(val, `${app.br}<div id="info_links" class="web_only"></div>`);
                val = "#info_links";
                yuj(val, '<div><a target="_blank" class="menu_borders no_under" href="https://rebrand.ly/lekhika"><span class="imgs home_img"></span><span id="home_msg" class="menu_msg"></span></a></div>');
                yuj(val, '<div><a target="_blank" class="menu_borders no_under" href="https://rebrand.ly/lekhikadownload"><span class="imgs download_img"></span><span id="download_msg" class="menu_msg"></span></a></div>');
                yuj(val, '<div><a target="_blank" class="menu_borders no_under" href="https://api.lipilekhika.com/source"><span class="imgs git"></span><span id="source_msg" class="menu_msg"></span></a></div>');
            };
            menu();
            yuj(val, '<button id="parivartak" class="mode_selector"><span id="convert_img" class="imgs"></span><span id="lbl3"></span></button>');
            $("#parivartak").click(() => {
                app.change_page("inter");
            });
            yuj(val, "<span class='usage_btnm imgs' id='up_usage'></span>");
            $("#up_usage").click(() => {
                app.set_image(LipiLekhikA.script);
                LIPI.get_element('prayog').style.display = 'block';
                LIPI.get_element('main1').style.display = 'none';
            });
            val = "#app_lang";
            for (let p in display_lang_list[0]) {
                let v = display_lang_list[0][p];
                yuj(val, `<option id="${p}" value="${v}" class="langsw">${v}</option>`)
            };
            val = "#main1";
            yuj(val, '<div id="bdy"></div>');
            val = "#bdy";
            yuj(val, `<div id="about"></div><div id="main"></div><div id="inter"></div>`);
            val = "#about";

            function about() {
                let val = "#about";
                yuj(val, `${app.br}<p id="about_text"></p><p id="paricaya"></p></span>${app.br}<button id="lic"></button>`);
                yuj(val, "<span class='web_only dvayam-left' class='dvayam-left'><a href='https://api.lipilekhika.com/source' target='_blank'><span id='git' class='imgs git'></span></a></span>");
                yuj(val, `${app.br}<div id="licence"></div>`);
                $("#lic").click(() => {
                    $.ajax({
                        url: app.pratyaya_sanchit + `/LICENCE.txt`,
                        success: (result) => {
                            $("#licence").html(LIPI.replace_all(result, "\n", app.br));
                            $("#licence").show();
                            $("#lic").hide();
                        }
                    });
                });
            };
            about();

            function main() {
                let val = "#main";
                yuj(val, '<span id="sa_mode" class="dvayam-right"></span>');
                val = "#sa_mode";
                yuj(val, '<input type="radio" name="sanskrit" id="sa_04"></input><label for="sa_04" id="sa_0" class="black-yeloow"></label>');
                yuj(val, '<input type="radio" name="sanskrit" id="sa_14"></input><label for="sa_14" id="sa_1" class="black-yellow"></label>');
                val = "#main";
                let t = yuj(val, '<span id="sahayika_switch" class="imgs"></span>');
                t.click(() => {
                    app.set_onoff_img(1);
                });
                t = yuj(val, `<span id="lekhan_sahayika"></span>${app.br}`);
                t.click(function () {
                    this.style.color = 'black';
                    app.set_onoff_img(1);
                    setTimeout(() => $('#lekhan_sahayika').css("color", ""), 250);
                });
                $("#sa_04").click(() => {
                    LipiLekhikA.sa_lang = 0;
                });
                $("#sa_14").click(() => {
                    LipiLekhikA.sa_lang = 1;
                });
                val = "#main";
                t = yuj(val, '<div id="dynamic"></div>');
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
                    class: "Lipi-LekhikA"
                });
                elm.css({
                    margin: "0",
                    padding: "4px"
                });
                $(".note-toolbar").css("background-color", "white");
                $(".note-btn").css("border", "1px solid black");
                yuj(val, '<button id="table_btn"><span class="usage_btnm imgs"></span><span id="table"></span></button>');
                $("#table_btn").click(() => {
                    app.set_image(LipiLekhikA.script);
                    LIPI.get_element('prayog').style.display = 'block';
                    LIPI.get_element('main1').style.display = 'none';
                });
                t = $(".note-style").before('<select class="lang block" id="main_lang"></select>');
                $("#main_lang").on("change", () => {
                    let jkl = () => {
                        let ak = LIPI.get_value('main_lang');
                        LipiLekhikA.script = ak;
                        app.set_cookie('script', ak);
                        app.set_image(LipiLekhikA.script);
                        if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], ak))
                            $("#sa_mode").hide();
                        else
                            $("#sa_mode").show();
                        app.set_sa_val();
                        LipiLekhikA.akSharANi = LIPI.akSharAH[ak];
                        LipiLekhikA.sa_lang = LipiLekhikA.akSharANi['く'];
                        app.font_add(ak);
                        app.add_direction($("#dynamic"), LIPI.get_value("main_lang"));
                        if (!app.once_editded)
                            app.add_direction($("#first"), LIPI.get_value("main_lang"));
                    };
                    LipiLekhikA.set_lang_and_state($("#main_lang").val(), jkl);
                });
                $(".note-style").after('<span id="main_switch" class="imgs"></span>');
                $("#main_switch").click(() => {
                    app.set_onoff_img(0);
                });
                $("#main_switch").after('<button id="cp1" class="cpy_btn"></button>');
                $("#cp1").click(() => {
                    app.copy_text('dynamic', 1);
                    setTimeout(function () {
                        document.execCommand("copy");
                    }, 1);
                });
                val = "#main";
                yuj(val, "<div class='web_only' id='bhaashhaah1'></div>");
                val = "#bhaashhaah1";
                let y = "";
                let cn = 0;
                for (let x in app.lipyaH) {
                    cn++;
                    if (cn % 5 == 1)
                        y += "<div>"
                    y += `<a class='bhAShAnyAH' href='https://app.lipilekhika.com/lang/${x}' target='_blank' id='i_${x}'>${app.lipyaH[x]} (<span class='bhAShAnyAH_name' id='o_${x}'></span>)${x!="Brahmi"?",":""}</a><span class="dvayam-right-anya-bhAShA"></span>`;
                    if (cn % 5 == 0)
                        y += "</div>";
                }
                yuj(val, y)
                val = "#bdy";
                val = "#inter";
            };
            main();

            function inter() {
                let val = "#inter";
                let t = yuj(val, '<select class="lang" id="lang1"></select>');
                t.on("change", () => {
                    if (app.auto) {
                        function hjk() {
                            $('#first').val(LipiLekhikA.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
                        }
                        LIPI.load_lang(LIPI.get_value("lang1"), hjk);
                    } else
                        LIPI.load_lang(LIPI.get_value("lang1"));
                    app.add_direction($("#first"), LIPI.get_value("lang1"));
                    app.font_add(LIPI.get_value('lang1'));
                });
                yuj(val, '<span class="ekam-left"></span><button id="set_text2" class="set_text"></button><button id="cp2" class="cpy_btn ekam"></button>');
                $("#set_text2").click(() => {
                    app.set_inter_values(1);
                });
                $("#cp2").click(() => {
                    app.copy_text('first');
                });
                yuj(val, `${app.br}<textarea id="first" class="normal" spellcheck="false" autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>`);
                $("#first").on("input", function () {
                    app.edited();
                    if (app.auto)
                        $('#second').val(LipiLekhikA.antarparivartan(this.value, $('#lang1').val(), $('#lang2').val()));
                });
                yuj(val, `${app.br}<select class="lang" id="lang2"></select>`);
                $("#lang2").on("change", () => {
                    if (app.auto) {
                        function jk() {
                            $('#second').val(LipiLekhikA.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
                        }
                        LIPI.load_lang(LIPI.get_value("lang2"), jk);
                    } else
                        LIPI.load_lang(LIPI.get_value("lang2"));
                    app.add_direction($("#second"), LIPI.get_value("lang2"));
                    app.font_add(LIPI.get_value('lang2'));
                });
                yuj(val, '<button id="set_text1" class="set_text ekam-left"></button><button id="cp3" class="cpy_btn ekam"></button>');
                $("#cp3").click(() => {
                    app.copy_text('second');
                });
                $("#set_text1").click(() => {
                    app.set_inter_values(2);
                });
                yuj(val, '<span id="up_arrow_img" class="imgs ekam-right"></span>');
                yuj(val, '<span id="down_arrow_img" class="imgs ekam-right"></span>');
                yuj(val, '<span id="auto_img" class="imgs ekam-left"></span>');
                yuj(val, `${app.br}<textarea id="second" class="normal" spellcheck="false" autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>`);
                $("#second").on("input", function () {
                    app.edited();
                    if (app.auto)
                        $('#first').val(LipiLekhikA.antarparivartan(this.value, $('#lang2').val(), $('#lang1').val()));
                });
                yuj(val, "<div><span id='no_prvrtn'></span></div>");
                val = "#prayog";
                yuj(val, `<select class="lang" id="xcv"></select><span id="close1_img" class="imgs"></span>${app.br}<img id="image"><div id="shoonyam"></div>`);
                $("#close1_img").click(() => {
                    $('#prayog').hide();
                    $('#main1').show();
                });
                $("#xcv").on("change", () => {
                    app.set_image();
                });
                yuj("#inter", "<div id='warning1'><span id='warning'></span><span id='hide_warning'>❌</span></div>");
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
                $("#down_arrow_img").click(() => {
                    $('#second').val(LipiLekhikA.antarparivartan(LIPI.get_value("first"), $('#lang1').val(), $('#lang2').val()));
                });
                $("#up_arrow_img").click(() => {
                    $('#first').val(LipiLekhikA.antarparivartan(LIPI.get_value("second"), $('#lang2').val(), $('#lang1').val()));
                });
            };
            inter();
        };
        body();
        mukhya();
        this.html_initialized = true;
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
    font_add(lang) {
        LipiLekhikA.add_font(lang, this.pratyaya_sanchit + "/fonts");
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
    set_image(val = LIPI.get_element("xcv").value) {
        LIPI.get_element("xcv").value = val;
        LIPI.get_element('image').src = LIPI.substring(this.pratyaya_sanchit, 0, -3) + `img/lang/${['Sanskrit', 'Marathi', 'Nepali', 'Konkani'].includes(val) ? 'Hindi' : (val == 'Kashmiri' ? 'Urdu' : val)}.png`;
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
        $("title").html(data["t"]);
        for (let x in data["values"]) {
            let nm = g(data["values"][x]);
            if (x == "about_text")
                nm = LIPI.replace_all(LIPI.replace_all(nm, "{1}", "</a>"), "{0}", "<a href='https://rebrand.ly/lekhika' target='_blank'>");
            LIPI.set_html(x, nm);
        };
        for (let x in data["scripts"]) {
            LIPI.set_html("1" + x, data["scripts"][x]);
            LIPI.set_html("2" + x, data["scripts"][x]);
            LIPI.set_html("3" + x, data["scripts"][x]);
            LIPI.set_html("o_" + x, LIPI.substring(data["scripts"][x], 0, -4));
            LIPI.set_html(x, data["scripts"][x]);
        };
        LipiLekhikA.set_interface_lang(this.anulipyaH[val]);
        for (let x in data["title"]) {
            let val = data["title"][x];
            $(x).attr({
                "title": val,
                "alt": val
            });
        }
        for (let x in this.lipyaH) {
            let val = LIPI.substring(data["scripts"][x], 0, -4);
            $("#i_" + x).attr({
                "title": val,
                "alt": val
            });
        }
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
                msg = "Lipi-LekhikA-Off";
            if (this.karya)
                elm.removeClass(msg);
            else
                elm.addClass(msg);
            let val = [
                ["off", "on"],
                ""
            ];
            val[1] = val[0][this.karya ? 1 : 0];
            let cl = `img${val[1]}`;
            elm = $("#main_switch").addClass(cl);
            elm.removeClass(`img${val[0][Math.abs(val[0].indexOf(val[1])-1)]}`);
            let v = data["." + cl];
            elm.attr({
                "title": v,
                "alt": v
            });
        } else if (mode == 1) {
            this.sahayika_usage = !this.sahayika_usage;
            let elm = $("#dynamic"),
                msg = "Lekhan-SahAyikA-Off";
            if (this.sahayika_usage)
                elm.removeClass(msg);
            else
                elm.addClass(msg);
            let val = [
                ["off1", "on1"],
                ""
            ];
            val[1] = val[0][this.sahayika_usage ? 1 : 0];
            let cl = `img${val[1]}`;
            elm = $("#sahayika_switch").addClass(cl);
            elm.removeClass(`img${val[0][Math.abs(val[0].indexOf(val[1])-1)]}`);
            let v = data["." + cl];
            elm.attr({
                "title": v,
                "alt": v
            });
        }
    };
    set_cookie(name, val, defal = false) {
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
    get_cookie(name) {
        if (name in storage) {
            let val = storage[name];
            switch (name) {
                case "script":
                    if (!LIPI.includes(lang_list, val)) {
                        val = "Hindi";
                        this.set_cookie("script", val);
                    }
                    break;
                case "app_lang":
                    if (!(val in display_lang_list[1])) {
                        val = "English";
                        this.set_cookie("app_lang", val);
                    }
                    break;
            }
            return val;
        } else {
            this.set_cookie(name, "", true);
            return app.get_cookie(name);
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
        let niy = ["3", "1", "2", ""];
        for (let x in vbn) {
            let j = "";
            for (let y in lang_list) {
                if ((vbn[x] == "xcv" && lang_list[y] == "Normal") || lang_list[vbn] == "Vedic") continue;
                if (lang_list[y] == "Devanagari" && !LIPI.includes(["lang1", "lang2"], vbn[x])) continue;
                if (lang_list[y] == "Normal" && vbn[x] == "main_lang") continue;
                if (LIPI.includes(["lang1", "lang2"], vbn[x]) && LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], lang_list[y])) continue;
                j += `<option value="${lang_list[y]}" id="${niy[vbn.indexOf(vbn[x])]}${lang_list[y]}"></option>`;
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
    "sa": "संस्कृतम्",
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
let lng1 = app.get_cookie("app_lang");
if ("app_lang" in args)
    lng1 = args["app_lang"];
$.ajax({
    url: app.pratyaya_sanchit + `/lang/${lng1}.json`,
    success: (result) => {
        app.lang_texts[lng1] = result;
        app.init_html();
        $("#bdy").children().hide();
        app.initialize(config[1]);
        app.set_lang_text(lng1);
        on_loaded();
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
    $(".cpy_btn").html("<span class='imgs cpy_btn_img'></span>");
    // $("#main_switch").addClass(`img${["off","on"][LipiLekhikA.karya?1:0]}`);
    $("#main_switch").addClass(`imgon`);
    // $("#sahayika_switch").addClass(`img${["off1","on1"][LipiLekhikA.sahayika_usage?1:0]}`);
    $("#sahayika_switch").addClass(`imgon1`);
    if (!("app_lang" in args))
        LIPI.set_value("app_lang", app.get_cookie("app_lang"));
    else
        LIPI.set_value("app_lang", args["app_lang"]);
    let lng = LIPI.get_value("app_lang");
    app.loaded_display_lng.push(lng);
    if (!("lang" in args))
        LIPI.set_value("main_lang", app.get_cookie("script"));
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
    LIPI.load_lang(LIPI.get_value("lang2"));
    LIPI.load_lang(LIPI.get_value("lang1"));
    let akl = LIPI.get_value("main_lang");
    LipiLekhikA.set_lang_and_state(akl, app.set_sa_val, true);
    app.font_add(akl);
    app.set_image(akl);
    if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], akl))
        $("#sa_mode").hide();
    app.font_add(LIPI.get_value("lang1"));
    app.font_add(LIPI.get_value("lang2"));
    app.add_direction($("#dynamic"), akl);
    app.add_direction($("#first"), LIPI.get_value("lang1"));
    app.add_direction($("#second"), LIPI.get_value("lang2"));
    app.set_font_size();
    $.lipi_lekhika();
};