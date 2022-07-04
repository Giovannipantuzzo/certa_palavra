/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  FormRegister, Subtitle, ContainerModal,
  ExitModal, CloseModal, ButtonSubmit, ButtonAlignP, ButtonSubmitContainer,
} from '../../../styles/adminDashboardRowStyles';

toast.configure();

export default function AdminDashboardRow({
  id, setUse,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  async function deleteImage() {
    try {
      await api.delete(`/user/${id}`);
      setUse(true);
      toast('Corretor deletado com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      toast('Erro ao deletar a corretor.', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <ContainerModal>
      <ExitModal>
        <CloseModal
          type="button"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon
            size={30}
            sx={[
              {
                color: '#264A6F',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#91ca6c',
                  borderRadius: '5px',
                },
              },
            ]}
          />
        </CloseModal>
      </ExitModal>
      <FormRegister>
        <Subtitle>Tem certeza que deseja excluir o corretor ?</Subtitle>
        <ButtonSubmitContainer>
          <ButtonSubmit
            type="button"
            onClick={(e) => {
              e.preventDefault();
              deleteImage();
              handleClose();
            }}
          >
            <ButtonAlignP>Excluir</ButtonAlignP>
          </ButtonSubmit>
        </ButtonSubmitContainer>
      </FormRegister>
    </ContainerModal>
  );
  return (
    <div>
      <button type="button" className="edit-comunic-modal-edit-group" onClick={handleOpen}>
        <DeleteIcon style={{ color: '#91ca6c', cursor: 'pointer' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
