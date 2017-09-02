let app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Todo Dashboard";
    $scope.formData = {};
    $scope.todos = [];
    $scope.loading = true;

    //// load data from api

    svTodos.get().then(function (res) {
        $scope.todos = res.data;
        $scope.loading = false;
    });
    
    $scope.createTodo = function () {
        $scope.loading = true;
        const todo = {
            text : $scope.formData.text,
            isDone : false
        };
        svTodos.create(todo).then(function (res) {
            $scope.loading = false;
            $scope.formData.text = "";
            $scope.todos = res.data;
        });
    };

    $scope.updateToDo = function (todo) {
        $scope.loading = true;
        svTodos.update(todo).then(function (res) {
            $scope.loading = false;
            $scope.todos = res.data;
        });
    };

    $scope.deleteTodo = function (todo) {
        $scope.loading = true;
        svTodos.delete(todo._id).then(function (res) {
            $scope.loading = false;
            $scope.todos = res.data;
        });
    };
}]);
