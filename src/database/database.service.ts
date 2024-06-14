import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from "@nestjs/mongoose"

@Injectable()
export class DatabaseService {
    constructor(private configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const username = this.configService.get("MONGODB_USERNAME")
        const password = this.configService.get("MONGODB_PASSWORD")
        const host = this.configService.get("MONGODB_HOST")
        const db = this.configService.get("MONGODB_DATABASENAME")

        const uri = `mongodb+srv://${username}:${password}@${host}/${db}`
        console.log(uri)
        return {
            uri
        }
    }

}
