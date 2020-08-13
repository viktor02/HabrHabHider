// ==UserScript==
// @name         HabrHider
// @namespace    http://vitka-k.ru
// @version      0.2.2
// @description  Скрывайте посты от неугодных вам хабов и блогов на главной, новости, партнерские посты и спонсорские материалы!
// @author       Viktor Karpov <vitka-k.ru>
// @copyright    2020, Viktor Karpov
// @license      MIT
// @homepageURL  https://github.com/viktor02/HabrHider
// @match        https://habr.com/ru/top/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
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
        'id': 'HabrHider',
        'fields':
            {
                'habs':
                    {
                        'label': 'Скрыть хабы',
                        'title': 'Настройки',
                        'section': ['Настройки',
                            'Вводите хабы в формате регулярных выражений, например так: <b>Карьера в IT-индустрии|Блог компании</b> <br>Внимание: пробелов между | и текстом не должно быть!'],
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
                    },
                'hide_block_vacancies':
                    {
                        'label': 'Скрыть вакансии',
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
let hide_block_vacancies = GM_config.get('hide_block_vacancies');

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
        let sponsors_el = document.querySelector("div.default-block_sidebar:nth-child(1)");
        sponsors_el.style.display = "none";
    }
    if (hide_best_companies === true){
        let companies_el = document.querySelector("#companies_rating");
        companies_el.style.display = "none";
    }
    if (hide_partner_materials === true){
        let partner_el = document.querySelector("li.content-list__item_post:nth-child(6)");
        partner_el.style.display = "none";
    }
    if (hide_block_vacancies === true){
        let vacancies_el = document.querySelector(".promo-block_vacancies");
        vacancies_el.parentElement.style.display = "none";
    }

})();