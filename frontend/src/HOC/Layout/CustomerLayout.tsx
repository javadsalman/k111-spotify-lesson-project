import * as React from 'react';
import CustomerSidebar from '../../components/Sidebar/CustomerSideBar';
import CustomerHistory from '../../containers/Customer/CustomerHistory/CustomerHistory';
import CustomerNavbar from '../../components/Navbar/CustomerNavbar';
import Player from '../../containers/Customer/Player/Player';

export interface ICustomerLayoutProps {
    children: React.ReactNode
}

export default function CustomerLayout (props: ICustomerLayoutProps) {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex-grow flex items-stretch gap-1'>
        <aside className='w-80 shrink-0 flex flex-col gap-1'>
          <div className=''>
            <CustomerSidebar />
          </div>
          <div className='flex-grow'>
            <CustomerHistory />
          </div>
        </aside>
        <div className='flex-grow flex flex-col'>
          <header className=''>
            <CustomerNavbar />
          </header>
          <main className='flex-grow relative'>
            {props.children}
          </main>
        </div>
      </div>
      <section className=''>
        <Player />
      </section>
    </div>
  );
}
