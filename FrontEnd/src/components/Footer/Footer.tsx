import { Link } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { IoLogoGoogle } from 'react-icons/io'
import { PiInstagramLogoBold } from 'react-icons/pi'
import logo1 from 'src/assets/images/logo1.png'
// import { IoLogoYoutube } from 'react-icons/io5'
export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-[#4ADEDE] to-[#1CA7EC] bg-center bg-no-repeat bg-cover'>
      <div className='grid place-items-center py-9 font'>
        <div className='p-[20px] mx-auto'>
          <div className='flex gap-16 text-black'>
            <div className='flex-grow-1 -ml-10 '>
              <div className=' mb-6'>
                <Link to='/' className='logo-wrapper'>
                  <img src={logo1} alt='logo' className='w-[360px] h-[130px]' />
                </Link>
              </div>
              <div className='flex items-center justify-center'>
                <span className=''>Chúng tôi ở đây vì sức khỏe của bạn</span>
              </div>
            </div>
            <div className='flex-grow-1 -ml-10'>
              <span className='font-semibold text-black uppercase'>Bạn cần hỗ trợ</span>
              <div className='mb-6'>
                <div className='mt-3'>
                  <ul className='flex flex-col gap-3'>
                    <li>Địa chỉ: Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</li>
                    <li>
                      Hotline:{' '}
                      <Link className='hai01' to='tel:19006750'>
                        1900 6750
                      </Link>
                    </li>
                    <li>
                      Email: <a href='mailto:coolteam@gmail.com'>kin092002@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <h4 className='uppercase font-semibold '>Kết nối với chúng tôi</h4>
                <div className='flex gap-4 text-white text-3xl '>
                  <Link to='/'>
                    <FaFacebookF className='hover:bg-cyan-700 border rounded-full border-white p-[6px]' />
                  </Link>
                  <Link to='/'>
                    <IoLogoGoogle className='hover:bg-cyan-700 border rounded-full border-white p-[6px]' />
                  </Link>
                  <Link to='/'>
                    <PiInstagramLogoBold className='hover:bg-cyan-700 border rounded-full border-white p-[6px]' />
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='flex gap-2 text-black'>
                <div className=''>
                  <h4 className='font-semibold'>
                    <Link to='/' className='uppercase '>
                      Hỗ trợ khách hàng
                    </Link>
                  </h4>
                  <div className=' text-black mt-4' id='collapseListMenu01'>
                    <ul className='flex flex-col gap-3 text-white '>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/'>Trang chủ</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/user/user/input'>Giới thiệu</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/productCategory'>Sản phẩm</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/san-pham-hot'>Khuyến mãi hot</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/tin-tuc'>Tin tức</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/lien-he'>Liên hệ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='flex gap-2 text-black'>
                <div className=''>
                  <h4 className='uppercase mb-4 font-semibold'>
                    <Link to='/'>Chính sách</Link>
                  </h4>
                  <div className='text-white' id='collapseListMenu02'>
                    <ul className='flex flex-col gap-3 text-white'>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/collections/all'>Chính sách đổi trả</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/san-pham-hot'>Chính sách vận chuyển</Link>
                      </li>
                      <li className='li_menu hover:text-cyan-700'>
                        <Link to='/tin-tuc'>Chính sách bảo mật</Link>
                      </li>
                    </ul>
                  </div>
                  <div className='flex flex-col gap-5 mt-5 '>
                    <h4 className='uppercase font-semibold '> Phương thức thanh toán</h4>
                    <div className=''>
                      <Link to='/'>
                        <img
                          src='https://bizweb.dktcdn.net/100/336/334/themes/939194/assets/i_payment.png?1706112573342'
                          alt=''
                          className='w-[230px] h-[65px] ml-[-14px]'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
