angular.module(
  "NameQuery",
  []
)

.controller(
  'NameQueryCtrl',
  [
    '$scope',
    '$http',
    function($scope, $http){
      $scope.userName = ""
      $scope.sortBy = 'name'

      var query = function(){
        $scope.error = ''
        $http.get("https://api.github.com/users/" + $scope.userName + "/repos")
        .then(function(response){
          if(response.data && response.data.length){
            $scope.repos = response.data
            if(_.first(response.data).owner) {
              $scope.avatar = _.first(response.data).owner.avatar_url
            }
          }
          else {
            $scope.repos = []
            $scope.avatar = ""
            $scope.noRepos = "User has no repos!"
          }
        })
        .catch(function(error){
          switch (error.status) {
            case 404:
              $scope.error = "Username does not exist, please search again"
              break;
            case 500:
              $scope.error = "The github server is unavailable. Please try again later"
              break;
            default:
              $scope.error = "An unexpected error occurred. Please try again later"
              break;
          }
        })
      }

      var orderBy = function(sortBy){
        $scope.sortBy = sortBy
      }

      $scope.query = query
      $scope.orderBy = orderBy
    }
  ]
)
