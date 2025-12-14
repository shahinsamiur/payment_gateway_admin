import { Grid } from "@mui/material";
import React from "react";
import NoServices from "./NoServices";
import ServiceCard from "./ServiceCard";

const ServicesContent = ({ data, onDelete, deletingId, onEdit }) => {
  if (!data.length) return <NoServices />;

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <ServiceCard
          key={item.id}
          service={item}
          onDelete={onDelete}
          deletingId={deletingId}
          onEdit={onEdit}
        />
      ))}
    </Grid>
  );
};

export default ServicesContent;
