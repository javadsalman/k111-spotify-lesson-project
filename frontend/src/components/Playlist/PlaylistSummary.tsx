import * as React from 'react';

export interface IPlaylistSummaryProps {
    image: string
    title: string
    text: string
}

export default function PlaylistSummary (props: IPlaylistSummaryProps) {
  return (
    <div>
      <div className='flex p-2 gap-3 rounded cursor-pointer duration-300 hover:bg-zinc-700'>
        <div>
            <img className='w-16 h-16 object-cover rounded' src={props.image} alt="" />
        </div>
        <div className='flex flex-col justify-around'>
            <div className='text-lg font-semibold'>{props.title}</div>
            <div className='text-neutral-300'>{props.text}</div>
        </div>
      </div>
    </div>
  );
}
