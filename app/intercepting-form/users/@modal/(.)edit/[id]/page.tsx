import { Modal } from '@/app/intercepting-form/components/Modal'
import { getUser } from '@/app/intercepting-form/lib/query/getUser'
import UserForm from '@/app/intercepting-form/users/edit/[id]/UserForm'

type Props = {
  params: {
    id: number
  }
}

export default async function EditUser({ params }: Props) {
  const { id } = params

  const user = await getUser(id)

  if (!user?.id) {
    return (
      <Modal>
        <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">No User Found for that ID.</h1>
        </div>
      </Modal>
    )
  }

  return (
    <Modal>
      <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">Edit User {id}</h1>
        <UserForm user={user} />
      </div>
    </Modal>
  )
}
