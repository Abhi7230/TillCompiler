import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Progress,
  SimpleGrid,
  Wrap,
  WrapItem,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { FaChevronRight, FaFire } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// Import your form components here
import UpdateProfileForm from './UpdateProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteAccountForm from './DeleteAccountForm';

const Dashboard = () => {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isSubmissionsOpen, onOpen: onSubmissionsOpen, onClose: onSubmissionsClose } = useDisclosure();
  const [activeForm, setActiveForm] = useState(null);
  const [user, setUser] = useState({ username: '', email: '' });

  const authToken = Cookies.get('authToken');

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
        email: userDetails.email,
      });
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      toast.error(`Failed to fetch user details: ${error.message}`);
    }
  }

  useEffect(() => {
    if (authToken) {
      getUserDetails();
    }
  }, [authToken]);

  const submissions = [
    { id: 1, problem: 'Pratik', date: '9', status: '1st Position' },
    { id: 2, problem: 'Rohit', date: '9', status: '2nd Position' },
    { id: 3, problem: 'Ajay', date: '8', status: '3rd Position' },
    { id: 4, problem: 'Srishti', date: '7', status: '4th Position' },
    { id: 5, problem: 'Anisha', date: '5', status: '5th Position' },
  ];
  const learningResourcesData = [
    { id: 1, title: 'Introduction to Algorithms', description: 'Learn fundamental algorithms and data structures.', link: 'https://example.com/algorithms', category: 'Algorithms' },
    { id: 2, title: 'Machine Learning Basics', description: 'Introduction to machine learning concepts and techniques.', link: 'https://example.com/machine-learning', category: 'Machine Learning' },
    { id: 3, title: 'React.js Documentation', description: 'Official documentation for React.js library.', link: 'https://reactjs.org/docs/getting-started.html', category: 'React' },
    // Add more resources as needed
  ];

  const streakData = [
    { date: '2023-10-18', count: 1 },
    { date: '2023-11-17', count: 1 },
    { date: '2023-01-16', count: 0 },
    { date: '2023-06-15', count: 1 },
    // Add more data here
  ];

  const currentStreak = 2;
  const maxStreak = 7;

  const progressData = [
    { name: 'Solved', value: 65 },
    { name: 'Unsolved', value: 35 },
  ];

  const monthlyData = [
    { name: 'Jan', problems: 30 },
    { name: 'Feb', problems: 45 },
    { name: 'Mar', problems: 38 },
    { name: 'Apr', problems: 50 },
    { name: 'May', problems: 42 },
    { name: 'Jun', problems: 55 },
  ];

  const topicWiseSolutions = [
    { topic: 'Binary Search', solved: 20, total: 30 },
    { topic: 'Graphs', solved: 15, total: 25 },
    { topic: 'Dynamic Programming', solved: 10, total: 40 },
    { topic: 'Trees', solved: 12, total: 20 },
    { topic: 'Vectors', solved: 8, total: 15 },
  ];

  const getColor = (value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count}`;
  };

  const COLORS = [ '#FE4E8E', // Pink
    '#FF6F61', // Coral
    '#4BC0C0', // Teal
    '#FFD700', // Gold
    '#FF6347'  // Tomato
    ];

  const handleSettingClick = (formType) => {
    setActiveForm(formType);
    onSettingsOpen();
  };

  const handleFormSubmit = (formType) => {
    onSettingsClose();
    toast.success(`${formType} updated successfully!`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <ToastContainer />
      <SimpleGrid columns={1} spacing={4} justifyItems="center">
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" pl={8} w="full">
          <Flex align="center" justify="space-between" wrap="wrap">
            <HStack spacing={4} mb={{ base: 4, md: 0 }}>
              <Avatar name={user.username} bg="teal.500" />
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">{user.username}</Text>
                <Text color="gray.600">{user.email}</Text>
              </VStack>
            </HStack>
            <Wrap spacing={2} justify="flex-end">
              <WrapItem>
                <Button size="sm" colorScheme="teal" onClick={() => handleSettingClick('profile')}>Update Profile</Button>
              </WrapItem>
              <WrapItem>
                <Button size="sm" colorScheme="blue" onClick={() => handleSettingClick('password')}>Change Password</Button>
              </WrapItem>
              <WrapItem>
                <Button size="sm" colorScheme="red" onClick={() => handleSettingClick('delete')}>Delete Account</Button>
              </WrapItem>
            </Wrap>
          </Flex>
        </Box>
      </SimpleGrid>
      <ToastContainer />
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <VStack align="stretch" spacing={8} alignSelf="flex-start">
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Learning Resources</Text>
            <VStack align="stretch" spacing={4}>
              {learningResourcesData.map((resource) => (
                <Box key={resource.id} bg="gray.200" p={4} borderRadius="md" boxShadow="sm">
                  <Text fontSize="lg" fontWeight="bold">{resource.title}</Text>
                  <Text>{resource.description}</Text>
                  <Button mt={2} colorScheme="blue" onClick={() => window.open(resource.link, '_blank')}>View Resource</Button>
                </Box>
              ))}
            </VStack>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>TOP 5 Participants</Text>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>No. of problems solved</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((sub) => (
                    <Tr key={sub.id}>
                      <Td>{sub.problem}</Td>
                      <Td>{sub.date}</Td>
                      <Td>
                        <Text
                          color={sub.status === 'Accepted' ? 'green.500' : 'red.500'}
                          fontWeight="bold"
                        >
                          {sub.status}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Button
              // rightIcon={<FaChevronRight />}
              colorScheme="blue"
              variant="link"
              mt={4}
              // onClick={onSubmissionsOpen}
            >
              {/* View All Submissions */}
            </Button>
          </Box>
          

          {/* <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Problem Solving Progress</Text>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
              <Box width={{ base: "100%", md: "200px" }} height="200px" mb={{ base: 4, md: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <VStack align="stretch" spacing={4}>
                {progressData.map((entry, index) => (
                  <HStack key={`progress-${index}`} justify="space-between" width="full">
                    <Text>{entry.name}</Text>
                    <Text>{entry.value}%</Text>
                  </HStack>
                ))}
              </VStack>
            </Flex>
          </Box> */}
        </VStack>

        <VStack align="stretch" spacing={8} mt={{ base: 40, lg: 0 }}>
          {/* <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Streak Calendar</Text>
            <CalendarHeatmap
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-12-31')}
              values={streakData}
              classForValue={getColor}
            />
            <StatGroup mt={4}>
              <Stat>
                <StatLabel>Current Streak</StatLabel>
                <StatNumber>{currentStreak} days</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Max Streak</StatLabel>
                <StatNumber>{maxStreak} days</StatNumber>
              </Stat>
            </StatGroup>
          </Box> */}

          {/* <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Monthly Problems Solved</Text>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="problems" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box> */}

          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Topic-wise Solutions</Text>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Topic</Th>
                    <Th>Solved</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {topicWiseSolutions.map((topic, index) => (
                    <Tr key={`topic-${index}`}>
                      <Td>{topic.topic}</Td>
                      <Td>{topic.solved}</Td>
                      <Td>{topic.total}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Questions for the day</Text>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Topic</Th>
                    <Th>Question</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {topicWiseSolutions.map((topic, index) => (
                    <Tr key={`topic-${index}`}>
                      <Td>{topic.topic}</Td>
                      <Td>{topic.solved}</Td>
                      <Td>{topic.total}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </VStack>
      </SimpleGrid>

      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeForm === 'profile' ? 'Update Profile' : activeForm === 'password' ? 'Change Password' : 'Delete Account'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeForm === 'profile' && <UpdateProfileForm onSubmit={() => handleFormSubmit('Profile')} />}
            {activeForm === 'password' && <ChangePasswordForm onSubmit={() => handleFormSubmit('Password')} />}
            {activeForm === 'delete' && <DeleteAccountForm onSubmit={() => handleFormSubmit('Account')} />}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSubmissionsOpen} onClose={onSubmissionsClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>All Submissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Problem</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((sub) => (
                    <Tr key={sub.id}>
                      <Td>{sub.problem}</Td>
                      <Td>{sub.date}</Td>
                      <Td>
                        <Text
                          color={sub.status === 'Accepted' ? 'green.500' : 'red.500'}
                          fontWeight="bold"
                        >
                          {sub.status}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
