+++
title = "Software"
layout = "single-para"
+++

We have a [Roaring Bitmap organization on GitHub](https://github.com/RoaringBitmap) counting about 40 programmers. We
maintain a portable [format specification](https://github.com/RoaringBitmap/RoaringFormatSpec).

* [RoaringBitmap](https://github.com/lemire/RoaringBitmap/) is a widely used, robust **Java** library.
* The [CRoaring library](https://github.com/RoaringBitmap/CRoaring) is a **C/C++** library that provides an optimized implementation of Roaring for C/C++ programmers.
  *   We have a[ **Python** library wrapping our C code](https://github.com/Ezibenroc/PyRoaringBitMap).
  *   We have a [**Rust** library wrapping our C code](https://github.com/saulius/croaring-rs).
  *   We have a [**Go** library wrapping our C code](https://github.com/RoaringBitmap/gocroaring).    
  *   We have a [**C#** library wrapping our C code](https://github.com/RogueException/CRoaring.Net). It works under Windows and Linux.
  *   We have a [**Microsoft Visual Studio C++** library wrapping our C code](https://github.com/mrboojum/CRoaring4VS). It works under Windows whether you have 32-bit or 64-bit hardware (x86 and x64).
* We have a pure [**Go** implementation of Roaring](https://github.com/RoaringBitmap/roaring).

## Various ports

In addition to the Java, C/C++, Python and Go versions described above, there are many other ports.

* C++: [izenelib](https://github.com/izenecloud/izenelib/blob/master/include/am/bitmap/RoaringBitmap.h) by izenecloud
* Go: [Roaring Bitmaps - compressed bitmaps in Go](https://github.com/fzandona/goroar) by Fernando Zandona
* C: [Roaring bitmaps in C](https://github.com/chriso/roaring-bitmap) by Chris O'Hara
* Python: The [Whoosh](https://pypi.python.org/pypi/Whoosh/) search engine uses Roaring ([source code](https://bitbucket.org/mchaput/whoosh/wiki/Home))
* Java: [Apache Lucene](https://lucene.apache.org/core/) has a Roaring bitmap implementation ([source code](https://github.com/apache/lucene-solr))
* Cython: [Roaring Bitmap in Cython](https://github.com/andreasvc/roaringbitmap) by Andreas van Cranenburgh
* Rust: [Roaring bitmap implementation for Rust](https://nemo157.com/roaring-rs/) by Nemo157
* Haskell:  [Roaring bitmaps in Haskell](https://github.com/thsutton/rawr) by Thomas Sutton
* C#: [A .NET library for compressed bit set data structures](https://github.com/BitSetsNet/BitSetsNet)
* C#:  [.NET Implementation of RoaringBitmap (C#)](https://github.com/Tornhoof/RoaringBitmap)
* OCaml:  [Roaring bitmaps for OCaml](https://github.com/travisbrady/ocaml-roaring)
