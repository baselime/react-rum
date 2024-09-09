# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2024-09-09

- fix build


## [0.3.0] - 2024-09-09

- Fix setUser - ensure updated config values are passed to the queue

## [0.2.9] - 2024-04-14

- handle use outside of context more cleanly

## [0.2.8] - 2024-02-27

- Removed console.logs

## [0.2.7] - 2023-12-22

- Prevent setUser from causing infinite loops inside use effect without passing in the dependencies. Thanks to @cdimitroulas

## [0.2.6] - 2023-12-11

- handle info = undefined correctly (Thanks @roguesherlock)
  
## [0.2.5] - 2023-11-04

- fix type for ReactNode children

## [0.2.4] - 2023-11-03

- fix crypto is undefined bug
  
## [0.2.3] - 2023-11-02 

- use headers for optional params
  
## [0.2.2] - 2023-11-01

- use public typedefs for timeout in dispatch queue
  
## [0.2.1] - 2023-11-01

- move build to node 18
  
## [0.2.0] - 2023-11-01 - 2023-10-23

- rewrite to make extensible
- batching
- error boundaries
- sendEvent
- capture exceptions
  
## [0.1.12] - 2023-10-23

- make namespace the hostname

## [0.1.11] - 2023-10-23

- Make namespace the path
  
## [0.1.10] - 2023-10-05

- make sessions behave correctly
## [0.1.9] - 2023-10-05

- add correlation ID's and session tracking

## [0.1.8] - 2023-09-29

* fix next js build
* 
## [0.1.7] - 2023-09-29

* add type definitions
  
## [0.1.6] - 2023-09-29

* fix npm install

## [0.1.5] - 2023-09-29

* Chrome Support
* Toggle local support
* Toggle Web Vitals
* Default to autocreated web dataset
  
## [0.1.4] - 2023-09-29

* Fix package name


## [0.1.3] - 2023-09-25

* Don't send events for local host
* Page view metric
## [0.1.2] - 2023-09-22

* SETUP CI

## [0.1.1] - 2023-09-22
