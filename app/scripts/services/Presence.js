(function() {
    function Presence($rootScope, $firebaseArray, User) {
        var onlineUsers = 0;
        var currentUsers = null;
        
        var listRef = new Firebase("https://intense-heat-8619.firebaseio.com/presence/");
        var userRef = listRef.push();
        var presenceRef = new Firebase("https://intense-heat-8619.firebaseio.com/.info/connected/");
        
        presenceRef.on('value', function(snap) {
            if (snap.val()) {
                userRef.onDisconnect().remove();
                setUserStatus({name, status});
            }
        });
        
        listRef.on('value', function(snap) {
            onlineUsers = snap.numChildren();
            currentUsers = $firebaseArray(listRef.orderByChild('status').equalTo(true));
            $rootScope.$broadcast('onOnlineUser');
        });
        
        var setUserStatus = function(name) {
            userRef.set({ name: name, status: true });
        }
        
        var getOnlineUserCount = function() {
            return onlineUsers;
        }
        
        var getCurrentUsers = function() {
            return currentUsers;
        };
            
        return {
            getOnlineUserCount: getOnlineUserCount,     
            setUserStatus: setUserStatus,
            getCurrentUsers: getCurrentUsers
        }
    };
        
    angular
        .module('angularChat')
        .factory('Presence', ['$rootScope', '$firebaseArray', 'User', Presence]);

})();