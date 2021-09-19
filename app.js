class अनुप्रयोगः {
    constructor() {
        this.time = 0;
        this.c = 0;
        this.lang_texts = {};
        this.pratyaya_sanchit = "src";
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
        this.lipyaH = {
            Hindi: ["हिन्दी", "अजय्", "अ"],
            Bengali: ["বাংলা", "অজয্", "অ"],
            Telugu: ["తెలుగు", "అజయ్", "అ"],
            Tamil: ["தமிழ்", "அஜய்", "அ"],
            Marathi: ["मराठी", "अजय्", "अ"],
            Gujarati: ["ગુજરાતી", "અજય્", "અ"],
            Malayalam: ["മലയാളം", "അജയ്", "അ"],
            Kannada: ["ಕನ್ನಡ", "ಅಜಯ್", "ಅ"],
            Oriya: ["ଓଡ଼ିଆ", "ଅଜଯ୍", "ଅ"],
            Assamese: ["অসমীয়া", "অজয্", "অ"],
            Konkani: ["कोंकणी", "अजय्", "अ"],
            Sanskrit: ["संस्कृतम्", "अजय्", "अ"],
            Punjabi: ["ਪੰਜਾਬੀ", "ਅਜਯ੍", "ਅ"],
            Nepali: ["नेपाली", "अजय्", "अ"],
            Urdu: ["اُردُو", "اجَے ", "ب"],
            Kashmiri: ["كٲشُر", "اجَے ", "ب"],
            Romanized: ["Romanized", "ajay ", "ā"],
            Sinhala: ["සිංහල", "අජය්", "අ"],
            "Tamil-Extended": ["தமிழ்-Extended", "அஜய்", "அ"],
            Sharada: ["शारदा", "𑆃𑆘𑆪𑇀", "𑆃"],
            Modi: ["मोडी", "𑘀𑘕𑘧𑘿", "𑘀"],
            Siddham: ["सिद्धम्", "𑖀𑖕𑖧𑖿", "𑖀"],
            Granth: ["கிரந்த", "𑌅𑌜𑌯𑍍", "𑌅"],
            Brahmi: ["ब्राह्मी", "𑀅𑀚𑀬𑁆", "𑀅"],
            Devanagari: ["", "", "अ"],
            Normal: ["", "", "A"]
        };
        this.sthAna = {
            "main": "",
            "lang": "",
            "from": "",
            "to": ""
        };
        this.up_lipyaH = ["Siddham", "Brahmi", "Sharada", "Modi", "Granth"];
        this.once_editded = false;
        this.inter_on_off = [false, false];
        this.do_not = false;
        this.auto = !false;
        this.html_initialized = false;
        this.current_page = "main";
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
                $('#main1').addClass("prayog_hide");
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
            for (let p in display_lang_list) {
                yuj("#app_lang", `<option tlt="${p}" value="${p}" class="langsw titles">${p}</option>`)
            };
            $("#app_lang").on("change", function () {
                let v = $("#app_lang").val();
                let exec = () => {
                    app.store_values('app_lang', $("#app_lang").val());
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
            $("#redirect1").click(() => {
                if ("app_lang" in s1)
                    window.open("/", "_blank");
                else
                    app.open_link("/" + display_lang_list[$('#app_lang').val()][1], null);
            });
        }
        if (true) { //about
            $("#lic").click(() => {
                $.ajax({
                    url: app.pratyaya_sanchit + `/LICENCE.txt`,
                    dataType: "text",
                    success: (result) => {
                        $("#licence").html(LIPI.replace_all(result, "\n", "<br>"));
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
                $("#sahayika_switch").trigger("click");
                $('#lekhan_sahayika').css("color", "white")
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
            $(".note-toolbar").css({
                "background-color": "transparent",
                "border": "0"
            });
            $(".note-editor").css("border", "0");
            $(".note-statusbar").css("border", "0");
            elm.css({
                padding: "4px"
            });
            $(".note-btn").css("border", "1px solid black");
            $("#table_btn").click(() => {
                app.set_image($("#main_lang").val());
                $('#prayog').show();
                $('#main1').addClass("prayog_hide");
            });
            $(".note-style").before('<div class="vr-flex1 script"><div class="flex typ_lang"><select class="lang titles" tlt="typ_lang" id="main_lang"></select><span class="imgs redirect web_only" id="redirect0"></span></div></div>');
            $("#main_lang").on("change", () => {
                let jkl = () => {
                    let ak = $('#main_lang').val();
                    LipiLekhikA.script = ak;
                    app.store_values('script', ak);
                    if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], ak))
                        $("#sa_mode").hide();
                    else
                        $("#sa_mode").show();
                    app.set_sa_val();
                    LipiLekhikA.akSharANi = LIPI.akSharAH[ak];
                    LipiLekhikA.sa_lang = LipiLekhikA.akSharANi['く'];
                    app.add_direction($("#dynamic"), $("#main_lang").val());
                    if (!app.once_editded)
                        app.add_direction($("#first"), $("#main_lang").val());
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
            for (let x in app.lipyaH) {
                if (LIPI.includes(['Devanagari', "Normal"], x))
                    continue;
                y += `<a class='bhAShAnyAH block dvayam-right-anya-bhAShA' href='/lang/${x}' target='_blank' id='title_${x}'>${app.lipyaH[x][0]} (<span class='bhAShAnyAH_name' id='link_${x}'></span>)</a>`;
            }
            yuj("#bhAShA_sanchit", y);
            $("#redirect0").click(() => {
                if ("main_lang" in s1)
                    window.open("/", "_blank");
                else
                    app.open_link(null, "/lang/" + $("#main_lang").val());
            });
        }
        if (true) { //inter prayog cha
            $("#lang1").on("change", () => {
                if (app.auto) {
                    function hjk() {
                        $('#first').val(LipiLekhikA.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
                    }
                    LIPI.load_lang($("#lang1").val(), hjk);
                } else
                    LIPI.load_lang($("#lang1").val());
                app.add_direction($("#first"), $("#lang1").val());
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
                    LIPI.load_lang($("#lang2").val(), jk);
                } else
                    LIPI.load_lang($("#lang2").val());
                app.add_direction($("#second"), $("#lang2").val());
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
                $('#main1').removeClass("prayog_hide");
            });
            $("#prayog .blocker").click((e) => $("#close1_img").trigger("click"));
            $("#xcv").on("change", () => {
                app.set_image();
            });
            $("#hide_warning").click(() => {
                $("#warning1").hide();
            });
            $("#auto_img").click(() => {
                app.auto = !app.auto;
                $("#auto_img").css("background-color", `${app.auto?"#ff6464":"lightgreen"}`);
                if (!app.auto) {
                    $("#up_arrow_img").show();
                    $("#down_arrow_img").show();
                } else {
                    $("#up_arrow_img").hide();
                    $("#down_arrow_img").hide();
                }
            });
            $("#auto_img").trigger("click");
            $("#down_arrow_img").click(() => $('#second').val(LipiLekhikA.antarparivartan($("#first").val(), $('#lang1').val(), $('#lang2').val())));
            $("#up_arrow_img").click(() => $('#first').val(LipiLekhikA.antarparivartan($("#second").val(), $('#lang2').val(), $('#lang1').val())));
            $(".inter_redirect").click(() => {
                if ("to" in s1)
                    window.open("/", "_blank");
                else {
                    if ($("#lang1").val() == "Normal")
                        return;
                    app.open_link(null, `/converter/${$("#lang1").val()}/${$("#lang2").val()}`);
                }
            });
        }
        if (true) { // adding lang options in select tags
            if (s["mode"] == 1) {
                $(".web_only").hide();
                LipiLekhikA.only_web_status = false;
                let elm = $(LipiLekhikA.sahayika.bhaNDAra.pashchAta[0]).children()[0];
                elm.removeAttribute("href");
                elm.removeAttribute("target");
            }
            let vbn = ["xcv", "lang1", "lang2", "main_lang"];
            let lang_list = Object.keys(app.lipyaH);
            for (let x in vbn) {
                let j = "";
                for (let y in lang_list) {
                    if ((vbn[x] == "xcv" && lang_list[y] == "Normal") || lang_list[vbn] == "Vedic") continue;
                    if (lang_list[y] == "Devanagari" && !LIPI.includes(["lang1", "lang2"], vbn[x])) continue;
                    if (lang_list[y] == "Normal" && vbn[x] == "main_lang") continue;
                    if (LIPI.includes(["lang1", "lang2"], vbn[x]) && LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], lang_list[y])) continue;
                    j += `<option value="${lang_list[y]}" class="${lang_list[y]}"></option>`;
                }
                $("#" + vbn[x]).html(j);
            }
            $("#xcv").append("<option id='Vedic' value='Vedic'>Vedic Additions</option>")
            $("#paricaya").html("<div class='br-above'>भारते रचितः</div>E-mail : <a href='mailto:lipilekhika@gmail.com' class='mail'>lipilekhika@gmail.com</a>");
            $("#main_section").show();
        }
    };
    add_convert_msg() {
        let db = app.lang_texts[$("#app_lang").val()];
        let data = db.scripts;
        db = db.others;
        let val = [$("#lang1").val(), $("#lang2").val()];
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
        let src = $("#main_lang").val();
        let val = app.lipyaH[src][1];
        $(`#sa_${LIPI.akSharAH[src]["く"]}4`)[0].checked = true;
        if (LIPI.includes(["Romanized", "Normal", "Urdu"], src))
            val += " ";
        let extra = 0;
        if (LIPI.includes(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], src))
            extra++;
        let val1 = val.substring(0, val.length - 1 - extra);
        $("#sa_0").html(`ajay ➠ ${val1}`);
        $("#sa_1").html(`ajay ➠ ${val}`);
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
        } else if (to == "main")
            $("#parivartak").show();
        if (LIPI.includes(["inter", "about"], to)) {
            $("#parivartak").hide();
            $("#back_btn").show();
        }
        app.current_page = to;
    };
    set_image(val = $("#xcv").val()) {
        let data = this.lang_texts[$("#app_lang").val()],
            elm = $('#image');
        let v = `${data.scripts[val]} - ${data.title.image}`;
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
        var copyText = $("#" + element)[0];
        copyText.select();
        copyText.setSelectionRange(0, copyText.value.length + 2);
        document.execCommand("copy");
    };
    set_lang_text(val = $("#app_lang").val()) {
        let data = app.lang_texts[val];
        let tlt = data.others.page_title,
            t1 = data.scripts;
        if ("main_lang" in s1) {
            tlt = LIPI.replace_all(data.others.title_lang, "{0}", t1[s1["main_lang"]]);
            tlt = LIPI.replace_all(tlt, "{1}", t1[s1["main_lang"]]);
        }
        if ("to" in s1)
            tlt = LIPI.replace_all(data.others.title_convert, "{0}", `${t1[s1["from"]]} ➠ ${t1[s1["to"]]}`);
        $("title").html(tlt);
        for (let x of $(".lipi")) {
            let el = $(x);
            let n = el.attr("lipi");
            let nm = LIPI.replace_all(data.lipi[n], "\n", "<br>");
            if (n == "about_text")
                nm = LIPI.replace_all(LIPI.replace_all(nm, "{1}", "</a>"), "{0}", "<a href='https://rebrand.ly/lekhika' target='_blank'>");
            el.html(nm);
        };
        for (let x in data.scripts) {
            let v = data.scripts[x];
            $("." + x).html(`${v} (${this.lipyaH[x][2]})`);
            $("#link_" + x).html(`${v}`);
        };
        LipiLekhikA.set_interface_lang(display_lang_list[val][2]);
        for (let y of $(".titles")) {
            let el = $(y);
            let val = data.title[el.attr("tlt")];
            el.attr({
                "title": val,
                "alt": val
            });
        }
        for (let x in this.lipyaH) {
            let val = data["scripts"][x];
            $("#title_" + x).attr({
                "title": val,
                "alt": val
            });
        };
        if (this.html_initialized)
            $(".lang").trigger('change');
    };
    set_font_size() {
        let x = display_lang_list[$("#app_lang").val()][0];
        $("#main_section").css("font-size", `${10+x}px`);
        $("html").attr("lang", display_lang_list[$("#app_lang").val()][1]);
    };
    set_onoff_img(mode) {
        let data = this.lang_texts[$("#app_lang").val()]["title"];
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
                    if (!(val in app.lipyaH))
                        return;
                    break;
                case "app_lang":
                    if (!(val in display_lang_list))
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
                        this.store_values("script", val);
                    }
                    break;
                case "app_lang":
                    if (!(val in display_lang_list)) {
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
    open_link(lang = null, main = null) {
        if (lang == null)
            lang = app.sthAna.lang;
        if (main == null)
            if ("to" in s1)
                main = app.sthAna.from + app.sthAna.to;
            else
                main = app.sthAna.main;
        window.open(lang + main, "_blank");
    }
};
let display_lang_list = {
    "English": [0, "en", "English"],
    "हिन्दी": [0.5, "hi", "Hindi"],
    "தமிழ்": [-0.45, "ta", "Tamil"],
    "తెలుగు": [0.5, "te", "Telugu"],
    "ಕನ್ನಡ": [0.5, "kn", "Kannada"],
    "বাংলা": [0.5, "bn", "Bengali"],
    "संस्कृतम्": [0.5, "sa", "Sanskrit"]
};

let app = new अनुप्रयोगः();
let storage = window.localStorage;
let devan_sthiti = (s) => LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], s)
if ("main_lang" in s)
    s["from"] = s["main_lang"];
if ("from" in s) {
    s["main_lang"] = s["from"] == "Devanagari" ? "Sanskrit" : s["from"];
    s["from"] = devan_sthiti(s["from"]) ? "Devanagari" : s["from"];
}
if ("to" in s)
    s["to"] = devan_sthiti(s["to"]) ? "Devanagari" : s["to"];
let s1 = JSON.parse(JSON.stringify(s));
if (true) { //setting values
    if (!("app_lang" in s))
        s["app_lang"] = app.get_values("app_lang");
    if (!("main_lang" in s))
        s["main_lang"] = app.get_values("script");
    if (!("from" in s))
        s["from"] = LIPI.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], s["main_lang"]) ? "Devanagari" : s["main_lang"];
    if (!("to" in s))
        s["to"] = "Romanized";
    if (!("vitroTanam" in s))
        s["vitroTanam"] = true;
    if (!("page" in s))
        s["page"] = 0;
    if (!("mode" in s))
        s["mode"] = 0;
}
$.ajax({
    url: app.pratyaya_sanchit + `/lang/${s["app_lang"]}.json`,
    dataType: "json",
    success: (result) => {
        $.ajax({
            url: LIPI.substring(app.pratyaya_sanchit, 0, -3) + "app.asp",
            dataType: "text",
            success: (result) => {
                $("body").append(result);
                app.init_html();
                $("#bdy").children().hide();
                $(".redirect").addClass("titles");
                $(".redirect").attr("tlt", "redirect_msg");
                if ("app_lang" in s1) {
                    $("#app_lang").after(`<span id="app_lang" style="padding-left:4px;padding-right:4px;border-radius:5px;">${s1["app_lang"]}</span>`);
                    $("#app_lang").hide();
                    app.sthAna.lang = "/" + display_lang_list[s["app_lang"]][1];
                }
                if ("main_lang" in s1) {
                    $("#main_lang").after(`<span id="main_lang" resize=0 style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang ${s1["main_lang"]}">${s1["main_lang"]}</span>`);
                    $("#main_lang").hide();
                    app.sthAna.main = "/lang/" + s["main_lang"];
                }
                if ("from" in s1) {
                    $("#lang1").after(`<span id="lang1" resize=0 style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang ${s1["from"]}"></span>`);
                    $("#lang1").hide();
                    app.sthAna.from = "/converter/" + s["from"];
                }
                if ("to" in s1) {
                    $("#lang2").after(`<span id="lang2" resize=0 style="padding-left:4px;padding-right:4px;padding:2px;border-radius:5px;" class="lang ${s1["to"]}"></span>`);
                    $("#lang2").hide();
                    app.sthAna.to = "/" + s["to"];
                }
                app.set_lang_text(s["app_lang"]);
                on_loaded();
            }
        });
        app.lang_texts[s["app_lang"]] = result;
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

function on_loaded() {
    $("#app_lang").val(s["app_lang"]);
    $("#main_lang").val(s["main_lang"]);
    $("#lang1").val(s["from"]);
    $("#xcv").val(s["main_lang"]);
    $("#lang2").val(s["to"]);
    LIPI.load_lang($("#lang2").val());
    LIPI.load_lang($("#lang1").val());
    if (s["page"] == 0)
        $("#main").show();
    if (s["page"] == 1) {
        app.current_page = "inter";
        $("#inter").show();
        LIPI.load_inter_converter();
        $("#parivartak").hide();
        $("#back_btn").show();
    }
    $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
    $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
    let akl = $("#main_lang").val();
    LipiLekhikA.set_lang_and_state(akl, app.set_sa_val, true);
    $("#menu_btn").html('<svg width="35px" height="35px" viewBox="0 0 512 512"><g><path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/><path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/><path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/></g></svg>')
    $(".cpy_btn").html('<svg class="cpy_btn_img" viewBox="0 0 21 22"><g class="प्रति" transform="translate(-86.000000, -127.000000)"><g transform="translate(86.500000, 127.000000)"><path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z"/></g></g></svg>');
    $(".git").html('<svg viewBox="0 0 512 512"><g><path d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14  c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5 c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7 c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3 c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7 C480,134.8,379.7,32,256,32z"/></g></svg>')
    if (LIPI.includes(["Urdu", "Romanized", "Kashmiri"], akl))
        $("#sa_mode").hide();
    $(".redirect").html('<svg height="19" width="19" viewBox="0 0 24 24"><path d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/></svg>');
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
    app.add_direction($("#first"), $("#lang1").val());
    app.add_direction($("#second"), $("#lang2").val());
    app.add_convert_msg();
    app.set_font_size();
    if (s.vitroTanam)
        window.onbeforeunload = () => "Do you really want to Leave";
    $("#lipi_icon").remove();
    $.lipi_lekhika();
    let lc = `body{background-image:url(${LIPI.substring(LIPI.image_loca, 0, -5)}/lipi-`;
    let l2 = (x) => `@media(${["min","max"][x]+"-width:630px){"+lc+["pc","an"][x]}.jpg);}}`;
    $("#bdy").append(`<style>${l2(0)+l2(1)}</style>`);
    $(".lang").on("change", (e) => {
        e = $(e.target);
        if (e.attr("resize") == "0")
            return;
        $(".विकल्पम्").html(e.find("option:selected").text());
        let f = $(".विकल्पानि").width() + 10;
        e.css("width", `${f}px`);
    });
    $(".lang").trigger("change");
    app.html_initialized = true;
};