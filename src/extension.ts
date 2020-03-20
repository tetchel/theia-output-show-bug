// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let output: vscode.OutputChannel | undefined;
let interval: NodeJS.Timer | undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.showOutput", () => {
			if (output) {
				console.log("Output exists, revealing it");
				vscode.window.showInformationMessage("Showing existing output");
				output.show();
				return;
			}

			console.log("Creating output");
			output = vscode.window.createOutputChannel("Test Output");
			vscode.window.showInformationMessage("Creating new output");
			output.show();
			context.subscriptions.push(output);

			interval = setInterval(() => {
				if (output) {
					output.appendLine(`It's ${new Date().toLocaleString()}`);
				}
			}, 2500);
		}),
		vscode.commands.registerCommand("extension.hideOutput", () => {
			if (!output) {
				vscode.window.showWarningMessage("No output to hide");
				return;
			}
			console.log("Disposing output");
			output.dispose();
			output = undefined;
			if (interval) {
				clearInterval(interval);
				interval = undefined;
			}
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
