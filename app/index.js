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
  const isDevMode = process.argv.indexOf('--dev') >= 0;

  const width = 1280;
  const height = 800;
  var opts = {
    width: width,
    height: height,
    resizable: true
  };

  if (isDevMode) {
    var atomScreen = require('screen');
    var displays = atomScreen.getAllDisplays();
    var ep = displays.length > 1 ? displays[1] : null;

    if (ep) {
      opts.x = ep.bounds.x + (ep.size.width - width) / 2;
      opts.y = ep.bounds.y + (ep.size.height - height) / 2;
    }
  }

  mainWindow = new BrowserWindow(opts);

  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  mainWindow.maximize();
  mainWindow.focus();

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
    globalShortcut.register('Alt+Command+S', editMode);
  } else {
    globalShortcut.register('Alt+Ctrl+S', editMode);
  }

  mainWindow.on('closed', function () {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  });

  initMenu();
});

ipc.on('request-readdir', function (event, arg) {
  var dir = `${__dirname}/${arg}`;
  event.returnValue = fs.existsSync(dir) ? fs.readdirSync(dir) : null;
});

let editMode = function () {
  isEditMode = !isEditMode;
  mainWindow.webContents.send('editmode', isEditMode);
};

ipc.on('reload', function (event, arg) {
  mainWindow.reloadIgnoringCache();
  event.returnValue = null;
});

ipc.on('request-save-menu', function (event, arg) {
  var name = `${__dirname}/data/toolbar.json`;
  var json = JSON.stringify(arg, null, '  ');
  fs.writeFile(name, json, {encoding: 'utf-8'}, function (err) {
    event.sender.send('response-save-menu', !err);
  });
});

ipc.on('request-save-file', function (event, file, data) {
  var name = `${__dirname}/${file}`;
  var json = JSON.stringify(data, null, '  ');
  fs.writeFile(name, json, {encoding: 'utf-8'}, function (err) {
    event.sender.send('response-save-file', !err);
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

ipc.on('request-copy-slide', function (event, old) {
  var options = {
    title: 'Select an image',
    filters: [{name: 'Images', extensions: ['jpg', 'jpeg', 'png']}],
    properties: ['openFile']
  };

  dialog.showOpenDialog(mainWindow, options, function (files) {
    if (files && files.length > 0) {
      var src = files[0];
      var dst = `${__dirname}/`;
      var dstName = `images/slide_${path.basename(src)}`;
      fs.createReadStream(src).pipe(fs.createWriteStream(dst + dstName));

      if (old !== 'images/carousel.png') {
        var file = `${__dirname}/${old}`;
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      }

      event.returnValue = dstName;
    } else {
      event.returnValue = null;
    }
  });
});

ipc.on('open-dir', function (event, arg) {
  var dir = `${__dirname}/${arg}`;
  shell.openItem(dir);
  event.returnValue = true;
});

function initMenu() {
  var template;
  if (process.platform == 'darwin') {
    template = [
      {
        label: 'Electron',
        submenu: [
          {
            label: 'About Electron',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function () {
              mainWindow.restart();
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function () {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function () {
              mainWindow.toggleDevTools();
            }
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O'
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: function () {
              mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: function () {
              mainWindow.restart();
            }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: function () {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
}
