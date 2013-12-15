var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylist = function() {
        for (var i in $scope.playlists) {
            delete $scope.playlists[i]
        }
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
            }
        });
    }
}
