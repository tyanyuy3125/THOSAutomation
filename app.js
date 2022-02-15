const config = require('./config');
const {Builder, By, Key, until} = require('selenium-webdriver');
const schedule = require('node-schedule');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const screen = {
    width: 640,
    height: 480
  };

console.log("Found "+ config.accounts.length +" accounts");
if(config.dosubmitatlaunch==true){
    for(let i=0;i<config.accounts.length;i++){
        submitreport(i);
    }
}

let job = schedule.scheduleJob(config.scheduled_time, () => {
    console.log(new Date());
    for(let i=0;i<config.accounts.length;i++){
        submitreport(i);
    }
});

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

async function submitreport(uid) {
  let options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--no-sandbox");
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.get('https://id.tsinghua.edu.cn/do/off/ui/auth/login/form/a585295b8da408afdda9979801383d0c/0?/fp/');
  await driver.findElement(By.id('i_user')).sendKeys(config.accounts[uid].username);
  await driver.findElement(By.id('i_pass')).sendKeys(config.accounts[uid].password);
  await driver.findElement(By.linkText('登录')).click();
  await driver.wait(until.titleIs('清华大学·在线服务系统'));
  await sleep(5000);
  await driver.get('https://thos.tsinghua.edu.cn/fp/view?m=fp#from=hall&serveID=b44e2daf-0ef6-4d11-a115-0eb0d397934f&act=fp/serveapply');
  let js = "$('#commit').click()";
  await sleep(5000);
  await driver.executeScript(js);
}