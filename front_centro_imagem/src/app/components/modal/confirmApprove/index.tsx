import React, { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import DatePickerValue from '../../main/fragment/inputDate';
import { Button, Input, TextField, Typography } from '@mui/material';
import { postCreateSolicitation } from '@/services/fetch/apiSolicitation';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  minWidth: 300,
  height: '170px',
  display: 'flex',
  flexDirection: 'column' as 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #a7c5ca',
  boxShadow: '0px 5px 10px 5px #333636',
  p: 4,
  borderRadius: '3%',
};

interface ISpringModalProps {
  open: boolean;
  guia: string | number;
  setSelectGuia: Function;
  setClose: Function;
  handleApprove: Function;
}

export default function ModalConfirmApprove({ open, guia, setSelectGuia, setClose, handleApprove }: ISpringModalProps) {

  return (
    <div>
      <Modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={() => {
          setClose(false);
          setSelectGuia('');
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{
                textAlign: 'center',
                marginBottom: '30px',
              }}
            >
              Deseja realmente aprovar essa solicitação?
            </Typography>
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly'
            }}>
              <Button
                sx={{
                  backgroundColor: '#e71515',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#f39a6d',
                    color: '#030303',
                    border: '1px solid #2f9fd8',
                    fontWeight: 'bold',
                  },
                  width: '25%',
                  alignSelf: 'center',
                }}
                onClick={() => {
                  setClose(false);
                  setSelectGuia('');
                }}
              >
                Cancelar
              </Button>
              <Button
                sx={{
                  backgroundColor: '#0fa33c',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#4fec9e',
                    color: '#030303',
                    border: '1px solid #2f9fd8',
                    fontWeight: 'bold',
                  },
                  width: '25%',
                  alignSelf: 'center',
                }}
                onClick={() => handleApprove(guia)}
              >
                Confirmar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
