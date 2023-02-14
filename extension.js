const vscode = require("vscode");

function activate(context) {
  let repeatedEveryMinute = vscode.workspace
    .getConfiguration("azkari")
    .get("repeatedEveryMinute");

  let convertMinuteToMs = repeatedEveryMinute * 60000;

  setInterval(function () {
    const azkar = vscode.workspace.getConfiguration("azkari").get("azkar");
    let azkarIndex = Math.floor(Math.random() * azkar.length);
    let azkarText = azkar[azkarIndex];
    vscode.window.showInformationMessage(azkarText);
  }, convertMinuteToMs);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
