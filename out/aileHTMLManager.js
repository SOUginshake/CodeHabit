"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AileHTMLManager = void 0;
const vscode_1 = require("vscode");
class AileHTMLManager {
    scriptUri;
    cssUri;
    imageUris;
    aileHTMLRank;
    aileUriMap;
    itemUriMap;
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
            leftItem: vscode_1.Uri.joinPath(context.extensionUri, ""),
            rightItem: vscode_1.Uri.joinPath(context.extensionUri, ""),
        };
        this.aileHTMLRank = 0;
        this.aileUriMap = {
            0: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_0.png"),
            1: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_1.png"),
            2: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_2.png"),
            3: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_3.png"),
            4: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_4.png"),
            5: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_5.png"),
            6: vscode_1.Uri.joinPath(context.extensionUri, "media/image/aile_6.png"),
        };
        this.itemUriMap = {
            none: vscode_1.Uri.joinPath(context.extensionUri, ""),
            kirikabu: vscode_1.Uri.joinPath(context.extensionUri, "media/image/kirikabu.png"),
            ryuuboku: vscode_1.Uri.joinPath(context.extensionUri, "media/image/ryuuboku.png"),
            apple: vscode_1.Uri.joinPath(context.extensionUri, "media/image/apple.png"),
            grape: vscode_1.Uri.joinPath(context.extensionUri, "media/image/grape.png"),
            rasberry: vscode_1.Uri.joinPath(context.extensionUri, "media/image/rasberry.png"),
            water: vscode_1.Uri.joinPath(context.extensionUri, "media/image/water.png"),
            subako: vscode_1.Uri.joinPath(context.extensionUri, "media/image/subako.png"),
            oukan: vscode_1.Uri.joinPath(context.extensionUri, "media/image/oukan.png"),
            iwa: vscode_1.Uri.joinPath(context.extensionUri, "media/image/iwa.png"),
            tullip: vscode_1.Uri.joinPath(context.extensionUri, "media/image/tullip.png"),
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
        const aileImage = webview.asWebviewUri(this.aileUriMap[this.aileHTMLRank]);
        const leftItemImage = webview.asWebviewUri(this.imageUris.leftItem);
        const rightItemImage = webview.asWebviewUri(this.imageUris.rightItem);
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
                <div class="item-left" style="background-image: url(${leftItemImage});"></div>
                <div class="item-right" style="background-image: url(${rightItemImage});"></div>
            </div>
        </div>
      </body>
      </html>
      `;
    }
    /**
     * Aileの現在のランクを応答
     */
    returnAileHTMLRank() {
        return this.aileHTMLRank;
    }
    /**
     * Aileを進化させる
     */
    evolveAile(webview) {
        const nextAileRank = this.aileHTMLRank + 1;
        this.aileHTMLRank = nextAileRank;
        webview.html = this.getUpdateHTML(webview);
    }
    /**
     * アイテムの設置
     */
    setItem(webview, leftStr, rightStr) {
        this.imageUris.leftItem = this.itemUriMap[leftStr];
        this.imageUris.rightItem = this.itemUriMap[rightStr];
        webview.html = this.getUpdateHTML(webview);
    }
    /**
     * 更新後のHTMLを応答
     */
    getUpdateHTML(webview) {
        const scriptSrc = webview.asWebviewUri(this.scriptUri);
        const cssSrc = webview.asWebviewUri(this.cssUri);
        const wallImage = webview.asWebviewUri(this.imageUris.wall);
        const floorImage = webview.asWebviewUri(this.imageUris.floor);
        const aileImage = webview.asWebviewUri(this.aileUriMap[this.aileHTMLRank]);
        const leftItemImage = webview.asWebviewUri(this.imageUris.leftItem);
        const rightItemImage = webview.asWebviewUri(this.imageUris.rightItem);
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
                <div class="item-left" style="background-image: url(${leftItemImage});"></div>
                <div class="item-right" style="background-image: url(${rightItemImage});"></div>
            </div>
        </div>
      </body>
      </html>
      `;
    }
}
exports.AileHTMLManager = AileHTMLManager;
//# sourceMappingURL=aileHTMLManager.js.map