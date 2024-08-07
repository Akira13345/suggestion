import Suggestion from '#models/suggestion'
import { SuggestionValidator } from '#validators/suggestion_validator'
import Vote from '#models/vote'

export default class SuggestionService {
  async createSuggestion(
    payload: SuggestionValidator,
    username: string | undefined
  ): Promise<Suggestion> {
    const suggestion = await Suggestion.create({
      username: username,
      content: payload.content,
      likes: 0,
      dislikes: 0,
    })
    return suggestion
  }

  async getSuggestions() {
    const suggestions = await Suggestion.all()
    return suggestions
  }

  async reactToSuggestion(suggestionId: number, username: string, reaction: 'like' | 'dislike') {
    const suggestion = await Suggestion.findOrFail(suggestionId)

    const vote = await Vote.query()
      .where('suggestionId', suggestionId)
      .where('username', username)
      .first()

    if (vote) {
      if (vote.voteType === reaction) {
        await vote.delete()
        suggestion[`${reaction}s`] -= 1
      } else {
        vote.voteType = reaction
        await vote.save()
        suggestion.likes += reaction === 'like' ? 1 : -1
        suggestion.dislikes += reaction === 'dislike' ? 1 : -1
      }
    } else {
      await Vote.create({ suggestionId, username, voteType: reaction })
      suggestion[`${reaction}s`] += 1
    }

    await suggestion.save()
    return suggestion
  }
}
