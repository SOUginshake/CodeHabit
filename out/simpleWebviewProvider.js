"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWebviewProvider = void 0;
class SimpleWebviewProvider {
    context;
    constructor(context) {
        this.context = context;
    }
    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = {
            enableScripts: true, // JavaScriptを有効にする
        };
        webviewView.webview.html = this.getSimpleHTML(); // HTMLを取得
    }
    getSimpleHTML() {
        return `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple Sidebar</title>
      </head>
      <body>
        <h1>Simple HTML Sidebar</h1>
        <p>これはサンプルHTMLです。</p>
      </body>
      </html>
    `;
    }
}
exports.SimpleWebviewProvider = SimpleWebviewProvider;
//# sourceMappingURL=simpleWebviewProvider.js.map