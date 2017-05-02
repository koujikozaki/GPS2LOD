
var mapdata;

function showMAP(data,mapid){
	//alert('showMAP');
	//mapdata = data;

	   var lat            = 34.6886;
	   var lon            = 135.199;
//   var lat            = 34.6637174;
//   var lon            = 135.5;
/*   var zoom           = 14;

   var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
   var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
   var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
*/

   // 位置とズームを決めてマップを描画
   var map = L.map(mapid,{
       center:[lat, lon],
       zoom: 13
   });

   // OpenStreetMapを使うためのおまじない
   var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   });

   //GoogleMap
//   var tileLayer = L.tileLayer(
//			'http://mt{s}.google.com/vt/lyrs=m@121&hl=ja&x={x}&y={y}&z={z}',
//			{ subdomains: [0,1,2,3] }
//		).addTo(map);

   tileLayer.addTo(map);

   var icon_w = 21;//14;
   var icon_h = 30;//20;

   var user1Icon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });

   var user2Icon = L.icon({
       iconUrl: 'icon/image002.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });

   var user3Icon = L.icon({
       iconUrl: 'icon/image003.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });

   var user4Icon = L.icon({
       iconUrl: 'icon/image004.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
   });
   var user5Icon = L.icon({
       iconUrl: 'icon/image005.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
       //shadowSize:   [50, 64], // size of the shadow
       //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
       //shadowAnchor: [4, 62],  // the same for the shadow
       //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
   });

    var user6Icon = L.icon({
       iconUrl: 'icon/image006.png',
       iconSize:     [icon_w, icon_h], // size of the icon
       iconAnchor: [0, icon_h],
    });


   // 指定した位置にマーカーを置く
 /*  var mapMarker = L.marker([35.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！');
   //mapMarker.openPopup();

   mapMarker = L.marker([36.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！2');*/

   for (var d = 0; d < data.length; d++) {
		var v_label = data[d]['label'].value;
		//var v_cat = data[d]['pin'].value;
		v_lat = data[d]['lat'].value;
		v_long = data[d]['long'].value;
		var v_user = data[d]['c'].value;

		var icon = user1Icon;

		if(v_user == 2 ){
			icon = user3Icon;
		}else if(v_user == 3 ){
			icon = user4Icon;
		}else if(v_user == 4 ){
			icon = user5Icon;
		}else if(v_user == 5 ){
			icon = user6Icon;
		}

	var mapMarker = L.marker([v_lat, v_long], {icon: icon});
	   mapMarker.addTo(map);
	   mapMarker.bindPopup('<b>'+v_label+'</b><br>訪問日数：'+ v_user+'日<br>'
		 	+v_lat +","+v_long
			//   +v_addr+v_comment
			   );
   }

}



function showMAP2(data){
	//alert('showMAP');
	//mapdata = data;

	   var lat            = 34.6886;
	   var lon            = 135.199;
//   var lat            = 34.6637174;
//   var lon            = 135.5;
/*   var zoom           = 14;

   var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
   var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
   var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
*/

   // 位置とズームを決めてマップを描画
   var map = L.map('Map2',{
       center:[lat, lon],
       zoom: 13
   });

   // OpenStreetMapを使うためのおまじない
   var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   });

   //GoogleMap
//   var tileLayer = L.tileLayer(
//			'http://mt{s}.google.com/vt/lyrs=m@121&hl=ja&x={x}&y={y}&z={z}',
//			{ subdomains: [0,1,2,3] }
//		).addTo(map);

   tileLayer.addTo(map);

   var icon_w = 21;//14;
   var icon_h = 30;//20;

   var user1Icon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user2Icon = L.icon({
       iconUrl: 'icon/image002.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user3Icon = L.icon({
       iconUrl: 'icon/image003.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user4Icon = L.icon({
       iconUrl: 'icon/image004.png',

			 iconSize:     [icon_w, icon_h], // size of the icon
		 });
   var user5Icon = L.icon({
       iconUrl: 'icon/image005.png',
		   iconSize:     [icon_w, icon_h], // size of the icon
       //shadowSize:   [50, 64], // size of the shadow
       //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
       //shadowAnchor: [4, 62],  // the same for the shadow
       //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
   });

	 var user6Icon = L.icon({
				iconUrl: 'icon/image006.png',
				iconSize:     [icon_w, icon_h], // size of the icon
		 });


   // 指定した位置にマーカーを置く
 /*  var mapMarker = L.marker([35.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！');
   //mapMarker.openPopup();

   mapMarker = L.marker([36.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！2');*/

   for (var d = 0; d < data.length; d++) {
		var v_label = data[d]['label'].value;
		//var v_cat = data[d]['pin'].value;
		v_lat = data[d]['lat'].value;
		v_long = data[d]['long'].value;
		var v_user = data[d]['c'].value;

		var icon = user1Icon;

		if(v_user == 11 ){
			icon = user6Icon;
		}else if(v_user > 9){
			icon = user5Icon;
		}else if(v_user > 7 ){
			icon = user4Icon;
		}else if(v_user > 5 ){
			icon = user3Icon;
		}else if(v_user > 3){
			icon = user2Icon;
		}

	var mapMarker = L.marker([v_lat, v_long], {icon: icon});
	   mapMarker.addTo(map);
	   mapMarker.bindPopup('<b>'+v_label+'</b><br>訪問者数：'+ v_user+'<br>'
		 	+v_lat +","+v_long
			//   +v_addr+v_comment
			   );
   }

}


function showMAP3(data){
	//alert('showMAP');
	//mapdata = data;

	   var lat            = 34.6886;
	   var lon            = 135.199;
//   var lat            = 34.6637174;
//   var lon            = 135.5;
/*   var zoom           = 14;

   var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
   var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
   var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
*/

   // 位置とズームを決めてマップを描画
   var map = L.map('Map3',{
       center:[lat, lon],
       zoom: 13
   });

   // OpenStreetMapを使うためのおまじない
   var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   });

   //GoogleMap
//   var tileLayer = L.tileLayer(
//			'http://mt{s}.google.com/vt/lyrs=m@121&hl=ja&x={x}&y={y}&z={z}',
//			{ subdomains: [0,1,2,3] }
//		).addTo(map);

   tileLayer.addTo(map);

   var icon_w = 21;//14;
   var icon_h = 30;//20;

   var user1Icon = L.icon({
       iconUrl: 'icon/image001.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user2Icon = L.icon({
       iconUrl: 'icon/image002.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user3Icon = L.icon({
       iconUrl: 'icon/image003.png',
       iconSize:     [icon_w, icon_h], // size of the icon
   });

   var user4Icon = L.icon({
       iconUrl: 'icon/image004.png',

			 iconSize:     [icon_w, icon_h], // size of the icon
		 });
   var user5Icon = L.icon({
       iconUrl: 'icon/image005.png',
		   iconSize:     [icon_w, icon_h], // size of the icon
       //shadowSize:   [50, 64], // size of the shadow
       //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
       //shadowAnchor: [4, 62],  // the same for the shadow
       //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
   });

	 var user6Icon = L.icon({
				iconUrl: 'icon/image006.png',
				iconSize:     [icon_w, icon_h], // size of the icon
		 });


   // 指定した位置にマーカーを置く
 /*  var mapMarker = L.marker([35.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！');
   //mapMarker.openPopup();

   mapMarker = L.marker([36.40, 139.50], {icon: greenIcon});
  // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
   mapMarker.addTo(map);
   mapMarker.bindPopup('ここですよ！2');*/

   for (var d = 0; d < data.length; d++) {
		var v_label = data[d]['label'].value;
		//var v_cat = data[d]['pin'].value;
		v_lat = data[d]['lat'].value;
		v_long = data[d]['long'].value;
		var v_user = data[d]['c'].value;

		var icon = user1Icon;

		if(v_user == 11 ){
			icon = user6Icon;
		}else if(v_user > 9){
			icon = user5Icon;
		}else if(v_user > 7 ){
			icon = user4Icon;
		}else if(v_user > 5 ){
			icon = user3Icon;
		}else if(v_user > 3){
			icon = user2Icon;
		}

	var mapMarker = L.marker([v_lat, v_long], {icon: icon});
	   mapMarker.addTo(map);
	   mapMarker.bindPopup('<b>'+v_label+'</b><br>訪問者数：'+ v_user+'<br>'
		 	+v_lat +","+v_long
			//   +v_addr+v_comment
			   );
   }

}

