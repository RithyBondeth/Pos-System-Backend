import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from "path";

export const dbConfig = async (configService: ConfigService): Promise<PostgresConnectionOptions>=> ({
    type: 'postgres',
    url: configService.get<string>("DATABASE_URL"),
    port: configService.get<number>("DATABASE_PORT"),
    entities: [path.resolve(__dirname, "..") + "/**/**/*.entity{.ts,.js}"],
    synchronize: configService.get<boolean>("SYNCHRONIZE"),
});