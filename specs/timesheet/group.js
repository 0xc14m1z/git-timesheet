const expect = require("chai").expect
const rewire = require("rewire")

const group = require("../../lib/timesheet/group")
const groupByDate = require("../../lib/timesheet/group/groupByDate")
const groupByHour = require("../../lib/timesheet/group/groupByHour")

describe("Timesheet", () => {

  describe("groupByDate", () => {

    it("should return an empty object if no commits are given", () => {
      const commits = []

      const expectation = {}

      const result = groupByDate(commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should group commits by date", () => {
      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = {
        "2018-02-01": [
          { date: "2018-02-01", hour: "09", author: "second@user.com" }
        ],
        "2018-02-03": [
          { date: "2018-02-03", hour: "12", author: "first@user.com" },
          { date: "2018-02-03", hour: "13", author: "second@user.com" },
          { date: "2018-02-03", hour: "13", author: "third@user.com" },
          { date: "2018-02-03", hour: "14", author: "second@user.com" },
          { date: "2018-02-03", hour: "16", author: "third@user.com" },
          { date: "2018-02-03", hour: "17", author: "third@user.com" },
          { date: "2018-02-03", hour: "20", author: "third@user.com" }
        ],
        "2018-02-05": [
          { date: "2018-02-05", hour: "08", author: "second@user.com" },
          { date: "2018-02-05", hour: "12", author: "third@user.com" },
          { date: "2018-02-05", hour: "13", author: "third@user.com" },
          { date: "2018-02-05", hour: "17", author: "first@user.com" }
        ],
        "2018-02-11":[
          { date: "2018-02-11", hour: "12", author: "second@user.com" }
        ],
        "2018-02-12": [
          { date: "2018-02-12", hour: "12", author: "third@user.com" }
        ]
      }

      const result = groupByDate(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("groupByHour", () => {

    it("should return an empty object if no commits are given", () => {
      const commits = []

      const expectation = {}

      const result = groupByHour(commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should group commits by hour with default type", () => {
      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = {
        "09": { type: "WORKED", commits: [
          { date: "2018-02-01", hour: "09", author: "second@user.com" }
        ] },
        "12": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "12", author: "first@user.com" },
          { date: "2018-02-05", hour: "12", author: "third@user.com" },
          { date: "2018-02-11", hour: "12", author: "second@user.com" },
          { date: "2018-02-12", hour: "12", author: "third@user.com" }
        ] },
        "13": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "13", author: "second@user.com" },
          { date: "2018-02-03", hour: "13", author: "third@user.com" },
          { date: "2018-02-05", hour: "13", author: "third@user.com" }
        ] },
        "14": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "14", author: "second@user.com" }
        ] },
        "16": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "16", author: "third@user.com" }
        ] },
        "17": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "17", author: "third@user.com" },
          { date: "2018-02-05", hour: "17", author: "first@user.com" }
        ] },
        "20": { type: "WORKED", commits: [
          { date: "2018-02-03", hour: "20", author: "third@user.com" }
        ] },
        "08": { type: "WORKED", commits: [
          { date: "2018-02-05", hour: "08", author: "second@user.com" }
        ] }
      }

      const result = groupByHour(commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should group commits by hour with provided type", () => {
      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" }
      ]

      const expectation = {
        "09": { type: "CUSTOM_TYPE", commits: [
          { date: "2018-02-01", hour: "09", author: "second@user.com" }
        ] },
        "12": { type: "CUSTOM_TYPE", commits: [
          { date: "2018-02-03", hour: "12", author: "first@user.com" }
        ] },
        "13": { type: "CUSTOM_TYPE", commits: [
          { date: "2018-02-03", hour: "13", author: "second@user.com" },
          { date: "2018-02-03", hour: "13", author: "third@user.com" }
        ] }
      }

      const result = groupByHour(commits, "CUSTOM_TYPE")
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("group", () => {

    it("should group commits by date and hour", () => {
      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = {
        "2018-02-01": {
          "09": { type: "WORKED", commits: [
            { date: "2018-02-01", hour: "09", author: "second@user.com" }
          ] }
        },
        "2018-02-03": {
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] },
          "13": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "13", author: "second@user.com" },
            { date: "2018-02-03", hour: "13", author: "third@user.com" }
          ] },
          "14": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "14", author: "second@user.com" }
          ] },
          "16": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "16", author: "third@user.com" }
          ] },
          "17": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "17", author: "third@user.com" }
          ] },
          "20": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "20", author: "third@user.com" }
          ] }
        },
        "2018-02-05": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] },
          "13": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "13", author: "third@user.com" }
          ] },
          "17": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "17", author: "first@user.com" }
          ] }
        },
        "2018-02-11": {
          "12": { type: "WORKED", commits: [
            { date: "2018-02-11", hour: "12", author: "second@user.com" }
          ] }
        },
        "2018-02-12": {
          "12": { type: "WORKED", commits: [
            { date: "2018-02-12", hour: "12", author: "third@user.com" }
          ] }
        }
      }

      const result = group(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

})
