import { Box, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone';
const imageWrapper ={
    display: "flex",
  justifyContent: "center",
    alignItems: "center",
    height: "200px",
    width: "250px",
    position: "relative",
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: "flex",
  minWidth: "240px",
  overflow: "hidden",
  width: "250px",
  height: "200px",
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
};

const img = {
  display: "block",
  width: "100%",
  objectFit: "cover",
  height: "100%",
  padding: "6px 6px 8px 6px",
};

const ImageInput = ({setFileInput,label}) => {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
          // console.log("acceptedFiles",acceptedFiles)
        },
      });
      setFileInput(files[0])
      const thumbs = files.map(file => (
        <div  key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              alt="img"
              // Revoke data uri after image is loaded
              onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
          </div>
        </div>
      ));
      useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount()
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);


    
  return (
    <FormControl>
     {label && <FormLabel>{label}</FormLabel>}

    <Box style={imageWrapper} className="container" border={"1px dashed #bbb"}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Flex height={"200px"} width={"250px"} alignItems={"center"} justifyContent={"center"}>Upload Image</Flex>
      </div>
      <aside style={thumbsContainer} {...getRootProps({className: 'dropzone'})}>
        {thumbs}
      </aside>
    </Box> 
    </FormControl> 
    
    )
}

export default ImageInput