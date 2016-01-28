/**
 * Created by Macdonald Monate on 2015/12/14.
 */
angular.module('starter.controllers')

.service('SongsService', function(localStorageService){

    this.Songs        = [];
    this.RecentSongs  = [];
    this.Playlists    = [];

    this.getSongs = function(){

      console.log('Test',this.Songs.length);
      if(this.Songs.length <= 0){
        this.Songs = localStorageService.get('Songs');
      }
      return this.Songs;
    };

    this.localStorageInit = function(){
      this.Songs        = localStorageService.get('Songs');
      this.RecentSongs  = localStorageService.get('Recent');
    };

    this.getSingleSong  = function(id){
      var song = null;

      if(this.Songs.length > 0){
        song = _.find(this.Songs, {_id:id}) ;
      }else{
        song = _.find(this.getSongs(),{_id:id});
      }

      return song;
    };

    this.getLastThreeSongs = function(){
      /*Get last 3 songs*/
      var songs = this.getSongs();
      var ThreeSongs = _.last(songs,3);

      return ThreeSongs;
    };

    this.setRecentSong = function(Song){
      /**/
      if(!localStorageService.get('Recent')){
        console.log('Pushing 1st Song', Song);
        this.RecentSongs.push(Song);
      }else{
        this.RecentSongs = localStorageService.get('Recent');
        this.RecentSongs.unshift(Song);
        console.log('Set', this.RecentSongs);
      }

      if(this.RecentSongs.length > 0 ){
        localStorageService.set('Recent', this.RecentSongs);
      }
    };

    this.addSongToPlaylist = function(songID, playlistID){
      /*Add Song to Playlist*/

      var pIndx = _.findWhere(this.Playlists, {title: playlistID});
      if( pIndx != -1){
        this.Playlists[pIndx].songs.push(songID);
        localStorageService.set('Playlist', this.Playlists);
      }else{
        console.log("Playlist Not Found");
      }

    };

    this.savePlaylist = function(playlist){
      /*Save Current Playlist*/
      if(!localStorageService.get('Playlist')){
        this.RecentSongs.push(playlist);
      }else{
        this.Playlists = localStorageService.get('Recent');
        this.Playlists.push(playlist);
        console.log('Set', this.Playlists);
      }

      if(this.Playlists.length > 0 ){
        localStorageService.set('Playlist', this.Playlists);
      }
    };

    this.getPlayLists = function(){
      /*Retrive all Playlists*/
      return this.Playlists;
    };

    this.getPlayListSongs = function(playlistID){
      /*Get all Playlist Songs*/
      var playSongs = [];
      playSongs = _.findWhere(this.Playlists, { title: playlistID }).songs;
      return playSongs;
    };

  });
