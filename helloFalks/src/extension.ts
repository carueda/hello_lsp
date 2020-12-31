
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import * as vscode from 'vscode';

// Import the language client, language client options and server options from VSCode language client.
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';

export function activate (context: vscode.ExtensionContext) {
  console.log('::: Activating your extension...');

  // Get the java home from the process environment.
  const { JAVA_HOME } = process.env;

  console.log(`::: Using java from JAVA_HOME: ${JAVA_HOME}`);
  // If java home is available continue.
  if (JAVA_HOME) {
    // Java execution path.
    const command: string = path.join(JAVA_HOME, 'bin', 'java');

    // With initial server in Java:
    // let classPath = path.join(__dirname, '..', '..', 'hellols', 'launcher', 'target', 'launcher.jar');
    // console.log(`::: Using classPath = ${classPath}`);
    // const args: string[] = ['-cp', classPath, 'StdioLauncher'];

    // With server in Scala:
    const tethyslsJar = path.join(__dirname, '../../../../../bitbucket/mbari/tethysls/tethysls/target/scala-2.13/tethysls-0.0.0.jar');
    const args: string[] = ['-jar', tethyslsJar];
    console.log(`::: Using tethyslsJar = ${tethyslsJar}`);

    // Set the server options
    let serverOptions: ServerOptions = {
      command,
      args,
      options: {}
    };

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
      // Register the server for plain text documents
      documentSelector: [{ scheme: 'file', language: 'hello' }]
    };

    // Create the language client and start the client.
    let disposable = new LanguageClient('helloLS', 'HelloFalks Language Server', serverOptions, clientOptions).start();

    // Disposables to remove on deactivation.
    context.subscriptions.push(disposable);
  }
}

// this method is called when your extension is deactivated
export function deactivate () {
  console.log('Your extension "helloFalks" is now deactivated!');
}
