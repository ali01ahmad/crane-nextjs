'use client';

import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  CssBaseline,
  Divider,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {  useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useUsers } from '@/hook/useUser';


const drawerWidth = 240;

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const { users } = useUsers();


  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);
  
const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem component="button" onClick={() => router.push('/dashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component="button" onClick={() => router.push('/users')}>
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem component="button" onClick={() => router.push('/crane')}>
              <ListItemText primary="Crane Management" />
            </ListItem>
            <ListItem component="button" onClick={() => handleLogout()}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome to your Dashboard
        </Typography>

        <Grid container spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Reports</Typography>
                <Typography variant="h4">87</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Status</Typography>
                <Typography variant="body1">All systems operational</Typography>
              </CardContent>
            </Card>
        </Grid>
      </Box>
    </Box>
  );
}
