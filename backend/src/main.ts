import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, { cors: true })

    const config = new DocumentBuilder()
        .setTitle('Make your choice')
        .setDescription('Every user can login to app and see working days calendar')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()