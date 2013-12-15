var mainCtrl = function($scope) {
    $scope.searchPlaylist = function() {
        alert($scope.keyword);
        SC.get('/playlists', { q: 'buskers' }, function(playlists) {
            console.log(playlists);
        });
    }
}
