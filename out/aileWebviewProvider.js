"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AileWebviewProvider = void 0;
const vscode_1 = require("vscode");
const aileHTMLManager_1 = require("./aileHTMLManager");
class AileWebviewProvider {
    context;
    htmlManager;
    currentWebview;
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
        this.currentWebview = initialWebview;
        webviewView.webview.html = this.htmlManager.getInitialHTML(this.currentWebview);
        /**
         * Aileの進化用ボタンを設定
         */
        vscode_1.commands.executeCommand("setContext", "aileEvolution", true);
    }
    getAileHTMLRank() {
        return this.htmlManager.returnAileHTMLRank();
    }
    /**
     * Aileの進化メソッドを呼び出す
     */
    evolveAile() {
        if (!this.currentWebview) {
            throw new Error("Webview is not ready");
        }
        else {
            console.log(this.currentWebview);
            this.htmlManager.evolveAile(this.currentWebview);
        }
    }
}
exports.AileWebviewProvider = AileWebviewProvider;
//# sourceMappingURL=aileWebviewProvider.js.map