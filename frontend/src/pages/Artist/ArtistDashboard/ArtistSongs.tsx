import * as React from 'react';
import ArtistSongItem from '../../../components/SongItem/ArtistSongItem';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteSong, getSongList } from '../../../api/songApi';
import { ISongSummary } from '../../../types';
import { setNotf } from '../../../store/slices/notfSlice';

export interface IArtistSongsProps {
}

export default function ArtistSongs (props: IArtistSongsProps) {
  const [songs, setSongs] = React.useState<ISongSummary[]>([])

  const authData = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    getSongList({ summary: true, params: {artists: authData.id.toString()}}).then(res => {
      setSongs(res.data.results)
    })
  }, [authData.id])

  const songDeleteHandler = React.useCallback((id: number) => {
    deleteSong(id).then(() => {
      setSongs(prev => prev.filter(ps => ps.id !== id))
      dispatch(setNotf({message: 'Song deleted successfully!'}))
    })
  }, [dispatch])

  return (
    <div className='p-3'>
      <div className='text-4xl text-center mb-5'>
        My Songs
      </div>
      <div className='flex flex-wrap gap-5'>
        {songs.map((song, index) => {
          const onDelete = () => songDeleteHandler(song.id)
          return (
            <div key={song.id} className='w-60'>
                <ArtistSongItem onDelete={onDelete} id={song.id} title={song.title} image={song.image} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
