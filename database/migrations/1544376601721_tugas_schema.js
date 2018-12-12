'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TugasSchema extends Schema {
  up () {
    this.create('tugases', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('tugases')
  }
}

module.exports = TugasSchema
