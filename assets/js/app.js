var mainCtrl = function($scope)
{
  SC.initialize({ client_id: '736b11a3d717676cfc27bf601e165617' });

  var player          = document.querySelector('iframe');
  var defaultTrackUrl = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/91249856';
  player.src = defaultTrackUrl;

  $scope.widget = SC.Widget(player);
  $scope.widget.bind(SC.Widget.Events.FINISH, function() {
    var myTracksScope = angular.element('#my_tracks').scope();
    if (myTracksScope.repeatMode == 'song') {
      myTracksScope.play();
    }
    else if (myTracksScope.repeatMode == 'playlist') {
      myTracksScope.next();
    }
  });

  $scope.playlists = [];

  $scope.searchPlaylists = function() {
    SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
      $scope.playlists = [];
      for (var i in playlists) {
        var playlist = playlists[i];
        $scope.playlists.push(playlist);
        $scope.$apply();
      }
    });
  }
}

var playlistCtrl = function($scope)
{
  var tracksScope = angular.element('#tracks').scope();

  $scope.getTracks = function() {
    SC.get('/playlists/' + $scope.playlist.id, {}, function(playlist) {
      var tracks = playlist.tracks;
      tracksScope.showTracks(tracks);
    });
  }
}

var tracksCtrl = function($scope)
{
  $scope.tracks = [];

  $scope.showTracks = function(tracks) {
    $scope.tracks = [];
    $scope.maxIndex = tracks.length - 1;
    for (var i in tracks) {
      $scope.tracks.push(tracks[i]);
    }
    $scope.$apply();
  }
}

var trackCtrl = function($scope)
{
  var myTracksScope = angular.element('#my_tracks').scope();

  $scope.addToMyTrack = function() {
    myTracksScope.myTracks.push($scope.track);
    myTracksScope.myTrackNum++;
  }
}

var myTracksCtrl = function($scope)
{
  $scope.index      = 0;
  $scope.myTrackNum = 0;
  $scope.repeatMode = 'song';
  $scope.myTracks   = [];

  $scope.play = function() {
    var myTrackScope = angular.element('#my_track_' + $scope.index).scope();
    myTrackScope.set();
  }

  $scope.prev = function() {
    if ($scope.index == 0) {
      $scope.index = $scope.myTrackNum - 1;
    } else {
      $scope.index--;
    }
    $scope.play();
  }

  $scope.next = function() {
    if ($scope.index == $scope.myTrackNum - 1) {
      $scope.index = 0;
    } else {
      $scope.index++;
    }
    $scope.play();
  }

  $scope.repeatSong = function() {
    $scope.repeatMode = 'song';
  }

  $scope.repeatPlaylist = function() {
    $scope.repeatMode = 'playlist';
  }

  $scope.remove = function(index) {
    $scope.myTracks.splice(index, 1);
    if (index <= $scope.index) {
      if (index > 0) {
        $scope.index--;
      }
    }
    $scope.myTrackNum--;
  }
}

var myTrackCtrl = function($scope)
{
  var mainScope = angular.element('#main').scope();

  $scope.set = function() {
    mainScope.widget.load($scope.myTrack.uri, {
      auto_play: true,
    });
    mainScope.$apply();
  }
}
