'use client'
import { TableCell, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import { User } from '../lib/schemas/User'

type Props = {
  user: User
}

export default function UserRow({ user }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/intercepting-form/users/edit/${user.id}`)
  }

  return (
    <TableRow onClick={handleClick}>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
    </TableRow>
  )
}
