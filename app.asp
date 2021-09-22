<div id="main_section" style="display:none;">
    <div id="main1">
        <div class="in-flex">
            <span id="menu_btn" class="imgs"></span>
            <span tlt="back" class="back titles imgs" id="back_btn"></span>
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
                        <span class="titles in-flex" tlt="sa_0">
                            <input type="radio" class="sa_radio" name="sanskrit" id="sa_04">
                            <label for="sa_04" id="sa_0" class="black-yeloow ajay"></label>
                        </span>
                        <span class="titles in-flex" tlt="sa_1">
                            <input type="radio" class="sa_radio" name="sanskrit" id="sa_14">
                            <label for="sa_14" id="sa_1" class="black-yellow ajay"></label>
                        </span>
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
                </div>
                <textarea id="first" class="normal Lipi-LekhikA" lipi-lekhika="off" spellcheck="false"
                    autocapitalize="none" autocomplete="off" autocorrect="off"></textarea>
                <div class="in-flex">
                    <select class="lang" id="lang2"></select>
                    <button id="set_text1" class="set_text ekam-left"></button>
                    <button id="cp3" class="cpy_btn ekam-left"></button>
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
                    <select id="script_set" class="lang"></select>
                </div>
            </div>
        </div>
        <div class="blocker"></div>
    </div>
    <select class='विकल्पानि'>
        <option class='विकल्पम्'></option>
    </select>
</div>
</div>
<div id="menu_container" style="display:none;">
    <div id="menu_body">
        <div id="lang_change_container" class="in-flex">
            <span id="lang_img" tlt="app_lang" class="imgs titles"></span>
            <select id="app_lang" tlt="app_lang" class="titles"></select>
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
    <p nm="main_btn">
        <span id="main_switch" tlt="imgon" class="titles checkbox_img">
            <span class="imgoff imgs"></span>
            <span class="imgon imgs"></span>
        </span>
        <button id="cp1" class="cpy_btn titles" tlt="cpy_btn"></button>
        <span class="imgs anuvadak web_only" id="anu_main"></span>
    </p>
    <div nm="main_lang">
        <div class="vr-flex1 script">
            <div class="flex typ_lang">
                <select class="lang titles" tlt="typ_lang" id="main_lang"></select>
                <span class="imgs redirect web_only" id="redirect0"></span>
                <span id="set_img" tlt="setting" class="imgs titles"></span>
            </div>
        </div>
    </div>
    <p nm="app_set">
        <span id="app_lang" style="padding-left:4px;padding-right:4px;border-radius:5px;">{0}</span>
    </p>
    <p nm="main_set">
        <span id="main_lang" resize=0 style="padding-left:4px;padding-right:4px;border-radius:5px;"
            class="lang fonts {0}"></span>
    </p>
    <p nm="script_set">
        <span id="script_set" resize=0 style="padding-left:4px;padding-right:4px;border-radius:5px;"
            class="lang fonts {0}"></span>
    </p>
    <p nm="from_set">
        <span id="lang1" resize=0 style="padding-left:4px;padding-right:4px;border-radius:5px;"
            class="lang fonts {0}"></span>
    </p>
    <p nm="to_set">
        <span id="lang2" resize=0 style="padding-left:4px;padding-right:4px;padding:2px;border-radius:5px;"
            class="lang fonts {0}"></span>
    </p>
    <div nm="img">
        <p nm="menu_btn">
            <svg width="35px" height="35px" viewBox="0 0 512 512">
                <g>
                    <path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                    <path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                    <path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
                </g>
            </svg>
        </p>
        <p nm="cpy_btn">
            <svg class="cpy_btn_img" hieght="16px" width="16px" viewBox="0 0 21 22">
                <g transform="translate(-86.000000, -127.000000)">
                    <g transform="translate(86.500000, 127.000000)">
                        <path
                            d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z" />
                    </g>
                </g>
            </svg>
        </p>
        <p nm="git">
            <svg hieght="25px" width="25px" viewBox="0 0 512 512">
                <g>
                    <path
                        d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14  c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5 c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7 c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3 c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7 C480,134.8,379.7,32,256,32z" />
                </g>
            </svg>
        </p>
        <p nm="redirect">
            <svg height="19px" width="19px" viewBox="0 0 24 24">
                <path
                    d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z" />
            </svg>
        </p>
        <p nm="setting">
            <svg height="22px" width="22px" viewBox="0 0 32 32">
                <path
                    d="M27.526,18.036L27,17.732c-0.626-0.361-1-1.009-1-1.732s0.374-1.371,1-1.732l0.526-0.304  c1.436-0.83,1.927-2.662,1.098-4.098l-1-1.732c-0.827-1.433-2.666-1.925-4.098-1.098L23,7.339c-0.626,0.362-1.375,0.362-2,0  c-0.626-0.362-1-1.009-1-1.732V5c0-1.654-1.346-3-3-3h-2c-1.654,0-3,1.346-3,3v0.608c0,0.723-0.374,1.37-1,1.732  c-0.626,0.361-1.374,0.362-2,0L8.474,7.036C7.042,6.209,5.203,6.701,4.375,8.134l-1,1.732c-0.829,1.436-0.338,3.269,1.098,4.098  L5,14.268C5.626,14.629,6,15.277,6,16s-0.374,1.371-1,1.732l-0.526,0.304c-1.436,0.829-1.927,2.662-1.098,4.098l1,1.732  c0.828,1.433,2.667,1.925,4.098,1.098L9,24.661c0.626-0.363,1.374-0.361,2,0c0.626,0.362,1,1.009,1,1.732V27c0,1.654,1.346,3,3,3h2  c1.654,0,3-1.346,3-3v-0.608c0-0.723,0.374-1.37,1-1.732c0.625-0.361,1.374-0.362,2,0l0.526,0.304  c1.432,0.826,3.271,0.334,4.098-1.098l1-1.732C29.453,20.698,28.962,18.865,27.526,18.036z M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5  s5,2.243,5,5S18.757,21,16,21z" />
            </svg>
        </p>
        <p nm="close_img">
            <svg viewBox="0 0 512 512">
                <path
                    d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
            </svg>
        </p>
        <p nm="down_arrow">
            <svg viewBox="0 0 32 32" height="28.5px" width="28.5px">
                <g>
                    <path
                        d="M16.47,16.88,26.34,7a1,1,0,0,0-1.41-1.41l-9.06,9.06-8.8-8.8a1,1,0,0,0-1.41,0h0a1,1,0,0,0,0,1.42l9.61,9.61A.85.85,0,0,0,16.47,16.88Z" />
                    <path
                        d="M16.47,26.46l9.87-9.88a1,1,0,0,0-1.41-1.41l-9.06,9.06-8.8-8.8a1,1,0,0,0-1.41,0h0a1,1,0,0,0,0,1.41l9.61,9.62A.85.85,0,0,0,16.47,26.46Z" />
                </g>
            </svg>
        </p>
        <p nm="back">
            <svg viewBox="0 0 32 32">
                <g>
                    <path
                        d="M13,26a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L5.41,16l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,13,26Z" />
                    <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                </g>
            </svg>
        </p>
        <p nm="up_arrow">
            <svg viewBox="0 0 32 32" height="28.5px" width="28.5px">
                <g>
                    <path
                        d="M16.47,15.12,26.34,25a1,1,0,0,1-1.41,1.41l-9.06-9.06-8.8,8.8a1,1,0,0,1-1.41,0h0a1,1,0,0,1,0-1.42l9.61-9.61A.85.85,0,0,1,16.47,15.12Z" />
                    <path
                        d="M16.47,5.54l9.87,9.88a1,1,0,0,1-1.41,1.41L15.87,7.77l-8.8,8.8a1,1,0,0,1-1.41,0h0a1,1,0,0,1,0-1.41l9.61-9.62A.85.85,0,0,1,16.47,5.54Z" />
                </g>
            </svg>
        </p>
        <p nm="imgon2">
            <svg viewBox="0 0 16 16">
                <path
                    d="M11,3H5C2.239,3,0,5.239,0,8s2.239,5,5,5h6c2.761,0,5-2.239,5-5S13.761,3,11,3z M11,12H5c-2.206,0-4-1.794-4-4s1.794-4,4-4  h6c2.206,0,4,1.794,4,4S13.206,12,11,12z" />
                <circle style="fill:green" cx="11" cy="8" r="3" /></svg>
        </p>
        <p nm="imgoff2">
            <svg viewBox="0 0 16 16">
                <path
                    d="M11,3H5C2.239,3,0,5.239,0,8s2.239,5,5,5h6c2.761,0,5-2.239,5-5S13.761,3,11,3z M11,12H5c-2.206,0-4-1.794-4-4s1.794-4,4-4  h6c2.206,0,4,1.794,4,4S13.206,12,11,12z" />
                <circle style="fill:red" cx="5" cy="8" r="3" /></svg>
        </p>
        <p nm="about">
            <svg viewBox="0 0 32 32">
                <g>
                    <path
                        d="M22.6787,5H9.3213A4.3216,4.3216,0,0,0,5,9.3218V22.6782A4.3216,4.3216,0,0,0,9.3213,27H22.6787A4.3216,4.3216,0,0,0,27,22.6782V9.3218A4.3216,4.3216,0,0,0,22.6787,5ZM16,9.0625a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,9.0625ZM18.0625,23h-4a1,1,0,0,1,0-2H15V15h-.9375a1,1,0,0,1,0-2H17v8h1.0625a1,1,0,0,1,0,2Z" />
                </g>
            </svg>
        </p>
        <p nm="anuvadak">
            <svg viewBox="0 0 512 512">
                <path
                    d="M479.068,96h-216.32l-22.515,87.1l-8.083,57.242l43.329,120.845l6.957,146.639h196.633  c18.184,0,32.932-14.748,32.932-32.932V128.932C512,110.748,497.252,96,479.068,96z"
                    style="fill:#E6E6E6;" />
                <polygon points="368.696,416 282.435,507.826 251.882,416 264.348,382.521 " style="fill:#3A5BBC;" />
                <path
                    d="M469.565,244.174v-20.87h-79.304v-29.217h-20.87v29.217H297.92v20.87h115.89  c-6.446,13.572-17.621,35.215-32.978,58.035c-14.132-17.649-23.062-29.931-23.168-30.077l-6.129-8.445l-16.892,12.255l6.127,8.445  c0.477,0.658,10.876,14.963,27.338,35.3c-11.222,13.749-31.808,36.106-42.655,46.952l14.756,14.756  c9.362-9.362,28.774-30.214,41.426-45.327c16.459,19.553,32.523,37.194,47.854,52.526l7.378,7.378l14.758-14.755l-7.378-7.378  c-15.839-15.839-32.519-34.264-49.647-54.799c22.133-31.823,36.48-61.956,42.2-74.866H469.565z"
                    style="fill:#808080;" />
                <path
                    d="M349.329,357.523L368.696,416H251.882H32.932C14.734,416,0,401.252,0,383.068V37.106  C0,18.922,14.734,4.174,32.932,4.174h199.416L262.748,96l45.607,137.739L349.329,357.523z"
                    style="fill:#518EF8;" />
                <path
                    d="M149.301,287.374c-42.77,0-77.565-34.795-77.565-77.565s34.795-77.565,77.565-77.565  c20.704,0,40.182,8.065,54.845,22.712l-14.749,14.766c-10.723-10.71-24.961-16.608-40.097-16.608  c-31.263,0-56.696,25.433-56.696,56.696s25.433,56.696,56.696,56.696c27.698,0,50.82-19.967,55.733-46.261h-55.731v-20.87h77.565  v10.435C226.866,252.579,192.071,287.374,149.301,287.374z"
                    style="fill:#FFFFFF;" />
            </svg>
        </p>
    </div>
</div>