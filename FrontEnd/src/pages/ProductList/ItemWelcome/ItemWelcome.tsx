// import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

export default function ItemWelcome() {
  const [hasAnimated, setHasAnimated] = useState(false)
  // const [scrollListenerRemoved, setScrollListenerRemoved] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // console.log(currentScrollY)
      if (560 <= currentScrollY && currentScrollY <= 750 && !hasAnimated) {
        setHasAnimated(true)
      } else if (559 >= currentScrollY || currentScrollY >= 755) {
        setHasAnimated(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasAnimated])

  return (
    <div className='bg-neutral-100 h-full flex flex-col w-full px-16 py-10 rounded-xl'>
      <div className='flex flex-row '>
        <div className='flex flex-col w-[38%] gap-12'>
          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='immpr.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>CẢI THIỆN SỨC KHỎE</div>
            <span className='text-[16px] text-gray-500 w-full'>
              Sức Khỏe Là Vàng, Giữ Gìn Nhưng Giây Phút Hạnh Phúc
            </span>
          </div>
          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='heart.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>TỐT CHO NGƯỜI DÙNG</div>
            <span className='text-[16px] text-gray-500'>Nguồn Năng Lượng Dồi Dào Cho Cuộc Sống Tươi Mới. </span>
          </div>
        </div>

        <div
          className={`${
            hasAnimated ? 'animate-slideInRight' : 'animate-none'
          } transition-all duration-500 flex flex-col gap-2 h-1/2 rounded-md items-center w-full`}
          // ref={ref}
        >
          <div className='text-2xl font-bold text-[#41BAE3]'>Chào bạn đến với Nutri Store</div>
          <div className='text-4xl font-bold text-[#17414F] w-full text-center'>Vitamin tốt nhất của chúng ta</div>
          <img src='bua-an.png' alt='' className='rounded-md w-[950px] h-[550px]' />
        </div>

        <div
          className={`${
            hasAnimated ? 'animate-slideInRight' : 'animate-none'
          } transition-all duration-500 flex flex-col  w-[38%]  gap-12`}
          // ref={ref}
        >
          <div className=' flex flex-col gap-3 justify-center items-center'>
            <img src='strong.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>KHỎE MẠNH</div>
            <span className='text-[16px] text-gray-500'>Chăm Sóc Cơ Thể, Nâng Cao Tinh Thần</span>
          </div>

          <div
            className={`${
              hasAnimated ? 'animate-slideInRight' : 'animate-none'
            } transition-all duration-500 flex flex-col gap-3 justify-center items-center`}
            // ref={ref}
          >
            <img src='memory.png' alt='' className='w-[150px] h-[150px]' />
            <div className='text-xl font-bold text-[#17414F]'>TRÍ NHỚ TỐT</div>
            <span className='text-[16px] text-gray-500'>Sức Khỏe Tốt, Trí Tuệ Sáng Tạo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
