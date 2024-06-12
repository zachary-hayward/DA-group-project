import request from 'superagent'
import type { Group } from '../../models/groups.ts'

const rootURL = '/api/v1/groups'

export default async function getAllGroups(): Promise<Group[]> {
  const result = await request.get(rootURL)
  return result.body
}
