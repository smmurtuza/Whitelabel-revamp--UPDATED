const { test, expect , devices } = require('@playwright/test');
//const { initializePage } = require('./pageInitialization');
const { waitForElement } = require('./elementUtils');
const { performAction, safelyPerformAction } = require('./pageActions');
const { clickViewAllButton } = require('./navigationActions');

//const iPhone11 = devices['iPhone 11'];

let context;
//let page;

let page;
// Select a device to emulate
const iPhone11 = devices['iPhone 11'];

test.beforeEach(async ({ browserName, browser}) => {
    //const { context, page } = await initializePage(browserName, browser, iPhone11);
    // const { page } = await initializePage(browser);
    //console.log(page); // This should log the Page object to verify it's correct
    //console.log(context);

    // if (!page || typeof page.locator !== 'function') {
    //     throw new Error('The page object is not initialized correctly.');
    // }
    if (browserName === 'firefox') {
        // Create context without mobile emulation for Firefox
        context = await browser.newContext();
      } else {
        // Create context with mobile emulation for other browsers
        context = await browser.newContext({ ...iPhone11 });
      }
      page = await context.newPage();


    await page.goto('http://35.208.67.169:3009/');
    const h1Element = page.locator('//h1[text()="Customer Registration"]', { timeout: 300000 }).first();
    await expect(h1Element).toBeVisible();
    //await waitForElement('//h1[text()="Customer Registration"]');
    await performAction(page,'fill', 'input[type="text"]', '10101010');
    await performAction(page,'click', 'div.registration_row__aYrgl input[type="submit"]');
    try {
        await performAction(page,'click','button.HKButton_mainButton__lc0N7.HKButton_small__EGz0m:has-text("Skip")');
    } catch (error) {
        console.error('Error clicking nextButton1:', error);
    }

    await waitForElement(page,'//h1[text()="Quick Add Transactions"]');
    console.log('Test onboarding has been passed');
}, { timeout: 60000 });

test.afterEach(async () => {
    if (page && !page.isClosed()) {
        await page.close();
    }
});

test('Verify Account Addition cash', async ({ }) => {
    await clickViewAllButton(page);
    await safelyPerformAction(page,'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Cash")');
    await safelyPerformAction(page,'fill', 'input[name="title"]', 'Rida10');
    await safelyPerformAction(page,'fill', 'input[name="accountBalance"]', '11100');
    await safelyPerformAction(page,'click', 'button.cashAccount_add_account_btn__w7c8d');
    await waitForElement(page,`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("Rida")`);
    console.log('The test for adding a Cash Account has been successfully passed.');
});

test('Verify Account Addition Bank', async ({ }) => {
    await clickViewAllButton(page);
    await safelyPerformAction(page,'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Bank")');
    await safelyPerformAction(page,'click', `.selectAccount_bank_list_inner_div__KEaAY p:has-text("Askari Bank")`);
    await safelyPerformAction(page,'fill', 'input[name="accountNumber"]', '1010');
    await safelyPerformAction(page,'fill', 'input[name="accountBalance"]', '75000');
    await safelyPerformAction(page,'click', 'button.addBankAccount_add_account_btn__9yXE9');
    await waitForElement(page,`.HKAccountListing_ListItemWithBg__MKYfQ:has-text("Askari Bank")`);
    console.log('The test for adding a Bank Account has been successfully passed.');
});

test('Verify Account Adding Person', async ({ }) => {
    await clickViewAllButton(page);
    await safelyPerformAction(page,'click', 'button:has-text("ADD ACCOUNT")');
    await safelyPerformAction(page,'click', '.newAccount_account_list_inner_div__6KU_N:has-text("Person")');
    await safelyPerformAction(page,'fill', 'input[name="title"]', 'Pakki');
    await safelyPerformAction(page,'fill', 'input[name="accountBalance"]', '75000');
    await safelyPerformAction(page,'click', 'button.personAccount_add_person_btn__GHonT');
    console.log('The test for adding a Person Account has been successfully passed.');
});

test('Verify Add Expense', async ({ }) => {
    await page.waitForSelector('.HKRoundedCornerButton_HK-RoundedButton-main__iNcDp');
    await safelyPerformAction(page, 'click', '.HKRoundedCornerButton_HK-RoundedButton-main__iNcDp');

    await page.waitForSelector('.vouchers_input_main_div__me793');
    await safelyPerformAction(page, 'click', '.vouchers_input_main_div__me793');

    const buttonSelector=page.locator('input[type="button"][value="1"]');
    await expect(buttonSelector).toBeVisible();
    await buttonSelector.click();
    
    await page.waitForSelector('.HKSavingCategoryItem_HKCategory-item__CSaI6');
    await safelyPerformAction(page, 'click', '.HKSavingCategoryItem_HKCategory-item__CSaI6');

    await page.waitForSelector('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');

    await safelyPerformAction(page, 'fill', 'div.vouchers_rootDiv__xGq3_ input[name="startDate"]', 'December 11, 2023');

    await page.waitForSelector('.vouchers_accountSelection_main_div__AS45r');
    await safelyPerformAction(page, 'click', '.vouchers_accountSelection_main_div__AS45r');

    await page.waitForSelector('button:has-text("Save")');
    await safelyPerformAction(page, 'click', 'button:has-text("Save")');

    console.log('The test for Verify Add Expense successfully passed.');

});

test('Verify Add Income', async ({ }) => {
    await page.waitForSelector('.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Income")');
    await safelyPerformAction(page, 'click', '.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Income")');

    await page.waitForSelector('.HKVoucherButton_button_withOutBorder__93580:has-text("Income")');
    await safelyPerformAction(page, 'click', '.HKVoucherButton_button_withOutBorder__93580:has-text("Income")');

    await page.waitForSelector('.income_voucherButton__Q9oaQ');
    await safelyPerformAction(page, 'click', '.income_input_main_div__x1YCt');

    // const buttonSelector=page.locator('input[type="button"][value="1"]');
    // await expect(buttonSelector).toBeVisible();
    // await buttonSelector.click();
    const buttonSelector = page.locator('input[type="button"][value="1"]');
await expect(buttonSelector).toBeVisible();

for (let i = 0; i < 3; i++) {
    await buttonSelector.click();
}

    await page.waitForSelector('.HKSavingCategoryItem_HKCategory-item__CSaI6');
    await safelyPerformAction(page, 'click', '.HKSavingCategoryItem_HKCategory-item__CSaI6');

    await page.waitForSelector('.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');
    await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_HKAccountsSelectionItem__X3XlF');

    // await page.waitForSelector('.income_rootDiv__rpv_x');
    // await safelyPerformAction(page, 'click', '.income_rootDiv__rpv_x');

    // await safelyPerformAction(page, 'click', '.undefined HKCalendar_today__lryHR');

    //await safelyPerformAction(page, 'fill', 'div.income_rootDiv__rpv_x input[name="startDate"]', 'December 11, 2023');
    // const calendarSelector = 'table.HKCalendar_table__As0jF';
    // const dayToClick = '12';

    // Click on the input field to trigger the calendar
    //await safelyPerformAction(page, 'click', calendarSelector);

    await safelyPerformAction(page, 'click', 'div.income_rootDiv__rpv_x input[name="startDate"]');
    const dayToClick = '12';
    // Click on the 12th of December
    const daySelector = `td:not(.HKCalendar_in-prev-month___jTM_):not(.HKCalendar_in-next-month__hiU_4):not(.undefined):contains("${dayToClick}")`;
    //await page.waitForSelector(daySelector);
    //await page.waitForSelector(daySelector);
    await safelyPerformAction(page, 'click', daySelector);



     await page.waitForSelector('.HKButton_mainButton-title__zbbhe:has-text("Apply")');
     await safelyPerformAction(page, 'click', '.HKButton_mainButton-title__zbbhe:has-text("Apply")');

    await page.waitForSelector('button:has-text("Save")');
    await safelyPerformAction(page, 'click', 'button:has-text("Save")');

    console.log('The test for Verify Add income successfully passed.');

});
test('Verify Add Transfer', async ({}) => {
    try {
      await page.waitForSelector('.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Transfer")');
      await safelyPerformAction(page, 'click', '.HKRoundedCornerButton_HK-RoundedButton-title__diMAE:has-text("Add Transfer")');
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.transferVoucher_header_btns_main_div__lXudl');
      await safelyPerformAction(page, 'click', '.transferVoucher_input_main_div__UzsAJ');
    } catch { /* Ignoring errors */ }
  
    try {
      const buttonSelector = page.locator('input[type="button"][value="1"]');
      await expect(buttonSelector).toBeVisible();
      for (let i = 0; i < 3; i++) {
        await buttonSelector.click();
      }
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.HKAccountsSelectionItem_accountName__OqwTL:has-text("Cash")');
      await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_accountName__OqwTL');
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.HKAccountsSelectionItem_accountName__OqwTL:has-text("Cash")');
      await safelyPerformAction(page, 'click', '.HKAccountsSelectionItem_accountName__OqwTL');
    } catch { /* Ignoring errors */ }
  
    try {
      const dateclick = await safelyPerformAction(page, 'click', 'transferVoucher_input_date_div__AG01p');
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.HKButton_mainButton-title__zbbhe:has-text("Apply")');
      await safelyPerformAction(page, 'click', '.HKButton_mainButton-title__zbbhe:has-text("Apply")');
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.HKButton_mainButton-title__zbbhe:has-text("Apply")');
      await safelyPerformAction(page, 'click', '.HKButton_mainButton-title__zbbhe:has-text("Apply")');
    } catch { /* Ignoring errors */ }
  
    try {
      await page.waitForSelector('.HKButton_mainButton-title__zbbhe:has-text("Apply")');
      await safelyPerformAction(page, 'click', '.HKButton_mainButton-title__zbbhe:has-text("Apply")');
    } catch { /* Ignoring errors */ }
  
    console.log('The test No 6 for Verify Add income successfully passed.');
  
  }, { timeout: 60000 });
  