# Overvew
This is the repository to publish data collected through [GPS trajectory linked data project](<http://iswc2016.semanticweb.org/pages/attending/applications.html) in ISWC2016, Kobe.

The overview is discussed in the following paper;
- GPS Trajectory Linked Open Data based on Open POI Information <br>
  -Through an Experiment in ISWC2016- <br>
   Kouji Kozaki, Teruaki Yokoyama and Yoshiaki Fukami<br>
   [Download paper (preprint)](https://iswc2017.ai.wu.ac.at/wp-content/uploads/papers/PostersDemos/paper624.pdf)

<!--
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
## Kinds of data

* CSV　CSV形式のデータ
* GPX　GPX形式のデータ
* RDF　RDF形式のデータ（CSV形式のデータを元に変換して作成）
* POI.csv　RDF形式のデータ作成に利用したPOI情報
-->

## License
<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br>
This work is licensed under <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">a Creative Commons Attribution 4.0 International License</a>.<br>
The license holder is *「GPS trajectory linked data project」* ．

## SPARQL Endpoint
<http://lod.hozo.jp/repositories/GPS2LOD>

# RDF data model
<!--
## 基本的な考え方
本データモデルは，「POI情報」および「各ユーザの移動軌跡」のそれぞれを表す2種類のデータモデルから構成さます．
「訪問情報」には```<http://lodosaka.jp/iswc2016gtl-exp/data/ユーザID-id>```という一意のURIが与えられており，「訪問情報」のつながりを辿ることで，そのユーザの「移動軌跡」が分かります．

## データ作成方法
CSV形式のデータの各レコードに対し，POI情報の緯度経度と比較し，一定の距離内にあるとき「そのスポットに入った」と判定して，下記のプロパティを持つ「訪問情報」を作成しています．  
連続するレコードが「同じスポット」と判定された場合は，１つの「訪問情報」としてまとめています．
-->
## Prefix

```
gtl: <http://lodosaka.jp/iswc2016gtl-exp/data/> .
gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#> .
gtl-class: <http://lodosaka.jp/iswc2016gtl-exp/class#> .
rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
xsd: <http://www.w3.org/2001/XMLSchema#> .
geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .
```

## Properties
### (a) POI class
| property name | range | explanation |
----|----|----
| rdfs:label | Literal | Name of the POI |
| geo:lat | 	xsd:float |	Latitude of the POI |
| geo:lon | 	xsd:float	| Longitude of the POI |
| gtl-prop:source	| Literal	| Literal	Information of source (open data) of the POI |
| rdfs:seeAlso	| IRI	| Links to the related resource of the POI <br> （Links to DBpedia Japanese and/or Wikidata) |  


### (b) StayPOI class
| property name | range | explanation |
----|----|----
| gtl-prop:user	| Literal	| User name (ID) |
| rdfs:label | Literal | Name of the POI which the user stay |
| gtl-prop:poi | IRI | The POI information (reference to the POI resource) |
| gtl-prop:date | yyyy-mm-dd | The date which the user enter the POI |
| gtl:time | xsd:int | The time (hour) which the user enter the POI（0-23） |
| gtl-prop:start | xsd:dateTime | The date and time which the user enter the POI |
| gtl-prop:end | xsd:dateTime | The date and time which the user leave the POI |
| gtl-prop:next | IRI | The next stay information by the user |

## Exampled data
### (a) POI information

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

### (b) GPS trajectory

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

# Examples of visualizations of POIs where participants visited
## The number of days which a user visited each POI　　
<http://lodosaka.jp/iswc2016gtl-exp/dp/apps2a/>

## The number of users who visited each POI　　
<http://lodosaka.jp/iswc2016gtl-exp/dp/apps2b/>


# Sample queries
## (a) Obtain all trajectory information of user1

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

## (b) ranking the number of uses who visited each POI

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

## (c) Obtain users who visited both of "生田神社" and "UCCコーヒー博物館"

```
PREFIX gtl-prop: <http://lodosaka.jp/iswc2016gtl-exp/prop#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?u where {
?s1  gtl-prop:user ?u;
     rdfs:label  "生田神社".  
?s2  gtl-prop:user ?u;
     rdfs:label  "UCCコーヒー博物館".  }
 ```

## (d) Obtain POIs where user1 visited after 18 pm.

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
