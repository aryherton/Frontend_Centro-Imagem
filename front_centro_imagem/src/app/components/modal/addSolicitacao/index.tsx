import React, { useContext, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import DatePickerValue from '../../main/fragment/inputDate';
import { Button, Input, TextField } from '@mui/material';
import { getAllSolicitation, postCreateSolicitation } from '@/services/fetch/apiSolicitation';
import { SolicitacaoContext } from '@/context';

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
  width: '35%',
  minWidth: 300,
  height: '80%',
  display: 'flex',
  flexDirection: 'column' as 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignContent: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #a7c5ca',
  boxShadow: '0px 5px 10px 5px #333636',
  p: 4,
  borderRadius: '3%',
};

interface ISpringModalProps {
  open: boolean;
  setClose: Function;
}

export default function ModalSolicitacao({ open, setClose }: ISpringModalProps) {
  const { setSolicitacaoData } = useContext(SolicitacaoContext);
  const [inpuName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputExame, setInputExame] = useState('');
  const [inputGuia, setInputGuia] = useState('');
  const [observacao, setObservacao] = useState('');

  const handleClose = () => setClose(false);

  const handleCreatedSolicitation = async () => {
    const data = await postCreateSolicitation({
      nome: inpuName,
      dataSolicitacao: inputDate,
      exame: inputExame,
      guia: inputGuia,
      aprovado: false,
      observacao,
      logInterno: '',
    });
    const newListSolicitation = await getAllSolicitation();

    setSolicitacaoData(newListSolicitation);
    setInputName('');
    setInputDate('');
    setInputExame('');
    setInputGuia('');
    setObservacao('');
    setClose(false);
  };

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
        onClose={handleClose}
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
            <Box
              component='h2'
              id="spring-modal-title"
              sx={{
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                lineHeight: '0.5rem',
                '@media (max-width: 600px)': {
                  fontSize: '0.8rem',
                },
              }}
            >
              Cadastrar solicitação
            </Box>
            <Input
              value={inpuName}
              placeholder='Digite o nome'
              onChange={({ target: { value } }) => setInputName(value)}
            />
            <DatePickerValue
              value={inputDate}
              setValue={setInputDate}
            />
            {/* <Input
              value={inputDate}
              placeholder='Digite a data'
              onChange={({ target: { value } }) => setInputDate(value)}
            /> */}
            <Input
              value={inputExame}
              placeholder='Digite nome do exame'
              onChange={({ target: { value } }) => setInputExame(value)}
            />
            <Input
              value={inputGuia}
              placeholder='Digite o número da guia'
              onChange={({ target: { value } }) => setInputGuia(value)}
            />
            <Input
              value={observacao}
              placeholder='Digite uma observação'
              onChange={({ target: { value } }) => setObservacao(value)}
            />
            {/* {['nome', 'data', 'exame', 'guia'].map((item) => {
              return item !== 'data' ? (
              <InputBasic
                key={uuidv4()}
                idValue={item}
                value={inpuName}
                setValue={setInputName}
              />
              ) : (
                  <DatePickerValue
                    key={uuidv4()}
                  />
              )
            })} */}
            <Button
              sx={{
                backgroundColor: '#2f9fd8',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#badff3',
                  color: '#2f9fd8',
                  border: '1px solid #2f9fd8',
                  fontWeight: 'bold',
                },
                width: '50%',
                alignSelf: 'center',
              }}
              onClick={handleCreatedSolicitation}
            >
              Cadastrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
