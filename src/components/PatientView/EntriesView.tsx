import { Typography } from "@mui/material"
import { Entry } from "../../types"
import HospitalEntryView from "../EntryView/HospitalEntryView"
import HealthCheckEntryView from "../EntryView/HealthCheckEntryView"
import OccupationalHealthcareEntryView from "../EntryView/OccupationalHealthcareEntryView"

interface Props {
    entries : Entry[]
}
const EntriesView = ({entries}:Props) =>{
    return (
        <>
        <Typography variant="h5" style={{ marginTop: "0.5em" }}>Entries</Typography>
            {entries.map(entry =>{
                switch (entry.type) {
                    case 'Hospital':
                        return <HospitalEntryView key={entry.id} entry={entry} />
                    case 'HealthCheck':
                        return <HealthCheckEntryView key={entry.id} entry={entry} />
                    case 'OccupationalHealthcare':
                        return <OccupationalHealthcareEntryView key={entry.id} entry={entry} />    
                    default:
                        return null
                }
            })}

        </>
    )
        }      
export default EntriesView