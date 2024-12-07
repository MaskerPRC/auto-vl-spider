{
  "news": [
    {
      "date": "2023-02-04",
      "source": "jerd, compiler, unison, programming languages",
      "summary": "What if type inference felt like a real-time conversation",
      "title": "Type inference that sticks"
    },
    {
      "date": "2021-03-02",
      "source": "programming languages, unison",
      "summary": "Unison is doing a lot of interesting things",
      "title": "What's cool about Unison?"
    },
    {
      "date": "2020-09-30",
      "source": "local-first, offline-first",
      "summary": "I’m excited to review Hypermerge, as it was developed by the folks from Ink",
      "title": "Local-first database: Hypermerge"
    },
    {
      "date": "2020-05-12",
      "source": "local-first, offline-first",
      "summary": "",
      "title": "Local-first database: RxDB + PouchDB"
    },
    {
      "date": "2020-05-06",
      "source": "local-first, offline-first",
      "summary": "remoteStorage.js is a an offline-first solution that’s been around for quite",
      "title": "Local-first database: remoteStorage.js"
    },
    {
      "date": "2020-05-01",
      "source": "local-first",
      "summary": "Gun.js is an open-source project I’ve had my eye on for several years now",
      "title": "Local-first database: gun.js"
    },
    {
      "date": "2020-04-11",
      "source": "local-first, offline-first",
      "summary": "I’ve been wrestling with the issue of “data storage that syncs and works",
      "title": "In Search of a Local-First Database"
    },
    {
      "date": "2020-02-14",
      "source": "local-first",
      "summary": "This is the first in a series of posts digging into James Long’s talk CRDTs",
      "title": "Hybrid Logical Clocks"
    },
    {
      "date": "2019-12-31",
      "source": "",
      "summary": "",
      "title": "My Scientific Sourdough 🍞"
    },
    {
      "date": "2019-05-28",
      "source": "",
      "summary": "One of the things that keeps coming up as a pain point in Reason",
      "title": "Automatic, well-typed JSON serialization in Reason/OCaml with Milk 🥛"
    },
    {
      "date": "2019-05-16",
      "source": "rust",
      "summary": "I just spent the past two weeks building a GUI Rust app to help you",
      "title": "Terraform: generate 3-d models of geographic terrain"
    },
    {
      "date": "2018-11-13",
      "source": "graphql, ocaml, reason",
      "summary": "One thing that you’ll run into when interfacing with complex javascript",
      "title": "Optional Attribute Access in Reason"
    },
    {
      "date": "2018-11-10",
      "source": "ocaml, reason",
      "summary": "I’m planning to do some fancy social science analysis of the results",
      "title": "State of Reason Survey: Preliminary Results"
    },
    {
      "date": "2018-09-07",
      "source": "server, native, ocaml, reason",
      "summary": "I’m working on a new ReasonReact project that will need a stateful",
      "title": "Deploying Native Reason/OCaml with Zeit's now.sh"
    },
    {
      "date": "2018-01-23",
      "source": "android, ocaml, reason",
      "summary": "",
      "title": "Hot-reloading OCaml on Web, Desktop, and Android"
    },
    {
      "date": "2018-01-23",
      "source": "android, ios, ocaml, reason",
      "summary": "I recently released a tool that will manage all of this stuff (see the",
      "title": "Reason mobile cross-compilation deep dive"
    },
    {
      "date": "2018-01-13",
      "source": "android, ios, game, reason",
      "summary": "I launched the first cross-platform mobile native game written in Reason a",
      "title": "Making a cross-platform mobile game in Reason/OCaml"
    },
    {
      "date": "2017-12-30",
      "source": "await, ocaml, reason",
      "summary": "Lots of people have come into the discord channel asking about how to",
      "title": "Building async/await in Reason"
    },
    {
      "date": "2017-11-12",
      "source": "react, reason",
      "summary": "After jumping into ReasonReact, I soon came to the question “How do I",
      "title": "Advanced ReasonReact: Higher Order Components"
    },
    {
      "date": "2017-07-05",
      "source": "react, tutorial, ocaml, reason",
      "summary": "Are you a big fan of React, and want to know more about Reason/OCaml?",
      "title": "A ReasonReact Tutorial"
    },
    {
      "date": "2017-06-23",
      "source": "ocaml, reason",
      "summary": "Someone came into our discord channel a few days ago asking “Is Reason",
      "title": "When will ReasonML be ready?"
    },
    {
      "date": "2017-06-20",
      "source": "macros, ocaml, reason",
      "summary": "A couple of people have shown up in the discord channel asking whether",
      "title": "Template-based macros in Reason/OCaml"
    },
    {
      "date": "2017-06-17",
      "source": "tutorial, ocaml, reason",
      "summary": "I just wrote my first Reason project that compiled to native, and you can",
      "title": "Your first native Reason/OCaml project"
    },
    {
      "date": "2017-06-03",
      "source": "ocaml, reason, javascript",
      "summary": "A couple of people have asked me how to get up and running recently, so I",
      "title": "Getting Started with Reason and BuckleScript"
    },
    {
      "date": "2017-06-03",
      "source": "tutorial, ocaml, reason, javascript",
      "summary": "So you’re all ready to write some Reason but you need to call a JavaScript",
      "title": "JavaScript Interop with Reason and BuckleScript"
    },
    {
      "date": "2017-04-08",
      "source": "tooling, babel, javascript",
      "summary": "Last week, my coworker Charlie asked what it would take to automatically",
      "title": "Detecting unused styles in JavaScript with `babel-traverse`"
    },
    {
      "date": "2015-11-26",
      "source": "javascript, clojurescript, clojure",
      "summary": "I’ve expressed multiple times that I really want to get into clojurescript",
      "title": "What Holds Me Back From Clojurescript"
    },
    {
      "date": "2015-03-06",
      "source": "react, rxjs, javascript",
      "summary": "Reactive Programming is getting a lot of attention these days, and it",
      "title": "Visualizing Reactive Streams: Hot and Cold Observables"
    },
    {
      "date": "2014-11-22",
      "source": "notablemind, compiler, rust",
      "summary": "For the web-based everything notebook that I’m working on, I’ve been",
      "title": "Rust compiling rust: adventures with librustc"
    },
    {
      "date": "2014-07-26",
      "source": "blog",
      "summary": "My blog used to use Hyde, a python clone of the popular jekyll platform",
      "title": "Switching from Ghost to Hexo"
    },
    {
      "date": "2014-07-26",
      "source": "blog, announce, react, javascript",
      "summary": "I recently switched from ghost to hexo, and the biggest thing missing for",
      "title": "The Hexo static blogging engine gets an admin UI"
    },
    {
      "date": "2014-03-22",
      "source": "golang, rust",
      "summary": "Go and Rust seem like natural competitors. They are both trying the role",
      "title": "Rust vs Go"
    },
    {
      "date": "2014-03-20",
      "source": "simulation, art, rust",
      "summary": "A while ago, I made a cellular automata simulator in Go, inspired by",
      "title": "First Impressions of Rust"
    },
    {
      "date": "2014-01-29",
      "source": "tutorial, machine learning, javascript",
      "summary": "The perceptron is one of the most primitive learners, and is also of",
      "title": "The Noble Perceptron"
    },
    {
      "date": "2014-01-20",
      "source": "announce, javascript, art",
      "summary": "A few months ago I saw @scanlime’s “Zen Photon Garden” on hacker news",
      "title": "Photon Ray Tracing"
    }
  ]
}
