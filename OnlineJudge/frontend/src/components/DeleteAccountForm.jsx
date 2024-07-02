import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const DeleteAccountForm = ({ onClose }) => {
  const [user, setUser] = useState({ username: '', firstName: '', lastName: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const authToken = Cookies.get('authToken');

  useEffect(() => {
    if (authToken) {
      getUserDetails();
    }
  }, [authToken]);

  async function getUserDetails() {
    try {
      const response = await fetch('http://localhost:2999/userdetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const userDetails = await response.json();
      setUser({
        username: userDetails.username,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      });
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      toast({
        title: 'Error',
        description: `Failed to fetch user details: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const deleteUserProfile = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch('http://localhost:2999/deleteprofile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Deletion failed');
      }

      Cookies.remove('authToken'); // Clear the existing cookie

      toast({
        title: 'Profile Deleted Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Optionally, perform any cleanup actions or navigate away from the profile page
      onClose(); // Assuming onClose is a prop function to close the profile update form or navigate away
    } catch (error) {
      console.error('Error during profile deletion:', error.message);
      toast({
        title: 'Deletion Failed',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          name="firstName"
          placeholder="Enter your first name"
          value={user.firstName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          name="lastName"
          placeholder="Enter your last name"
          value={user.lastName}
          onChange={handleChange}
        />
      </FormControl>
      <Button
        colorScheme="red"
        onClick={deleteUserProfile}
        isLoading={isDeleting}
      >
        Delete Profile
      </Button>
    </VStack>
  );
};

export default DeleteAccountForm;
