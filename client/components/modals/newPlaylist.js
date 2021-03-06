import { h } from 'hyperapp';

const NewPlaylistModal = ({ state, actions }, children) => {
  const submitNewPL = (e) => {
    console.log('submit');
    actions.onNewPlaylist(document.getElementById('newPlaylistName').value);
    e.preventDefault();
  };
  return (
    <div class="modal" id="newplaylist">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        New Playlist
      </header>
      <form onsubmit={submitNewPL} class='body'>
        <h3>Name your playlist:</h3>
        <input
          type="text"
          autofocus="true"
          id="newPlaylistName"
          />
      </form>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={submitNewPL}>Create playlist</button>
      </footer>
    </div>
  )
};

module.exports = NewPlaylistModal;
