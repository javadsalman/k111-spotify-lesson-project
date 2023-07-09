import * as React from 'react';
import LikeButton from '../UI/LikeButton';

export interface ISongInfoProps {
  image: string
  title: string
  text: string
}

export default function SongInfo(props: ISongInfoProps) {
  return (
      <div className='flex items-center p-2 gap-3 rounded'>
        <div>
          <img className='w-16 h-16 object-cover rounded' src={props.image} alt="" />
        </div>
        <div className='flex flex-col justify-around'>
          <div className='text-lg font-semibold'>{props.title}</div>
          <div className='text-neutral-300'>{props.text}</div>
        </div>
        <div>
          <LikeButton filled={false} />
        </div>
      </div>
  );
}
