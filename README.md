##

Repository of gendiff cli utility, which compares two configuration files and shows a difference.

##

# gendiff-pdronenko

[![Maintainability](https://api.codeclimate.com/v1/badges/ecc6395df5c6d892ed8c/maintainability)](https://codeclimate.com/github/pdronenko/project-lvl2-s439/maintainability)
[![Build Status](https://travis-ci.org/pdronenko/project-lvl2-s439.svg?branch=master)](https://travis-ci.org/pdronenko/project-lvl2-s439)

## Setup

```sh
$ npm install -g gendiff-pdronenko
```

## Run utility

```sh
$ gendiff [options] <firstConfig> <secondConfig>
```

## Example

```sh
$ gendiff -f plain before.ini after.ini

Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From bas to bars
Property 'group1.nest' was updated. From [complex value] to str
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

## Video of install and run gendiff utility

<a href="https://asciinema.org/a/232747"><img src="https://asciinema.org/a/232747.svg" width="100%"/></a>
