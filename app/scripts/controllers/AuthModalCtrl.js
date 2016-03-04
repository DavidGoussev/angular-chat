(function() {
    function AuthOpenCtrl($scope, $uibModal, Auth) {
        
//        $scope.auth = Auth;
        
        $scope.openAuth = function() {
            var authInstance = $uibModal.open({
                templateUrl: '/templates/authModal.html',
                controller: 'AuthModalCtrl',
                size: 'sm'
            });
            
        };
    }
    
    angular
        .module('angularChat')
        .controller('AuthOpenCtrl', ['$scope', '$uibModal', 'Auth', AuthOpenCtrl]);
    
})();


(function() {
    function AuthModalCtrl($scope, $uibModalInstance, Auth) {
        
        $scope.auth = Auth.auth;
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });
        
        
        $scope.createUser = function(){
            $scope.note = null;
            $scope.error = null;
            
            console.log("creating in process!!!!");
            
            $scope.auth.$createUser({
                email: $scope.email,
                password: $scope.password
            }).then(function(userData) {
                $scope.logIn();
            }).catch(function(error) {
                $scope.error = error;
            });         
        };
        
        $scope.logIn = function(){
            $scope.note = null;
            $scope.error = null;
            
            $scope.auth.$authWithPassword({
                email: $scope.email,
                password: $scope.password
            }).then(function(authData) {
                $uibModalInstance.close();                    
            }).catch(function(error) {
                $scope.error = error;
            });       
        }
        
        $scope.authCancel = function() {
            $uibModalInstance.close();
            console.log("closed!!!!!");
        };

    }

    angular
        .module('angularChat')
        .controller('AuthModalCtrl', ['$scope', '$uibModalInstance', 'Auth', AuthModalCtrl]);
})();