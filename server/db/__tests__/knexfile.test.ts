import config from '../knexfile'
import { describe, it, expect, vi } from 'vitest'

describe('afterCreate PRAGMA', () => {
  it('enforces foreign keys (development)', () => {
    const cb = {}
    const db = { run: vi.fn() }
    config.development.pool.afterCreate(db, cb)
    expect(db.run).toHaveBeenCalledWith('PRAGMA foreign_keys = ON', cb)
  })
})
