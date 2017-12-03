import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import AppBar from 'material-ui/AppBar';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import SelectInputAsync from './SelectInputAsync';
import {
  TextField,
  RadioButtonGroup,
  DatePicker
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import validate from './validate';
import moment from 'moment';
import momentLocaliser from 'react-widgets/lib/localizers/moment';
import Divider from 'material-ui/Divider';
import { RadioButton } from 'material-ui/RadioButton';

import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import '../styles.css';

momentLocaliser(moment);

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const renderAdditionalSkills = ({ fields, meta: { error } }) => (
  <List>
    <ListItem>
      <RaisedButton
        primary={true}
        label="Add Additional Skill"
        onClick={() => fields.push()}
      />
    </ListItem>
    {fields.map((additionalSkills, index) => (
      <ListItem key={index}>
        <Field
          name={additionalSkills}
          type="text"
          component={TextField}
          label={`Skill #${index + 1}`}
        />
        <IconButton
          iconClassName="muidocs-icon-custom-github"
          onClick={() => fields.remove(index)}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
        </IconButton>
      </ListItem>
    ))}
    {error && <ListItem className="error">{error}</ListItem>}
  </List>
);

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <AppBar title="General Information" showMenuIconButton={false} />
      <div className="card-container">
        <Card className="card-left">
          <CardTitle subtitle="Client Summary" />
          <CardText>
            <Field
              name="clientSummary"
              component={TextField}
              hintText="Please add summary of the client and why they need care..."
              fullWidth={true}
              rows={3}
              multiLine={true}
            />
          </CardText>
        </Card>

        <Card className="card-right">
          <CardTitle subtitle="Duration of Package" />
          <div className="card-container">
            <CardText>
              <label className="labels">Start Date</label>
              <Field
                name="packageStartDate"
                component={DatePicker}
                formatDate={date => moment(date).format('DD-MM-YYYY')}
                hintText="dd/mm/YYYY"
              />
            </CardText>
            <hr />
            <CardText>
              <label className="labels">End Date</label>

              <Field name="packageEndDate" component={RadioButtonGroup}>
                <RadioButton value="ongoing" label="Ongoing" />
                <RadioButton value="specific" label="Specific" />
              </Field>
              <div className="error">
                <Field name="packageEndDate" component={renderError} />
              </div>
            </CardText>
          </div>
        </Card>
      </div>

      <div className="card-container">
        <Card className="card-left">
          <CardTitle subtitle="Skills and Competencies Required" />
          <CardText>
            <Field
              name="skillsCompetency"
              component={SelectInputAsync}
              url="http://static.healthforcego.com/skills.json"
            />
            <div className="error">
              <Field name="skillsCompetency" component={renderError} />
            </div>
          </CardText>
          <CardActions>
            <FieldArray
              name="additionalSkills"
              component={renderAdditionalSkills}
            />
          </CardActions>
        </Card>
        <Card className="card-right">
          <CardTitle subtitle="Staff Gender Preferences" />
          <CardText>
            <Field
              name="staffGenderPreferencies"
              component={RadioButtonGroup}
              style={{ display: 'flex' }}
            >
              <RadioButton
                style={{ width: '150px' }}
                value="none"
                label="None"
              />
              <RadioButton
                style={{ width: '150px' }}
                value="male"
                label="Male"
              />
              <RadioButton
                style={{ width: '150px' }}
                value="female"
                label="Female"
              />
            </Field>
            <div className="error">
              <Field name="staffGenderPreferencies" component={renderError} />
            </div>
          </CardText>
        </Card>
      </div>
      <Divider inset={false} />
      <div className="button-pad">
        <RaisedButton type="submit" primary={true} label="Next" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
