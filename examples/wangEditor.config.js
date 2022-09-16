const E = window.wangEditor;

const { BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;

const excludeMenus = [
    'video'
];

// 创建 class
class SelectVideoMenu extends BtnMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu" data-title="视频库">
                <i class="w-e-icon-play"></i>
            </div>`
        );
        // editor.config.pasteFilterStyle = false;
        super($elem, editor);
    }
    // 菜单点击事件
    clickHandler() {
        let self = this;
        selectVideoV2('radio',[], function (data) {
            console.log(data)
            if (data.length === 0) {
                return;
            }
            let id = 'editor-player-' + uuid(8);
            let template = `
            <br>
            <p data-we-empty-p>
                <div class="w-fake-img wangmoviebox" contenteditable="false" style='background-image: url("{cover_url}"); height: 100%; background-size: cover; background-repeat: no-repeat;padding-bottom: 56.65%;height: 0; overflow: hidden;top: 0;left: 0;right: 0;background-position: center;' id="{id}">
                <script>
                var player = new Aliplayer({
                    id: '{id}',
                    source: '{source}',
                    videoWidth: '{videoWidth}',
                    videoHeight: '{videoHeight}',
                },function(player){
                   
                });
                <\/script> 
                <div class="mask w-fake-img"><i class="iconfont icon-suspended"></i></div>
                </div>
            </p>
            <br>
            `

            let video_url = data[0].m3u8 ? data[0].m3u8 : data[0].video_url;

            let content = template;
            content = content.replace(RegExp("{id}", "g"), id);
            content = content.replace(RegExp("{source}", "g"), video_url);
            content = content.replace(RegExp("{cover_url}", "g"), data[0].cover_url);
            content = content.replace(RegExp("{videoWidth}", "g"), data[0].width);
            content = content.replace(RegExp("{videoHeight}", "g"), data[0].height);
            self.editor.cmd.do("insertHTML", content);

        }, function () {

        })
    }
    // 菜单激活状态
    tryChangeActive() {
    }
}

// 注册菜单
E.registerMenu("SelectVideo", SelectVideoMenu)

const editorSetConfig = (editor) => {
    editor.config.uploadImgServer = '/admin.php/addons/article/upload/images'
    editor.config.uploadVideoServer = '/admin.php/addons/article/upload/video'
    editor.config.excludeMenus = excludeMenus;
    editor.config.showLinkImg = false;
    editor.config.zIndex = 1;
    editor.config.uploadImgTimeout = 3600 * 1000;
    editor.config.pasteFilterStyle = false;
}
