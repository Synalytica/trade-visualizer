import React from "react";
import { useSelector } from "react-redux";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { DataGrid } from "@material-ui/data-grid";

export default function Orders() {
  const columns = [
    {
      field: "direction",
      headerName: "Position",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Chip
            icon={
              params.value === "LONG" ? (
                <TrendingUpIcon />
              ) : (
                <TrendingDownIcon />
              )
            }
            label={params.value}
            variant={params.value === "LONG" ? "outlined" : "default"}
          />
        );
      },
    },
    { field: "entryTime", headerName: "Timestamp (entry)", flex: 1 },
    { field: "entryPrice", headerName: "Price (entry)", flex: 1 },
    { field: "exitTime", headerName: "Timestamp (exit)", flex: 1 },
    { field: "exitPrice", headerName: "Price (exit)", flex: 1 },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      valueGetter: (params) => {
        return (
          ((params.getValue("exitTime") || 0) -
            (params.getValue("entryTime") || 0)) /
          (60 * 1000)
        );
      },
    },
    {
      field: "result",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Chip
            icon={params.value === "L" ? <CloseIcon /> : <DoneIcon />}
            label={params.value}
            color={params.value === "L" ? "secondary" : "primary"}
          />
        );
      },
    },
  ];
  const loading = useSelector((state) => state.loading);
  const orders = useSelector((state) => state.orders);

  /* const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return (
    <div
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <h3>Trades</h3>
      <DataGrid
        loading={loading}
        pageSize={10}
        columns={columns}
        rows={orders}
        sortModel={[
          {
            field: "entryTime",
            sort: "desc",
          },
        ]}
      />
    </div>
  );
}
