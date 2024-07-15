import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import adminApi from 'src/apis/admin.api'
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import Card from 'antd/es/card'
import Space from 'antd/es/space'
import Statistic from 'antd/es/statistic/Statistic'

interface RevenueData {
  date: string
  totalRevenue: number
}

interface HourlyRevenueData {
  hour: string
  totalRevenue: number
}

function DashboardCard({ title, value, icon }: any) {
  return (
    <Card className='w-[200px]'>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

const Dashboard = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueData[]>([])
  const [dailyRevenue, setDailyRevenue] = useState<HourlyRevenueData[]>([])
  const [selectedYear, setSelectedYear] = useState(moment().year())
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('monthly') // 'monthly' or 'daily'

  useEffect(() => {
    fetchMonthlyRevenue()
  }, [selectedYear, selectedMonth])

  useEffect(() => {
    if (viewMode === 'daily') {
      fetchDailyRevenue()
    }
  }, [selectedYear, selectedMonth, selectedDate, viewMode])

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await adminApi.getDailyRevenueForMonth(selectedMonth.toString(), selectedYear.toString())
      setMonthlyRevenue(response.data.data)
    } catch (error) {
      console.error('Error fetching monthly revenue', error)
    }
  }

  const fetchDailyRevenue = async () => {
    try {
      const response = await adminApi.getHourlyRevenueForDay(
        selectedDate.getDate().toString(),
        (selectedDate.getMonth() + 1).toString(),
        selectedDate.getFullYear().toString()
      )
      setDailyRevenue(response.data.data)
    } catch (error) {
      console.error('Error fetching daily revenue', error)
    }
  }

  const monthlyChartData = {
    labels: monthlyRevenue.map((rev) => rev.date),
    datasets: [
      {
        label: 'Daily Revenue',
        data: monthlyRevenue.map((rev) => rev.totalRevenue),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  }

  const dailyChartData = {
    labels: dailyRevenue.map((rev) => `${rev.hour}:00`),
    datasets: [
      {
        label: 'Hourly Revenue',
        data: dailyRevenue.map((rev) => rev.totalRevenue),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true
      }
    ]
  }
  const [lengthAccount, setLengthAccount] = useState(0)
  const [lengthProduct, setLengthProduct] = useState(0)
  const [lengthOrder, setLengthOrder] = useState(0)
  useEffect(() => {
    const handleGetAllProduct = async () => {
      const result = await adminApi.getAllProducts()
      if (result?.data?.data.length > 0) {
        setLengthProduct(result?.data?.data.length)
      }
    }
    const handleGetAllAccount = async () => {
      const result = await adminApi.getAllUser()
      if (result?.data?.data.length > 0) {
        setLengthAccount(result?.data?.data.length)
      }
    }
    const handleGetAllPayment = async () => {
      const result = await adminApi.getAllOrder()
      if (result?.data?.data.length > 0) {
        setLengthOrder(result?.data?.data.length)
      }
    }
    handleGetAllPayment()
    handleGetAllAccount()
    handleGetAllProduct()
  }, [])

  return (
    <div className='border border-gray-200 rounded-lg w-full px-4 pt-4 flex flex-col gap-8'>
      <h1 className='font-bold text-[24px] text-center'>Thống kê</h1>
      <Space direction='horizontal' className='flex items-center gap-5 justify-center'>
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: 'blue',
                backgroundColor: 'rgba(0,255,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
            />
          }
          title={'Orders'}
          value={lengthOrder}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: 'blue',
                backgroundColor: 'rgba(0,0,255,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
            />
          }
          title={'Inventory'}
          value={lengthProduct}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: 'purple',
                backgroundColor: 'rgba(0,255,255,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8
              }}
            />
          }
          title={'Customer'}
          value={lengthAccount}
        />
      </Space>
      <div className='border rounded-lg p-3 mb-2'>
        <div className='flex gap-2'>
          <button
            onClick={() => setViewMode('monthly')}
            className={`p-2 ${viewMode === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Doanh thu / tháng
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`p-2 ${viewMode === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Doanh thu / ngày
          </button>
        </div>
        {viewMode === 'monthly' && (
          <div className='flex flex-col items-center gap-4'>
            <div className='flex gap-2'>
              <select
                className='p-2 border border-gray-300 rounded'
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => moment().year() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className='p-2 border border-gray-300 rounded'
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: '70%' }}>
              <Line data={monthlyChartData} />
            </div>
          </div>
        )}
        {viewMode === 'daily' && (
          <div className='flex flex-col items-center gap-4'>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat='dd/MM/yyyy'
              className='p-2 border border-gray-300  w-[50%] rounded-lg'
            />
            <div style={{ width: '70%' }}>
              <Line data={dailyChartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
