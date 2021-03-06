import styled from "styled-components";
import UsersGrid from "../Components/UsersGrid";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useUsers, useDeleteUser } from "../hooks/register-hooks";
import { useConfirm } from "material-ui-confirm";
import { format } from "date-fns";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoaderContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NewUser = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
`;

function Home() {
  let history = useHistory();
  const { data: usersData = [] } = useUsers();
  const confirm = useConfirm();
  const { mutate } = useDeleteUser();
  const formatDate = (date) => format(new Date(date), "dd MMM yyyy");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (usersData) setLoading(false);
      else setLoading(true);
    }, 500);
  }, [usersData]);
  const columns = [
    {
      field: "profile_img",
      headerName: "Profile Picture",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Flex>
            <Image
              alt="Profile-Picture"
              src={
                row?.profile_img ||
                "https://img.favpng.com/2/21/11/computer-icons-user-profile-user-account-clip-art-png-favpng-gDBjftHWJPTMjttnBiJh9vw96.jpg"
              }
            />
          </Flex>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "full_name",
      headerName: "Name",
      width: 200,
    },

    {
      field: "contact_no",
      headerName: "Mobile",
      width: 220,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      width: 150,
      type: "string",
      renderCell: ({ row }) => {
        return (
          <>
            <p>{formatDate(row.dob)}</p>
          </>
        );
      },
    },

    {
      field: "job_type",
      headerName: "Job Type",
      type: "string",
      width: 180,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <ButtonContainer>
            <IconButton onClick={() => history.push(`/update/${row._id}`)}>
              <i className="fas fa-edit" style={{ color: "goldenrod" }}></i>
            </IconButton>
            <IconButton
              onClick={async () =>
                await confirm({
                  description: "Do you want to delete this user?",
                }).then(() => mutate({ userId: row?._id }))
              }
            >
              <i className="fas fa-user-minus" style={{ color: "red" }}></i>
            </IconButton>
          </ButtonContainer>
        );
      },
    },
  ];

  if (!loading) {
    return (
      <>
        <NewUser>
          <Button
            onClick={() => history.push("/register")}
            variant="contained"
            size="large"
          >
            Register User
          </Button>
        </NewUser>
        <Flex>
          <h2 style={{ margin: "0" }}>USERS LIST({usersData?.length})</h2>
        </Flex>
        <Container>
          <UsersGrid users={usersData} columns={columns} />
        </Container>
      </>
    );
  } else {
    return (
      <LoaderContainer>
        <ClipLoader loading={loading} margin="5px" color="purple" size={30} />
      </LoaderContainer>
    );
  }
}

export default Home;
