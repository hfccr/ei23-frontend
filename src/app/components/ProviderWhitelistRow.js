import React from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetClientWhitelistRequests } from "@/hooks/useSubsidyDao";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SubsidyDao from "@/constants/SubsidyDao.json";
import { usePrepareContractWrite } from "wagmi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContractWrite } from "wagmi";
import { useWaitForTransaction } from "wagmi";

export const ProviderWhitelistRow = ({ request, index }) => {
  const [open, setOpen] = React.useState(false);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: SubsidyDao.address,
    abi: SubsidyDao.abi,
    functionName: "approveStorageProviderWhitelistRequest",
    args: [index],
    enabled: !request.approved,
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Storage Provider: {request.storageProviderId.toString()}
          </DialogTitle>
          <DialogContent>
            <Typography>Owner Name: Providerx</Typography>
            <Typography>Organization Website: providerx.com</Typography>
            <Typography>Email: hiddlehoogland@gmail.com</Typography>
            <Typography>Region: USA</Typography>
            <DialogContentText></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
      <ListItem
        key={index}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            disabled={request.approved || isLoading || isSuccess}
            onClick={(e) => {
              e.preventDefault();
              write?.();
            }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleOpen} dense>
          <ListItemIcon>
            <RemoveRedEyeIcon />
          </ListItemIcon>
          <ListItemText
            id={index}
            primary={`${request.storageProviderId.toString()} ${
              isLoading ? "Approving" : ""
            } ${isSuccess ? "Approved" : ""}`}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};
