import * as React from 'react';
import AuthNavbar from '../../components/Navbar/AuthNavbar';

export interface IAuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout (props: IAuthLayoutProps) {
  return (
    <div className='flex flex-col'>
      <header>
        <AuthNavbar />
      </header>
      <main>
        {props.children}
      </main>
    </div>
  );
}
