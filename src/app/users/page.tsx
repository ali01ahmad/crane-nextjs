'use client';

import { useEffect,useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from 'react-redux';
import { useUsers } from '@/hook/useUser';

// Define the User type according to your user object structure
type User = {
  id: string | number;
  name: string;
  email: string;
  role: string;
};



export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { users, loading: usersLoading, error } = useUsers();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/api/auth/signin"); // Redirect to sign-in page if not authenticated
    } else {
      setLoading(false); // Set loading to false when session is available
    }
  }, [session, status, router]);

  


  return (
    <Grid sx={{ display: 'flex' }} container spacing={2} justifyContent="center" alignItems="center">
     {/* Main Content */}
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Map through user data and create table rows */}
                {users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

    </Grid>
  );
}