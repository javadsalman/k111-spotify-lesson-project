import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getCustomerAuthInfo, changeCustomerImage, changeCustomerPassword, changeCustomerInformations } from '../../../api/authApi';
import { setNotf } from '../../../store/slices/notfSlice';
import { changeAuthData } from '../../../store/slices/authSlice';

export interface ICustomerProfilePageProps {
}

export default function CustomerProfilePage(props: ICustomerProfilePageProps) {
    const [birthDate, setBirthDate] = React.useState<Dayjs | null>(null);
    const [imageFile, setImageFile] = React.useState<File>();
    const [imageDialogOpen, setImageDialogOpen] = React.useState<boolean>(false);
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordAgain, setPasswordAgain] = React.useState<string>('');

    const imageUploadInputRef = React.useRef<HTMLInputElement>(null);

    const authData = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const informationsSaveHandler = React.useCallback(() => {
        if (firstName && lastName && username && email && birthDate) {
            const data = { first_name: firstName, last_name: lastName, email, username, birth_date: birthDate.format('YYYY-MM-DD') }
            changeCustomerInformations(data).then(res => {
                dispatch(setNotf({ message: 'User informations updated successfully!' }))
                dispatch(changeAuthData({ ...res.data, user_type: 'customer' }))
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)
                setEmail(res.data.email)
                setUsername(res.data.username)
                setBirthDate(dayjs(res.data.birth_date))
            })
        }
    }, [firstName, lastName, email, username, birthDate, dispatch])

    const passwordUpdateHandler = React.useCallback(() => {
        if (!password || !passwordAgain) {
            dispatch(setNotf({ message: 'All password fields must be filled', color: 'error' }))
        } else if (password !== passwordAgain) {
            dispatch(setNotf({ message: 'Password fields must be same!', color: 'error' }))
        } else {
            changeCustomerPassword(password).then(res => {
                dispatch(setNotf({ message: 'Password has changed successfully!' }))
            })
        }
    }, [password, passwordAgain, dispatch])

    const imageDialogCloseHandler = React.useCallback(() => {
        imageUploadInputRef.current!.value = ''
        setImageFile(undefined)
        setImageDialogOpen(false)
    }, [])

    const imageUploadHandler = React.useCallback(() => {
        if (imageFile) {
            changeCustomerImage(imageFile).then(res => {
                dispatch(changeAuthData({ ...res.data, user_type: 'customer' }))
                imageDialogCloseHandler()
                dispatch(setNotf({ message: 'Profile image updated successfully!' }))
            })
        }
    }, [imageFile, dispatch, imageDialogCloseHandler])

    React.useEffect(() => {
        getCustomerAuthInfo().then(res => {
            const userInfo = res.data
            setFirstName(userInfo.first_name)
            setLastName(userInfo.last_name)
            setUsername(userInfo.username)
            setEmail(userInfo.email)
            setBirthDate(dayjs(userInfo.birth_date))
        })
    }, [authData])

    return (
        <div>
            <div className="text-4xl text-center p-5">Customer Profile</div>
            <div className=' px-5'>
                <div className='text-2xl'>User Informations</div>
                <hr className='w-1/2' />
                <div className='grid grid-cols-2 gap-10'>
                    <div >
                        <div className='mt-5 mb-2'>First Name</div>
                        <TextField value={firstName} onChange={e => setFirstName(e.target.value)} fullWidth placeholder='John' />
                        <div className='mt-5 mb-2'>Last Name</div>
                        <TextField value={lastName} onChange={e => setLastName(e.target.value)} fullWidth placeholder='Doe' />
                        <div className='mt-5 mb-2'>Email</div>
                        <TextField value={email} onChange={e => setEmail(e.target.value)} fullWidth placeholder='Doe' />
                        <div className='mt-5 mb-2'>Username</div>
                        <TextField value={username} onChange={e => setUsername(e.target.value)} fullWidth placeholder='Doe' />
                        <div>
                            <div className='mt-5 '>Birth Date</div>
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
                        <div className='mt-3'>
                            <Button onClick={informationsSaveHandler} variant='contained' fullWidth size="large">Save</Button>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center'>
                            <div className='relative w-56 h-56 '>
                                <img className='object-cover rounded-full h-full w-full' src={authData.image} alt="" />
                                <div onClick={() => setImageDialogOpen(true)} className='absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded-full opacity-0 hover:opacity-100 cursor-pointer bg-opacity-70 duration-300 flex items-center justify-center'>
                                    <EditIcon sx={{ fontSize: 70, color: 'gray' }} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='text-2xl'>Password Change</div>
                            <hr className="w-1/2" />
                            <div>
                                <div className='mt-5 mb-2'>Password</div>
                                <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth placeholder='password123' />
                                <div className='mt-5 mb-2'>Password Again</div>
                                <TextField type="password" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} fullWidth placeholder='password123' />
                                <div className='mt-5'>
                                    <Button onClick={passwordUpdateHandler} variant='contained' fullWidth size="large">Change</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={imageDialogOpen} onClose={imageDialogCloseHandler} fullWidth>
                <DialogTitle>Image Upload</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Select image from your computer
                    </DialogContentText>
                    <input ref={imageUploadInputRef} type="file" onChange={e => setImageFile(e.target.files![0])} />
                    {
                        imageFile
                        &&
                        <img className='w-56 h-56 object-cover' src={URL.createObjectURL(imageFile)} alt="" />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={imageDialogCloseHandler}>Cancel</Button>
                    <Button onClick={imageUploadHandler}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
