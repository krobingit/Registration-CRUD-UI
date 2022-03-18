import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';

const GridContainer = styled.div`
width:100%;
height:35rem;
background: rgba( 255, 255, 255, 0 );
box-shadow: 0 8px 32px 0 black;
border-radius: 10px;
`
function UsersGrid({users,columns}) {
  return (
    <GridContainer>
      <DataGrid
        style={{ color: "black", fontSize: "1.1rem", borderColor: "gold" }}
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
      />
    </GridContainer>
  );
}

export default UsersGrid;
