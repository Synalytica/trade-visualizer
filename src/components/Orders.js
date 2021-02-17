import React, { useState, useEffect } from "react";
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import { DataGrid } from '@material-ui/data-grid';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([
    {
      field: 'direction', headerName: 'Position', flex: 0.5,
      renderCell: (params) => {
        return <Chip
          icon={params.value === "LONG" ? <TrendingUpIcon /> : <TrendingDownIcon />}
          label={params.value}
          variant={params.value === "LONG" ? 'outlined' : 'default'}
        />
      }
    },
    { field: 'entryTime', headerName: 'Timestamp (entry)', flex: 1 },
    { field: 'entryPrice', headerName: 'Price (entry)', flex: 1 },
    { field: 'exitTime', headerName: 'Timestamp (exit)', flex: 1 },
    { field: 'exitPrice', headerName: 'Price (exit)', flex: 1 },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      valueGetter: (params) => {
        return ((params.getValue('exitTime') || 0) - (params.getValue('entryTime') || 0)) / (60 * 1000);
      }
    },
    {
      field: 'result',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        return <Chip
          icon={params.value === "L" ? <CloseIcon /> : <DoneIcon />}
          label={params.value}
          color={params.value === "L" ? 'secondary' : 'primary'}
        />
      }
    },
  ]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        let orderData = data.orders;
        var orders = [];
        var currentOrder = {};
        var tagStringArray;
        for (var i = 0; i < orderData.length; i++) {
          if (i % 2 === 0) {
            currentOrder.id = orderData[i].time * 1000;
            currentOrder["entryTime"] = new Date(orderData[i].time * 1000);
            tagStringArray = orderData[i].text.split("@ ");
            currentOrder["entryPrice"] = parseFloat(tagStringArray[1]);
            if (orderData[i].color === "green") {
              currentOrder["result"] = "W";
            } else if (orderData[i].color === "red") {
              currentOrder["result"] = "L";
            }
            if (orderData[i].shape === "arrowUp") {
              currentOrder["direction"] = "LONG";
            } else if (orderData[i].shape === "arrowDown") {
              currentOrder["direction"] = "SHORT";
            }
          } else {
            currentOrder["exitTime"] = new Date(orderData[i].time * 1000);
            tagStringArray = orderData[i].text.split("@ ");
            currentOrder["exitPrice"] = parseFloat(tagStringArray[1]);
            orders.push(currentOrder);
            currentOrder = {};
          }
        }
        setOrders(orders);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      height: 500, width: '100%'
    }}>
      <h3>Trades</h3>
      <DataGrid
        loading={isLoading}
        pageSize={10}
        columns={columns}
        rows={orders}
        sortModel={[
          {
            field: 'entryTime',
            sort: 'desc',
          },
        ]}
      />
    </div>
  );
};