var mainCtrl = function($scope)
{
  SC.initialize({ client_id: '736b11a3d717676cfc27bf601e165617' });

  var iframeElement   = document.querySelector('iframe');
  var defaultTrackUrl = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/91249856';

  iframeElement.src = defaultTrackUrl;
  $scope.widget = SC.Widget(iframeElement);
  $scope.widget.bind(SC.Widget.Events.FINISH, function() {
    var tracksScopeElement = document.getElementById('tracks');
    var tracksScope        = angular.element(tracksScopeElement).scope();
    if (tracksScope.repeatMode == 'song') {
      tracksScope.play();
    } else if (tracksScope.repeatMode == 'playlist') {
      tracksScope.next();
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
        var playlistScopeElement = document.getElementById('playlist' + i);
        var playlistScope        = angular.element(playlistScopeElement).scope();
        playlistScope.playlistId = playlist.id;
      }
    });
  }
}

var playlistCtrl = function($scope)
{
  var tracksScopeElement = document.getElementById('tracks');
  var tracksScope        = angular.element(tracksScopeElement).scope();

  $scope.getTracks = function() {
    SC.get('/playlists/' + $scope.playlistId, {}, function(playlist) {
      var tracks = playlist.tracks;
      tracksScope.showTracks(tracks);
    });
  }
}

var tracksCtrl = function($scope)
{
  $scope.index      = 0;
  $scope.maxIndex   = 0;
  $scope.repeatMode = 'song';
  $scope.tracks     = [];

  $scope.showTracks = function(tracks) {
    $scope.maxIndex = tracks.length - 1;
    for (var i in tracks) {
      $scope.tracks.push(tracks[i]);
    }
    $scope.$apply();
  }

  $scope.play = function() {
    var trackScopeElement = document.getElementById('track' + $scope.index);
    var trackScope        = angular.element(trackScopeElement).scope();
    trackScope.setTrack();
  }

  $scope.prev = function() {
    $scope.index--;
    $scope.play();
  }

  $scope.next = function() {
    $scope.index++;
    $scope.play();
  }

  $scope.repeatSong = function() {
    $scope.repeatMode = 'song';
  }

  $scope.repeatPlaylist = function() {
    $scope.repeatMode = 'playlist';
  }
}

var trackCtrl = function($scope)
{
  var mainScopeElement = document.getElementById('main');
  var mainScope        = angular.element(mainScopeElement).scope();

  $scope.setTrack = function() {
    mainScope.widget.load($scope.track.uri, {
      auto_play: true,
      $mainScope.$apply();
    });
  }
}
