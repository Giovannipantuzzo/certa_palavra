import React, { useState, useCallback } from 'react';
import Modal from '@material-ui/core/Modal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  SendRedactionButton, SendRedactionButtonP, MyFormGroup,
  ItemFormulary, TextBox2, FormRegister, Subtitle, ContainerModal,
  ExitModal, CloseModal, ButtonSubmit, ButtonAlignP, ButtonSubmitContainer,
} from '../../../styles/modalRedacaoStyle';
import {
  FormLabel,
} from 'react-bootstrap';
import { makeStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';

toast.configure();

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed #004e7b`,
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8F8F8',
    height: '50px',
    width: '100%',
    outline: 'none',
    marginBottom: '1%',
  },
}));

export default function ModalEnquete({ setNewQuizz }) {
  const [open, setOpen] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [title, setTitle] = useState(null);
  const [redaction, setRedaction] = useState(null);
  const classes = useStyles();

  async function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  async function handleRedactionChange(event) {
    setRedaction(event.target.value);
    setUpdateImage(true);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleData = () => {
    handleClose();
    toast('Redação enviada com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  const onDrop = useCallback((accFiles, rejFiles) => {
    if (rejFiles.length > 0) {
      toast.warn('Arquivo Inválido', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    if (accFiles.length > 1) {
      toast.warn('Apenas um arquivo por vez', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    setRedaction({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) }, field);
    setUpdateImage(true);
  }, [redaction]);


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*'],
    maxSize: 2 * 1024 * 1024, // 2MB
  });


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
        <Subtitle>Formulário de envio</Subtitle>
        <MyFormGroup>
          <FormLabel style={{ marginBottom: '8px' }}>Tema da redação</FormLabel>
          <ItemFormulary>
            <TextBox2
              type="text"
              placeholder="Tema da redação"
              required
              value={title}
              onChange={handleTitleChange}
            />
          </ItemFormulary>
        </MyFormGroup>
        <MyFormGroup>
          <FormLabel style={{ marginBottom: '8px' }}>Arquivo</FormLabel>
          <>
            <div {...getRootProps({ className: classes.dropzone })}>
              <input {...getInputProps()} />
              <p style={{ marginTop: '10px' }}>
                Arraste e solte a imagem aqui
              </p>
            </div>
            {updateImage && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                }}
                onClick={() => {
                  setUpdateImage(false);
                }}
                onChange={() => {
                  handleRedactionChange();
                }}
              >
                remover
              </Button>
            )}
          </>
        </MyFormGroup>
        <ButtonSubmitContainer>
          <ButtonSubmit
            type="button"
            onClick={() => {
              handleData();
            }}
          >
            <ButtonAlignP>Enviar</ButtonAlignP>
          </ButtonSubmit>
        </ButtonSubmitContainer>
      </ FormRegister>
    </ContainerModal>
  );

  return (
    <div>
      <SendRedactionButton
        type="button"
        onClick={handleOpen}
      >
        <SendRedactionButtonP>
          Enviar
        </SendRedactionButtonP>
        <AddCircleOutlineIcon />
      </SendRedactionButton>
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
