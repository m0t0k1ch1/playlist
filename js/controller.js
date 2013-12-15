var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylist = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            $scope.playlists.clear();
            $scope.playlists.push(playlists);
        });
    }
}
