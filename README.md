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
POI情報は，
 - 神戸市のオープンデータ(http://www.city.kobe.lg.jp/information/opendata/catalogue.html)
 - DBpedia Japanese(http://ja.dbpedia.org/)
 - Wikidata(https://wikidata.org/)
 を用いて作成しました．

## データの公開場所
各データは，それぞれ下記のフォルダから取得できます．
* CSV　CSV形式のデータ
* GPX　GPX形式のデータ
* RDF　RDF形式のデータ（CSV形式のデータを元に変換して作成）
* POI.csv　RDF形式のデータ作成に利用したPOI情報

## ライセンス
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />本データ は <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">クリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。</a><br>
著作者には *「GPS trajectory linked data project」* と表示してください．

## SPARQLエンドポイント
<http://lod.hozo.jp/repositories/GPS2LOD>

# RDFデータのモデル
## 基本的な考え方
本データモデルは，「POI情報」および「各ユーザの移動軌跡」のそれぞれを表す2種類のデータモデルから構成さます．
「訪問情報」には```<http://lodosaka.jp/iswc2016gtl-exp/data/ユーザID-id>```という一意のURIが与えられており，「訪問情報」のつながりを辿ることで，そのユーザの「移動軌跡」が分かります．

## データ作成方法
CSV形式のデータの各レコードに対し，POI情報の緯度経度と比較し，一定の距離内にあるとき「そのスポットに入った」と判定して，下記のプロパティを持つ「訪問情報」を作成しています．  
連続するレコードが「同じスポット」と判定された場合は，１つの「訪問情報」としてまとめています．

## Prefix（接頭語）の定義

```
gtl: <http://lodosaka.jp/iswc2016gtl-exp/data/> .
gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#> .
gtl-class: <http://lodosaka.jp/iswc2016gtl-exp/class#> .
rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
xsd: <http://www.w3.org/2001/XMLSchema#> .
geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .
```

## プロパティ
### (a) POIクラスのプロパティ
| プロパティ名 | 値域 | 説明 |
----|----|----
| rdfs:label | 文字列 | POIの名称 |
| geo:lat | 	xsd:float |	POIの緯度 |
| geo:lon | 	xsd:float	| POIの経度 |
| gtl-prop:source	| 文字列	| POI情報の取得元のオープンデータ <br> 複数の値を持つことが許される |
| rdfs:seeAlso	| IRI	| POIの関連情報への外部リンク <br> （DBpedia Japanese，Wikidataへリンク）複数の値を持つことが許される |  


### (b) StayPOIクラスのプロパティ
| プロパティ名 | 値域 | 説明 |
----|----|----
| gtl-prop:user	| 文字列	| 滞在したユーザの匿名化されたID |
| rdfs:label | 文字列 | 滞在したPOIの名称 |
| gtl-prop:poi | IRI | 滞在したPOI（POIリソースを参照） |
| gtl-prop:date | yyyy-mm-dd | POIに入った年月日 |
| gtl:time | xsd:int | POIに入った時間（0-23） |
| gtl-prop:start | xsd:dateTime | POIに入った日時・時刻 |
| gtl-prop:end | xsd:dateTime | POIを出た日時・時刻 |
| gtl-prop:next | IRI | 次の滞在情報 |

## データ例
### (a) POI情報のRDFデータ例：神戸国際会議場

```
gtl:poi-43
  rdf:type  gtl-class:POI;
  rdfs:label  "神戸国際会議場" ;
  geo:lat  "34.666234"^^xsd:float ;
  geo:lon  "135.21301"^^xsd:float ;
rdfs:seeAlso  <http://www.wikidata.org/entity/Q11589835> ;
  gtl-prop:source  "ロケ地" ;
  gtl-prop:source  "Wikidata" ;
gtl-prop:source  "観光施設情報" .
```

### (b)移動軌跡のRDFデータ例：神戸国際会議場への滞在

```
gtl:user1-7
rdf:type  gtl-class:StayPOI ;
gtl-prop:user  "user1" ;
rdfs:label  "神戸国際会議場" ;
gtl-prop:poi  gtl:poi-43 ;
gtl-prop:date  "2016-10-17" ;
gtl-prop:time  "12"^^xsd:int  ;
gtl-prop:start  "2016-10-17T12:14:18Z"^^xsd:dateTime ;
gtl-prop:end  "2016-10-17T12:22:28Z"^^xsd:dateTime ;
gtl-prop:next  gtl:user1-8 .
```

# データの可視化サンプル
## 参加者が訪問したスポットの可視化
[参加者毎の訪問日数]　　
<http://lodosaka.jp/iswc2016gtl-exp/dp/apps2a/>

## 参加者が訪問したスポットの可視化
[訪問した人数]　　
<http://lodosaka.jp/iswc2016gtl-exp/dp/apps2b/>


# サンプルクエリ
## (a) user1の移動軌跡の情報を時間順にすべて取得するクエリ

```
PREFIX gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geo: < http://www.w3.org/2003/01/geo/wgs84_pos#>

SELECT DISTINCT * where {
?s　 gtl-prop:user  "user1";
  　 rdfs:label   ?label;
  　 gtl-prop:poi   ?poi;
  　 gtl-prop:date  ?d;
  　 gtl-prop:start ?st;
  　 gtl-prop:end   ?ed;
  　 gtl-prop:next  ?g.
?poi geo:lat   ?lat;
  　 geo:lon   ?long.
}ORDER BY ?st.
```

## (b)1回以上訪問したユーザ数でPOIをランキングするクエリ

```
PREFIX gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geo: < http://www.w3.org/2003/01/geo/wgs84_pos#>

SELECT DISTINCT ?label ?lat ?long
     (count(distinct ?u)AS ?c) where {
?s   gtl-prop:user ?u;
     rdfs:label    ?label;
     gtl-prop:poi  ?poi.  	
?poi geo:lat  ?lat;
     geo:lon  ?long.
}GROUP BY ?label ?lat ?long
ORDER BY DESC (?c)
```

## (c) 複数の地点の共に訪問したユーザを取得するクエリ

```
PREFIX gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?u where {
?s1  gtl-prop:user ?u;
     rdfs:label  "生田神社".  
?s2  gtl-prop:user ?u;
     rdfs:label  "UCCコーヒー博物館".  }
 ```

## (d) user1が会議期間中の18時以降に訪問したPOIを取得するクエリ

```
PREFIX gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?poi ?label where {
?s   gtl-prop:user "user1";
gtl-prop:poi ?poi;
    gtl-prop:time ?t.
FILTER(?t >= 18)
    ?poi rdfs:label ?label.  }
```
