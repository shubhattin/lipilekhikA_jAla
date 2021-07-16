let config = ["local", "web"];
class अनुप्रयोगः {
    constructor(mode) {
        this.mode = mode;
        this.env = "";
        this.time = 0;
        this.c = 0;
        this.lang_texts = {};
        this.pratyaya_sanchit = {
            "web": "https://cdn.jsdelivr.net/gh/jAlasthAnavitaraNamidam/jAlasthAnam/src",
            "local": "src"
        } [mode];
        this.translate = (f, t, v) => {
            v = `https://translate.google.com/?sl=${f}&tl=${t}&text=${encodeURIComponent(v)}&op=translate`;
            window.open(v, "_blank");
        };
        this.loaded_display_lng = [];
        this.pages = ["inter", "about"];
        this.antar_loaded = false;
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
        this.current_page = "main";
        this.args = this.getUrlVars();
    };
    init_html() {
        let add = jQuery;

        function body() {
            let val = "body"
            add("<span>", {
                id: "main_section"
            }).appendTo(val);
        };

        function main_section() {
            let val = "#main_section"
            add("<span>", {
                id: "main1"
            }).appendTo(val);
            add("<span>", {
                id: "prayog"
            }).appendTo(val);
        };

        function main1() {
            let val = "#main1",
                t = null;
            t = $(val).append('<button id="parivartak" class="mode_selector"><span id="convert_img" class="imgs"></span><span id="lbl3"></span></button>');
            $("#parivartak").click(() => {
                app.change_page("inter");
            });
            $(val).append("<span class='usage_btnm imgs' id='up_usage'></span>");
            $("#up_usage").click(() => {
                app.set_image(LipiLekhikA.script);
                LIPI.get_element('prayog').style.display = 'block';
                LIPI.get_element('main1').style.display = 'none';
            });
            t = add("<span>", {
                id: "about_button",
                class: "imgs"
            }).appendTo(val);
            t.click(() => {
                app.change_page('about');
            });
            add("<span>", {
                id: "lang_change_container"
            }).appendTo(val);
            val = "#lang_change_container";
            add("<span>", {
                id: "lang_img",
                class: "imgs"
            }).appendTo(val);
            t = add("<select>", {
                id: "app_lang"
            }).appendTo(val);
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
            })
            val = "#app_lang";
            for (let p in display_lang_list[0]) {
                let v = display_lang_list[0][p];
                $(val).append(`<option id="${p}" value="${v}" class="langsw">${v}</option>`)
            }
            val = "#main1";
            val = "#main1";
            $('<div id="bdy"></div>').appendTo(val);
            val = "#bdy";
            $('<div id="about"></div>').appendTo(val);
            $('<div id="main"></div>').appendTo(val);
            $('<div id="inter"></div>').appendTo(val);
            val = "#about";
            $(val).append('<span id="only_web2" class="web_only only_web only_web1"></span>');
            val = "#only_web2";
            $("<a href='https://rebrand.ly/lekhika' target='_blank'><span class='home_img imgs'></span></a>").appendTo(val);
            $(val).append('<span class="ekam"><a href="https://rebrand.ly/lekhikadownload" target="_blank"><span class="download_img imgs"></span></a></span>');
            t = $("<span id='close_img2' class='close_img imgs'></span>").appendTo(val);
            $("#close_img2").click(() => {
                $("#only_web2").hide();
            });
            val = "#about";
            t = $('<span class="back imgs" id="backbutton"></span>').appendTo(val);
            $("#backbutton").click(() => {
                app.change_page("main");
            });
            $(`${app.br}<p id="about_text"></p><p id="paricaya"></p></span>${app.br}<button id="lic"></button>`).appendTo(val);
            $(val).append("<span class='web_only dvayam-left' class='dvayam-left'><a href='https://api.lipilekhika.com/source' target='_blank'><span id='git' class='imgs'></span></a></span>");
            $(val).append(`${app.br}<div id="licence"></div>`);
            val = "#main";
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
            $('<span id="sa_mode" class="dvayam-right"></span>').appendTo(val);
            val = "#sa_mode";
            $('<input type="radio" name="sanskrit" id="sa_04"></input><label for="sa_04" id="sa_0"></label>').appendTo(val);
            $(val).append('<input type="radio" name="sanskrit" id="sa_14"></input><label for="sa_14" id="sa_1"></label>');
            val = "#main";
            t = $('<span id="sahayika_switch" class="imgs"></span>').appendTo(val);
            t.click(() => {
                app.set_onoff_img(1);
            });
            t = $(`<span id="lekhan_sahayika"></span>${app.br}`).appendTo(val);
            t.click(function () {
                this.style.color = 'black';
                app.set_onoff_img(1);
                setTimeout(function () {
                    LIPI.get_element('lekhan_sahayika').style.color = '#8a2be2';
                }, 250);
            });
            $("#sa_04").click(() => {
                LipiLekhikA.sa_lang = 0;
            });
            $("#sa_14").click(() => {
                LipiLekhikA.sa_lang = 1;
            });
            val = "#main";
            t = $('<div id="dynamic"></div>').appendTo(val);
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
                "margin": "0",
                "padding": "4px"
            });
            $(".note-toolbar").css("background-color", "white");
            $(".note-btn").css("border", "1px solid black");
            $('<button id="table_btn"><span class="usage_btnm imgs"></span><span id="table"></span></button>').appendTo(val);
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
            $(val).append('<span id="only_web1" class="web_only only_web"></span>');
            val = "#only_web1";
            $("<a href='https://rebrand.ly/lekhika' target='_blank'><span class='home_img imgs'></span></a>").appendTo(val);
            $(val).append('<span class="ekam"><a href="https://rebrand.ly/lekhikadownload" target="_blank"><span class="download_img imgs"></span></a></span>');
            t = $("<span id='close_img1' class='close_img imgs'></span>").appendTo(val);
            $("#close_img1").click(() => {
                $("#only_web1").hide();
            });
            val = "#main";
            $(val).append("<div class='web_only' id='bhaashhaah1'></div>");
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
            $(val).append(y)
            val = "#bdy";
            val = "#inter";
            $(val).append('<span id="only_web3" class="web_only only_web only_web1"></span>');
            val = "#only_web3";
            $("<a href='https://rebrand.ly/lekhika' target='_blank'><span class='home_img imgs'></span></a>").appendTo(val);
            $(val).append('<span class="ekam"><a href="https://rebrand.ly/lekhikadownload" target="_blank"><span class="download_img imgs"></span></a></span>');
            t = $("<span id='close_img3' class='close_img imgs'></span>").appendTo(val);
            $("#close_img3").click(() => {
                $("#only_web3").hide();
            });
            val = "#inter";
            $('<span class="back imgs" id="back_button"></span>').appendTo(val);
            $("#back_button").click(() => {
                app.change_page('main');
            });
            t = $('<select class="lang" id="lang1"></select>').appendTo(val);
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
            $(val).append('<span class="ekam-left"></span><button id="set_text2" class="set_text"></button><span class="ekam-right"></span><button id="cp2" class="cpy_btn"></button>');
            $("#set_text2").click(() => {
                app.set_inter_values(1);
            });
            $("#cp2").click(() => {
                app.copy_text('first');
            });
            $(`${app.br}<textarea id="first" class="normal" spellcheck="false" autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>`).appendTo(val);
            $("#first").on("input", function () {
                app.edited();
                if (app.auto)
                    $('#second').val(LipiLekhikA.antarparivartan(this.value, $('#lang1').val(), $('#lang2').val()));
            });
            $(`${app.br}<select class="lang" id="lang2"></select>`).appendTo(val);
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
            $(val).append('<span class="ekam-left"></span><button id="set_text1" class="set_text"></button><span class="ekam-right"></span><button id="cp3" class="cpy_btn"></button>');
            $("#cp3").click(() => {
                app.copy_text('second');
            });
            $("#set_text1").click(() => {
                app.set_inter_values(2);
            });
            $(val).append('<span id="up_arrow"><span class="ekam-right"></span><span id="up_arrow_img" class="imgs"></span></span>');
            $(val).append('<span id="down_arrow"><span class="ekam-right"></span><span id="down_arrow_img" class="imgs"></span></span>');
            $(val).append('<span class="ekam-left"></span><span id="auto_img" class="imgs"></span>');
            $(`${app.br}<textarea id="second" class="normal" spellcheck="false" autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>`).appendTo(val);
            $("#second").on("input", function () {
                app.edited();
                if (app.auto)
                    $('#first').val(LipiLekhikA.antarparivartan(this.value, $('#lang2').val(), $('#lang1').val()));
            });
            $(val).append("<div><span id='no_prvrtn'></span></div>");
            val = "#prayog";
            $(val).append(`<select class="lang" id="xcv"></select><span id="close1_img" class="imgs"></span>${app.br}<img id="image"><div id="shoonyam"></div>`);
            $("#close1_img").click(() => {
                $('#prayog').hide();
                $('#main1').show();
            });
            $("#xcv").on("change", () => {
                app.set_image();
            });
            $("#inter").append("<div id='warning1'><span id='warning'></span><span id='hide_warning'>❌</span></div>");
            $("#hide_warning").click(() => {
                $("#warning1").hide();
            });
        };
        body();
        main_section();
        main1();
        $("#auto_img").click(() => {
            app.auto = !app.auto;
            LIPI.get_element("auto_img").style.backgroundColor = `${app.auto?"#ff6464":"lightgreen"}`;
            if (!app.auto) {
                $("#up_arrow").show();
                $("#down_arrow").show();
            } else {
                $("#up_arrow").hide();
                $("#down_arrow").hide();
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
        if (LIPI.includes(["inter", "about"], to))
            $("#parivartak").css("visibility", "hidden");
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
    set_lang_text() {
        let val = LIPI.get_value("app_lang");
        let data = this.lang_texts[val];
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
            LipiLekhikA.karya = !LipiLekhikA.karya;
            let val = [
                ["off", "on"],
                ""
            ];
            val[1] = val[0][LipiLekhikA.karya ? 1 : 0];
            let cl = `img${val[1]}`;
            let elm = $("#main_switch").addClass(cl);
            elm.removeClass(`img${val[0][Math.abs(val[0].indexOf(val[1])-1)]}`);
            let v = data["." + cl];
            elm.attr({
                "title": v,
                "alt": v
            });
        } else if (mode == 1) {
            LipiLekhikA.sahayika_usage = !LipiLekhikA.sahayika_usage;
            let val = [
                ["off1", "on1"],
                ""
            ];
            val[1] = val[0][LipiLekhikA.sahayika_usage ? 1 : 0];
            let cl = `img${val[1]}`;
            let elm = $("#sahayika_switch").addClass(cl);
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
        $("#error_msg").hide();
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
app.init_html();
window.history.pushState(null, "", window.location.href);
window.onpopstate = () => {
    let t = LIPI.time();
    let back = false;
    if (!back)
        window.history.pushState(null, "", window.location.href);
    if (LIPI.includes(app.pages, app.current_page))
        app.change_page("main");
    app.time = LIPI.time();
    app.c++;
};
$("#bdy").children().hide();
app.initialize(config[1]);
let img = document.createElement("span");
img.className = "cpy_btn_img imgs";
$(".cpy_btn").html(img);
// $("#main_switch").addClass(`img${["off","on"][LipiLekhikA.karya?1:0]}`);
$("#main_switch").addClass(`imgon`);
// $("#sahayika_switch").addClass(`img${["off1","on1"][LipiLekhikA.sahayika_usage?1:0]}`);
$("#sahayika_switch").addClass(`imgon1`);
let ah = app.args;
let args = {};
for (x in ah) {
    if (x == "app_lang") {
        let v = decodeURIComponent(ah[x]);
        if (v in app.lang_texts)
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
}
if (!("app_lang" in args))
    LIPI.set_value("app_lang", app.get_cookie("app_lang"));
else
    LIPI.set_value("app_lang", args["app_lang"]);
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
let debug = false;
if ("dev" in args)
    debug = args["dev"] == "amam";
let lng = LIPI.get_value("app_lang");
app.loaded_display_lng.push(lng);
$.ajax({
    url: app.pratyaya_sanchit + `/lang/${lng}.json`,
    success: (result) => {
        app.lang_texts[lng] = result;
        app.set_lang_text();
        $("#dynamic").focus();
    }
});
if (!debug)
    window.onbeforeunload = () => "Do you really want to Leave";

app.font_add(LIPI.get_value("lang1"));
app.font_add(LIPI.get_value("lang2"));
app.add_direction($("#dynamic"), akl);
app.add_direction($("#first"), LIPI.get_value("lang1"));
app.add_direction($("#second"), LIPI.get_value("lang2"));
app.set_font_size();
$.lipi_lekhika();