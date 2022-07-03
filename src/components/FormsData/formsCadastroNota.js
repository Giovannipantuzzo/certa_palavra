const formsCadastroNota = [
  {
    title: 'Registro de Nota',
    items: [
      {
        type: 'checkbox',
        id: 'competencia1',
        label: 'Competencia 1',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'competencia2',
        label: 'Competencia 2',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'competencia3',
        label: 'Competencia 3',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'competencia4',
        label: 'Competencia 4',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'competencia5',
        label: 'Competencia 5',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'text',
        id: 'descricao',
        label: 'Descrição',
        field: null,
        select: false,
        checkbox: false,
        required: true,
      },
    ],
  },
];

export default formsCadastroNota;
