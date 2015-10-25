(function(global){
    'use strict';

    // 要素を取得
    var chatSendTool = document.getElementById('_chatSendTool');
    var chatText = document.getElementById('_chatText');

    // ボタン
    var buttons = [
        '<li id="_chatSendTool_buttonInfo" role="button" class="_showDescription _chatSendTool_button" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="_chatSendTool_button_grayLarge">info</span></li>',
        '<li id="_chatSendTool_buttonTitle" role="button" class="_showDescription _chatSendTool_button" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="_chatSendTool_button_grayLarge">title</span></li>',
        '<li id="_chatSendTool_buttonCode" role="button" class="_showDescription _chatSendTool_button" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="_chatSendTool_button_grayLarge">code</span></li>',
        '<li id="_chatSendTool_buttonHr" role="button" class="_showDescription _chatSendTool_button" aria-label="hr：メッセージにhrタグを挿入します"><span class="_chatSendTool_button_graySmall">hr</span></li>',
        '<li id="_chatSendTool_buttonQt" role="button" class="_showDescription _chatSendTool_button" aria-label="qt：メッセージにqtタグを挿入します"><span class="_chatSendTool_button_graySmall">qt</span></li>',
        '<li id="_chatSendTool_buttonBow" role="button" class="_showDescription _chatSendTool_button" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="_chatSendTool_button_yellowLarge">bow</span></li>',
        '<li id="_chatSendTool_buttonRoger" role="button" class="_showDescription _chatSendTool_button" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="_chatSendTool_button_yellowLarge">roger</span></li>',
    ];

    // クリックイベント
    var events = [
        {id: '_chatSendTool_buttonInfo', func: sorround, params: {tagOpen: '[info]', tagClose: '[/info]'}},
        {id: '_chatSendTool_buttonTitle', func: sorround, params: {tagOpen: '[title]', tagClose: '[/title]'}},
        {id: '_chatSendTool_buttonCode', func: sorround, params: {tagOpen: '[code]', tagClose: '[/code]'}},
        {id: '_chatSendTool_buttonHr', func: insert, params: {tag: '[hr]'}},
        {id: '_chatSendTool_buttonQt', func: insert, params: {tag: '[qt]'}},
        {id: '_chatSendTool_buttonBow', func: insert, params: {tag: '(bow)'}},
        {id: '_chatSendTool_buttonRoger', func: insert, params: {tag: '(roger)'}},
    ];

    // タグで囲む
    function sorround(params){
        var tagOpen = params.tagOpen;
        var tagClose = params.tagClose;
        return function(){
            chatText.focus();
            var text = chatText.value;
            var start = chatText.selectionStart;
            var end = chatText.selectionEnd;
            var caret = end;
            if(start == end){
                // キャレットの位置にタグを挿入
                chatText.value = [
                    text.substr(0, caret),
                    tagOpen,
                    tagClose,
                    text.substr(caret, text.length),
                ].join('');
                caret += tagOpen.length;
            }else{
                // 選択範囲のテキストをタグで囲む
                chatText.value = [
                    text.substr(0, start),
                    tagOpen,
                    text.substr(start, end - start),
                    tagClose,
                    text.substr(end, text.length),
                ].join('');
                caret += tagOpen.length + tagClose.length;
            }
            chatText.setSelectionRange(caret, caret);
        };
    }

    // タグを挿入
    function insert(params){
        var tag = params.tag;
        return function(){
            chatText.focus();
            var text = chatText.value;
            var start = chatText.selectionStart;
            var caret = start + tag.length;
            chatText.value = [
                text.substr(0, start),
                tag,
                text.substr(start, text.length),
            ].join('');
            chatText.setSelectionRange(caret, caret);
        };
    }

    // DOMにボタンを追加
    chatSendTool.insertAdjacentHTML('beforeend', buttons.join(''));

    // イベントをバインド
    events.forEach(function(e){
        document.getElementById(e.id).addEventListener('click', e.func(e.params));
    });
})(this.self);
