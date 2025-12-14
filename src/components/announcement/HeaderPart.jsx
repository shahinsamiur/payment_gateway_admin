import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HeaderPart = ({ onAdd }) => {
  const { siteData } = useSelector((state) => state.auth);

  return (
    <Card>
      <CardContent>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">
            {siteData?.site_name} Announcements
          </Typography>

          <Tooltip title="Add Announcement" placement="top" arrow>
            <span>
              <Button variant="contained" onClick={onAdd} startIcon={<Add />}>
                Add
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HeaderPart;
