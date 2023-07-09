import * as React from 'react';
import PlaylistGroup from '../../../components/Playlist/PlaylistGroup';
import { getLikedPlaylists, getPlaylistList } from '../../../api/songApi';
import ContentLoading from '../../../components/Loading/ContentLoading';
import { IPlaylist } from '../../../types';
import { useAppSelector } from '../../../store/hooks';

export interface IHomePageProps {
}

export default function HomePage(props: IHomePageProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [likedPlaylistList, setLikedPlaylistList] = React.useState<IPlaylist[]>([]);
  const [myPlaylistList, setMyPlaylistList] = React.useState<IPlaylist[]>([]);

  const authData = useAppSelector(state => state.auth)

  React.useEffect(() => {
    (async() => {
      const likedResponse = await getLikedPlaylists();
      setLikedPlaylistList(likedResponse.data.results);
      const myResponse = await getPlaylistList({params: {customer: authData.id.toString()}})
      setMyPlaylistList(myResponse.data.results)
      setLoading(false)
    })()
  }, [authData.id])
  
  return (
    <div className='h-full relative'>
      <div className='absolute top-0 bottom-0 left-0 right-0 overflow-auto p-7'>
        <PlaylistGroup title="Your Liked" playlistList={likedPlaylistList} />
        <PlaylistGroup title="My Playlists" playlistList={myPlaylistList} />
        {loading && <ContentLoading />}
      </div>
    </div>
  );
}
