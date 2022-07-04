import React, { useState, useCallback } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Modal from '@material-ui/core/Modal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  FormLabel,
} from 'react-bootstrap';
import { makeStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { storage } from '../../utils/firebaseStorage';
import {
  SendRedactionButton, SendRedactionButtonP, MyFormGroup,
  ItemFormulary, TextBox2, FormRegister, Subtitle, ContainerModal,
  ExitModal, CloseModal, ButtonSubmit, ButtonAlignP, ButtonSubmitContainer, ImageContainer,
} from '../../../styles/modalRedacaoStyle';
import api from '../../utils/api';

function CircularProgressWithLabel(
  props,
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props?.value)}%`}

        </Typography>
      </Box>
    </Box>
  );
}

toast.configure();

const useStyles = makeStyles(() => ({
  dropzone: {
    border: '2px dashed #004e7b',
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

export default function ModalEnquete() {
  const [open, setOpen] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [title, setTitle] = useState(null);
  const [redaction, setRedaction] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log('🚀 ~ file: index.js ~ line 40 ~ ModalEnquete ~ redaction', redaction);
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

  const handleData = (e) => {
    e.preventDefault();
    if (!redaction) {
      toast('Insira uma redação', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (!title) {
      toast('Digite um titulo para a redação', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    const { file } = redaction;
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        toast('Erro no upload do arquivo', { position: toast.POSITION.BOTTOM_RIGHT });
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const body = {
              title,
              file_url: downloadURL,
            };
            await api.post('/redaction', body);
            setLoading(false);
            handleClose();
            toast('Redação enviada com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
          } catch (error) {
            console.error(error);
            toast('Erro', { position: toast.POSITION.BOTTOM_RIGHT });
          }
        });
      },
    );
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
    setRedaction({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) });
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
              onChange={(e) => handleTitleChange(e)}
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
              <ImageContainer>
                <div key={redaction.url}>
                  {redaction?.file?.type?.substring(0, 5) === 'image'
                    && (
                      <div>
                        <img src={redaction.url} style={{ width: '100%' }} alt="preview" />
                      </div>
                    )}
                </div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#004e7b', marginBottom: '1%', marginTop: '2%',
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

              </ImageContainer>
            )}
          </>
        </MyFormGroup>
        <ButtonSubmitContainer>
          {!loading && (
          <ButtonSubmit
            type="button"
            onClick={(e) => {
              setLoading(true);
              handleData(e);
            }}
          >
            <ButtonAlignP>Enviar</ButtonAlignP>
          </ButtonSubmit>
          )}
          {loading && <CircularProgressWithLabel value={progresspercent} />}
        </ButtonSubmitContainer>
      </FormRegister>
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
