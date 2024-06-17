import { FilterQuery, Model, Types } from "mongoose";
import { AbstractDocument } from "./abstract.entity";
import { Logger, NotFoundException } from '@nestjs/common'

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger: Logger;
    constructor(
        private readonly model: Model<TDocument>
    ) {}

    async findOne (filterQuery: FilterQuery<TDocument> ) : Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, {lean: true})

        if(!document) {
            this.logger.warn('Document not found with filterQuery: %o', filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return document as unknown as TDocument
    }

    async find (filterQuery: FilterQuery<TDocument>) : Promise<TDocument[]> {
        const documents = await this.model.find(filterQuery, {}, {lean: true})

        if(!documents) {
            this.logger.warn('Document not found with filterQuery: %o', filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return documents as unknown as TDocument[]
    }

    async create (document: Omit<TDocument, '_id'>) : Promise<TDocument> {
        const createDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        })

        return (await createDocument.save()).toJSON() as unknown as TDocument
    }

    async findOneAndUpdate (filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) : Promise<TDocument> {
        const updatedDocument = await this.model.findOneAndUpdate(filterQuery, document, { lean: true, new: true })

        if(!updatedDocument) {
            this.logger.warn('Document not found with filterQuery: %o', filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return updatedDocument as unknown as TDocument
    }

    async findOneAndDelete (filterQuery: FilterQuery<TDocument> ) : Promise<TDocument> {        
        const deletedDocument = await this.model.findOneAndDelete(filterQuery, { lean: true })

        if(!deletedDocument) {
            this.logger.warn('Document not found with filterQuery: %o', filterQuery)
            throw new NotFoundException('Document not found.')
        }

        return deletedDocument as unknown as TDocument
    }
}