import { join } from 'node:path';
import { BrowserWindow, app } from 'electron';
import { bootstrapNest } from './nest/nest';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

async function electronAppInit() {
  const isDev = !app.isPackaged;
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  if (isDev) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') app.quit();
      });
    } else {
      process.on('SIGTERM', () => {
        app.quit();
      });
    }
  }

  await app.whenReady();
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });
  const URL = isDev
    ? process.env.DS_RENDERER_URL
    : `file://${join(app.getAppPath(), 'dist/render/index.html')}`;

  win.loadURL(URL!);
}

async function bootstrap() {
  try {
    await electronAppInit();

    await bootstrapNest();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    app.quit();
  }
}

bootstrap();
