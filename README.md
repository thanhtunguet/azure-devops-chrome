# Azure DevOps Pipelines Chrome Extension

This Chrome extension allows users to interact with Azure DevOps pipelines directly from the browser. Users can:

- Select an active Azure DevOps tab from open browser tabs.
- Choose a project from the selected server.
- Search and select multiple pipelines.
- Trigger multiple pipelines simultaneously.

## Features

1. **Open Options Page**: Click the extension icon to open the options page.
2. **Select Azure DevOps Tab**: From the list of currently open browser tabs, choose an Azure DevOps tab.
3. **Select Project**: After selecting a server, choose a project from the dropdown menu.
4. **Search Pipelines**: Filter pipelines by name or select them from a list.
5. **Trigger Pipelines**: Select multiple pipelines using checkboxes and click the "Trigger selected pipelines" button to trigger them all at once.

## How It Works

### 1. **Open Options Page**

To open the options page, click the extension icon in the browser toolbar. This page will allow you to configure and interact with Azure DevOps pipelines.

### 2. **Select an Azure DevOps Tab**

The options page will list all currently open browser tabs. Select an Azure DevOps tab that you wish to interact with. The extension uses this tab to identify the organization and project from the Azure DevOps server.

### 3. **Select Project**

Once an Azure DevOps tab is selected, the extension will retrieve a list of projects associated with the selected server. You can choose a project from this list to display the relevant pipelines.

### 4. **Search and Select Pipelines**

You can search for pipelines by name using the search bar. Alternatively, you can scroll through the list of pipelines and select the ones you wish to trigger by clicking the checkboxes next to the pipeline names.

### 5. **Trigger Selected Pipelines**

After selecting one or more pipelines, click the **Trigger selected pipelines** button to run them simultaneously.

## Installation

1. Clone the repository to your local machine.
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the folder containing your extension.
5. The extension should now appear in your Chrome toolbar.

## Usage

1. Click the extension icon to open the options page.
2. Select an active Azure DevOps tab.
3. Choose a project from the list of available projects on the selected server.
4. Use the search field to filter pipelines, or select them directly.
5. Click the "Trigger selected pipelines" button to initiate the pipelines.
