/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import FileSaver from 'file-saver';

toast.configure();

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: '50px',
    width: '100%',
    outline: 'none',
    marginBottom: '1%',
  },
}));
function SingleFileUpload({
  fileType, dados, file, setDados, label, update, archiveId, field,
}) {
  const classes = useStyles();
  const [image, setImage] = useState();

  async function getImage() {
    try {
      const response = [];
      setImage(response);
    } catch (error) {
      toast.error('Não foi possível obter imagem', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  function getDownloads() {
    try {
      // managerService.download(archiveId).then((response) => {
      //   FileSaver.saveAs(response, field);
      // });
    } catch (error) {
      toast.error('Não foi possível baixar o arquivo', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  }

  if (update === true) {
    useEffect(() => {
      if (field === 'photos' && file !== '' && file !== undefined) {
        getImage();
      }
    }, [file, archiveId]);
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
    setDados({ file: accFiles[0], url: URL.createObjectURL(accFiles[0]) }, field);
  }, [dados]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [`${fileType}`],
    maxSize: 300 * 1024, // 300KB
  });

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} direction="column" justifyContent="center" alignItems="center" style={{ marginBottom: '1%' }}>
      <Grid item style={{ width: '65%' }}>
        <div>
          <div {...getRootProps({ className: classes.dropzone })}>
            <input {...getInputProps()} />
            {update === true && label === 'Imagem' && file !== '' ? (
              <img src={`data:image;base64,${image}`} style={{ width: '125px' }} alt="" />
            ) : (
              <p>
                Arraste e solte a/o
                {' '}
                {`${label}`}
                {' '}
                aqui
              </p>
            )}
          </div>
          {update === true && archiveId !== undefined && dados.pdf === undefined && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            }}
            >
              {(file === undefined || file === archiveId) && archiveId && (
                <>
                  <Button
                    style={{
                      alignItems: 'center', justifyContent: 'center', marginTop: '2%', width: '100%',
                    }}
                    variant="primary"
                    onClick={() => getDownloads()}
                  >
                    Baixar arquivo atual
                    {' '}
                    <PictureAsPdfIcon style={{ marginLeft: '1%' }} />
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                    }}
                    onClick={() => {
                      setDados('', field);
                    }}
                  >
                    Remover Arquivo
                  </Button>
                </>
              )}
              {file === '' && (
                <>
                  <h3 style={{ fontFamily: 'Roboto', fontWeight: '100', marginTop: '2%' }}>Confirme para remover o arquivo</h3>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%',
                    }}
                    onClick={() => {
                      setDados(archiveId, field);
                    }}
                  >
                    cancelar
                  </Button>
                </>
              )}
              <div />
            </div>
          )}
          {typeof file === 'object' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', marginTop: '3%', marginBottom: '1%',
                }}
              >
                {file?.file?.path}
                {' '}
                <PictureAsPdfIcon />
              </div>
              <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, field)}>
                Remover Arquivo
              </Button>
            </div>
          )}
          {dados.pdf && (
            <div div className="file-upload-download-file">
              <div className="register-news-align-test">
                {file?.file?.path}
                {' '}
                <PictureAsPdfIcon />
              </div>
              <Button variant="contained" style={{ backgroundColor: '#1C3854', marginBottom: '1%', marginTop: '2%' }} onClick={() => setDados(undefined, 'pdf')}>
                Remover Arquivo
              </Button>
            </div>
          )}

        </div>
      </Grid>
    </Grid>
  );
}

export default SingleFileUpload;
