import * as vscode from "vscode";


export function activate(context: vscode.ExtensionContext) {

    const openSnippetCommand = vscode.commands.registerCommand("promptIde.openText", () => {
        vscode.window.showErrorMessage(`Hi`);
    });

    context.subscriptions.push(openSnippetCommand);
}
