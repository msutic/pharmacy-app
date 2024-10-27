// import { Children, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './DataTable.scss';

// interface Column {
//   id: string;
//   label: string;
// }

// interface TableDataWrapperProps<T> {
//   data: T[];
//   columns: Column[];
// }

// const TableDataWrapper = <T extends Record<string, any>>({
//   data,
//   columns,
// }: TableDataWrapperProps<T>) => {
//   const [tableData, setTableData] = useState<T[]>(data);
//   const handleEdit = (id: number) => {
//     const product = tableData.find((item) => (item as any).id === id);
//     if (product) {
//       console.log('editig product:', product);
//     }
//   };

//   const handleDelete = (id: number) => {
//     const updatedData = tableData.filter((item) => (item as any).id !== id);
//     setTableData(updatedData);
//     console.log('deleted product with id:', id);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Manufacturer</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Expiration Date</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.manufacturerName}</TableCell>
//               <TableCell>{row.price}</TableCell>
//               <TableCell>{row.expirationDate}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => onEdit(row)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => onDelete(row.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TableDataWrapper;
