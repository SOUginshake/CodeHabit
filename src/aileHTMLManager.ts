import { ExtensionContext, Uri, Webview } from "vscode";

export class AileHTMLManager {
  private readonly scriptUri: Uri;
  private readonly cssUri: Uri;
  private readonly imageUris: { [key: string]: Uri };
  private aileHTMLRank: number;
  private readonly aileUriMap: { [key: number]: Uri };
  private readonly itemUriMap: { [key: string]: Uri };

  constructor(context: ExtensionContext) {
    //JSファイルパスをWebview用のUriに変換、スクリプトを使用可能にする
    this.scriptUri = context.extensionUri.with({
      path: Uri.joinPath(context.extensionUri, "media", "changeHTML.js").path,
    });
    this.cssUri = context.extensionUri.with({
      path: Uri.joinPath(context.extensionUri, "media", "aileroom.css").path,
    });
    this.imageUris = {
      wall: Uri.joinPath(context.extensionUri, "media/image/wall_default.png"),
      floor: Uri.joinPath(
        context.extensionUri,
        "media/image/floor_default.png"
      ),
      leftItem: Uri.joinPath(context.extensionUri, ""),
      rightItem: Uri.joinPath(context.extensionUri, ""),
    };
    this.aileHTMLRank = 0;
    this.aileUriMap = {
      0: Uri.joinPath(context.extensionUri, "media/image/aile_0.png"),
      1: Uri.joinPath(context.extensionUri, "media/image/aile_1.png"),
      2: Uri.joinPath(context.extensionUri, "media/image/aile_2.png"),
      3: Uri.joinPath(context.extensionUri, "media/image/aile_3.png"),
      4: Uri.joinPath(context.extensionUri, "media/image/aile_4.png"),
      5: Uri.joinPath(context.extensionUri, "media/image/aile_5.png"),
      6: Uri.joinPath(context.extensionUri, "media/image/aile_6.png"),
    };
    this.itemUriMap = {
      none: Uri.joinPath(context.extensionUri, ""),
      kirikabu: Uri.joinPath(context.extensionUri, "media/image/kirikabu.png"),
      ryuuboku: Uri.joinPath(context.extensionUri, "media/image/ryuuboku.png"),
      apple: Uri.joinPath(context.extensionUri, "media/image/apple.png"),
      grape: Uri.joinPath(context.extensionUri, "media/image/grape.png"),
      rasberry: Uri.joinPath(context.extensionUri, "media/image/rasberry.png"),
      water: Uri.joinPath(context.extensionUri, "media/image/water.png"),
      subako: Uri.joinPath(context.extensionUri, "media/image/subako.png"),
      oukan: Uri.joinPath(context.extensionUri, "media/image/oukan.png"),
      iwa: Uri.joinPath(context.extensionUri, "media/image/iwa.png"),
      tullip: Uri.joinPath(context.extensionUri, "media/image/tullip.png"),
    };
  }

  /**
   * 初期状態のHTMLを応答する
   * @returns string
   */
  getInitialHTML(webview: Webview): string {
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
  returnAileHTMLRank(): number {
    return this.aileHTMLRank;
  }

  /**
   * Aileを進化させる
   */
  evolveAile(webview: Webview) {
    const nextAileRank = this.aileHTMLRank + 1;
    this.aileHTMLRank = nextAileRank;
    webview.html = this.getUpdateHTML(webview);
  }

  /**
   * アイテムの設置
   */
  setItem(webview: Webview, leftStr: string, rightStr: string) {
    this.imageUris.leftItem = this.itemUriMap[leftStr];
    this.imageUris.rightItem = this.itemUriMap[rightStr];
    webview.html = this.getUpdateHTML(webview);
  }

  /**
   * 更新後のHTMLを応答
   */
  getUpdateHTML(webview: Webview): string {
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
