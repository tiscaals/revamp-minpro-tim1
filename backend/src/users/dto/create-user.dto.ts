export class CreateUsersDto {
  user_entity_id: any;
  user_name: string;
  user_password: string;
  user_first_name: string;
  user_last_name: string;
  user_birth_date: any;
  user_modified_date: Date;
  user_photo: string;
}

export class CreateEmailDto {
  pmail_entity_id: any;
  pmail_id: any;
  pmail_address: string;
  pmail_modified_date: any;
}

export class CreatePhoneNumberDto {
  uspo_entity_id: any;
  number_phone: string;
  uspo_ponty_code: string;
  uspo_modified_date: any;
}

export class CreateAddressDto {
  address_id: any;
  first_address: string;
  second_address: string;
  code_pos: string;
  city_id: any;
  user_id: any;
  address_type_id: any;
}

export class CreateEducationDto {
  usdu_entity_id: any;
  usdu_school: string;
  usdu_degree: string;
  usdu_field_study: string;
  usdu_start_date: any;
  usdu_end_date: any;
  usdu_grade: string;
  usdu_activities: string;
  usdu_description: string;
}

export class CreateExperiencesDto {
  usex_entity_id: any;
  usex_title: string;
  usex_profile_headline: string;
  usex_employment_type: string;
  usex_company_name: string;
  usex_is_current: any;
  usex_start_date: any;
  usex_end_date: any;
  usex_industry: string;
  usex_description: string;
  usex_experience_type: any;
  usex_city_id: any;
}
