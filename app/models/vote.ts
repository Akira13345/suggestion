import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare suggestionId: number

  @column()
  declare username: string

  @column()
  declare voteType: 'like' | 'dislike'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
