(function(global){
    'use strict';

    // 要素を取得
    var chatSendTool = document.getElementById('_chatSendTool');
    var chatText = document.getElementById('_chatText');

    // ボタン要素定義
    var buttons = [
        '<li id="_chatSendTool_buttonInfo" role="button" class="_showDescription _chatSendTool_button" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="_chatSendTool_button_tagLarge">info</span></li>',
        '<li id="_chatSendTool_buttonTitle" role="button" class="_showDescription _chatSendTool_button" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="_chatSendTool_button_tagLarge">title</span></li>',
        '<li id="_chatSendTool_buttonCode" role="button" class="_showDescription _chatSendTool_button" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="_chatSendTool_button_tagLarge">code</span></li>',
        '<li id="_chatSendTool_buttonHr" role="button" class="_showDescription _chatSendTool_button" aria-label="hr：メッセージにhrタグを挿入します"><span class="_chatSendTool_button_tagSmall">hr</span></li>',
        '<li id="_chatSendTool_buttonQt" role="button" class="_showDescription _chatSendTool_button" aria-label="qt：メッセージにqtタグを挿入します"><span class="_chatSendTool_button_tagSmall">qt</span></li>',
        '<li id="_chatSendTool_buttonBow" role="button" class="_showDescription _chatSendTool_button" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="_chatSendTool_button_emoticonLarge">bow</span></li>',
        '<li id="_chatSendTool_buttonRoger" role="button" class="_showDescription _chatSendTool_button" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="_chatSendTool_button_emoticonLarge">roger</span></li>',
    ].join('');

    // DOMにボタンを追加
    chatSendTool.insertAdjacentHTML('beforeend', buttons);
})(this.self);
