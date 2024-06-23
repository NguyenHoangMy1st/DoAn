import { MdDashboard, MdOutlineAccountCircle } from 'react-icons/md'

import { BiSolidPackage } from 'react-icons/bi'
import path from 'src/constants/path'
import { IoBagHandle, IoTrashBin } from 'react-icons/io5'
import { TbBrandAzure } from 'react-icons/tb'

export const data = [
  {
    id: 0,
    title: 'Dashboard',
    icon: <MdDashboard size={24} />,
    link: path.dashboard
  },
  {
    id: 1,
    title: 'Accounts',
    icon: <MdOutlineAccountCircle size={24} />,
    link: path.accounts
  },
  {
    id: 2,
    title: 'Products',
    icon: <BiSolidPackage size={24} />,
    link: path.products
  },
  {
    id: 3,
    title: 'Deteled Products',
    icon: <IoTrashBin size={24} />,
    link: path.deteledProducts
  },
  {
    id: 4,
    title: 'Brands',
    icon: <TbBrandAzure size={24} />,
    link: path.brands
  },
  {
    id: 5,
    title: 'Orders',
    icon: <IoBagHandle size={24} />,
    link: path.orders
  }
]
