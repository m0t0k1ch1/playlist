var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylists = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            $scope.showPlaylists(playlists);
        });
    }
    $scope.showPlaylists = function(playlists) {
        alert('hoge');
        for (var i in playlists) {
            $scope.playlists.push(playlists[i]);
        }
        $scope.keyword = '';
    }
}
