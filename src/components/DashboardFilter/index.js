/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import 'date-fns';
import {
  FormLabel, FormGroup,
} from 'react-bootstrap';
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  SearchContainerModal, SearchText,
  SearchAdvancedTitle, SearchAdvancedContent,
  SearchAdvancedButtonsAlign, SearchAdvancedButtonSubmit, SearchAdvancedButtonAlignP,
} from '../../../styles/dashboardFilterStyles';

toast.configure();

function DashboardFilter({
  handleClose, getAllAccounts,
}) {
  const [firstDate, setFirstDate] = useState(moment().toDate());
  console.log("🚀 ~ file: index.js ~ line 26 ~ firstDate", firstDate)
  const [secondDate, setSecondDate] = useState(moment().toDate());

  const handleDataFilter = () => {
    // requisição com as redações

    getAllAccounts(true, firstDate, secondDate);
    handleClose();
    toast('Filtro aplicado com sucesso!', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  return (
    <SearchContainerModal>
      <SearchText>
        <SearchAdvancedTitle><p>Pesquisa Avançada</p></SearchAdvancedTitle>
      </SearchText>
      <SearchAdvancedContent>
        <FormGroup>
          <FormLabel>Data de início</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              value={firstDate}
              onChange={(newDate) => { setFirstDate(newDate); }}
              inputFormat="dd/MM/yyyy"
              style={{
                color: 'red',
              }}
              renderInput={(props) => (
                <TextField
                  {...props}
                  helperText={props.error ? 'Por favor, selecione uma data válida' : 'Selecione uma data'}
                  style={{
                    width: '100%',
                    paddingTop: '4px',
                    borderRadius: '5px',
                    border: '1px solid ${({ theme }) => theme.colors.baseGray}',
                    marginBottom: '15px',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </FormGroup>
        <FormGroup>
          <FormLabel>Data de Fim</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              value={secondDate}
              onChange={(newDate) => { setSecondDate(newDate); }}
              inputFormat="dd/MM/yyyy"
              style={{
                color: 'red',
              }}
              renderInput={(props) => (
                <TextField
                  {...props}
                  helperText={props.error ? 'Por favor, selecione uma data válida' : 'Selecione uma data'}
                  style={{
                    width: '100%',
                    paddingTop: '4px',
                    borderRadius: '5px',
                    border: '1px solid ${({ theme }) => theme.colors.baseGray}',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </FormGroup>
        <SearchAdvancedButtonsAlign>
          <SearchAdvancedButtonSubmit type="button" onClick={handleClose}>
            <SearchAdvancedButtonsAlign>
              <SearchAdvancedButtonAlignP>Voltar</SearchAdvancedButtonAlignP>
            </SearchAdvancedButtonsAlign>
          </SearchAdvancedButtonSubmit>
          <SearchAdvancedButtonSubmit
            type="button"
            onClick={() => {
              handleDataFilter(firstDate, secondDate);
            }}
          >
            <SearchAdvancedButtonAlignP>Aplicar</SearchAdvancedButtonAlignP>
          </SearchAdvancedButtonSubmit>
        </SearchAdvancedButtonsAlign>
      </SearchAdvancedContent>
    </SearchContainerModal>
  );
}

export default DashboardFilter;
