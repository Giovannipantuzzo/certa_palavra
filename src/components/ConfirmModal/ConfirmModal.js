import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import styles from './ConfirmModal.module.css';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '30%',
    backgroundColor: 'white',
    border: '2px solid #609694',
    borderRadius: '8px',
    boxShadow: 'blue',
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:1424px)']: {
      width: '38%',
    },
    ['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
      width: '45%',
    },
    ['@media (max-width:850px)']: { // eslint-disable-line no-useless-computed-key
      width: '55%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },
}));

toast.configure();

export default function ConfirmModal({
  setLoading, handleFinish, open, setOpen,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={styles['exit-user-module-exclude']}>
        <button
          className={styles['close-user-module-exclude']}
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
                  backgroundColor: '#264A6F',
                  borderRadius: '5px',
                },
              },
            ]}
          />
        </button>
      </div>
      <div className={styles['container-exclude-user-module']}>
        <div className={styles['title-user-module-exclude']}>
          <h1>Confirmação</h1>
        </div>
        <div className={styles['content-user-module-exclude']}>
          <h1>Você tem certeza que deseja votar nessa alternativa?</h1>
        </div>
        <div className={styles['user-module-exclude-buttons']}>
          <button
            className={styles['confirm-user-module-exclude']}
            type="button"
            onClick={(e) => {
              handleFinish(e);
              handleClose();
              setLoading(true);
            }}
          >
            Confirmar
          </button>
          <button
            className={styles['cancel-user-module-exclude']}
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles['alternatives-note']}>
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
