import { Bird } from "@brobin/types/big-year";
import { CameraAlt, Check, VolumeUp } from "@mui/icons-material";
import { Link } from "@mui/joy";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

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
        { field: "id", headerName: "#", width: 40 },
        {
          field: "name",
          headerName: "Species",
          width: 240,
        },

        {
          field: "location",
          headerName: "Location",
          sortable: false,
        },
        {
          field: "date",
          headerName: "Date",
          width: 70,
          valueFormatter: ({ value }) => dayjs(value).format("MMM DD"),
        },
        {
          field: "photoId",
          headerName: "",
          width: 10,
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
          },
        },
        {
          field: "audioId",
          headerName: "",
          width: 10,
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
          },
        },
        {
          field: "lifeBird",
          headerName: "",
          width: 76,
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
          headerName: "",
          width: 85,
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
    />
  );
}
