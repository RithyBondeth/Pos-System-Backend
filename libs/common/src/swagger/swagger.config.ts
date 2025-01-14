import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import { SWAGGER_API_DESCRIPTION, SWAGGER_API_TITLE, SWAGGER_API_VERSION } from "./swagger.contant";

export const swaggerConfig = new DocumentBuilder()
.setTitle(SWAGGER_API_TITLE)
.setDescription(SWAGGER_API_DESCRIPTION)
.setVersion(SWAGGER_API_VERSION)
.addBearerAuth()
.build();

export const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistpersistAuthorization: true,
    },
    customSiteTitle: SWAGGER_API_TITLE,
}