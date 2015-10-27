(function(global){
    'use strict';

    // ボタン
    var buttons = [
        '<li id="__info" role="button" class="_showDescription __button" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="__button_grayLarge">info</span></li>',
        '<li id="__title" role="button" class="_showDescription __button" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="__button_grayLarge">title</span></li>',
        '<li id="__code" role="button" class="_showDescription __button" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="__button_grayLarge">code</span></li>',
        '<li id="__hr" role="button" class="_showDescription __button" aria-label="hr：メッセージにhrタグを挿入します"><span class="__button_graySmall">hr</span></li>',
        '<li id="__qt" role="button" class="_showDescription __button" aria-label="qt：メッセージにqtタグを挿入します"><span class="__button_graySmall">qt</span></li>',
        '<li id="__bow" role="button" class="_showDescription __button" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="__button_yellowLarge">bow</span></li>',
        '<li id="__roger" role="button" class="_showDescription __button" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="__button_yellowLarge">roger</span></li>',
    ].join('');

    // DOMにボタンを追加
    document.getElementById('_chatSendTool').insertAdjacentHTML('beforeend', buttons);

    var ButtonController = function(){
        var self = this;

        // テキストエリア
        self.chatText = document.getElementById('_chatText');

        // 囲む系のタグ
        var pairTags = [{
            id: '__info',
            tagOpen: '[info]',
            tagClose: '[/info]'
        }, {
            id: '__title',
            tagOpen: '[title]',
            tagClose: '[/title]'
        }, {
            id: '__code',
            tagOpen: '[code]',
            tagClose: '[/code]'
        }];

        // 挿入するだけのタグ
        var unpairTags = [{
            id: '__hr',
            tag: '[hr]'
        }, {
            id: '__qt',
            tag: '[qt]'
        }, {
            id: '__bow',
            tag: '(bow)'
        }, {
            id: '__roger',
            tag: '(roger)'
        }];

        // 囲む
        pairTags.forEach(function(t){
            var tagOpen = t.tagOpen;
            var tagClose = t.tagClose;
            document.getElementById(t.id).addEventListener('click', function(){
                self.chatText.focus();
                var text = self.chatText.value;
                var start = self.chatText.selectionStart;
                var end = self.chatText.selectionEnd;
                var caret = end;
                if(start == end){
                    // キャレットの位置にタグを挿入
                    self.chatText.value = [
                        text.substr(0, caret),
                        tagOpen,
                        tagClose,
                        text.substr(caret, text.length),
                    ].join('');
                    caret += tagOpen.length;
                }else{
                    // 選択範囲のテキストをタグで囲む
                    self.chatText.value = [
                        text.substr(0, start),
                        tagOpen,
                        text.substr(start, end - start),
                        tagClose,
                        text.substr(end, text.length),
                    ].join('');
                    caret += tagOpen.length + tagClose.length;
                }
                self.chatText.setSelectionRange(caret, caret);
            });
        });

        // 挿入
        unpairTags.forEach(function(t){
            var tag = t.tag;
            document.getElementById(t.id).addEventListener('click', function(){
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
            });
        });
    };

    new ButtonController();
})(this);
