(function () {
  const vscode = acquireVsCodeApi();
  setInterval(() => {
    /**
     * ユーザーの状態を取得し、結果に応じてHTMLを変更する
     */
    // vscode.postMessage({
    //   command: "changeHTML",
    //   timestamp: new Date().toLocaleTimeString(),
    // });
  }, 1000);
})();
