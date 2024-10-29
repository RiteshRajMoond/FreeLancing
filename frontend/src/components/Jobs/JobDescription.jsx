import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent, Stack, Button, Divider,Avatar } from "@mui/material";
import { LocationOn, Star, Verified, Email, Phone, Person, Chat } from "@mui/icons-material";

const JobDescription = () => {
  const location = useLocation();
  const { job } = location.state || {};
  console.log("Received job data:", job);
  
  const [status, setStatus] = useState("open");

  if (!job) {
    return <Typography variant="h5">No job data available</Typography>;
  }

  const containerStyle1 = {
    marginTop: "-10vh",
    marginLeft:"5%",
    maxWidth: "60%",
  }

  const containerStyle2 = {
    marginLeft:"-5%",
    marginTop: "3vh",
    maxWidth: "30%",
  }

  const dividerStyle = {
    backgroundColor: "#b7b7b7",
    marginTop: "2.5vh",
    height:"0.5px",
  };

  return (
    <>
      <Card style={{ height: "30vh", position: "relative", overflow: "hidden" }}>
        <img src="../../assets/bg5.jpg" alt="Background" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}/>
      </Card>

      <Stack direction="row">

      <Container style={containerStyle1}>
        <Card style={{ padding: "1.5rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", position: "relative", backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
          <CardContent>

            <Stack direction="row">
            <Typography variant="h4" style={{ fontFamily:"fantasy" }}>
              {job.title}
            </Typography>
            <Stack  style={{ fontWeight: "bold", marginLeft:"53%",textAlign:"right" , fontFamily:"fantasy", marginTop:"8px"}}>
            <Typography variant="h5" style={{fontFamily:"fantasy"}}>
              Budget: ${job.budget}
            </Typography>
            <Typography variant="body" style={{fontWeight:"lighter"}}>
              paid on delivery
            </Typography>
            </Stack>
            </Stack>

            <Stack direction="row" style={{marginTop:"3vh"}} spacing={2}>
            <Button variant="contained" style={{backgroundColor:"#79d37f", borderRadius:"20px", height:"30px" , marginTop:"-13px"}}>{status}</Button>
            <Typography variant="body2" color="text.secondary">Posted on: {new Date(job.createdAt).toLocaleString()}</Typography>

            <Typography variant="body2" color="text.secondary">• Ends on :{new Date(job.deadline).toLocaleString()}</Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary" style={{ marginBottom: "10px", marginTop:"20px" }}>
              <strong>Description:</strong> {job.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque ipsam libero beatae, facilis molestiae quae voluptates nisi accusantium? Consequuntur dolor quibusdam dignissimos pariatur fuga odit minima earum sapiente facere qui!
              Non, maiores! Temporibus quae voluptas magnam, delectus eveniet distinctio exercitationem, inventore vitae quam dolorum omnis nulla sunt, quisquam unde accusamus molestias harum laudantium id? Facere quisquam consequatur repellat tempora magni.
            </Typography>
            
            <Typography variant="body1" color="text.secondary" style={{ marginBottom: "10px" }}>
              <strong>Requirements:</strong><br/>
              {job.requirements.map((requirement, index) => (
              <Button key={index} variant="outlined" style={{ margin: "5px", borderRadius: "20px", textTransform: "capitalize" }}> {requirement} </Button>
              ))}
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{ marginBottom: "10px" }}>
              <strong>Key Features:</strong> 
            </Typography>
           
            <Typography variant="body1" color="text.secondary">
              <strong>Posted by:</strong> {job.postedBy ? job.postedBy.email : "Unknown"}
            </Typography>
          
          </CardContent>
        </Card>
      </Container>


      <Container style={containerStyle2}>
        <Button fullWidth variant="contained" style={{ height: "50px" }}>
          Select this project
        </Button>
        <Divider style={dividerStyle} />
  
        <Typography variant="h6" style={{ fontFamily: "fantasy", marginBottom: "10px" }} color="initial">
          About the client
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} style={{ marginBottom: "10px" }}>
          <Avatar>{job.postedBy.firstName ? job.postedBy.firstName.charAt(0) : "C"}</Avatar>
          <Typography variant="body1"> {job.postedBy.firstName || "Unknown Client"} {job.postedBy.lastName || " "}</Typography>
        </Stack>
            
        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary"> {job.postedBy.address || "Location not provided"} </Typography>
        </Stack>
      
        <Typography variant="body2" color="text.secondary" style={{ marginBottom: "10px" }}>
         🕛 Member since: {job.postedBy.createdAt || "Unknown Date"}
        </Typography>

        <Divider style={dividerStyle} />

        <Typography variant="h6" style={{ fontFamily: "fantasy", marginBottom: "10px" }} color="initial">
          Client Verification
        </Typography>

        <Stack direction="column" spacing={1} style={{ marginTop: "20px" }}>
          <Stack direction="row" spacing={1}>
            <Verified color="action" />
            <Typography variant="body2" color="text.secondary"> verified by freelancehub </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Email color="action" />
            <Typography variant="body2" color="text.secondary"> {job.postedBy.email || "NA"} </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Person color="action" />
            <Typography variant="body2" color="text.secondary"> {job.postedBy.portfolio || "NA"} </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Phone color="action" />
            <Typography variant="body2" color="text.secondary"> {job.postedBy.phoneNumber || "NA"} </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chat color="action" />
            <Typography variant="body2" color="text.secondary"> {job.postedBy.socialMedia || "NA"} </Typography>
          </Stack>
        </Stack>
      </Container>

      </Stack>
    </>
  );
};

export default JobDescription;
