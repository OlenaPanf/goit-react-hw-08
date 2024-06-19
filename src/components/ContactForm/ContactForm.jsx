import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import css from './ContactForm.module.css'
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';


const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^[0-9\-]+$/, 'The phone number must contain only numbers')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function ContactForm() {
  const dispatch = useDispatch(); 
  
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (<Formik initialValues={{
        name: "",
        number: "",
      }} validationSchema={UserSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
      <div className={css.input}>
        <label htmlFor="name">Name</label>
        <Field
          className={css.field}
          id="name"          
          type="text"
          name="name"
        />
        <ErrorMessage
            className={css.error}
            name="name"
            component="span"
          />
      </div>

      <div className={css.input}>
        <label htmlFor="number">Number</label>
        <Field
          className={css.field}
          id="number" 
          type="tel"
          name="number"
        />
        <ErrorMessage
            className={css.error}
            name="number"
            component="span"
          />
      </div>
      <div className={css.center}>
        <button className={css.button} type="submit">Add contact</button>
      </div>
      
    </Form>
    </Formik>
    
  );
}

