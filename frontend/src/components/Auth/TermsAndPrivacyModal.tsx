import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export interface ITermsAndPrivacyModalProps {
    open: boolean
    onClose: () => void
    text: string
}

export default function TermsAndPrivacyModal (props: ITermsAndPrivacyModalProps) {
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    scroll={'paper'}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
  >
    <DialogTitle id="scroll-dialog-title">Terms and Privacy</DialogTitle>
    <DialogContent dividers>
      <DialogContentText
        id="scroll-dialog-description"
        // ref={descriptionElementRef}
        tabIndex={-1}
      >
        {props.text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
  );
}
