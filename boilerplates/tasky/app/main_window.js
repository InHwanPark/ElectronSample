const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {

    constructor(url) {
        super({
            webPreferences: {
                nodeIntegration: true,
                // 최소화, 포커스 분실시 자원 분산 방지 (같은속도 실행)
                backgroundThrottling: false
            },
            height: 500,
            width: 300,
            frame: false,
            resizable: false,
            show: false,
            // windows 작업표시줄에 프로그램 표시 flase
            skipTaskbar: process.platform === 'darwin' ? false : true
        });

        this.loadURL(url);

        // bind function
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        // controlling window focus
        this.hide();
    }
}

module.exports = MainWindow;
