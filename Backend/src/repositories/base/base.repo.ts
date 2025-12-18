import { Document, Model } from "mongoose";
import { IRead, IWrite } from "./base.repo.interface";
import logger from "../../utilities/logger";

export class BaseRepository<T extends Document> implements IWrite<T>, IRead<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T | null> {
        try {
            const res = await this.model.findById(id);
            return res ?? null;
        } catch (error) {
            logger.error('Error in findById:', error);
            throw new Error('Error in findById');
        }
    }

    async findByEmail(email: string): Promise<T | null> {
        try {
            const res = await this.model.findOne({ email });
            return res ?? null;
        } catch (error) {
            logger.error('Error in findByEmail:', error);
            throw new Error('Error in findByEmail');
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const res = await this.model.deleteOne({ _id: id });
            return res.deletedCount > 0;
        } catch (error) {
            logger.error('Error in delete:', error);
            throw new Error('Error in delete');

        }
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const newItem = new this.model(data);
            return await newItem.save()
        } catch (error) {
            logger.error('Error in create:', error);
            throw new Error('Error in create');
        }
    }
}