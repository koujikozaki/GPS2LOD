#概要
ISWC2016の連携企画の一つとして行われた  
*「GPS trajectory linked data project」*
<http://iswc2016.semanticweb.org/pages/attending/applications.html>  
で収集したデータを公開しています．

このプロジェクトでは，ISWC2016の参加者に「GPSロガー」を貸与して，会議開催期間中に，どのような場所を移動したかのデータを収集しました．  
収集したデータの情報は下記のとおりです．
* 収集期間：2016/10/17-2016/10/21
* 収集データ数：被験者11名分（※個人情報は一切取得せず）
* 収集内容：約1分ごとの緯度経度および時間

収集したデータは，GXP形式，CSV形式，および，POI(Point Of Interest)情報を基にRDFに変換したデータを公開しています．  
POI情報は，神戸市のオープンデータ(http://www.city.kobe.lg.jp/information/opendata/catalogue.html)およびDBpedia Japanese(http://ja.dbpedia.org/)を用いて作成しました．

##データの公開場所
各データは，それぞれ下記のフォルダから取得できます．
* CSV　CSV形式のデータ
* GPX　GPX形式のデータ
* RDF　RDF形式のデータ（CSV形式のデータを元に変換して作成）
* POI.csv　RDF形式のデータ作成に利用したPOI情報

##ライセンス
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />本データ は <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">クリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。</a><br>
著作者には*「GPS trajectory linked data project」*と表示してください．

##SPARQLエンドポイント
<http://lod.hozo.jp/repositories/GPS2LOD2>

#RDFデータのモデル
##基本的な考え方
各ユーザが訪問した（通過した）スポットの「訪問情報」を以下のプロパティで表しています．  
「訪問情報」には```<http://lodosaka.jp/iswc2016gtl-exp/data/ユーザID#id>```という一意のURIが与えられており，「訪問情報」のつながりを辿ることで，そのユーザの「移動軌跡」が分かります．

##データ作成方法
CSV形式のデータの各レコードに対し，POI情報の緯度経度と比較し，一定の距離内にあるとき「そのスポットに入った」と判定して，下記のプロパティを持つ「訪問情報」を作成しています．  
連続するレコードが「同じスポット」と判定された場合は，１つの「訪問情報」としてまとめています．

##プロパティ
	<http://lodosaka.jp/iswc2016gtl-exp/prop#user>　ユーザID
    <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> 　訪問したスポットの名称
    <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> 　訪問したスポットの緯度
    <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> 　訪問したスポットの経度
    <http://lodosaka.jp/iswc2016gtl-exp/prop#date>　訪問日
    <http://lodosaka.jp/iswc2016gtl-exp/prop#time>　訪問した時間（0-23）
    <http://lodosaka.jp/iswc2016gtl-exp/prop#start>　そのスポットに到達した日時
    <http://lodosaka.jp/iswc2016gtl-exp/prop#end>　　そのスポットから出た日時
    <http://lodosaka.jp/iswc2016gtl-exp/prop#next>　次に訪れたスポットの訪問情報

##データ例
	<http://lodosaka.jp/iswc2016gtl-exp/user1#0>
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#user> "user1" ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> "市民広場駅" ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> "34.6649"^^<http://www.w3.org/2001/XMLSchemadouble> ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> "135.212"^^<http://www.w3.org/2001/XMLSchemadouble> ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#date> "2016-10-17" ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#time> "11"^^<http://www.w3.org/2001/XMLSchema#int>  ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#start> "2016-10-17T11:18:05Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#end> "2016-10-17T11:24:25Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> ;
	    <http://lodosaka.jp/iswc2016gtl-exp/prop#next> <http://lodosaka.jp/iswc2016gtl-exp/test#1> .

#データの可視化サンプル
##参加者が訪問したスポットの可視化[参加者毎の訪問日数]
<http://lodosaka.jp/iswc2016gtl-exp/apps2a/>

##参加者が訪問したスポットの可視化[訪問した人数]
<http://lodosaka.jp/iswc2016gtl-exp/apps2b/>


#サンプルクエリ
##user1の移動軌跡を時間順に取得する
    select distinct * where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> "user1";
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> ?label;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#date> ?d;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#start> ?st;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#end> ?ed;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#next> ?g;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> ?lat;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> ?long.
    }ORDER BY ?st
<a href="http://lod.hozo.jp/repositories/GPS2LOD2#query/d/%20%20%20%20select%20distinct%20*%20where%20%7B%0A%20%20%20%20%20%20?s%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop%23user%3E%20%22user1%22;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#poi%3E%20?label;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#date%3E%20?d;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#start%3E%20?st;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#end%3E%20?ed;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#next%3E%20?g;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#lat%3E%20?lat;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#lon%3E%20?long.%0A%20%20%20%20%7DORDER%20BY%20?st" target="_blank">[クエリを実行]</a>

##期間中に1回以上訪問したユーザの人数でスポットをランキングする
    select  distinct ?label ?lat ?long (count(distinct ?u)AS ?c) where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> ?u;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> ?label;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lat> ?lat;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#lon> ?long.
    }GROUP BY ?label ?lat ?long
    ORDER BY DESC (?c)
<a href="http://lod.hozo.jp/repositories/GPS2LOD2#query/d/%20%20%20%20select%20%20distinct%20?label%20?lat%20?long%20(count(distinct%20?u)AS%20?c)%20where%20%7B%0A%20%20%20%20%20%20?s%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop%23user%3E%20?u;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#poi%3E%20?label;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#lat%3E%20?lat;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#lon%3E%20?long.%0A%20%20%20%20%7DGROUP%20BY%20?label%20?lat%20?long%0A%20%20%20%20ORDER%20BY%20DESC%20(?c)" target="_blank">[クエリを実行]</a>

##期間中に「元町駅 (兵庫県)」を1回以上訪問したユーザを取得する
    select  distinct ?u where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> ?u;
      <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> "元町駅 (兵庫県)".
    }
<a href="http://lod.hozo.jp/repositories/GPS2LOD2#query/d/%20%20%20%20select%20%20distinct%20?u%20where%20%7B%0A%20%20%20%20%20%20?s%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop%23user%3E%20?u;%0A%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#poi%3E%20%22%E5%85%83%E7%94%BA%E9%A7%85%20(%E5%85%B5%E5%BA%AB%E7%9C%8C)%22.%0A%20%20%20%20%7D%0A" target="_blank">[クエリを実行]</a>



##期間中に「元町駅 (兵庫県)」と「メリケンパーク」の両方を1回以上訪問したユーザを取得する
    select  distinct ?u where {
      ?s <http://lodosaka.jp/iswc2016gtl-exp/prop#user> ?u;
         <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> "元町駅 (兵庫県)".
      ?s2 <http://lodosaka.jp/iswc2016gtl-exp/prop#user> ?u;
      	  <http://lodosaka.jp/iswc2016gtl-exp/prop#poi> "メリケンパーク".
    }
<a href="http://lod.hozo.jp/repositories/GPS2LOD2#query/d/%20%20%20%20select%20%20distinct%20?u%20where%20%7B%0A%20%20%20%20%20%20?s%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop%23user%3E%20?u;%0A%20%20%20%20%20%20%20%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#poi%3E%20%22%E5%85%83%E7%94%BA%E9%A7%85%20(%E5%85%B5%E5%BA%AB%E7%9C%8C)%22.%0A%20%20%20%20%20%20?s2%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#user%3E%20?u;%0A%20%20%20%20%20%20%09%20%20%3Chttp://lodosaka.jp/iswc2016gtl-exp/prop#poi%3E%20%22%E3%83%A1%E3%83%AA%E3%82%B1%E3%83%B3%E3%83%91%E3%83%BC%E3%82%AF%22.%0A%20%20%20%20%7D%0A" target="_blank">[クエリを実行]</a>
