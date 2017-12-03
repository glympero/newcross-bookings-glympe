import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AppBar from 'material-ui/AppBar';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton';
import '../styles.css';
import validate from './validate';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <AppBar title="Package Details" showMenuIconButton={false} />
      <Card className="card-left">
        <CardTitle subtitle="Address" />
        <CardText>
          <Field
            name="addressLine1"
            component={TextField}
            hintText="Address Line 1"
          />
          <br />
          <br />
          <Field
            name="addressLine2"
            component={TextField}
            hintText="Address Line 2"
          />
          <br />
          <br />
          <Field
            name="addressLine3"
            component={TextField}
            hintText="Address Line 3"
          />
          <br />
          <br />
        </CardText>
      </Card>
      <Card className="card-left">
        <CardTitle subtitle="Access Instructions" />
        <CardText>
          <Field
            name="accessInstructions"
            component={TextField}
            hintText="Please add access instructions"
            fullWidth={true}
            rows={3}
            multiLine={true}
          />
        </CardText>
      </Card>
      <Card className="card-left">
        <CardTitle subtitle="Uniform Details" />
        <CardText>
          <label className="labels">IS A UNIFORM REQUIRED?</label>
          <Field
            name="uniformDetails"
            component={RadioButtonGroup}
            style={{ display: 'flex' }}
          >
            <RadioButton style={{ width: '150px' }} value="yes" label="Yes" />
            <RadioButton style={{ width: '150px' }} value="no" label="No" />
          </Field>
          <div className="error">
            <Field name="uniformDetails" component={renderError} />
          </div>
        </CardText>
      </Card>
      <Divider inset={false} />
      <div className="card-container">
        <div className="button-pad">
          <RaisedButton
            type="button"
            onClick={previousPage}
            label="Previous"
            primary={true}
          />
        </div>
        <div className="button-pad">
          <RaisedButton
            type="submit"
            disabled={pristine || submitting}
            label="Create Package"
            primary={true}
          />
        </div>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage);
