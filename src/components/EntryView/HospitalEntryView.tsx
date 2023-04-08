import { HospitalEntry } from './../../types'
import { Box ,Typography } from '@mui/material';
import HealingIcon from '@mui/icons-material/Healing';
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
    entry : HospitalEntry
}
const HospitalEntryView = ({entry} : Props) => {
    return (
        <>
        <Box sx={{ ...commonStyles }} >
            <div style={{display:'flex',justifyItems:"center",alignItems:"center"}}>
                <Typography variant="body1" style={{ marginTop: "0.5em" ,fontSize:"20px" }}>{entry.date}</Typography>
                <HealingIcon fontSize='large' color="secondary" />
            </div>
            <br />
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>{entry.description}</Typography> <br />
            <Typography variant="body1" style={{ marginTop: "0.2em" }}>{entry.discharge.criteria}</Typography> <br />
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>diagnose by {entry.specialist}</Typography> 
        </Box>
        </>
    );
}
export default HospitalEntryView