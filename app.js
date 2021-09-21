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
        this.anya_html = {};
        this.karya = true;
        this.app = LipiLekhikA;
        this.k = लिपि;
        this.sahayika_usage = true;
        this.loaded_display_lng = [];
        this.pages = ["inter", "about"];
        this.antar_loaded = false;
        this.lipyaH = {
            Hindi: ["हिन्दी", "अजय्", "अ"],
            Devanagari: ["", "", "अ"],
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
            Normal: ["", "", "A"]
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
        this.inter_on_off = [false, false];
        this.do_not = false;
        this.auto = !false;
        this.yuj = (x, y) => jQuery(y).appendTo(x);
        this.html_initialized = false;
        this.current_page = "main";
    };
    init_html() {
        let yuj = app.yuj,
            ht = app.anya_html;
        if (true) { //main1
            let el = $("#back_btn").click(() => app.change_page("main"));
            el.css("display", "none");
            $("#parivartak").click(() => app.change_page("inter"));
            $(".prayog_btn").click(() => app.change_page("prayog", false));
        }
        if (true) { //menu
            let left = 230,
                time = 220,
                op = 0.43,
                cl = "#00000017";
            yuj("#menu_body", `<style>@keyframes block_color1{from{background-color:transparent}to{background-color:${cl}}}@keyframes block_color2{to{background-color:transparent}from{background-color:${cl}}}</style>`)
            $("#menu_body").css("left", `-${left}px`)
            $("#menu_btn").click(() => {
                $("html, body").css({
                    overflow: "hidden",
                    height: "100%"
                });
                $("#menu_container").show();
                $("#menu_blocker").css({
                    "animation-name": "block_color1",
                    "animation-duration": `${time-40}ms`,
                    "background-color": cl
                });
                $("#menu_body").animate({
                    left: "0px"
                }, time);
                $("#main_section").animate({
                    opacity: op
                }, time - 40);
                app.pRShThedAnIm = "menu";
            });
            $("#menu_blocker").click(() => {
                $("html, body").attr("style", "");
                app.pRShThedAnIm = "";
                $("#menu_body").animate({
                    "left": -left + "px"
                }, time + 12);
                $("#main_section").animate({
                    opacity: 1
                }, time - 40);
                $("#menu_blocker").css({
                    "animation-name": "block_color2",
                    "animation-duration": `${time-40}ms`,
                    "background-color": "transparent"
                });
                setTimeout(() => $("#menu_container").hide(), time + 12);
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
                if (!app.k.includes(app.loaded_display_lng, v)) {
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
                        $("#licence").html(app.k.replace_all(result, "\n", "<br>"));
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
                app.app.sa_lang = 0;
            });
            $("#sa_14").click(() => {
                app.app.sa_lang = 1;
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
            $(".note-style").before(ht.main_lang);
            $("#main_lang").on("change", () => {
                let jkl = () => {
                    let ak = $('#main_lang').val();
                    app.app.script = ak;
                    app.store_values('script', ak);
                    if (app.k.includes(["Urdu", "Romanized", "Kashmiri"], ak))
                        $("#sa_mode").hide();
                    else
                        $("#sa_mode").show();
                    app.set_sa_val();
                    app.app.akSharANi = app.k.akSharAH[ak];
                    app.app.sa_lang = app.app.akSharANi['く'];
                    app.add_direction($("#dynamic"), $("#main_lang").val());
                    if (!app.once_editded)
                        app.add_direction($("#first"), $("#main_lang").val());
                };
                app.app.set_lang_and_state($("#main_lang").val(), jkl);
            });
            $(".note-style").after(ht.main_btn);
            $("#main_switch").click(() => {
                app.set_onoff_img(0);
            });
            $("#cp1").click(() => {
                app.copy_text('dynamic', 1);
                setTimeout(function () {
                    document.execCommand("copy");
                }, 1);
            });
            let y = "";
            for (let x in app.lipyaH) {
                if (app.k.includes(['Devanagari', "Normal"], x))
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
        if (true) { //prayog
            let t = $("#close1_img").click(() => app.change_page("mA_prayog", false));
            $("#prayog .blocker").click(() => t.trigger("click"));
        }
        if (true) { //lipi parivartak
            $("#lang1").on("change", () => {
                if (app.auto) {
                    function hjk() {
                        $('#first').val(app.app.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
                    }
                    app.k.load_lang($("#lang1").val(), hjk);
                } else
                    app.k.load_lang($("#lang1").val());
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
                    $('#second').val(app.app.antarparivartan(this.value, $('#lang1').val(), $('#lang2').val()));
            });
            $("#lang2").on("change", () => {
                if (app.auto) {
                    function jk() {
                        $('#second').val(app.app.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
                    }
                    app.k.load_lang($("#lang2").val(), jk);
                } else
                    app.k.load_lang($("#lang2").val());
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
                    $('#first').val(app.app.antarparivartan(this.value, $('#lang2').val(), $('#lang1').val()));
            });
            $("#xcv").on("change", () => app.set_image());
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
            $("#down_arrow_img").click(() => $('#second').val(app.app.antarparivartan($("#first").val(), $('#lang1').val(), $('#lang2').val())));
            $("#up_arrow_img").click(() => $('#first').val(app.app.antarparivartan($("#second").val(), $('#lang2').val(), $('#lang1').val())));
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
                app.app.only_web_status = false;
                let elm = $(app.app.sahayika.bhaNDAra.pashchAta[0]).children()[0];
                elm.removeAttribute("href");
                elm.removeAttribute("target");
            }
            let vbn = ["xcv", "lang1", "lang2", "main_lang"];
            let lang_list = Object.keys(app.lipyaH);
            for (let x in vbn) {
                let j = "";
                for (let y in lang_list) {
                    if ((vbn[x] == "xcv" && lang_list[y] == "Normal") || lang_list[vbn] == "Vedic") continue;
                    if (lang_list[y] == "Devanagari" && !app.k.includes(["lang1", "lang2"], vbn[x])) continue;
                    if (lang_list[y] == "Normal" && vbn[x] == "main_lang") continue;
                    if (app.k.includes(["lang1", "lang2"], vbn[x]) && app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], lang_list[y])) continue;
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
        val[0] = data[val[0]];
        val[1] = data[val[1]];
        let elm = [$("#down_arrow_img")[0], $("#up_arrow_img")[0]];
        elm[0].title = `${db.convert} :- ${val[0]} ➠ ${val[1]}`;
        elm[1].title = `${db.convert} :- ${val[1]} ➠ ${val[0]}`;
    };
    edited() {
        this.once_editded = true;
    };
    add_direction(i, lang) {
        if (app.k.includes(["Urdu", "Kashmiri"], lang)) {
            i.attr("dir", "rtl");
        } else
            i.attr("dir", "ltr");
    };
    set_sa_val() {
        let src = $("#main_lang").val();
        let val = app.lipyaH[src][1];
        $(`#sa_${app.k.akSharAH[src]["く"]}4`)[0].checked = true;
        if (app.k.includes(["Romanized", "Normal", "Urdu"], src))
            val += " ";
        let extra = 0;
        if (app.k.includes(["Brahmi", "Modi", "Sharada", "Siddham", "Granth"], src))
            extra++;
        let val1 = val.substring(0, val.length - 1 - extra);
        $("#sa_0").html(`ajay ➠ ${val1}`);
        $("#sa_1").html(`ajay ➠ ${val}`);
    };
    change_page(to, set = true) {
        if (set) {
            $(`#${app.current_page}`).hide();
            $(`#${to}`).show();
        }
        if (to == "inter" || to == "about") {
            $("#parivartak").hide();
            $("#back_btn").show();
        }
        if (to == "inter" && !app.once_editded) {
            let exec = () => {
                $("#lang1").val(app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], app.app.script) ? "Devanagari" : app.app.script);
                $("#lang2").val("Romanized");
                $("#first").val(app.k.get_Text_from_div($("#dynamic").html()));
                $('#second').val(app.app.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
                $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
                $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
            };
            if (!app.antar_loaded) {
                app.k.load_inter_converter(exec);
                app.antar_loaded = true;
            } else
                exec();
        } else if (to == "main") {
            $("#parivartak").show();
            $("#back_btn").hide();
        } else if (to == "prayog") {
            app.set_image($("#main_lang").val());
            $('#prayog').show();
            $('#main1').addClass("prayog_hide");
        } else if (to == "mA_prayog") {
            $('#prayog').hide();
            $('#main1').removeClass("prayog_hide");
        }
        if (set)
            app.current_page = to;
        app.pRShThedAnIm = to;
    };
    set_image(val = $("#xcv").val()) {
        let data = this.lang_texts[$("#app_lang").val()],
            elm = $('#image');
        let v = `${data.scripts[val]} - ${data.title.image}`;
        $("#xcv").val(val);
        elm.attr("src", app.app.usage_table_link(val));
        elm.attr({
            title: v,
            alt: v
        });
    };
    set_inter_values(n) {
        if (n == 1) {
            $("#lang1").val(app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], app.app.script) ? "Devanagari" : app.app.script);
            $("#first").val(app.k.get_Text_from_div($("#dynamic").html()));
            if (app.auto)
                $('#second').val(app.app.antarparivartan($('#first').val(), $('#lang1').val(), $('#lang2').val()));
        } else {
            $("#lang2").val(app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], app.app.script) ? "Devanagari" : app.app.script);
            $("#second").val(app.k.get_Text_from_div($("#dynamic").html()));
            if (app.auto)
                $('#first').val(app.app.antarparivartan($('#second').val(), $('#lang2').val(), $('#lang1').val()));
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
        if ("main_lang" in s1)
            tlt = app.k.replace_all(data.others.title_lang, "{0}", t1[s1["main_lang"]]);
        if ("to" in s1)
            tlt = app.k.replace_all(data.others.title_convert, "{0}", `${t1[s1["from"]]} ➠ ${t1[s1["to"]]}`);
        $("title").html(tlt);
        for (let x of $(".lipi")) {
            let el = $(x);
            let n = el.attr("lipi");
            let nm = app.k.replace_all(data.lipi[n], "\n", "<br>");
            if (n == "about_text")
                nm = app.k.replace_all(app.k.replace_all(nm, "{1}", "</a>"), "{0}", "<a href='https://rebrand.ly/lekhika' target='_blank'>");
            el.html(nm);
        };
        for (let x in data.scripts) {
            let v = data.scripts[x];
            $("." + x).html(`${v} (${this.lipyaH[x][2]})`);
            $("#link_" + x).html(`${v}`);
        };
        app.app.set_interface_lang(display_lang_list[val][2]);
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
            let vl = app.k.substring(val[1], 0, -1);
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
            if (!app.k.includes(["app_lang", "script"], name))
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
if (true) { //pre settings
    let devan_sthiti = (s) => app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], s)
    if ("main_lang" in s)
        s["from"] = s["main_lang"];
    if ("from" in s) {
        s["main_lang"] = s["from"] == "Devanagari" ? "Sanskrit" : s["from"];
        s["from"] = devan_sthiti(s["from"]) ? "Devanagari" : s["from"];
    }
    if ("to" in s)
        s["to"] = devan_sthiti(s["to"]) ? "Devanagari" : s["to"];
}
let s1 = JSON.parse(JSON.stringify(s));
if (true) { //adding backgroud image
    let lc = `body{background-image:url(${app.k.substring(app.k.image_loca, 0, -5)}/lipi-`;
    let l2 = (x) => `@media(${["min","max"][x]+"-width:630px){"+lc+["pc","an"][x]}.jpg);}}`;
    app.yuj("body", `<style>${l2(0)+l2(1)}</style>`);
}
if (true) { //setting values
    if (!("app_lang" in s))
        s["app_lang"] = app.get_values("app_lang");
    if (!("main_lang" in s))
        s["main_lang"] = app.get_values("script");
    if (!("from" in s))
        s["from"] = app.k.includes(["Hindi", "Sanskrit", "Marathi", "Konkani", "Nepali"], s["main_lang"]) ? "Devanagari" : s["main_lang"];
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
    success: (r) => {
        app.lang_texts[s["app_lang"]] = r;
        $.ajax({
            url: app.k.substring(app.pratyaya_sanchit, 0, -3) + "app.asp",
            dataType: "text",
            success: (result) => {
                $("body").append(result);
                let e = $("#store_html").children();
                for (let x of e)
                    app.anya_html[$(x).attr("nm")] = x.innerHTML;
                $("#store_html").remove();
                app.init_html();
                $("#bdy").children().hide();
                $(".redirect").addClass("titles");
                $(".redirect").attr("tlt", "redirect_msg");
                let ht = (x, y) => app.k.replace_all(app.anya_html[x], "{0}", y),
                    t = "";
                if (true) { // init values
                    if ("app_lang" in s1) {
                        t = $("#app_lang").after(ht("app_set", s1["app_lang"]));
                        t.hide();
                        app.sthAna.lang = "/" + display_lang_list[s["app_lang"]][1];
                    }
                    if ("main_lang" in s1) {
                        t = $("#main_lang").after(ht("main_set", s1["main_lang"]));
                        t.hide();
                        app.sthAna.main = "/lang/" + s["main_lang"];
                    }
                    if ("from" in s1) {
                        t = $("#lang1").after(ht("from_set", s1["from"]));
                        t.hide();
                        app.sthAna.from = "/converter/" + s["from"];
                    }
                    if ("to" in s1) {
                        t = $("#lang2").after(ht("to_set", s1["to"]));
                        t.hide();
                        app.sthAna.to = "/" + s["to"];
                    }
                }
                app.set_lang_text(s["app_lang"]);
                on_loaded();
            }
        });
    }
});

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
    let pg = app.pRShThedAnIm;
    if (pg == "menu")
        $("#menu_blocker").trigger("click");
    else if (pg == "prayog")
        $("#close1_img").trigger("click");
    else if (app.k.includes(app.pages, app.current_page)) {
        app.change_page("main");
        hde();
    }
    app.time = app.k.time();
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
    app.k.load_lang($("#lang2").val());
    app.k.load_lang($("#lang1").val());
    if (s["page"] == 0)
        $("#main").show();
    else if (s["page"] == 1) {
        app.current_page = "inter";
        $("#inter").show();
        app.k.load_inter_converter();
        $("#parivartak").hide();
        $("#back_btn").show();
    }
    $("#second").attr("lipi-lang", $("#lang2").val() != "Devanagari" ? $("#lang2").val() : "Sanskrit");
    $("#first").attr("lipi-lang", $("#lang1").val() != "Devanagari" ? $("#lang1").val() : "Sanskrit");
    let akl = $("#main_lang").val();
    app.app.set_lang_and_state(akl, app.set_sa_val, true);
    let ht = app.anya_html;
    $("#menu_btn").html(ht.menu_btn);
    $(".cpy_btn").html(ht.cpy_btn);
    $(".git").html(ht.git);
    $("#up_arrow_img").html(ht.up_arrow);
    $("#down_arrow_img").html(ht.down_arrow);
    if (app.k.includes(["Urdu", "Romanized", "Kashmiri"], akl))
        $("#sa_mode").hide();
    $(".redirect").html(ht.redirect);
    $("#set_img").html(ht.setting);
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
    for (let x of ["#dynamic", "#first", "#second"]) {
        let e = $(x);
        e.css("height", e.css("height"));
    }
    for (let x of ["select", ".ajay", "#dynamic"])
        $(x).addClass("fonts");
};