(function(global){
    'use strict';

    var ButtonController = function(){
        var self = this;

        // テキストエリア
        self.chatText = document.getElementById('_chatText');

        // ボタン
        var buttons = [
            '<li id="chatworkInputTools-info" role="button" class="_showDescription __button" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="__button_gray">info</span></li>',
            '<li id="chatworkInputTools-title" role="button" class="_showDescription __button" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="__button_gray">title</span></li>',
            '<li id="chatworkInputTools-code" role="button" class="_showDescription __button" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="__button_gray">code</span></li>',
            '<li id="chatworkInputTools-hr" role="button" class="_showDescription __button" aria-label="hr：メッセージにhrタグを挿入します"><span class="__button_gray">hr</span></li>',
            '<li id="chatworkInputTools-bow" role="button" class="_showDescription __button" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="__button_yellow">bow</span></li>',
            '<li id="chatworkInputTools-roger" role="button" class="_showDescription __button" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="__button_yellow">roger</span></li>',
            '<li id="chatworkInputTools-cracker" role="button" class="_showDescription __button" aria-label="roger：メッセージにクラッカーエモーティコンを挿入します"><span class="__button_yellow">cracker</span></li>',
        ].join('');

        // ボタン追加
        document.getElementById('_chatSendTool').insertAdjacentHTML('beforeend', buttons);

        // ハンドラ
        var eventHandlers = {
            'chatworkInputTools-info': enclose('[info]', '[/info]'),
            'chatworkInputTools-title': enclose('[title]', '[/title]'),
            'chatworkInputTools-code': enclose('[code]', '[/code]'),
            'chatworkInputTools-hr': insert('[hr]'),
            'chatworkInputTools-bow': insert('(bow)'),
            'chatworkInputTools-roger': insert('(roger)'),
            'chatworkInputTools-cracker': insert('(cracker)'),
        };

        // クリックイベント追加
        Object.keys(eventHandlers).forEach(function(key){
            var button = document.getElementById(key);
            button.addEventListener('click', eventHandlers[key]);
            button.removeAttribute('id');
        });

        // 選択テキストを囲む
        function enclose(tagOpen, tagClose){
            return function(){
                self.chatText.focus();
                var text = self.chatText.value;
                var start = self.chatText.selectionStart;
                var end = self.chatText.selectionEnd;
                var caret = end;
                caret += start == end ? tagOpen.length : tagOpen.length + tagClose.length;
                self.chatText.value = [
                    text.substr(0, start),
                    tagOpen,
                    text.substr(start, end - start),
                    tagClose,
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
    };

    new ButtonController();
})(this);
