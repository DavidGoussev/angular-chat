(function () {
    function User($firebaseArray, $firebaseObject) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        var usersRef = firebaseRef.child('users');
        var users = $firebaseArray(firebaseRef.child('users'));

        var currentUser = null;
        
        return  {
            addUser: function(authData, username, isNewUser) {
                if (authData && isNewUser) {
    
                    usersRef.child(authData.uid).set({
                        admin: false,
                        username: username
                    });
                }
            },
          
            getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
            },
            getUsername: function(authData, callback){
                if ( typeof(callback) !== 'function' ) return;
                
//                CALLBACK FOR HOMECTRL ORIGINATES HERE:
                var ref = usersRef.child(authData.uid).child('username');
                ref.once('value', function(snap) {
                    callback(snap.val());
                });
            },
            setAuthData: function(user) {
                currentUser = user;
            },
            getAuthData: function() {
                return currentUser;
            },
            all: users   
        };
        
    }
    
    angular
        .module('angularChat')
        .factory('User', ['$firebaseArray', '$firebaseObject', User]);
})();