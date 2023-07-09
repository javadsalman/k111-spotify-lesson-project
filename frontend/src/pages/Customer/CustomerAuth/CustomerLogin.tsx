import * as React from 'react';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks';
import { customerLoginAction } from '../../../store/slices/authSlice';

export interface ICustomerLoginProps {
}

export default function CustomerLogin(props: ICustomerLoginProps) {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [rememberMe, setRememberMe] = React.useState<boolean>(false)

  const dispatch = useAppDispatch()

  const submitHandler = React.useCallback(() => {
    if (username && password) {
      dispatch(customerLoginAction({ username, password, rememberMe }))
    }
  }, [username, password, rememberMe, dispatch])

  return (
    <form className='bg-neutral-800 w-full md:w-1/2 mx-auto mt-40 p-5 flex flex-col gap-3 rounded'>
      <div className="text-center text-4xl mb-3">Customer Login</div>
      <TextField onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitHandler()} value={username} id="outlined-basic" label="Username" variant="outlined" fullWidth />
      <TextField onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitHandler()} value={password} id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth />
      <FormControlLabel control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />} label="Remember Me" />
      <Button onClick={submitHandler} variant="contained" fullWidth size="large">Login</Button>
      <div className='text-center'>
        <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
}
