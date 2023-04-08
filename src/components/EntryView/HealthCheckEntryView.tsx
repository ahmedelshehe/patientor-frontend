import { HealthCheckEntry} from './../../types'
import { Box ,Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
    entry : HealthCheckEntry
}
const HealthCheckEntryView = ({entry} : Props) => {
    const iconColor = entry.healthCheckRating === 0 ? "green"  : entry.healthCheckRating === 1 ?  "yellow" : "grey";
    return (
        <>
        <Box sx={{ ...commonStyles }} >
            <div style={{display:'flex',justifyItems:"center",alignItems:"center"}}>
                <Typography variant="body1" style={{ marginTop: "0.5em" ,fontSize:"20px" }}>{entry.date}</Typography>
                <LocalHospitalIcon fontSize='large' color="secondary" />
            </div>
            <br />
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>{entry.description}</Typography> <br />
            <FavoriteIcon style={{ color : iconColor }}/>
            <Typography variant="h5" style={{ marginTop: "0.2em"}}>diagnose by {entry.specialist}</Typography> 
        </Box>
        </>
    );
}
export default HealthCheckEntryView