import * as React from 'react';
import ArtistNavbar from '../../components/Navbar/ArtistNavbar';
import ArtistSidebar from '../../components/Sidebar/ArtistSidebar';

export interface IArtistLayoutProps {
  children: React.ReactNode
}

export default function ArtistLayout (props: IArtistLayoutProps) {
  return (
    <div className='flex h-screen flex-col'>
      <div><ArtistNavbar /></div>
      <div className='flex flex-grow'>
        <div className='basis-[300px] shrink-0'>
          <ArtistSidebar />
        </div>
        <div className='flex-grow'>{props.children}</div>
      </div>
    </div>
  );
}
