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
SPARQLエンドポイントは，<http://lod.hozo.jp/repositories/GPS2LOD2>です．

#データの可視化サンプル　
<http://lodosaka.jp/iswc2016gtl-exp/apps/>

※<http://lodosaka.jp/iswc2016gtl-exp/apps/index.html?u=user3>  
のように  
→?u=XXXを*user1*から*user11*に変えることで各被験者のデータが確認できます，

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


