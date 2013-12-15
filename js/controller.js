var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.tracks    = [];

    $scope.searchPlaylists = function() {
        $scope.playlists = [];
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
            }
            $scope.$apply();
        });
    }

    $scope.showTracks = function(tracks) {
        for (var i in tracks) {
            $scope.tracks.push(tracks[i]);
        }
    }
}

var playlistCtrl = function($scope) {
    $scope.getTracks = function() {
        var mainScope = angular.element(mainScope).scope();
        var playlistId = $scope.playlistId;
        SC.get('/playlists/' + playlistId, {}, function(playlist) {
            var tracks = playlist.tracks;
            mainScope.showTracks(tracks);
            $scope.$apply();
        });
    }
}
