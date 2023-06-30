import * as React from 'react';

export interface ILayoutProps {
    children: React.ReactNode
}

export default function Layout (props: ILayoutProps) {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex-grow flex items-stretch gap-1'>
        <aside className='w-60 shrink-0 flex flex-col gap-1'>
          <div className='basis-2/12 bg-cyan-300'></div>
          <div className='flex-grow bg-emerald-700'></div>
        </aside>
        <div className='bg-indigo-700 flex-grow flex flex-col'>
          <header className='bg-violet-300 p-10'></header>
          <main className='flex-grow bg-pink-500'>
            {props.children}
          </main>
        </div>
      </div>
      <section className='p-12 bg-orange-800'></section>
    </div>
  );
}
