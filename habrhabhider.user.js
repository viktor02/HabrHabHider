// ==UserScript==
// @name         HabrHabHider
// @namespace    http://vitka-k.ru
// @version      0.1.0
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
        'id': 'HabrHabHider', // The id used for this instance of GM_config
        'fields': // Fields object
            {
                'habs': // This is the id of the field
                    {
                        'label': 'Habs', // Appears next to field
                        'type': 'text', // Makes this setting a text field
                        'default': 'Карьера в IT-индустрии' // Default value if user doesn't change it
                    }
            }
    });

let habs = GM_config.get('habs');

(function() {
    'use strict';
    // Поиск строки с хабами на главной
    let selectors = "ul.post__hubs.inline-list"
    let elementList = document.querySelectorAll(selectors);

    for (const element of elementList) {
        const elementText = element.innerText || element.textContent;

        if (elementText.search(habs) !== -1){
            element.parentElement.style.display = "none";
        }
    }

})();