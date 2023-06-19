const vscode = require("vscode");

function activate() {
  const repeatedEveryMinute = vscode.workspace
    .getConfiguration("azkari")
    .get("repeatedEveryMinute");

  const convertMinuteToMs = repeatedEveryMinute * 60000;
  const autoRemove = 6500;

  setInterval(function () {
    const azkar = vscode.workspace.getConfiguration("azkari").get("azkar");
    const azkarIndex = Math.floor(Math.random() * azkar.length);
    const azkarText = azkar[azkarIndex];
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: azkarText,
        cancellable: true,
      },
      async (progress) => {
        progress.report({ increment: 0 });
        await new Promise((resolve) => setTimeout(resolve, autoRemove));
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
