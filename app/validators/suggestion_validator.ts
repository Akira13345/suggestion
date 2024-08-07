import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const suggestionValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(8).maxLength(255),
  })
)

export const voteValidator = vine.compile(
  vine.object({
    reaction: vine.enum(['like', 'dislike']),
  })
)

export type SuggestionValidator = Infer<typeof suggestionValidator>
