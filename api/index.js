var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import 'reflect-metadata';
import { Ignitor } from '@adonisjs/core';
const APP_ROOT = new URL('../', import.meta.url);
const IMPORTER = (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return import(__rewriteRelativeImportExtension(new URL(filePath, APP_ROOT).href));
    }
    return import(__rewriteRelativeImportExtension(filePath));
};
const ignitor = new Ignitor(APP_ROOT, { importer: IMPORTER }).tap((app) => {
    app.booting(async () => {
        await import('#start/env');
    });
});
let handler;
let initialization;
async function initialize() {
    if (!initialization) {
        initialization = (async () => {
            const app = ignitor.createApp('web');
            await app.init();
            await app.boot();
            await app.start(async () => {
                const server = await app.container.make('server');
                await server.boot();
                handler = server.handle.bind(server);
            });
        })();
    }
    await initialization;
}
export default async function apiHandler(req, res) {
    await initialize();
    return handler(req, res);
}
//# sourceMappingURL=index.js.map