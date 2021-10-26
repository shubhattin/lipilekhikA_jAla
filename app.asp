<div id="body_img"></div>
<div id="main_section" style="display:none;">
    <div id="base">
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
            <span tlt="back" class="back imgs" id="back_btn">
                <svg viewBox="0 0 32 32">
                    <g>
                        <path
                            d="M13,26a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L5.41,16l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,13,26Z" />
                        <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                    </g>
                </svg>
            </span>
            <span id="parivartak" tlt="parivartak" class="in-flex button">
                <span id="convert_img" class="imgs btn_img"></span>
                <span id="lbl3" lkh="parivartak"></span>
            </span>
            <span tlt='usage_btnm' class='usage_btnm prayog_btn imgs' id='up_usage'></span>
        </div>
        <div id="parri" style="display:none;">
            <p id="about_text" lkh="about_text" class="br-above"></p>
            <p id="paricaya" class="br-above"></p>
            <span class="flex br-above">
                <span id="lic" lkh="show_lic" class="button"></span>
                <a class='web_only dvayam-left' tlt="git" href='https://get.lipilekhika.com/source' target='_blank'>
                    <span id='git' class='git' chv="git"></span>
                </a>
            </span>
            <p id="licence" class="br-above" style="display:none"></p>
        </div>
        <div id="gRham" style="display:none;">
            <div class="flex">
                <span id="sa_mode" class="dvayam-right in-flex">
                    <label class="in-flex" tlt="sa_0" for="sa_04">
                        <input type="radio" class="sa_radio" name="sa_mode" id="sa_04">
                        <span id="sa_0" class="black-yeloow ajay"></span>
                    </label>
                    <label class="in-flex" tlt="sa_1" for="sa_14">
                        <input type="radio" class="sa_radio" name="sa_mode" id="sa_14">
                        <span id="sa_1" class="black-yellow ajay"></span>
                    </label>
                </span>
                <label class="check_img in-flex" for="sah_val">
                    <input type="checkbox" t=kr id="sah_val">
                    <span class="imgoff1 imgs" kr=off tlt="imgoff1"></span>
                    <span class="imgon1 imgs" kr=on tlt="imgon1"></span>
                    <span tlt="lekhan_sahayika" lkh="sahayika_text" id="sahayika_text"></span>
                </label>
            </div>
            <div class="vr-flex1">
                <div class="typ_lang flex">
                    <select class="lang" tlt="typ_lang" id="main_lang" of="#dynamic"></select>
                    <span class="redirect web_only" chv="redirect" id="redirect0"></span>
                    <span id="set_img" class="set_img" chv="setting" tlt="setting"></span>
                    <label id="main_switch" class="check_img dvayam" for="main_val">
                        <input type="checkbox" t=kr id="main_val" checked="true">
                        <span class="imgoff imgs" kr=off></span>
                        <span class="imgon imgs" kr=on></span>
                    </label>
                    <span id="cp1" class="cpy_btn dvayam-right" chv="cpy_btn" tlt="cpy_btn"></span>
                    <span class="anuvadak web_only" chv="anuvadak" tlt="anuvadak" id="anu_main"></span>
                </div>
            </div>
            <textarea id="dynamic" tlt="mukhya_lekhan" class="Lipi-LekhikA no_checking block"></textarea>
            <span id="table_btn" class="in-flex prayog_btn button">
                <span tlt="usage_btnm" class="usage_btnm imgs btn_img"></span>
                <span id="table" lkh="show_table"></span>
            </span>
        </div>
        <div id="inter" style="display:none;">
            <div class="in-flex">
                <select class="lang" id="lang1" of="#first"></select>
                <span id="cp2" chv="cpy_btn" class="cpy_btn ekam" tlt="cpy_btn"></span>
                <label class="check_img" for="img_inter1">
                    <input type="checkbox" t=kr class="img_inter1" id="img_inter1">
                    <span class="imgoff2" chv="imgoff2" kr=off></span>
                    <span class="imgon2" chv="imgon2" kr=on></span>
                </label>
                <span class="redirect inter_redirect web_only" chv="redirect"></span>
                <span class="anuvadak web_only" chv="anuvadak" tlt="anuvadak" id="anu_main1"></span>
            </div>
            <textarea id="first" class="normal Lipi-LekhikA block no_checking" lipi-lekhika="off"></textarea>
            <div class="in-flex">
                <select class="lang" id="lang2" of="#second"></select>
                <span id="cp3" chv="cpy_btn" class="cpy_btn ekam-left" tlt="cpy_btn"></span>
                <span id="up_arrow_img" chv="up_arrow" class="cnvrt" style="margin:0 0 0 5px;"></span>
                <span id="down_arrow_img" chv="down_arrow" class="cnvrt" style="margin:0 -2px 0 -3.5px;"></span>
                <span id="auto_img" chv="auto" class="ekam-right" style="margin-left:5px;"></span>
                <label class="check_img" for="img_inter2">
                    <input type="checkbox" t=kr class="img_inter2" id="img_inter2">
                    <span class="imgoff2" chv="imgoff2" kr=off></span>
                    <span class="imgon2" chv="imgon2" kr=on></span>
                </label>
                <span class="redirect inter_redirect web_only" chv="redirect"></span>
            </div>
            <textarea id="second" class="normal Lipi-LekhikA block no_checking" lipi-lekhika="off"></textarea>
            <div>
                <span lkh='no_prvrtn'></span>
            </div>
        </div>
    </div>
    <div class="vr-flex extra" id="prayog" style="display:none;">
        <div class="in-extra">
            <select class="lang" id="xcv"></select>
            <div class="close_contain flex">
                <span id="close1" tlt="close_img" chv="close_img" class="close_img close_minus"></span>
            </div>
            <img id="image" class="block" tlt="image">
            <p id="shoonyam" lkh="anya_nirdesh"></p>
        </div>
        <div class="blocker"></div>
    </div>
    <div class="vr-flex extra" id="setting" style="display:none;">
        <div class="flex">
            <div class="in-extra" id="setting_in">
                <div lkh="defal_msg" id="set_msg"></div>
                <div class="close_contain flex">
                    <span id="close2" tlt="close_img" chv="close_img" class="close_img close_minus"></span>
                </div>
                <div class="defal">
                    <span tlt="lekhan_sahayika" lkh="sahayika_text" class="one"></span>
                    <label class="check_img" for="sah_set_val">
                        <input type="checkbox" t=kr id="sah_set_val">
                        <span class="imgoff2" chv="imgoff2" kr=off></span>
                        <span class="imgon2" chv="imgon2" kr=on></span>
                    </label>
                </div>
                <div class="defal">
                    <span class="one" lkh="script_set"></span>
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
            <span id="lang_img" chv="lang" tlt="app_lang"></span>
            <select id="app_lang" tlt="app_lang" class="app_lang"></select>
            <span class="redirect web_only" chv="redirect" id="redirect1"></span>
        </div>
        <div id="about_menu" class="menu_items ekam-left flex menu_borders">
            <span id="about_button" chv="about"></span>
            <span lkh="about_msg" class="menu_msg"></span>
        </div>
        <div id="setting_menu" class="menu_items ekam-left flex menu_borders">
            <span class="set_img" chv="setting"></span>
            <span lkh="setting" class="menu_msg"></span>
        </div>
        <div id="prayog_menu" class="menu_items ekam-left flex menu_borders">
            <span class="usage_btnm imgs"></span>
            <span lkh="show_table" class="menu_msg"></span>
        </div>
        <div id="info_links" class="web_only vr-flex">
            <a target="_blank" class="menu_items menu_borders vr-flex no_under" href="https://rebrand.ly/lekhika">
                <span class="home_img imgs"></span>
                <span lkh="home_link" class="menu_msg"></span>
            </a>
            <a target="_blank" class="menu_items menu_borders vr-flex no_under"
                href="https://rebrand.ly/lekhikadownload">
                <span class="download_img" chv="download"></span>
                <span lkh="download_link" class="menu_msg"></span>
            </a>
            <a target="_blank" class="menu_items menu_borders vr-flex no_under" tlt="git"
                href="https://get.lipilekhika.com/androidsource">
                <span chv="git"></span>
                <span lkh="source_link" class="menu_msg"></span>
            </a>
        </div>
        <div class='web_only vr-flex' id='bhAShA_sanchit'></div>
    </div>
    <div id="menu_blocker"></div>
</div>
<div id="store_html" style="display:none;">
    <div nm="app_set">
        <span class="app_lang" style="padding-left:4px;padding-right:4px;border-radius:5px;">{0}</span>
    </div>
    <div nm="main_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang fonts" value="{0}"></span>
    </div>
    <div nm="script_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang script_set fonts"
            value="{0}"></span>
    </div>
    <div nm="from_set">
        <span style="padding-left:4px;padding-right:4px;border-radius:5px;" class="lang fonts" value="{0}"></span>
    </div>
    <div nm="to_set">
        <span style="padding-left:4px;padding-right:4px;padding:2px;border-radius:5px;" class="lang fonts"
            value="{0}"></span>
    </div>
</div>