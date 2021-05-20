import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { Formik } from 'formik';
import  {createPortfolio} from '../../utils/api';

const Basic = ({formRef, handleClose}) => (
   <div>
     <Formik
     innerRef={formRef}
       initialValues={{ name: '', notes: '' }}
       validate={values => {
         const errors = {};
         if (!values.name) {
           errors.name = 'Required';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
          createPortfolio(values)
          handleClose()
        }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting
       }) => (
         <form onSubmit={handleSubmit}>
         <div className="d-flex flex-column">
         Name:
           <input
             class="form-control"
             type="text"
             placeholder="name..."
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />
           {errors.name && touched.name && errors.name ?
             <small className="text-danger">{errors.name}</small>
             :null
           }
           <div className="mt-3">
           Notes:
           <textarea
           placeholder="Optional..."
           className="form-control"
             type="text"
             rows={3}
             name="notes"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.notes}
           />
           </div>
           </div>
         </form>
       )}
     </Formik>
   </div>
 );



const NewPortfolioModal = ({ handleClose, handleShow, show }) => {

  const [submit, setSubmit] = useState(false)
  const formRef = useRef()

  return (
    <Modal show={show} onBlur={()=>{console.log("HII")}} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Portoflio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Basic
        formRef={formRef}
        handleClose={handleClose}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={()=>{
          if (formRef.current) {
            formRef.current.submitForm()
          }
        }} variant="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPortfolioModal;
