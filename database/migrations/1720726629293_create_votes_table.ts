import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Votes extends BaseSchema {
  protected tableName = 'votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('suggestion_id')
        .unsigned()
        .references('id')
        .inTable('suggestions')
        .onDelete('CASCADE')
      table.string('username', 254).notNullable()
      table.enum('vote_type', ['like', 'dislike']).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
