import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'
import ItemBrand from '../ItemBrand'

interface AppProps {}
const FlashSale: FC<AppProps> = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={-80}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation]}
        className=' w-full py-4'
      >
        <SwiperSlide>
          <ItemBrand
            id='663cf6ae175f930606062522'
            img='https://cdn.tgdd.vn/Files/2021/11/04/1395601/snack-corn-chip-gion-la-thom-ngon-ban-nhat-dinh-phai-thu-202111040236162286.jpg'
          />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand
            id='663cf967175f93060606253d'
            img='https://www.anphabe.com/file-deliver.php?key=hcWDxaBjm7TXnZedhtmlrtKWiG3ZcGOgWtaWr1qhqG5mbluboZ1UoKNrZp1abGNubGyaVXHXamiXclaUx8vF1tDYwdrHnNaehp7VnZSgU1ehrg..'
          />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand
            id='663cf6bc175f930606062524'
            img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLkRBoWKGw5ww2dxJ96up6wagD8KiGhGKMAyLPrn8UHg&s'
          />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand
            id='663cf6d3175f930606062528'
            img='https://nhathuocthanthien.com.vn/wp-content/uploads/2023/01/dgm_nttt_neomil-lactoferrin-banner.jpg'
          />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand
            id='663e8bf4424670a7f0937b79'
            img='https://cdn.tgdd.vn/Files/2023/09/09/1546572/ca-phe-sua-da-vinacafe-co-bao-nhieu-loai-chi-tiet-tung-loai-202309110756277754.jpg'
          />
        </SwiperSlide>
        <SwiperSlide>
          <ItemBrand
            id='663fa15e75541b57cc785393'
            img='http://calbee.vn/wp-content/uploads/2023/06/z4427863588262_0bcf277c6cb0e0f8946f00d02f0d2f22-min.jpg'
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default FlashSale
