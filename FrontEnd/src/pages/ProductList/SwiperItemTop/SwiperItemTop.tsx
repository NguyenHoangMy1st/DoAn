import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { formatCurrency, generateNameId, rateSale } from 'src/utils/utils'
interface Props {
  product: any
}
export default function SwiperItemTop({ product }: Props) {
  return (
    <div className='relative h-full group '>
      <Link
        to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
        className=' h-[450px] font '
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        <div className=' w-[260px]  relative h-[330px] flex flex-col justify-between gap-5 items-center rounded-2xl shadow-gray-400/90 group-hover:shadow-lg border-2 border-gray-100 p-2  group-hover:scale-105 pb-4'>
          <div className='flex-1 h-1/2   '>
            <img src={product?.image} alt='' className='w-full rounded-t-2xl rounded-tr-2xl h-[130px]' />
          </div>
          {product.price_before_discount != product.price ? (
            <div className='absolute left-3 top-4 transform  w-[40px] h-[40px] bg-[#5f6c12] text-white px-1 py-2 rounded-full text-[12px] pl-1'>
              -{rateSale(product.price_before_discount, product.price)}
            </div>
          ) : (
            <div />
          )}
          <div className='flex-1 h-1/2 '>
            <div className='flex flex-col gap-2 items-center justify-center px-6'>
              <div className='text-sm font-semibold text-rose-700'>{product?.brand?.name}</div>
              <div className='text-[15px] line-clamp-2 text-center leading-relaxed font-normal text-black w-full'>
                {product?.name}
              </div>

              <div className='text-[13px] flex gap-3 px-3 items-center'>
                {product.price_before_discount !== product.price ? (
                  <>
                    <div className='font-semibold text-black'>{formatCurrency(product.price)}đ</div>
                    <div className='font-medium text-gray-400 line-through'>
                      {formatCurrency(product.price_before_discount)}đ
                    </div>
                    <div className='relative bg-[#96b010] w-[30px] h-[15px] flex justify-center items-center rounded-full'>
                      <div className='absolute text-gray-100 text-[11px] p-1'>
                        -{rateSale(product.price_before_discount, product.price)}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='font-semibold text-black '>{formatCurrency(product.price)}đ</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
