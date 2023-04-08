import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import patientsService from "../../services/patients";
import { useState } from 'react';
import { Diagnosis, Entry,Patient } from "../../types";
import { Typography,Container, FormControl, InputLabel, Select, MenuItem, Alert} from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntriesView from "./EntriesView";
import HealthCheckEntryForm from "./forms/HealthCheckEntryForm";
import HospitalEntryForm from "./forms/HospitalEntryForm";
import HealthcareEntryForm from "./forms/HealthcareEntryForm";

interface Props {
    diagnosisList : Diagnosis[]
}
const PatientView = ({diagnosisList} : Props) => {
    const [patient, setPatient] = useState<Patient>()
    const [selected,setSelected]=useState('')
    const id = useParams().id as string
    const [error, setError] = useState<string>('');
    const addNewEntry = (newEntry :Entry) => {
        if(patient)
        setPatient(
            {
                ...patient,
                entries:patient.entries.concat(newEntry)
            }
        )
    }
    useEffect(()=>{
        patientsService.getPatient(id).then((p)=>{
            setPatient({
                name: p.name,
                id:p.id,
                occupation: p.occupation,
                gender: p.gender,
                entries:p.entries,
                ssn : p.ssn,
                dateOfBirth:p.dateOfBirth
            });
        }).catch(err => {
            return null
        })
    },[id])
    
    return patient ? (
        <Container>
            
            <div style={{ display:'flex',justifyContent:'space-between' }}>
                <Typography variant="h5" style={{ marginTop: "0.5em" ,fontWeight:"bolder", }}>
                    {patient.name} {patient.gender === 'female' ? <FemaleIcon  /> : patient.gender === 'male' ? <MaleIcon style={{width:40 ,height:40}}/> : null} 
                </Typography>
                <div>
                <Typography variant="body1">Add Entry</Typography>
                <FormControl fullWidth style={{minWidth:"82px"}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected}
                    label="Age"
                    onChange={(event)=>setSelected(event.target.value)}
                    
                >
                    <MenuItem style={{width:"100%"}} value={'HospitalEntry'}>Hospital Entry</MenuItem>
                    <MenuItem style={{width:"100%"}} value={'HealthCheckEntry'}>HealthCheck Entry</MenuItem>
                    <MenuItem style={{width:"100%"}} value={'OccupationalHealthcare'}>Occupational Healthcare</MenuItem>
                </Select>
                </FormControl>
                </div>
                
            </div>
          <Typography variant="body1" style={{ marginTop: "0.5em" }}>SSN : {patient.ssn}</Typography>
          <Typography variant="body1" style={{ marginTop: "0.5em" }}>Occupation : {patient.occupation}</Typography>
           {error !== '' ? <Alert severity="error">{error}</Alert> : null }
          { selected === 'HealthCheckEntry' ?
            <HealthCheckEntryForm setSelected={setSelected} diagnosisList={diagnosisList} patientId={id} setError={setError} addNewEntry={addNewEntry} /> : 
            selected === 'HospitalEntry' ? 
            <HospitalEntryForm setSelected={setSelected} diagnosisList={diagnosisList} patientId={id} setError={setError} addNewEntry={addNewEntry} /> : 
            selected === 'OccupationalHealthcare' ?
            <HealthcareEntryForm setSelected={setSelected} diagnosisList={diagnosisList} patientId={id} setError={setError} addNewEntry={addNewEntry} /> : 
            null
          }
            <EntriesView entries={patient.entries} />
        </Container>
    ) : null;
}
export default PatientView