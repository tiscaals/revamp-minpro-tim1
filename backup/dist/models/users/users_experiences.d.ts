import { Model } from 'sequelize-typescript';
export interface users_experiencesAttributes {
    usex_id?: number;
    usex_entity_id: number;
    usex_title?: string;
    usex_profile_headline?: string;
    usex_employment_type?: string;
    usex_company_name?: string;
    usex_is_current?: string;
    usex_start_date?: string;
    usex_end_date?: string;
    usex_industry?: string;
    usex_description?: string;
    usex_experience_type?: string;
    usex_city_id?: number;
}
export declare class users_experiences extends Model<users_experiencesAttributes, users_experiencesAttributes> implements users_experiencesAttributes {
    usex_id?: number;
    usex_entity_id: number;
    usex_title?: string;
    usex_profile_headline?: string;
    usex_employment_type?: string;
    usex_company_name?: string;
    usex_is_current?: string;
    usex_start_date?: string;
    usex_end_date?: string;
    usex_industry?: string;
    usex_description?: string;
    usex_experience_type?: string;
    usex_city_id?: number;
}
