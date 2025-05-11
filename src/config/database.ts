import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../modules/user/infra/db/user.typeorm.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  synchronize: process.env.NODE_ENV !== "production",
  logging: true,
});
