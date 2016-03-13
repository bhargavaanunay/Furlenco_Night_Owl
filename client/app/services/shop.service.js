angular
    .module('NightOwl')
    .service('shopService', function shopService($http, baseUrl, authenticationService){
	
	function logout () {
		
	}

	function tagShop (shop) {
		shop.username = authenticationService.getUser().username;
		return $http.post(baseUrl + '/addshop/', shop);
	}
	function getTags () {
		return $http.get(baseUrl + '/tags/');
	}
	function getShops () {
		return $http.get(baseUrl + '/shops/');
	}
	function vote (upvote, shop_id) {
		var data = {
			upvote: upvote,
			username: authenticationService.getUser().username,
			shop_id: shop_id
		};
		return $http.post(baseUrl + '/vote/', data);
	}
	return {
		tagShop: tagShop,
		getTags: getTags,
		getShops: getShops,
		vote: vote
	}
});