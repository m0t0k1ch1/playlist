var mainCtrl = function($scope)
{
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
    for (var i in tracks) {
      $scope.tracks = [];
      $scope.tracks.push(tracks[i]);
    }
    $scope.$apply();
  }
}

var playlistCtrl = function($scope)
{
  $scope.getTracks = function() {
    SC.get('/playlists/' + $scope.playlistId, {}, function(playlist) {
      var tracks = playlist.tracks;
      var mainScopeElement = document.getElementById('mainScope');
      var mainScope        = angular.element(mainScopeElement).scope();
      mainScope.showTracks(tracks);
    });
  }
}
