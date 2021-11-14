import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 3000,
    username: 'postgres',
    password: 'ankur.p@solutelabs.com',
    database: 'adminTeacherMgmt',
    entities: [__dirname+ '/../**/*.entity.js'],
    synchronize: true,




};