import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Diagnosis } from '../../../types';
import { Button } from '@mui/material';
interface Props {
  diagnosisList: Diagnosis[],
  diagnosisCodes:string[],
  setDiagnosisCodes :React.Dispatch<React.SetStateAction<string[]>>
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const  DiagnosisListInput = ({diagnosisList,diagnosisCodes,setDiagnosisCodes}:Props) =>{
  const codes =diagnosisList.map(diagnosesCode =>{return {name: diagnosesCode.name,code :diagnosesCode.code}})
  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleClear = () =>{
    setDiagnosisCodes([])
  }
  const  getSelected =(code: string) => {
    return diagnosisCodes.indexOf(code) === -1 ?  false :  true
  }
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          MenuProps={MenuProps}
          
        >
          {codes.map((code) => (
            <MenuItem
              key={code.code}
              value={code.code}
              style={getSelected(code.code) ? {fontWeight:'bold'} : {fontWeight : 'normal'} }
            >
              {code.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleClear}>Clear</Button>
      </FormControl>
    </div>
  );
}
export default DiagnosisListInput