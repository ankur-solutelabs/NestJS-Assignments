import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ankur@123',
    database: 'adminTeacherMgmt',
    entities: [__dirname+ '/../**/*.entity.js'],
    synchronize: true,




};