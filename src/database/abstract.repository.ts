import { FilterQuery, Model, Types } from "mongoose";
import { AbstractDocument } from "./abstract.entity";
import { Logger, NotFoundException, ConflictException } from '@nestjs/common'

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger: Logger;
    constructor(
        private readonly model: Model<TDocument>
    ) {}

    async findOne (filterQuery: FilterQuery<TDocument> ) : Promise<TDocument> {
        try {
            const document = await this.model.findOne(filterQuery, {}, {lean: true})
    
            if(!document) {
                this.logger.warn('Document not found with filterQuery: %o', filterQuery)
                throw new NotFoundException('Document not found.')
            }
    
            return document as unknown as TDocument
        } catch (error) {     
            throw error;
        }
    }

    async find (filterQuery: FilterQuery<TDocument>) : Promise<TDocument[]> {
        try {
            const documents = await this.model.find(filterQuery, {}, {lean: true})

            if(!documents) {
                this.logger.warn('Document not found with filterQuery: %o', filterQuery)
                throw new NotFoundException('Document not found.')
            }
    
            return documents as unknown as TDocument[]
        } catch (error) {     
            throw error;
        }
    }

    async create (document: Omit<TDocument, '_id'>) : Promise<TDocument> {
        try {
            const createDocument = new this.model({
                ...document,
                _id: new Types.ObjectId()
            })

            return (await createDocument.save()).toJSON() as unknown as TDocument

          } catch (error) {

            if (error.code === 11000) {
                this.logger.warn('Email already exists: %o', document)
                throw new ConflictException('Email already exists');
            }
            
            throw error;
          }
    }

    async findOneAndUpdate (filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) : Promise<TDocument> {
        try {
            const updatedDocument = await this.model.findOneAndUpdate(filterQuery, document, { lean: true, new: true })

            if(!updatedDocument) {
                this.logger.warn('Document not found with filterQuery: %o', filterQuery)
                throw new NotFoundException('Document not found.')
            }

            return updatedDocument as unknown as TDocument
          } catch (error) { 
            throw error;
          }
    }

    async findOneAndDelete (filterQuery: FilterQuery<TDocument> ) : Promise<TDocument> {    
        try {
            const deletedDocument = await this.model.findOneAndDelete(filterQuery, { lean: true })

            if(!deletedDocument) {
                this.logger.warn('Document not found with filterQuery: %o', filterQuery)
                throw new NotFoundException('Document not found.')
            }

            return deletedDocument as unknown as TDocument
        } catch (error) { 
            throw error;
        }
    }
}