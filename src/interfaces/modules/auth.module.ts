import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@interfaces/controllers/auth.controller';
import { AuthService } from '@interfaces/services/auth.service';
import { JwtStrategy } from '@interfaces/auth/jwt.strategy';
import { USER_REPOSITORY } from '@domain/repositories/user.repository';
import { TypeOrmUserRepository } from '@infrastructure/repositories/typeorm-user.repository';
import { UserDbEntity } from '@infrastructure/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDbEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
