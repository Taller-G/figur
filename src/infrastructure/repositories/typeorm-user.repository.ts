import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserEntity } from '@domain/entities/user.entity';
import { UserDbEntity } from '@infrastructure/database/entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserDbEntity)
    private readonly repository: Repository<UserDbEntity>,
  ) {}

  async create(email: string, password: string): Promise<UserEntity> {
    const entity = this.repository.create({ email, password });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  private toDomain(entity: UserDbEntity): UserEntity {
    return new UserEntity(entity.id, entity.email, entity.password, entity.createdAt);
  }
}
