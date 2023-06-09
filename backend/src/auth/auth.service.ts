import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize-typescript';
import { roles, users, users_email, users_roles } from 'models';
import isValidUsernameOrEmail from 'src/helpers/checkUserNameOrEmail';

@Injectable()
export class AuthService {
  constructor(private sequelize: Sequelize) {}

  async findByUsername(user_name: string) {
    try {
      const result = await users.findOne({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_password',
          'user_current_role',
        ],
        where: {
          user_name: user_name,
        },
        include: [
          {
            model: users_email,
            attributes: ['pmail_address'],
          },
          {
            model: users_roles,
            attributes: ['usro_role_id'],
            include: [
              {
                model: roles,
                attributes: ['role_name'],
              },
            ],
          },
        ],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findByEmail(pmail_address: string) {
    try {
      const result = await users.findOne({
        attributes: [
          'user_entity_id',
          'user_name',
          'user_password',
          'user_current_role',
        ],
        include: [
          {
            model: users_email,
            where: { pmail_address: pmail_address },
            attributes: ['pmail_address'],
          },
          {
            model: users_roles,
            attributes: ['usro_role_id'],
            include: [
              {
                model: roles,
                attributes: ['role_name'],
              },
            ],
          },
        ],
      });
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async signIn(signInDto: SignInDto) {
    let res: any;
    let result: any;

    try {
      if (isValidUsernameOrEmail(signInDto.usernameOrEmail) === 'Email') {
        res = await this.findByEmail(signInDto.usernameOrEmail);
        if (!res) throw new Error('email not found');
        result = res;
      } else if (
        isValidUsernameOrEmail(signInDto.usernameOrEmail === 'Username')
      ) {
        res = await this.findByUsername(signInDto.usernameOrEmail);
        if (!res) throw new Error('username not found');
        result = res;
      }

      const matchPassword = await bcrypt.compare(
        signInDto.password,
        res.user_password,
      );

      if (!matchPassword) throw new Error('wrong password');
      const token = jwt.sign(
        { user_name: res.user_name },
        process.env.SECRET_KEY,
        {
          expiresIn: '10m',
        },
      );

      const succes = {
        message: 'login succes',
        status: 200,
        token: token,
        result: result,
      };

      return succes;
    } catch (error) {
      return error.message;
    }
  }

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
          uspo_number: signUpDto.uspo_number,
          pmail_address: signUpDto.pmail_address,
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
}
