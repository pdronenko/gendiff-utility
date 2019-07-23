# gendiff CLI utility

[![Maintainability](https://api.codeclimate.com/v1/badges/ecc6395df5c6d892ed8c/maintainability)](https://codeclimate.com/github/pdronenko/project-lvl2-s439/maintainability)
[![Build Status](https://travis-ci.org/pdronenko/project-lvl2-s439.svg?branch=master)](https://travis-ci.org/pdronenko/project-lvl2-s439)

gendiff CLI utility, which compares two configuration files and shows a difference.

##

In this project, focus was on test-driven development (**TDD**, **Jest**). I got acquainted with parsing of **JSON/YAML/INI** formats, also learned how to work with the file system through **Node.js**. To build diffs between files, I used an **AST-tree**. Also actively used type dispatch. First steps in a well-designed application architecture.

В этом проекте основной упор был сделан на разработку через тестирование (**TDD**, **Jest**). Познакомился с парсингом форматов **JSON/YAML/INI**, так же научился работать с файловой системой через **Node.js**. Для построения дифов между файлами использовал **AST-дерево**. Так же активно использовал диспетчеризацию по типу. Первые шаги в разработке приложения с продуманной архитектурой.

## Setup

```sh
$ npm install -g gendiff-pdronenko
```

## Run utility

```sh
$ gendiff [options] <firstConfig> <secondConfig>
```

## Examples
### Plain format
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
### Visual format
```sh
$ gendiff -f visual before.ini after.ini

{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```
### JSON format
```sh
$ gendiff -f json before.ini after.ini

[{"type":"nested","key":"common","children":[{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"deleted","key":"setting2","value":"200"},{"type":"changed","key":"setting3","addedValue":{"key":"value"},"deletedValue":true},{"type":"nested","key":"setting6","children":[{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]},{"type":"added","key":"follow","value":false},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}}]},{"type":"nested","key":"group1","children":[{"type":"changed","key":"baz","addedValue":"bars","deletedValue":"bas"},{"type":"unchanged","key":"foo","value":"bar"},{"type":"changed","key":"nest","addedValue":"str","deletedValue":{"key":"value"}}]},{"type":"deleted","key":"group2","value":{"abc":"12345"}},{"type":"added","key":"group3","value":{"fee":"100500"}}]
```

## Video of install and run gendiff utility

<a href="https://asciinema.org/a/232747"><img src="https://asciinema.org/a/232747.svg" width="100%"/></a>
