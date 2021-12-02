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
            let template = `<p data-we-empty-p>
                <div class="w-fake-img" style='background-image: url(); height: 100%; background-size: 100% 100%; background-repeat: no-repeat;padding-bottom: 56.65%;height: 0; overflow: hidden;top: 0;left: 0;right: 0;' id="{id}">
                <script>
                var player = new Aliplayer({
                    id: '{id}',
                    source: '{source}',
                },function(player){
                   
                });
                <\/script> 
                </div>
            </p>`
            let content = template;
            content = content.replace(RegExp("{id}", "g"), id);
            content = content.replace(RegExp("{source}", "g"), data[0].video_url);
            content = content.replace(RegExp("{cover_url}", "g"), data[0].cover_url);
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
}
