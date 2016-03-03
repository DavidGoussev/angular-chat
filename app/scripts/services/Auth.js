(function() {
    function Auth($firebaseAuth) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        
        return {
            
            auth: $firebaseAuth(firebaseRef),
            
//            isAuth: $firebaseAuth(firebaseRef).$onAuth(function(authData) {
//                return authData;
//            })
            
            
        
            
        }
    }

    angular
        .module('angularChat')
        .factory('Auth', ['$firebaseAuth', Auth]);

})();
 