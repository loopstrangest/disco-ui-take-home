import * as React from "react";
import { Box, Typography } from "@mui/material";

import { VC, Profile } from "../../types";
import { IssueCredentialForm } from "./IssueCredentialForm";
import { DiscoButton } from "../DiscoButton";

// @NOTE: You will use this component to display the credential in the Review step
import { Credential } from "./Credential";
import { EXAMPLE_CREDENTIAL } from "../../utils/";

// @NOTE: You will use this async function from the Review step, and when it returns, this component should advance to the Success step
import { signVc } from "../../utils/";

// @NOTE: You will edit and use this component in the Success step
import { Success } from "../Success";

export interface IssueCredentialFlowProps {
  issuer: string;
  recipient: Profile; // @NOTE: This prop contains information (name, profile image URL) about the recipient of the issued credential that you may use in the success step
  initialCredential: VC;
}

export const IssueCredentialFlow: React.FC<IssueCredentialFlowProps> = (props) => {
  const [cred, setCred] = React.useState(props.initialCredential);
  const [profile, setProfile] = React.useState(props.recipient);
  const [step, setStep] = React.useState("EDIT");
  
  const editStep =
    <Box>
      <Typography variant="h6">Issue Kudos Credential</Typography>

      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Fill out the credential details:
      </Typography>

      <IssueCredentialForm cred={cred} onChange={setCred}/>

      <DiscoButton onClick={() => changeStep("REVIEW")}>Review</DiscoButton>
    </Box>;
  
  const reviewStep =
    <Box>
      <Typography variant="h6">Review Credential</Typography>

      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Make sure the information is correct:
      </Typography>

      <Credential cred={cred}></Credential>

      <DiscoButton onClick={() => changeStep("SUCCESS")}>Issue Credential</DiscoButton>
    </Box>;
    
  const successStep =
    <Box>
      <Success cred={cred} credType="Kudos" profile={profile} >
        <DiscoButton onClick={() => changeStep("EDIT")}>Close</DiscoButton>What!
      </Success>
    </Box>;
    
  const changeStep = (step: string) =>{
    if(step === "EDIT"){
      setCred(EXAMPLE_CREDENTIAL);
    } else if(step === "SUCCESS"){
      signVc(cred);
    }
    setStep(step);
    
  }
  
  
  return (
    <div>
      {step === "EDIT" ? editStep : null}
      {step === "REVIEW" ? reviewStep : null}
      {step === "SUCCESS" ? successStep : null}
    </div>
    )
  
  /*
  return (
    <Box>
      <Typography variant="h6">Issue Kudos Credential</Typography>

      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Fill out the credential details:
      </Typography>

      <IssueCredentialForm cred={cred} onChange={setCred}/>

      <DiscoButton onClick={() => console.log("clicked! VC:", cred, "recipient:", props.recipient)}>Review</DiscoButton>
    </Box>
  );
  */
};
