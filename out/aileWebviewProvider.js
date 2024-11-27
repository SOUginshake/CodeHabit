"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AileWebviewProvider = void 0;
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
         * Webviewからメッセージを受信し、HTMLを変更する
         */
        webviewView.webview.onDidReceiveMessage((message) => {
            console.log(message);
            if (message.command === "changeHTML") {
                webviewView.webview.html = this.htmlManager.getChangedHTML(message.timestamp);
            }
        });
    }
}
exports.AileWebviewProvider = AileWebviewProvider;
//# sourceMappingURL=aileWebviewProvider.js.map