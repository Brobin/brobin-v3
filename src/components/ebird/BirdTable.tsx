import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export type BirdRow = {
  speciesCode: string;
  comName: string;
  sciName: string;
  order: string;
  taxonOrder: number;
};

const columns: GridColDef<BirdRow>[] = [
  { field: "comName", headerName: "Name", flex: 1 },
  {
    field: "sciName",
    headerName: "Scientific Name",
    flex: 1,
    sortComparator: (v1, v2, param1, param2) =>
      param1.api.getRow(param1.id).taxonOrder -
      param2.api.getRow(param2.id).taxonOrder,
  },
  { field: "order", headerName: "Order", flex: 1 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton sx={{ float: "right", marginLeft: "auto" }} />
    </GridToolbarContainer>
  );
}

export default function BirdTable({
  birds,
  onRowClick,
}: {
  birds: BirdRow[];
  onRowClick?: (speciesCode: string) => void;
}) {
  return (
    <DataGrid
      autoHeight
      rows={birds}
      getRowId={(row) => row.speciesCode}
      columns={columns}
      initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
      pageSizeOptions={[25, 50, 100]}
      rowHeight={38}
      slots={{ toolbar: CustomToolbar }}
      onRowClick={(params) => onRowClick?.(params.row.speciesCode)}
    />
  );
}
