import updatedTracksWithDl from '../utils/updatedTracksWithDl';

module.exports = {

  setCurrentPlaylist: (state, actions, playlist, dontUpdateCache) => {
    console.log('setting current', playlist);
    dontUpdateCache = (typeof dontUpdateCache === "boolean" && dontUpdateCache);
    if (!dontUpdateCache) {
      console.log('updating cache');
      if (playlist.playlistid) {
        actions.updateCache(playlist);
      } else {
        //fetch
        actions.updateTracks({
          fetchid: playlist.fetchid,
          tracks: playlist.tracks
        });
      }
    } else {
      console.log('dont update cache because ', dontUpdateCache);
    }
    console.log('setting playlist', playlist);
    return {
      currentPlaylist: playlist
    };
  },

  setTracks: (state, actions, tracks) => {
    console.log('setting tracks', tracks);
    actions.setCurrentPlaylist(
      Object.assign({}, state.currentPlaylist, { tracks })
    );
  },

  // any time playlist data received from server
  possiblyUpdateCurrent: (state, actions, incomingPl) => {
    // if (state.currentPlaylist.playlistid === incomingPl.playlistid || !state.currentPlaylist.playlistid) {
    //   console.log('needs updated');
    //   console.log(state.playlistCache, incomingPl, 'ah');
    //
    //
    // } else {
    //   console.log('no need for update');
    //   console.log('because currentpl' + JSON.stringify(state.currentPlaylist));
    //   console.log('and data' + JSON.stringify(incomingPl));
    //   console.log(state.playlistCache, incomingPl, 'ah');
    // }
    actions.setCurrentPlaylist(incomingPl);
  },

  // when tracksupdate is sent, check whether currentPlaylist is that playlist with the update
  updateCurrentPlaylistIfNecessary: (state, actions, change) => {
    var { playlistid, tracks } = change;
    if (state.currentPlaylist.playlistid === playlistid) {
      console.log('ref', playlistid, tracks);
      console.log('setting tracks for active playlist', tracks);
      actions.setTracks(tracks);
    } else {
      console.log('not current')
    }
  },

  updateCurrentPlaylistWithDl: (state, actions, data) => {
    var newTracks = updatedTracksWithDl(state.currentPlaylist.tracks, data);
    actions.setTracks(newTracks);
  }




};
