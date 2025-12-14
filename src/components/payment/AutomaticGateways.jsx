import AddUpdateMobileBank from "@/components/payment/AddUpdateMobileBank";
import { config } from "@/config/config";
import {
  useUpdateApayBankingStatusMutation,
  useUpdateApayGatewayMutation,
  useUpdatePassimpayBankingStatusMutation,
  useUpdatePassimPayGateWayMutation,
} from "@/redux/features/financials";
import { EditSquare, Visibility } from "@mui/icons-material";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Switch from "../common/Switch";
import AutomaticGateWayDetails from "./AutomaticGateWayDetails";
import EditAutomaticGateway from "./EditAutomaticGateway";

export default function AutomaticGateways({ data, isLoading, type }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Gateway</TableCell>
              <TableCell>Deposit Enabled</TableCell>
              <TableCell>Withdraw Enabled</TableCell>
              <TableCell>Modified Date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.length ? (
              data.map((item) => <List key={item.id} item={item} type={type} />)
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showAddModal && (
        <AddUpdateMobileBank
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}

function List({ item, type }) {
  const [editGatewayData, setEditGatewayData] = useState(null);
  const [updateApayGateWayStatus] = useUpdateApayBankingStatusMutation();
  const [updatePassimpayGateWayStatus] =
    useUpdatePassimpayBankingStatusMutation();
  const [updatePassimpayGateway] = useUpdatePassimPayGateWayMutation();
  const [updateApayGateway] = useUpdateApayGatewayMutation();
  const [showDetails, setShowDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(-1);

  async function handleUpdateStatus(id) {
    try {
      setIsUpdating(id);
      if (type === "apay") {
        await updateApayGateWayStatus(id).unwrap();
      } else if (type === "passimpay") {
        await updatePassimpayGateWayStatus(id).unwrap();
      }
      toast.success("Payment gateway status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsUpdating(-1);
    }
  }

  async function handleUpdateActivation({ id, data }) {
    try {
      setIsUpdating(id);
      if (type === "apay") {
        await updateApayGateway({ id, data }).unwrap();
      } else if (type === "passimpay") {
        await updatePassimpayGateway({ id, data }).unwrap();
      }

      toast.success("Payment gateway status updated successfully");
    } catch (error) {
      toast.error(
        error.message || error.data?.message || "Internal Server Error"
      );
    } finally {
      setIsUpdating(-1);
    }
  }

  return (
    <>
      <TableRow key={item.id}>
        <TableCell>
          <Image
            src={config.fileBaseUrl + item.image_url}
            width={100}
            height={50}
            alt={item.name}
            style={{ objectFit: "contain" }}
          />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <Switch
            onChange={() =>
              handleUpdateActivation({
                id: item.id,
                data: { deposit: item.deposit ? 0 : 1 },
              })
            }
            disabled={isUpdating === item.id}
            sx={{ cursor: "default" }}
            checked={item.deposit || false}
          />
        </TableCell>
        <TableCell>
          <Switch
            disabled={isUpdating === item.id}
            onChange={() =>
              handleUpdateActivation({
                id: item.id,
                data: { withdrawal: item.withdrawal ? 0 : 1 },
              })
            }
            sx={{ cursor: "default" }}
            checked={item.withdrawal || false}
          />
        </TableCell>
        <TableCell>
          {new Date(item.updated_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </TableCell>
        <TableCell>
          <Switch
            onChange={() => handleUpdateStatus(item.id)}
            disabled={isUpdating === item.id}
            checked={item.is_active || false}
          />
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              color="info"
              startIcon={<EditSquare fontSize="small" />}
              onClick={() => setEditGatewayData(item)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<Visibility fontSize="small" />}
              onClick={() => setShowDetails(item)}
            >
              View
            </Button>
          </Stack>
        </TableCell>
      </TableRow>

      {!!showDetails && (
        <AutomaticGateWayDetails
          open={!!showDetails}
          onClose={() => setShowDetails(null)}
          item={showDetails}
        />
      )}

      {!!editGatewayData && (
        <EditAutomaticGateway
          open={!!editGatewayData}
          onClose={() => setEditGatewayData(null)}
          item={editGatewayData}
          type={type}
        />
      )}
    </>
  );
}
