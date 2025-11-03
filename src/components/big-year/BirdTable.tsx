import { Bird } from "@brobin/types/big-year";
import { CameraAlt, Check, VolumeUp } from "@mui/icons-material";
import { Link } from "@mui/joy";
import { Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import dayjs from "dayjs";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton sx={{ float: "right", marginLeft: "auto" }} />
    </GridToolbarContainer>
  );
}

export default function BirdTable({ birds }: { birds: Bird[] }) {
  return (
    <DataGrid
      rows={birds}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 50,
          },
        },
      }}
      pageSizeOptions={[]}
      columns={[
        { field: "id", headerName: "#", width: 40, disableColumnMenu: true },
        {
          field: "name",
          headerName: "Species",
          width: 240,
          disableColumnMenu: true,
        },

        {
          field: "location",
          headerName: "Location",
          sortable: false,
          disableColumnMenu: true,
        },
        {
          field: "date",
          headerName: "Date",
          width: 70,
          disableColumnMenu: true,
          valueFormatter: ({ value }) => dayjs(value).format("MMM DD"),
        },
        {
          field: "photoId",
          headerName: "",
          width: 10,
          sortable: false,
          disableColumnMenu: true,
          renderCell({ value }) {
            if (value) {
              return (
                <Link
                  href={`https://macaulaylibrary.org/asset/${value}`}
                  target="_blank"
                  underline="none"
                >
                  <CameraAlt color="primary" />
                </Link>
              );
            }
            return undefined;
          },
        },
        {
          field: "audioId",
          headerName: "",
          width: 10,
          sortable: false,
          disableColumnMenu: true,
          renderCell({ value }) {
            if (value) {
              return (
                <Link
                  href={`https://macaulaylibrary.org/asset/${value}`}
                  target="_blank"
                  underline="none"
                >
                  <VolumeUp color="primary" />
                </Link>
              );
            }
            return undefined;
          },
        },
        {
          field: "lifeBird",
          type: "boolean",
          headerName: "",
          width: 76,
          sortable: false,
          disableColumnMenu: true,
          renderCell({ value }) {
            if (value) {
              return (
                <Chip
                  icon={<Check />}
                  label="Life"
                  size="small"
                  color="success"
                  sx={{ marginRight: 1 }}
                />
              );
            }
            return "";
          },
        },
        {
          field: "stateBird",
          type: "boolean",
          headerName: "",
          width: 85,
          sortable: false,
          disableColumnMenu: true,
          renderCell({ value }) {
            if (value) {
              return (
                <Chip
                  icon={<Check />}
                  label="State"
                  size="small"
                  color="info"
                  sx={{ marginRight: 1 }}
                />
              );
            }
            return "";
          },
        },
      ]}
      rowHeight={38}
      slots={{ toolbar: CustomToolbar }}
    />
  );
}
