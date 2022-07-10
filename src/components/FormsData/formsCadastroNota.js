const formsCadastroNota = [
  {
    title: 'Registro de Nota',
    items: [
      {
        type: 'checkbox',
        id: 'grade_1',
        label: 'Competencia 1',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'grade_2',
        label: 'Competencia 2',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'grade_3',
        label: 'Competencia 3',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'grade_4',
        label: 'Competencia 4',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'checkbox',
        id: 'grade_5',
        label: 'Competencia 5',
        checkboxes: [{selected: true, value: 0},{selected: false, value: 40},{selected: false, value: 80},{selected: false, value: 120},{selected: false, value: 160},{selected: false, value: 200},],
        field: null,
        select: false,
        required: true,
      },
      {
        type: 'text',
        id: 'description',
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
