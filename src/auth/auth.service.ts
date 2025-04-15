import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { validateWithZod } from 'src/common/utils/zod-validator';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignUpSchema } from './dto/signup.dto';
import { SignInDto, SignInSchema } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(data: SignUpDto) {
    const parsed = validateWithZod(SignUpSchema, data);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hash = await bcrypt.hash(parsed.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...parsed,
        password: hash,
      },
    });

    const { password: _unused, ...safeUser } = user;
    void _unused;
    return safeUser;
  }

  async signin(data: SignInDto) {
    const parsed = validateWithZod(SignInSchema, data);

    const user = await this.prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      parsed.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const { password: _unused, ...safeUser } = user;
    void _unused;

    return safeUser;
  }
}
