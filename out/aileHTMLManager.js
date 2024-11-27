"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AileHTMLManager = void 0;
const vscode_1 = require("vscode");
class AileHTMLManager {
    scriptUri;
    cssUri;
    imageUris;
    constructor(context) {
        //JSファイルパスをWebview用のUriに変換、スクリプトを使用可能にする
        this.scriptUri = context.extensionUri.with({
            path: vscode_1.Uri.joinPath(context.extensionUri, "media", "changeHTML.js").path,
        });
        this.cssUri = context.extensionUri.with({
            path: vscode_1.Uri.joinPath(context.extensionUri, "media", "aileroom.css").path,
        });
        this.imageUris = {
            wall: vscode_1.Uri.joinPath(context.extensionUri, "media/image/wall_default.png"),
            floor: vscode_1.Uri.joinPath(context.extensionUri, "media/image/floor_default.png"),
            aile: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_first.png"),
            leftItem: vscode_1.Uri.joinPath(context.extensionUri, ""),
            rightItem: vscode_1.Uri.joinPath(context.extensionUri, ""),
        };
    }
    /**
     * 初期状態のHTMLを応答する
     * @returns string
     */
    getInitialHTML(webview) {
        const scriptSrc = webview.asWebviewUri(this.scriptUri);
        const cssSrc = webview.asWebviewUri(this.cssUri);
        const wallImage = webview.asWebviewUri(this.imageUris.wall);
        const floorImage = webview.asWebviewUri(this.imageUris.floor);
        const aileImage = webview.asWebviewUri(this.imageUris.aile);
        const leftItemImage = webview.asWebviewUri(this.imageUris.leftItem);
        const rightItemImage = webview.asWebviewUri(this.imageUris.rightItem);
        console.log(aileImage);
        console.log(leftItemImage);
        console.log(rightItemImage);
        return `
        <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aileの部屋</title>
        <script src="${scriptSrc}"></script> <!-- スクリプトを読み込む -->
        <link rel="stylesheet" href="${cssSrc}"> <!-- CSSを読み込む -->
      </head>
      <body>
        <div class="room">
            <div class="wall" style="background-image: url(${wallImage});">
            </div>
            <div class="floor" style="background-image: url(${floorImage});">
                <div class="aile" style="background-image: url(${aileImage});"></div>
                <div class="left-item" style="background-image: url(${leftItemImage});"></div>
                <div class="right-item" style="background-image: url(${rightItemImage});"></div>
            </div>
        </div>
      </body>
      </html>
      `;
    }
    /**
     * 変更後のHTMLを応答する
     * @param timestamp
     * @returns string
     */
    getChangedHTML(timestamp) {
        return `
        <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>Dynamic Update</title>
      </head>
      <body>
        <h1>HTMLが更新されました</h1>
        <p>現在の時刻: ${timestamp}</p>
      </body>
      </html>
    `;
    }
}
exports.AileHTMLManager = AileHTMLManager;
//# sourceMappingURL=aileHTMLManager.js.map