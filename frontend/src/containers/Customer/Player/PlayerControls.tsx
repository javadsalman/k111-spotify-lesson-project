import * as React from 'react';
import PlayButton from '../../../components/UI/PlayButton';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { IconButton, Slider } from '@mui/material';

export interface IPlayerControlsProps {
}

export default function PlayerControls (props: IPlayerControlsProps) {
  return (
    <div className='flex flex-col py-2'>
      <div className='flex justify-center'>
        <IconButton><SkipPreviousRoundedIcon style={{fontSize: 40}} /></IconButton>
        <PlayButton running={false} />
        <IconButton><SkipNextRoundedIcon style={{fontSize: 40}} /></IconButton>
      </div>
      <div className='flex gap-3 items-center'>
        <div>2:54</div>
        <Slider
            size="small"
            defaultValue={70}
            aria-label="Small"
        />
        <div>1:12</div>
      </div>
    </div>
  );
}
