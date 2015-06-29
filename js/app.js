var app = angular.module('mainApp', ['ngRoute', 'ngResource']);
angular.module('mainApp')

.controller('mainAppCtrl', [
  '$resource',
  '$scope',
  function($resource, $scope) {
    /**
     * Initialize people array
     * @type {Array}
     */
    $scope.people = [];

    /**
     * Define base resource
     * @type {Object}
     */
    $scope.endPoint = $resource('fixtures/list.json');

    /**
     * Initialize the controller
     */
    $scope.run = function() {
      $scope.endPoint.query({}, function(data) {
        if (data.length) {
          var people = data;
          $scope.people = people;
          $scope.numRecords = $scope.people.length;
          $scope.ready = true;
        }
      });
    };

    /**
     * Simple function to add a new person
     * @param {Object} person Person information
     */
    $scope.addPerson = function(person) {
      $scope.people.push(person);
      $scope.numRecords = $scope.people.length;
    };

    /**
     * The action to actually add the peson
     * @return {Void}
     */
    $scope.doAdd = function() {
      $scope.addPerson({
        name: 'New Parent',
        age: 40,
        hobby: 'Doing ' + Math.round(Math.random() * 100000)
      });
    }
  }

])
.controller('childAppCtrl', [
    '$resource',
    '$scope',
    '$controller',
    function($resource, $scope, $controller) {
      /**
       * Inheritance: Update local $scope with parent's scope
       * @type {Object}
       */
      $controller('mainAppCtrl', {$scope: $scope});

      /**
       * Override the end-point
       * @type {Object}
       */
      $scope.endPoint = $resource('fixtures/list2.json');

      /**
       * Override the action
       * @return {Void}
       */
      $scope.doAdd = function() {
        $scope.addPerson({
          name: 'New Child',
          age: 12,
          hobby: 'Doing ' + Math.round(Math.random() * 100000)
        });
      }
    }

])
;
