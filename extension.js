const vscode = require("vscode");

function activate() {
  let repeatedEveryMinute = vscode.workspace
    .getConfiguration("azkari")
    .get("repeatedEveryMinute");

  let convertMinuteToMs = repeatedEveryMinute * 60000;

  setInterval(function () {
    const azkar = vscode.workspace.getConfiguration("azkari").get("azkar");
    let azkarIndex = Math.floor(Math.random() * azkar.length);
    let azkarText = azkar[azkarIndex];
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: azkarText,
        cancellable: true,
      },
      async (progress) => {
        progress.report({ increment: 0 });
        await new Promise((resolve) => setTimeout(resolve, convertMinuteToMs));
        progress.report({ increment: 100, message: "Done!" });
      }
    );
  }, convertMinuteToMs);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
