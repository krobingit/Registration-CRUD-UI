import { InputLabel, TextField } from "@mui/material";
import styled from "styled-components";
import { useRef, useState } from "react";
import { medium, small, large } from "../responsive";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import { countries } from "../country_codes";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import { getRegistrationDetailsYupSchema } from "../Helper/register-constants";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { app } from "../Firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Typography from "@mui/material/Typography";
import { useRegisterUser } from "../hooks/register-hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: whitesmoke;
  margin: 1rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  box-shadow: -4px -4px 35px 2px rgba(0, 0, 0, 0.75);
  border: 1px solid black;
  ${large({ margin: "1rem" })}
`;

const InputField = styled(TextField)`
  border-radius: 0.8rem;
  width: 65%;
`;

const RegisterTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.h3`
  font-size: 1.6rem;
`;
const HStack = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4rem;
  align-items: center;
  ${medium({ flexDirection: "column", rowGap: "1rem" })}
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  width: 450px;
  ${medium({ width: "80%" })}
  ${large({ width: "100%" })}
`;
const MobileFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  width: 450px;
  ${small({ width: "80%", flexDirection: "column" })}
  ${large({ width: "100%" })}
`;

const CheckBoxFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
`;
/* const ProfileFieldContainer = styled.div`
  display: flex;
  flex-direction:row;
  column-gap: 2rem;
  align-items: center;
${large({ columnGap: '3rem'})}
${small({flexDirection:"column"})}
`; */

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
`;
const LabelText = styled.h4`
  ${small({ fontSize: "1rem" })}
`;

const ProfilePic = styled.div`
  border: 1px solid darkgray;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
`;

const DatePicker = styled(ReactDatePicker)`
  width: 80%;
  height: 35px;
`;
const Input = styled.input`
  display: none;
`;
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;
const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.8rem;
`;
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Register() {
  const history = useHistory();
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(10);
  const profilePicRef = useRef();
  const locationOptions = ["Chennai", "Banglore", "Pune"];
  const jobType = ["Full Time", "Part Time", "Consultant"];
  const ToastSuccess = () => {
    return toast.success("User Registration Successful", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  };

  //Upload Profile picture
  function handleSubmitWithPic(values) {
    setUpload(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUpload(false);
          const user = { ...values, profile_img: downloadURL };
          console.log(user);
          mutate(
            { ...user },
            {
              onSuccess: () => {
                ToastSuccess();
                setTimeout(() => {
                  history.push("/");
                }, 2500);
              },
            }
          );
        });
      }
    );
  }
  const handleSubmit=(values)=>{
  mutate(
            { ...values },
            {
              onSuccess: () => {
                ToastSuccess();
                setTimeout(() => {
                  history.push("/");
                }, 2500);
              },
            }
          );

  }

  const { mutate } = useRegisterUser();
  return (
    <FormContainer>
      <div style={{ width: "200px" }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => history.push("/")}
        >
          Go to Users List
        </Button>
      </div>
      <RegisterTitle>
        <Title>
          <AppRegistrationIcon fontSize="30px" />
          Registration
        </Title>
      </RegisterTitle>
      <Formik
        initialValues={{
          full_name: "",
          profile_img: null || file,
          country_code: "",
          phone_no: "",
          email: "",
          job_type: "",
          dob: "",
          locations: [],
        }}
        validationSchema={getRegistrationDetailsYupSchema(yup)}
        onSubmit={(values) => {
          if(file)
          handleSubmitWithPic(values)
          else
            handleSubmit(values)
        }
        }
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form>
            <VStack style={{ width: "100%" }}>
              <HStack>
                <FieldContainer>
                  <LabelText>Full Name</LabelText>
                  <InputField
                    placeholder="Enter your full name"
                    name="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    error={errors.full_name && touched.full_name}
                    helperText={
                      errors.full_name && touched.full_name && errors.full_name
                    }
                  ></InputField>
                </FieldContainer>
                <FieldContainer>
                  <LabelText>Profile Picture</LabelText>
                  <ProfilePic>
                    <AddAPhotoIcon
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "60px",
                        cursor: "pointer",
                      }}
                      onClick={() => profilePicRef.current.click()}
                    />
                    {values.profile_img && (
                      <Image
                        src={URL.createObjectURL(values.profile_img)}
                        alt="profile-picture"
                      />
                    )}
                  </ProfilePic>
                  <Input
                    type="file"
                    name="profile_img"
                    ref={profilePicRef}
                    onChange={(e) => {
                      setFieldValue("profile_img", e.target.files[0]);
                      setFile(e.target.files[0]);
                    }}
                  ></Input>
                  <ErrorMessage>
                    {errors.profile_img &&
                      touched.profile_img &&
                      errors.profile_img}
                  </ErrorMessage>
                </FieldContainer>
              </HStack>
              <HStack>
                <MobileFieldContainer>
                  <LabelText>Mobile</LabelText>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Code
                    </InputLabel>
                    <Select
                      error={errors.country_code && touched.country_code}
                      labelId="demo-simple-select-standard-label"
                      name="country_code"
                      value={values.country_code}
                      onChange={handleChange}
                    >
                      {countries.map(({ code, label, phone }) => (
                        <MenuItem key={code} value={phone}>
                          {label}({phone})
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage>
                      {errors.country_code &&
                        touched.country_code &&
                        errors.country_code}
                    </ErrorMessage>
                  </FormControl>
                  <InputField
                    error={errors.phone_no && touched.phone_no}
                    helperText={
                      errors.phone_no && touched.phone_no && errors.phone_no
                    }
                    placeholder="Contact Number"
                    name="phone_no"
                    value={values.phone_no}
                    onChange={handleChange}
                  ></InputField>
                </MobileFieldContainer>
                <FieldContainer>
                  <LabelText>Email</LabelText>
                  <InputField
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  ></InputField>
                </FieldContainer>
              </HStack>

              <HStack>
                <FieldContainer>
                  <LabelText>Job Type</LabelText>
                  <FormControl>
                    <RadioGroup
                      values={values.job_type}
                      onChange={handleChange}
                      name="job_type"
                    >
                      {jobType.map((value, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                    <ErrorMessage>
                      {errors.job_type && touched.job_type && errors.job_type}
                    </ErrorMessage>
                  </FormControl>
                </FieldContainer>
                <FieldContainer>
                  <LabelText>Date of Birth</LabelText>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField
                        error={errors.dob && touched.dob}
                        helperText={errors.dob && touched.dob && errors.dob}
                      />
                    }
                    placeholderText="Enter Your DOB"
                    value={values.dob}
                    onChange={(val) => setFieldValue("dob", val)}
                    selected={
                      (Date.parse(values.dob) < Date.parse(new Date()) &&
                        new Date(values.dob)) ||
                      ""
                    }
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </FieldContainer>
              </HStack>
             <HStack>
              <CheckBoxFieldContainer>
                <LabelText>Preferred Location</LabelText>
                <FormControl name="locations">
                  {locationOptions.map((value, idx) => (
                    <Field key={idx} name="locations">
                      {({ field }) => {
                        return (
                          <FormControlLabel
                            label={value}
                            {...field}
                            control={
                              <Checkbox
                                value={value}
                                sx={{
                                  "& .MuiSvgIcon-root": { fontSize: 28 },
                                }}
                              />
                            }
                          />
                        );
                      }}
                    </Field>
                  ))}
                  <ErrorMessage>
                    {errors.locations && touched.locations && errors.locations}
                  </ErrorMessage>
                </FormControl>
                </CheckBoxFieldContainer>
                <FieldContainer></FieldContainer>
</HStack>
              {progress !== 0 && upload && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel value={progress} />
                </Box>
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
              >
                Register
              </Button>
              <div>
                <ToastContainer
                  position="top-right"
                  autoClose={3500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                />
              </div>
            </VStack>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default Register;
