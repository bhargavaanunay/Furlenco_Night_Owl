"use strict";
angular
	.module('NightOwl')
	.controller('ListShopController', ListShopController);

ListShopController.$inject = ['authenticationService','$timeout','$scope','shopService'];

function ListShopController(authenticationService, $timeout, $scope, shopService){
	var vm = this;
	
	vm.map = false;
	vm.user = {};
	vm.viewShopTab = true;
	vm.currentPosition = {};
	vm.marker = {};
	vm.isShopDetailVisible = false;
	vm.highlightedShop = {};
	vm.tags = [];
	vm.shops = [];
	vm.filters = {};
	vm.onSelectLocation = onSelectLocation;
	vm.vote = vote;
	vm.onClickOk = onClickOk;

	activate();

	function activate () {
		console.log('hello');
		getLocation();
		shopService.getTags().success(function(data){
			vm.tags = data.tags;
			for (var i = vm.tags.length - 1; i >= 0; i--) {
				vm.filters[vm.tags[i]] = true;
			}
		});
		shopService.getShops().success(function(data){
			vm.shops = data.shops;
			if(vm.map){
				addMarkers();
			}
		});
		$scope.$watch('vm.filters',function(oldValue, newValue){
			if(oldValue !== newValue){
				addRemoveExistingMarkers();
			}
		}, true);
	}
	function initMap(place, zoom){
		zoom = zoom | 13;
        vm.map = new google.maps.Map(document.getElementById('list-map'), {
            zoom: zoom,
            center: {lat: place.latitude, lng: place.longitude}
        });
        if(vm.shops.length){
        	addMarkers();
        }		
    }
    function addMarkers(){
    	for (let i = vm.shops.length - 1; i >= 0; i--) {
    		vm.shops[i].marker = new google.maps.Marker({
			    position: new google.maps.LatLng(vm.shops[i].latitude, vm.shops[i].longitude),
			    map: vm.map,
			    title: vm.shops[i].name
			});
			vm.shops[i].marker.addListener('click', function(){
				vm.highlightedShop = vm.shops[i];
				showInputForm();
			});
    	};
		
    }
    function addRemoveExistingMarkers(){
    	for (let i = vm.shops.length - 1; i >= 0; i--) {
    		if(vm.filters[vm.shops[i].tag]){
    			vm.shops[i].marker.setMap(vm.map);
    		}
    		else{
				vm.shops[i].marker.setMap(null);
    		}
    	};
    }
    function showInputForm() {
    	$scope.$apply(function(){
			vm.isShopDetailVisible = true;
		});
    }
    function onSelectLocation (place) {
    	console.log(place);
    	initMap(getCoordinates(place.geometry.location));
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
		      	$scope.$apply(function(){
					vm.currentPosition = position.coords;
					initMap(vm.currentPosition);
				});
		      });

        }
        else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }
	function onClickOk () {
		vm.isShopDetailVisible = false;
	}
	function getCoordinates (place) {
		return {longitude: place.lng() ,latitude: place.lat()};
	}
	function vote(upvote){
		if(!vm.highlightedShop.x)vm.highlightedShop.x=true;
		else return;
		if(upvote)
			vm.highlightedShop.upvote++;
		else 
			vm.highlightedShop.downvote--;
		shopService.vote(upvote, vm.highlightedShop.shop_id);
	}
}