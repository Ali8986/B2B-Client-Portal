import { Avatar } from "@mui/material";
import * as React from "react";

const userData = [
  {
    id: 1,
    name: "John Doe",
    greeting: "Hello",
    description: "I am a Software Developer",
    title: "Frontend Developer",
    location: "San Francisco, CA",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    greeting: "Hi there",
    description: "I am a UX Designer",
    title: "Product Designer",
    location: "New York, NY",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Alex Johnson",
    greeting: "Hey",
    description: "I am a Data Scientist",
    title: "Machine Learning Engineer",
    location: "Austin, TX",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emily Davis",
    greeting: "Welcome!",
    description: "I am a Marketing Specialist",
    title: "Digital Marketer",
    location: "Chicago, IL",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Michael Brown",
    greeting: "Claims!",
    description: "I am a Project Manager",
    title: "Agile Coach",
    location: "Los Angeles, CA",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    greeting: "Hi!",
    description: "I am a Software Tester",
    title: "Quality Assurance Engineer",
    location: "Seattle, WA",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "David Lee",
    greeting: "Hey there!",
    description: "I am a DevOps Engineer",
    title: "Cloud Solutions Architect",
    location: "Boston, MA",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    greeting: "Greetings!",
    description: "I am a Data Analyst",
    title: "Business Intelligence Analyst",
    location: "Miami, FL",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
];

function HomePage() {
  return (
    <div className='container'>
      <div className='row p-5'>
        {userData.map((user) => (
          <div key={user.id} className='col-3'>
            <div
              className='my-4 bg-black d-flex justify-content-center flex-column align-items-center text-white rounded-5 p-3 text-center'
              style={{
                height: "90%",
              }}
            >
              <Avatar src={user.avatarUrl} className='my-4' />
              <h2>{user.greeting}</h2>
              <p>{user.name}</p>
              <p>{user.title}</p>
              <p>{user.location}</p>
              <p>{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;