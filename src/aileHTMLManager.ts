import { ExtensionContext, Uri, Webview } from "vscode";

export class AileHTMLManager {
  private readonly scriptUri: Uri;
  private readonly cssUri: Uri;
  private readonly imageUris: { [key: string]: Uri };
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
      aile: Uri.joinPath(context.extensionUri, "media/image/aile_first.png"),
      leftItem: Uri.joinPath(context.extensionUri, ""),
      rightItem: Uri.joinPath(context.extensionUri, ""),
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
  getChangedHTML(timestamp: string): string {
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
