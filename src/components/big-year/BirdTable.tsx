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
            pageSize: 25,
          },
        },
      }}
      pageSizeOptions={[]}
      columns={[
        {
          field: "id",
          headerName: "#",
          width: 40,
          disableColumnMenu: true,
          filterable: false,
        },
        {
          field: "name",
          headerName: "Species",
          width: 240,
          disableColumnMenu: true,
          filterable: false,
        },

        {
          field: "location",
          headerName: "Location",
          sortable: false,
          disableColumnMenu: true,
          filterable: false,
        },
        {
          field: "date",
          headerName: "Date",
          width: 70,
          disableColumnMenu: true,
          filterable: false,
          valueFormatter: ({ value }) => dayjs(value).format("MMM DD"),
        },
        {
          field: "hasPhoto",
          type: "boolean",
          headerName: "",
          width: 10,
          sortable: false,
          disableColumnMenu: true,
          valueGetter: ({ row }) => (row.photoId ? true : false),
          renderCell({ row }) {
            if (row.photoId) {
              return (
                <Link
                  href={`https://macaulaylibrary.org/asset/${row.photoId}`}
                  target="_blank"
                  underline="none"
                >
                  <CameraAlt color="primary" />
                </Link>
              );
            }
            return "";
          },
        },
        {
          field: "hasAudio",
          type: "boolean",
          headerName: "",
          width: 10,
          sortable: false,
          disableColumnMenu: true,
          valueGetter: ({ row }) => (row.audioId ? true : false),
          renderCell({ row }) {
            if (row.audioId) {
              return (
                <Link
                  href={`https://macaulaylibrary.org/asset/${row.audioId}`}
                  target="_blank"
                  underline="none"
                >
                  <VolumeUp color="primary" />
                </Link>
              );
            }
            return "";
          },
        },
        {
          field: "lifeBird",
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
          width: 90,
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
