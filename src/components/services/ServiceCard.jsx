import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ServiceCard = ({ service, onDelete, deletingId, onEdit }) => {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            {service.title}
          </Typography>
          <Typography variant="subtitle2" align="center" color="textSecondary">
            {service.description}
          </Typography>
          <Stack mt={2} spacing={1}>
            {service.features.map((feature, index) => (
              <Typography key={index}>
                {index + 1}. {feature}
              </Typography>
            ))}
          </Stack>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          p={1}
          gap={1}
          bgcolor="secondary.main"
        >
          <Button
            onClick={() => onEdit(service)}
            size="small"
            variant="contained"
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<Delete />}
            loading={deletingId === service.id}
            onClick={() => onDelete(service.id)}
          >
            Delete
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default ServiceCard;
