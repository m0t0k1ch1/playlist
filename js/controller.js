var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylist = function() {
        angular.element('#searchResult').empty();
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
            }
        });
    }
}
