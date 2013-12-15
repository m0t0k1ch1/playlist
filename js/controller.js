var mainCtrl = function($scope) {
    $scope.searchPlaylist = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            $scope.playlists = playlists;
        });
    }
}
