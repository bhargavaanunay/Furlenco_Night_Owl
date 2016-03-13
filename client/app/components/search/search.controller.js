
angular
	.module('NightOwl')
	.controller('SearchController', SearchController);

function SearchController(){
	var vm = this;

	vm.inputText;
	vm.onSelectLocation;

	activate();

	function activate(){
		vm.autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('location-search'))
            ,{
                componentRestrictions: {country: 'IN'}
            }
        );
        vm.autocomplete.addListener('place_changed', onPlaceChanged);
    }

    function onPlaceChanged(){
        var place = vm.autocomplete.getPlace();
        console.log(place);
        vm.onSelectLocation({location:place});
    }
}