"use strict";
angular
	.module('NightOwl')
	.controller('TagShopController', TagShopController);

TagShopController.$inject = ['authenticationService','$timeout','$scope','shopService'];

function TagShopController(authenticationService, $timeout, $scope, shopService){
	var vm = this;
	
	vm.map = {};
	vm.user = {};
	vm.viewShopTab = true;
	vm.currentPosition = {};
	vm.marker = {};
	vm.isInputFormVisible = false;
	vm.shop = {};
	vm.onClickDone = onClickDone;
	vm.tags = [];

	activate();

	function activate () {
		console.log('hello');
		getLocation();
		shopService.getTags().success(function(data){
			vm.tags = data.tags;
		});
	}
	function initMap(){
		let place = vm.currentPosition;
        vm.map = new google.maps.Map(document.getElementById('list-map'), {
            zoom: 18,
            center: {lat: place.latitude, lng: place.longitude}
        });
        vm.marker = new google.maps.Marker({
		    position: new google.maps.LatLng(place.latitude, place.longitude),
		    map: vm.map,
		    draggable: true,
		    title: "Drag me!"
		});

		vm.marker.addListener('click', showInputForm);
		vm.marker.addListener('dragend', showInputForm);
    }
    function showInputForm() {
    	$scope.$apply(function(){
			vm.isInputFormVisible = true;
		});
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
		      	$scope.$apply(function(){
					vm.currentPosition = position.coords;
					initMap();
				});
		      });

        }
        else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }
	function onClickDone () {
		vm.shop.location = {longitude: vm.marker.getPosition().lng(), latitude: vm.marker.getPosition().lat()};
		shopService.tagShop(vm.shop).success(function(){
			
		vm.isInputFormVisible = false;
		});
	}
}