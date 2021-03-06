module.exports = {
  selectPlaylist: (state, actions, pl) => {
    console.log('/playlist/' + pl.playlistid);
    actions.router.go('/playlist/' + pl.playlistid);
    actions.clearSearch();
  },
  openNewPlModal: (state, actions) => {
    actions.showModal('newplaylist');
    document.getElementById('newPlaylistName').focus();
  },
  confirmDeletePl: (state, actions, pl) => {
    console.log('cofnirm delete')
    actions.setPlaylistToDelete(pl);
    actions.showModal('confirmdelete');
  },
  confirmDelete: (state, actions) => {
    actions.deleteSavedPlaylist(state.playlistToDelete);
    actions.hideModals();
  },
  setPlaylistToDelete: (state, actions, pl) => {
    return {
      playlistToDelete: pl
    };
  },
  clearSearch: (state, actions) => {
    if (document.getElementById("songname"))
      document.getElementById("songname").value = '';
    return { suggestions: [] };
  },
  toggleDebug: (state, actions) => {
    localStorage.setItem('debugCP', !state.debugCP);
    return {
      debugCP: !state.debugCP
    };
  },
  thumbnailClick: (state, actions, trackid) => {
      actions.songDone();
      if (state.nowPlaying === trackid) {
        return;
      }
      if (state.settings.enableMP3s && state.fileDirectory[trackid]) {

        return actions.playMP3({
          id: trackid,
          file: state.fileDirectory[trackid]
        });

      } else {

        actions.playYoutube({
          id: trackid,
          file: state.fileDirectory[trackid]
        });

      }
  }

};
