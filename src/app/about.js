angular
  .module('app')
  .component('about', {
    templateUrl: 'app/about.html',
    controller: aboutController,
    controllerAs: 'vm'
  });

function aboutController() {
  var vm = this;
  
}
