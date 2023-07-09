import * as React from 'react';
import LikeSongsImage from '../../../assets/images/liked-songs-image.jpg'
import PlayButton from '../../../components/UI/PlayButton';
import LikeButton from '../../../components/UI/LikeButton';
import SongList from './SongList';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddableSongList from '../../../components/Playlist/AddableSongList';
import { useNavigate, useParams } from 'react-router-dom';
import { addSongToPlaylist, createEmptyPlaylist, getPlaylistDetail, getPlaylistList, getSongList, removeSongFromPlaylist } from '../../../api/songApi';
import EmptyPlaylist from '../../../assets/images/empty-playlist.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { ISong } from '../../../types';


export interface IEditablePlaylistProps {
}

export default function EditablePlaylist(props: IEditablePlaylistProps) {
    const [imageDialogOpen, setImageDialogOpen] = React.useState<boolean>(false);
    const [beforeImage, setBeforeImage] = React.useState<string>(EmptyPlaylist);
    const [imageFile, setImageFile] = React.useState<File>();
    const [name, setName] = React.useState<string>('Playlist Name');
    const [deleteDialogOpen, setDeleteDialgOpen] = React.useState<boolean>(false);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [songSearchResult, setSongSearchResult] = React.useState<ISong[]>([]);
    const [currentSongs, setCurrentSongs] = React.useState<ISong[]>([]);

    const navigate = useNavigate()
    const { playlistId } = useParams();

    React.useEffect(() => {
        if (playlistId === 'new') {
            createEmptyPlaylist().then(res => {
                navigate('/playlist/' + res.data.id)
            })
        } else {
            getPlaylistDetail(+playlistId!).then(res => {
                setCurrentSongs(res.data.songs)
            })
        }
    }, [playlistId, navigate])

    React.useEffect(() => {
        if (searchInput) {
            const timeout = setTimeout(() => {
                getSongList({params: {search: searchInput}}).then(res => {
                    const result = res.data.results as ISong[]
                    setSongSearchResult(result);
                })
            }, 1000);
            
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [searchInput])

    const addSongToPlaylistHandler = React.useCallback((songId: number) => {
        addSongToPlaylist(+playlistId!, songId).then(res => {
            setCurrentSongs(prev => [...prev, res.data])
        })
    }, [playlistId])

    const removeSongFromPlaylistHandler = React.useCallback((songId: number) => {
        removeSongFromPlaylist(+playlistId!, songId).then(() => {
            setCurrentSongs(prev => prev.filter(song => song.id !== songId))
        }) 
    }, [playlistId])

    const imageUploadInputRef = React.useRef<HTMLInputElement>(null);

    const imageDialogCloseHandler = React.useCallback(() => {
        setImageDialogOpen(false);
    }, [])

    const imageUploadHandler = React.useCallback(() => {

    }, [])

    return (
        <div className='px-10 absolute top-0 bottom-0 left-0 right-0 overflow-auto'>
            <div className='flex gap-10 pt-20 mb-7'>
                <div className=' shrink-0 cursor-pointer' onClick={() => setImageDialogOpen(true)}>
                    <img src={beforeImage} alt="liked-songs" className='w-56' />
                    <input type="file" className='hidden' />
                </div>
                <div className='flex flex-col justify-end'>
                    <div className='font-semibold mb-5'>Playlist</div>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-8xl font-bold mb-10 bg-transparent outline-none border-none w-full" />
                    <div><strong>50 songs</strong> about 2 hr 25 min</div>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-10">
                <PlayButton running={false} size={70} />
                <LikeButton filled={false} size={40} />
                <IconButton onClick={() => setDeleteDialgOpen(true)} >
                    <DeleteIcon style={{ fontSize: 40 }} />
                </IconButton>
            </div>
            <div className='mb-10'>
                <div className='text-3xl font-semibold mb-5'>Current Songs</div>
                <SongList songList={currentSongs} onRemove={removeSongFromPlaylistHandler} />
            </div>
            <hr />
            <div className='mt-10 pb-20'>
                <div className='flex items-center'>
                    <div className='text-3xl font-semibold'>Search Songs</div>
                    <div className='flex items-end gap-1 w-3/12 ml-auto mb-10'>
                        <SearchRoundedIcon />
                        <TextField 
                            id="filled-basic" 
                            label="Filled"
                            variant="standard" 
                            size='small' 
                            fullWidth
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            />
                    </div>
                </div>
                <div>
                    <AddableSongList songList={songSearchResult} onAdd={addSongToPlaylistHandler} />
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
            <ConfirmDialog 
                open={deleteDialogOpen} 
                onClose={() => setDeleteDialgOpen(false)}
                title="Deleting"
                content="Are you sure to delete? You won't be able to revert this change!"
                acceptText='Delete'
                onAccept={() => {}}
                />
        </div>
    );
}
