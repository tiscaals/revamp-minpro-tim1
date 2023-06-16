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
