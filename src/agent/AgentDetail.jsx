import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Grid } from "@mui/material";

const agents = [
  { id: 1, name: "John Doe", position: "Real Estate Agent", experience: "5 years", bio: "Experienced in residential and commercial properties." },
  { id: 2, name: "Jane Smith", position: "Senior Agent", experience: "8 years", bio: "Specializes in luxury homes and high-end clients." },
  { id: 3, name: "Alice Johnson", position: "Agent", experience: "3 years", bio: "Focused on first-time homebuyers and investment properties." },
  // Add more agent details as needed
];

const AgentDetails = () => {
  const { id } = useParams();
  const agent = agents.find((agent) => agent.id === parseInt(id));

  if (!agent) {
    return <Typography variant="h6">Agent not found</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {agent.name}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Position: {agent.position}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Experience: {agent.experience}
        </Typography>
        <Typography variant="body1" paragraph>
          Bio: {agent.bio}
        </Typography>
      </Paper>
    </div>
  );
};

export default AgentDetails;
