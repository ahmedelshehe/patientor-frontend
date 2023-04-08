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
const HospitalEntryForm = ({setSelected,diagnosisList,patientId,setError,addNewEntry}:Props) => {
    const [description,setDescription] = useState('')
    const [specialist,setSpecialist] =useState('')
    const [date,setDate] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate,setDischargeDate] = useState('')
    const [criteria,setCriteria] = useState('')
        const handleSubmit =async (e : React.SyntheticEvent) => {
            e.preventDefault()
            const newEntry :NewEntry = {
                type : "Hospital",
                date,
                description,
                specialist,
                diagnosisCodes,
                discharge : {
                    criteria,
                    date: dischargeDate
                }
            }
            try {
                const entry =await patientsService.addEnrty(patientId,newEntry)
                addNewEntry(entry)
                setDate(''); setDescription(''); setSpecialist('');  
                setDiagnosisCodes([]); setSelected('');setCriteria(''); setDischargeDate('')
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
                <InputLabel>Discharge date</InputLabel>
                <TextField type="date" variant="filled" hiddenLabel value={dischargeDate} 
                onChange={(e)=>setDischargeDate(e.target.value)} required/>
                <InputLabel>Discharge Criteria </InputLabel>
                <TextField  label="Discharge Criteria" variant="filled" value={criteria} 
                onChange={(e)=>setCriteria(e.target.value)} required/>
                <hr />
                <DiagnosisListInput diagnosisList={diagnosisList} setDiagnosisCodes={setDiagnosisCodes} 
                 diagnosisCodes={diagnosisCodes}/>
                 
                 <div style={{display:'flex' ,flexDirection:'row' ,justifyContent:'space-between'}}>
                    <Button onClick={()=> setSelected('')} >Cancel</Button>
                    <Button type="submit" color="success">Add</Button>
                </div>
            </Box>
    );
}
export default HospitalEntryForm