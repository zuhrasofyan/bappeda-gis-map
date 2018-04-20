

angular
  .module('app')
  .component('header', {
    templateUrl: 'app/components/header/header.html',
    controller: headerController,
    controllerAs: 'vm'
  });

function headerController() {
  var vm = this;
   vm.navCollapsed = true;
}
