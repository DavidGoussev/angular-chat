(function() {
    function Presence($rootScope) {
        var onlineUsers = 0;
        
        var listRef = new Firebase("https://intense-heat-8619.firebaseio.com/presence/");
        var userRef = listRef.push();
        var presenceRef = new Firebase("https://intense-heat-8619.firebaseio.com/.info/connected/");
        
        presenceRef.on('value', function(snap) {
            if (snap.val()) {
                userRef.onDisconnect().remove();
                setUserStatus({name, status});
//                usersRef.child(authData.uid).set({
//                        status: true,
//                        username: username
//                    });
            }
        });
        
        listRef.on('value', function(snap) {
   
            onlineUsers = snap.numChildren();
            $rootScope.$broadcast('onOnlineUser');
        });
        
        var setUserStatus = function() {
            userRef.set({ name: name, status: true });
        }
        
        var getOnlineUserCount = function() {
            return onlineUsers;

        };
        
        
        
        return {
            getOnlineUserCount: getOnlineUserCount,
            
            setUserStatus: setUserStatus
            
        
        }
    };
        
    angular
        .module('angularChat')
        .factory('Presence', ['$rootScope', Presence]);

})();