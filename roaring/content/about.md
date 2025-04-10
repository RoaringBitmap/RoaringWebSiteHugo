+++
#title = "About"
layout = "single-para"
+++

Bitsets, also called bitmaps, are commonly used as fast data structures. Unfortunately, they can use too much memory. To compensate, we often use compressed bitmaps.

Roaring bitmaps are compressed bitmaps which tend to outperform conventional compressed bitmaps such as WAH, EWAH or Concise. In some instances, they can be hundreds of times faster and they often offer significantly better compression.

>Use Roaring for bitmap compression whenever possible. Do not use other bitmap compression methods ([Wang et al., SIGMOD 2017](http://db.ucsd.edu/wp-content/uploads/2017/03/sidm338-wangA.pdf))

Roaring bitmaps are used by several important systems:

*   [Google Procella](https://research.google/pubs/pub48388/): YouTube's SQL query engine,
*   [Apache Lucene](http://lucene.apache.org/core/) and derivative systems such as Solr and [Elastic](https://www.elastic.co/),
*   [Apache Hive](http://hive.apache.org),
*   [Apache Tez](http://tez.apache.org),
*   [Apache Druid](http://druid.io/),
*   [Apache Spark](http://spark.apache.org),
*   [Apache Zeppelin](https://zeppelin.apache.org),
*   [Apache Doris](http://doris.incubator.apache.org),
*   [Apache CarbonData](https://carbondata.apache.org),
*   [ClickHouse](https://clickhouse.com),
*   [Netflix Atlas](https://github.com/Netflix/atlas),
*   [Apache Pinot](https://pinot.apache.org),
*   [OpenSearchServer](http://www.opensearchserver.com),
*   [Cloud Torrent](https://github.com/jpillora/cloud-torrent),
*   [Whoosh](https://pypi.python.org/pypi/Whoosh/),
*   [Pilosa](https://www.pilosa.com/),
*   [Microsoft Visual Studio Team Services (VSTS)](https://www.visualstudio.com/team-services/),
*   [Intel's Optimized Analytics Package (OAP)](https://github.com/Intel-bigdata/OAP),
*   [Tablesaw](https://github.com/jtablesaw/tablesaw),
*   [Jive Miru](https://github.com/jivesoftware/miru),
*   [Gaffer](https://github.com/gchq/Gaffer),
*   [Apache Hivemall](http://hivemall.incubator.apache.org),
*   [lindb](https://github.com/lindb/lindb),
*   [Elasticell](https://github.com/deepfabric/elasticell),
*   [SourceGraph](https://github.com/sourcegraph/sourcegraph),
*   [M3](https://github.com/m3db/m3),
*   [FrostDB](https://github.com/polarsignals/frostdb),
*   [StarRocks](https://github.com/StarRocks/starrocks),
*   [Redpanda](https://github.com/redpanda-data/redpanda),
*   [ntop](https://www.ntop.org),
*   [trident](https://github.com/NetApp/trident),
*   eBay's [Apache Kylin](http://kylin.io),
*   [Weaviate](https://weaviate.io)

There are freely available software libraries providing Roaring bitmaps in almost all the popular programming languages (Java, C, C++, Go, C#, Rust, Python...).

There is a serialized [format specification](https://github.com/RoaringBitmap/RoaringFormatSpec/) for interoperability between implementations.


Roaring bitmaps are used in many proprietary systems. For example, it is used at SEEK:

> The SEEK Group is a broad array of companies that specialise in employment and education. We maintain a presence in 18 countries, reach approximately 3 billion people and employ over 10,000 individuals around the world. We invest heavily in AI and technology to deliver on our purpose of helping people live more fulfilling and productive working lives and enjoy a leading position in online employment marketplaces. A core product in online employment is Job Search. We recently released a new version of this search engine, called [Smarter Search](https://www.seek.com.au/about/news/seek-smarter-search-with-ai). It blends AI with advanced search technology and has delivered significant lifts in relevance and performance for both candidates and hirers. The engine indexes a massive volume of data and must answer large volumes of diverse queries with extremely low latency. We invest heavily in our own proprietary technology, but also make use of best-in-class data structures where available. We selected the open source [Roaring Bitmap](https://roaringbitmap.org/) library as the compressed bitset at the core of the matching engine, and it has delivered fantastic speed and stability. Research into fields such as advanced data structures and high performance computing remain extremely important to SEEK and many other technology companies. We are excited to continue our own investments in these fields, along with supporting the open source ecosystem and research community through our graduate programs and sponsorships.
>
> Mark Pritchard,
> Director of Search and Technology,
> AI Platform Services,
> SEEK Limited

## When should you use a bitmap?

Sets are a fundamental abstraction in software. They can be implemented in various ways, as hash sets, as trees, and so forth. In databases and search engines, sets are often an integral part of indexes. For example, we may need to maintain a set of all documents or rows (represented by numerical identifier) that satisfy some property. Besides adding or removing elements from the set, we need fast functions to compute the intersection, the union, the difference between sets, and so on.

To implement a set of integers, a particularly appealing strategy is the bitmap (also called bitset or bit vector). Using n bits, we can represent any set made of the integers from the range [0,n): it suffices to set the ith bit is set to one if integer i is present in the set. Commodity processors use words of W=32 or W=64 bits. By combining many such words, we can support large values of n. Intersections, unions and differences can then be implemented as bitwise AND, OR and ANDNOT operations. More complicated set functions can also be implemented as bitwise operations.

When the bitset approach is applicable, it can be orders of magnitude faster than other possible implementation of a set (e.g., as a hash set) while using several times less memory.


However, a bitset, even a compressed one is not always applicable. For example, if you have 1000 random-looking integers, then a simple array might be the best representation. We refer to this case as the "sparse" scenario.

## When should you use compressed bitmaps?

An uncompressed BitSet can use a lot of memory. For example, if you take a BitSet and set the bit at position 1,000,000 to true and you have just over 100kB. That is over 100kB to store the position of one bit. This is wasteful even if you do not care about memory: suppose that you need to compute the intersection between this BitSet and another one that has a bit at position 1,000,001 to true, then you need to go through all these zeroes, whether you like it or not. That can become very wasteful.

This being said, there are definitively cases where attempting to use compressed bitmaps is wasteful. For example, if you have a small universe size. E.g., your bitmaps represent sets of integers from [0,n) where n is small (e.g., n=64 or n=128). If you are able to use uncompressed BitSet and it does not blow up your memory usage, then compressed bitmaps are probably not useful to you. In fact, if you do not need compression, then a BitSet offers remarkable speed.

The sparse scenario is another use case where compressed bitmaps should not be used.
Keep in mind that random-looking data is usually not compressible. E.g., if you have a small set of
32-bit random integers, it is not mathematically possible to use far less than 32 bits per integer,
and attempts at compression can be counterproductive.

## How does Roaring compares with the alternatives?

Most alternatives to Roaring are part of a larger family of compressed bitmaps that are run-length-encoded bitmaps. They identify long runs of 1s or 0s and they represent them with a marker word. If you have a local mix of 1s and 0, you use an uncompressed word.

There are many formats in this family:

*   Oracle's BBC is an obsolete format at this point: though it may provide good compression, it is likely much slower than more recent alternatives due to excessive branching.
*   WAH is a patented variation on BBC that provides better performance.
*   Concise is a variation on the patented WAH. It some specific instances, it can compress much better than WAH (up to 2x better), but it is generally slower.
*   EWAH is both free of patent, and it is faster than all the above. On the downside, it does not compress quite as well. It is faster because it allows some form of "skipping" over uncompressed words. So though none of these formats are great at random access, EWAH is better than the alternatives.

There is a big problem with these formats however that can hurt you badly in some cases: there is no random access. If you want to check whether a given value is present in the set, you have to start from the beginning and "uncompress" the whole thing. This means that if you want to intersect a big set with a large set, you still have to uncompress the whole big set in the worst case...

Roaring solves this problem. It works in the following manner. It divides the data into chunks of 65536 integers (e.g., [0, 65536), [65536, 2 x 65536, ...). Within a chunk, it can use an uncompressed bitmap, a simple list of integers, or a list of runs. Whatever format it uses, they all allow you to check for the presence of any one value quickly (e.g., with a binary search). The net result is that Roaring can compute many operations much faster than run-length-encoded formats like WAH, EWAH, Concise... Maybe surprisingly, Roaring also generally offers better compression ratios.


## Funding

This work was supported by NSERC grant number 26143.
