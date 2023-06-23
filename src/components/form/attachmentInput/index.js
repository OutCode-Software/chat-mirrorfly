import React, { useEffect } from "react";
import styles from "./imageVideoInput.module.scss";
import { FcDocument } from "react-icons/fc";
import { Text, Flex, Box } from "@chakra-ui/react";
import style from "./imageVideoInput.module.scss";
import { CgAttachment } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function AttachmentInput(props) {
  const { setFileInput, jid, isFileUpload } = props;
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const [uploadFile, setUploadFile] = React.useState({
    src: "",
    type: "",
    name: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const typeExtract = file?.type.indexOf("/");
    let fileType = "";
    if (typeExtract !== -1) {
      fileType = file?.type.substring(0, typeExtract);
    }

    setFileInput({ type: fileType, src: file, name: file.name });

    setUploadFile({ type: fileType, src: url, name: file.name });
    setSource(url);
    // event.target.value = null;
  };
  console.log("---", uploadFile);

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  const handleDelete = () => {
    setUploadFile({});
  };
  // useEffect(() => {
  //   setUploadFile({});
  // }, [jid, isFileUpload]);
  return (
    <Box zIndex={5} cursor="pointer" width={"auto"}>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mp4,.jpg,.png,.jpeg,.pdf,.doc,.xls,.csv,.ppt,.txt"
      />
      {uploadFile && (
        <Box className={style.imageWrapper}>
          <Box
            onClick={handleDelete}
            zIndex={5}
            position={"absolute"}
            top={"-10px"}
            right={"-10px"}
            color={"#000"}
          >
            <AiOutlineCloseCircle />
          </Box>
          {uploadFile.type === "video" ? (
            <video
              className="VideoInput_video"
              width="100%"
              height={"200px"}
              controls
              src={uploadFile.src}
            />
          ) : uploadFile.type === "image" ? (
            <img alt={uploadFile.type} src={uploadFile.src} />
          ) : uploadFile.type === "application" ||
            uploadFile.type === "text" ? (
            <a href={uploadFile.src} download={uploadFile.name}>
              <Flex alignItems={"center"}>
                {" "}
                <Box fontSize={"36px"}>
                  <FcDocument height={"22px"} />
                </Box>{" "}
                <Text>{uploadFile.name}</Text>
              </Flex>
            </a>
          ) : (
            ""
          )}
        </Box>
      )}

      <Box
        onClick={handleChoose}
        zIndex={5}
        position={"absolute"}
        bottom={"22px"}
        left={"16px"}
        color={"#000"}
      >
        <CgAttachment />
      </Box>
    </Box>
  );
}
