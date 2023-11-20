import { GetAllPricesAPI } from "@/apis/panel/admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";



export default function CustomPagination({ handleChangePage, count }:any) {
  return (
    <Stack
      spacing={2}
      className="mt-20"
      sx={{ " & .MuiPagination-ul": { justifyContent: "center" } }}
    >
      <Pagination
        hidePrevButton
        onChange={handleChangePage}
        count={count}
        variant="outlined"
        color="primary"
        sx={{
          "& .MuiPaginationItem-previousNext": { transform: "rotate(180deg)" },
        }}
      />
    </Stack>
  );
}
