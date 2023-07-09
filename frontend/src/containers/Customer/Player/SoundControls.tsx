import { Slider } from '@mui/material';
import * as React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export interface ISoundControlsProps {
}

export default function SoundControls(props: ISoundControlsProps) {
    return (
        <div className='px-3'>
            <div className='w-8/12 ml-auto flex gap-2 items-center'>
                <VolumeUpIcon />
                <Slider
                    size="small"
                    defaultValue={70}
                    aria-label="Small"
                />
            </div>
        </div>
    );
}
