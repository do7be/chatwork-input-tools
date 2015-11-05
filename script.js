(function(global){
    'use strict';

    // ボタン格納先を作成
    var chatSendToolExtension = document.createElement('ul');
    chatSendToolExtension.setAttribute('class', 'chatSendToolExtension');

    // ツールバー
    var chatSendToolbar = document.getElementById('_chatSendToolbar');
    var chatSendTool = document.getElementById('_chatSendTool');

    // ボタンクラス
    var Button = function(name, description, openingTag, closingTag){
        this.name = name || '';
        this.description = description || '';
        this.openingTag = openingTag || '';
        this.closingTag = closingTag || '';
    };
    Button.prototype.chatText = document.getElementById('_chatText');
    Button.prototype.createElement = function(){
        var self = this;
        var textNode = document.createTextNode(this.name);
        var span = document.createElement('span');
        var div = document.createElement('div');
        var li = document.createElement('li');
        span.appendChild(textNode);
        span.setAttribute('class', 'button-normal');
        div.appendChild(span);
        div.setAttribute('class', 'button-trigger');
        div.addEventListener('click', function(){
            self.chatText.focus();
            var text = self.chatText.value;
            var start = self.chatText.selectionStart;
            var end = self.chatText.selectionEnd;
            var caret = start == end || self.closingTag.length == 0 ? start + self.openingTag.length : end + self.openingTag.length + self.closingTag.length;
            self.chatText.value = text.substr(0, start) + self.openingTag + text.substr(start, end - start) + self.closingTag + text.substr(end, text.length);
            self.chatText.setSelectionRange(caret, caret);
        })
        li.appendChild(div);
        li.setAttribute('role', 'button');
        li.setAttribute('class', '_showDescription');
        li.setAttribute('aria-label', this.description);
        return li;
    };

    // ボタン定義
    var buttons = [{
        'name': 'info',
        'description': 'info：選択したメッセージをinfoタグで囲みます',
        'openingTag': '[info]',
        'closingTag': '[/info]',
    }, {
        'name': 'title',
        'description': 'title：選択したメッセージをtitleタグで囲みます',
        'openingTag': '[title]',
        'closingTag': '[/title]',
    }, {
        'name': 'code',
        'description': 'code：選択したメッセージをcodeタグで囲みます',
        'openingTag': '[code]',
        'closingTag': '[/code]',
    }, {
        'name': 'bow',
        'description': 'bow：メッセージにおじぎエモーティコンを挿入します',
        'openingTag': '(bow)',
        'closingTag': '',
    }, {
        'name': 'roger',
        'description': 'roger：メッセージに了解！エモーティコンを挿入します',
        'openingTag': '(roger)',
        'closingTag': '',
    }];

    // ボタンを作成
    buttons.forEach(function(button){
        var button = new Button(button.name, button.description, button.openingTag, button.closingTag);
        chatSendToolExtension.appendChild(button.createElement());
    });

    // ツールバーに追加
    chatSendToolbar.appendChild(chatSendToolExtension);
})(this);
