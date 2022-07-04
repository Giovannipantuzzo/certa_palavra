import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import LoadingButton from '@mui/lab/LoadingButton';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { FormControl } from '@mui/material';
import { useRouter } from 'next/router';
import formsCadastroNota from '../../src/components/FormsData/formsCadastroNota';
import RegisterInputs from '../../src/components/FormsInputs/registerInputs';
import ConfirmModal from '../../src/components/ConfirmModal/ConfirmModal';
import { initialEditNoteState, initialEditNoteErrorState } from '../../src/components/InitialStates/initialStates';
import styles from '../../styles/registroNota.module.css';
import styles2 from '../../styles/Editor.module.css';
import { dataURLtoFile } from '../../src/components/ImageEditor/dataUrlToFile';
import { storage } from '../../src/components/ImageEditor/firebaseStorage';
import api from '../../src/utils/api';
import withAuthCorretor from '../../src/components/Authentication/WithAuthCorretor';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../src/components/ImageEditor/imageEditor'),
  { ssr: false },
);

function Editor() {
  const router = useRouter();
  const { redaction_id } = router.query;
  const [url, setUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/526px-Wikipedia-logo-v2.svg.png',
  );
  const canvasRef = useRef();
  const [dados, setDados] = useState(initialEditNoteState);
  const [redaction, setRedaction] = useState();
  const [initialErrorState, setError] = useState(initialEditNoteErrorState);
  const [loading, setLoading] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [open, setOpen] = useState(false);

  async function getRedaction() {
    try {
      const response = await api.get(`/redaction/${redaction_id}`);
      setRedaction(response?.data);
      setUrl(response?.data?.file_url);
    } catch (error) {
      console.error(error);
      toast('Erro ao acessar redação', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  useEffect(() => {
    if (redaction_id) getRedaction();
  }, [redaction_id]);

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
          const body = { ...redaction };
          const final_grade = dados.grade_1 + dados.grade_2 + dados.grade_3 + dados.grade_4 + dados.grade_5;
          for (const key in dados) body[key] = dados[key];
          body.file_url = downloadURL;
          body.status = true;
          body.final_grade = final_grade;

          try {
            api.put(`/redaction/${redaction_id}`, body).then(() => {
              toast.success('Editado com sucesso', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            });
            toast('Sucesso', { position: toast.POSITION.BOTTOM_RIGHT });
          } catch (error) {
            console.error(error);
            toast('Erro', { position: toast.POSITION.BOTTOM_RIGHT });
          }
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
      <div className={styles['register-note-container']}>
        <h2 className={styles['register-note-title']}>
          <div className={styles['register-note-text-margin']}> Correção </div>
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
      <div className={styles['register-note-container']}>
        {formsCadastroNota?.map((line) => (
          <Box>
            <h2 className={styles['register-note-title']}>
              <div className={styles['register-note-text-margin']}>{line.title}</div>
            </h2>
            <div className={styles['register-note-text-field']}>
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
        <div className={styles2['form-note-container']}>
          <FormControl className={styles2['form-content-note']}>
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
export default withAuthCorretor(Editor);
