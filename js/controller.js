var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylists = function() {
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            $scope.showPlaylists(playlists);
        });
    }
    $scope.showPlaylists = function(playlists) {
        for (var i in playlists) {
            $scope.playlists.push(playlists[i]);
        }
        angular.element(document.getElementById('keyword')).val('');
    }
}
