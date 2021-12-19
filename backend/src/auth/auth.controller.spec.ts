/* eslint-disable @typescript-eslint/no-misused-promises */
import { ObjectId } from "@mikro-orm/mongodb"
import { BadRequestException } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { plainToClass } from "class-transformer"
import { verify } from "jsonwebtoken"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { LoginDTO } from "./dtos/body/login"
import { RegisterDTO } from "./dtos/body/register"
import { JwtPayload } from "./dtos/response/jwt"
import { User } from "./entities/user"

const _id = new ObjectId()
const hashedPassword =
  "$2a$10$FUT9vYeJTfW2jusgtNH1A.2TbEQr8pIzNllSP.9nYZIJkFmIpU062" // "test"
const createdAt = new Date()
const updatedAt = new Date()

const user = plainToClass(User, {
  _id,
  id: _id.toString(),
  name: "Test",
  email: "test@test.com",
  password: hashedPassword,
  createdAt,
  updatedAt
})

describe("AuthController", () => {
  let authController: AuthController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn((r) =>
              Promise.resolve(
                plainToClass(User, {
                  _id,
                  id: _id.toString(),
                  createdAt,
                  updatedAt,
                  ...r
                })
              )
            ),
            getUser: jest.fn((email) =>
              Promise.resolve(user.email === email ? user : undefined)
            )
          }
        }
      ]
    }).compile()

    authController = moduleRef.get<AuthController>(AuthController)
  })

  describe("register", () => {
    const body: RegisterDTO = {
      email: user.email,
      password: "test",
      name: user.name
    }

    it("should return the user", async () => {
      const response = await authController.register(body)

      expect(response.user).toEqual(user.dto())
    })

    it("should return a verified jwt", async () => {
      const response = await authController.register(body)

      const decoded = verify(response.token, process.env.JWT_SECRET)

      expect(decoded).toBeTruthy()
    })
  })

  describe("login", () => {
    const body: LoginDTO = {
      email: user.email,
      password: "test"
    }

    it("should return a verified jwt with a valid payload", async () => {
      const response = await authController.login(body)

      let decoded: JwtPayload
      try {
        decoded = verify(response.token, process.env.JWT_SECRET) as JwtPayload
      } catch (e) {
        expect(e).not.toBeInstanceOf(Error)
      }

      expect(decoded).toBeTruthy()

      expect(decoded.id).toBe(user.id)
      expect(decoded.name).toBe(user.name)
      expect(decoded.email).toBe(user.email)
    })

    it("should return the account", async () => {
      const response = await authController.login(body)

      expect(response.user).toEqual(user.dto())
    })

    it("should throw an error when invalid credentials", async () => {
      await expect(
        authController.login({
          email: user.email,
          password: "wrong"
        })
      ).rejects.toThrowError(
        new BadRequestException("Invalid email or password")
      )
    })
  })
})
