import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface IContentLoadingProps {
    size?: number;
}

export default function ContentLoading(props: IContentLoadingProps) {
    const { size=80 } = props;
    return (
        <div className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
            <CircularProgress style={{width: size, height: size}} />
        </div>
    );
}
