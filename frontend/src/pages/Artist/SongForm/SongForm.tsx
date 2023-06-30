import * as React from 'react';
import { Autocomplete, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { IArtist, IGenre } from '../../../types';
import { createSong, getGenreList, getSongDetail, updateSong, updateSongData } from '../../../api/songApi';
import { searchArtists } from '../../../api/authApi';
import { useAppDispatch } from '../../../store/hooks';
import { setNotf } from '../../../store/slices/notfSlice';
import { useParams } from 'react-router-dom';

export interface ISongFormProps {
}

export default function SongForm(props: ISongFormProps) {
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [duration, setDuration] = React.useState<string>('')
  const [imageFile, setImageFile] = React.useState<File>()
  const [beforeImage, setBeforeImage] = React.useState<string|null>(null);
  const [songFile, setSongFile] = React.useState<File>()
  const [possibleGenres, setPossibleGenres] = React.useState<IGenre[]>([])
  const [genre, setGenre] = React.useState<IGenre | null>(null)
  const [artistInputValue, setArtistInputValue] = React.useState<string>('') 
  const [possibleArtistList, setPossibleArtistList] = React.useState<IArtist[]>([])
  const [selectedArtistList, setSelectedArtistList] = React.useState<IArtist[]>([])

  const imageUploadInputRef = React.useRef<HTMLInputElement>(null)
  const songUploadInputRef = React.useRef<HTMLInputElement>(null)

  const { songId } = useParams()
  const isEdit = songId !== 'new'
  

  const dispatch = useAppDispatch()

  const imageClickHandler = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (imageFile) {
      setImageFile(undefined)
      imageUploadInputRef.current!.value = ''
    } else {
      imageUploadInputRef.current!.click()
    }
  }, [imageFile])

  const imageUploadHanlder = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files![0])
  }, [])

  const songUploadHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSongFile(e.target.files![0])
  }, [])

  const songRemoveHandler = React.useCallback(() => {
    setSongFile(undefined)
    songUploadInputRef.current!.value = '';
  }, [])

  const imageContentJSX = React.useMemo(() => {
    if (imageFile) {
      const imageSrc = URL.createObjectURL(imageFile)
      return (
        <img className='w-full h-full object-cover' src={imageSrc} alt="" />
      )
    } else {
      return (
        <div className='w-full h-full flex justify-center items-center bg-cover' style={{backgroundImage: `url(${beforeImage})`}}><AddIcon style={{ fontSize: 90 }} /></div>
      )
    }
  }, [imageFile, beforeImage])

  const createSongHandler = React.useCallback(() => {
    if (title && description && duration && genre && selectedArtistList && imageFile && songFile) {
      const artistJSON = JSON.stringify(selectedArtistList.map(a => a.id))
      const data = {title, description, duration, genre: genre.id, artists: artistJSON, image: imageFile, file: songFile}
      createSong(data).then(response => {
        dispatch(setNotf({message: 'Created Successfully!'}))
      })
    }
  }, [title, description, duration, genre, selectedArtistList, imageFile, songFile, dispatch])

  const updateSongHandler = React.useCallback(() => {
    if (songId && title && description && duration && genre && selectedArtistList) {
      const artistJSON = JSON.stringify(selectedArtistList.map(a => a.id))
      const data: updateSongData = {title, description, duration, genre: genre.id, artists: artistJSON}
      if (imageFile) data.image = imageFile
      if (songFile) data.file = songFile
      updateSong(+songId, data).then(response => {
        dispatch(setNotf({message: 'Updated Successfully!'}))
      })
    }
  }, [description, dispatch, duration, genre, imageFile, selectedArtistList, songFile, songId, title])

  const submitHandler = React.useCallback(() => {
    if (isEdit)
      updateSongHandler()
    else
      createSongHandler()
  }, [updateSongHandler, createSongHandler, isEdit])

  const onArtistChange = (event: React.SyntheticEvent<Element, Event>, value: IArtist[]) => {
    setSelectedArtistList(value)
  }

  const onArtistInputChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    setArtistInputValue(value)
  }

  React.useEffect(() => {
    if (isEdit) {
      getSongDetail(+songId!).then(res => {
        setTitle(res.data.title)
        setDescription(res.data.description)
        setDuration(res.data.duration.toString())
        setGenre(res.data.genre_info)
        setSelectedArtistList(res.data.artists_info)
        setBeforeImage(res.data.image)
      })
    }
  }, [isEdit, songId])
  
  React.useEffect(() => {
    getGenreList().then(response => {
      setPossibleGenres(response.data)
    })
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!artistInputValue) return;
      searchArtists(artistInputValue).then(res => {
        setPossibleArtistList(res.data)
      })
    }, 500);
    return () => {
      clearTimeout(timeout)
    }
  }, [artistInputValue])

  return (
    <div className='p-3'>
      <div className="text-center text-4xl mb-10">Song Form</div>
      <form className='w-10/12 mx-auto flex flex-col gap-3'>
        <div>
          <TextField value={title} onChange={e => setTitle(e.target.value)} fullWidth label="Title" variant="outlined" />
        </div>
        <div>
          <TextField value={description} onChange={e => setDescription(e.target.value)} fullWidth label="Description" variant="outlined" multiline rows={3} />
        </div>
        <div>
          <TextField value={duration} onChange={e => setDuration(e.target.value)} fullWidth label="Duration (Seconds)" type="number" variant="outlined" />
        </div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={possibleGenres}
          getOptionLabel={(option) => option.title}
          value={genre}
          fullWidth
          onChange={(e, g) => setGenre(g)}
          renderInput={(params) => <TextField {...params} label="Genre" />}
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={possibleArtistList}
          value={selectedArtistList}
          onChange={onArtistChange}
          inputValue={artistInputValue}
          onInputChange={onArtistInputChange}
          getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
          // defaultValue={[top100Films[13]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Artists"
              placeholder="Artist"
            />
          )}
        />
        <div className='flex items-center gap-3'>
          {
            songFile
              ?
              <>
                <div>{songFile.name} ({(songFile.size / 1024 ** 2).toFixed(2)} MB)</div>
                <Button variant='contained' size="large" color="error" onClick={songRemoveHandler}>Remove Song</Button>
              </>
              :
              <>
                <div>No Song Uploaded</div>
                <Button variant='contained' size="large" color="primary" onClick={() => songUploadInputRef.current!.click()}>Upload Song</Button>
              </>
          }
          <input onChange={songUploadHandler} ref={songUploadInputRef} type="file" className='hidden' />
        </div>
        <div className=''>
          <div className="w-64 h-64 bg-slate-500 rounded cursor-pointer" onClick={imageClickHandler}>
            {imageContentJSX}
          </div>
          <input onChange={imageUploadHanlder} ref={imageUploadInputRef} type="file" className='hidden' />
        </div>
        <div className='my-3'>
          <Button onClick={submitHandler} variant="contained" color="success" size="large" fullWidth>Save</Button>
        </div>
      </form>
    </div>
  );
}
