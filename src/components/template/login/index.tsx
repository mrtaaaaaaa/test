import { FC, ReactNode } from 'react';

interface MyProps {
   children?: ReactNode;
}

const LoginTemplate:FC<MyProps> = ({children}) => {
  return <div className='h-[100vh] w-[100vh] bg-white'>{children}</div>;
};

export default LoginTemplate;



