var mainCtrl = function($scope) {
    $scope.searchPlaylist = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            console.log(playlists);
        });
    }
}
