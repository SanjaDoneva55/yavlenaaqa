"use strict";
const uiURLs = require("../../data/uiPageUrls");
const BrokerPage = require("../ui/broker"),
  brokerPage = new BrokerPage();
const e = require("chai");

describe("Select a Broker and verify their data", () => {
  let brokersNames = [];
  let searchBox;
  let brokerCardList = [];

  let allBrokers = [];
  let brokerAddresses = [];
  let allNumberOfProperties = [];
  let allPhoneNumbers = [];

  let brokerNames = [];
  let nameForSearch = [];

  beforeEach(async () => {
    //GET TITLE
    await browser.url(uiURLs.brokers);

    //CHECK IF TITLE IS DISPLAYED
    const title = await brokerPage.brokersTitle;
    await expect(title).toBeDisplayed();

    //ACCEPT COOKIES
    await brokerPage.clickAgreeCookies();

    //CLICK LOAD MORE
    await brokerPage.clickLoadMoreBtn();

    //CHECK IF LOAD MORE BTN IS STILL DISPLAYED AFTER CLICK
    await expect(brokerPage.loadMoreBtn).not.toBeDisplayed();

    //GET THE ELEMENTS BY SELECTOR
    brokerCardList = await brokerPage.brokerCardList;
    brokersNames = [...(await brokerPage.fullBrokersListOfNames)];
    brokerAddresses = [...(await brokerPage.fullListOfAddresses)];
    allNumberOfProperties = [...(await brokerPage.numberOfProperties)];
    allPhoneNumbers = [...await brokerPage.phoneNumbers];

    //GET THE SEARCH FIELD ELEMENT AND CHECK IF DISPLAYED ON PAGE
    searchBox = await brokerPage.searchBox;
    expect(searchBox).toBeDisplayed();

    //GET THE FULL LIST OF BROKERS NAMES, ADDRESSES, PROPERTIES AND PHONE NUMBERS
    for (let i = 0; i < brokersNames.length; i++) {
      const name = await brokersNames[i].getText();
      const address = await brokerAddresses[i].getText();
      const numberOfProp = await allNumberOfProperties[i].getText();
      const phoneNumbers = await allPhoneNumbers[i]

      allBrokers[i] = {
        brokerName: name,
        brokerAddress: address,
        numOfProperties: numberOfProp,
        landlinePhone: phoneNumbers[0] ? phoneNumbers[0] : null,
        mobilePhone: phoneNumbers[1] ? phoneNumbers[1] : null
      };
    }

    //GET ALL BROKER NAMES
    nameForSearch = allBrokers.map(({ brokerName }) => ({ brokerName }));
    nameForSearch[0].brokerName;
  });

  afterEach(async () => {
    //DELETE COOKIES
    await browser.deleteCookies();
  });

  it("Check the Broker info", async () => {
    setTimeout(async () => {
      const nmb = await brokerPage.loadingState;
      const att = await nmb.getAttribute(`style`);
      if (att.equals("display: none;")) return true;
      else return false;
    }, "3000");

    //TYPE IN THE NAME OF THE BROKER IN THE SEARCH FIELD
    for (let i = 0; i < nameForSearch.length; i++) {
      const broker = await nameForSearch[i].brokerName;
      await searchBox.setValue(broker);


      //CHECK IF ONLY ONE BROKER IS DISPLAYED
      // const nmb = await(brokerPage.brokerCardList)
      // const att = await nmb.getAttribute(`data-total-count`)
      //await expect(nmb).toHaveValue('1')
      //const nmb = await (await (brokerPage.brokerCardList)).getAttribute('data-total-count')
      //await expect(brokerCard).toHaveAttribute('$(`div[data-total-count]', '1')
      //const obj = Object.keys(brokerCard).length
       //await expect(obj).toHaveLength(1)
      // const list = await brokerPage.list
      // const obj = Object.keys(list).length
      // await expect(obj).toHaveLength(1)
      // //expect(broker).toEqual(brokersNames);
    }
  });


  
  
});
