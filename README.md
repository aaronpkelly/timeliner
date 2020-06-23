# Timeliner

"See the earth as it was" - original headline

This was a cool little project that I made which displays pushpins on a map when a city was founded, up until it is destroyed.

# How it works

I develop this project on sr.ht, push it to github, which is then picked up by hub.docker.com and built automatically

# Getting started

Oh I need help, yes I do:

https://wesbos.com/javascript-modules/

## Docker

Run the docker image, then connect to the container in your browser at http://localhost:8080:

```
docker run --rm -p 80:80 aaronpkelly/timeliner
```

You can also build the image, but you will need to pass in a Github personal access token for authorising with Github packages (https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages), as the image depends on npm libraries that are published there:
```
docker build -t aaronpkelly/timeliner .
```

## Gitpod

TODO: i can't get the app started with these files yet

### Other ways

If you are not running the container, you will need to:
- authenticate with the github packages nmp repo
- install the dependencies by running:
```
npm install
```

You also may need to generate your own "Maps JavaScript API" token.

Go here and create a MAPS Javascript API "project", setup BILLING for your
project, and then you can generate one: https://console.cloud.google.com/google/maps-apis

Then you can just directly run the _index.html_ file. 

# How it works

Displays a simple flat map of earth, and populates it with pushpins when you give it some time-series data.

It takes in a fairly simple JSON file:
```
  {
    "city": "Jericho",
    "founded": -9600,
    "abandoned": 3000,
    "lat": 31.52,
    "lng": 35.26
  },
```

And will display a pushpin on the map as long as the year is between those two values.

# Usage

- UP/DOWN arrow keys increase the step amount
- LEFT/RIGHT arrow keys increment/decrement the year 

# Technical notes

This app requires to be hosted and run on a webserver in order for the pushpins to work,
as the way I read JSON files is using _xmlhttp_, and there's some weird CORS shit
that messes with things if you don't.

# The future

The code can/should be generalised to display ANY time-series event data,
ideally with beginnings+ends, as there would be a lot of pushpins if
single-event tracking was been done. Births/deaths of Greek philosophers, human
settlements/tribes, empires, time spent in music chart #1 by city of origin...

Also, TESTS. I NEED TESTS.
