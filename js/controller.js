var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylist = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
                $scope.keyword = '';
            }
        });
    }
}
