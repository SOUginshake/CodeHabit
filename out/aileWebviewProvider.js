"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AileWebviewProvider = void 0;
const vscode_1 = require("vscode");
const aileHTMLManager_1 = require("./aileHTMLManager");
class AileWebviewProvider {
    context;
    htmlManager;
    constructor(context) {
        this.context = context;
        this.htmlManager = new aileHTMLManager_1.AileHTMLManager(context);
    }
    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = {
            enableScripts: true,
        };
        /**
         * Webviewに初期HTMLを表示する
         */
        const initialWebview = webviewView.webview;
        webviewView.webview.html = this.htmlManager.getInitialHTML(initialWebview);
        /**
         * Aileの進化用ボタンを設定
         */
        vscode_1.commands.executeCommand("setContext", "aileEvolution", true);
    }
    getAileHTMLRank() {
        return this.htmlManager.returnAileHTMLRank();
    }
    /**
     * ユーザーランクと表示中のAileのランクを比較し、必要であれば進化させる
     */
    evolveAile(userRank) { }
}
exports.AileWebviewProvider = AileWebviewProvider;
//# sourceMappingURL=aileWebviewProvider.js.map