import * as vscode from "vscode";
import { CodeSnapViewResolver } from "./codeSnap";


export function activate(context: vscode.ExtensionContext) {
    const resolver = new CodeSnapViewResolver(context.extensionUri);

    const openSnippetCommand = vscode.commands.registerCommand("codesnapro.start", async () => {
        //vscode.window.showErrorMessage(`Hi`);
        const panel = vscode.window.createWebviewPanel(
            'codesnap',
            'CodeSnap 📸',
            { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
        );
        panel.webview
        resolver.resolve(panel.webview);
    });

    context.subscriptions.push(openSnippetCommand);
}
