/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import {menubar} from 'menubar'

import {ipcRenderer, ipcMain, Notification} from 'electron'

import Store from 'electron-store'

Store.initRenderer()

let currentState = 'unknown'

ipcMain.on('notify-state', (event, [repoId, state]) => {
  if (state !== currentState) {
    const notification = {
      title: repoId,
      body: state
    }
    new Notification(notification).show()
  }

  currentState = state;
})

ipcMain.on('switch-icon', (event, arg) => {
  mb.tray.setImage(getAssetPath(`${arg}.png`))
})

const mb = menubar({
  browserWindow: {
    show: false,
    width: 520,
    height: 580,
    webPreferences: {
      nodeIntegration: true,
    },
    // alwaysOnTop: true,
  },
  preloadWindow: true
})

const getAssetPath = (...paths) => {
  return path.join(RESOURCES_PATH, ...paths);
};


const RESOURCES_PATH = mb.app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../assets');


mb.app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true')

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = mb.window

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.hide()

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });


  let quitting = false
  mb.app.on('before-quit', () => {
    quitting = true
  })

  mainWindow.on('close', e => {
    if (!quitting) {
      e.preventDefault()
      Menu.sendActionToFirstResponder('hide:')
    }
  })

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

mb.on('ready', () => {
  mb.tray.setImage(getAssetPath('icon-pending.png'))

  createWindow()

  mb.app.on('did-become-active', () => {
    mb.window.show()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
