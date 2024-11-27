import {
  CancellationToken,
  ExtensionContext,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
} from "vscode";
import { AileHTMLManager } from "./aileHTMLManager";

export class AileWebviewProvider implements WebviewViewProvider {
  private readonly context: ExtensionContext;
  private readonly htmlManager: AileHTMLManager;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.htmlManager = new AileHTMLManager(context);
  }

  resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ) {
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
        webviewView.webview.html = this.htmlManager.getChangedHTML(
          message.timestamp
        );
      }
    });
  }
}
