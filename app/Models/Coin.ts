import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Coin extends BaseModel {
  @column({ isPrimary: true })
  public id: String

  @column()
  public symbol: String

  @column()
  public name: String

  @column()
  public platforms: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
