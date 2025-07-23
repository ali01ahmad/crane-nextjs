'use client'
import { useEffect,useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from 'react-redux';
import { setCranes } from '@/store/slices/useCrane';
import { RootState } from '@/store';
import { useCranes } from '@/hook/useCrane';
import {AddCraneModal} from './AddCrane/AddCrane';
import CircularProgress from '@mui/material/CircularProgress';


type Crane = {
    id: string;
    serial_number: string;
    model: string;
    location?: string;
    status: string;
};

export default function CranePage({ }) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const { cranes: gplCrane, loading: cranesLoading, error } = useCranes();
    const cranes = useSelector((state: RootState) => state.crane.cranes);
    
    const dispatch = useDispatch();
console.log("Cranes from store:", cranes);
console.log("Cranes from hook:", gplCrane);
    useEffect(() => {
        if(gplCrane.length > 0) {
            dispatch(setCranes(gplCrane));
        }
    }, [gplCrane, openModal]);

    const handleAddCrane = () => {
        console.log("Add Crane button clicked");
        setOpenModal(true);
    };

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    router.push("/api/auth/signin");
    return null;
  }

 return (
  <>
  
    <Grid
      sx={{ display: 'flex' }}
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Typography variant="h4" gutterBottom>
          Crane Management
        </Typography>

        {!(cranesLoading || error) && (
          <Button onClick={handleAddCrane}>Open modal</Button>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cranesLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} sx={{ mb: 1 }} />
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="error">
                    {error.message || 'Fetch failed'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : gplCrane.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="textSecondary">No cranes found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              cranes.map((crane: Crane) => (
                <TableRow key={crane.id}>
                  <TableCell>{crane.id}</TableCell>
                  <TableCell>{crane.serial_number}</TableCell>
                  <TableCell>{crane.model}</TableCell>
                  <TableCell>{crane.location || 'Unknown'}</TableCell>
                  <TableCell>{crane.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Grid>

    <AddCraneModal open={openModal} onClose={() => setOpenModal(false)} />
  </>
);



   

}