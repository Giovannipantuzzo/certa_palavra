import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import LoadingButton from '@mui/lab/LoadingButton';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { FormControl } from '@mui/material';
import formsCadastroNota from '../../src/components/FormsData/formsCadastroNota';
import RegisterInputs from '../../src/components/FormsInputs/registerInputs';
import ConfirmModal from '../../src/components/ConfirmModal/ConfirmModal';
import { initialEditNoteState, initialEditNoteErrorState } from '../../src/components/InitialStates/initialStates';
import styles from '../../styles/registroNota.module.css';
import styles2 from './Editor.module.css';
import { dataURLtoFile } from '../../src/components/ImageEditor/dataUrlToFile';
import { storage } from '../../src/components/ImageEditor/firebaseStorage';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../src/components/ImageEditor/imageEditor'),
  { ssr: false },
);

export default function Editor() {
  const [url, setUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/526px-Wikipedia-logo-v2.svg.png',
  );
  const canvasRef = useRef();
  const [dados, setDados] = useState(initialEditNoteState);
  const [initialErrorState, setError] = useState(initialEditNoteErrorState);
  const [loading, setLoading] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(dados);

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  const handleFinish = (e) => {
    e.preventDefault();
    setLoading(true);
    const imageEditor = canvasRef.current.getInstance();

    const file = dataURLtoFile(
      imageEditor.toDataURL(),
      `teste.${imageEditor.toDataURL().match(/[^:/]\w+(?=;|,)/)[0]}`,
    );
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgresspercent(progress);
      },
      (error) => {
        setLoading(false);
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          console.log(dados);
          toast.success('Editado com sucesso', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setLoading(false);
        });
      },
    );
    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className={styles['register-associate-container']}>
        <h2 className={styles['register-associate-title']}>
          <div className={styles['register-associate-text-margin']}> Correção </div>
        </h2>
      </div>
      <div
        style={{
          width: '100vw',
          height: '125vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%',
        }}
      >
        {url && <DynamicComponentWithNoSSR url={url} canvasRef={canvasRef} progresspercent={progresspercent} setProgresspercent={setProgresspercent} />}
      </div>
      <div className={styles['register-associate-container']}>
        {formsCadastroNota?.map((line) => (
          <Box>
            <h2 className={styles['register-associate-title']}>
              <div className={styles['register-associate-text-margin']}>{line.title}</div>
            </h2>
            <div className={styles['register-associate-text-field']}>
              {line?.items?.map((item) => (
                <RegisterInputs
                  type={item.type}
                  id={item.id}
                  label={item.label}
                  field={item.field}
                  checkboxes={item.checkboxes}
                  select={item.select}
                  required={item.required}
                  setDados={(value, entrada) => handleChange(value, entrada)}
                  mask={item.mask}
                  initialErrorState={initialErrorState}
                  dados={dados}
                />
              ))}
            </div>
          </Box>
        ))}
        <LoadingButton
          variant="contained"
          loading={loading}
          style={{ backgroundColor: '#1C3854', marginBottom: '5%' }}
          onClick={(e) => handleOpen(e)}
        >
          Cadastrar
        </LoadingButton>
        <div className={styles2['form-vote-quizz-container']}>
          <FormControl className={styles2['form-content-vote-quizzes']}>
            <ConfirmModal
              setLoading={setLoading}
              handleFinish={handleFinish}
              handleOpen={handleOpen}
              open={open}
              setOpen={setOpen}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
