import { Chart } from 'iconsax-react';

export const ChartHomeCounter = () => {
    return (
        <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 bg-blue my-14 rounded-xl text-white px-16 p-10 gap-10'>
            
            <div className=' justify-center items-center lg:flex hidden'>
            <Chart size="80" color="#3A7B91" />
            </div>
            <div className='flex flex-col text-center gap-3'>
                <span className='block font-bold lg:text-3xl text-xl'>+200 هزار </span>
                <span className='block text-sm font-light'>آگهی‌های خودرو موجود</span>
            </div>
            <div className='flex flex-col text-center gap-3'>
                <span className='block font-bold lg:text-3xl text-xl'>+۵۰ برند</span>
                <span className='block text-sm font-light'>برند‌های خودرو موجود</span>
            </div>
            <div className='flex flex-col text-center gap-3'>
                <span className='block font-bold lg:text-3xl text-xl'>+200 هزار </span>
                <span className='block text-sm font-light'>معاملات انجام شده</span>
            </div>
            <div className='flex flex-col text-center gap-3'>
                <span className='block font-bold lg:text-3xl text-xl'>+200 هزار </span>
                <span className='block text-sm font-light'>کارشناسی‌های انجام شده</span>
            </div>
        </div>
    )
}