// ==UserScript==
// @name         HabrHabHider
// @namespace    http://vitka-k.ru
// @version      0.2.0
// @description  Скрывает посты от неугодных вам хабов на главной
// @author       Viktor Karpov <vitka-k.ru>
// @license      MIT
// @match        https://habr.com/ru/top/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==

// Меню со ссылкой на гитхаб
GM_registerMenuCommand('GitHub', () => {
    GM_openInTab('https://github.com/viktor02/HabrHabHider', {active: true, insert: true});
});

// Меню с настройками
GM_registerMenuCommand('Settings', () => {
    GM_config.open();
});


GM_config.init(
    {
        'id': 'HabrHabHider',
        'fields':
            {
                'habs':
                    {
                        'label': 'Скрыть хабы',
                        'title': 'Настройки',
                        'section': ['Настройки',
                            'Вводите хабы в формате регулярных выражений, например так: Карьера в IT-индустрии|Блог компании <br>Внимание: пробелов между | и текстом не должно быть!'],
                        'type': 'text',
                        'default': ''
                    },
                'hide_news':
                    {
                        'label': 'Скрыть новости',
                        'type': 'checkbox',
                        'default': false
                    },
                'hide_sponsors':
                    {
                        'label': 'Скрыть спонсоров',
                        'type': 'checkbox',
                        'default': false
                    },
                'hide_best_companies':
                    {
                        'label': 'Скрыть лучшие компании',
                        'type': 'checkbox',
                        'default': false
                    },
                'hide_partner_materials':
                    {
                        'label': 'Скрыть партнерские материалы',
                        'type': 'checkbox',
                        'default': false
                    }
            }
    });


let habs = GM_config.get('habs');
let hide_news = GM_config.get('hide_news');
let hide_sponsors = GM_config.get('hide_sponsors');
let hide_best_companies = GM_config.get('hide_best_companies');
let hide_partner_materials = GM_config.get('hide_partner_materials');

(function() {
    'use strict';
    // Поиск строки с хабами на главной
    let selectors = "ul.post__hubs.inline-list"
    let habs_el = document.querySelectorAll(selectors);

    for (const element of habs_el) {
        const elementText = element.innerText || element.textContent;
        if (habs === ""){
            break
        }
        else if (elementText.search(habs) !== -1){
            element.parentElement.parentElement.style.display = "none";
        }
    }

    if (hide_news === true){
        let news_el = document.querySelector(".content-list__item_news-block");
        news_el.style.display = "none";
    }
    if (hide_sponsors === true){
        let news_el = document.querySelector("div.default-block_sidebar:nth-child(1)");
        news_el.style.display = "none";
    }
    if (hide_best_companies === true){
        let news_el = document.querySelector("#companies_rating");
        news_el.style.display = "none";
    }
    if (hide_partner_materials === true){
        let news_el = document.querySelector("li.content-list__item_post:nth-child(6)");
        news_el.style.display = "none";
    }

})();