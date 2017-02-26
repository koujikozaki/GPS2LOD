var title ='';
var url ='';
var all ='';
var keywords ='';
var limit=11;

$(window).load(function() {
	
	var query = (function () {/*
    select  distinct ?label ?lat ?long (count(distinct ?d)AS ?c) where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> "user1";
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> ?label;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#date> ?d;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> ?lat;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> ?long.
    }GROUP BY ?label ?lat ?long
    ORDER BY DESC (?c)
*/}).toString().match(/\n([\s\S]*)\n/)[1];

	var param = getParameter();
	var user =param['u'];

	if (user == null){
		user = 'user1';
	} else{
		query = query.replace("user1",user);
	}

	qr = sendQuery("http://lod.hozo.jp/repositories/GPS2LOD2",query);
		qr.fail(
			function (xhr, textStatus, thrownError) {
				alert("Error: A '" + textStatus+ "' occurred.");
			}
		);
		qr.done(
			function (d) {
				//result_table(d.results.bindings);
				showMAP(d.results.bindings,'Map');
				//download_result(d.results.bindings);
			}
		);


	var query2 = (function () {/*
    select  distinct ?label ?lat ?long (count(distinct ?d)AS ?c) where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> "user1";
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> ?label;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#date> ?d;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#time> ?t;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> ?lat;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> ?long.
      FILTER(?t<=17)
    }GROUP BY ?label ?lat ?long
    ORDER BY DESC (?c)
*/}).toString().match(/\n([\s\S]*)\n/)[1];


	if (user == null){
		user = 'user1';
	} else{
		query2 = query.replace("user1",user);
	}

	qr2 = sendQuery("http://lod.hozo.jp/repositories/GPS2LOD2",query2);
		qr2.fail(
			function (xhr, textStatus, thrownError) {
				alert("Error: A '" + textStatus+ "' occurred.");
			}
		);
		qr2.done(
			function (d) {
				//result_table(d.results.bindings);
				showMAP(d.results.bindings,'Map2');
				//download_result(d.results.bindings);
			}
		);


	var query3 = (function () {/*
    select  distinct ?label ?lat ?long (count(distinct ?d)AS ?c) where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> "user1";
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> ?label;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#date> ?d;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#time> ?t;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> ?lat;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> ?long.
      FILTER(?t>17)
    }GROUP BY ?label ?lat ?long
    ORDER BY DESC (?c)
*/}).toString().match(/\n([\s\S]*)\n/)[1];

	
	if (user == null){
		user = 'user1';
	} else{
		query = query.replace("user1",user);
	}

	qr3 = sendQuery("http://lod.hozo.jp/repositories/GPS2LOD2",query3);
		qr3.fail(
			function (xhr, textStatus, thrownError) {
				alert("Error: A '" + textStatus+ "' occurred.");
			}
		);
		qr3.done(
			function (d) {
				//result_table(d.results.bindings);
				showMAP(d.results.bindings,'Map3');
				//download_result(d.results.bindings);
			}
		);


	$('#result_div').hide();

});

//GETパラメータの処理
function getParameter()
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        var query = window.location.search.substring( 1 );

        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            result[ paramName ] = paramValue;
        }
    }
    return result;
}



/*
 *今はこれ以下のコードは使っていない
 *
 */


//SPARQLクエリの結果を元に表示する情報を生成する
function result_table(data){
	var result_div = $('#result_div');

	var lod_list = '[';

	var n=0;
	if (data instanceof Array) {
		result_div.show();
		//var id = 1;
		for (var d = 0; d < data.length; d++) {
			if(d!=0){lod_list+=',';}
			var v_label = data[d]['label'].value;
			var v_lat = data[d]['lat'].value;
			var v_long = data[d]['long'].value;
			var v_user = data[d]['c'].value;

			lod_list+='{"id":"'+d+'","area":"area","name":"'+v_label+

			'","webj":"","webw":"","lat":"'
					+v_lat+'","lon":"'+v_long
					+'","svlat":"'+v_lat+'","svlon":"'+v_long+'"}';
			//lod_list+='<br>';
		}
		lod_list+=']';

	result_div.html(lod_list);
	}
};

function download_result(data){

	var lod_list = '[';

	var n=0;
	if (data instanceof Array) {
		//result_div.show();
		//var id = 1;
		for (var d = 0; d < data.length; d++) {
			if(d!=0){lod_list+=',';}
			var v_label = data[d]['label'].value;
			var v_lat = data[d]['lat'].value;
			var v_long = data[d]['long'].value;
			var v_pin = data[d]['pin'].value;
			var v_url ='';
			if(data[d]['url'] != undefined){
				v_url = data[d]['url'].value;
			}
			var v_addr ='';
			if(data[d]['addr'] != undefined){
				v_addr = data[d]['addr'].value;
			}
			var v_comment = '';
			if(data[d]['comment'] != undefined){
				v_comment = data[d]['comment'].value;
			}
			var img = '';
			if(data[d]['img'] != undefined){
				img = data[d]['img'].value;;
			}


//			if(v_cat =='ひったくり'){
//				img = 'hit';
//			}else if(v_cat =='子供危険'){
//				img = 'jiko';
//			}else if(v_cat =='駐車場・駐輪場'){
//				img = 'park';
//			}else if(v_cat =='文化・観光'){
//				img = 'nagame';
//			}else if(v_cat =='学校・保育所'){
//				img = 'sisetu';
//			}
//

			var addr ='';
			if(v_addr != ''){
				addr ='<b>住所</b>:'+v_addr+'<br>';
			}

			var hp ='';
			if(v_url != ''){
				hp='<br><a href="'+v_url+'">詳細はこちら</a>';
			}

			lod_list+='{"id":"'+d+'","area":"area","name":"'+v_label
					+'","snippet":"","pinImage":"'+v_pin
					+'","saijin":"","keiretsu":"","address":"","comment":"'
					+addr
					+v_comment
					+hp//+'com'
					+'","webo":"'+img+'","webj":"","webw":"","lat":"'
					+v_lat+'","lon":"'+v_long
					+'","svlat":"'+v_lat+'","svlon":"'+v_long+'"}';
			//lod_list+='<br>';
		}
		lod_list+=']';

		var blob = new Blob( [lod_list], {type: 'text/plain'} )

		var link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = 'result' + '.json'

		document.body.appendChild(link) // for Firefox
		link.click()
		document.body.removeChild(link) // for Firefox
	}
};


//SPARQLクエリの結果を元に表示する情報を生成する
function result_table2(data){
	var result_div = $('#result_div2');

	var lod_list = "";

	lod_list+='<font size="3"><b>LODチャレンジ2011-2013応募作品</b></font><br>';

	lod_list+='<font size="2">';

	if(all!='true'){
		var n=0;
		for (var d = 0; d < data.length; d++) {
			if(n<limit-1){
				//var v_data = data[d]['s'].value;
				var v_title = data[d]['t'].value;
				var v_hp = data[d]['id'].value;

				lod_list+='・<a href="'+v_hp+'" target="_blank">'
						+v_title+'</a><br>';
				n++;
			}else{
				lod_list+='（<a href="'
					+'index.html?title='+title
					+'&url='+url
					+'&keywords='+keywords
					+'&all=true'
					+'">...全て見る</a>）';
			}
		}
	}
	else{
		for (var d = 0; d < data.length; d++) {
				//var v_data = data[d]['s'].value;
				var v_title = data[d]['t'].value;
				var v_hp = data[d]['id'].value;

				lod_list+='・<a href="'+v_hp+'" target="_blank">'
						+v_title+'</a><br>';
		}
}

/*	if (data instanceof Array) {
		result_div.show();
		//id = 1;
		for (var d = 0; d < data.length; d++) {
			var v_title = data[d]['t'].value;
			var v_hp = data[d]['id'].value;
			lod_list+='・<a href="'+v_hp+'" target="_blank">'
					+v_title+'</a><br>';

	}
//		for ( var key in data ) {
//			var val = data[key];
//			lod_list+= key + ": " + val +"<br>";
//		}
	}*/

	lod_list+='</font>';

	result_div.html(lod_list);

};
