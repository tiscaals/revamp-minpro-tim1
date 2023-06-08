import { Model } from 'sequelize-typescript';
export interface users_phonesAttributes {
    uspo_entity_id: number;
    uspo_number: string;
    uspo_modified_date?: Date;
    uspo_ponty_code?: string;
}
export declare class users_phones extends Model<users_phonesAttributes, users_phonesAttributes> implements users_phonesAttributes {
    uspo_entity_id: number;
    uspo_number: string;
    uspo_modified_date?: Date;
    uspo_ponty_code?: string;
}
