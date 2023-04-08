import { OccupationalHealthcareEntry } from './../../types'
import { Box ,Typography } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    border: 1 , 
    borderRadius:"15px",
    minWidth:"60vw",
    padding:"0.5em"
};
interface Props {
    entry : OccupationalHealthcareEntry
}
const OccupationalHealthcareEntryView = ({entry} : Props) => {
    return (
        <>
        <Box sx={{ ...commonStyles }} >
            <div style={{display:'flex',justifyItems:"center",alignItems:"center"}}>
                <Typography variant="body1" style={{ marginTop: "0.5em" ,fontSize:"20px" }}>{entry.date}</Typography>
                <BusinessCenterIcon fontSize='large' style={{color : 'black'}} />
                <Typography variant="body1" style={{ marginTop: "0.5em" ,fontSize:"20px" }}>{entry.employerName}</Typography>
            </div>
            <br />
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>{entry.description}</Typography> <br />
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>diagnose by {entry.specialist}</Typography> 
        </Box>
        </>
    );
}
export default OccupationalHealthcareEntryView