import { Model } from 'sequelize-typescript';
export interface users_mediaAttributes {
    usme_id?: number;
    usme_entity_id: number;
    usme_filelink?: string;
    usme_filename?: string;
    usme_filetype?: string;
    usme_note?: string;
    usme_modified_data?: Date;
}
export declare class users_media extends Model<users_mediaAttributes, users_mediaAttributes> implements users_mediaAttributes {
    usme_id?: number;
    usme_entity_id: number;
    usme_filelink?: string;
    usme_filename?: string;
    usme_filetype?: string;
    usme_note?: string;
    usme_modified_data?: Date;
}
