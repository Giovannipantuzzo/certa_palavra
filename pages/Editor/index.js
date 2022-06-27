import React, { useState, useRef } from "react";
import formsCadastroNota from "../../src/components/FormsData/formsCadastroNota"
import RegisterInputs from "../../src/components/FormsInputs/registerInputs"
import {initialEditNoteState, initialEditNoteErrorState} from "../../src/components/InitialStates/initialStates"
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from '../../styles/registroNota.module.css';

import dynamic from "next/dynamic";


const DynamicComponentWithNoSSR = dynamic(
  () => import("../../src/components/ImageEditor/imageEditor"),
  { ssr: false }
);

export default function Editor() {
  const [url, setUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/526px-Wikipedia-logo-v2.svg.png"
  );
  const [dados, setDados] = useState(initialEditNoteState);
  const [initialErrorState, setError] = useState(initialEditNoteErrorState);
  const [loading, setLoading] = useState(false);
  console.log(dados)

  function handleChange(value, field) {
    setError({ ...initialErrorState, [field]: false });
    setDados({ ...dados, [field]: value });
  }

  return (
    <div>
      <div className={styles['register-associate-container']}>
      <h2 className={styles["register-associate-title"]}>
              <div className={styles["register-associate-text-margin"]}> Correção </div>
            </h2>
            </div>
      <div
        style={{
          width: "100vw",
          height: "125vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "5%",
        }}
      >
        {url && <DynamicComponentWithNoSSR url={url} />}
      </div>
      <div className={styles['register-associate-container']}>
        {formsCadastroNota?.map((line) => (
          <Box>
            <h2 className={styles["register-associate-title"]}>
              <div className={styles["register-associate-text-margin"]}>{line.title}</div>
            </h2>
            <div className={styles["register-associate-text-field"]}>
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
          style={{ backgroundColor: "#1C3854", marginBottom: "5%" }}
          onClick={(e) => handleSubmit(e)}
        >
          Cadastrar
        </LoadingButton>
      </div>
    </div>
  );
}
