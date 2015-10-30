(function(global){
    'use strict';

    var ButtonController = function(){
        var self = this;

        // 要素取得
        self.chatText = document.getElementById('_chatText');
        self.chatSendTool = document.getElementById('_chatSendTool');

        var buttons = [{
            'listener': enclose('[info]', '[/info]'),
            'text': 'info',
            'class': '__button_gray',
            'ariaLabel': 'info：選択したメッセージをinfoタグで囲みます',
        }, {
            'listener': enclose('[title]', '[/title]'),
            'text': 'title',
            'class': '__button_gray',
            'ariaLabel': 'title：選択したメッセージをtitleタグで囲みます',
        }, {
            'listener': enclose('[code]', '[/code]'),
            'text': 'code',
            'class': '__button_gray',
            'ariaLabel': 'code：選択したメッセージをcodeタグで囲みます',
        }, {
            'listener': insert('[hr]'),
            'text': 'hr',
            'class': '__button_gray',
            'ariaLabel': 'hr：メッセージにhrタグを挿入します',
        }, {
            'listener': insert('(bow)'),
            'text': 'bow',
            'class': '__button_yellow',
            'ariaLabel': 'bow：メッセージにおじぎエモーティコンを挿入します',
        }, {
            'listener': insert('(roger)'),
            'text': 'roger',
            'class': '__button_yellow',
            'ariaLabel': 'roger：メッセージに了解！エモーティコンを挿入します',
        }, {
            'listener': insert('(cracker)'),
            'text': 'cracker',
            'class': '__button_yellow',
            'ariaLabel': 'cracker：メッセージにクラッカーエモーティコンを挿入します',
        }];

        // 要素作成&属性設定
        function createElementWithAttribute(tagName, attributes){
            var attributes = attributes === undefined ? {} : attributes;
            var element = document.createElement(tagName);
            Object.keys(attributes).forEach(function(key){
                element.setAttribute(key, attributes[key]);
            });
            return element;
        }

        // ボタン要素生成
        function createButtonElement(button){
            var li = createElementWithAttribute('li', {
                'role': 'button',
                'class': '_showDescription',
                'aria-label': button.ariaLabel,
            });
            var div = createElementWithAttribute('div', {
                'class': '__button',
            });
            div.addEventListener('click', button.listener);
            var span = createElementWithAttribute('span', {
                'class': button.class,
            });
            var textNode = document.createTextNode(button.text);
            span.appendChild(textNode);
            div.appendChild(span);
            li.appendChild(div);
            return li;
        };

        // 選択テキストを囲む
        function enclose(openingTag, closingTag){
            return function(){
                self.chatText.focus();
                var text = self.chatText.value;
                var start = self.chatText.selectionStart;
                var end = self.chatText.selectionEnd;
                var caret = end;
                caret += start == end ? openingTag.length : openingTag.length + closingTag.length;
                self.chatText.value = [
                    text.substr(0, start),
                    openingTag,
                    text.substr(start, end - start),
                    closingTag,
                    text.substr(end, text.length),
                ].join('');
                self.chatText.setSelectionRange(caret, caret);
            };
        }

        // 選択位置に挿入
        function insert(tag){
            return function(){
                self.chatText.focus();
                var text = self.chatText.value;
                var start = self.chatText.selectionStart;
                var caret = start + tag.length;
                self.chatText.value = [
                    text.substr(0, start),
                    tag,
                    text.substr(start, text.length),
                ].join('');
                self.chatText.setSelectionRange(caret, caret);
            };
        }

        // ボタン追加
        var fragment = document.createDocumentFragment();
        buttons.forEach(function(button){
            var element = createButtonElement(button);
            fragment.appendChild(element);
        });
        self.chatSendTool.appendChild(fragment);









        // ボタン要素生成
        function createCustomButtonElement(button){
            button.class = '__button_custom';
            var li = createButtonElement(button);

            var divDelete = createElementWithAttribute('div', {
                'class': '__button',
            });
            var spanDelete = createElementWithAttribute('span', {
                'class': '__button_delete',
            });
            var textNodeDelete = document.createTextNode('x');
            spanDelete.appendChild(textNodeDelete);
            divDelete.appendChild(spanDelete);
            divDelete.addEventListener('click', function(){
                self.chatSendTool.removeChild(li);
            });

            li.appendChild(divDelete);
            return li;
        };

        
        self.chatSendTool.appendChild(createCustomButtonElement({
            'listener': insert('[info]', '[/info]'),
            'text': 'info',
            'ariaLabel': 'info：選択したメッセージをinfoタグで囲みます',
        }));
    };

    new ButtonController();
})(this);
