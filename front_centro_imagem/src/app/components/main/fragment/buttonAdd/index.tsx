import React from 'react'
import Image from 'next/image';

import { Button } from '@mui/material';
import IconAdd from '../../../../../../public/icons8-add-30.png'

interface IButtonAddProps {
  setOpen: Function;
}

function ButtonAdd({ setOpen }: IButtonAddProps) {
  return (
    <Button
      sx={{
        cursor: 'pointer',
        borderRadius: '50%',
      }}
      onClick={() => setOpen(true)}
    >
      <Image
        src={IconAdd}
        alt="Icon Add"
        width={25}
        height={25}
      />
    </Button>
  )
}

export default ButtonAdd