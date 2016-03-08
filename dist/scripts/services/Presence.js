(function() {
    function Presence($rootScope) {
        var onlineUsers = 0;
        
        var listRef = new Firebase("https://intense-heat-8619.firebaseio.com/presence/");
        var userRef = listRef.push();
        
        var presenceRef = new Firebase("https://intense-heat-8619.firebaseio.com/.info/connected/");
        
        presenceRef.on('value', function(snap) {
            if (snap.val()) {
                userRef.onDisconnect().remove();
                userRef.set(true);
            }
        });
        
        listRef.on('value', function(snap) {
            console.log(snap);
            onlineUsers = snap.numChildren();
            $rootScope.$broadcast('onOnlineUser');
        });
        
        var getOnlineUserCount = function() {
            return onlineUsers;
        };
        
        return {
            getOnlineUserCount: getOnlineUserCount
        }
    };
        
    angular
        .module('angularChat')
        .factory('Presence', ['$rootScope', Presence]);

})();