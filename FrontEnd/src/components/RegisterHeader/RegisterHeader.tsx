import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='bg-gradient-to-r from-[#4ADEDE] to-[#1CA7EC] bg-center bg-no-repeat bg-cover py-3'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <nav className='flex items-center'>
            <Link to='/'>
              <div className='flex text-4xl items-center justify-items-center gap-1 font-extrabold'>
                <img
                  src='logo1.png'
                  alt=''
                  className='w-40 h-12 items-center justify-items-center mr-2 rounded-full '
                />
                <span className='text-[#ff3e38]'>Nutri</span>
                <span className='text-[#4245f5]'>Store</span>
              </div>
            </Link>
            <div className='ml-5 text-xl lg:text-2xl mt-1'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
          </nav>
          <div className='text-white'>
            <Link to='/'>Bạn cần hỗ trợ? </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
