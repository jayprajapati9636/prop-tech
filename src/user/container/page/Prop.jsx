import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box } from '@mui/material';

const Prop = () => {
  const properties = [
    {
      type: "Modern Smart Home",
      description: "A state-of-the-art smart home with advanced automation and energy-saving features. Ideal for modern living.",
      price: "$1,500,000",
      size: "2500 sq.ft",
      bed: "2 bed",
      bath: "3 bath",
      rating: "(4.9/5.0)",
      flooring: "Hardwood",
      furnishing: "Fully Furnished",
      landmark: "Near Central Park",
      images: ["/Image/Home1.jpg", "/Image/Home1.jpg", "/Image/Home1.jpg"]
    },
    {
      type: "Resort",
      description: "A luxury resort with serene views and world-class amenities.",
      price: "$3,000,000",
      size: "5000 sq.ft",
      bed: "8 rooms",
      bath: "6 baths",
      rating: "(4.9/5.0)",
      flooring: "Tiled",
      furnishing: "Fully Furnished",
      landmark: "Near Beachfront",
      images: ["/Image/Resort1.jpg", "/Image/Resort1.jpg", "/Image/Resort1.jpg"]
    },
    {
      type: "Luxury Apartment",
      description: "A luxury apartment located in the heart of the city, with panoramic views and premium amenities.",
      price: "$850,000",
      size: "1800 sq.ft",
      bed: "3 bed",
      bath: "2 bath",
      rating: "(5.0/5.0)",
      flooring: "Marble",
      furnishing: "Partially Furnished",
      landmark: "Near Downtown Mall",
      images: ["/Image/Ap1.jpg", "/Image/Ap1.jpg", "/Image/Ap1.jpg" ]
    },
    {
      type: "Commercial Office Space",
      description: "A premium office space in a prime business location with modern facilities and excellent accessibility.",
      price: "$2,000,000",
      size: "3500 sq.ft",
      bed: "5 offices",
      bath: "3 bath",
      rating: "(4.8/5.0)",
      flooring: "Carpeted",
      furnishing: "Unfurnished",
      landmark: "Opposite City Bank Tower",
      images: ["/Image/img.jpg", "/Image/img.jpg", "/Image/img.jpg"]
    }
  ];

  // Group properties by type (e.g., Modern Smart Homes, Resorts, etc.)
  const groupedProperties = properties.reduce((acc, property) => {
    const { type } = property;
    if (!acc[type]) acc[type] = [];
    acc[type].push(property);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      {Object.keys(groupedProperties).map((propertyType) => (
        <Box key={propertyType} mb={4}>
          <Typography variant="h4" gutterBottom>
            {propertyType}
          </Typography>
          <Grid container spacing={4}>
            {groupedProperties[propertyType].map((property, propertyIndex) => (
              property.images.map((img, imgIndex) => (
                <Grid item xs={12} sm={6} md={4} key={`${propertyIndex}-${imgIndex}`}>
                  <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={img}
                      alt={property.type}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {property.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {property.description}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Price:</strong> {property.price}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Size:</strong> {property.size}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Bedrooms:</strong> {property.bed}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Bathrooms:</strong> {property.bath}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Rating:</strong> {property.rating}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Flooring:</strong> {property.flooring}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Furnishing:</strong> {property.furnishing}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Landmark:</strong> {property.landmark}
                      </Typography>
                      <Button size="small" variant="contained" color="primary">
                        Contact Agent
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ))}
          </Grid>
        </Box>
      ))}
    </div>
  );
};

export default Prop;
