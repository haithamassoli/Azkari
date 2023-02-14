const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("azkari.getAzkari", function () {
      const azkar = vscode.workspace.getConfiguration("azkari").get("azkar");
      let azkarIndex = Math.floor(Math.random() * azkar.length);
      let azkarText = azkar[azkarIndex];
      vscode.window.showInformationMessage(azkarText);
    })
  );

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
