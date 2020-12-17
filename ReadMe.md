One of the features that most impressed me as I started working more with
JavaScript were the inclusion of functions like map, filter, reduce, and find
as part of the Array type. They allowed me to abstract away looping
boilerplate in many tasks, leaving code that more cleanly expressed my intent.
Java's Streams, python's itertools and list comprehensions, and many of C++'s
STL functions serve similar purposes.

This repository is a collection of my implementations of these functions, plus
some minor boilerplate to allow me to reason better about implementation
details in ways that feel more natural to me. It's intended as a way to come to
better understand these functions by implementing them myself, both by
understanding the tradeoffs involved and, hopefully, my finding additional
tools I hadn't been aware of when I look for new things to implement.

This repository uses Typescript, with mocha and chai for testing, and gts for
style checking.
