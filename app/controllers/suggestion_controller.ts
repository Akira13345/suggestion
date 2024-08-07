import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { suggestionValidator } from '#validators/suggestion_validator'
import { voteValidator } from '#validators/suggestion_validator'
import SuggestionService from '#services/suggestion_service'

@inject()
export default class SuggestionController {
  constructor(private suggestionService: SuggestionService) {}

  async createSuggestion({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(suggestionValidator)
    const suggestion = await this.suggestionService.createSuggestion(payload, auth.user?.username)
    return response.created(suggestion)
  }

  async getSuggestions({ response }: HttpContext) {
    const suggestions = await this.suggestionService.getSuggestions()
    return response.ok(suggestions)
  }

  async reactSuggestion({ request, auth, response, params }: HttpContext) {
    const { reaction } = await request.validateUsing(voteValidator)
    const username = auth.user?.username

    if (!username) {
      return response.unauthorized({ message: 'User must be authenticated' })
    }

    const updatedSuggestion = await this.suggestionService.reactToSuggestion(
      params.id,
      username,
      reaction
    )
    return response.ok(updatedSuggestion)
  }
}
