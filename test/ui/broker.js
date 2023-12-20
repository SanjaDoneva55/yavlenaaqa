const Browser = require("@wdio/globals");

/**
 * add Broker page object
 */

class BrokerPage {
  //GETTERS
  get brokersTitle() {
    return $(`//h2[@class='brokers-section-title']`);
  }

  get agreeBtbCookies() {
    return $(`//input[@class='hide-cookies-message green-btn']`);
  }

  get loadMoreBtn() {
    return $(`//a[@class='green-btn load-more-results-list']`);
  }
  get brokers() {
    return $$(`broker-card`);
  }
  get fullBrokersListOfNames() {
    return $$(`//h3[@class='name']`);
  }
  get loadingState(){
    return $(`//div[@class='brokers-loading']`)
  }
  get fullListOfAddresses() {
    return $$(`//div[@class="office"]`);
  }

  get numberOfProperties() {
    return $$(`//div[@class="position"]//a`);
  }

  get phoneNumbers() {
    const telGroups = $$('//div[@class="tel-group"]');
    const results = [];

    telGroups.forEach(async (telGroup, index) => {
      const telElements = telGroup.$$('span[@class="tel"]/a');
      const phoneNumbers = telElements.map((telElement) => telElement);

      const phoneNumberObject = {
        number1: await phoneNumbers[0],
        number2: (await phoneNumbers[1]) || null,
      };

      results.push(phoneNumberObject);
    });
    return results;
  }

  get searchBox() {
    return $(`//input[@class='input-search']`);
  }
  get clearBtn(){
    return $(`//button[@class='clear-all-dropdowns clear-btn']`)
  }
  get brokerCardList() {
    return $(`//div[@class='broker-list']//article`);
  }

  get list(){
      return $$(`//div[@class="broker-list"]`)

  }
  async clickAgreeCookies() {
    const btn = await this.agreeBtbCookies;
    await btn.click();
  }

  async clickLoadMoreBtn() {
    const btn = await this.loadMoreBtn;
    await btn.click();
  }
}
module.exports = BrokerPage;
