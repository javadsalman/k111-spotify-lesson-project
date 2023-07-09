import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlaylistSummary from '../../../components/Playlist/PlaylistSummary';

export interface ICustomerHistoryProps {
}

export default function CustomerHistory(props: ICustomerHistoryProps) {
  return (
    <div className='h-full p-1'>
      <div className='flex flex-col h-full bg-zinc-900 rounded'>
        <div className='p-2'>
          <div className="text-lg font-semibold mb-2">Your Library</div>
          <div className='flex gap-1 mb-3'>
            <Chip label="Playlists" onClick={() => { }} />
            <Chip label="Artists" onClick={() => { }} />
          </div>
          <div className='flex items-end gap-1'>
            <SearchRoundedIcon />
            <TextField id="filled-basic" label="Filled" variant="standard" size='small' />
          </div>
        </div>
        <div className='flex-grow overflow-auto relative'>
          <div className='absolute top-0 bottom-0 left-0 right-0 overflow-auto'>
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
            <PlaylistSummary title="playlist" text="content" image="https://i.ytimg.com/vi/dpuKVjX6BJ8/maxresdefault.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
