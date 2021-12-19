import { EntityRepository } from "@mikro-orm/mongodb"
import { InjectRepository } from "@mikro-orm/nestjs"
import { Injectable } from "@nestjs/common"
import { RegisterDTO } from "./dtos/body/register"
import { User } from "./entities/user"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async registerUser({ email, password, name }: RegisterDTO): Promise<User> {
    const user = this.userRepository.create({
      email,
      password,
      name
    })

    await this.userRepository.persistAndFlush(user)

    return user
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ email })
  }
}
