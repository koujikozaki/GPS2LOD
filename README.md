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

収集したデータは，GXP形式，CSV形式，および，POI情報を基にRDFに変換したデータを公開しています．  

##SPARQLエンドポイント
<http://lod.hozo.jp/repositories/GPS2LOD2>

#RDFデータのモデル
##基本的な考え方
各ユーザが訪問した（通過した）スポットの「訪問情報」を以下のプロパティで表しています．  
「訪問情報」には'<http://stayPoi.org/ユーザID#id>'という一意のURIが与えられており，「訪問情報」のつながりを辿ることで，そのユーザの「移動軌跡」が分かります．

##プロパティ
	<http://stayPoi.org/prop#user>　ユーザID
    <http://stayPoi.org/prop#poi> 　訪問したスポットの名称
    <http://stayPoi.org/prop#lat> 　訪問したスポットの緯度
    <http://stayPoi.org/prop#lon> 　訪問したスポットの経度
    <http://stayPoi.org/prop#date>　訪問日
    <http://stayPoi.org/prop#time>　訪問した時間（0-23）
    <http://stayPoi.org/prop#start>　そのスポットに到達した日時
    <http://stayPoi.org/prop#end>　　そのスポットから出た日時
    <http://stayPoi.org/prop#next>　次に訪れたスポットの訪問情報

##データ例
	<http://stayPoi.org/user1#0>
	    <http://stayPoi.org/prop#user> "user1" ;
	    <http://stayPoi.org/prop#poi> "市民広場駅" ;
	    <http://stayPoi.org/prop#lat> "34.6649"^^<http://www.w3.org/2001/XMLSchemadouble> ;
	    <http://stayPoi.org/prop#lon> "135.212"^^<http://www.w3.org/2001/XMLSchemadouble> ;
	    <http://stayPoi.org/prop#date> "2016-10-17" ;
	    <http://stayPoi.org/prop#time> "11"^^<http://www.w3.org/2001/XMLSchema#int>  ;
	    <http://stayPoi.org/prop#start> "2016-10-17T11:18:05Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> ;
	    <http://stayPoi.org/prop#end> "2016-10-17T11:24:25Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> ;
	    <http://stayPoi.org/prop#next> <http://stayPoi.org/test#1> .

#データの可視化サンプル
##参加者が訪問したスポットの可視化[参加者毎の訪問日数]
<http://lodosaka.jp/iswc2016gtl-exp/apps2a/>

##参加者が訪問したスポットの可視化[訪問した人数]
<http://lodosaka.jp/iswc2016gtl-exp/apps2b/>


#サンプルクエリ
##user1の移動軌跡を時間順に取得する
    select distinct * where {
      ?s <http://stayPoi.org/prop#user> "user1";
      <http://stayPoi.org/prop#poi> ?label;
      <http://stayPoi.org/prop#date> ?d;
      <http://stayPoi.org/prop#start> ?st;
      <http://stayPoi.org/prop#end> ?ed;
      <http://stayPoi.org/prop#next> ?g;
      <http://stayPoi.org/prop#lat> ?lat;
      <http://stayPoi.org/prop#lon> ?long.
    }ORDER BY ?st

##期間中に1回以上訪問したユーザの人数でスポットをランキングする
    select  distinct ?label ?lat ?long (count(distinct ?u)AS ?c) where {
      ?s <http://stayPoi.org/prop#user> ?u;
      <http://stayPoi.org/prop#poi> ?label;
      <http://stayPoi.org/prop#lat> ?lat;
      <http://stayPoi.org/prop#lon> ?long.
    }GROUP BY ?label ?lat ?long
    ORDER BY DESC (?c)
