import * as React from 'react';
import Playlist from '../../../containers/Customer/Playlist/Playlist';
import EditablePlaylist from '../../../containers/Customer/Playlist/EditablePlaylist';

export interface IPlaylistPageProps {
}

export default function PlaylistPage (props: IPlaylistPageProps) {
  return (
    <div>
      <EditablePlaylist />
    </div>
  );
}
