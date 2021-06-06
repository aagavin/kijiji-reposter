import { launch as puppeteerLaunch, WaitForOptions } from "puppeteer";


const loginURL = 'https://www.kijiji.ca/t-login.html';

const waitOptions: WaitForOptions = { waitUntil: 'domcontentloaded' };

// ids
const userName = '#emailOrNickname';
const password = '#password';
const loginBtn = '.signInButton-2798687440';

(async () => {
    const browser = await puppeteerLaunch({
        defaultViewport: {
            width: 1200,
            height: 900
        },
        slowMo: 500,
        headless: false,
        args: ['--enable-features=UseOzonePlatform', '--ozone-platform=wayland', '--ignore-gpu-blocklist']
    });
    const page = await browser.newPage();

    // login page
    await page.goto(loginURL);
    await page.waitForSelector(userName);
    await page.focus(userName);
    await page.keyboard.type('')
    await page.type(password, '');
    await Promise.all([
        page.waitForNavigation(waitOptions),
        page.click(loginBtn)
    ])

})()

/*

args: [
            '--enable-features=UseOzonePlatform',
            '--ozone-platform=wayland',
            '--ignore-gpu-blocklist'
        ]
*/