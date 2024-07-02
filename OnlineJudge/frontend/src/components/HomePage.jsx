// src/pages/Home.js
import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  VStack,
  Image,
} from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
import HomeCard from '../components/HomeCard';
import Homeback1 from '../assets/home_back1.jpeg'
import Homeback2 from '../assets/home_back2.jpeg'
import Homeback3 from '../assets/home_back3.jpeg'
import Homeback4 from '../assets/home_back4.jpeg'





const popularCourses = [
  { title: 'Binary tree', image: Homeback1, link: '/course/Binary tree' ,deadline: '2024-05-15', Noofquestions: '10', Nooftimesasked: '4' },
  { title: 'Graphs', image:Homeback2, link: '/course/Graphs' ,deadline: '2024-05-15', Noofquestions: '10', Nooftimesasked: '4' },
  { title: 'Arrays', image:Homeback3 , link: '/course/Arrays',deadline: '2024-05-15', Noofquestions: '10', Nooftimesasked: '4'  },
  { title: 'STL', image:Homeback4 , link: '/course/STL' ,deadline: '2024-05-15', Noofquestions: '10', Nooftimesasked: '4' },
  // Add more courses here
];

const upcomingContests = [
  { name: 'Weekly Challenge', date: '2024-06-25', time: '14:00 UTC', registrationLink: '/register/weekly' },
  { name: 'Monthly Hackathon', date: '2024-07-01', time: '09:00 UTC', registrationLink: '/register/monthly' },
  { name: 'Coding Marathon', date: '2024-07-15', time: '10:00 UTC', registrationLink: '/register/marathon' },
  // Add more upcoming contests
];

const pastContests = [
  { name: 'Spring Coding Sprint', date: '2024-05-15', time: '10:00 UTC', resultsLink: '/results/spring-sprint' },
  { name: 'AI Challenge', date: '2024-04-20', time: '13:00 UTC', resultsLink: '/results/ai-challenge' },
  { name: 'Database Design Contest', date: '2024-03-10', time: '11:00 UTC', resultsLink: '/results/db-design' },
  // Add more past contests
];

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          
        </Heading>

      
        <Heading as="h2" size="xl">
        Topics To Cover Today
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Topics</Th>
              <Th>Deadline</Th>
              <Th>No. of Questions</Th>
              <Th>No. of times asked in faang companies</Th>
            </Tr>
          </Thead>
          <Tbody>
            {popularCourses.map((contest, index) => (
              <Tr key={index}>
                <Td>{contest.title}</Td>
                <Td>{contest.deadline}</Td>
                <Td>{contest.Noofquestions }</Td>
                <Td>{contest.Nooftimesasked }</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        

        <SimpleGrid columns={[1, 2]} spacing={8} w="100%">
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Upcoming Contests
            </Heading>
            {upcomingContests.map((contest, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Heading as="h4" size="md" mb={2}>
                  {contest.name}
                </Heading>
                <Box>
                  <strong>Date:</strong> {contest.date}
                </Box>
                <Box>
                  <strong>Time:</strong> {contest.time}
                </Box>
                <Button as={Link} href={contest.registrationLink} colorScheme="blue" size="sm" mt={2}>
                  Register
                </Button>
              </Box>
            ))}
          </Box>

          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Past Contests
            </Heading>
            {pastContests.map((contest, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Heading as="h4" size="md" mb={2}>
                  {contest.name}
                </Heading>
                <Box>
                  <strong>Date:</strong> {contest.date}
                </Box>
                <Box>
                  <strong>Time:</strong> {contest.time}
                </Box>
                <Button as={Link} href={contest.resultsLink} colorScheme="green" size="sm" mt={2}>
                  View Results
                </Button>
              </Box>
            ))}
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;