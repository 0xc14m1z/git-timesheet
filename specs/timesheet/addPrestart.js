const expect = require("chai").expect

const addPrestart = require("../../lib/timesheet/addPrestart")

describe("Timesheet", () => {

  describe("addPrestart", () => {

    it("should return the same object if no prestart hours are given", () => {
      const days = {
        "2018-02-03": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "08", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] }
        },
        "2018-02-05": {
          "05": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "05", author: "second@user.com" }
          ] }
        }
      }

      const expectation = days

      const result = addPrestart(0)(days)
      expect(result).to.deep.equal(expectation)
    })

    it("should 1 hour of prestart before the first commit of the day, if it's after 1am", () => {
      const days = {
        "2018-02-03": {
          "00": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "00", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] }
        },
        "2018-02-05": {
          "01": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "01", author: "second@user.com" }
          ] }
        },
        "2018-02-06": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-06", hour: "08", author: "second@user.com" }
          ] }
        }
      }

      const expectation = {
        "2018-02-03": {
          "00": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "00", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] }
        },
        "2018-02-05": {
          "00": { type: "PRESTART" },
          "01": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "01", author: "second@user.com" }
          ] }
        },
        "2018-02-06": {
          "07": { type: "PRESTART" },
          "08": { type: "WORKED", commits: [
            { date: "2018-02-06", hour: "08", author: "second@user.com" }
          ] }
        }
      }

      const result = addPrestart(1)(days)
      expect(result).to.deep.equal(expectation)
    })

    it("should 2 hour of prestart before the first commit of the day, if it's after 2am", () => {
      const days = {
        "2018-02-03": {
          "00": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "00", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] }
        },
        "2018-02-05": {
          "01": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "01", author: "second@user.com" }
          ] }
        },
        "2018-02-06": {
          "08": { type: "WORKED", commits: [
            { date: "2018-02-06", hour: "08", author: "second@user.com" }
          ] }
        }
      }

      const expectation = {
        "2018-02-03": {
          "00": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "00", author: "second@user.com" }
          ] },
          "12": { type: "WORKED", commits: [
            { date: "2018-02-03", hour: "12", author: "first@user.com" }
          ] }
        },
        "2018-02-05": {
          "01": { type: "WORKED", commits: [
            { date: "2018-02-05", hour: "01", author: "second@user.com" }
          ] }
        },
        "2018-02-06": {
          "06": { type: "PRESTART" },
          "07": { type: "PRESTART" },
          "08": { type: "WORKED", commits: [
            { date: "2018-02-06", hour: "08", author: "second@user.com" }
          ] }
        }
      }

      const result = addPrestart(2)(days)
      expect(result).to.deep.equal(expectation)
    })

  })

})
