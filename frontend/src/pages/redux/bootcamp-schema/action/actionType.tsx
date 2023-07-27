const ActionTypes = {
  //FINDALL BATCHES
  REQ_GET_BATCHES: 'REQ_GET_BATCHES',
  RES_GET_BATCHES: 'RES_GET_BATCHES',

  //FINDONE BATCHES
  REQ_GET_BATCH: 'REQ_GET_BATCH',
  RES_GET_BATCH: 'RES_GET_BATCH',

  //CREATE BATCHES
  REQ_CREATE_BATCH: 'REQ_CREATE_BATCH',
  RES_CREATE_BATCH: 'RES_CREATE_BATCH',

  //FINDALL TRAINERS
  REQ_GET_TRAINERS: 'REQ_GET_TRAINERS',
  RES_GET_TRAINERS: 'RES_GET_TRAINERS',

  //FINDALL TALENTS
  REQ_GET_TALENTS: 'REQ_GET_TALENTS',
  RES_GET_TALENTS: 'RES_GET_TALENTS',

  //UPDATE CHANGESTATUSBATCH
  REQ_UPDATE_CHANGE_STATUS_BATCH: 'REQ_UPDATE_CHANGE_STATUS_BATCH',
  RES_UPDATE_CHANGE_STATUS_BATCH: 'RES_UPDATE_CHANGE_STATUS_BATCH',

  //CREATE EVALUATION
  REQ_CREATE_EVALUATION: 'REQ_CREATE_EVALUATION',
  RES_CREATE_EVALUATION: 'RES_CREATE_EVALUATION',

  //EDIT BATCHES
  REQ_EDIT_BATCH: 'REQ_EDIT_BATCH',
  RES_EDIT_BATCH: 'RES_EDIT_BATCH',

  //DELETE BATCH
  REQ_DELETE_BATCH: 'REQ_DELETE_BATCH',
  RES_DELETE_BATCH: 'RES_DELETE_BATCH',

  //FINDALL PROGRAMS
  REQ_GET_PROGRAMS: 'REQ_GET_PROGRAMS',
  RES_GET_PROGRAMS: 'RES_GET_PROGRAMS',

  //FINDALL STUDENTS RECOMMENDATION PER PROGRAM
  REQ_GET_RECSTUDENTS: 'REQ_GET_RECSTUDENTS',
  RES_GET_RECSTUDENTS: 'RES_GET_RECSTUDENTS',

  //FINDALL USER PRAP AND USER PAROG
  REQ_GET_PRAP_PAROG: 'REQ_GET_PRAP_PAROG',
  RES_GET_PRAP_PAROG: 'RES_GET_PRAP_PAROG',

  //FIND ROUTE ACTIONS
  REQ_GET_ROUTES: 'REQ_GET_ROUTES',
  RES_GET_ROUTES: 'RES_GET_ROUTES',

  //FIND TRAINEES BY BATCH
  REQ_GET_TRAINEES_BATCH: 'REQ_GET_TRAINEES_BATCH',
  RES_GET_TRAINEES_BATCH: 'RES_GET_TRAINEES_BATCH',

  //FIND ALL CANDIDATES OR CALON STUDENTS YANG APPLY
  REQ_GET_CANDIDATES: 'REQ_GET_CANDIDATES',
  RES_GET_CANDIDATES: 'RES_GET_CANDIDATES',

  //UPDATE PAROG
  REQ_UPDATE_PAROG: 'REQ_UPDATE_PAROG',
  RES_UPDATE_PAROG: 'RES_UPDATE_PAROG',

  //UPDATE PRAP
  REQ_UPDATE_PRAP: 'REQ_UPDATE_PRAP',
  RES_UPDATE_PRAP: 'RES_UPDATE_PRAP',

  //UPDATE STATUS TRAINEE
  REQ_UPDATE_TRAINEE_STATUS: 'REQ_UPDATE_TRAINEE_STATUS',
  RES_UPDATE_TRAINEE_STATUS: 'RES_UPDATE_TRAINEE_STATUS',
};

export default ActionTypes;