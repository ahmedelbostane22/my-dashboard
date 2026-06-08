import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import OptionMenu from '../Layout/optionmenu';
import { onSnapshot, query,  } from 'firebase/firestore';
import { db ,collection } from '../Layout/firebase';
import { useState, useEffect } from 'react';
import { collectionGroup ,where ,getDocs ,setDoc} from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import {updateDoc, serverTimestamp} from "firebase/firestore";
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';




  const updateOrderStatus = async (orderRef, status ,orderData) => {
  try {
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
       });
    const q=query(collection(db, 'sales'),where('orderId','==',orderData.orderId));
    const snap = await getDocs(q);
    if(snap.docs.length>0){
      console.log('order already moved to sales');
      return;
    }

        if(status === 'Delivered'){
   const salesRef =    await setDoc(collection(db, 'sales',orderData.orderId ), {
        orderId: orderData.orderId,
        userId: orderData.userId,
        name: orderData.name,
        
        products: orderData.rawProducts,
  totalPrice: orderData.amount ?? 0, 
        paymentMethod: orderData.paymentMethod ?? 'N/A',
        deliveredAt: serverTimestamp(),
      });
      console.log(`Order ${orderData.orderId} moved to sales collection with ID: ${salesRef.id}
        
        
        . ${salesRef.length}`);
    }



  } catch (error) {
    console.error("Error updating order:", error);
  }
};







const STATUS_CONFIG = {
  Accepted: {
    label: 'Accept order',
    color: 'success.main',
    icon: <EditIcon fontSize="small" />,
  },
  Denied: {
    label: 'Denied order',
    color: 'error.main',
    icon: <FileCopyIcon fontSize="small" />,
  },
  Preparing: {
    label: 'Preparing',
    color: 'warning.main',
    icon: <ArchiveIcon fontSize="small" />,
  },
  OnTheWay: {
    label: 'On The Way',
    color: 'info.main',
    icon: <ArchiveIcon fontSize="small" />,
  },
  Delivered: {
    label: 'Delivered',
    color: 'secondary.main',
    icon: <ArchiveIcon fontSize="small" />,
  },
};








const columns = (navigate) => [
  { field: 'orderId', headerName: 'Order ID', width: 130 },
  { field: 'name', headerName: 'name', width: 160 },
  {field: 'products', headerName: 'Products', width: 200 },
  {
    field: 'amount',
    headerName: 'Amount ($)',
    width: 120,
    type: 'number',
  },
  {
    field: 'status',
  headerName: 'Status',
  width: 130,
  renderCell: (params) => {
    let color = 'default';

      switch (params.value) {
    case 'Accepted':
      color = 'success';
      break;
    case 'Preparing':
      color = 'warning';
      break;
    case 'OnTheWay':
      color = 'info';
      break;
    case 'Delivered':
      color = 'secondary';
      break;
    case 'Denied':
    case 'Cancelled':
      color = 'error';
      break;
    case 'Pending':
      color = 'default';
      break;
    default:
      color = 'default';
  }
    return (
      <Chip
        label={params.value}
        color={color}
        size="small"
        variant="outlined"
      />
    );
  },
},
  { field: 'payment', headerName: 'Payment', width: 140 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'date', headerName: 'Order Date', width: 140 },
 {
  field: 'action',
  headerName: 'Action',
  width: 200,
  // sortable: false,
  // filterable: false,
  renderCell: (params) => {
    const row = params.row;

    return (
      <OptionMenu
        trigger={<EditIcon color="success" sx={{ cursor: 'pointer' }} />}
    items={[
  {
    label: 'Accept order',
    icon: <EditIcon fontSize="small" sx={{ color: 'success.main' }} />,
    sx: { color: 'success.main' },
    onClick: () => updateOrderStatus(row.ref, 'Accepted'),
  },
  {
    label: 'Preparing',
    icon: <ArchiveIcon fontSize="small" sx={{ color: 'warning.main' }} />,
    sx: { color: 'warning.main' },
    onClick: () => updateOrderStatus(row.ref, 'Preparing'),
  },
  {
    label: 'On The Way',
    icon: <ArchiveIcon fontSize="small" sx={{ color: 'info.main' }} />,
    sx: { color: 'info.main' },
    onClick: () => updateOrderStatus(row.ref, 'OnTheWay'),
  },
  {
    label: 'Delivered',
    icon: <ArchiveIcon fontSize="small" sx={{ color: 'secondary.main' }} />,
    sx: { color: 'secondary.main' },
    onClick: () => updateOrderStatus(row.ref, 'Delivered', row),
  },
  { divider: true },
  {
    label: 'Denied',
    icon: <FileCopyIcon fontSize="small" sx={{ color: 'error.main' }} />,
    sx: { color: 'error.main' },
    onClick: () => updateOrderStatus(row.ref, 'Denied'),
  },
  {
  label: 'orderDetails',
  icon: <FileCopyIcon fontSize="small" sx={{ color: 'primary.main' }} />,
  sx: { color: 'primary.main' },
  onClick: () => {
    navigate(`/OrderDetails/${row.userId}/${row.docId}`);
  
  }


  }


]}
      />
    );
  },
},
  {





    sortable: false,
    filterable: false,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
 



 useEffect(() => {
  const unsub = onSnapshot(
    collectionGroup(db, "orders"), 
    (snapshot) => {
     const data = snapshot.docs.map((doc) => {
  const d = doc.data();

  return {
    id: doc.id,
    docId: doc.id,  
    ref:doc.ref,
    orderId: d.orderId,
    userId: d.userId,
    name: d.name || d.userName || "Unknown",
    rawProducts: d.products??[],

    products:
      Array.isArray(d.products) && d.products.length > 0
        ? d.products
            .map((p) => {
              const title = p.title ?? "Unknown";
              const qty = p.quantity ?? 1;
              const price = p.price ?? 0;
              return `${title} (x${qty}) - $${price}`;
            })
            .join(", ")
        : "N/A",

    amount: d.totalPrice ?? 0,
    status: d.status || "Pending",

    payment:
      typeof d.paymentMethod === "string"
        ? d.paymentMethod
        : d.paymentMethod?.method ?? "N/A",

    address: d.address
      ? `${d.address.city}, ${d.address.street}, ${d.address.country}`
      : "-",

    date: d.orderDate
      ? new Date(d.orderDate).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
  };
});
      setOrders(data);
    }
  );
  return () => unsub();
}, []);


  return (
    <Box sx={{ mt: '64px' }}>
      <Paper sx={{ height: 400, width: '80%', margin: 'auto' }}>
        <DataGrid
          rows={orders}
          columns={columns(navigate)} 
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

export default Order;
