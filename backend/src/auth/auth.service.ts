import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthService {
  constructor(private sequelize: Sequelize) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(signUpDto.user_password, salt);

      signUpDto.user_password = passHash;

      const query = `CALL users.signuppc(:user_name, :user_password, :uspo_number, :pmail_address, :usro_role_id)`;
      const result = await this.sequelize.query(query, {
        replacements: {
          user_name: signUpDto.user_name,
          user_password: signUpDto.user_password,
          pmail_address: signUpDto.pmail_address,
          uspo_number: signUpDto.uspo_number,
          usro_role_id: signUpDto.usro_role_id,
        },
      });

      const success = {
        message: 'account created successfully, please login',
        status: 200,
        result: result,
      };

      return success;
    } catch (error) {
      const errorMsg = {
        message: error.message,
        status: 400,
      };

      return errorMsg;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const query = `SELECT * FROM users.selectUsers WHERE user_name = '${signInDto.user_name}' OR pmail_address = '${signInDto.pmail_address}'`;

      const dataUser: any = await this.sequelize.query(query);

      if (dataUser[0].length === 0) {
        throw new Error('username or email wrong');
      }

      const matchPassword = await bcrypt.compare(
        signInDto.user_password,
        dataUser[0][0].user_password,
      );

      if (!matchPassword) throw new Error('wrong password');

      const token = jwt.sign(
        { user_name: dataUser.user_name },
        process.env.SECRET_KEY,
        {
          expiresIn: '10m',
        },
      );

      const succes = {
        message: 'login succes',
        status: 200,
        token: token,
        result: dataUser[0],
      };

      return succes;
    } catch (error) {
      const errorMsg = {
        status: 400,
        message: error.message,
      };

      return errorMsg;
    }
  }
}
