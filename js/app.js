var mainCtrl = function($scope)
{
  var iframeElement = document.querySelector('iframe');
  var widget        = SC.Widget(iframeElement);
  var widgetOptions = { color: '8c8c8c' };

  $scope.searchPlaylists = function() {
    $scope.playlists = [];
    SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
      var playlistScopeElement, playlistScope;
      for (var i in playlists) {
        $scope.playlists.push(playlists[i]);
        $scope.$apply();
        playlistScopeElement     = document.getElementById('playlist' + i);
        playlistScope            = angular.element(playlistScopeElement).scope();
        playlistScope.playlistId = playlists[i].id;
      }
    });
  }

  $scope.showTracks = function(tracks) {
    $scope.tracks = [];
    for (var i in tracks) {
      $scope.tracks.push(tracks[i]);
    }
    $scope.$apply();
  }

  $scope.setTrack = function(track) {
    widget.load(track.uri, widgetOptions);
  }
}

var playlistCtrl = function($scope)
{
  $scope.getTracks = function() {
    SC.get('/playlists/' + $scope.playlistId, {}, function(playlist) {
      var tracks           = playlist.tracks;
      var mainScopeElement = document.getElementById('mainScope');
      var mainScope        = angular.element(mainScopeElement).scope();
      mainScope.showTracks(tracks);
    });
  }
}
