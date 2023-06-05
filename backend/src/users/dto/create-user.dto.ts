import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message : 'username must be required'})
    user_name: string
}
