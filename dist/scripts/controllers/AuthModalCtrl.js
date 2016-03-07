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
    function AuthModalCtrl($scope, $uibModalInstance, Auth, User) {
        
        $scope.auth = Auth.auth;
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
            
            User.addUser($scope.authData, $scope.username, $scope.isNewUser);
            
        });
        
        $scope.createUser = function(){
            $scope.isNewUser = false;
            $scope.note = null;
            $scope.error = null;
            
            console.log("creating in process!!!!");
            
            $scope.auth.$createUser({
                email: $scope.email,
                password: $scope.password
            }).then(function(userData) {
                $scope.isNewUser = true;
                $scope.logIn();
            }).catch(function(error){
                $scope.error = error.code;
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
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            $scope.error = "The specified user account email is invalid.";
                            break;
                        case "INVALID_PASSWORD":
                            $scope.error = "The specified user account email is invalid.";
                            break;
                        case "INVALID_USER":
                            $scope.error = "The specified user account does not exist.";
                            break;
                        default:
                            $scope.error = "Error logging user in: "+error.code;
                  
                }
            });       
        }
        
        $scope.authCancel = function() {
            $uibModalInstance.close();
            console.log("closed!!!!!");
        };
        

    }

    angular
        .module('angularChat')
        .controller('AuthModalCtrl', ['$scope', '$uibModalInstance', 'Auth', 'User', AuthModalCtrl]);
})();