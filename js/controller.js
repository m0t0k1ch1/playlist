var mainCtrl = function($scope) {
    $scope.playlists = [];
    $scope.searchPlaylist = function() {
        var searchResults = document.getElementById('searchResult');
        angular.element(searchResults).empty();
        SC.get('/playlists', { q: $scope.keyword }, function(playlists) {
            for (var i in playlists) {
                $scope.playlists.push(playlists[i]);
            }
        });
    }
}
