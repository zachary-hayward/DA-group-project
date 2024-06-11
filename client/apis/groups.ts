import request from 'superagent'
import type { Groups } from '../../models/groups.ts'

const rootURL = '/api/v1/groups'

export default async function getAllGroups(): Promise<Groups[]> {
  const result = await request.get(rootURL)
  return result.body
}
