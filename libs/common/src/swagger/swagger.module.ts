import { INestApplication, Module } from '@nestjs/common';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './swagger.config';
import { SWAGGER_API_ROOT } from './swagger.contant';

@Module({})
export class SwaggerModule {
    static setup(app: INestApplication) {
        const document = NestSwaggerModule.createDocument(app, swaggerConfig);
        NestSwaggerModule.setup(SWAGGER_API_ROOT, app, document, swaggerOptions);
    }
}
