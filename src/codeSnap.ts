import * as vscode from "vscode";
import { Webview } from "vscode";
import { getNonce } from "./utilities/getNonce";
import { getUri } from "./utilities/getUri";

export class CodeSnapViewResolver {
    public static readonly viewType = 'codeSnapro.editor';

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }

    resolve(webview: vscode.Webview) {
        webview.options = {
            enableScripts: true,
        };
        webview.html = this._getWebviewContent(webview);
        webview.onDidReceiveMessage((e) => {
            console.log("--->", e);
            switch (e.type) {
                case "error":
                    vscode.window.showErrorMessage(e.text);
                    break;
                default:
                    break;
            }
        });
    };

    private _getWebviewContent(webview: Webview) {
        const stylesUri = getUri(webview, this._extensionUri, [
            "webview-ui",
            "build",
            "assets",
            "index.css",
        ]);
        const scriptUri = getUri(webview, this._extensionUri, [
            "webview-ui",
            "build",
            "assets",
            "index.js",
        ]);
        const codiconFontUri = getUri(webview, this._extensionUri, [
            "webview-ui",
            "build",
            "assets",
            "codicon.ttf",
        ]);
        const latoFontUri = getUri(webview, this._extensionUri, [
            "webview-ui",
            "build",
            "assets",
            "Lato-Regular.ttf",
        ]);
        const getAsset = (name: string) =>
            getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", name]);
        const nonce = getNonce();

        return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none';img-src ${webview.cspSource
            } blob:; style-src ${webview.cspSource
            } 'nonce-${nonce}' ; font-src ${webview.cspSource
            }; script-src 'unsafe-eval' 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>CodeSnap Pro</title>
          <style nonce="${nonce}">
              @font-face {
                font-family: "codicon";
                font-display: block;
                src: url("${getAsset("codicon.ttf")}") format("truetype");
              }
              @font-face {
                  font-family: "lato";
                  src: url("${getAsset("Lato-Regular.ttf")}") format("truetype");
                  font-weight: normal;
                  font-style: normal;
              }
              @font-face {
                  font-family: "lato";
                  src: url("${getAsset("Lato-Bold.ttf")}") format("truetype");
                  font-weight: bold;
                  font-style: normal;
              }
              @font-face {
                  font-family: "lato";
                  src: url("${getAsset("Lato-Italic.ttf")}") format("truetype");
                  font-weight: normal;
                  font-style: italic;
              }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
}
