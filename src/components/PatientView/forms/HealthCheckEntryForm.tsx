import { Box, Button, FormControlLabel, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from 'react';
import { Diagnosis, Entry, HealthCheckRating, NewEntry } from "../../../types";
import DiagnosisListInput from "./DiagnosisListInput";
import axios from "axios";
import patientsService from "../../../services/patients";
interface Props {
    setSelected :React.Dispatch<React.SetStateAction<string>>,
    diagnosisList : Diagnosis[],
    patientId :string,
    setError:React.Dispatch<React.SetStateAction<string>>,
    addNewEntry : (newEntry: Entry) => void
}
const HealthCheckEntryForm = ({setSelected,diagnosisList,patientId,setError,addNewEntry}:Props) => {
    const [description,setDescription] = useState('')
    const [specialist,setSpecialist] =useState('')
    const [date,setDate] = useState('');
    const [rating,setRating] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
        
        const handleSubmit =async (e : React.SyntheticEvent) => {
            e.preventDefault()
            const checkRating :HealthCheckRating = rating === "0" ? HealthCheckRating.Healthy : 
                rating === "1" ? HealthCheckRating.LowRisk :
                rating === "2" ? HealthCheckRating.HighRisk : HealthCheckRating.CriticalRisk
            const newEntry :NewEntry = {
                type : "HealthCheck",
                date,
                description,
                specialist,
                diagnosisCodes,
                healthCheckRating : checkRating
            }
            try {
                const entry =await patientsService.addEnrty(patientId,newEntry)
                addNewEntry(entry)
                setDate(''); setDescription(''); setSpecialist(''); setRating(''); setDiagnosisCodes([]); setSelected('')
            } catch (error) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                      const message = e.response.data.replace('Something went wrong. Error: ', '');
                      console.error(message);
                      setError(message);
                    } else {
                      setError("Unrecognized axios error");
                    }
                  } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                  }
            }
        }
    return (
        <Box onSubmit={handleSubmit} component="form"  borderRadius={3} style={{borderWidth:1,borderStyle: 'dashed', color:'black',display:'flex',flexDirection:'column' ,padding:"8px"}}>
                <InputLabel>Description</InputLabel>
                <TextField label="Description" variant="filled" value={description} 
                onChange={(e)=>setDescription(e.target.value)} required/>
                <InputLabel>Specialist</InputLabel>
                <TextField  label="Specialist" variant="filled" value={specialist} 
                onChange={(e)=>setSpecialist(e.target.value)} required/>
                <InputLabel>Date</InputLabel>
                <TextField type="date" variant="filled" hiddenLabel value={date} 
                onChange={(e)=>setDate(e.target.value)} required/>
                <InputLabel>Health Check Rating</InputLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={rating} value={rating} onChange={(e)=>setRating(e.target.value)} 
                    name="health-check-rating" style={{display:'flex',flexDirection:'row'}}
                >
                    <FormControlLabel value="0" control={<Radio required={true}/>} label="Healthy" />
                    <FormControlLabel value="1" control={<Radio required={true}/>} label="Low Risk" />
                    <FormControlLabel value="2" control={<Radio required={true}/>} label="High Risk" />
                    <FormControlLabel value="3" control={<Radio required={true}/>} label="Critical Risk" />
                </RadioGroup>
                <DiagnosisListInput diagnosisList={diagnosisList} setDiagnosisCodes={setDiagnosisCodes} 
                 diagnosisCodes={diagnosisCodes}/>
                <div style={{display:'flex' ,flexDirection:'row' ,justifyContent:'space-between'}}>
                    <Button onClick={()=> setSelected('')} >Cancel</Button>
                    <Button type="submit" color="success">Add</Button>
                </div>
            </Box>
    );
}
export default HealthCheckEntryForm