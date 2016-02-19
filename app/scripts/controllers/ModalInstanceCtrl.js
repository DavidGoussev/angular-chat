(function() {
    function ModalInstanceCtrl($scope, $uibModalInstance, Room) {
        $scope.rooms = Room.all;
        
        $scope.addRoom = function(){
            Room.create($scope.room).then(function(data){
                $scope.room.name = ''
            })
        };
        
        


        $scope.ok = function () {
            $scope.addRoom();
            $uibModalInstance.close();
            
    
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    angular
        .module('angularChat')
        .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'Room', ModalInstanceCtrl]);
})();