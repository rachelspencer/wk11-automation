const { Builder, Capabilities, By } = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    await (await driver).get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await (await driver).quit()
})

test('cross a movie off', async () => {

    let addMovieBar = await driver.findElement(By.xpath("//html/body/main/section/form/input"))
    await addMovieBar.sendKeys(`Dumbo\n`)
    await driver.sleep(2000)
    const element = await driver.findElement(By.xpath("//html/body/main/ul/li/span"));
    element.click();
    const elementClass = await element.getAttribute('class');
    await driver.sleep(2000);
    //expect(elementClass).toBe('checkefailtest') //making sure of a fail
    expect(elementClass).toBe('checked');
})

test('movie watched can be re-added', async () => {

    let addMovieBar = await driver.findElement(By.xpath("//html/body/main/section/form/input"))
    await addMovieBar.sendKeys(`Home Alone\n`)
    await driver.sleep(2000)
    const element = await driver.findElement(By.xpath("//html/body/main/ul/li/span"));
    element.click();
    await driver.sleep(2000)
    element.click();
    await driver.sleep(2000)
    const successMsg = await driver.findElement(By.xpath("//*[@id='message']"));
    const successMsgTextContent = await successMsg.getAttribute('textContent');
    //console.log('successMsgClass', successMsgClass)
    expect(successMsgTextContent).toBe('Home Alone added back!');
})

test('check that movie is deleted', async () => {
    let addMovieBar = await driver.findElement(By.xpath("//html/body/main/section/form/input"))
    await addMovieBar.sendKeys(`Casper\n`)
    await driver.sleep(2000)
    const deleteBtn = await driver.findElement(By.xpath('//*[@id="Casper"]')); 
    deleteBtn.click();
    await driver.sleep(2000);
    const movieList = await driver.findElements(By.xpath('//*[@id="Casper"]')); 
    //console.log('movieList ', movieList )
    expect(movieList.length).toBe(0)
})
