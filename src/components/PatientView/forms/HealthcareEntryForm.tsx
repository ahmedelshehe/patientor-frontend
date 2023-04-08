import { Box, Button,InputLabel,TextField } from "@mui/material";
import { useState } from 'react';
import { Diagnosis,Entry, NewEntry } from "../../../types";
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
const HealthcareEntryForm = ({setSelected,diagnosisList,patientId,setError,addNewEntry}:Props) => {
    const [description,setDescription] = useState('')
    const [specialist,setSpecialist] =useState('')
    const [date,setDate] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName,setEmployerName] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
        const handleSubmit =async (e : React.SyntheticEvent) => {
            e.preventDefault()
            const newEntry :NewEntry = {
                type : "OccupationalHealthcare",
                date,
                description,
                specialist,
                diagnosisCodes,
                employerName
            }
            if(startDate !== '' && endDate !== '') {
                newEntry.sickLeave = {
                    startDate,endDate
                }
            }
            try {
                const entry =await patientsService.addEnrty(patientId,newEntry)
                addNewEntry(entry)
                setDate(''); setDescription(''); setSpecialist(''); setStartDate(''); setEndDate('');  setDiagnosisCodes([]); setSelected('')
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
                <InputLabel>Employer </InputLabel>
                <TextField  label="Employer" variant="filled" value={employerName} 
                onChange={(e)=>setEmployerName(e.target.value)} required/>
                <hr />
                <InputLabel>Is it a Sick Leave ?</InputLabel>
                <InputLabel>Start Date</InputLabel>
                <TextField type="date" variant="filled" hiddenLabel value={startDate} 
                onChange={(e)=>setStartDate(e.target.value)} required/>
                <InputLabel>End Date</InputLabel>
                <TextField type="date" variant="filled" hiddenLabel value={endDate} 
                onChange={(e)=>setEndDate(e.target.value)} required/>
                <DiagnosisListInput diagnosisList={diagnosisList} setDiagnosisCodes={setDiagnosisCodes} 
                 diagnosisCodes={diagnosisCodes}/>
                 
                <div style={{display:'flex' ,flexDirection:'row' ,justifyContent:'space-between'}}>
                    <Button onClick={()=> setSelected('')} >Cancel</Button>
                    <Button type="submit" color="success">Add</Button>
                </div>
            </Box>
    );
}
export default HealthcareEntryForm