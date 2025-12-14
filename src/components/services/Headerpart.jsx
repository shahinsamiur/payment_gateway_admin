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

const Headerpart = ({ onOpenAddModal, disabled }) => {
  const { siteData } = useSelector((state) => state.auth);

  return (
    <Card>
      <CardContent>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{siteData?.site_name} Services</Typography>

          <Tooltip title="You can add maximum 3 services" placement="top" arrow>
            <span>
              <Button
                variant="contained"
                onClick={onOpenAddModal}
                startIcon={<Add />}
                disabled={disabled}
              >
                Add
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Headerpart;
