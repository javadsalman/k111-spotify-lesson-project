import * as React from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';

export interface IPlayButtonProps {
    running: boolean
    size?: number
}

export default function PlayButton(props: IPlayButtonProps) {
    const {running, size=40} = props;
    return (
        <IconButton aria-label="delete">
            {
                running
                    ?
                    <PauseCircleFilledRoundedIcon style={{ fontSize: size }} />
                    :
                    <PlayCircleFilledRoundedIcon style={{ fontSize: size }} />
            }
        </IconButton>
    );
}
