export const registerErrorMessages = {
  ENTER_FULL_NAME: "Please enter your name",
  ENTER_EMAIL: "Please enter Email",
  ENTER_VALID_EMAIL: "Please enter Valid Email",
  ENTER_PHONE_NO: "Please enter Phone Number",
  ENTER_COUNTRY_CODE: "Please select country code",
  PROFILE_IMG: "Please upload a profile pic",
  ENTER_JOB_TYPE: "Please select Job Type",
  ENTER_DOB: "Please enter DOB",
  ENTER_LOCATION: "Please provide atleast one location",
};

export const getRegistrationDetailsYupSchema = (yup) => {
  return yup.object().shape({
    email: yup
      .string()
      .typeError(registerErrorMessages.ENTER_VALID_EMAIL)
      .required(registerErrorMessages.ENTER_EMAIL)
      .email(registerErrorMessages.ENTER_VALID_EMAIL),
    full_name: yup
      .string()
      .typeError(registerErrorMessages.ENTER_FULL_NAME)
      .required(registerErrorMessages.ENTER_FULL_NAME),
    job_type: yup
      .string()
      .typeError(registerErrorMessages.ENTER_JOB_TYPE)
      .required(registerErrorMessages.ENTER_JOB_TYPE),
    country_code: yup
      .string()
      .typeError(registerErrorMessages.ENTER_COUNTRY_CODE)
      .required(registerErrorMessages.ENTER_COUNTRY_CODE),
    phone_no: yup
      .string()
      .typeError(registerErrorMessages.ENTER_PHONE_NO)
      .required(registerErrorMessages.ENTER_PHONE_NO)
      .test("length", "Must be exactly 10 digits", (val) => val.length === 10),
    locations: yup
      .array()
      .compact()
      .min(1, registerErrorMessages.ENTER_LOCATION),
    dob: yup
      .string()
      .typeError(registerErrorMessages.ENTER_DOB)
      .required(registerErrorMessages.ENTER_DOB),
  });
};
