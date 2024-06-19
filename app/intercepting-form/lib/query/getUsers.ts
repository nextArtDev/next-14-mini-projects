import { z } from 'zod'
import { createZodFetcher } from 'zod-fetch'
import { UserSchema } from '../schemas/User'

const fetchUsers = createZodFetcher()

export async function getUsers() {
  try {
    const users = await fetchUsers(
      z.array(UserSchema),
      'http://localhost:3500/users',
      { cache: 'no-store' }
    )
    return users
  } catch (error) {
    console.log(error)
  }
}
