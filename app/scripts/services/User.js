(function () {
    function User($firebaseArray, $firebaseObject) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        var usersRef = firebaseRef.child('users');
        var users = $firebaseArray(firebaseRef.child('users'));



        
        return  {
            addUser: function(authData, username, isNewUser) {
                if (authData && isNewUser) {
    
                    usersRef.child(authData.uid).set({
                        admin: 'false',
                        username: username
                    });
                }
            },

            
            getProfile: function(uid){
                return $firebaseObject(usersRef.child(uid));
            },
            getUsername: function(authData){
                return users.$getRecord(authData.uid).username;
            },
            all: users   
        };
        
    }
    
    angular
        .module('angularChat')
        .factory('User', ['$firebaseArray', '$firebaseObject', User]);
})();