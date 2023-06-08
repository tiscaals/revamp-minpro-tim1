"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const pipes_1 = require("@nestjs/common/pipes");
const bodyParser = require("body-parser");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT;
    app.enableCors();
    app.use('/image', express.static('images'));
    app.useGlobalPipes(new pipes_1.ValidationPipe());
    app.use(bodyParser.urlencoded({ extended: true }));
    await app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map