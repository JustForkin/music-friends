import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';
import PlaylistViewer from '../components/playlistViewer';

const playlistEditor = (state, actions) => {

  const isInSavedPlaylists = state.playlists.some(pl => {
    return pl.playlistid === state.currentPlaylist.playlistid;
  });

  const addToSavedPls = () => {
    if (isInSavedPlaylists) return;
    actions.addPlaylist({
      playlistid: state.currentPlaylist.playlistid,
      title: state.currentPlaylist.title
    });
  };

  const downloadAll = () => {
    actions.downloadAll();
  };

  const admin = state.authedKeys.indexOf(state.currentPlaylist.playlistid) !== -1;

  const showSubmitKeysModal = () => {
    actions.showModal('submitkeys');
    document.getElementById('submittingKey').focus();
  };

  const hasDl = state.currentPlaylist.tracks && state.currentPlaylist.tracks.some(track => !state.fileDirectory[track.id] && state.activeDownloads.indexOf(track.id) === -1);

  return (
    <Layout
      actions={actions}
      state={state}>

      {state.activeFetch && (
        <div id='activeFetchInfo'>
          fetching "{state.activeFetch.title}" by {state.activeFetch.artist}<br/>
          currently on track #{state.activeFetchTrackNum + 1}: "{state.activeFetch.tracks[state.activeFetchTrackNum]}"
        </div>
      )}

      {
        admin
        && (
          <YoutubeSearcher
            actions={actions}
            state={state} />
        )
      }


      <header>
        <h3>{state.currentPlaylist.title}</h3>
        <table>
          <tr>
            <td>
                <input
                  type="button"
                  value="| Add to saved playlists"
                  class={(isInSavedPlaylists) ? 'disabled' : ''}
                  disabled={isInSavedPlaylists}
                  onclick={addToSavedPls}/>
                <br/><br/>
                {state.settings.enableMP3s && (
                  <input
                    type="button"
                    value="| Download all"
                    class={(!hasDl || state.activeFetch) ? 'disabled' : ''}
                    onclick={downloadAll}
                    disabled={!hasDl || state.activeFetch}/>
                )}

            </td>
            <td>
                {(admin) ? (
                  <div class='box'>
                    <h2>Admin</h2>
                    <label>
                      key: {state.keys[state.currentPlaylist.playlistid]}
                    </label>
                  </div>
                ) : (
                  <div class='box'>
                    <h2>View mode</h2>
                    <input type="button" value="| Submit admin keys" onclick={showSubmitKeysModal} />
                  </div>
                )}
                <br/><br/>
                playlistid: {state.currentPlaylist.playlistid}
            </td>
          </tr>
        </table>
      </header>

      <PlaylistViewer state={state} actions={actions} />

    </Layout>
  )

};

module.exports = playlistEditor;
