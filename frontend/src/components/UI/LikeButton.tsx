import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton/IconButton';

export interface ILikeButtonProps {
    filled: boolean
    size?: number
}

export default function LikeButton (props: ILikeButtonProps) {
    const { filled, size=25} = props
    return (
        <IconButton aria-label="delete">
            {
                filled
                ?
                <FavoriteIcon style={{fontSize: size}} />
                :
                <FavoriteBorderIcon style={{fontSize: size}} />
            }
        </IconButton>
    )
}
