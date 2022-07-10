/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
import { useDropzone } from 'react-dropzone';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../utils/firebaseStorage';
import api from '../../utils/api';
import {
  Title, Edit, MyFormGroup, Phone, Name, NumbersForms, DDD, PhoneFormControl,
  DDDFormControl, Register, Buttons, FormRegister, Submit, CancelSubmit,
  ContainerDatas, ImageContainer, Body,
} from '../../../styles/myDatasEdit';

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
    border: '1px dashed #004e7b',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    height: '50px',
    width: '100%',
    outline: 'none',
    marginBottom: '1%',
  },
}));

export default function MyDatasEdit() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [updateImage, setUpdateImage] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleRedactionChange(event) {
    setPhoto(event.target.value);
    setUpdateImage(true);
  }

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
    setPhoto({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) });
    setUpdateImage(true);
  }, [photo]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*'],
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  if (!user) {
    return (
      <ContainerDatas>
        <ContainerDatas.BoxDatas>
          <p>Dados do usuário não encontrados</p>
        </ContainerDatas.BoxDatas>
      </ContainerDatas>
    );
  }

  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [ddd, setDdd] = useState(user.phone.substring(0, 2));
  const [phone, setPhone] = useState(user.phone.substring(2));

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setOpen(false);
    if (cpf?.length !== 11) {
      alert('CPF inválido');
      return;
    }
    if (phone?.length !== 9) {
      alert('Número inválido');
      return;
    }
    if (ddd?.length !== 2) {
      alert('Número inválido');
      return;
    }
    try {
      const { file } = photo;
      if (!file) return;
      const storageRef = ref(storage, `photo/${file.name}`);
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
            const body = {
              name,
              cpf,
              phone: ddd + phone,
              perfil_photo_url: downloadURL,
            };
            const response = await api.put(`/user/${user.firebase_id}`, body);
            setUser(response.data);
            handleClose();
            setLoading(false);
          });
        },
      );
      toast('Perfil alterado com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast('Erro ao alterar perfil!', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }
  const corpo = (
    <Body>
      <Register>
        <FormRegister>
          <Title>Formulário de edição</Title>
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
                  <div key={photo.url}>
                    {photo?.file?.type?.substring(0, 5) === 'image'
                      && (
                        <div>
                          <img src={photo.url} style={{ width: '100%' }} alt="preview" />
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
                      handlePhotoChange();
                    }}
                  >
                    remover
                  </Button>

                </ImageContainer>
              )}
            </>
          </MyFormGroup>
          <Name>
            <MyFormGroup>
              <FormLabel>Nome</FormLabel>
              <FormControl
                type="text"
                placeholder="Nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MyFormGroup>
          </Name>
          <NumbersForms>
            <MyFormGroup>
              <FormLabel>CPF</FormLabel>
              <FormControl
                type="number"
                placeholder="CPF"
                pattern="[0-9]$"
                required
                title="Digite um CPF válido"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </MyFormGroup>
            <Phone>
              <DDD>
                <MyFormGroup>
                  <FormLabel>DDD</FormLabel>
                  <DDDFormControl
                    type="numbers"
                    placeholder="(00)"
                    pattern="[0-9]$"
                    required
                    value={ddd}
                    onChange={(e) => setDdd(e.target.value)}
                  />
                </MyFormGroup>
              </DDD>
              <MyFormGroup>
                <FormLabel>Telefone</FormLabel>
                <PhoneFormControl
                  type="number"
                  placeholder="00000-0000"
                  pattern="[0-9]$"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </MyFormGroup>
            </Phone>
          </NumbersForms>
          <Buttons>
            {!loading && (
              <>
                <CancelSubmit onClick={handleClose}>Cancelar</CancelSubmit>
                <Submit onClick={(e) => handleSubmit(e)}>Atualizar</Submit>
              </>
            )}
            {loading && <CircularProgressWithLabel value={progresspercent} />}
          </Buttons>
        </FormRegister>
      </Register>
    </Body>
  );
  return (
    <Edit>
      <Button
        onClick={handleOpen}
        style={{
          backgroundColor: '#91ca6c',
          color: 'black',
          width: '100%',
        }}
      >
        Editar

      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {corpo}
      </Modal>
    </Edit>
  );
}
