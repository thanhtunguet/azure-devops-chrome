import {ExtensionMessages} from './config/extension-messages';
import type {ServerUrl} from './models/ServerUrl';
import {DevopsRepository} from './repositories/DevopsRepository';

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ExtensionMessages.GET_ALL_TABS) {
    chrome.tabs.query({}, (tabs) => {
      sendResponse({tabs});
    });
    return true; // Indicate asynchronous response
  }

  if (request.action === ExtensionMessages.GET_ALL_PROJECTS) {
    const server: ServerUrl = request.server;
    const devopsRepository: DevopsRepository = new DevopsRepository(
      server.url,
      server.orgName,
    );
    devopsRepository.getProjects().then((projects) => {
      sendResponse({projects});
    });
    return true; // Indicate asynchronous response
  }

  if (request.action === ExtensionMessages.GET_ALL_PIPELINES) {
    const server: ServerUrl = request.server;
    const devopsRepository: DevopsRepository = new DevopsRepository(
      server.url,
      server.orgName,
    );
    devopsRepository.getPipelines(request.project).then((pipelines) => {
      sendResponse({pipelines});
    });
    return true; // Indicate asynchronous response
  }

  if (request.action === ExtensionMessages.TRIGGER_PIPELINE) {
    const server: ServerUrl = request.server;
    const devopsRepository: DevopsRepository = new DevopsRepository(
      server.url,
      server.orgName,
    );
    devopsRepository
      .triggerPipeline(request.project, request.pipelineId)
      .then(() => {
        sendResponse({success: true});
      });
    return true; // Indicate asynchronous response
  }
});
