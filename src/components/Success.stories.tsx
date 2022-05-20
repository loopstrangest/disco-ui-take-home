import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";
import { Success } from "./Success";
import { EXAMPLE_CREDENTIAL } from "../utils/";
import { VC, Profile } from "../types";

export default {
  title: "Disco Elements",
  component: Success,
} as ComponentMeta<typeof Success>;

const EXAMPLE_PROFILE: Profile = {
  did: "",
  name: "Chanel Toris",
  bio: "",
  avatarUrl: "",
};

const Template: ComponentStory<typeof Success> = () => <Success cred={EXAMPLE_CREDENTIAL} credType="Kudos" profile={EXAMPLE_PROFILE}></Success>;

export const success = Template.bind({});
