const path = require('path');
const electron = require('electron');
const MainWindow = require('./app/main_window');
const TimerTray = require('./app/timer_tray');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    
    // ios doc 에 프로그램 표시 X
    if (process.platform === 'darwin') app.dock.hide();
    
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    // set Tray icon
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});
