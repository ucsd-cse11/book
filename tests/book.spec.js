// @ts-check
const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

/** @type {import('@playwright/test').Page} */
let page;
const pageErrors = [];

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  page.on('pageerror', (err) => pageErrors.push(`pageerror: ${err.message}`));
});

test.afterAll(async () => {
  await page.close();
});

test('table of contents lists all sections and lessons', async () => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Introduction to Programming');
  await expect(page.locator('main h2')).toHaveCount(14);
  await expect(page.locator('main li a')).toHaveCount(56);
});

test('lesson 1.1 renders steps with navigation', async () => {
  await page.click('main li a'); // first lesson
  await expect(page).toHaveURL(/01-01-Programs-Fields/);
  await expect(page.locator('.stepnav a')).toHaveCount(4);
  await expect(page.locator('section.step')).toHaveCount(4);
  await expect(page.locator('.pagenav .next')).toContainText('1.2');
});

test('number quiz accepts the right answer and rejects a wrong one', async () => {
  const quiz = page.locator('.quiz[data-type="number"]').first();
  await quiz.locator('input.blank').fill('2');
  await quiz.locator('button.check').click();
  await expect(quiz.locator('.verdict')).toContainText('Not quite');
  await quiz.locator('input.blank').fill('1');
  await quiz.locator('button.check').click();
  await expect(quiz.locator('.verdict')).toContainText('Correct');
});

test('matching quiz can be solved using the embedded pairs', async () => {
  const quiz = page.locator('.quiz[data-type="matching"]').first();
  // Recover each row's correct label from the page's own data, then select it.
  await quiz.evaluate((q) => {
    const pairs = JSON.parse(q.querySelector('script').textContent).source.pairs;
    const strip = (h) => {
      const d = document.createElement('div');
      d.innerHTML = h.replace(/<br\s*\/?>/g, ' ');
      return d.textContent.replace(/\s+/g, ' ').trim();
    };
    for (const tr of q.querySelectorAll('table.matching tr')) {
      const secondText = strip(tr.children[1].innerHTML);
      const pair = pairs.find((p) => strip(p.second) === secondText);
      tr.querySelector('select').value = strip(pair.first);
    }
  });
  await quiz.locator('button.check').click();
  await expect(quiz.locator('.verdict')).toContainText('Correct');
});

test('fill-blanks quiz solves with known answers', async () => {
  const quiz = page.locator('.quiz[data-type="fill-blanks"]').first();
  const selects = quiz.locator('.blanks select');
  await selects.nth(0).selectOption('No');
  await quiz.locator('.blanks input').fill('5');
  await selects.nth(1).selectOption('Just the program went back to the original version');
  await quiz.locator('button.check').click();
  await expect(quiz.locator('.verdict')).toContainText('Correct');
});

test('choice quiz (lesson 1.2) checks multiple correct options', async () => {
  await page.goto('/lessons/01-02-Java-as-a-Calculator.html');
  const quiz = page.locator('.quiz[data-type="choice"]').first();
  for (const text of ['theAnswer', '95']) {
    await quiz.locator('label', { hasText: text }).locator('input').check();
  }
  await quiz.locator('button.check').click();
  await expect(quiz.locator('.verdict')).toContainText('Correct');
});

test('show answer reveal works on every quiz of lesson 3.2', async () => {
  await page.goto('/lessons/03-02-Methods-as-Descriptions-of-Tasks.html');
  const reveals = page.locator('details.reveal');
  const n = await reveals.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) {
    await reveals.nth(i).locator('summary').click();
    await expect(reveals.nth(i).locator('.answer')).not.toBeEmpty();
  }
});

test('tester runner widget compiles and runs (lesson 3.1)', async () => {
  test.setTimeout(240_000);
  await page.goto('/lessons/03-01-Capturing-Repeated-Work-with-Methods.html');
  const runner = page.locator('.runner[data-main="Distance"]').first();
  await runner.locator('button.run').click();
  await expect(runner.locator('.state')).toHaveText(/done|compile error|failed/, {
    timeout: 180_000,
  });
  const out = await runner.locator('pre.out').innerText();
  console.log('--- runner output:\n' + out);
  await expect(runner.locator('.state')).toHaveText('done');
  expect(out).toContain('180');
});

test('cli runner passes command-line arguments (lesson 10.1)', async () => {
  test.setTimeout(240_000);
  await page.goto('/lessons/10-01-Arrays-of-command-line-arguments-loops.html');
  const runner = page.locator('.runner[data-runner="cli"]').first();
  await runner.locator('textarea.code').fill(
    'class SampleMain {\n' +
    '  public static void main(String[] args) {\n' +
    '    System.out.println("got: " + args[0]);\n' +
    '  }\n' +
    '}');
  await runner.locator('input.args').fill('hello world');
  await runner.locator('button.run').click();
  await expect(runner.locator('.state')).toHaveText(/done|compile error|failed/, {
    timeout: 180_000,
  });
  const out = await runner.locator('pre.out').innerText();
  console.log('--- cli output:\n' + out);
  expect(out).toContain('got: hello');
});

test('no page errors across the whole tour', async () => {
  expect(pageErrors).toEqual([]);
});
