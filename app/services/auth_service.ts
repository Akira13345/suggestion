import { LoginValidator } from '#validators/auth_validator'
import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class AuthService {
  async createUser(payload: LoginValidator): Promise<User> {
    const user = await User.create(payload)
    return user
  }

  async login(email: string, password: string): Promise<{ user: User; token: AccessToken }> {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { user, token }
  }
}
