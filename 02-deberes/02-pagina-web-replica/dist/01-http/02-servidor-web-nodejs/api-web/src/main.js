"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
var cookieParser = require('cookie-parser');
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'stark.ico')));
        app.use(cookieParser('Secreto'));
        app.set('view engine', 'ejs');
        app.use(express.static('publico'));
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map