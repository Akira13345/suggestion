import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth_validator'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    await this.authService.createUser(payload)
    return response.ok({ message: 'User has been created successfully' })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const token = await this.authService.login(email, password)
    return response.ok(token)
  }

  async profile({ auth, response }: HttpContext) {
    return response.ok({ user: auth.user })
  }
}
