(function() {
    function Auth($firebaseAuth) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        
        return {
            
            auth: $firebaseAuth(firebaseRef),
                    
            
        }
    }

    angular
        .module('angularChat')
        .factory('Auth', ['$firebaseAuth', Auth]);

})();
 