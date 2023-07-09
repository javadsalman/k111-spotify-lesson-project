import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface IPageLoadingProps {
  open: boolean;
  onClose: () => void;
}

export default function PageLoading(props: IPageLoadingProps) {

  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        onClick={props.onClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}