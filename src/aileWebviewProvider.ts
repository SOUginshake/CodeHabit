import {
  CancellationToken,
  commands,
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
     * Aileの進化用ボタンを設定
     */
    commands.executeCommand("setContext", "aileEvolution", true);
  }

  getAileHTMLRank(): number {
    return this.htmlManager.returnAileHTMLRank();
  }

  /**
   * Aileの進化メソッドを呼び出す
   */
  evolveAile() {
    this.htmlManager.evolveAile();
  }
}
