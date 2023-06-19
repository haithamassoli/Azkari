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
  // ===============================================================
  let currentSide = "left";
  let currentLanguage = "arabic";

  let AzkarLeftSideBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0
  );
  AzkarLeftSideBarItem.show();

  let AzkarRightSideBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    0
  );
  AzkarRightSideBarItem.hide();

  let messages = [
    "سبحان الله",
    "الحمد لله",
    "لا اله الا الله",
    "الله اكبر",
    "صلي على النبي ﷺ",
    "استغفر الله",
  ];
  let english_messages = [
    "Subhan allah",
    "Alhamdolilah",
    "La Illaha Illa Allah",
    "Allahu Akbar",
    "Astaghfiru Allah",
  ];

  let index = 0;
  setInterval(() => {
    if (currentSide === "left") {
      if (currentLanguage === "arabic") {
        AzkarLeftSideBarItem.text = messages[index];
      } else {
        AzkarLeftSideBarItem.text = english_messages[index];
      }
    } else {
      if (currentLanguage === "arabic") {
        AzkarRightSideBarItem.text = messages[index];
      } else {
        AzkarRightSideBarItem.text = english_messages[index];
      }
    }
    index = (index + 1) % messages.length;
  }, autoRemove);

  let toggleSideCommand = vscode.commands.registerCommand(
    "extension.toggleSide",
    function () {
      if (currentSide === "left") {
        currentSide = "right";
        AzkarLeftSideBarItem.hide();
        AzkarRightSideBarItem.show();
      } else {
        currentSide = "left";
        AzkarRightSideBarItem.hide();
        AzkarLeftSideBarItem.show();
      }
    }
  );
  let toggleLanguageCommand = vscode.commands.registerCommand(
    "extension.toggleLanguage",
    function () {
      if (currentLanguage === "arabic") {
        currentLanguage = "english";
      } else {
        currentLanguage = "arabic";
      }
    }
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
