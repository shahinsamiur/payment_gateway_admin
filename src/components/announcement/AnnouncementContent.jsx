import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const AnnouncementContent = ({ data, onEdit, onDelete, deletingId }) => {
  return (
    <Card>
      <CardContent>
        <List>
          {data.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">{item}</Typography>
              <Stack gap={1} direction="row">
                <Button
                  onClick={() => onEdit({ index, announcement: item })}
                  color="primary"
                  startIcon={<Edit />}
                  size="small"
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  loading={deletingId === index}
                  color="error"
                  onClick={() => onDelete(index)}
                  startIcon={<Delete />}
                  size="small"
                  variant="contained"
                >
                  Delete
                </Button>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AnnouncementContent;
