var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylists = function() {
        $scope.playlists = [];
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
            }
            $scope.$apply();
        });
    }
}
