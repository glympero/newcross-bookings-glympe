const validate = values => {
  const errors = {}
  if (!values.clientSummary) {
    errors.clientSummary = 'Required'
  }
  if (!values.packageStartDate) {
    errors.packageStartDate = 'Required'
  }
  if (!values.packageEndDate) {
    errors.packageEndDate = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.skillsCompetency) {
    errors.skillsCompetency = 'Required'
  }
  if (!values.staffGenderPreferencies) {
    errors.staffGenderPreferencies = 'Required'
  }
  if (!values.addressLine1) {
    errors.addressLine1 = 'Required'
  }
  if (!values.addressLine2) {
    errors.addressLine2 = 'Required'
  }
  if (!values.accessInstructions) {
    errors.accessInstructions = 'Required'
  }
  if (!values.uniformDetails) {
    errors.uniformDetails = 'Required'
  }
  return errors
}

export default validate
