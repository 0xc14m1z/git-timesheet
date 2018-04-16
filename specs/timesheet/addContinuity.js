const expect = require("chai").expect

const addContinuity = require("../../lib/timesheet/addContinuity")

describe("Timesheet", () => {

  describe("addContinuity", () => {

    it("should return the same object if no continuty hours are given", () => {
      const day = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
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
          "09": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] },
        }
      }

      const expectation = day

      const result = addContinuity(0)(day)
      expect(result).to.deep.equal(expectation)
    })

    it("should add 1 hour of continuity between worked hours", () => {
      const day = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
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
          "09": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] },
        }
      }

      const expectation = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
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
          "15": { type: "CONTINUITY", commits: [] },
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
          "09": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] },
        }
      }

      const result = addContinuity(0)(day)
      expect(result).to.deep.equal(expectation)
    })

    it("should add 2 hours of continuity between worked hours", () => {
      const day = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
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
          "09": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] },
        }
      }

      const expectation = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
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
          "15": { type: "CONTINUITY", commits: [] },
          "16": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "16", author: "third@user.com" }
          ] },
          "17": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "17", author: "third@user.com" }
          ] },
          "18": { type: "CONTINUITY", commits: [] },
          "19": { type: "CONTINUITY", commits: [] },
          "20": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "20", author: "third@user.com" }
          ] }
        },
        "2018-02-05": {
          "09": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "08", author: "second@user.com" }
          ] },
          "10": { type: "CONTINUITY", commits: [] },
          "11": { type: "CONTINUITY", commits: [] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "12", author: "third@user.com" }
          ] }
        }
      }

      const result = addContinuity(2)(day)
      expect(result).to.deep.equal(expectation)
    })

  })

})
