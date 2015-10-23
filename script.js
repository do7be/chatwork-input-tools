(function(global){
    'use strict';

    // 要素を取得
    var chatSendTool = document.getElementById('_chatSendTool');
    var chatText = document.getElementById('_chatText');

    // ボタン要素定義
    var buttons = [
        { 'li': { 'id': '_chatSendTool_buttonInfo', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'info：選択したメッセージをinfoタグで囲みます', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonGrayLarge', ].join(' '), }, 'text': 'info', },
        { 'li': { 'id': '_chatSendTool_buttonTitle', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'title：選択したメッセージをtitleタグで囲みます', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonGrayLarge', ].join(' '), }, 'text': 'title', },
        { 'li': { 'id': '_chatSendTool_buttonCode', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'code：選択したメッセージをcodeタグで囲みます', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonGrayLarge', ].join(' '), }, 'text': 'code', },
        { 'li': { 'id': '_chatSendTool_buttonHr', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'hr：メッセージにhrタグを挿入します', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonGraySmall', ].join(' '), }, 'text': 'hr', },
        { 'li': { 'id': '_chatSendTool_buttonQt', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'qt：メッセージにqtタグを挿入します', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonGraySmall', ].join(' '), }, 'text': 'qt', },
        { 'li': { 'id': '_chatSendTool_buttonBow', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'bow：メッセージにおじぎエモーティコンを挿入します', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonYellowLarge', ].join(' '), }, 'text': 'bow', },
        { 'li': { 'id': '_chatSendTool_buttonRoger', 'role': 'button', 'class': [ '_showDescription', '_chatSendTool_listItem' ].join(' '), 'aria-label': 'roger：メッセージに了解！エモーティコンを挿入します', }, 'span': { 'class': [ '_chatSendTool_listItem_buttonYellowLarge', ].join(' '), }, 'text': 'roger', },
    ];

    // ボタンを追加する
    for (var i = 0; i < buttons.length; i += 1){
        var li = createElementWithAttributes('li', buttons[i].li);
        var span = createElementWithAttributes('span', buttons[i].span);
        var text = document.createTextNode(buttons[i].text);
        chatSendTool.appendChild(appendRecursive([li, span, text]));
    }

    // 要素を作成し属性を設定する
    function createElementWithAttributes(tagName, attributes){
        var element = document.createElement(tagName);
        Object.keys(attributes).forEach(function(key){
            element.setAttribute(key, attributes[key]);
        });
        return element;
    }

    // 再帰的に子要素として追加する
    function appendRecursive(elements){
        while(elements.length > 1){
            var lastElement = elements.pop();
            elements[elements.length - 1].appendChild(lastElement);
        }
        return elements.shift();
    }
})(this.self);
