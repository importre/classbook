'use strict'

const app = require('app');
const ipc = require('ipc');
const fs = require('fs');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const MenuItem = require('menu-item');
const globalShortcut = require('global-shortcut');
const dialog = require('dialog');
const path = require('path');
const shell = require('shell');

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;
var menu = null;
var isEditMode = false;

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    resizable: true
  });

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  mainWindow.maximize();

  try {
    var bs = require("browser-sync").create();
    bs.watch(`${__dirname}/**/*`, function (event, file) {
      if (event == "change" && file.match(/(\.css|\.html|\.js)$/g)) {
        mainWindow.reloadIgnoringCache();
      }
    });
  } catch (e) {
  }

  if (process.platform === 'darwin') {
    globalShortcut.register('Alt+Command+I', function () {
      mainWindow.toggleDevTools();
    });

    globalShortcut.register('Alt+Command+S', editMode);
  } else {
    globalShortcut.register('Alt+Ctrl+S', editMode);
  }

  mainWindow.on('closed', function () {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  });
});

ipc.on('request-readdir', function (event, arg) {
  var dir = `${__dirname}/`;
  event.returnValue = fs.readdirSync(dir + arg);
});

let editMode = function () {
  isEditMode = !isEditMode;
  mainWindow.webContents.send('editmode', isEditMode);
};

ipc.on('reload', function (event, arg) {
  mainWindow.reloadIgnoringCache();
});

ipc.on('request-save-menu', function (event, arg) {
  var name = `${__dirname}/data/toolbar.json`;
  var json = JSON.stringify(arg, null, '  ');
  fs.writeFile(name, json, {encoding: 'utf-8'}, function (err) {
    event.sender.send('response-save-menu', !err);
  });
});

ipc.on('get-base-dir', function (event, arg) {
  event.returnValue = `${__dirname}/`;
});

ipc.on('read-file', function (event, arg) {
  var dir = `${__dirname}/`;
  event.returnValue = fs.readFileSync(dir + arg, {encoding: 'utf-8'});
});

ipc.on('request-write-file', function (event, name, data) {
  var dir = `${__dirname}/`;
  var json = JSON.stringify(data, null, '  ');
  fs.writeFile(dir + name, json, {encoding: 'utf-8'}, function (err) {
    event.sender.send('response-write-file', !err);
  });
});

ipc.on('request-copy-slide', function (event, index) {
  var options = {
    title: 'Select an image',
    filters: [{name: 'Images', extensions: ['jpg', 'jpeg', 'png']}],
    properties: ['openFile']
  };
  dialog.showOpenDialog(mainWindow, options, function(files) {
    var src = files[0];
    var ext = path.extname(src);
    var dst = `${__dirname}/`;
    var dstName = `images/slide${index}${ext}`;
    fs.createReadStream(src).pipe(fs.createWriteStream(dst + dstName));
    event.sender.send('response-copy-slide', index, dstName);
  });
});

ipc.on('open-album-dir', function (event, arg) {
  var dir = `${__dirname}/images/events`;
  shell.showItemInFolder(dir);
  event.returnValue = true;
});
