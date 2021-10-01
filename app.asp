<div id="main_section" style="display:none;">
    <div id="main1">
        <div class="in-flex">
            <span id="menu_btn" class="imgs">
                <svg width="35px" height="35px" viewBox="0 0 512 512">
                    <g>
                        <path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                        <path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                        <path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                    </g>
                </svg>
            </span>
            <span tlt="back" class="back titles imgs" id="back_btn">
                <svg viewBox="0 0 32 32">
                    <g>
                        <path
                            d="M13,26a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L5.41,16l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,13,26Z" />
                        <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                    </g>
                </svg>
            </span>
            <button id="parivartak" tlt="parivartak" class="in-flex titles">
                <span id="convert_img" class="imgs btn_img"></span>
                <span id="lbl3" lipi="parivartak" class="lipi"></span>
            </button>
            <span tlt='usage_btnm' class='usage_btnm prayog_btn imgs titles' id='up_usage'></span>
        </div>
        <div id="bdy">
            <div id="about">
                <p id="about_text" lipi="about_text" class="lipi br-above"></p>
                <p id="paricaya" class="br-above"></p>
                <span class="flex br-above">
                    <button id="lic" lipi="show_lic" class="lipi"></button>
                    <a class='web_only dvayam-left' href='https://web.lipilekhika.com/source' target='_blank'>
                        <span id='git' class='imgs git'></span>
                    </a>
                </span>
                <p id="licence" class="br-above" style="display:none"></p>
            </div>
            <div id="main">
                <div class="flex">
                    <span id="sa_mode" class="dvayam-right in-flex">
                        <label class="titles in-flex" tlt="sa_0">
                            <input type="radio" class="sa_radio" name="sa_mode" id="sa_04">
                            <span id="sa_0" class="black-yeloow ajay"></span>
                        </label>
                        <label class="titles in-flex" tlt="sa_1">
                            <input type="radio" class="sa_radio" name="sa_mode" id="sa_14">
                            <span id="sa_1" class="black-yellow ajay"></span>
                        </label>
                    </span>
                    <span id="sahayika_switch" tlt="imgon1" class="titles checkbox_img">
                        <span class="imgoff1 imgs"></span>
                        <span class="imgon1 imgs"></span>
                    </span>
                    <span id="lekhan_sahayika" tlt="lekhan_sahayika" lipi="sahayika_text" class="lipi titles"></span>
                </div>
                <div id="dynamic"></div>
                <button id="table_btn" class="in-flex prayog_btn">
                    <span tlt="usage_btnm" class="usage_btnm titles imgs btn_img"></span>
                    <span id="table" class="lipi" lipi="show_table"></span>
                </button>
            </div>
            <div id="inter">
                <div class="in-flex">
                    <select class="lang" id="lang1"></select>
                    <button id="set_text2" class="set_text ekam-left"></button>
                    <button id="cp2" class="cpy_btn ekam titles" tlt="cpy_btn"></button>
                    <span class="checkbox_img img_inter1" img_check=0>
                        <span class="imgoff2 imgs"></span>
                        <span class="imgon2 imgs"></span>
                    </span>
                    <span class="imgs redirect inter_redirect web_only"></span>
                    <span class="imgs anuvadak web_only titles" tlt="anuvadak" id="anu_main1"></span>
                </div>
                <textarea id="first" class="normal Lipi-LekhikA" lipi-lekhika="off" spellcheck="false"
                    autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>
                <div class="in-flex">
                    <select class="lang" id="lang2"></select>
                    <button id="set_text1" class="set_text ekam-left"></button>
                    <button id="cp3" class="cpy_btn ekam-left titles" tlt="cpy_btn"></button>
                    <span id="up_arrow_img" class="imgs" style="margin:0 0 0 5px;"></span>
                    <span id="down_arrow_img" class="imgs" style="margin:0 -2px 0 -3.5px;"></span>
                    <span id="auto_img" class="imgs ekam-right" style="margin-left:5px;"></span>
                    <span class="checkbox_img img_inter2" img_check=0>
                        <span class="imgoff2 imgs"></span>
                        <span class="imgon2 imgs"></span>
                    </span>
                    <span class="imgs redirect inter_redirect web_only"></span>
                </div>
                <textarea id="second" class="normal Lipi-LekhikA" lipi-lekhika="off" spellcheck="false"
                    autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>
                <div>
                    <span id='no_prvrtn' lipi='no_prvrtn' class='lipi'></span>
                </div>
            </div>
        </div>
    </div>
    <div class="vr-flex extra" id="prayog" style="display:none;">
        <div class="in-extra">
            <select class="lang" id="xcv"></select>
            <div class="close_contain flex">
                <span id="close1" tlt="close_img" class="imgs close_img close_minus titles"></span>
            </div>
            <img id="image" class="block" tlt="image">
            <p id="shoonyam" lipi="anya_nirdesh" class="lipi"></p>
        </div>
        <div class="blocker"></div>
    </div>
    <div class="vr-flex extra" id="setting" style="display:none;">
        <div class="flex">
            <div class="in-extra" id="setting_in">
                <div class="lipi" lipi="defal_msg" id="set_msg"></div>
                <div class="close_contain flex">
                    <span id="close2" tlt="close_img" class="imgs close_img close_minus titles"></span>
                </div>
                <div class="defal">
                    <span tlt="lekhan_sahayika" lipi="sahayika_text" class="one lipi titles"></span>
                    <span id="sahayika_set" tlt="imgon1" class="checkbox_img">
                        <span class="imgoff2 imgs"></span>
                        <span class="imgon2 imgs"></span>
                    </span>
                </div>
                <div class="defal">
                    <span class="one lipi" lipi="script_set"></span>
                    <select id="script_set" class="lang script_set"></select>
                </div>
            </div>
        </div>
        <div class="blocker"></div>
    </div>
</div>
</div>
<div id="menu_container" style="display:none;">
    <div id="menu_body">
        <div id="lang_change_container" class="in-flex">
            <span id="lang_img" tlt="app_lang" class="imgs titles"></span>
            <select id="app_lang" tlt="app_lang" class="app_lang titles"></select>
            <span class="imgs redirect web_only" id="redirect1"></span>
        </div>
        <div class="menu_items ekam-left flex menu_borders">
            <span id="about_button" class="imgs"></span>
            <span id="about_msg" lipi="about_msg" class="lipi menu_msg"></span>
        </div>
        <div id="info_links" class="web_only vr-flex">
            <a target="_blank" class="menu_items menu_borders vr-flex no_under" href="https://rebrand.ly/lekhika">
                <span class="imgs home_img"></span><span lipi="home_link" class="lipi menu_msg"></span>
            </a>
            <a target="_blank" class="menu_items menu_borders vr-flex no_under"
                href="https://rebrand.ly/lekhikadownload">
                <span class="imgs download_img"></span><span lipi="download_link" class="lipi menu_msg"></span>
            </a>
            <a target="_blank" class="menu_items menu_borders vr-flex no_under"
                href="https://web.lipilekhika.com/source">
                <span class="imgs git"></span><span lipi="source_link" class="lipi menu_msg"></span>
            </a>
        </div>
        <div class='web_only vr-flex' id='bhAShA_sanchit'></div>
    </div>
    <div id="menu_blocker"></div>
</div>
<div id="store_html" style="display:none;">
    <div nm="main_btn">
        <span id="main_switch" tlt="imgon" class="titles checkbox_img">
            <span class="imgoff imgs"></span>
            <span class="imgon imgs"></span>
        </span>
        <button id="cp1" class="cpy_btn titles" tlt="cpy_btn"></button>
        <span class="imgs anuvadak web_only titles" tlt="anuvadak" id="anu_main"></span>
    </div>
    <div nm="main_lang">
        <div class="vr-flex1 script">
            <div class="flex typ_lang">
                <select class="lang titles" tlt="typ_lang" id="main_lang"></select>
                <span class="imgs redirect web_only" id="redirect0"></span>
                <span id="set_img" tlt="setting" class="imgs titles"></span>
            </div>
        </div>
    </div>
    <div nm="app_set">
        <span class="app_lang" style="padding-left:4px;padding-right:4px;border-radius:5px;">{0}</span>
    </div>
    <div nm="main_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang fonts {0}"></span>
    </div>
    <div nm="script_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang script_set fonts {0}"></span>
    </div>
    <div nm="from_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang fonts {0}"></span>
    </div>
    <div nm="to_set">
        <span style="padding-left:4px;padding-right:4px;padding:2px;border-radius:5px;" class="lang fonts {0}"></span>
    </div>
</div>