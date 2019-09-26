const assert = require('assert')
const url = 'https://uatflight.settour.com.tw/availableSearch?adtCount=1&chdCount=0&pfpClass=&directFlightOnly=true&depDate=20191113,20191115&depAirportCode=TPE,NRT&arrAirportCode=NRT,TPE&tripType=RT&cms=xxx&cmsPrice=0'

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url(url);
        // const title = browser.getTitle()
        // assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js')
        browser.pause(5000)
    })
})