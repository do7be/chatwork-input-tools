(function(global){
    'use strict';

    // ボタン格納先を作成
    var chatSendToolExtension = document.createElement('ul');
    chatSendToolExtension.setAttribute('id', '_chatSendToolExtension');
    chatSendToolExtension.setAttribute('class', 'chatSendToolExtension');

    // ツールバー
    var chatSendToolbar = document.getElementById('_chatSendToolbar');
    var chatSendTool = document.getElementById('_chatSendTool');

    // ボタンクラス
    var Button = function(id, name, description, openingTag, closingTag, imageUrl){
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.openingTag = openingTag || '';
        this.closingTag = closingTag || '';
        this.imageUrl = imageUrl || '';
        this.textClassName = 'buttonText';
        this.emoticonClassName = 'buttonEmoticon';
        this.triggerClassName = 'buttonTrigger';
    };
    Button.prototype.chatText = document.getElementById('_chatText');
    Button.prototype.createElement = function(){
        var self = this;
        var textNode = document.createTextNode(this.name);
        var div = document.createElement('div');
        var li = document.createElement('li');
        if (this.imageUrl !== '') {
            // 絵文字ボタンの場合
            var img = document.createElement('img');
            img.setAttribute('class', this.emoticonClassName);
            img.setAttribute('src', this.imageUrl);
            div.appendChild(img);
        } else {
            var span = document.createElement('span');
            span.appendChild(textNode);
            span.setAttribute('class', this.textClassName);
            div.appendChild(span);
        }
        div.setAttribute('class', this.triggerClassName);
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

    // カスタムボタンクラス
    var CustomButton = function(){
        Button.apply(this, arguments);
        this.textClassName = 'customButtonText';
        this.triggerClassName = 'customButtonTrigger';
    };
    CustomButton.prototype = Object.create(Button.prototype);
    CustomButton.prototype.constructor = Button;
    CustomButton.prototype.createElement = function(){
        var self = this;
        var li = Button.prototype.createElement.call(this);
        var textNode = document.createTextNode('x');
        var span = document.createElement('span');
        var div = document.createElement('div');
        span.appendChild(textNode);
        span.setAttribute('class', 'deleteButtonText');
        div.appendChild(span);
        div.setAttribute('class', 'deleteButtonTrigger');
        div.addEventListener('dblclick', function(){
            chrome.storage.local.remove(self.id, function(){
                li.parentNode.removeChild(li);
            });
        });
        li.appendChild(div);
        return li;
    };

    // カスタムボタン入力フォーム
    var initializeCustomButtonForm = function(){
        var title = document.createElement('div');
        var nameInput = document.createElement('input');
        var nameLabel = document.createElement('div');
        var descriptionInput = document.createElement('input');
        var descriptionLabel = document.createElement('div');
        var openingTagInput = document.createElement('input');
        var openingTagLabel = document.createElement('div');
        var closingTagInput = document.createElement('input');
        var closingTagLabel = document.createElement('div');
        var imageUrlInput = document.createElement('input');
        var imageUrlLabel = document.createElement('div');
        var submit = document.createElement('input');
        var selector = document.createElement('div');
        var close = document.createElement('input');
        var triangle = document.createElement('div');
        var form = document.createElement('form');
        title.appendChild(document.createTextNode('Custom Button'));
        title.setAttribute('class', 'customButtonFormTitle');
        nameInput.setAttribute('class', 'customButtonFormNameInput');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('placeholder', 'required');
        nameLabel.appendChild(document.createTextNode('Name'));
        nameLabel.setAttribute('class', 'customButtonFormNameLabel');
        descriptionInput.setAttribute('class', 'customButtonFormDescriptionInput');
        descriptionInput.setAttribute('type', 'text');
        descriptionLabel.appendChild(document.createTextNode('Description'));
        descriptionLabel.setAttribute('class', 'customButtonFormDescriptionLabel');
        openingTagInput.setAttribute('class', 'customButtonFormOpeningTagInput');
        openingTagInput.setAttribute('type', 'text');
        openingTagInput.setAttribute('placeholder', 'required');
        openingTagLabel.appendChild(document.createTextNode('Opening Tag'));
        openingTagLabel.setAttribute('class', 'customButtonFormOpeningTagLabel');
        closingTagInput.setAttribute('class', 'customButtonFormClosingTagInput');
        closingTagInput.setAttribute('type', 'text');
        closingTagLabel.appendChild(document.createTextNode('Closing Tag'));
        closingTagLabel.setAttribute('class', 'customButtonFormClosingTagLabel');
        imageUrlInput.setAttribute('class', 'customButtonFormImageUrlInput');
        imageUrlInput.setAttribute('type', 'text');
        imageUrlLabel.appendChild(document.createTextNode('Image URL'));
        imageUrlLabel.setAttribute('class', 'customButtonFormImageUrlLabel');
        submit.setAttribute('class', 'customButtonFormSubmit');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Add');
        selector.setAttribute('class', 'customButtonFormSelector icoFontEmoticon icoSizeLarge');
        selector.setAttribute('value', '');
        selector.addEventListener('click', function(){
            var emoticonSelector = document.getElementById('emoticonListCustomSelector');
            if(!!emoticonSelector){
                // エモーティコンリストボックスがすでに存在する場合は閉じる
                emoticonSelector.parentNode.removeChild(emoticonSelector);
                return;
            }

            // エモーティコンのリストボックスの親要素をCloneする
            var emoticonList = document.getElementById('_emoticonList').cloneNode(false);
            emoticonList.id = 'emoticonListCustomSelector';
            emoticonList.classList.add('toolTip');
            emoticonList.classList.add('toolTipWhite');
            emoticonList.classList.add('mainContetTooltip');
            emoticonList.setAttribute('style', 'display: block;');

            // エモーティコンのリストボックスをCloneする
            var emoticonGallery = document.getElementById('_emoticonGallery').cloneNode(true);
            emoticonGallery.id = 'emoticonGalleryCustomSelector';

            emoticonList.appendChild(emoticonGallery);

            // エモーティコンをクリックした際の動作
            var emoticonListObject = emoticonList.querySelectorAll('li');
            Array.prototype.forEach.call(emoticonListObject, function(el, index) {
                el.addEventListener('click', function() {
                    // エモーティコンの情報をカスタムタグ入力フォームに埋め込む
                    var url = el.getElementsByTagName('img')[0].src;
                    var tag = el.getElementsByTagName('img')[0].alt;
                    nameInput.value = tag;
                    openingTagInput.value = tag;
                    imageUrlInput.value = url;

                    // エモーティコンリストを閉じる
                    document.body.removeChild(document.getElementById('emoticonListCustomSelector'));
                });
            });
            document.body.appendChild(emoticonList);

            // エモーティコンのボックスの位置調節
            var emoticonListTop = form.getBoundingClientRect().top - 193;
            var emoticonListLeft = addCustomButton.getBoundingClientRect().left + (addCustomButton.clientWidth / 2) - (emoticonList.clientWidth / 2);
            emoticonList.style.top = emoticonListTop + 'px';
            emoticonList.style.left = emoticonListLeft + 'px';
        });
        close.setAttribute('class', 'customButtonFormClose');
        close.setAttribute('type', 'button');
        close.setAttribute('value', 'x');
        close.addEventListener('click', function(){
            form.parentNode.removeChild(form);
        });
        triangle.setAttribute('class', 'customButtonFormTriangle');
        form.setAttribute('id', '_customButtonForm');
        form.setAttribute('class', 'customButtonForm');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            if(nameInput.value.length == 0 || openingTagInput.value.length == 0){
                return;
            }
            var data = {};
            var id = 'button' + (new Date()).getTime();
            var name = nameInput.value;
            var description = descriptionInput.value;
            var openingTag = openingTagInput.value;
            var closingTag = closingTagInput.value;
            var imageUrl = imageUrlInput.value;
            data[id] = {
                name: name,
                description: description,
                openingTag: openingTag,
                closingTag: closingTag,
                imageUrl: imageUrl,
            };
            chrome.storage.local.set(data, function(){
                var chatSendToolExtension = document.getElementById('_chatSendToolExtension');
                var customButton = new CustomButton(id, name, description, openingTag, closingTag, imageUrl);
                chatSendToolExtension.insertBefore(customButton.createElement(), document.getElementById('_addCustomButton'));
                form.parentNode.removeChild(form);
            });
        });
        form.appendChild(title);
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(openingTagLabel);
        form.appendChild(openingTagInput);
        form.appendChild(closingTagLabel);
        form.appendChild(closingTagInput);
        form.appendChild(imageUrlLabel);
        form.appendChild(imageUrlInput);
        form.appendChild(submit);
        form.appendChild(selector);
        form.appendChild(close);
        form.appendChild(triangle);
        document.body.appendChild(form);
        var chatSendArea = document.getElementById('_chatSendArea');
        var addCustomButton = document.getElementById('_addCustomButton');
        var formTop = chatSendArea.getBoundingClientRect().top - form.clientHeight;
        var formLeft = addCustomButton.getBoundingClientRect().left + (addCustomButton.clientWidth / 2) - (form.clientWidth / 2);
        form.style.top = formTop + 'px';
        form.style.left = formLeft + 'px';
        nameInput.focus();
        var chatSendToolExtension = document.getElementById('_chatSendToolExtension');
    };

    // 入力フォーム表示ボタン
    var addCustomButton = document.createElement('li');
    var addCustomButtonText = document.createElement('span');
    var addCustomButtonTrigger = document.createElement('div');
    addCustomButtonText.appendChild(document.createTextNode('+'));
    addCustomButtonText.setAttribute('class', 'addButtonText');
    addCustomButtonTrigger.appendChild(addCustomButtonText);
    addCustomButtonTrigger.setAttribute('class', 'addButtonTrigger');
    addCustomButtonTrigger.addEventListener('click', function(){
        var form = document.getElementById('_customButtonForm');
        if(!!form){
            return;
        }
        initializeCustomButtonForm();
    });
    addCustomButton.appendChild(addCustomButtonTrigger);
    addCustomButton.setAttribute('class', '_showDescription');
    addCustomButton.setAttribute('role', 'button');
    addCustomButton.setAttribute('aria-label', '新しいボタンを追加します');
    addCustomButton.setAttribute('id', '_addCustomButton');
    chatSendToolExtension.appendChild(addCustomButton);

    // ボタン定義
    var buttonParams = [{
        'name': 'info',
        'description': 'info：選択したメッセージをinfoタグで囲みます',
        'openingTag': '[info]',
        'closingTag': '[/info]',
        'imageUrl': '',
    }, {
        'name': 'title',
        'description': 'title：選択したメッセージをtitleタグで囲みます',
        'openingTag': '[title]',
        'closingTag': '[/title]',
        'imageUrl': '',
    }, {
        'name': 'code',
        'description': 'code：選択したメッセージをcodeタグで囲みます',
        'openingTag': '[code]',
        'closingTag': '[/code]',
        'imageUrl': '',
    }, {
        'name': 'bow',
        'description': 'bow：メッセージにおじぎエモーティコンを挿入します',
        'openingTag': '(bow)',
        'closingTag': '',
        'imageUrl': '',
    }, {
        'name': 'roger',
        'description': 'roger：メッセージに了解！エモーティコンを挿入します',
        'openingTag': '(roger)',
        'closingTag': '',
        'imageUrl': '',
    }];

    // ボタンを作成
    buttonParams.forEach(function(param, index){
        var button = new Button(index, param.name, param.description, param.openingTag, param.closingTag, param.imageUrl);
        chatSendToolExtension.insertBefore(button.createElement(), addCustomButton);
    });

    // カスタムボタンを作成
    var customButtons = chrome.storage.local.get(function(result){
        Object.keys(result).forEach(function(id){
            var b = new CustomButton(id, result[id].name, result[id].description, result[id].openingTag, result[id].closingTag, result[id].imageUrl);
            chatSendToolExtension.insertBefore(b.createElement(), addCustomButton);
        });
    });

    // ツールバーに追加
    chatSendToolbar.appendChild(chatSendToolExtension);
})(this);
