interface Props {
  img?: string
  name?: string
}
function ItemCategory({ img, name }: Props) {
  return (
    <div className=' flex flex-col items-center justify-center px-2 py-3 hover:scale-105  '>
      <button>
        <img src={img} alt='' className='w-[140px] h-[140px] rounded-full border-3 border-gray-300 p-3' />
        <div className='mt-[5px] text-[15px]'>
          <span>{name}</span>
        </div>
      </button>
    </div>
  )
}

export default ItemCategory
