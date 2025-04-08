import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const agents = [
  { id: 1, name: "John Doe", position: "Real Estate Agent", experience: "5 years" },
  { id: 2, name: "Jane Smith", position: "Senior Agent", experience: "8 years" },
  { id: 3, name: "Alice Johnson", position: "Agent", experience: "3 years" },
  // Add more agent data as needed
];

const Agent = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Meet Our Agents
      </Typography>
      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{agent.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Position: {agent.position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Experience: {agent.experience}
                </Typography>
                <Button
                  component={Link}
                  to={`/agents/${agent.id}`}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Agent;
