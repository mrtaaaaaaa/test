import ErrorImg from '@/assets/images/404.png';

const NotFound = () => {
    return (
        <div className="flex h-full justify-center items-center">
            <div className='relative'>
                <img src={ErrorImg.src} alt="404Error" className='' />
                <h6 className='text-xl font-bold text-blue text-center md:absolute top-60 mx-auto left-0 right-0'>صفحه مورد نظر شما پیدا نشد!</h6>
            </div>

        </div>
    );
}

export default NotFound;