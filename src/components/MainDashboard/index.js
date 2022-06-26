import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';

export default function MainDashboard({ , }) {
  const { user } = useAuth();

  return (
    <div className="container-cards-quizzes">
      <div className="division-cards-quizzes">
        <div className="title-cards-quizzes-page">
          <h1>Resultado das Enquetes</h1>
          {user?.type === 'administrador' && (
            <ModalEnquete setNewQuizz={setNewQuizz} />
          )}
        </div>
        <div className="line-table-cards-quizzes" />
        {loading ? (
          <div className="loader-cards-quizzes">
            <CircularProgress size={35} color="inherit" />
          </div>
        ) : (
          <>
            <div className="body-quizzes-card">
              <div className="card-quizzes">
                <button type="button" className="title-card-quizzes" onClick={handleOpen}>
                  <p>
                    {' '}
                    {quizz.title}
                  </p>
                  <KeyboardArrowDownIcon style={{ color: '#2F5C88' }} {...cellFontProps} />
                </button>
              </div>
              {(open === true && (
                <div className="description-card-quizzes">
                  <p>Redação aqui</p>
                </div>
              )}
            </>
        )}
          </div>
    </div>
      );
}
