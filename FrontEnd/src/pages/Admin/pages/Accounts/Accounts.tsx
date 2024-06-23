import { useEffect, useState } from 'react'
import MyDoughnutChart from '../../component/Chart'
import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import FormAccount from '../../component/FormAccount'

interface Role {
  role1: number // newuser
  role2: number //olser user
}

export default function Accounts() {
  const queryConfig = useQueryConfig()
  const { data: usersData } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser()
    }
  })

  const [role, setRole] = useState<Role>({
    role1: 0,
    role2: 0
  })

  const handleGetAllAccount = async () => {
    const roleCounts: Role = {
      role1: 0,
      role2: 0
    }

    const currentDate = new Date()
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(currentDate.getDate() - 3)

    if (usersData) {
      usersData.data.data.forEach((item: { createdAt: string }) => {
        const userCreatedDate = new Date(item.createdAt)
        if (userCreatedDate >= threeDaysAgo && userCreatedDate <= currentDate) {
          roleCounts.role1++
        } else {
          roleCounts.role2++
        }
      })
    }

    setRole(roleCounts)
  }

  useEffect(() => {
    handleGetAllAccount()
  }, [usersData])
  return (
    <div className='border border-gray-200 rounded-lg w-full px-4 pt-4 flex flex-col gap-8 mt-3'>
      <h1 className='font-bold text-[24px] text-center'>Quản lý người dùng</h1>
      <div className='flex gap-20 mt-20 ml-10'>
        <div className=''>
          <FormAccount />
        </div>
        <MyDoughnutChart role={role}></MyDoughnutChart>
      </div>
    </div>
  )
}
