(function(global){
    'use strict';

    // 要素取得
    var chatSendToolbar = document.getElementById('_chatSendToolbar');
    var chatSendTool = document.getElementById('_chatSendTool');
    var chatText = document.getElementById('_chatText');

    // ボタン格納先の要素を生成
    var chatSendToolExtension = createElementWithAttribute('ul', {
        'id': '_chatSendToolExtension',
    });

    // ボタン定義
    var buttons = [{
        'listener': encloseText('[info]', '[/info]'),
        'name': 'info',
        'ariaLabel': 'info：選択したメッセージをinfoタグで囲みます',
    }, {
        'listener': encloseText('[title]', '[/title]'),
        'name': 'title',
        'ariaLabel': 'title：選択したメッセージをtitleタグで囲みます',
    }, {
        'listener': encloseText('[code]', '[/code]'),
        'name': 'code',
        'ariaLabel': 'code：選択したメッセージをcodeタグで囲みます',
    }, {
        'listener': encloseText('[hr]'),
        'name': 'hr',
        'ariaLabel': 'hr：メッセージにhrタグを挿入します',
    }, {
        'listener': encloseText('(bow)'),
        'name': 'bow',
        'ariaLabel': 'bow：メッセージにおじぎエモーティコンを挿入します',
    }, {
        'listener': encloseText('(roger)'),
        'name': 'roger',
        'ariaLabel': 'roger：メッセージに了解！エモーティコンを挿入します',
    }, {
        'listener': encloseText('(cracker)'),
        'name': 'cracker',
        'ariaLabel': 'cracker：メッセージにクラッカーエモーティコンを挿入します',
    }];

    // ボタン要素を格納
    buttons.forEach(function(button){
        chatSendToolExtension.appendChild(createButtonElement(button));
    });

    // 画面に反映
    chatSendToolbar.insertBefore(chatSendToolExtension, chatSendTool.nextSubling);

    // 要素作成&属性設定
    function createElementWithAttribute(tagName, attributes){
        var attributes = attributes === undefined ? {} : attributes;
        var element = document.createElement(tagName);
        Object.keys(attributes).forEach(function(name){
            element.setAttribute(name, attributes[name]);
        });
        return element;
    }

    // ボタン要素を生成
    function createButtonElement(button){
        var textNode = document.createTextNode(button.name);
        var span = createElementWithAttribute('span', {
            'class': button.className === undefined ? 'button-text-default' : button.classNames,
        });
        var div = createElementWithAttribute('div', {
            'class': 'button-trigger',
        });
        div.addEventListener('click', button.listener);
        var li = createElementWithAttribute('li', {
            'role': 'button',
            'class': '_showDescription',
            'aria-label': button.ariaLabel,
        });
        span.appendChild(textNode);
        div.appendChild(span);
        li.appendChild(div);
        return li;
    };

    // 選択されたテキストを囲む
    function encloseText(openingTag, closingTag){
        openingTag = openingTag === undefined ? '' : openingTag;
        closingTag = closingTag === undefined ? '' : closingTag;
        return function(){
            chatText.focus();
            var text = chatText.value;
            var start = chatText.selectionStart;
            var end = chatText.selectionEnd;
            var caret = start == end ? start + openingTag.length : end + openingTag.length + closingTag.length;
            chatText.value = [
                text.substr(0, start),
                openingTag,
                text.substr(start, end - start),
                closingTag,
                text.substr(end, text.length),
            ].join('');
            chatText.setSelectionRange(caret, caret);
        };
    }
})(this);
