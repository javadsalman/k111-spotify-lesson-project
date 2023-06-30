import * as React from 'react';
import {
  TextField, Button, FormControlLabel, Checkbox,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TermsAndPrivacyModal from '../../../components/Auth/TermsAndPrivacyModal';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '../../../store/hooks';
import { artistRegisterAction } from '../../../store/slices/authSlice';
import { Link } from 'react-router-dom'


const TERMS_AND_PRIVACY = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veniam dignissimos ad delectus cum minus, fuga, 
est libero ratione, unde dolorum possimus quia quis dolor? Cupiditate doloremque eaque obcaecati magnam excepturi 
ab provident suscipit ipsum, sequi sunt architecto cumque ducimus at animi nulla quisquam exercitationem quos a in 
qui labore! Corporis laboriosam, illo quibusdam alias laborum nihil accusantium odio modi ut accusamus porro eaque 
repudiandae maxime, rem veritatis asperiores consectetur enim commodi perferendis laudantium sunt aliquam! Magnam 
autem molestias laudantium a quibusdam aliquid non error sit at excepturi consequatur ratione ipsa enim officiis, 
doloribus eaque accusamus molestiae aliquam quam omnis.
`.repeat(10)

export interface IArtistRegisterProps {
}

export default function ArtistRegister(props: IArtistRegisterProps) {
  const [tapModalOpen, setTapModalOpen] = React.useState<boolean>(false)
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordAgain, setPasswordAgain] = React.useState<string>('');
  const [birthDate, setBirthDate] = React.useState<Dayjs | null>(null);
  const [gender, setGender] = React.useState<string>('man');
  const [imageFile, setImageFile] = React.useState<File>()

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    setImageFile(file)
  }

  const submitHandler = () => {
    if (firstName && lastName && username && email && password && birthDate && gender && imageFile) {
      const data = {
        first_name: firstName, 
        last_name: lastName, 
        username, 
        email, 
        password, 
        birth_date: birthDate.format('YYYY-MM-DD'), 
        gender, 
        image: imageFile
      }
      dispatch(artistRegisterAction(data))
    }
  }

  return (
    <form className='bg-neutral-800 w-full md:w-1/2 mx-auto mt-20 mb-40 p-5 flex flex-col gap-3 rounded'>
      <div className="text-center text-4xl mb-3">Register</div>
      <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} id="outlined-basic" label="First Name" variant="outlined" fullWidth />
      <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} id="outlined-basic" label="Lastname" variant="outlined" fullWidth />
      <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" fullWidth />
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" type="email" variant="outlined" fullWidth />
      <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth />
      <TextField value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} id="outlined-basic" label="Password Again" type="password" variant="outlined" fullWidth />
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Birth Date"
              value={birthDate}
              onChange={(newValue) => setBirthDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <FormControl style={{ width: '50%' }}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <MenuItem value='man'>Man</MenuItem>
          <MenuItem value='woman'>Woman</MenuItem>
          <MenuItem value='other'>Other</MenuItem>
        </Select>
      </FormControl>
      <div>
        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="uploaded"></img>}
        <Button variant="outlined" onClick={() => fileInputRef.current!.click()}>Upload Image</Button>
        <input ref={fileInputRef} onChange={fileChangeHandler} type="file" className="hidden"/>
      </div>
      <div className='flex justify-between items-center'>
        <FormControlLabel control={<Checkbox />} label="Allow Terms & Privacy" />
        <div className='font-bold cursor-pointer hover:underline' onClick={() => setTapModalOpen(true)}>Terms and Privacy</div>
      </div>
      
      <Button variant="contained" fullWidth size="large" onClick={submitHandler}>Register</Button>
      <div className='text-center'>
        <Link to="/artist/login">Sign In</Link>
      </div>
      <TermsAndPrivacyModal open={tapModalOpen} text={TERMS_AND_PRIVACY} onClose={() => setTapModalOpen(false)} />
    </form>
  );
}
