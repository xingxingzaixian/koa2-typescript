import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { getRepository } from 'typeorm';
import type { Repository } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column({ unique: true, nullable: false })
  // @ts-ignore
  username: string;

  @Column({ nullable: false, length: 64 })
  // @ts-ignore
  password: string;

  @Column()
  // @ts-ignore
  email: string;

  @CreateDateColumn()
  // @ts-ignore
  createdAt: Date;

  /**
   * @description 获取用户信息
   * @param username 用户名
   * @returns
   */
  static async getUserInfo(username: string) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const user: User | undefined = await userRepository.findOne({ username });
      return user;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * @description 创建用户
   * @param user
   */
  static async createUser(user: User) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      await userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }
}
