import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { VC, Profile } from "../types";
import { DiscoButton } from "./DiscoButton";


export interface SuccessProps {}

export const Success: React.FC<{cred: VC, credType: string, profile: Profile}> = ({cred, credType, profile}) => {
  return <Box sx={{ padding: "16px", background: "#3A3E40" }}>
    <Typography variant="h4" sx={{textAlign: "center", marginBottom:"8px"}}>Success!</Typography>
    <Typography variant="h6" sx={{textAlign: "center", marginBottom: "2px"}}>{credType} sent to:</Typography>
    <Avatar sx={{ margin:"auto", borderRadius:"8px", height:"100px", width:"100px", marginBottom: "4px"}}
          alt={profile.name}
          src={profile.avatarUrl}
          variant="square"
        />
    <Typography variant="body1" sx={{textAlign: "center", marginBottom: "2px", fontWeight:"bold"}}>{profile.name}</Typography>
    <Typography variant="body1" sx={{textAlign: "center", marginBottom: "8px"}}>{cred.credentialSubject.id}</Typography>
    <Typography variant="h6" sx={{textAlign: "center", marginBottom: "2px"}}>{credType}:</Typography>
    <Typography variant="body1" sx={{textAlign: "center", marginBottom: "16px"}}>{cred.credentialSubject.kudos}</Typography>
    <DiscoButton>Close</DiscoButton>
  </Box>;
};
