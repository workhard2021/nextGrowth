export const arrayVerify = ['firstName', 'userName', 'registrationNumber', 'lastName', 'createdDate', 'status'];
export const init = () => {
   return { users, valide: '', rejected: '', on_validation: '', toggle: false, formData: initForm, formError: {}, message: {} };
}
const initForm = { firstName: '', userName: '', registrationNumber: '', lastName: '', createdDate: '', status: '' };

let users = [
   {
      id: "123456789",
      createdDate: "2021-01-06",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
   },
   {
      id: "987654321",
      createdDate: "2021-07-25",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
   },
   {
      id: "852963741",
      createdDate: "2021-09-15",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
   }
]

export const reducer = (state=init(),action) => {
    const {type,value}=action;
   switch (type){
      case 'TOGGLE':
         return {...state,toggle:value,message:{}};
      case 'ADD':
         return { ...state,users:[value.user,...state.users],message:{...value.message},formData:initForm};
      case 'DELETE':
         const UsersArray=state.users.filter(val => Number(val.id) !== Number(value.id));
         return { ...state,users: UsersArray,valide:value.valide}
      case 'SAISIR':
      return {...state,...value};
      case 'FORM_ERROR':
         return { ...state,...value};
      case 'MESSAGE':
         return{...state,...value};
      default:
         return state;
   }
}

export const verifyForm = (arrayVerify, obj) => {
   let formError = {};
   if (arrayVerify.length > 0) {
      for (const key in obj) {
         for (const val of arrayVerify) {
            if (key === val) {
                  if(!obj[key]) {
                     formError = { ...formError, [key]: "*" };
                  }
            }
         }
      }
   }
   const test = Object.values(formError).length > 0 ? true : false;
   return {formError, test };
}

