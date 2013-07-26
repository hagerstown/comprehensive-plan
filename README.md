# Hagerstown, IN Comprehensive Plan website

The new version of the Hagerstown, IN Comprehensive Plan. This project builds
a static website with live search and a printable version of the full report.

## Build

This project requires [`node`](http://nodejs.org/). Make sure you have it
installed, then:

    make

The generated site will reside in `build`.

## Contribute

The Comprehensive Plan consists of content written in
[Markdown](http://daringfireball.net/projects/markdown/), layouts which
structure the content into an HTML page, and static assets (such as stylesheets,
images and scripts).

Contributing should be pretty straightforward. The build system is comprised of
the `build.js` script and the `lib` directory. Feel free to poke around to see
whats happening.

### Content

Content, or *sections* and *subsections*, are located in `content`. Each section
directory (i.e. `01-introduction`) must be prepended with a zero-based number
representing the section's order within the document. The table of contents is
generated dynamically based off of these numbers.

Within each section directory there must be an `index.md` and subsection files
named in a similar fashion: `01-area-and-context.md`.

Each Markdown file must start with a level 1 heading:

    # Hello World

    Welcome to the section.

### Layouts

Layouts are located in `layouts` and are rendered using
[EJS](https://github.com/visionmedia/ejs). There are two main layouts: `default`
and `full-report` (for printing the whole document), and a number of includes
located in `layouts/includes`.

### Assets

All static assets that don't require preprocessing (stylesheets, images,
scripts, etc.), reside in `public` and are copied over to the `build` directory
when generating the site.

## Publish

Publishing is as easy as building:

    make publish

If you want to change the publish directory or host, just edit the `publish`
rule in the `Makefile`.

## Contact

For questions, concerns, amendments, etc., please contact Bob Warner,
*Town Manager* <[bobwarner87@yahoo.com](mailto:bobwarner87@yahoo.com)>.

## License

The MIT License (MIT)

Copyright (c) 2013-2014 Hagerstown, IN

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


