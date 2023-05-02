import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../InputComponent/InputField";
import SDK from "../../../chatSDK";
import ImageInput from "../InputComponent/ImageInput";

const ProfileUpdate = () => {
const [fileInput,setFileInput] = useState();
console.log("fileInput",fileInput)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = event.target;

    const formData = new FormData();
    formData.name = values.name.value
    formData.image = fileInput
    formData.status= values.status.value
    formData.mobileNumber= values.mobileNumber.value
    formData.email= values.email.value

    const payload = {
      name: values.name.value,
      fileInput,
      status: values.status.value,
      mobileNumber: values.mobileNumber.value,
      email: values.email.value,
    };
    console.log("payload",formData);

    const response = await SDK.setUserProfile(
      values.name.value,
      fileInput,
      values.status.value,
      values.mobileNumber.value,
      values.email.value
      // formData
    );
    console.log("response",response);
  };
  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box padding={"20px"}>
        <form onSubmit={handleSubmit}>
          <Box gap={"16px"} display={"grid"}>
            <InputField
              placeholder={"Full Name"}
              label={"Full Name"}
              name={"name"}
            />
            <ImageInput label={"Profile Picture"} setFileInput={setFileInput} />

            <InputField
              placeholder={"Status"}
              label={"Status"}
              name={"status"}
            />
            <InputField
              placeholder={"Mobile Number"}
              label={"Mobile Number"}
              name={"mobileNumber"}
            />
            <InputField
              placeholder={"Email"}
              label={"Email"}
              type={"email"}
              name={"email"}
            />
            <Button colorScheme="blue" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Box>
      <Box></Box>
    </SimpleGrid>
  );
};

export default ProfileUpdate;
