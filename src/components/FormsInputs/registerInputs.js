/* eslint-disable no-nested-ternary */
import React from "react";
import { MenuItem, Checkbox, TextField } from '@mui/material';
import SingleFileUpload from "../../components/SingleFileUpload/SingleFileUpload";
import "./registerInputs.module.css";

function RegisterInputs({
  setDados,
  type,
  fileType,
  label,
  id,
  field,
  select,
  required,
  initialErrorState,
  mask,
  dados,
  news,
}) {
  console.log("🚀 ~ file: registerInputs.js ~ line 21 ~ dados", dados)
  const handleChange = (value, entrada) => {
    setDados(value, entrada);
  };

  const handleChecked = (value, entrada) => {
    const auxCheckbox = [false, false, false, false, false];
    auxCheckbox[value] = true;
    setDados(auxCheckbox, entrada);
  }

  return (
    <div>
      {type === "checkbox" && (
        <>
          {dados?.checkbox?.map((box, index) => (
            <Checkbox
              color="primary"
              checked={dados?.checkbox[index]}
              onClick={() => handleChecked(index, 'checkbox')}
          />
          ))}
        </>
      )}
      {type === "date" && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          InputLabelProps={{ shrink: true }}
          type={type}
          variant="standard"
          sx={{ m: 1, width: "70%" }}
          helperText={
            initialErrorState[`${id}`]
              ? `Valor de ${label} inválido`
              : required
              ? "Campo obrigatório"
              : ""
          }
        />
      )}
      {mask && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(mask(e.target.value), id)}
          label={label}
          type={type}
          select={select}
          variant="standard"
          sx={{ m: 1, width: "70%" }}
          helperText={
            initialErrorState[`${id}`]
              ? `Valor de ${label} inválido`
              : required
              ? "Campo obrigatório"
              : ""
          }
        />
      )}
      {select && (
        <TextField
          required={required}
          id={id}
          error={initialErrorState[`${id}`]}
          value={dados[`${id}`]}
          onChange={(e) => handleChange(e.target.value, id)}
          label={label}
          type={type}
          select={select}
          variant="standard"
          helperText={`Selecione uma opção de ${label}`}
          sx={{ m: 1, width: "70%" }}
        >
          {field.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={{ height: "36px" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!mask &&
        !(type === "date") &&
        !(type === "file") &&
        !(type === "empty") &&
        !(type === "checkbox") &&
        !select && (
          <>
            <TextField
              required={required}
              id={id}
              error={initialErrorState[`${id}`]}
              value={dados[`${id}`]}
              onChange={(e) => handleChange(e.target.value, id)}
              label={label}
              type={type}
              variant="standard"
              multiline
              sx={{ m: 1, width: "70%" }}
              helperText={
                initialErrorState[`${id}`]
                  ? `Valor de ${label} inválido`
                  : required
                  ? "Campo obrigatório"
                  : ""
              }
            />
            <div />
          </>
        )}
      {type === "empty" && <div />}
      {type === "file" && (
        <SingleFileUpload
          field={id}
          fileType={fileType}
          dados={dados}
          file={dados[`${id}`]}
          setDados={setDados}
          label={label}
        />
      )}
    </div>
  );
}
export default RegisterInputs;
