/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import api from '../../utils/api';

toast.configure();

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
  },
  content: {
    position: 'absolute',
    width: '40%',
    backgroundColor: 'white',
    maxHeight: '95%',
    borderRadius: '8px',
    boxShadow: '#81848C',
    padding: '1% 1%',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:900px)']: {
      width: '60%',
    },
    ['@media (max-width:650px)']: { // eslint-disable-line no-useless-computed-key
      width: '80%',
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      width: '100%',
    },
  },

}));

export default function AdminDashboardRow({
  id, setUse, page,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [dados, setDados] = useState();
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

  useEffect(() => {
    setDados();
  }, [page]);

  const body = (
    <div style={modalStyle} className={classes.content}>
      <div className="edit-comunic-modal-container-modal">
        <div role="button" tabIndex={0} className="edit-comunic-modal-cancel" onClick={handleClose}>
          <CancelIcon />
        </div>
        <div className="edit-comunic-modal-title">
          <p>Editar dados</p>
        </div>
        <button
          className="edit-comunic-modal-ButtonConfirm"
          onClick={(e) => {
            e.preventDefault();
            deleteImage();
            handleClose();
          }}
          type="button"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <button type="button" className="edit-comunic-modal-edit-group" onClick={handleOpen}>
        <DeleteIcon style={{ color: '#2F5C88', cursor: 'pointer' }} />
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
