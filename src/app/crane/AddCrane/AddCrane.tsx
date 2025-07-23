import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { useCranes } from "@/hook/useCrane";
import { useSelector } from "react-redux";



interface AddCraneModalProps {
  open: boolean;
  onClose: () => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export function AddCraneModal({ open, onClose }: AddCraneModalProps){
  // Modal content for adding a crane
  console.log("AddCraneModal opened");
  const statusOptions = ['Active', 'Inactive'];
  const [formData, setFormData] = useState({
    serial_number: '',
    model: '',
    location: '',
    status: 'Active',
  });
 const { createCrane } = useCranes();

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API or state logic here
    console.log('Crane data submitted:', formData);
    await createCrane(formData);
    onClose(); // Close the modal after submission
    setFormData({
      serial_number: '',
      model: '',
      location: '',
      status: 'Active',
    });
  };

 return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
              <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Add New Crane
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                    fullWidth
                    margin="normal"
                    label="Serial Number"
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    required
                    />
                    <TextField
                    fullWidth
                    margin="normal"
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    />
                    <TextField
                    fullWidth
                    margin="normal"
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    />
                    <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    >
                    {statusOptions.map(option => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                    </TextField>

                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    >
                    Submit
                    </Button>
                </Box>
                </Paper>
        </Box>
      </Modal>
    </>
  );
}