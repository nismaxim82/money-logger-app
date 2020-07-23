import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import FormikField from '../FormikField/FormikField';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const TestForm = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {(values) => (
          <Form>
            {console.log('hererer')}
            <FormikField name="firstName" label="firstName" values={values} />
            <FormikField name="lastName" label="lastName" values={values} />
            {/* <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" /> */}

            {/* <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" /> */}

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="john@acme.com"
              type="email"
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default TestForm;
