// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid, Container, CircularProgress,
// } from '@mui/material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CloseIcon from '@mui/icons-material/Close';
// import img from './Blood.jpg';
// import axios from "axios";
//
// const MyForm = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);
//   const fileInputRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };
//
//   const handleRemoveImage = () => {
//     setSelectedFile(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };
//
//   const handleDownload = () => {
//       setLoading(true)
//     if (selectedFile) {
//       const formData = new FormData()
//       formData.append('image',selectedFile)
//       formData.append('name',name)
//       formData.append('contact',contact)
//       axios.post('https://blood-donation-be.onrender.com/api/card',formData).then((res) => console.log(res))
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//
//       // Load the background image
//       const backgroundImage = new Image();
//       backgroundImage.src = img;
//
//       // Load the uploaded image
//       const imgElement = new Image();
//       imgElement.src = imagePreview;
//
//       // When both images are loaded, draw them on the canvas
//       backgroundImage.onload = () => {
//         canvas.width = backgroundImage.width;
//         canvas.height = backgroundImage.height + 30; // Extra space for the name
//
//         // Draw the background image
//         ctx.drawImage(backgroundImage, 0, 0);
//
//         imgElement.onload = () => {
//           const profilePicSize = 100; // Set desired size for profile picture
//           const profilePicX = (canvas.width - profilePicSize) / 2; // Center the profile picture
//           const profilePicY = (canvas.height - profilePicSize - 20); // Position above the name
//
//           // Draw the profile picture, resizing to fit the frame
//           ctx.drawImage(
//             imgElement,
//             0, 0, imgElement.width, imgElement.height, // Source image dimensions
//             profilePicX, profilePicY, profilePicSize, profilePicSize // Destination position and size
//           );
//
//           // Set text properties
//           ctx.fillStyle = 'white'; // Text color
//           ctx.font = '20px Arial';
//           ctx.textAlign = 'center'; // Center align text
//           ctx.fillText(name, canvas.width / 2, profilePicY + profilePicSize + 20); // Draw name below the image
//
//           // Create a download link
//           canvas.toBlob((blob) => {
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = `${name}.png`; // File name for download
//             link.click();
//             URL.revokeObjectURL(link.href); // Cleanup
//             setLoading(false)
//           });
//         };
//       };
//     } else {
//       console.log('No file selected');
//     }
//   };
//
//   return (
//     <Grid container py={5}>
//       <Grid item xs={12} lg={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: {lg:'end',xs:"center"}}}>
//         <Box position={'relative'}>
//
//           <Box sx={{height:{lg:'100%'},width: {md:750,xs:'100%'}}}>
//             <img src={img} alt="image-preview" height={'100%'} width={'100%'} style={{objectFit:"contain"}} />
//
//             {imagePreview && (
//               <Typography component={"img"} src={imagePreview} sx={{ position: 'absolute', top: {lg:'45%',md:'44.7%',sm:"45.3%",xs:"45%"}, right: {lg:'4.7%',md:"4.8%",sm:"5.2%",xs:"5%"}, height: {lg:'26%',md:"26%",sm:"25%",xs:"25%"}, width: {lg:'26%',md:"26%",sm:"25%",xs:"25%"}, borderRadius: '50%' }} />
//             )}
//
//           </Box>
//           <Box >
//
//         <input
//           value={name}
//           style={{
//             position: 'absolute',
//             bottom: '24%',
//             right: "8.5%",
//             width: '18%',
//             border: "none",
//             backgroundColor: "transparent",
//             outline: "none",
//             color: "white",
//             textAlign:"center"
//           }}
//         />
//           </Box>
//         </Box>
//       </Grid>
//       <Grid item xs={12} lg={5} >
//         <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:"center", mt: 4 }}>
//           <Card variant="outlined" sx={{ width: {md:'400px',xs:"100%"}, p: 2, mb: 4 }}>
//             <Typography variant="h6">Upload Profile Pic</Typography>
//             <Typography variant="body2" color="textSecondary">
//               આપણી ફોટો અહીં મૂકો. <br />
//               Click on the upload icon to upload profile pic.
//             </Typography>
//             <Box
//               sx={{
//                 border: '1px dashed grey',
//                 borderRadius: '8px',
//                 mt: 2,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '150px',
//                 position: 'relative'
//               }}
//             >
//               {!imagePreview ? (
//                 <>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     style={{ display: 'none' }}
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                   <Button startIcon={<UploadFileIcon />} variant="contained" onClick={handleUploadClick}>
//                     + Upload
//                   </Button>
//                 </>
//               ) : (
//                 <Box sx={{ position: 'relative' }}>
//                   <img
//                     src={imagePreview}
//                     alt="Selected Preview"
//                     style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
//                   />
//                   <IconButton
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       right: 0,
//                       backgroundColor: 'white',
//                       borderRadius: '50%',
//                       boxShadow: 1,
//                       zIndex: 1,
//                       '&:hover': {
//                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                       }
//                     }}
//                     onClick={handleRemoveImage}
//                   >
//                     <CloseIcon />
//                   </IconButton>
//                 </Box>
//               )}
//             </Box>
//           </Card>
//
//           <Card variant="outlined" sx={{ width: {md:'400px',xs:"100%"}, p: 2 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Enter Your Name Here
//               </Typography>
//               <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//                 આપનું નામ અહીં લખો.
//               </Typography>
//               <TextField
//                 label="Name"
//                 variant="outlined"
//                 fullWidth
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Enter Your Phone No. Here
//               </Typography>
//               <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//                 આપનો ફોન નંબર અહીં લખો.
//               </Typography>
//               <TextField
//                 label="Phone No."
//                 variant="outlined"
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//                 fullWidth
//               />
//             </CardContent>
//           </Card>
//
//           <Button variant="contained" sx={{ mt: 3 }} onClick={handleDownload} disabled={(!selectedFile || !name || !contact)}>
//             {loading ? <CircularProgress size={24} /> : 'Download'}
//           </Button>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };
//
// export default MyForm;
import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid, Container, CircularProgress,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import img from './Blood.jpg';
import axios from "axios";
import html2canvas from "html2canvas";

const MyForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const gradientRef = useRef(null)
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [contactErrorMsg, setContactErrorMsg] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDownloadGradient = () => {
    setLoading(true)
    if(contactErrorMsg){
      alert(contactErrorMsg)
    }
    else {

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('name', name);
      formData.append('contact', contact);

      axios.post('https://blood-donation-be.onrender.com/api/card', formData).then((res) => {
        const imageWidth = 1600
        html2canvas(gradientRef.current, {
          scale: imageWidth / gradientRef.current.offsetWidth
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png")

          const downloadLink = document.createElement("a")
          downloadLink.href = imgData
          downloadLink.download = "image.png"
          downloadLink.click()
          setLoading(false)
          setName('')
          setContact('')
          setSelectedFile(null);
          setImagePreview(null);
        })
        }
      ).catch((err) => setLoading(false));}

  }}
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^[0-9]{10}$/;
    setContact(value);
    if (!phoneRegex.test(value)) {
      setContactError(true);
      setContactErrorMsg('Please enter a valid 10-digit phone number.');
    } else {
      setContactError(false);
      setContactErrorMsg('');
    }
  console.log(setContactErrorMsg)

  };
  return (
    <Grid container py={5}>
      <Grid item xs={12} lg={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: {lg:'end',xs:"center"}}}>
        <Box position={'relative'} ref={gradientRef}>

          <Box sx={{height:{lg:'100%'},width: {md:750,xs:'100%'}}} >
            <img src={img} alt="image-preview" height={'100%'} width={'100%'} style={{objectFit:"contain"}} />

            {imagePreview && (
              <Typography component={"img"} src={imagePreview} sx={{ position: 'absolute', top: {sm:"8.3%",xs:"8%"}, right: {xs:"5.1%"}, height: "24%", width: '24%', borderRadius: '50%' }} />
            )}

          </Box>
          <Box
            sx={{
              width: '35%',
              position: 'absolute',
              top: { sm: '34%', xs: "33%" },
              right: "1.5%",
              display: 'flex',
              justifyContent: 'center', // Center the content horizontally
              alignItems: 'center', // Center the content vertically
              marginBottom: { sm: '20px', xs: '15px' },
              '& input': {
                textAlign: "center", // Center text inside the input
                width: '100%',
                py: { md: 1, xs: 0.5 },
                height: "18px",
                border: "none",
                borderRadius: 1,
                backgroundColor: "#00421E",
                outline: "none",
                color: "white",
                fontSize: {
                  xs: '10px',  // Small screens
                  sm: '12px',  // Medium screens
                  md: '14px',  // Larger screens
                  lg: '16px'   // Very large screens
                }
              }
            }}
          >
            <input value={name} id='heet' />
          </Box>

        </Box>
      </Grid>
      <Grid item xs={12} lg={5} >
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:"center", mt: 4 }}>
          <Card variant="outlined" sx={{ width: {md:'400px',xs:"100%"}, p: 2, mb: 4 }}>
            <Typography variant="h6">Upload Profile Pic</Typography>
            <Typography variant="body2" color="textSecondary">
              આપનો ફોટો અહીં મૂકો. <br />
              Click on the upload icon to upload profile pic.
            </Typography>
            <Box
              sx={{
                border: '1px dashed grey',
                borderRadius: '8px',
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
                position: 'relative'
              }}
            >
              {!imagePreview ? (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Button startIcon={<UploadFileIcon />} variant="contained" onClick={handleUploadClick}>
                    + Upload
                  </Button>
                </>
              ) : (
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="Selected Preview"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: 1,
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      }
                    }}
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Card>

          <Card variant="outlined" sx={{ width: {md:'400px',xs:"100%"}, p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Enter Your Name Here
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                આપનું નામ અહીં લખો.
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography variant="h6" sx={{ mb: 1 }}>
                Enter Your Phone No. Here
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                આપનો ફોન નંબર અહીં લખો.
              </Typography>
              <TextField
                label="Phone No."
                variant="outlined"
                value={contact}
                onChange={(e) => handlePhoneChange(e)}
                error={contactError}
                helperText={contactError ? contactErrorMsg : ''}
                fullWidth
              />
            </CardContent>
          </Card>

          <Button variant="contained" sx={{ mt: 3 }} onClick={handleDownloadGradient} disabled={(!selectedFile || !name || !contact || loading)}>
             Download
          </Button>

        </Container>
      </Grid>
    </Grid>
  );
};

export default MyForm;
