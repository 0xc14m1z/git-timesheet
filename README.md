# git-timesheet

[![Maintainability](https://api.codeclimate.com/v1/badges/0ca86c8aaf2fec6c6839/maintainability)](https://codeclimate.com/github/0xc14m1z/git-timesheet/maintainability)

Reads a git repository commits and spits out a timesheet-like report.

## how to install

```
$ npm install -g git-timesheet
```

## how to use it

```
$ git-timesheet -h

Usage: git-timesheet [options]

Options:
  --version         Show version number                                [boolean]
  --help, -h        Show help                                          [boolean]
  --from, -f        Filter commits from this date
  --to, -t          Filter commits until this date
  --authors, -a     Filter commits by these authors                      [array]
  --continuity, -c  Hours between commits to be considered as worked[default: 1]
  --prestart, --ps  Hours before the first commit per day to be considered as
                    worked                                          [default: 1]
  --outputFile, -o  Path of the output file         [default: "./timesheet.pdf"]
```
